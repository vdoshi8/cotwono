import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AchievementCard from '@/components/AchievementCard';
import { useCarbonData } from '@/contexts/CarbonDataContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, Filter, Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Achievements = () => {
  const { achievements, userProfile, userStats } = useCarbonData();
  const [filter, setFilter] = useState<string | null>(null);

  // Filter achievements based on selected filter
  const filteredAchievements = filter 
    ? achievements.filter(a => a.category === filter || (filter === 'completed' && a.isCompleted) || (filter === 'in-progress' && !a.isCompleted))
    : achievements;

  const completedAchievements = achievements.filter(a => a.isCompleted).length;
  const totalAchievements = achievements.length;
  const overallProgress = (completedAchievements / totalAchievements) * 100;
  
  // Calculate next level threshold
  const currentLevel = userProfile.level || 1;
  const pointsForNextLevel = currentLevel * 200;
  const currentPoints = userProfile.points || 0;
  const levelProgress = Math.min(100, (currentPoints / pointsForNextLevel) * 100);

  // Get unique achievement categories
  const categories = Array.from(new Set(achievements.map(a => a.category))).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Track your progress and earn badges for sustainable actions</p>
        </div>
        
        {/* User Level and Points */}
        <div className="mb-6 bg-gradient-to-r from-forest-light to-earth-light rounded-lg p-6 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white text-primary font-bold text-xl border-4 border-primary">
                  {currentLevel}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white text-xs rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5" />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-1">Eco Warrior Level {currentLevel}</h2>
                <p className="text-sm">Earn <span className="font-bold">{pointsForNextLevel - currentPoints}</span> more points to reach Level {currentLevel + 1}</p>
                <div className="mt-2 w-full max-w-xs">
                  <Progress value={levelProgress} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center bg-white/80 py-3 px-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Trophy className="text-amber-500 h-5 w-5" />
                <span className="text-2xl font-bold">{currentPoints}</span>
              </div>
              <span className="text-xs text-muted-foreground">Total Points Earned</span>
            </div>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="mb-6 bg-muted rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Overall Progress</h2>
              <p className="text-muted-foreground">You've completed {completedAchievements} out of {totalAchievements} achievements</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                {Math.round(overallProgress)}%
              </div>
            </div>
          </div>
          
          {/* Achievement stats */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">Activities Logged</p>
              <p className="text-xl font-bold">{userStats.totalActivities}</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-xl font-bold">{userStats.streakDays} days</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              <p className="text-xl font-bold">{userStats.savedEmissions.toFixed(1)} kg</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">Earned Badges</p>
              <p className="text-xl font-bold">{completedAchievements}</p>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Button 
            variant={filter === null ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter(null)}
            className="gap-2"
          >
            <Award className="h-4 w-4" />
            All
          </Button>
          <Button 
            variant={filter === 'completed' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('completed')}
            className="gap-2"
          >
            <Check className="h-4 w-4" />
            Completed
          </Button>
          <Button 
            variant={filter === 'in-progress' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('in-progress')}
            className="gap-2"
          >
            <Star className="h-4 w-4" />
            In Progress
          </Button>
          
          {categories.map(category => (
            <Button 
              key={category}
              variant={filter === category ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter(category as string)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <AchievementCard 
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              progress={achievement.progress}
              isCompleted={achievement.isCompleted}
              icon={achievement.icon}
              points={achievement.points}
            />
          ))}
        </div>
        
        {/* Challenge section */}
        <div className="mt-8 mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Monthly Challenges
          </h2>
          <p className="text-muted-foreground">Complete these special challenges to earn bonus points</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="card-hover border-2 border-dashed border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 border-0">Community Challenge</Badge>
              <h3 className="text-lg font-bold mb-1">Plastic-Free July</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Avoid single-use plastics for the entire month of July. Log your plastic-free days to earn points.
              </p>
              <div className="flex justify-between text-sm mb-1">
                <span>Community Progress</span>
                <span>42%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '42%' }} />
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">23 days remaining</span>
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span className="text-xs font-medium">300 pts</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover border-2 border-dashed border-amber-500/50 bg-amber-500/5">
            <CardContent className="pt-6">
              <Badge className="mb-2 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-0">Weekly Challenge</Badge>
              <h3 className="text-lg font-bold mb-1">Meatless Week</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Go vegetarian or vegan for 7 days. Track your plant-based meals to earn extra points.
              </p>
              <div className="flex justify-between text-sm mb-1">
                <span>Your Progress</span>
                <span>3/7 days</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '43%' }} />
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">4 days remaining</span>
                <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 rounded-full">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span className="text-xs font-medium">150 pts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Achievements;
