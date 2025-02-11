"use client";

import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between p-2">
        {/* User Avatar & Info */}
        <SidebarMenuButton size="lg" className="flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </SidebarMenuButton>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => console.log("Logging out...")} // Replace with your logout logic
        >
          <LogOut className="size-5" />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
