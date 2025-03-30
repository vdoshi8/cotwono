
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Utensils, ShoppingBag, Lightbulb, Trash, Activity } from 'lucide-react';
import { useCarbonData } from '@/contexts/CarbonDataContext';

const RecentActivities: React.FC = () => {
  const { activities } = useCarbonData();

  // Function to get the appropriate icon based on the activity's icon string
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'car':
        return <Car className="h-4 w-4" />;
      case 'utensils':
        return <Utensils className="h-4 w-4" />;
      case 'shopping-bag':
        return <ShoppingBag className="h-4 w-4" />;
      case 'lightbulb':
        return <Lightbulb className="h-4 w-4" />;
      case 'trash':
        return <Trash className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card className="card-hover h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
            <p>No activities recorded yet.</p>
            <p className="text-sm">Use the calculator to log your first activity!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="bg-muted rounded-full p-2">
                  {getIconComponent(activity.icon)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{activity.name}</span>
                    <span className="text-sm text-muted-foreground">{activity.date}</span>
                  </div>
                  <div className="flex justify-between mt-1 items-center">
                    <span className={activity.badgeClass}>{activity.category}</span>
                    <span className="text-sm">{activity.emissions.toFixed(1)} kg CO₂e</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
