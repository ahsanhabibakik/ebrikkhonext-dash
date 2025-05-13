import { Card } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Product A', sales: 1250, revenue: 125000 },
  { id: '2', name: 'Product B', sales: 980, revenue: 98000 },
  { id: '3', name: 'Product C', sales: 750, revenue: 75000 },
  { id: '4', name: 'Product D', sales: 620, revenue: 62000 },
  { id: '5', name: 'Product E', sales: 510, revenue: 51000 },
];

export function TopProducts() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Top Selling Products</h3>
      <div className="space-y-6">
        {mockProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">
                {product.sales.toLocaleString()} sold
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">৳{product.revenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                ৳{Math.round(product.revenue / product.sales)} avg
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
