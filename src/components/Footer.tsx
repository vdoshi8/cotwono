
import React from 'react';
import { Ban } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-background border-t border-border mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative flex items-center justify-center">
              <Ban className="h-5 w-5 text-primary" />
              <span className="absolute text-[7px] font-bold text-primary">2</span>
            </div>
            <span className="font-bold text-lg">CO2No</span>
          </Link>
          
          <div className="text-center md:text-left text-sm text-muted-foreground max-w-xs">
            Helping you track, reduce, and say "No" to carbon emissions
          </div>
          
          <div className="text-sm text-muted-foreground mt-2 md:mt-0">
            &copy; {new Date().getFullYear()} CO2No
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
