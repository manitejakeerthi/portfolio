import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FlowCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      gsap.set(cursor, {
        x: cursorX - 10,
        y: cursorY - 10,
      });

      // Animate trail
      trailRef.current.forEach((trail, index) => {
        const delay = (index + 1) * 0.05;
        gsap.to(trail, {
          x: cursorX - 5,
          y: cursorY - 5,
          duration: 0.3 + delay,
          ease: 'power2.out',
        });
      });

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', updateMouse);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', updateMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block">
      <div
        ref={cursorRef}
        className="absolute w-5 h-5 bg-orange-500/60 rounded-full mix-blend-difference"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRef.current[i] = el;
          }}
          className="absolute w-2 h-2 bg-orange-400/40 rounded-full"
          style={{ opacity: 1 - i * 0.1 }}
        />
      ))}
    </div>
  );
};

export default FlowCursor;