"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  FileText,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-slate-500",
    },
    {
      label: "Products",
      icon: Package,
      href: "/dashboard/products",
      color: "text-slate-500",
    },
    {
      label: "Orders",
      icon: ShoppingCart,
      href: "/dashboard/orders",
      color: "text-slate-500",
    },
    {
      label: "Users",
      icon: Users,
      href: "/dashboard/users",
      color: "text-slate-500",
      role: ["superadmin", "admin"],
    },
    {
      label: "Content",
      icon: FileText,
      href: "/dashboard/content",
      color: "text-slate-500",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      color: "text-slate-500",
    },
  ];

  return (
    <div className={cn(
      "h-full border-r bg-slate-50/50 pt-20",
      collapsed ? "w-[80px]" : "w-[250px]"
    )}>
      <div className="flex h-full flex-col gap-4">
        <Button
          variant="ghost"
          className="ml-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex flex-col gap-2 px-2">
          {routes.map((route) => {
            if (route.role && user?.role && !route.role.includes(user.role)) {
              return null;
            }

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-x-2 text-slate-500 text-sm font-medium px-3 py-2 hover:text-slate-600 hover:bg-slate-100/50 rounded-lg transition-all",
                  pathname === route.href && "text-slate-700 bg-slate-100"
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {!collapsed && <span>{route.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
