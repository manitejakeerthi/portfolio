import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TickerProps {
  images: string[];
  speed?: number;
  height?: string;
}

const Ticker: React.FC<TickerProps> = ({ 
  images, 
  speed = 1200, 
  height = "180px" 
}) => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tickerRef.current) {
      const ticker = tickerRef.current;
      const tickerWidth = ticker.scrollWidth / 2; // Divide by 2 since we duplicate
      
      gsap.set(ticker, { x: 0 });
      
      gsap.to(ticker, {
        x: -tickerWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    }
  }, [speed]);

  return (
    <div className="ticker-container overflow-hidden bg-transparent py-3">
      <div
        ref={tickerRef}
        className="ticker-wrapper flex items-center"
        style={{ width: 'fit-content' }}
      >
        {/* Original images */}
        {images.map((image, index) => (
          <img
            key={`original-${index}`}
            src={image}
            alt={`Ticker ${index + 1}`}
            className="ticker-image flex-shrink-0 object-cover mx-4 rounded-xl border border-blue-500/60 shadow-lg hover:shadow-blue-500/80 transition-all duration-300"
            style={{ 
              height,
              boxShadow: '0 0 8px rgba(70, 102, 255, 0.4), 0 2px 16px rgba(0, 0, 0, 0.3)',
              borderColor: '#4666FF',
              borderWidth: '1px'
            }}
          />
        ))}
        {/* Duplicate images for seamless loop */}
        {images.map((image, index) => (
          <img
            key={`duplicate-${index}`}
            src={image}
            alt={`Ticker ${index + 1}`}
            className="ticker-image flex-shrink-0 object-cover mx-4 rounded-xl border border-blue-500/60 shadow-lg hover:shadow-blue-500/80 transition-all duration-300"
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
