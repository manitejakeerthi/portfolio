// src/components/Hero.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import AnimatedTextReveal from './AnimatedTextReveal';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter');
      gsap.fromTo(
        letters,
        { 
          y: 200, 
          opacity: 0, 
          rotationX: 90,
          scale: 0.5
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1.8,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.8
        }
      );
    }
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Video Background - GitHub Hosted Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source 
            src="https://raw.githubusercontent.com/Maniteja003/Files/main/lv_0_20240801021017.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={titleRef}
            className="mb-12"
          >
            <div className="text-6xl md:text-9xl font-display font-black mb-6 leading-none tracking-wider">
              {'PORTFOLIO'.split('').map((letter, index) => (
                <span key={index} className="letter inline-block bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent">
                  {letter}
                </span>
              ))}
            </div>
            <div className="text-3xl md:text-5xl font-heading font-light tracking-[0.5em] text-white/80 mb-8">
               VISUAL STORYTELLER
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1.2 }}
            className="max-w-4xl mx-auto"
          >
            <AnimatedTextReveal className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-12 font-body">
              Award-winning fashion video editor crafting *cinematic* experiences that elevate style and storytelling. 
              Every frame captures the essence of story, every cut creates elegance.
            </AnimatedTextReveal>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToNext}
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 font-body tracking-wide text-lg"
            >
              VIEW PORTFOLIO
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-orange-500/50 text-white font-semibold rounded-full hover:bg-orange-500/10 hover:border-orange-500 transition-all duration-300 font-body tracking-wide text-lg backdrop-blur-sm"
            >
              GET IN TOUCH
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-4 z-20">
        <motion.button
          onClick={togglePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </motion.button>

        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-sm font-mono tracking-widest mb-2 uppercase">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Video Info Overlay */}
      <div className="absolute bottom-20 right-8 z-20 flex flex-col gap-3">
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-3 border border-white/10">
          <div className="text-white text-sm font-mono">
            FASHION REEL
          </div>
          <div className="text-orange-500 text-xs font-mono">
            AUTO-PLAYING
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
