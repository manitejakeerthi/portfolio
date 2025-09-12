import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DarkVeilBG: React.FC = () => {
  const veilRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (veilRef.current) {
      // Animated veil effect
      gsap.to(veilRef.current, {
        opacity: 0.8,
        scale: 1.1,
        rotation: 2,
        scrollTrigger: {
          trigger: veilRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }

    if (particlesRef.current) {
      // Animate particles
      const particles = particlesRef.current.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: -200,
          opacity: 0,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          delay: index * 0.5,
          ease: 'none'
        });
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Main dark veil */}
      <div
        ref={veilRef}
        className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 opacity-95"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 69, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 179, 102, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, #010409 0%, #0d1117 50%, #212529 100%)
          `
        }}
      />

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-accent-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
    </div>
  );
};

export default DarkVeilBG;