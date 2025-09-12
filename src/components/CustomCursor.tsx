import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setCursorType('hover');
      } else if (target.tagName === 'VIDEO' || target.closest('video')) {
        setCursorType('play');
      } else if (target.classList.contains('project-card') || target.closest('.project-card')) {
        setCursorType('view');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const cursorVariants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'rgba(255, 69, 0, 0.6)',
      border: '2px solid rgba(255, 69, 0, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(255, 107, 53, 0.2)',
      border: '2px solid rgba(255, 107, 53, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    play: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 179, 102, 0.2)',
      border: '2px solid rgba(255, 179, 102, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    view: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(255, 69, 0, 0.1)',
      border: '2px solid rgba(255, 69, 0, 0.6)',
      mixBlendMode: 'difference' as const,
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden lg:block"
      style={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
      }}
      variants={cursorVariants}
      animate={cursorType}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
      }}
    >
      {cursorType === 'view' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-accent-white text-xs font-mono tracking-widest">VIEW</span>
        </div>
      )}
    </motion.div>
  );
};

export default CustomCursor;