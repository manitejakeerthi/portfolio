import React, { useEffect, useRef, useState } from 'react';
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
import VideoShowcase from './components/VideoShowcase';
import VintageBackground from './components/VintageBackground';
import FlowCursor from './components/FlowCursor';
import PerlinReveal from './components/PerlinReveal';
import SoftwareLogosTicker from './components/SoftwareLogosTicker';
import { useShouldShowHeavyEffects } from './hooks/usePerformance';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>();
  const showHeavyEffects = useShouldShowHeavyEffects();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="text-white overflow-x-hidden relative">
      <VintageBackground />
      
      {showHeavyEffects && <FlowCursor />}
      {showHeavyEffects && <PerlinReveal />}
      
      <Header />
      <Hero />
      <TextRibbon />
      <About />
      <SoftwareLogosTicker />
      <ThumbnailCarousel />
      <Portfolio />
      <VideoShowcase />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
