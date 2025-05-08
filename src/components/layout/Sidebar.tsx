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
  Layers,
  Tags
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
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Products",
    icon: Package,
    subItems: [
      { label: "All Products", href: "/dashboard/products" },
      { label: "Add New", href: "/dashboard/products/new" },
    ]
  },
  {
    label: "Categories",
    icon: Tags,
    subItems: [
      { label: "All Categories", href: "/dashboard/categories" },
      { label: "Add New", href: "/dashboard/categories/new" },
    ]
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    subItems: [
      { label: "All Orders", href: "/dashboard/orders" },
      { label: "Pending", href: "/dashboard/orders/pending" },
      { label: "Shipped", href: "/dashboard/orders/shipped" },
    ]
  },
  // ...existing routes...
];

export function Sidebar() {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setOpenItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="h-full border-r bg-slate-50/50 pt-20">
      <div className="flex flex-col gap-2">
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
                    {item.label}
                  </div>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openItems.includes(item.label) && "transform rotate-180"
                    )} 
                  />
                </Button>
                {openItems.includes(item.label) && (
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
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
