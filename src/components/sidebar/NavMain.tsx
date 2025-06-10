"use client";

import { type LucideIcon } from "lucide-react";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface NavMainItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  disabled?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export function NavMain({
  items,
  groupLabel,
}: {
  items: NavMainItem[];
  groupLabel: string;
}) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                disabled={item.disabled}
                className='data-[state=open]:bg-accent/30'
              >
                <a
                  href={item.disabled ? undefined : item.url}
                  aria-disabled={item.disabled}
                  onClick={e => {
                    if (item.disabled) e.preventDefault();
                  }}
                  className='group flex items-center gap-2 transition-all duration-200 ease-out hover:bg-accent/50 hover:text-accent-foreground'
                >
                  <item.icon className='transition-all duration-200 ease-out hover:scale-110' />
                  <span className='transition-all duration-200 ease-out hover:translate-x-1'>
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
