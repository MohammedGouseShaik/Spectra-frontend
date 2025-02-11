"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, Grid } from "lucide-react";
import MyVideos from "./my-videos";
import ListView from "./list-view";
import SampleVideos from "./sample-videos";

const VideosTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid");
  const [tab, setTab] = useState("myVideos");

  return (
    <div className="w-full p-2 bg-white shadow-md rounded-xl h-screen flex flex-col">
      {/* Tabs & Controls */}
      <div className="flex justify-between items-center mb-4">
        <Tabs value={tab} onValueChange={setTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="myVideos">My Videos</TabsTrigger>
            <TabsTrigger value="sampleVideos">Sample Videos</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-4">
          {/* Always show toggle buttons */}
          <ToggleGroup type="single" value={view} onValueChange={setView}>
            <ToggleGroupItem value="grid" aria-label="Grid View">
              <Grid className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List View">
              <List className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Search bar */}
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
            <ListView searchQuery={searchQuery} />
          ))}
        {tab === "sampleVideos" && <SampleVideos searchQuery={searchQuery} />}
      </div>
    </div>
  );
};

export default VideosTab;
