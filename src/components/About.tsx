import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Video, Zap, Target, Lightbulb, DollarSign } from 'lucide-react';
import AnimatedTextReveal from './AnimatedTextReveal';
import InlineTextImages from './InlineTextImages';

const About: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Animate timeline
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.querySelectorAll('.timeline-item'),
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    // Animate skills bars
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.querySelectorAll('.skill-bar'),
        { width: '0%' },
        {
          width: (index, target) => target.dataset.width + '%',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
          }
        }
      );
    }
    // Animate stats with counting
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-number');
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(stat, 
          { textContent: 0 },
          {
            textContent: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
            }
          }
        );
      });
    }
  }, []);

  const stats = [
    { icon: Video, value: 200, suffix: '+', label: 'Projects Completed' },
    { icon: Users, value: 12, suffix: '+', label: 'Happy Clients' },
    { icon: DollarSign, value: 100, suffix: '+', label: 'Revenue Generated' },
    { icon: Zap, value: 5, suffix: '+', label: 'Years Experience' }
  ];

  const skills = [
    { name: 'Video Editing', level: 98 },
    { name: 'Color Grading', level: 95 },
    { name: 'Motion Graphics', level: 90 },
    { name: 'Sound Design', level: 85 },
    { name: 'VFX & Compositing', level: 88 },
    { name: 'Creative Direction', level: 96 }
  ];

  const timeline = [
    { 
      year: '2019', 
      title: 'Creative Genesis', 
      description: 'Began journey as video editor for personal youtube videos, discovering passion for visual storytelling',
      icon: Lightbulb
    },
    { 
      year: '2020', 
      title: 'First Step', 
      description: 'Started editing videos for close folks and classmates',
      icon: Award
    },
    { 
      year: '2022', 
      title: 'Recognition', 
      description: 'Generated around 12 Lakhs INR and recognized as best video editor in whole college',
      icon: Target
    },
    { 
      year: '2024', 
      title: 'Innovation Leader', 
      description: 'Founded Glitzz - Video Production and Social Media Agency',
      icon: Users
    },
    { 
      year: '2025', 
      title: 'Polymath Evolution', 
      description: 'Worked for 3 startups as a marketing strategist and Software Intern',
      icon: Zap
    }
  ];

  const inlineImages = {
    'camera': 'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=50',
    'edit': 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=50',
    'color': 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=50'
  };

  return (
    <section id="about" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 fade-in"
        >
          <div className="text-accent-primary text-sm font-mono tracking-widest mb-6 uppercase">
            ABOUT THE ARTIST
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-bold mb-8 text-accent-white tracking-wide leading-none">
            CRAFTING VISUAL
            <br />
            <span className="text-accent-primary animate-pulse">EXCELLENCE</span>
          </h2>
          <AnimatedTextReveal className="text-2xl md:text-3xl text-accent-gray max-w-5xl mx-auto font-body leading-relaxed font-normal">
            With over 5 years of experience in *camera* video editing and *edit* post-production, I specialize in creating 
            *color* cinematic experiences that captivate audiences and elevate brands through the power of visual storytelling.
          </AnimatedTextReveal>
        </motion.div>
        
        {/* Animated Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 fade-in">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 backdrop-blur-sm rounded-3xl mb-6 border border-accent-border group-hover:scale-110 group-hover:border-accent-primary/50 transition-all duration-500">
                <stat.icon className="w-12 h-12 text-accent-primary" />
              </div>
              <div className="text-5xl md:text-6xl font-display font-bold text-accent-white mb-2">
                <span className="stat-number" data-target={stat.value}>0</span>{stat.suffix}
              </div>
              <div className="text-accent-gray font-body tracking-wide text-lg font-normal">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="fade-in"
          >
            <h3 className="text-4xl md:text-5xl font-display font-bold text-accent-white mb-12 tracking-wide">
              TECHNICAL EXPERTISE
            </h3>
            <div ref={skillsRef} className="space-y-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-accent-white font-semibold text-xl font-body tracking-wide">{skill.name}</span>
                    <span className="text-accent-primary font-mono text-lg font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-dark-800 rounded-full overflow-hidden border border-accent-border">
                    <div
                      className="skill-bar h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-accent-primary/30"
                      data-width={skill.level}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="fade-in"
          >
            <h3 className="text-4xl md:text-5xl font-display font-bold text-accent-white mb-12 tracking-wide">
              PROFESSIONAL JOURNEY
            </h3>
            <div ref={timelineRef} className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.year} className="timeline-item flex items-start group">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-accent-primary/20">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-accent-primary font-mono text-lg tracking-widest mb-2 font-semibold">{item.year}</div>
                    <h4 className="text-2xl font-bold text-accent-white mb-3 font-display tracking-wide">{item.title}</h4>
                    <p className="text-accent-gray font-body leading-relaxed text-lg font-normal">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Philosophy Statement with Indian Girl Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center fade-in"
        >
          <div className="max-w-6xl mx-auto p-16 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-accent-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5" />
            <div className="relative z-10">
              <blockquote className="text-4xl md:text-5xl text-accent-white font-display leading-relaxed mb-8 tracking-wide font-normal italic">
                "Every frame is an opportunity to create magic. Every cut is a chance to evoke emotion. Every project is a journey toward visual perfection."
              </blockquote>
              <div className="flex items-center justify-center">
                {/* Indian Girl Avatar */}
                <div className="relative mr-6">
                  <img 
                    src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200"
                    alt="Tanu Sri - Founder"
                    className="w-24 h-24 rounded-full object-cover shadow-xl ring-4 ring-accent-primary/30 hover:ring-accent-primary/50 transition-all duration-300"
                  />
                  {/* Decorative Ring */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-full blur-sm animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-accent-white font-bold text-2xl tracking-wide" 
                       style={{ fontFamily: 'Playfair Display, cursive' }}>
                    Tanu Sri
                  </div>
                  <div className="text-accent-primary font-body tracking-widest text-lg italic" 
                       style={{ fontFamily: 'Playfair Display, cursive' }}>
                    Founder @AiVoco
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
