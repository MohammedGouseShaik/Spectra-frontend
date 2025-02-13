import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import axios from "axios";
import { promisify } from "util";
import next from "next";

// Configure Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });
const uploadMiddleware = promisify(upload.single("file"));

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Allow only POST requests
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
    }

    // Process the uploaded file using Multer
    await uploadMiddleware(req, res);

    const file = (req as any).file; // Type assertion since Multer adds `file`
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Generate Video Thumbnail
    const generateThumbnail = async (videoBuffer: Buffer): Promise<string> => {
      return new Promise((resolve, reject) => {
        try {
          const video = document.createElement("video");
          video.src = URL.createObjectURL(
            new Blob([videoBuffer], { type: file.mimetype })
          );
          video.crossOrigin = "anonymous";
          video.muted = true;
          video.playsInline = true;

          video.onloadeddata = () => {
            video.currentTime = 2; // Capture frame at 2s
          };

          video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 200;
            canvas.height = (video.videoHeight / video.videoWidth) * 200;
            const ctx = canvas.getContext("2d");

            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              resolve(canvas.toDataURL("image/jpeg"));
            } else {
              reject("Canvas context not found");
            }
          };

          video.onerror = () => reject("Error loading video");
        } catch (err) {
          reject("Failed to generate thumbnail");
        }
      });
    };

    // Extract Video Duration
    const extractVideoDuration = async (
      videoBuffer: Buffer
    ): Promise<number> => {
      return new Promise((resolve, reject) => {
        try {
          const video = document.createElement("video");
          video.src = URL.createObjectURL(
            new Blob([videoBuffer], { type: file.mimetype })
          );
          video.crossOrigin = "anonymous";
          video.muted = true;
          video.playsInline = true;

          video.onloadedmetadata = () => {
            resolve(Math.floor(video.duration));
          };

          video.onerror = () => reject("Error loading video metadata");
        } catch (err) {
          reject("Failed to extract duration");
        }
      });
    };

    const thumbnail = await generateThumbnail(file.buffer);
    const duration = await extractVideoDuration(file.buffer);

    // Get Pre-Signed URL
    const preSignedResponse = await axios.post(
      "https://u6g0dlfkq2.execute-api.us-east-1.amazonaws.com/prod/generate-presigned-url",
      {
        filename: file.originalname,
        thumbnail,
        duration,
      }
    );

    const { presignedUrl, videoId } = preSignedResponse.data;

    // Upload to S3
    await axios.put(presignedUrl, file.buffer, {
      headers: { "Content-Type": file.mimetype },
    });

    return res.status(200).json({
      message: "File uploaded successfully",
      videoId,
      thumbnail,
      duration,
    });
  } catch (error) {
    return res.status(500).json({ error: "Upload failed" });
  }
}
