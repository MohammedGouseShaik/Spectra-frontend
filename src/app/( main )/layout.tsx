"use client";
import "../globals.css";

import { AppSidebar } from "@/components/app-sidebar";
import { DynamicBreadcrumbs } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="fixed w-full flex h-14 shrink-0 items-center gap-2 bg-white shadow-md transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10 z-50">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <DynamicBreadcrumbs
                  containerClasses="flex items-center gap-2"
                  listClasses="text-muted-foreground"
                  activeClasses="font-semibold text-foreground"
                  capitalizeLinks={true}
                />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col gap-4 p-0 pt-16">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
