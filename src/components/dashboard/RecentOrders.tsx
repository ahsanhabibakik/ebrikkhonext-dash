import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: OrderStatus;
}

const statusVariants = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2025-05-12',
    amount: 1250,
    status: 'processing',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2025-05-11',
    amount: 899,
    status: 'shipped',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    date: '2025-05-10',
    amount: 2450,
    status: 'delivered',
  },
  {
    id: 'ORD-004',
    customer: 'Alice Brown',
    date: '2025-05-09',
    amount: 750,
    status: 'pending',
  },
];

export function RecentOrders() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Recent Orders</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/orders">
            View All →
          </Link>
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>৳{order.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={statusVariants[order.status]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      View
                      <span className="sr-only">View order</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
