import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

type ActivityType = 'order_created' | 'order_updated' | 'product_added' | 'user_registered';

interface Activity {
  id: string;
  type: ActivityType;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  description: string;
  timestamp: Date;
  meta?: Record<string, any>;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'order_created',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    description: 'created a new order',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    meta: {
      orderId: 'ORD-1234'
    }
  },
  {
    id: '2',
    type: 'product_added',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    description: 'added a new product',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    meta: {
      productName: 'Wireless Headphones'
    }
  },
  {
    id: '3',
    type: 'order_updated',
    user: {
      name: 'Admin',
      email: 'admin@example.com',
    },
    description: 'updated order status',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    meta: {
      orderId: 'ORD-1233',
      status: 'shipped'
    }
  },
  {
    id: '4',
    type: 'user_registered',
    user: {
      name: 'New User',
      email: 'new@example.com',
    },
    description: 'signed up for an account',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
];

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'order_created':
      return '🛒';
    case 'order_updated':
      return '✏️';
    case 'product_added':
      return '📦';
    case 'user_registered':
      return '👤';
    default:
      return '🔔';
  }
};

export function RecentActivity() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-9 w-9 flex items-center justify-center bg-muted text-lg">
              <AvatarFallback>
                {getActivityIcon(activity.type)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-muted-foreground">
                    {activity.description}
                    {activity.meta?.orderId && (
                      <span className="ml-1 font-mono text-sm">
                        #{activity.meta.orderId}
                      </span>
                    )}
                    {activity.meta?.productName && (
                      <span className="ml-1 font-medium">
                        "{activity.meta.productName}"
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
              {activity.meta?.status && (
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {activity.meta.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
