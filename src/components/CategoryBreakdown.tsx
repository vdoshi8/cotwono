
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Utensils, ShoppingBag, Lightbulb, Trash } from 'lucide-react';

interface Category {
  name: string;
  emissions: number;
  icon: React.ReactNode;
  color: string;
}

const CategoryBreakdown: React.FC = () => {
  const categories: Category[] = [
    { 
      name: 'Transportation', 
      emissions: 32.5, 
      icon: <Car className="h-5 w-5" />, 
      color: 'bg-blue-500' 
    },
    { 
      name: 'Food', 
      emissions: 25.8, 
      icon: <Utensils className="h-5 w-5" />, 
      color: 'bg-green-500' 
    },
    { 
      name: 'Shopping', 
      emissions: 18.2, 
      icon: <ShoppingBag className="h-5 w-5" />, 
      color: 'bg-amber-500' 
    },
    { 
      name: 'Energy', 
      emissions: 15.3, 
      icon: <Lightbulb className="h-5 w-5" />, 
      color: 'bg-orange-500' 
    },
    { 
      name: 'Waste', 
      emissions: 8.2, 
      icon: <Trash className="h-5 w-5" />, 
      color: 'bg-red-500' 
    }
  ];

  const totalEmissions = categories.reduce((sum, category) => sum + category.emissions, 0);
  
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Carbon by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center">
              <div className={`p-2 rounded-full ${category.color.replace('500', '100')} text-${category.color.replace('bg-', '')}`}>
                {category.icon}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.emissions} kg</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className={`${category.color} h-1.5 rounded-full`} 
                    style={{ width: `${(category.emissions / totalEmissions) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
