import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, FileText, Users, Settings } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "Add Product",
    description: "Create a new product listing",
    icon: <Package className="h-5 w-5" />,
    href: "/dashboard/products/new"
  },
  {
    title: "Create Order",
    description: "Process a new order",
    icon: <FileText className="h-5 w-5" />,
    href: "/dashboard/orders/new"
  },
  {
    title: "Manage Inventory",
    description: "Update stock levels",
    icon: <Package className="h-5 w-5" />,
    href: "/dashboard/inventory"
  },
  {
    title: "View Customers",
    description: "Manage customer accounts",
    icon: <Users className="h-5 w-5" />,
    href: "/dashboard/customers"
  },
  {
    title: "Shipping Settings",
    description: "Configure shipping options",
    icon: <Package className="h-5 w-5" />,
    href: "/dashboard/settings/shipping"
  },
  {
    title: "Store Settings",
    description: "Update store preferences",
    icon: <Settings className="h-5 w-5" />,
    href: "/dashboard/settings/store"
  }
];

export function QuickActions() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Quick Actions</h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-4 justify-start items-start text-left"
            asChild
          >
            <Link href={action.href} className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary">{action.icon}</span>
                <span className="font-medium">{action.title}</span>
              </div>
              <span className="text-sm text-muted-foreground font-normal">
                {action.description}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  );
}
