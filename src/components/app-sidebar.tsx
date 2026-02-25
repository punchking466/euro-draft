"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMenuList } from "./menu-data";

export function AppSidebar() {
  const pathname = usePathname();
  const menuGroups = getMenuList();

  const isActive = (target: string) => pathname === target;

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="text-2xl font-semibold">🏀 Team Euro</div>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group, groupIdx) => (
          <SidebarGroup key={groupIdx}>
            {group.groupLabel && (
              <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.menus.map((menu, menuIdx) => {
                  const isExpandable =
                    menu.submenus && menu.submenus.length > 0;
                  const isActiveGroup = menu.submenus?.some(
                    (submenu) => pathname === submenu.href,
                  );

                  return isExpandable ? (
                    <Collapsible
                      key={menuIdx}
                      defaultOpen={isActiveGroup}
                      className="group"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <menu.icon className="mr-2 h-4 w-4" />
                            <span>{menu.label}</span>
                            <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {menu.submenus?.map((submenu, subIdx) => (
                          <SidebarMenuItem key={subIdx} className="pl-8">
                            <SidebarMenuButton asChild>
                              <Link
                                key={submenu.href}
                                href={submenu.href}
                                className={`block rounded-md px-3 py-1.5 text-sm ${
                                  isActive(submenu.href)
                                    ? "bg-muted text-primary font-semibold"
                                    : "hover:bg-muted"
                                }`}
                              >
                                <submenu.icon className="mr-2 h-4 w-4" />
                                {submenu.label}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={menuIdx}>
                      <SidebarMenuButton asChild>
                        <Link href={menu.href} className="flex items-center">
                          <menu.icon className="mr-2 h-4 w-4" />
                          <span>{menu.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
