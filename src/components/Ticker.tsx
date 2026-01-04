import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TickerProps {
  images: string[];
  speed?: number;
  height?: string;
}

const Ticker: React.FC<TickerProps> = ({ 
  images, 
  speed = 30, 
  height = "180px" 
}) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!tickerRef.current || images.length === 0) return;

    const ticker = tickerRef.current;
    
    const setupAnimation = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      const tickerWidth = ticker.scrollWidth / 2;
      
      gsap.set(ticker, { x: 0 });
      
      animationRef.current = gsap.to(ticker, {
        x: -tickerWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      setupAnimation();
    });

    resizeObserver.observe(ticker);
    setupAnimation();

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [speed, images]);

  if (images.length === 0) return null;

  return (
    <div className="ticker-container overflow-hidden bg-transparent py-3">
      <div
        ref={tickerRef}
        className="ticker-wrapper flex items-center will-change-transform"
        style={{ width: 'fit-content' }}
      >
        {images.map((image, index) => (
          <img
            key={`original-${index}`}
            src={image}
            alt={`YouTube video editing portfolio by Mani Teja Keerthi - Freelance video editor India - Project ${index + 1}`}
            loading="lazy"
            className="ticker-image flex-shrink-0 object-cover mx-4 rounded-xl border border-blue-500/60 shadow-lg transition-shadow duration-300 hover:shadow-blue-500/80"
            style={{ 
              height,
              boxShadow: '0 0 8px rgba(70, 102, 255, 0.4), 0 2px 16px rgba(0, 0, 0, 0.3)',
              borderColor: '#4666FF',
              borderWidth: '1px'
            }}
          />
        ))}
        {images.map((image, index) => (
          <img
            key={`duplicate-${index}`}
            src={image}
            alt={`Instagram reels and short-form video editing samples - Freelance editor Mani Teja Keerthi India - Sample ${index + 1}`}
            loading="lazy"
            className="ticker-image flex-shrink-0 object-cover mx-4 rounded-xl border border-blue-500/60 shadow-lg transition-shadow duration-300 hover:shadow-blue-500/80"
            style={{ 
              height,
              boxShadow: '0 0 8px rgba(70, 102, 255, 0.4), 0 2px 16px rgba(0, 0, 0, 0.3)',
              borderColor: '#4666FF',
              borderWidth: '1px'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Ticker;
