import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const TextRibbon: React.FC = () => {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (ribbonRef.current) {
      const ribbon = ribbonRef.current;
      
      // Create timeline
      animationRef.current = gsap.timeline({ 
        repeat: -1, 
        ease: "none",
        paused: false 
      });
      
      const singleTextWidth = ribbon.scrollWidth / 4;
      
      gsap.set(ribbon, { x: 0 });
      
      animationRef.current.to(ribbon, {
        x: -singleTextWidth,
        duration: 25,
        ease: "none",
      });
    }

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    animationRef.current?.pause();
  };

  const handleMouseLeave = () => {
    animationRef.current?.resume();
  };

  const ribbonText = "I AM NOT JUST AN EDITOR I KNOW HOW TO GRAB ATTENTION • GREW MY CHANNEL FROM 0 TO 5000 FOLLOWERS IN JUST 6 MONTHS • ";

  return (
    <div 
      className="py-12 bg-gradient-to-r from-orange-500 to-orange-400 overflow-hidden relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={ribbonRef}
        className="flex whitespace-nowrap"
        style={{ width: 'fit-content' }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex-shrink-0">
            <span className="text-3xl md:text-4xl font-display font-black text-black tracking-[0.3em] px-8 transition-all duration-300 hover:text-white">
              {ribbonText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextRibbon;