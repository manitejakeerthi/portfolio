import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  category: string;
  image: string;
  video: string;
  description: string;
  year: string;
}

const Slider3D: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  const slides: Slide[] = [
    {
      id: 1,
      title: 'Ethereal Dreams',
      category: 'Music Video',
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=1200',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'A surreal journey through consciousness and reality, blending ethereal visuals with dynamic storytelling.',
      year: '2024'
    },
    {
      id: 2,
      title: 'Urban Pulse',
      category: 'Commercial',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'High-energy commercial showcasing the pulse of modern urban life with cutting-edge cinematography.',
      year: '2024'
    },
    {
      id: 3,
      title: 'Natural Wonder',
      category: 'Documentary',
      image: 'https://images.pexels.com/photos/3573273/pexels-photo-3573273.jpeg?auto=compress&cs=tinysrgb&w=1200',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      description: 'Exploring the hidden beauty of natural landscapes through intimate and breathtaking cinematography.',
      year: '2023'
    },
    {
      id: 4,
      title: 'Neon Nights',
      category: 'Music Video',
      image: 'https://images.pexels.com/photos/3752834/pexels-photo-3752834.jpeg?auto=compress&cs=tinysrgb&w=1200',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      description: 'Cyberpunk aesthetic meets contemporary sound in this visually stunning music video experience.',
      year: '2024'
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-dark-950">
      {/* 3D Slider Container */}
      <div className="relative w-full h-full perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 transform-gpu"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/60 to-dark-950/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <div className="text-accent-primary text-sm font-mono tracking-widest mb-4 uppercase">
                      {slides[currentSlide].category} • {slides[currentSlide].year}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-accent-white mb-6 leading-none tracking-wide">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-xl text-accent-gray leading-relaxed mb-8 font-body max-w-lg">
                      {slides[currentSlide].description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-full hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 font-body tracking-wide"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      WATCH PROJECT
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative"
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden border border-accent-border shadow-2xl">
                      <video
                        src={slides[currentSlide].video}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        autoPlay
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-4 z-30">
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-accent-border hover:bg-accent-primary/20 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-accent-white" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-accent-border hover:bg-accent-primary/20 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-accent-white" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-accent-primary shadow-lg shadow-accent-primary/50'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-dark-900/50 z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default Slider3D;