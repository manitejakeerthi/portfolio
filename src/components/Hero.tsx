import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import AnimatedTextReveal from './AnimatedTextReveal';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter');
      gsap.fromTo(
        letters,
        { 
          y: 120, 
          opacity: 0, 
          rotationX: 45,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.5
        }
      );
    }

    return () => {
      if (titleRef.current) {
        gsap.killTweensOf(titleRef.current.querySelectorAll('.letter'));
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        setIsPlaying(false);
      }
    };

    if (videoLoaded) {
      playVideo();
    }
  }, [videoLoaded]);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
          style={{ opacity: videoLoaded ? 0 : 1, transition: 'opacity 1s ease-out' }}
        />
        
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoLoaded ? 0.7 : 0, transition: 'opacity 1s ease-out' }}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlayThrough={handleVideoLoad}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23111' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source 
            src="https://raw.githubusercontent.com/Maniteja003/Files/main/lv_0_20240801021017.mp4" 
            type="video/mp4" 
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      </div>

      <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={titleRef} className="mb-12">
            <div className="text-6xl md:text-9xl font-display font-black mb-6 leading-none tracking-wider">
              {'PORTFOLIO'.split('').map((letter, index) => (
                <span 
                  key={index} 
                  className="letter inline-block bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent will-change-transform"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="text-3xl md:text-5xl font-heading font-light tracking-[0.5em] text-white/80 mb-8">
               VISUAL STORYTELLER
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <AnimatedTextReveal className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-12 font-body">
              Award-winning fashion video editor crafting *cinematic* experiences that elevate style and storytelling. 
              Every frame captures the essence of story, every cut creates elegance.
            </AnimatedTextReveal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToNext}
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-orange-500/30 font-body tracking-wide text-lg"
            >
              VIEW PORTFOLIO
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 border-2 border-orange-500/50 text-white font-semibold rounded-full hover:bg-orange-500/10 hover:border-orange-500 transition-all duration-300 font-body tracking-wide text-lg backdrop-blur-sm"
            >
              GET IN TOUCH
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center space-x-4 z-20">
        <motion.button
          onClick={togglePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
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
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-mono tracking-widest mb-2 uppercase">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>

      <div className="absolute bottom-20 right-8 z-20 flex flex-col gap-3">
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-3 border border-white/10">
          <div className="text-white text-sm font-mono">FASHION REEL</div>
          <div className="text-orange-500 text-xs font-mono">
            {isPlaying ? 'PLAYING' : 'PAUSED'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
