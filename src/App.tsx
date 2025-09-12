import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TextRibbon from './components/TextRibbon';
import ThumbnailCarousel from './components/ThumbnailCarousel';
import VintageBackground from './components/VintageBackground';
import FlowCursor from './components/FlowCursor';
import PerlinReveal from './components/PerlinReveal';
import SoftwareLogosTicker from './components/SoftwareLogosTicker';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="text-white overflow-x-hidden relative">
      <VintageBackground />
      <FlowCursor />
      <PerlinReveal />
      
      <Header />
      <Hero />
      <TextRibbon />  {/* Your existing ribbon stays */}
      <About />
      <SoftwareLogosTicker />  {/* New software logos ticker */}
      <ThumbnailCarousel />
      <Portfolio />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;