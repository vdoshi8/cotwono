
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface Tip {
  id: string;
  text: string;
  category: string;
  potentialSavings: string;
}

const TipsCard: React.FC = () => {
  const tips: Tip[] = [
    {
      id: '1',
      text: 'Try biking instead of driving for trips less than 2 miles',
      category: 'Transportation',
      potentialSavings: '3.2 kg CO₂e per trip'
    },
    {
      id: '2',
      text: 'Reduce meat consumption by having one vegetarian day per week',
      category: 'Food',
      potentialSavings: '10 kg CO₂e per week'
    },
    {
      id: '3',
      text: 'Adjust your thermostat by 1°C cooler in winter and 1°C warmer in summer',
      category: 'Energy',
      potentialSavings: '350 kg CO₂e per year'
    }
  ];

  // Randomly select one tip to show
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Card className="card-hover bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI-Powered Tip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{randomTip.text}</p>
        <div className="mt-2 text-sm text-muted-foreground">
          <span className="block">Category: {randomTip.category}</span>
          <span className="block">Potential Savings: {randomTip.potentialSavings}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsCard;
