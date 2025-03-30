
import React, { useEffect, useRef } from 'react';

const Earth2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = 240;  // Fixed width as in the reference
      canvas.height = 240; // Fixed height as in the reference
    };
    
    updateCanvasSize();
    
    // Colors
    const oceanColor = '#3C9BB3'; // Deeper blue as in reference
    const landColor = '#5AB672';  // Brighter green as in reference
    
    // Simplified continent shapes (adjusted for more accuracy to reference)
    const continents = [
      // North America
      { 
        path: (ctx: CanvasRenderingContext2D, w: number, h: number) => {
          ctx.beginPath();
          ctx.moveTo(w * 0.2, h * 0.2);
          ctx.bezierCurveTo(w * 0.25, h * 0.15, w * 0.3, h * 0.2, w * 0.3, h * 0.3);
          ctx.bezierCurveTo(w * 0.35, h * 0.4, w * 0.25, h * 0.45, w * 0.2, h * 0.4);
          ctx.bezierCurveTo(w * 0.15, h * 0.35, w * 0.15, h * 0.25, w * 0.2, h * 0.2);
          ctx.closePath();
        }
      },
      // South America
      {
        path: (ctx: CanvasRenderingContext2D, w: number, h: number) => {
          ctx.beginPath();
          ctx.moveTo(w * 0.3, h * 0.55);
          ctx.bezierCurveTo(w * 0.35, h * 0.6, w * 0.3, h * 0.75, w * 0.25, h * 0.7);
          ctx.bezierCurveTo(w * 0.2, h * 0.65, w * 0.25, h * 0.55, w * 0.3, h * 0.55);
          ctx.closePath();
        }
      },
      // Africa
      {
        path: (ctx: CanvasRenderingContext2D, w: number, h: number) => {
          ctx.beginPath();
          ctx.moveTo(w * 0.55, h * 0.35);
          ctx.bezierCurveTo(w * 0.6, h * 0.45, w * 0.6, h * 0.65, w * 0.5, h * 0.7);
          ctx.bezierCurveTo(w * 0.45, h * 0.6, w * 0.45, h * 0.4, w * 0.55, h * 0.35);
          ctx.closePath();
        }
      },
      // Europe
      {
        path: (ctx: CanvasRenderingContext2D, w: number, h: number) => {
          ctx.beginPath();
          ctx.moveTo(w * 0.5, h * 0.2);
          ctx.bezierCurveTo(w * 0.55, h * 0.15, w * 0.6, h * 0.2, w * 0.55, h * 0.3);
          ctx.bezierCurveTo(w * 0.5, h * 0.3, w * 0.45, h * 0.25, w * 0.5, h * 0.2);
          ctx.closePath();
        }
      },
      // Asia
      {
        path: (ctx: CanvasRenderingContext2D, w: number, h: number) => {
          ctx.beginPath();
          ctx.moveTo(w * 0.6, h * 0.25);
          ctx.bezierCurveTo(w * 0.75, h * 0.2, w * 0.85, h * 0.3, w * 0.8, h * 0.4);
          ctx.bezierCurveTo(w * 0.75, h * 0.5, w * 0.65, h * 0.45, w * 0.6, h * 0.35);
          ctx.closePath();
        }
      },
      // Australia
      {
        path: (ctx: CanvasRenderingContext2D, w: number, h: number) => {
          ctx.beginPath();
          ctx.moveTo(w * 0.8, h * 0.6);
          ctx.bezierCurveTo(w * 0.9, h * 0.55, w * 0.9, h * 0.7, w * 0.8, h * 0.7);
          ctx.bezierCurveTo(w * 0.75, h * 0.75, w * 0.75, h * 0.6, w * 0.8, h * 0.6);
          ctx.closePath();
        }
      }
    ];
    
    // Animation variables
    let offset = 0;
    const speed = 0.2; // Smooth, constant rotation speed
    
    // Draw function with improved animation
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw ocean background (circle with subtle gradient)
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width / 2
      );
      gradient.addColorStop(0, '#4CADC8');
      gradient.addColorStop(1, oceanColor);
      
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Apply offset for smooth rotation effect
      const effectiveOffset = offset % width;
      
      // Draw continents with a subtle glow effect
      continents.forEach(continent => {
        // Draw each continent twice for smooth wrapping
        [-effectiveOffset, width - effectiveOffset].forEach(xOffset => {
          ctx.save();
          ctx.translate(xOffset, 0);
          
          // Add subtle glow effect
          ctx.shadowColor = 'rgba(90, 182, 114, 0.3)';
          ctx.shadowBlur = 5;
          
          // Draw continent
          continent.path(ctx, width, height);
          
          // Fill with a subtle gradient for the land
          const landGradient = ctx.createLinearGradient(0, 0, 0, height);
          landGradient.addColorStop(0, '#6BC085');
          landGradient.addColorStop(1, landColor);
          
          ctx.fillStyle = landGradient;
          ctx.fill();
          
          ctx.restore();
        });
      });
      
      // Update offset for next frame with smooth motion
      offset += speed;
      
      // Request next frame
      requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Clean up on unmount
    return () => {
      // Nothing to clean up since requestAnimationFrame is automatically
      // canceled when the component unmounts
    };
    
  }, []);
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <canvas 
        ref={canvasRef} 
        width={240}
        height={240}
        className="max-w-full max-h-full" 
        aria-label="Rotating 2D Earth showing continents and oceans" 
      />
    </div>
  );
};

export default Earth2D;
