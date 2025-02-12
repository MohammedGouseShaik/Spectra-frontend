"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import axios from "axios";

const MyVideos = ({ searchQuery }: { searchQuery: string }) => {
  const [videos, setMyVideos] = useState<any[]>([]);
  const [videoStates, setVideoStates] = useState<{ [key: string]: string }>({});

  function formatDuration(seconds: number): string {
    if (!seconds || isNaN(seconds)) return "00:00"; // Handle invalid inputs
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  const checkStatus = async (videoId: string, executionArn: string) => {
    try {
      const response = await axios.post("/api/check-status", { executionArn });
      const status = response.data?.body?.status;

      if (status) {
        setVideoStates((prev) => ({ ...prev, [videoId]: status })); // ✅ Update state
      }

      if (status === "RUNNING") {
        setTimeout(() => checkStatus(videoId, executionArn), 3000);
      } else if (status === "SUCCEEDED") {
        console.log(`Processing succeeded for ${videoId}!`);
      } else if (status === "FAILED") {
        console.error(`Processing failed for ${videoId}!`);
      }
    } catch (error) {
      console.error(`Error checking status for ${videoId}:`, error);
    }
  };

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://u6g0dlfkq2.execute-api.us-east-1.amazonaws.com/prod/get-all-videos"
        );

        console.log("response", response.data.videos);

        const formattedVideos = response.data.videos.map(
          (video: {
            videoId: string;
            s3Uri: string;
            thumbnail: string;
            duration: number;
            status?: string;
            uploaded?: string;
          }) => ({
            id: video.videoId, // Ensure this matches what you use in JSX
            title: video.videoId.replace(".mp4", ""), // Remove .mp4 for UI
            s3Uri: video.s3Uri,
            thumbnail: video.thumbnail,
            duration: formatDuration(video.duration),
            uploaded: video.uploaded || "Unknown",
          })
        );

        setMyVideos(formattedVideos);

        // Set initial states from API if available
        const initialStates: { [key: string]: string } = {};
        formattedVideos.forEach((video) => {
          initialStates[video.id] = "Checking..."; // Temporary status
          const executionArn = `arn:aws:states:us-east-1:054037105643:execution:Sight-Step-Function:apie-${video.id}`;
          checkStatus(video.id, executionArn); // ✅ Fetch actual status
        });

        setVideoStates(initialStates); // ✅ Set initial states
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleButtonClick = (videoId: string) => {
    setVideoStates((prev) => {
      const currentStatus = prev[videoId];
      if (currentStatus === "notProcessed")
        return { ...prev, [videoId]: "processing" };
      if (currentStatus === "processing")
        return { ...prev, [videoId]: "processed" };
      return prev;
    });
  };

  // Filter videos based on searchQuery
  const filteredVideos = videos.filter(
    (video) => video.id.toLowerCase().includes(searchQuery.toLowerCase()) // ✅ Search by `id`
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideos.map((video) => (
        <Card key={video.id} className="w-full border shadow-sm">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={1600}
            height={400}
            className="rounded-t-lg object-cover w-full h-40"
          />
          <CardContent className="p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-primary">
              {video.title}
            </h3>

            {/* Duration & Status Row */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>Duration: {video.duration}</p>
              <Badge
                variant={
                  videoStates[video.id] === "RUNNING"
                    ? "warning"
                    : videoStates[video.id] === "SUCCEEDED"
                    ? "success"
                    : videoStates[video.id] === "FAILED"
                    ? "destructive"
                    : "secondary"
                }
              >
                {videoStates[video.id] || "Loading..."}
              </Badge>
            </div>

            {/* Separator */}
            <hr className="border-t border-gray-300" />

            {/* Upload Info & Button */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-gray-500">
                Uploaded: {video.uploaded}
              </p>
              <Button
                variant="outline"
                onClick={() => handleButtonClick(video.id)}
              >
                {videoStates[video.id] === "RUNNING"
                  ? "Processing..."
                  : videoStates[video.id] === "SUCCEEDED"
                  ? "Go to Chat"
                  : "Start Analysis"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyVideos;
