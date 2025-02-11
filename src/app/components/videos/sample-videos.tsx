"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// const sample_1 = "/assets/slack_1.png";

const sampleVideos = [
  {
    id: 1,
    title: "Slack Bot",
    uploadDate: "02.03.22",
    description:
      "If everything I did failed - which it doesn't, I think that it actually succeeds.",
    image: "/slack_1.png",
  },
  {
    id: 2,
    title: "Automation Tool",
    uploadDate: "03.04.22",
    description:
      "This video demonstrates how to automate repetitive tasks effectively.",
    image: "/slack_1.png",
  },
  {
    id: 3,
    title: "Project Management",
    uploadDate: "12.05.22",
    description: "Learn tips and tricks to manage your projects efficiently.",
    image: "/slack_1.png",
  },
  {
    id: 4,
    title: "Slack Bot Advanced",
    uploadDate: "02.06.22",
    description: "An in-depth video on advanced Slack Bot features.",
    image: "/slack_1.png",
  },
  {
    id: 5,
    title: "DevOps Introduction",
    uploadDate: "15.07.22",
    description: "An introductory video to DevOps practices.",
    image: "/slack_1.png",
  },
  {
    id: 6,
    title: "React Basics",
    uploadDate: "22.08.22",
    description: "A beginner-friendly video on getting started with React.",
    image: "/slack_1.png",
  },
];

const SampleVideos: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-0 ">
        {sampleVideos.map((video) => (
          <Card
            key={video.id}
            className="flex flex-col shadow-lg rounded-lg overflow-hidden"
          >
            <div className="flex p-4">
              <Image
                src={video.image}
                alt={video.title}
                width={60}
                height={60}
                className="w-15 h-15 object-cover rounded-md flex-shrink-0"
              />
              <div className="ml-4 flex-1">
                <h6 className="font-bold text-lg">{video.title}</h6>
                <p className="mt-1 mb-2 text-gray-600 font-medium">
                  Uploaded on: <strong>{video.uploadDate}</strong>
                </p>
              </div>
            </div>
            <CardContent className="px-4 pb-4">
              <p className="mt-1 text-gray-700 text-left">
                {video.description}
              </p>
            </CardContent>
            <Separator className="mx-4" />
            <div className="flex justify-center p-4">
              <Button
                variant="outline"
                size="sm"
                className="font-bold border-primary text-primary hover:bg-gray-100"
              >
                Start Video Analysis <ArrowForwardIcon className="ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SampleVideos;
