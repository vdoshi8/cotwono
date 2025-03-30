
import React, { useState, useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { useCarbonData } from '@/contexts/CarbonDataContext';

interface AchievementUnlockedProps {
  achievementId: string;
  onClose: () => void;
}

const AchievementUnlocked: React.FC<AchievementUnlockedProps> = ({ 
  achievementId,
  onClose
}) => {
  const { achievements } = useCarbonData();
  const [isVisible, setIsVisible] = useState(true);
  
  const achievement = achievements.find(a => a.id === achievementId);
  
  if (!achievement) return null;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Allow time for exit animation
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 bg-white dark:bg-card rounded-lg shadow-lg p-4 max-w-xs w-full transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 500);
        }}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
          <Award className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-bold">Achievement Unlocked!</h3>
          <p className="text-xs text-muted-foreground">{achievement.title}</p>
        </div>
      </div>
      
      <div className="mt-3 text-center bg-primary/5 rounded-md p-2">
        <p className="text-xs font-medium text-primary">+{achievement.points} points earned!</p>
      </div>
    </div>
  );
};

export default AchievementUnlocked;
