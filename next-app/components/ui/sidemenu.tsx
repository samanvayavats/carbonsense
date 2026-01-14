"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar";

import { ImageUp , Home, CirclePlus , UserPen , BotMessageSquare   } from "lucide-react";

// Menu items.
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Profile", url: "/profile", icon: UserPen  },
  { title: "Create-community", url: "/createcommunity", icon: CirclePlus  },
  { title: "Upload-Image", url: "/upload-image", icon: ImageUp  },
  { title: "ChatAi", url: "/chatwithai", icon: BotMessageSquare  },
];

const Sidemenu = () => {
  return (
    <SidebarProvider>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>CarbonSense</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
    <SidebarInset>
            <SidebarTrigger />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Sidemenu;
