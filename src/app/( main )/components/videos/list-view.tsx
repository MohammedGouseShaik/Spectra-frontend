import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {  Play, Loader, RefreshCcw } from "lucide-react";
import Image from "next/image";
import axios from "axios";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  status?: string;
}

const ListView: React.FC<{ videos: Video[] }> = ({ videos }) => {
  const [videoStates, setVideoStates] = useState<{ [key: string]: string }>({});

  const checkStatus = async (videoId: string, executionArn: string) => {
    try {
      const response = await axios.post("/api/check-status", { executionArn });
      const status = response.data?.body?.status;

      if (status) {
        setVideoStates((prev) => ({ ...prev, [videoId]: status }));
      }

      if (status === "RUNNING") {
        setTimeout(() => checkStatus(videoId, executionArn), 3000);
      }
    } catch (error) {
      console.error(`Error checking status for ${videoId}:`, error);
    }
  };

  useEffect(() => {
    const initialStates: { [key: string]: string } = {};
    videos.forEach((video) => {
      initialStates[video.id] = "Checking...";
      const executionArn = `arn:aws:states:us-east-1:054037105643:execution:Sight-Step-Function:apie-${video.id}`;
      checkStatus(video.id, executionArn);
    });
    setVideoStates(initialStates);
  }, [videos]);

  return (
    <div className="max-w-auto mx-auto p-0">
    
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Thumbnail</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video, index) => (
            <TableRow key={video.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>{video.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    videoStates[video.id] === "SUCCEEDED"
                      ? "success"
                      : videoStates[video.id] === "RUNNING"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {videoStates[video.id] || "Loading..."}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  disabled={videoStates[video.id] === "RUNNING"}
                >
                  {videoStates[video.id] === "RUNNING" ? (
                    <Loader className="animate-spin w-5 h-5" />
                  ) : videoStates[video.id] === "FAILED" ? (
                    <RefreshCcw className="w-5 h-5 mr-1" />
                  ) : (
                    <Play className="w-5 h-5 mr-1" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListView;
