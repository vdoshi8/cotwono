
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface EmissionsData {
  name: string;
  value: number;
  fill: string;
}

interface EmissionsChartProps {
  title: string;
  data: EmissionsData[];
  dataKey: string;
  height?: number;
  emptyMessage?: string;
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({ 
  title, 
  data, 
  dataKey, 
  height = 300,
  emptyMessage = "No data available yet. Add some activities to see your emissions chart."
}) => {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-sm">{`${payload[0].value} kg CO₂e`}</p>
        </div>
      );
    }
    return null;
  };

  // Check if all data values are zero
  const hasData = data.some(item => item.value > 0);

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <p className="text-center">{emptyMessage}</p>
          </div>
        ) : (
          <div style={{ height: `${height}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 25,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted)" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={{ stroke: 'var(--border)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={{ stroke: 'var(--border)' }} 
                  unit=" kg"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey={dataKey} fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmissionsChart;
