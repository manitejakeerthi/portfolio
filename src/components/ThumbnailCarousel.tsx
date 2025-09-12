import React from 'react';
import Ticker from './Ticker';

const ThumbnailCarousel: React.FC = () => {
  const portfolioImages = [
  'https://i3.ytimg.com/vi/IVRogmZaInY/maxresdefault.jpg',
  'https://i3.ytimg.com/vi/ARa0VCM8JPw/maxresdefault.jpg', 
  'https://i3.ytimg.com/vi/645lwvhE1mE/maxresdefault.jpg',
  'https://i3.ytimg.com/vi/74dqM_xtvAA/maxresdefault.jpg',
  'https://i3.ytimg.com/vi/WlnwJDeZN9g/maxresdefault.jpg',
  'https://i3.ytimg.com/vi/xDZhrzVTMlw/maxresdefault.jpg',
];


  return (
    <section className="py-20 bg-black">
      <Ticker 
        images={portfolioImages} 
        speed={40} 
        height="300px" 
      />
    </section>
  );
};

export default ThumbnailCarousel;
