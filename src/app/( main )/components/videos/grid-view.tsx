import React from "react";
import Image from "next/image";

interface GridViewProps {
  videos: { id: string; title: string; thumbnail: string }[];
}

const GridView: React.FC<GridViewProps> = ({ videos }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="bg-gray-200 p-2 rounded-lg shadow-md">
          <Image
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-40 object-cover rounded-md"
          />
          <p className="mt-2 text-sm font-medium">{video.title}</p>
        </div>
      ))}
    </div>
  );
};

export default GridView;
