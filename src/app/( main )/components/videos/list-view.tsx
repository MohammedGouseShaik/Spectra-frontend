import React from "react";

interface ListViewProps {
  videos: { id: string; title: string; thumbnail: string }[];
}

const ListView: React.FC<ListViewProps> = ({ videos }) => {
  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <div
          key={video.id}
          className="flex items-center bg-gray-200 p-2 rounded-lg shadow-md"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-20 h-20 object-cover rounded-md"
          />
          <p className="ml-4 text-sm font-medium">{video.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ListView;
