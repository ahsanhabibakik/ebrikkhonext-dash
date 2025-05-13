import { useEffect, useState } from 'react';
import { dashboardService } from '@/services/dashboard';

export function useDashboardData() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
    productTrend: { value: '0%', isPositive: true },
    orderTrend: { value: '0%', isPositive: true },
    revenueTrend: { value: '0%', isPositive: true },
    userTrend: { value: '0%', isPositive: true },
  });
  
  const [salesData, setSalesData] = useState<{name: string; sales: number; orders: number}[]>([]);
  const [topProducts, setTopProducts] = useState<{id: string; name: string; sales: number; revenue: number}[]>([]);
  const [recentOrders, setRecentOrders] = useState<{id: string; customer: string; date: string; amount: number; status: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [statsData, salesData, productsData, ordersData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getSalesData(),
          dashboardService.getTopProducts(),
          dashboardService.getRecentOrders(),
        ]);

        setStats(statsData);
        setSalesData(salesData);
        setTopProducts(productsData);
        setRecentOrders(ordersData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    stats,
    salesData,
    topProducts,
    recentOrders,
    loading,
    error,
    refresh: () => {
      // Implement refresh functionality if needed
      window.location.reload();
    },
  };
}
