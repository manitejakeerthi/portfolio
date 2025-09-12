import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const TextRibbon: React.FC = () => {
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ribbonRef.current) {
      const ribbon = ribbonRef.current;
      const ribbonWidth = ribbon.scrollWidth;
      
      gsap.set(ribbon, { x: 0 });
      
      gsap.to(ribbon, {
        x: -ribbonWidth / 2,
        duration: 100,
        ease: 'none',
        repeat: -1,
      });
    }
  }, []);

  const ribbonText = "I AM NOT JUST AN EDITOR I KNOW HOW TO GRAB ATTENTION • GREW MY CHANNEL FROM 0 TO 5000 FOLLOWERS IN JUST 6 MONTHS • ";

  return (
    <div className="py-12 bg-gradient-to-r from-orange-500 to-orange-400 overflow-hidden relative">
      <div 
        ref={ribbonRef}
        className="flex whitespace-nowrap text-6xl md:text-8xl font-bold tracking-wider"
        style={{ width: 'fit-content', fontFamily: 'Dancing Script, cursive' }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="text-3xl md:text-4xl font-display font-black text-black tracking-[0.3em] px-12">
            {Array(10).fill(ribbonText).map((text, j) => (
              <span key={j}>{text}</span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextRibbon;