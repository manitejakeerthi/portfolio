import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

interface VideoItem {
  id: number;
  url: string;
  title: string;
  thumbnail?: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
  speed?: number;
  height?: string;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ 
  videos, 
  speed = 20, 
  height = "400px" 
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const gsapAnimationRef = useRef<gsap.core.Tween | null>(null);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const heightNum = parseInt(height) || 400;
  const videoWidth = `${(heightNum * 9) / 16}px`;

  const setupAnimation = useCallback(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const carouselWidth = carousel.scrollWidth / 2;

    if (gsapAnimationRef.current) {
      gsapAnimationRef.current.kill();
    }

    gsap.set(carousel, { x: 0 });

    gsapAnimationRef.current = gsap.to(carousel, {
      x: -carouselWidth,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });
  }, [speed]);

  useEffect(() => {
    setupAnimation();

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (gsapAnimationRef.current) {
        gsapAnimationRef.current.kill();
        gsapAnimationRef.current = null;
      }
    };
  }, [setupAnimation, selectedVideo]);

  useEffect(() => {
    if (selectedVideo && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {});
    }
  }, [selectedVideo]);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
    gsapAnimationRef.current?.pause();
    
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    setHoveredIndex(null);
    gsapAnimationRef.current?.play();
    
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  const handleVideoClick = useCallback((video: VideoItem) => {
    setSelectedVideo(video);
    gsapAnimationRef.current?.pause();
  }, []);

  const closeModal = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setSelectedVideo(null);
    gsapAnimationRef.current?.play();
  }, []);

  const renderVideoCard = (video: VideoItem, index: number, isHovered: boolean) => (
    <div
      className="video-item flex-shrink-0 rounded-2xl shadow-xl cursor-pointer relative group overflow-hidden will-change-transform"
      style={{ 
        height,
        width: videoWidth,
        boxShadow: isHovered 
          ? '0 20px 60px rgba(70, 102, 255, 0.3)' 
          : '0 10px 40px rgba(70, 102, 255, 0.15)',
        transition: 'box-shadow 0.5s ease-out',
      }}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
      onClick={() => handleVideoClick(video)}
    >
      <video
        ref={(el) => { videoRefs.current[index] = el; }}
        src={video.url}
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        poster={video.thumbnail}
      />
      
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-20 rounded-2xl" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="text-white text-xs font-semibold tracking-wide uppercase">{video.title}</div>
      </div>
      
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 border border-white/10 group-hover:border-white/20 transition-all duration-500" />
    </div>
  );

  return (
    <>
      <div className="video-carousel-container overflow-hidden bg-transparent py-8 px-6">
        <div
          ref={carouselRef}
          className="video-carousel-wrapper flex items-center justify-center gap-6 will-change-transform"
          style={{ width: 'fit-content' }}
        >
          {videos.map((video, index) => (
            <React.Fragment key={`original-${video.id}`}>
              {renderVideoCard(
                video, 
                index, 
                hoveredIndex === index
              )}
            </React.Fragment>
          ))}
          
          {videos.map((video, index) => (
            <React.Fragment key={`duplicate-${video.id}`}>
              {renderVideoCard(
                video, 
                index + videos.length, 
                hoveredIndex === index + videos.length
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          `}</style>
          
          <div 
            className="relative w-full h-full max-w-md max-h-screen flex flex-col"
            style={{ animation: 'slideUp 0.4s ease-out' }}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-60 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Close video modal - Freelance video editor portfolio"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <video
              ref={modalVideoRef}
              src={selectedVideo.url}
              controls
              autoPlay
              playsInline
              loop
              className="w-full h-full object-cover rounded-2xl"
              style={{ aspectRatio: '9/16' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCarousel;
