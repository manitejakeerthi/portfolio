import React from 'react';
import Ticker from './Ticker';

const ThumbnailCarousel: React.FC = () => {
  const portfolioImages = [
  'https://img.youtube.com/vi/pUMdAkHBVS0/maxresdefault.jpg',
  'https://img.youtube.com/vi/EKcVRD8OpzQ/maxresdefault.jpg', 
  'https://img.youtube.com/vi/tjH87saVq_Y/maxresdefault.jpg',
  'https://img.youtube.com/vi/OIwItsfOxoM/maxresdefault.jpg',
];


  return (
    <section className="py-20 bg-black" aria-label="YouTube Video Editing Portfolio Thumbnails - Mani Teja Keerthi India">
      {/* Hidden SEO */}
      <div className="sr-only">
        <h2>YouTube Video Editing Services</h2>
        <p>I provide YouTube video editing services for creators and brands across India and globally. From long-form YouTube videos to YouTube Shorts, I focus on clean cuts, pacing, captions, sound design, and retention-focused edits.</p>
      </div>
      <Ticker 
        images={portfolioImages} 
        speed={20} 
        height="300px" 
      />
    </section>
  );
};

export default ThumbnailCarousel;
