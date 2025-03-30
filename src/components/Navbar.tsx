
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart2, Trophy, Settings, Menu, X, User, LayoutDashboard, Leaf } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useCarbonData } from '@/contexts/CarbonDataContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  onProfileClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileClick }) => {
  const location = useLocation();
  const { userProfile } = useCarbonData();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart2 className="h-4 w-4" /> },
    { path: '/achievements', label: 'Achievements', icon: <Trophy className="h-4 w-4" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <Leaf className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              <span className="absolute text-[7px] md:text-[8px] font-bold text-primary">2</span>
            </div>
            <span className="text-lg md:text-xl font-bold">CO2No</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.path}
              variant={isActive(link.path) ? 'default' : 'ghost'}
              asChild
            >
              <Link to={link.path} className="gap-2">
                {link.icon}
                {link.label}
              </Link>
            </Button>
          ))}
          
          <Button
            variant="ghost"
            className="relative gap-2 ml-2"
            onClick={onProfileClick}
          >
            <User className="h-4 w-4" />
            <span>{userProfile ? userProfile.name.split(' ')[0] : 'Profile'}</span>
          </Button>
        </nav>

        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] max-w-sm">
            <div className="flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.path}>
                  <Button
                    variant={isActive(link.path) ? 'default' : 'ghost'}
                    asChild
                    className="justify-start h-12 text-base"
                  >
                    <Link to={link.path} className="w-full gap-3">
                      {link.icon}
                      {link.label}
                    </Link>
                  </Button>
                </SheetClose>
              ))}
              
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="justify-start h-12 text-base w-full gap-3"
                  onClick={onProfileClick}
                >
                  <User className="h-4 w-4" />
                  {userProfile ? userProfile.name : 'Profile'}
                </Button>
              </SheetClose>
            </div>
            <SheetClose className="absolute right-4 top-4">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
