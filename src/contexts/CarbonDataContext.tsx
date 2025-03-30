import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ActivityData } from '@/components/CarbonCalculator';
import { Car, Utensils, ShoppingBag, Lightbulb, Trash } from 'lucide-react';

// Define types for achievements
export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  isCompleted: boolean;
  icon?: string;
  points?: number;
  requiredValue?: number;
  category?: string;
}

// Define the shape of our context
interface CarbonDataContextType {
  activities: ActivityData[];
  weeklyEmissionsData: { name: string; value: number; fill: string }[];
  totalEmissions: number;
  addActivity: (activity: Omit<ActivityData, 'id' | 'date' | 'icon' | 'badgeClass'>) => void;
  userProfile: {
    name: string;
    email: string;
    goal: number;
    joinDate: string;
    level?: number;
    points?: number;
  };
  achievements: Achievement[];
  updateAchievementProgress: (id: string, progress: number) => void;
  userStats: {
    totalActivities: number;
    streakDays: number;
    savedEmissions: number;
  };
}

// Create the context
const CarbonDataContext = createContext<CarbonDataContextType | undefined>(undefined);

// Generate mock data for initialized state
const generateInitialActivities = (): ActivityData[] => {
  return [
    {
      id: '1',
      name: 'Commute to work',
      category: 'Transportation',
      emissions: 3.2,
      date: '30 minutes ago',
      icon: 'car',
      badgeClass: 'badge-blue'
    },
    {
      id: '2',
      name: 'Vegetarian lunch',
      category: 'Food',
      emissions: 1.5,
      date: '2 hours ago',
      icon: 'utensils',
      badgeClass: 'badge-green'
    },
    {
      id: '3',
      name: 'Online shopping',
      category: 'Shopping',
      emissions: 2.8,
      date: '4 hours ago',
      icon: 'shopping-bag',
      badgeClass: 'badge-amber'
    },
    {
      id: '4',
      name: 'Used air conditioning',
      category: 'Energy',
      emissions: 3.5,
      date: '5 hours ago',
      icon: 'lightbulb',
      badgeClass: 'badge-amber'
    }
  ];
};

// Generate weekly emissions data
const generateWeeklyData = (activities: ActivityData[]) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // In a real app, we would aggregate activity emissions by day
  // For demo purposes, we'll generate some values
  return days.map(day => ({
    name: day,
    value: activities.length > 0 
      ? Math.round((Math.random() * 10 + 5) * 10) / 10 
      : 0,
    fill: '#22c55e'
  }));
};

// Initial achievements data
const initialAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Green Commuter',
    description: 'Use public transportation or bike to work for 5 consecutive days',
    progress: 100,
    isCompleted: true,
    icon: 'bike',
    points: 100,
    requiredValue: 5,
    category: 'Transportation'
  },
  {
    id: '2',
    title: 'Plant-Based Pioneer',
    description: 'Eat plant-based meals for 10 days in a month',
    progress: 70,
    isCompleted: false,
    icon: 'utensils',
    points: 150,
    requiredValue: 10,
    category: 'Food'
  },
  {
    id: '3',
    title: 'Energy Saver',
    description: 'Reduce your electricity usage by 10% compared to last month',
    progress: 100,
    isCompleted: true,
    icon: 'lightbulb',
    points: 120,
    requiredValue: 10,
    category: 'Energy'
  },
  {
    id: '4',
    title: 'Zero Waste Warrior',
    description: 'Go a full week without producing landfill waste',
    progress: 40,
    isCompleted: false,
    icon: 'trash',
    points: 200,
    requiredValue: 7,
    category: 'Waste'
  },
  {
    id: '5',
    title: 'Carbon Footprint Tracker',
    description: 'Log your activities for 14 consecutive days',
    progress: 85,
    isCompleted: false,
    icon: 'calendar',
    points: 150,
    requiredValue: 14,
    category: 'Tracking'
  },
  {
    id: '6',
    title: 'Sustainable Shopper',
    description: 'Make 5 purchases from sustainable brands',
    progress: 60,
    isCompleted: false,
    icon: 'shopping-bag',
    points: 100,
    requiredValue: 5,
    category: 'Shopping'
  },
];

// Initial user stats
const initialUserStats = {
  totalActivities: 24,
  streakDays: 8,
  savedEmissions: 45.2,
};

// Provider component
export const CarbonDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [activities, setActivities] = useState<ActivityData[]>(() => {
    // Try to load from localStorage
    const savedActivities = localStorage.getItem('carbonActivities');
    return savedActivities ? JSON.parse(savedActivities) : generateInitialActivities();
  });
  
  const [weeklyEmissionsData, setWeeklyEmissionsData] = useState(() => 
    generateWeeklyData(activities)
  );
  
  const [totalEmissions, setTotalEmissions] = useState(() => 
    activities.reduce((sum, activity) => sum + activity.emissions, 0)
  );

  const [userProfile, setUserProfile] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    goal: 100, // kg CO2 per week
    joinDate: '2023-01-15',
    level: 2,
    points: 320,
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const savedAchievements = localStorage.getItem('carbonAchievements');
    return savedAchievements ? JSON.parse(savedAchievements) : initialAchievements;
  });

  const [userStats, setUserStats] = useState(() => {
    const savedStats = localStorage.getItem('carbonUserStats');
    return savedStats ? JSON.parse(savedStats) : initialUserStats;
  });

  // Update localStorage when activities change
  useEffect(() => {
    localStorage.setItem('carbonActivities', JSON.stringify(activities));
    setTotalEmissions(activities.reduce((sum, activity) => sum + activity.emissions, 0));
    setWeeklyEmissionsData(generateWeeklyData(activities));
  }, [activities]);

  // Update localStorage when achievements change
  useEffect(() => {
    localStorage.setItem('carbonAchievements', JSON.stringify(achievements));
  }, [achievements]);

  // Update localStorage when user stats change
  useEffect(() => {
    localStorage.setItem('carbonUserStats', JSON.stringify(userStats));
  }, [userStats]);

  // Get badge class and icon based on category
  const getCategoryDetails = (category: string): { badgeClass: string; icon: string } => {
    switch (category.toLowerCase()) {
      case 'transportation':
        return { badgeClass: 'badge-blue', icon: 'car' };
      case 'food':
        return { badgeClass: 'badge-green', icon: 'utensils' };
      case 'shopping':
        return { badgeClass: 'badge-amber', icon: 'shopping-bag' };
      case 'energy':
        return { badgeClass: 'badge-orange', icon: 'lightbulb' };
      case 'waste':
        return { badgeClass: 'badge-red', icon: 'trash' };
      default:
        return { badgeClass: 'badge-gray', icon: 'activity' };
    }
  };

  // Update achievement progress
  const updateAchievementProgress = (id: string, progress: number) => {
    setAchievements(prev => 
      prev.map(achievement => {
        if (achievement.id === id) {
          const updatedProgress = Math.min(100, progress);
          const isCompleted = updatedProgress >= 100;
          
          // If newly completed, show toast notification
          if (isCompleted && !achievement.isCompleted) {
            toast.success(`Achievement unlocked: ${achievement.title}!`, {
              description: `You've earned ${achievement.points} points!`,
            });
            
            // Update user profile with points
            setUserProfile(prev => ({
              ...prev,
              points: prev.points ? prev.points + (achievement.points || 0) : achievement.points || 0,
            }));
          }
          
          return {
            ...achievement,
            progress: updatedProgress,
            isCompleted,
          };
        }
        return achievement;
      })
    );
  };

  // Add a new activity
  const addActivity = (activity: Omit<ActivityData, 'id' | 'date' | 'icon' | 'badgeClass'>) => {
    const categoryDetails = getCategoryDetails(activity.category);
    
    const newActivity: ActivityData = {
      id: Date.now().toString(),
      date: 'Just now',
      ...activity,
      ...categoryDetails
    };
    
    setActivities(prev => [newActivity, ...prev]);
    
    // Update related achievements based on activity
    achievements.forEach(achievement => {
      if (achievement.category?.toLowerCase() === activity.category.toLowerCase()) {
        // For simplicity, just increase progress by 10% for related categories
        if (!achievement.isCompleted) {
          updateAchievementProgress(achievement.id, achievement.progress + 10);
        }
      }
    });
    
    // Update user stats
    setUserStats(prev => ({
      ...prev,
      totalActivities: prev.totalActivities + 1,
      savedEmissions: prev.savedEmissions + (activity.emissions * 0.2), // Assume 20% reduction from tracking
    }));
    
    toast.success('New activity added!');
  };

  return (
    <CarbonDataContext.Provider value={{
      activities,
      weeklyEmissionsData,
      totalEmissions,
      addActivity,
      userProfile,
      achievements,
      updateAchievementProgress,
      userStats
    }}>
      {children}
    </CarbonDataContext.Provider>
  );
};

// Custom hook to use the context
export const useCarbonData = () => {
  const context = useContext(CarbonDataContext);
  if (context === undefined) {
    throw new Error('useCarbonData must be used within a CarbonDataProvider');
  }
  return context;
};
