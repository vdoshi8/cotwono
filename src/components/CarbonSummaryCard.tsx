
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CarbonSummaryCardProps {
  totalEmissions: number;
  goal: number;
  period: string;
}

const CarbonSummaryCard: React.FC<CarbonSummaryCardProps> = ({
  totalEmissions,
  goal,
  period
}) => {
  const progressPercentage = Math.min(100, (totalEmissions / goal) * 100);
  
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Carbon Footprint</span>
          <span className="text-sm font-normal text-muted-foreground">{period}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-2">
          <div className="text-3xl font-bold">{totalEmissions.toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">
            of <span className="font-medium">{goal} kg</span> CO₂e
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        
        <div className="mt-4 text-sm text-muted-foreground">
          {progressPercentage <= 100 ? (
            <>You're <span className="text-primary font-medium">{(100 - progressPercentage).toFixed(0)}%</span> below your carbon budget</>
          ) : (
            <>You've exceeded your carbon budget by <span className="text-destructive font-medium">{(progressPercentage - 100).toFixed(0)}%</span></>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonSummaryCard;
