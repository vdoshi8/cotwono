
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Trophy, Star, Calendar, Bike, Utensils, ShoppingBag, Lightbulb, Trash, Gift } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  description: string;
  progress: number;
  isCompleted: boolean;
  icon?: string;
  points?: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  progress,
  isCompleted,
  icon = "award",
  points = 50
}) => {
  // Function to render the appropriate icon
  const renderIcon = () => {
    switch(icon.toLowerCase()) {
      case 'bike':
        return <Bike className="h-5 w-5 text-primary" />;
      case 'utensils':
        return <Utensils className="h-5 w-5 text-primary" />;
      case 'shopping-bag':
        return <ShoppingBag className="h-5 w-5 text-primary" />;
      case 'lightbulb':
        return <Lightbulb className="h-5 w-5 text-primary" />;
      case 'trash':
        return <Trash className="h-5 w-5 text-primary" />;
      case 'calendar':
        return <Calendar className="h-5 w-5 text-primary" />;
      case 'trophy':
        return <Trophy className="h-5 w-5 text-primary" />;
      case 'star':
        return <Star className="h-5 w-5 text-primary" />;
      case 'gift':
        return <Gift className="h-5 w-5 text-primary" />;
      default:
        return <Award className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className={`card-hover transition-all duration-300 ${isCompleted ? 'border-primary border-2' : 'hover:shadow-md'}`}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-medium flex items-center gap-2">
              {renderIcon()}
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          
          {isCompleted && (
            <div className="bg-primary/10 p-2 rounded-full">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`${isCompleted ? 'bg-primary' : 'bg-secondary'} h-2 rounded-full transition-all duration-700`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {isCompleted ? 'Completed!' : 'In progress...'}
            </span>
            <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
              <Star className="h-3 w-3 text-amber-500" />
              <span className="text-xs font-medium">{points} pts</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
