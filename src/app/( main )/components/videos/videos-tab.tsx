"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, Grid, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyVideos from "./my-videos";
import ListView from "./list-view";
import SampleVideos from "./sample-videos";
import axios from "axios";

const VideosTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid");
  const [tab, setTab] = useState("myVideos");
  const [videos, setMyVideos] = useState<any[]>([]);

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

  // Fetch videos from API on component mount
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
          }) => ({
            id: video.videoId, // Ensure this matches what you use in JSX
            title: video.videoId.replace(".mp4", ""), // Remove .mp4 for UI
            s3Uri: video.s3Uri,
            thumbnail: video.thumbnail,
            duration: formatDuration(video.duration),
            status: "notProcessed",
          })
        );

        setMyVideos(formattedVideos);

        // Check status for each video
        formattedVideos.forEach((video) => {
          const executionArn = `arn:aws:states:us-east-1:054037105643:execution:Sight-Step-Function:apie-${video.id}`;
          checkStatus(video.id, executionArn);
        });
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];

      try {
        // Upload the file
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await axios.post("/api/upload", formData);

        // Fetch updated video list
        const response = await axios.get("/api/videos");
        setMyVideos(response.data);
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
  };

  return (
    <div className="w-full p-4 pt-0 bg-white shadow-md rounded-xl h-screen flex flex-col">
      {/* Tabs & Controls */}
      <div className="flex justify-between items-center mb-4">
        <Tabs value={tab} onValueChange={setTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="myVideos">My Videos</TabsTrigger>
            <TabsTrigger value="sampleVideos">Sample Videos</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Upload Button, Search & View Toggle */}
        <div className="flex items-center gap-4">
          {/* Toggle View */}
          <ToggleGroup type="single" value={view} onValueChange={setView}>
            <ToggleGroupItem value="grid" aria-label="Grid View">
              <Grid className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List View">
              <List className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Upload Button */}
          <label>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => document.getElementById("video-upload")?.click()}
            >
              <Upload className="w-5 h-5" /> Upload Videos
            </Button>
          </label>
          <input
            type="file"
            accept="video/*"
            id="video-upload"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1">
        {tab === "myVideos" &&
          (view === "grid" ? (
            <MyVideos searchQuery={searchQuery} />
          ) : (
            <ListView searchQuery={searchQuery} videos={videos} />
          ))}
        {tab === "sampleVideos" && <SampleVideos searchQuery={searchQuery} />}
      </div>
    </div>
  );
};

export default VideosTab;
