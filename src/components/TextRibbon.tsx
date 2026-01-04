import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const TextRibbon: React.FC = () => {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!ribbonRef.current) return;

    const ribbon = ribbonRef.current;
    
    const setupAnimation = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      const singleTextWidth = ribbon.scrollWidth / 4;
      
      gsap.set(ribbon, { x: 0 });
      
      animationRef.current = gsap.to(ribbon, {
        x: -singleTextWidth,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });
    };

    setupAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    animationRef.current?.pause();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    animationRef.current?.resume();
  }, []);

  const ribbonText = "CONTENT STRATEGIST + VIRAL EDITOR • SCALED CHANNELS TO 5000+ FOLLOWERS IN 6 MONTHS • DATA-DRIVEN STORYTELLING • RESULTS THAT SPEAK LOUDER • ";

  return (
    <div 
      className={`py-8 overflow-hidden relative cursor-pointer transition-all duration-500 ${
        isHovered 
          ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 shadow-2xl shadow-orange-500/50' 
          : 'bg-gradient-to-r from-orange-500 to-orange-400'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
      )}
      
      <div 
        ref={ribbonRef}
        className="flex whitespace-nowrap relative z-10 will-change-transform"
        style={{ width: 'fit-content' }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex-shrink-0">
            <span className={`text-2xl md:text-3xl font-display font-black tracking-[0.2em] px-6 transition-all duration-300 ${
              isHovered ? 'text-white drop-shadow-lg' : 'text-black'
            }`}>
              {ribbonText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextRibbon;
