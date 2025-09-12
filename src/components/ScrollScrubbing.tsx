import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

const ScrollScrubbing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current && textRef.current && imageRef.current) {
      // Text reveal animation
      gsap.fromTo(
        textRef.current.querySelectorAll('.reveal-text'),
        { 
          y: 100,
          opacity: 0,
          clipPath: 'inset(100% 0 0 0)'
        },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          }
        }
      );

      // Image parallax
      gsap.to(imageRef.current, {
        y: -100,
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Background color transition
      gsap.to(containerRef.current, {
        backgroundColor: 'rgba(255, 69, 0, 0.05)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-dark-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef}>
            <div className="reveal-text text-accent-primary text-sm font-mono tracking-widest mb-6 uppercase">
              CRAFTING EXCELLENCE
            </div>
            <h2 className="reveal-text text-5xl md:text-6xl font-display font-bold text-accent-white mb-8 leading-tight tracking-wide">
              Every Frame
              <br />
              <span className="text-accent-primary">Tells a Story</span>
            </h2>
            <p className="reveal-text text-xl text-accent-gray leading-relaxed mb-8 font-body">
              Through meticulous attention to detail and innovative techniques, 
              I transform raw footage into compelling visual narratives that 
              resonate with audiences and exceed client expectations.
            </p>
            <div className="reveal-text">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-full hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 font-body tracking-wide"
              >
                EXPLORE WORK
              </motion.button>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-accent-border shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3945325/pexels-photo-3945325.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Behind the scenes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 backdrop-blur-sm rounded-3xl border border-accent-border"
            />
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-accent-secondary/30 to-accent-tertiary/30 backdrop-blur-sm rounded-2xl border border-accent-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollScrubbing;