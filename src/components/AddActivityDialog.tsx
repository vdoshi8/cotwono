
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddActivityDialogProps {
  onAddActivity?: (activity: {
    category: string;
    name: string;
    emissions: number;
  }) => void;
  prefilledData?: {
    category: string;
    name: string;
    emissions: number;
  } | null;
}

const AddActivityDialog: React.FC<AddActivityDialogProps> = ({ 
  onAddActivity,
  prefilledData = null 
}) => {
  const [category, setCategory] = useState(prefilledData?.category || '');
  const [activityName, setActivityName] = useState(prefilledData?.name || '');
  const [emissions, setEmissions] = useState(prefilledData?.emissions ? String(prefilledData.emissions) : '');
  const [open, setOpen] = useState(false);

  // Reset form when dialog opens/closes or when prefilledData changes
  React.useEffect(() => {
    if (prefilledData) {
      setCategory(prefilledData.category);
      setActivityName(prefilledData.name);
      setEmissions(String(prefilledData.emissions));
    }
  }, [prefilledData]);

  const handleSubmit = () => {
    if (!category || !activityName || !emissions) {
      toast.error('Please fill out all fields');
      return;
    }

    if (onAddActivity) {
      onAddActivity({
        category,
        name: activityName,
        emissions: Number(emissions)
      });
    }

    toast.success('Activity added successfully!');
    setOpen(false);
    
    // Reset form
    setCategory('');
    setActivityName('');
    setEmissions('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
          <DialogDescription>
            Log a new activity that contributes to your carbon footprint.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="waste">Waste</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="activity">Activity Name</Label>
            <Input
              id="activity"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="e.g. Bus ride to work"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="emissions">CO₂ Emissions (kg)</Label>
            <Input
              id="emissions"
              value={emissions}
              onChange={(e) => setEmissions(e.target.value)}
              placeholder="e.g. 2.5"
              type="number"
              step="0.1"
              min="0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Activity</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddActivityDialog;
