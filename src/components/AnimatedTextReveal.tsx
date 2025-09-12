import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedTextReveal: React.FC<AnimatedTextRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      
      gsap.fromTo(
        words,
        {
          opacity: 0.3,
          color: '#64748b',
          y: 20,
        },
        {
          opacity: 1,
          color: '#ffffff',
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
          delay
        }
      );
    }
  }, [delay]);

  const processText = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word inline-block mr-2">
        {word}
      </span>
    ));
  };

  return (
    <div ref={textRef} className={className}>
      {typeof children === 'string' ? processText(children) : children}
    </div>
  );
};

export default AnimatedTextReveal;