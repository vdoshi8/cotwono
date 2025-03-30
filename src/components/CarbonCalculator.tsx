
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Car, Footprints, Plus } from 'lucide-react';
import { toast } from 'sonner';

// Interface for activity data
export interface ActivityData {
  id: string;
  name: string;
  category: string;
  emissions: number;
  date: string;
  icon: string;
  badgeClass: string;
}

interface CarbonCalculatorProps {
  onSaveActivity?: (activity: Omit<ActivityData, 'id' | 'date' | 'icon' | 'badgeClass'>) => void;
}

const CarbonCalculator: React.FC<CarbonCalculatorProps> = ({ onSaveActivity }) => {
  const [activity, setActivity] = useState('walking');
  const [distance, setDistance] = useState('');
  const [savings, setSavings] = useState<number | null>(null);
  const [carEmissions, setCarEmissions] = useState<number>(0);
  const [activityEmissions, setActivityEmissions] = useState<number>(0);

  // Carbon emission factors (kg CO2 per mile)
  const emissionFactors = {
    car: 0.404, // Average car emissions kg CO2 per mile
    walking: 0,  // Walking has zero direct emissions
    cycling: 0,  // Cycling has zero direct emissions
    bus: 0.171,  // Bus emissions per passenger per mile
    train: 0.098, // Train emissions per passenger per mile
    // Adding more transportation options
    carpool: 0.202, // Half of car emissions assuming 2 people
    electric_car: 0.119, // Electric car emissions
    motorcycle: 0.208, // Motorcycle emissions
    flight_short: 0.255, // Short haul flight per mile
  };

  const getCategoryFromActivity = (activityType: string): string => {
    return 'Transportation';
  };

  const handleCalculate = () => {
    if (!distance || isNaN(Number(distance)) || Number(distance) <= 0) {
      toast.error('Please enter a valid distance');
      return;
    }

    const distanceValue = Number(distance);
    
    // Calculate how much CO2 was saved by not using a car
    const calculatedCarEmissions = distanceValue * emissionFactors.car;
    const calculatedActivityEmissions = distanceValue * emissionFactors[activity as keyof typeof emissionFactors];
    const carbonSaved = calculatedCarEmissions - calculatedActivityEmissions;
    
    setCarEmissions(calculatedCarEmissions);
    setActivityEmissions(calculatedActivityEmissions);
    setSavings(carbonSaved);
    toast.success('Carbon savings calculated!');
  };

  const handleSaveActivity = () => {
    if (savings === null) {
      toast.error('Please calculate savings first');
      return;
    }

    if (onSaveActivity) {
      const activityName = `${activity.charAt(0).toUpperCase() + activity.slice(1)} for ${distance} miles`;
      
      onSaveActivity({
        name: activityName,
        category: getCategoryFromActivity(activity),
        emissions: activityEmissions
      });

      toast.success('Activity saved successfully!');
      
      // Reset form after saving
      setDistance('');
      setSavings(null);
    } else {
      toast.error('Unable to save activity at this time');
    }
  };

  const getActivityLabel = (activityType: string): string => {
    switch (activityType) {
      case 'walking': return 'Walk';
      case 'cycling': return 'Cycle';
      case 'bus': return 'Take the Bus';
      case 'train': return 'Take the Train';
      case 'carpool': return 'Carpool';
      case 'electric_car': return 'Drive Electric Car';
      case 'motorcycle': return 'Ride Motorcycle';
      case 'flight_short': return 'Take a Short Flight';
      default: return activityType.charAt(0).toUpperCase() + activityType.slice(1);
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Carbon Savings Calculator</CardTitle>
        <CardDescription>
          Calculate how much CO₂ you saved by choosing greener transportation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="activity">I chose to</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger id="activity">
                <SelectValue placeholder="Select an activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="walking">
                  <div className="flex items-center gap-2">
                    <Footprints className="h-4 w-4" />
                    <span>Walk</span>
                  </div>
                </SelectItem>
                <SelectItem value="cycling">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M5 12h4.5l2 -4l4 8l2 -4h4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span>Cycle</span>
                  </div>
                </SelectItem>
                <SelectItem value="bus">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 17h12M6 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2M6 17H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1M14 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2M14 17h-4M5 9h14M8 5v4M12 5v4M16 5v4M8 13h.01M16 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span>Take the Bus</span>
                  </div>
                </SelectItem>
                <SelectItem value="train">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 15L20 15M20 15L15 10M20 15L15 20M8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span>Take the Train</span>
                  </div>
                </SelectItem>
                <SelectItem value="carpool">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M5 9h14M5 9h0a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v7h-3m-11-7l1.5-4.5h9l1.5 4.5M3 17h1m16 0h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span>Carpool</span>
                  </div>
                </SelectItem>
                <SelectItem value="electric_car">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.8 13a2 2 0 0 0 .2-1V7a2 2 0 0 0-2-2h-10a2 2 0 0 0-2 2v5M2 17h20M6 17v.01M18 17v.01M14.5 11.5 16 10M7 10h3M4 15h16M6 7v3M18 7v3M9 4v3M15 4v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <path d="m10 12 2 2M13 9 11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span>Electric Car</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="distance">Instead of driving for</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="distance"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
              <span className="font-medium">miles</span>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">Calculate Savings</Button>

          {savings !== null && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-destructive" />
                  <span className="font-medium">Car emissions:</span>
                </div>
                <span>{carEmissions.toFixed(2)} kg CO₂</span>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  {activity === 'walking' ? (
                    <Footprints className="h-5 w-5 text-primary" />
                  ) : activity === 'cycling' ? (
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M5 12h4.5l2 -4l4 8l2 -4h4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  ) : activity === 'bus' ? (
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 17h12M6 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2M6 17H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1M14 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2M14 17h-4M5 9h14M8 5v4M12 5v4M16 5v4M8 13h.01M16 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 15L20 15M20 15L15 10M20 15L15 20M8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  )}
                  <span className="font-medium">{getActivityLabel(activity)} emissions:</span>
                </div>
                <span>{activityEmissions.toFixed(2)} kg CO₂</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">You saved:</span>
                  <span className="font-bold text-lg text-primary">{savings.toFixed(2)} kg CO₂</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  That's equivalent to the CO₂ absorbed by {(savings / 0.06).toFixed(1)} trees in a day!
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <Button onClick={handleSaveActivity} className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Save as Activity
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonCalculator;
