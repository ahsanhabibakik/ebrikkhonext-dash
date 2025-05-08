"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Settings,
  FileText,
  ChevronDown,
  Tags,
  Menu,
  PenTool,
  Bell,
  LayoutDashboard,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarItemProps {
  label: string;
  icon: any;
  href?: string;
  subItems?: { label: string; href: string }[];
}

const sidebarItems: SidebarItemProps[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Products",
    icon: Package,
    subItems: [
      { label: "All Products", href: "/dashboard/products" },
      { label: "Add New", href: "/dashboard/products/new" },
      { label: "Categories", href: "/dashboard/categories" },
    ]
  },
  {
    label: "Categories",
    icon: Tags,
    subItems: [
      { label: "All Categories", href: "/dashboard/categories" },
      { label: "Add New", href: "/dashboard/categories/new" },
      { label: "Manage Structure", href: "/dashboard/categories/structure" },
    ]
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    subItems: [
      { label: "All Orders", href: "/dashboard/orders" },
      { label: "Pending", href: "/dashboard/orders/pending" },
      { label: "Processing", href: "/dashboard/orders/processing" },
      { label: "Shipped", href: "/dashboard/orders/shipped" },
    ]
  },
  {
    label: "Users",
    icon: Users,
    subItems: [
      { label: "All Users", href: "/dashboard/users" },
      { label: "Add New", href: "/dashboard/users/new" },
      { label: "Roles", href: "/dashboard/users/roles" },
    ]
  },
  {
    label: "Content",
    icon: PenTool,
    subItems: [
      { label: "Pages", href: "/dashboard/content/pages" },
      { label: "Blog Posts", href: "/dashboard/content/blog" },
      { label: "Media", href: "/dashboard/content/media" },
    ]
  },
  {
    label: "Settings",
    icon: Settings,
    subItems: [
      { label: "General", href: "/dashboard/settings" },
      { label: "Appearance", href: "/dashboard/settings/appearance" },
      { label: "Notifications", href: "/dashboard/settings/notifications" },
    ]
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setOpenItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className={cn(
      "h-full border-r bg-white transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && <span className="font-bold text-xl">Ebrikkho</span>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-col gap-2 p-4">
        {sidebarItems.map((item) => (
          <div key={item.label}>
            {item.subItems ? (
              <>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between px-4",
                    openItems.includes(item.label) && "bg-slate-100"
                  )}
                  onClick={() => toggleItem(item.label)}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-2" />
                    {!collapsed && item.label}
                  </div>
                  {!collapsed && (
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openItems.includes(item.label) && "transform rotate-180"
                      )} 
                    />
                  )}
                </Button>
                {openItems.includes(item.label) && !collapsed && (
                  <div className="pl-6 py-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center text-sm px-4 py-2 rounded-lg transition-colors",
                          pathname === subItem.href
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href!}
                className={cn(
                  "flex items-center px-4 py-2 text-sm rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {!collapsed && item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
