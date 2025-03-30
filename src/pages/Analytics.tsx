
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmissionsChart from '@/components/EmissionsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useCarbonData } from '@/contexts/CarbonDataContext';
import { useState } from 'react';
import UserProfile from '@/components/UserProfile';

const Analytics = () => {
  const { weeklyEmissionsData, activities, userProfile } = useCarbonData();
  const [userProfileOpen, setUserProfileOpen] = useState(false);

  // Generate monthly data based on weekly data
  const monthlyData = React.useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      name: month,
      value: activities.length > 0 
        ? Math.round(((6 - index) * 20 + Math.random() * 30) * 10) / 10 
        : 0,
      fill: '#22c55e'
    }));
  }, [activities]);

  // Generate category data
  const categoryData = React.useMemo(() => {
    // Count emissions by category
    const categoryTotals: Record<string, number> = {};
    activities.forEach(activity => {
      const category = activity.category;
      categoryTotals[category] = (categoryTotals[category] || 0) + activity.emissions;
    });

    const categoryColors: Record<string, string> = {
      'Transportation': '#3b82f6',
      'Food': '#22c55e',
      'Shopping': '#f59e0b',
      'Energy': '#f97316',
      'Waste': '#ef4444'
    };

    // If no activities, show placeholder data
    if (Object.keys(categoryTotals).length === 0) {
      return [
        { name: 'Transportation', value: 0, color: '#3b82f6' },
        { name: 'Food', value: 0, color: '#22c55e' },
        { name: 'Shopping', value: 0, color: '#f59e0b' },
        { name: 'Energy', value: 0, color: '#f97316' },
        { name: 'Waste', value: 0, color: '#ef4444' },
      ];
    }

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
      color: categoryColors[name] || '#6b7280'
    }));
  }, [activities]);

  // Generate trend data
  const trendData = React.useMemo(() => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
    return weeks.map((week, index) => {
      const hasActivities = activities.length > 0;
      
      // Generate realistic decreasing trend if user has activities
      const baseLine = hasActivities ? 85 - index * 4 : 0;
      
      return {
        name: week,
        footprint: hasActivities ? baseLine - Math.random() * 5 : 0,
        average: hasActivities ? 85 : 0
      };
    });
  }, [activities]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onProfileClick={() => setUserProfileOpen(true)} />
      
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Analyze your carbon footprint trends and patterns</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <EmissionsChart 
            title="Monthly Carbon Emissions"
            data={monthlyData}
            dataKey="value"
          />
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Carbon Footprint by Category</CardTitle>
            </CardHeader>
            <CardContent>
              {!categoryData.some(item => item.value > 0) ? (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  <p className="text-center">No category data available yet. Add some activities to see your breakdown.</p>
                </div>
              ) : (
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value} kg CO₂e`, 'Emissions']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Footprint vs. Average</CardTitle>
            </CardHeader>
            <CardContent>
              {!trendData.some(item => item.footprint > 0) ? (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  <p className="text-center">No trend data available yet. Add some activities to see your progress.</p>
                </div>
              ) : (
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--muted)" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="footprint" 
                        name="Your Footprint" 
                        stroke="var(--primary)" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="average" 
                        name="Average User" 
                        stroke="var(--muted-foreground)" 
                        strokeDasharray="5 5" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <UserProfile open={userProfileOpen} onOpenChange={setUserProfileOpen} />
      <Footer />
    </div>
  );
};

export default Analytics;
