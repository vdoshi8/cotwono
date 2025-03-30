
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarbonSummaryCard from '@/components/CarbonSummaryCard';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import RecentActivities from '@/components/RecentActivities';
import Earth2D from '@/components/Earth2D';
import AddActivityDialog from '@/components/AddActivityDialog';
import TipsCard from '@/components/TipsCard';
import EmissionsChart from '@/components/EmissionsChart';
import CarbonCalculator from '@/components/CarbonCalculator';
import UserProfile from '@/components/UserProfile';
import { useCarbonData } from '@/contexts/CarbonDataContext';
import { 
  User, 
  BarChart2, 
  Activity, 
  Calendar, 
  Ban 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { weeklyEmissionsData, totalEmissions, addActivity, userProfile } = useCarbonData();
  const [prefilledActivityData, setPrefilledActivityData] = useState<any>(null);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Handle calculator saving activity
  const handleCalculatorSave = (activityData: any) => {
    setPrefilledActivityData(activityData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onProfileClick={() => setUserProfileOpen(true)} />
      
      <main className="flex-1 container py-4 md:py-6">
        <div className="flex flex-col space-y-4 md:space-y-6">
          {/* Hero section - Matching the reference image exactly */}
          <section className="relative rounded-lg overflow-hidden bg-gradient-to-br from-green-600 to-green-700 p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4">Say NO to Carbon Emissions</h1>
                <p className="mb-6 opacity-90 max-w-xl">
                  Monitor, reduce, and offset your carbon footprint with AI-powered insights and personalized recommendations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-green-700 hover:bg-green-800 text-white" size={isMobile ? "sm" : "default"}>
                    + Add Activity
                  </Button>
                  <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 bg-white/10 hover:bg-white/20">
                    <User className="h-4 w-4" />
                    My Profile
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-56 h-56 relative">
                  <Earth2D />
                </div>
              </div>
            </div>
          </section>
          
          {/* Carbon Calculator section */}
          <section>
            <CarbonCalculator onSaveActivity={handleCalculatorSave} />
          </section>
          
          {/* Summary and Breakdown section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <CarbonSummaryCard totalEmissions={totalEmissions} goal={userProfile.goal} period="This Week" />
            <CategoryBreakdown />
            <TipsCard />
          </section>
          
          {/* Activity tracking and trends section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <EmissionsChart 
                title="Weekly Carbon Emissions"
                data={weeklyEmissionsData}
                dataKey="value"
                height={isMobile ? 240 : 300}
              />
            </div>
            <RecentActivities />
          </section>
          
          {/* Impact section */}
          <section className="bg-muted rounded-lg p-4 md:p-6 animate-scale-in">
            <div className="flex items-center justify-center text-center flex-col">
              <div className="bg-primary/10 p-3 rounded-full mb-3 md:mb-4">
                <Ban className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">Your Environmental Impact</h2>
              <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
                By tracking and reducing your carbon footprint, you've helped save the equivalent of{' '}
                {Math.round((totalEmissions * 0.1))} trees this month. 
                Keep up the great work and inspire others to join the movement!
              </p>
              <div className="flex items-center justify-center mt-4 gap-6 md:gap-8">
                <div className="flex flex-col items-center">
                  <BarChart2 className="h-4 w-4 md:h-5 md:w-5 text-primary mb-1" />
                  <span className="font-bold">{totalEmissions.toFixed(1)} kg</span>
                  <span className="text-xs text-muted-foreground">CO2 This Week</span>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="h-4 w-4 md:h-5 md:w-5 text-primary mb-1" />
                  <span className="font-bold">-12.5%</span>
                  <span className="text-xs text-muted-foreground">vs Last Week</span>
                </div>
                <div className="flex flex-col items-center">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary mb-1" />
                  <span className="font-bold">42 days</span>
                  <span className="text-xs text-muted-foreground">Streak</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <UserProfile open={userProfileOpen} onOpenChange={setUserProfileOpen} />
      <Footer />
    </div>
  );
};

export default Index;
