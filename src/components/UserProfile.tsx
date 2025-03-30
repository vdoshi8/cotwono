
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCarbonData } from '@/contexts/CarbonDataContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Award, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface UserProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ open, onOpenChange }) => {
  const { userProfile, totalEmissions, activities, achievements, userStats } = useCarbonData();
  
  const completedAchievements = achievements.filter(a => a.isCompleted);
  const recentAchievements = completedAchievements.slice(0, 3);
  
  // Calculate level progress
  const currentLevel = userProfile.level || 1;
  const pointsForNextLevel = currentLevel * 200;
  const currentPoints = userProfile.points || 0;
  const levelProgress = Math.min(100, (currentPoints / pointsForNextLevel) * 100);
  const pointsToNextLevel = pointsForNextLevel - currentPoints;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-y-auto">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative">
            <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
              <AvatarImage src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=150&h=150" alt="User avatar" />
              <AvatarFallback>
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">
              {currentLevel}
            </div>
          </div>
          
          <h3 className="text-xl font-bold">{userProfile.name}</h3>
          <p className="text-muted-foreground">{userProfile.email}</p>
          
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200 hover:bg-blue-500/20">Carbon Tracker</Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200 hover:bg-green-500/20">Eco Enthusiast</Badge>
          </div>
          
          {/* Level progress */}
          <div className="mt-5 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-500" />
                Level {currentLevel}
              </span>
              <span className="text-sm text-muted-foreground">
                {currentPoints}/{pointsForNextLevel} points
              </span>
            </div>
            <Progress value={levelProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {pointsToNextLevel} points until Level {currentLevel + 1}
            </p>
          </div>
        </div>
        
        <div className="space-y-4 mt-2">
          <div>
            <h4 className="font-medium mb-3">Your Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground text-sm">Weekly Goal</p>
                <p className="text-xl font-bold">{userProfile.goal} kg CO₂e</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground text-sm">Current Usage</p>
                <p className="text-xl font-bold">{totalEmissions.toFixed(1)} kg CO₂e</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground text-sm">Activities Logged</p>
                <p className="text-xl font-bold">{activities.length}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-muted-foreground text-sm">Current Streak</p>
                <p className="text-xl font-bold">{userStats.streakDays} days</p>
              </div>
            </div>
          </div>
          
          {recentAchievements.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                Recent Achievements
              </h4>
              <div className="space-y-3">
                {recentAchievements.map(achievement => (
                  <div key={achievement.id} className="flex items-center gap-3 bg-background border p-3 rounded-md">
                    <div className="flex-shrink-0 bg-primary/10 p-1.5 rounded-full">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{achievement.description}</p>
                    </div>
                    <div className="flex-shrink-0 bg-primary/10 px-2 py-1 rounded-full">
                      <span className="text-xs font-medium text-primary">+{achievement.points}</span>
                    </div>
                  </div>
                ))}
                
                <div className="text-center mt-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/achievements" onClick={() => onOpenChange(false)}>
                      View all achievements
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Carbon Impact</h4>
            <p className="text-sm text-muted-foreground">
              You've saved approximately {userStats.savedEmissions.toFixed(1)} kg of CO₂e by making eco-friendly choices.
              That's equivalent to planting {Math.round(userStats.savedEmissions / 20)} trees!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
