import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Loader } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  thumbnail: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
  isInstagram?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  thumbnail, 
  title, 
  className = "",
  autoPlay = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const handlePlayClick = () => {
    setShouldLoad(true);
    setIsPlaying(true);
  };

  return (
    <div className={`relative aspect-video rounded-2xl overflow-hidden border border-accent-border group ${className}`}>
      {/* Thumbnail Image */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          className="absolute inset-0 z-10"
        >
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
          
          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <motion.button
                onClick={handlePlayClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-accent-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent-primary transition-all duration-300 shadow-xl shadow-accent-primary/30"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.button>
            </div>
          )}
          
          {/* Loading State */}
          {isPlaying && !isLoaded && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader className="w-8 h-8 text-accent-primary animate-spin mb-2" />
                <span className="text-accent-white text-sm font-body">Loading...</span>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Video Player */}
      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          className={`w-full h-full transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {/* Video Title Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h4 className="text-white font-medium text-sm font-body tracking-wide">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
