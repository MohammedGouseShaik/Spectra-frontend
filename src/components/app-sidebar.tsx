"use client";

import * as React from "react";
import Link from "next/link";
import {
  AudioWaveform,
  // BookOpen,
  // Bot,
  Command,
  LayoutDashboard,
  Frame,
  GalleryVerticalEnd,
  Map,
  Video,
  Settings,
  PieChart,
  Settings2,
  // SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import Image from "next/image";
// import logoBW from "public/logo_bw.jpg";

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "m@parabola9.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Parabola9 ",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: false,
      items: [
        {
          title: "Accidents",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Hotspots",
          url: "#",
        },
      ],
    },
    {
      title: "Configurations",
      url: "/global-configuration",
      icon: Settings2,
      items: [
        {
          title: "Global Configuration",
          url: "#",
        },
        {
          title: "Model Configuration",
          url: "#",
        },
        {
          title: "Prompt Configuration",
          url: "#",
        },
      ],
    },
    {
      title: "Videos",
      url: "/videos-page",
      icon: Video,
      items: [
        {
          title: "My Videos",
          url: "#",
        },
        {
          title: "Sample Videos",
          url: "#",
        },
        // {
        //   title: "Tutorials",
        //   url: "#",
        // },
        // {
        //   title: "Changelog",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Settings",
      url: "/user-settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "#",
        },
        {
          title: "Biling & Usage",
          url: "#",
        },
        {
          title: "Change Password",
          url: "#",
        },
        {
          title: "Delete Account",
          url: "#",
        },
        {
          title: "Logout",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        {/* Parabola9 logo Here */}
        <div>
          <Image
            src="/logo_bw.jpg"
            alt="company-logo"
            width={800} // Specify the width
            height={200} // Specify the height
            style={{
              padding: "5px",
              maxWidth: "85%",
              height: "auto",
            }}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
