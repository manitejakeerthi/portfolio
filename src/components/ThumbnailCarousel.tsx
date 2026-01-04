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
    <section className="py-20 bg-black">
      <Ticker 
        images={portfolioImages} 
        speed={20} 
        height="300px" 
      />
    </section>
  );
};

export default ThumbnailCarousel;
