import { fetchApi } from "@/lib/api";

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  revenue: number;
  productTrend: { value: string; isPositive: boolean };
  orderTrend: { value: string; isPositive: boolean };
  userTrend: { value: string; isPositive: boolean };
  revenueTrend: { value: string; isPositive: boolean };
}

export interface ChartData {
  name: string;
  sales: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    // In a real app, this would be an API call
    // return fetchApi<DashboardStats>('/dashboard/stats');
    
    // Mock data for now
    return {
      totalProducts: 256,
      totalOrders: 1234,
      totalUsers: 10456,
      revenue: 1520456,
      productTrend: { value: '+12.5%', isPositive: true },
      orderTrend: { value: '+5.2%', isPositive: true },
      userTrend: { value: '+8.7%', isPositive: true },
      revenueTrend: { value: '+15.3%', isPositive: true },
    };
  },

  async getSalesData(): Promise<ChartData[]> {
    // return fetchApi<ChartData[]>('/dashboard/sales');
    return [
      { name: 'Jan', sales: 4000, orders: 2400 },
      { name: 'Feb', sales: 3000, orders: 1398 },
      { name: 'Mar', sales: 2000, orders: 9800 },
      { name: 'Apr', sales: 2780, orders: 3908 },
      { name: 'May', sales: 1890, orders: 4800 },
      { name: 'Jun', sales: 2390, orders: 3800 },
      { name: 'Jul', sales: 3490, orders: 4300 },
    ];
  },

  async getTopProducts(): Promise<TopProduct[]> {
    // return fetchApi<TopProduct[]>('/dashboard/top-products');
    return [
      { id: '1', name: 'Product A', sales: 1250, revenue: 125000 },
      { id: '2', name: 'Product B', sales: 980, revenue: 98000 },
      { id: '3', name: 'Product C', sales: 750, revenue: 75000 },
      { id: '4', name: 'Product D', sales: 620, revenue: 62000 },
      { id: '5', name: 'Product E', sales: 510, revenue: 51000 },
    ];
  },

  async getRecentOrders(): Promise<RecentOrder[]> {
    // return fetchApi<RecentOrder[]>('/dashboard/recent-orders');
    return [
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
  },
};
