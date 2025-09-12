import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Lightbulb, Scissors, Sparkles, CheckCircle } from 'lucide-react';
import AnimatedTextReveal from './AnimatedTextReveal';

const Process: React.FC = () => {
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (processRef.current) {
      const items = processRef.current.querySelectorAll('.process-item');
      
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            y: 100,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          }
        );
      });
    }
  }, []);

  const processSteps = [
    {
      icon: MessageCircle,
      title: 'DISCOVERY',
      subtitle: 'Understanding Your Vision',
      description: 'Deep dive into your creative goals, target audience, and project requirements through comprehensive consultation.',
      details: [
        'Creative brief analysis',
        'Vision alignment session',
        'Technical requirements review',
        'Timeline & budget planning'
      ]
    },
    {
      icon: Lightbulb,
      title: 'CONCEPT',
      subtitle: 'Creative Development',
      description: 'Developing innovative concepts and visual strategies that bring your story to life with maximum impact.',
      details: [
        'Concept ideation',
        'Storyboard creation',
        'Style frame development',
        'Technical pre-visualization'
      ]
    },
    {
      icon: Scissors,
      title: 'PRODUCTION',
      subtitle: 'Meticulous Crafting',
      description: 'Precision editing process where every cut, transition, and effect is carefully crafted to serve the story.',
      details: [
        'Footage organization',
        'Narrative structure',
        'Pacing optimization',
        'Creative enhancement'
      ]
    },
    {
      icon: Sparkles,
      title: 'POST-PRODUCTION',
      subtitle: 'Visual Excellence',
      description: 'Adding the finishing touches with professional color grading, audio mixing, and visual effects.',
      details: [
        'Color correction & grading',
        'Audio mixing & mastering',
        'Visual effects integration',
        'Motion graphics design'
      ]
    },
    {
      icon: CheckCircle,
      title: 'DELIVERY',
      subtitle: 'Perfect Execution',
      description: 'Final quality assurance, client review process, and delivery in all required formats.',
      details: [
        'Quality assurance testing',
        'Client review & feedback',
        'Revision implementation',
        'Multi-format delivery'
      ]
    }
  ];

  return (
    <section id="process" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 fade-in"
        >
          <div className="text-accent-primary text-sm font-mono tracking-widest mb-6 uppercase">
            METHODOLOGY
          </div>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-wide" style={{ fontFamily: 'Dancing Script, cursive' }}>
            CREATIVE PROCESS
          </h2>
          <AnimatedTextReveal className="text-2xl md:text-3xl text-accent-gray max-w-5xl mx-auto font-body leading-relaxed">
            A proven methodology that ensures every project exceeds expectations through strategic planning, 
            creative execution, and meticulous attention to detail.
          </AnimatedTextReveal>
        </motion.div>

        <div ref={processRef} className="space-y-24">
          {processSteps.map((step, index) => (
            <div key={step.title} className="process-item">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-accent-primary/30">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <div className="text-accent-primary font-mono text-lg tracking-widest font-bold">
                        STEP {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black text-accent-white font-display tracking-wide">{step.title}</h3>
                    </div>
                  </div>
                  
                  <h4 className="text-2xl text-accent-primary mb-4 font-heading tracking-wide font-bold">{step.subtitle}</h4>
                  <p className="text-accent-gray text-xl mb-8 font-body leading-relaxed">{step.description}</p>
                  
                  <ul className="space-y-4">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-accent-gray font-body text-lg">
                        <div className="w-3 h-3 bg-accent-primary rounded-full mr-4" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-accent-border p-12 flex items-center justify-center">
                      <div className="text-9xl font-black text-accent-primary/20 font-display">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute -top-6 -right-6 w-12 h-12 border-2 border-accent-primary/30 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent-secondary/30 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 fade-in"
        >
          <div className="max-w-4xl mx-auto p-16 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 backdrop-blur-sm rounded-3xl border border-accent-primary/20">
            <h3 className="text-5xl md:text-6xl font-black text-accent-white mb-6 font-display tracking-wide leading-none">
              READY TO BEGIN?
            </h3>
            <AnimatedTextReveal className="text-accent-gray mb-8 text-xl font-body leading-relaxed">
              Let's discuss how we can bring your vision to life through exceptional video editing and creative storytelling.
            </AnimatedTextReveal>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-black rounded-full hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 font-body tracking-wide text-lg"
            >
              START YOUR PROJECT
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;