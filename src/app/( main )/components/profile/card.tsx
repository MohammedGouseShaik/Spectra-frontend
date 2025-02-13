"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card"; // shadcn/ui Card components
import { Button } from "@/components/ui/button"; // shadcn/ui Button component
import {
  UserIcon,
  InfoIcon,
  LockIcon,
  TrashIcon,
  SettingsIcon,
} from "lucide-react"; 
//import Bill from "@/app/components/profile/bills_usage"; 
import  Details  from "./details";

const UserProfileCard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("Details");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  //Render the active component
  const renderComponent = () => {
    switch (activeComponent) {
    //   case "Bill":
    //     return <Bill />;
      case "details":
        return <Details />;
      default:
        return <Details />;
    }
  };

  // Sidebar navigation items
  const sidebarNavItems = [
    {
      title: "Profile",
      icon: <UserIcon className="w-5 h-5 mr-2" />,
      component: "details",
      index: 0,
    },
    {
      title: "Billing and Usage",
      icon: <InfoIcon className="w-5 h-5 mr-2"  />,
      component: "Bill",
      index: 1,
    },
    {
      title: "Change Password",
      icon: <LockIcon className="w-5 h-5 mr-2" />,
      component: "ChangePassword",
      index: 2,
    },
    {
      title: "Delete Account",
      icon: <TrashIcon className="w-5 h-5 mr-2" />,
      component: "DeleteAccount",
      index: 3,
    },
    {
      title: "Logout",
      icon: <SettingsIcon className="w-5 h-5 mr-2" />,
      component: "Logout",
      index: 4,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Sidebar Navigation 
      <Card className="w-full lg:w-[20%] shadow-lg rounded-lg"> {/* Reduced width 
        <CardContent className="p-4">
          <nav className="space-y-2">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.index}
                variant="ghost"
                className={`w-full justify-start text-sm font-medium transition-colors ${
                  activeIndex === item.index
                    ? "bg-gray-100 text-primary font-bold" // Active item style
                    : "text-muted-foreground hover:bg-gray-100 hover:text-primary" // Inactive item style
                }`}
                onClick={() => {
                  setActiveComponent(item.component);
                  setActiveIndex(item.index);
                }}
              >
                {item.icon} {/* Render the icon
                <span>{item.title}</span> {/* Render the text
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card className="w-full lg:w-[100%] shadow-lg rounded-lg"> {/* Increased width */}
        <CardContent className="p-6">{renderComponent()}</CardContent>
       </Card>
    </div>
  );
};

export default UserProfileCard;