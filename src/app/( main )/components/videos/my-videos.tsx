"use client";

import { useState } from "react";
//import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const MyVideos = () => {
 // const router = useRouter();

  const mockVideos = [
    {
      id: "1",
      title: "Sample Video 1",
      thumbnail: "/login_3.jpg",
      duration: "3:45",
      uploaded: "1 day ago",
    },
    {
      id: "2",
      title: "Sample Video 2",
      thumbnail: "/login_3.jpg",
      duration: "5:30",
      uploaded: "2 days ago",
    },
    {
      id: "3",
      title: "Sample Video 3",
      thumbnail: "/login_3.jpg",
      duration: "4:15",
      uploaded: "3 days ago",
    },
  ];

  const [myVideos, setMyVideos] = useState(mockVideos);
  const [videoStates, setVideoStates] = useState(
    Object.fromEntries(mockVideos.map((video) => [video.id, "notProcessed"]))
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const newVideo = {
        id: (myVideos.length + 1).toString(),
        title: file.name,
        thumbnail: "https://via.placeholder.com/330x160.png?text=New+Thumbnail",
        duration: "0:00",
        uploaded: "Just now",
      };
      setMyVideos([...myVideos, newVideo]);
      setVideoStates({ ...videoStates, [newVideo.id]: "notProcessed" });
    }
  };

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

  return (
    <div className="p-0 bg-white min-h-screen flex flex-col gap-6 w-90">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {myVideos.map((video) => (
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
              <p className="text-sm text-gray-600">
                Duration: {video.duration}
              </p>
              <Badge
                variant={
                  videoStates[video.id] === "notProcessed"
                    ? "secondary"
                    : videoStates[video.id] === "processing"
                    ? "warning"
                    : "success"
                }
              >
                {videoStates[video.id]}
              </Badge>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xs text-gray-500">
                  Uploaded: {video.uploaded}
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleButtonClick(video.id)}
                >
                  {videoStates[video.id] === "notProcessed"
                    ? "Start Analysis"
                    : videoStates[video.id] === "processing"
                    ? "Processing..."
                    : "Go to Chat"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyVideos;
