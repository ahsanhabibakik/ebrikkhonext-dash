import { Card } from "@/components/ui/card";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Package className="h-8 w-8 text-slate-600" />
            <div>
              <p className="text-sm text-slate-600">Total Products</p>
              <h3 className="text-2xl font-bold">256</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <ShoppingCart className="h-8 w-8 text-slate-600" />
            <div>
              <p className="text-sm text-slate-600">Total Orders</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-slate-600" />
            <div>
              <p className="text-sm text-slate-600">Total Users</p>
              <h3 className="text-2xl font-bold">10,456</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <DollarSign className="h-8 w-8 text-slate-600" />
            <div>
              <p className="text-sm text-slate-600">Revenue</p>
              <h3 className="text-2xl font-bold">৳15,20,456</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
          {/* Add order table later */}
        </Card>
        
        <Card className="col-span-3 p-6">
          <h3 className="text-lg font-medium mb-4">Popular Products</h3>
          {/* Add product list later */}
        </Card>
      </div>
    </div>
  );
}
