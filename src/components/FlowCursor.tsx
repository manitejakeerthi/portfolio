import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const FlowCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafIdRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const trails = trailRefs.current.filter(Boolean) as HTMLDivElement[];
    
    const updateMouse = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      if (!isVisible.current) {
        isVisible.current = true;
        gsap.set(cursor, { opacity: 1 });
        trails.forEach(trail => gsap.set(trail, { opacity: 1 }));
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      gsap.set(cursor, { opacity: 0 });
      trails.forEach(trail => gsap.set(trail, { opacity: 0 }));
    };

    const animateCursor = () => {
      const lerp = 0.12;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerp;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerp;

      cursor.style.transform = `translate3d(${cursorPos.current.x - 10}px, ${cursorPos.current.y - 10}px, 0)`;

      trails.forEach((trail, index) => {
        const delay = (index + 1) * 0.08;
        const trailLerp = lerp * (1 - delay);
        const trailX = cursorPos.current.x + (mousePos.current.x - cursorPos.current.x) * delay;
        const trailY = cursorPos.current.y + (mousePos.current.y - cursorPos.current.y) * delay;
        trail.style.transform = `translate3d(${trailX - 4}px, ${trailY - 4}px, 0)`;
        trail.style.opacity = String(0.6 - index * 0.07);
      });

      rafIdRef.current = requestAnimationFrame(animateCursor);
    };

    gsap.set(cursor, { opacity: 0 });
    trails.forEach(trail => gsap.set(trail, { opacity: 0 }));

    window.addEventListener('mousemove', updateMouse, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafIdRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      gsap.killTweensOf([cursor, ...trails]);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      <div
        ref={cursorRef}
        className="absolute w-5 h-5 rounded-full will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, rgba(255,69,0,0.8) 0%, rgba(255,107,53,0.4) 100%)',
          boxShadow: '0 0 20px rgba(255,69,0,0.5)',
        }}
      />
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="absolute w-2 h-2 rounded-full will-change-transform"
          style={{ 
            background: `rgba(255, ${100 + i * 20}, ${50 + i * 10}, ${0.5 - i * 0.06})`,
          }}
        />
      ))}
    </div>
  );
};

export default FlowCursor;
