import React from 'react';
import VideoCarousel from './VideoCarousel';

const VideoShowcase: React.FC = () => {
  const videos = [
    {
      id: 1,
      url: 'https://raw.githubusercontent.com/manitejakeerthi/media-assets/main/ai%20voco%20(2).mp4',
      title: 'AI Voco Creative Edit'
    },
    {
      id: 2,
      url: 'https://raw.githubusercontent.com/manitejakeerthi/media-assets/main/lv_0_20251227232719%20(1).mp4',
      title: 'Creative Video Reel'
    },
    {
      id: 3,
      url: 'https://raw.githubusercontent.com/manitejakeerthi/media-assets/main/IMG_3891%20(1).mp4',
      title: 'Product Showcase'
    },
    {
       id: 4,
       url: 'https://raw.githubusercontent.com/manitejakeerthi/media-assets/main/KOLORO_1709821967538%20(1).mp4',
       title: 'KOLORO Project'
     },
    {
       id: 5,
       url: 'https://raw.githubusercontent.com/manitejakeerthi/media-assets/main/IMG_7780_1.mp4',
       title: 'Creative Short'
     }
    ];

  return (
    <section className="py-32 bg-black relative overflow-hidden" aria-label="Instagram Reels and Short-Form Video Editing Samples - Mani Teja Keerthi">
      {/* Hidden SEO content */}
      <div className="sr-only">
        <h2>Instagram Reels & Short-Form Video Editing</h2>
        <p>Short-form content is the fastest way to grow on Instagram, YouTube Shorts, and other platforms. I edit high-impact reels and short videos that are optimized for attention, engagement, and watch time. Professional short-form video editing by Mani Teja Keerthi, freelance video editor in India.</p>
      </div>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black pointer-events-none"></div>
      
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="text-center mb-4">
          <div className="text-accent-primary text-sm font-mono tracking-widest mb-4 uppercase">
            REEL SHOWCASE
          </div>
          <h3 className="text-6xl md:text-7xl font-display font-black text-accent-white mb-6 tracking-wide">
            VISUAL STORIES
          </h3>
          <p className="text-accent-gray text-lg max-w-3xl mx-auto font-body">
            Swipe through premium short-form video content. Click any video to play with sound.
          </p>
        </div>
      </div>
      
      <VideoCarousel 
        videos={videos} 
        speed={25} 
        height="600px" 
      />
    </section>
  );
};

export default VideoShowcase;
