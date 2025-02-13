// "use client";

// import { ChevronRight, type LucideIcon } from "lucide-react";
// import Link from "next/link";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   // SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: LucideIcon;
//     isActive?: boolean;
//     items?: {
//       title: string;
//       url: string;
//     }[];
//   }[];
// }) {
//   return (
//     <SidebarGroup>
//       {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <Link href={item.url} passHref>
//                   <SidebarMenuButton tooltip={item.title}>
//                     {item.icon && <item.icon />}
//                     <span>{item.title}</span>
//                     <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                   </SidebarMenuButton>
//                 </Link>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <a href={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </a>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }

// "use client";

// import { ChevronRight, type LucideIcon } from "lucide-react";
// import Link from "next/link";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";

// export default function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: LucideIcon;
//     isActive?: boolean;
//     items?: {
//       title: string;
//       url: string;
//     }[];
//   }[];
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarMenu>
//         {items.map((item) => (
//           <SidebarMenuItem key={item.title}>
//             {item.items ? (
//               // If there are sub-items, make it collapsible
//               <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
//                 <>
//                   <CollapsibleTrigger asChild>
//                     <SidebarMenuButton tooltip={item.title}>
//                       {item.icon && <item.icon />}
//                       <span>{item.title}</span>
//                       <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                     </SidebarMenuButton>
//                   </CollapsibleTrigger>
//                   <CollapsibleContent>
//                     <SidebarMenuSub>
//                       {item.items.map((subItem) => (
//                         <SidebarMenuSubItem key={subItem.title}>
//                           <SidebarMenuSubButton asChild>
//                             <a href={subItem.url}>
//                               <span>{subItem.title}</span>
//                             </a>
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       ))}
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                 </>
//               </Collapsible>
//             ) : (
//               // If there are no sub-items, render a simple link
//               <Link href={item.url} passHref>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                 </SidebarMenuButton>
//               </Link>
//             )}
//           </SidebarMenuItem>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const isParentActive = items.items?.some((subItem) => pathname == subItem.url);
 // const isActive = pathname === items.url;

  useEffect(() => {
    const newOpenMenus = items.reduce((acc, item) => {
      if (item.items?.some((subItem) => pathname === subItem.url)) {
        acc[item.title] = true; 
      }
      else if (pathname === item.url){
        acc[item.title] = false;
      }
      return acc;
    }, {} as { [key: string]: boolean });

    setOpenMenus(newOpenMenus);
  }, [pathname, items]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };


  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items ? (
              // If there are sub-items, make it collapsible
              <Collapsible asChild open={openMenus[item.title]} className="group/collapsible">
                <>
                  <CollapsibleTrigger asChild onClick={() => toggleMenu(item.title)}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`flex items-center gap-2  ${
                       isParentActive ? "bg-gray-200 " : ""
                      }`}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight
                        className={`ml-auto transition-transform duration-200 ${
                          openMenus[item.title] ? "rotate-90" : ""
                        }`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={subItem.url}
                              className={` w-full  py-2 rounded-md ${
                                pathname === subItem.url ? "bg-gray-200 " : ""
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              </Collapsible>
            ) : (
              // If there are no sub-items, render a simple link
              <Link href={item.url} passHref>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex items-center gap-2 ${
                    pathname === item.url ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
