import React from "react";
import VideosTab from "@/app/components/videos/videos-tab";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";

const VideosPage: React.FC = () => {
  return (
    // <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    //   {/* Breadcrumb Navigation */}
    //   {/* <header className="flex items-center gap-2 px-4">
    //     <Separator orientation="vertical" className="mr-2 h-4" />
    //     <Breadcrumb>
    //       <BreadcrumbList>
    //         <BreadcrumbItem>
    //           <BreadcrumbLink href="/">Home</BreadcrumbLink>
    //         </BreadcrumbItem>
    //         <BreadcrumbSeparator />
    //         <BreadcrumbItem>
    //           <BreadcrumbPage>Videos</BreadcrumbPage>
    //         </BreadcrumbItem>
    //       </BreadcrumbList>
    //     </Breadcrumb>
    //   </header> */}

    //   {/* Videos Tab Component */}

    // </div>
    <div className="p-0 ml-0">
      <VideosTab />
    </div>
  );
};

export default VideosPage;
