// src/components/Portfolio.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Play, Eye, ExternalLink, X } from 'lucide-react';
import AnimatedTextReveal from './AnimatedTextReveal';
import VideoPlayer from './VideoPlayer';

interface Project {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  video: string;
  description: string;
  client: string;
  year: string;
  duration: string;
  tags: string[];
  isInstagram?: boolean;
  showReferenceBadge?: boolean;
}

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const categories = ['All', 'Long Form', 'Short Form'];
  
  // Your actual Long Form YouTube videos
  const longFormProjects: Project[] = [
    {
      id: 5,
      title: 'Documentary Style',
      category: 'Long Form',
      thumbnail: 'https://img.youtube.com/vi/xbCFaEwnTRo/maxresdefault.jpg',
      video: 'https://www.youtube.com/embed/xbCFaEwnTRo',
      description: 'Documentary-style video featuring authentic storytelling and cinematic production values.',
      client: 'Documentary Project',
      year: '2024',
      duration: '12:15',
      tags: ['Documentary', 'Storytelling', 'Cinematic'],
      isInstagram: false,
      showReferenceBadge: true
    },
    {
      id: 2,
      title: '10 FREE AI Courses for Beginners',
      category: 'Long Form',
      thumbnail: 'https://img.youtube.com/vi/pIo4mbGGyhE/maxresdefault.jpg',
      video: 'https://www.youtube.com/embed/pIo4mbGGyhE',
      description: 'Comprehensive guide to free AI courses covering prompt engineering, AI agents, and practical implementation for career growth.',
      client: 'Educational Content',
      year: '2025',
      duration: '13:00',
      tags: ['AI/ML', 'Education', 'Career Development'],
      isInstagram: false,
      showReferenceBadge: true
    },
    {
      id: 4,
      title: 'Brand Campaign',
      category: 'Long Form',
      thumbnail: 'https://img.youtube.com/vi/F10_ZLC_oTM/maxresdefault.jpg',
      video: 'https://www.youtube.com/embed/F10_ZLC_oTM',
      description: 'Professional brand campaign showcasing product features through compelling visual narrative.',
      client: 'Brand Client',
      year: '2024',
      duration: '6:30',
      tags: ['Branding', 'Commercial', 'Product'],
      isInstagram: false,
      showReferenceBadge: true
    },
    {
      id: 1,
      title: 'Men\'s Fashion Gadgets 2025',
      category: 'Long Form',
      thumbnail: 'https://img.youtube.com/vi/WuvmUvap3uU/maxresdefault.jpg',
      video: 'https://www.youtube.com/embed/WuvmUvap3uU',
      description: 'Top 5 most underrated and useful self-care gadgets for men including hair oil applicators, scalp massagers, and beard shapers.',
      client: 'YouTube Channel',
      year: '2025',
      duration: '4:29',
      tags: ['Lifestyle', 'Product Review', 'Men\'s Grooming'],
      isInstagram: false
    },
    {
      id: 6,
      title: 'Creative Project',
      category: 'Long Form',
      thumbnail: 'https://img.youtube.com/vi/IVRogmZaInY/maxresdefault.jpg',
      video: 'https://www.youtube.com/embed/IVRogmZaInY',
      description: 'Creative video project with dynamic visuals and compelling storytelling.',
      client: 'Creative Studio',
      year: '2024',
      duration: '3:00',
      tags: ['Creative', 'Cinematic', 'Storytelling'],
      isInstagram: false
    },
    {
      id: 7,
      title: 'Video Project 1',
      category: 'Long Form',
      thumbnail: 'https://img.youtube.com/vi/pUMdAkHBVS0/maxresdefault.jpg',
      video: 'https://www.youtube.com/embed/pUMdAkHBVS0',
      description: 'Professional video content with engaging visuals.',
      client: 'Client',
      year: '2024',
      duration: '3:00',
      tags: ['Creative', 'Professional', 'Video'],
      isInstagram: false
    },
    {
      id: 9,
      title: 'Video Project 3',
      category: 'Long Form',
      thumbnail: 'https://img.youtube.com/vi/nP28m8E45bQ/maxresdefault.jpg',
      video: 'https://www.youtube.com/embed/nP28m8E45bQ',
      description: 'High-quality video content with professional storytelling.',
      client: 'Client',
      year: '2024',
      duration: '3:00',
      tags: ['Creative', 'Storytelling', 'Quality'],
      isInstagram: false
    }
  ];

  // Your actual Short Form content
  const shortFormProjects: Project[] = [
    {
      id: 102,
      title: 'YouTube Short #1',
      category: 'Short Form',
      thumbnail: 'https://img.youtube.com/vi/Z7his03MTzM/maxresdefault.jpg',
      video: 'https://www.youtube.com/embed/Z7his03MTzM',
      description: 'Engaging short-form video content with creative editing.',
      client: 'Social Media',
      year: '2024',
      duration: '0:60',
      tags: ['Short Form', 'Creative', 'YouTube'],
      isInstagram: false
    },
    {
      id: 103,
      title: 'YouTube Short #2',
      category: 'Short Form',
      thumbnail: 'https://img.youtube.com/vi/xjFvBYA0vA4/maxresdefault.jpg',
      video: 'https://www.youtube.com/embed/xjFvBYA0vA4',
      description: 'Dynamic short-form content with compelling visuals.',
      client: 'Social Media',
      year: '2024',
      duration: '0:60',
      tags: ['Short Form', 'Dynamic', 'YouTube'],
      isInstagram: false
    }
  ];

  // Combine all projects
  const allProjects = [...longFormProjects, ...shortFormProjects];

  // Filter projects based on category
  const filteredProjects = activeFilter === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll('.project-card'),
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }
  }, [filteredProjects]);

  // Handle project click - Instagram opens in new tab, YouTube opens in modal
  const handleProjectClick = (project: Project) => {
    if (project.isInstagram) {
      window.open(project.video, '_blank');
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <section id="portfolio" className="py-32 bg-black relative" aria-label="Video Editing Portfolio - Mani Teja Keerthi Freelance Editor India">
      {/* Hidden SEO content for portfolio */}
      <div className="sr-only">
        <h2>My Video Editing Portfolio - Freelance Video Editor India</h2>
        <p>You can explore my editing portfolio below. It includes YouTube videos, Instagram reels, short-form edits, and brand content across different niches. Professional video editing work by Mani Teja Keerthi, freelance video editor based in India.</p>
        <p>Portfolio includes: YouTube video editing samples, Instagram reels editing examples, short-form content for social media, podcast video editing, tech video production, brand promotional videos.</p>
      </div>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 fade-in"
        >
          <div className="text-accent-primary text-sm font-mono tracking-widest mb-6 uppercase">
            SELECTED WORKS
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-black mb-8 text-accent-white tracking-wide leading-none">
            PORTFOLIO
          </h2>
          <AnimatedTextReveal className="text-2xl md:text-3xl text-accent-gray max-w-4xl mx-auto font-body leading-relaxed">
            A curated collection of my finest work, showcasing creativity, technical excellence, and storytelling mastery across all formats.
          </AnimatedTextReveal>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16 fade-in"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-8 py-4 rounded-full font-bold transition-all duration-500 font-body tracking-wide text-lg ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/30'
                  : 'bg-white/5 text-accent-gray hover:text-accent-white hover:bg-white/10 border border-accent-border'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="project-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-accent-border hover:border-accent-primary/50 transition-all duration-500 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Video Player Component */}
                <VideoPlayer
                  src={project.video}
                  thumbnail={project.thumbnail}
                  title={project.title}
                  isInstagram={project.isInstagram}
                  className="mb-0"
                />
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-accent-primary font-mono text-sm tracking-widest">{project.year}</span>
                    <span className="text-accent-gray font-mono text-sm">{project.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-accent-white mb-3 font-display tracking-wide group-hover:text-accent-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-accent-gray text-sm mb-4 font-body leading-relaxed">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/5 text-accent-gray text-xs rounded-md font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-accent-gray text-sm font-body tracking-wide">{project.client}</div>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-accent-primary/80 backdrop-blur-sm text-white text-xs font-mono tracking-widest rounded-full inline-block">
                    {project.category.toUpperCase()}
                  </span>
                  {project.showReferenceBadge && (
                    <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-mono tracking-widest rounded-full inline-block">
                      REFERENCE : I CAN EDIT LIKE THIS TOO
                    </span>
                  )}
                </div>

                {/* Instagram badge */}
                {project.isInstagram && (
                  <div className="absolute top-4 right-4 z-30">
                    <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-mono tracking-widest rounded-full">
                      INSTAGRAM
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Modal - Only for YouTube videos */}
        <AnimatePresence>
          {selectedProject && !selectedProject.isInstagram && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-dark-900 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-accent-border"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-4xl font-bold text-accent-white mb-2 font-display tracking-wide">{selectedProject.title}</h3>
                    <p className="text-accent-primary font-mono tracking-widest text-sm">{selectedProject.category.toUpperCase()}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-3 bg-white/5 rounded-2xl hover:bg-accent-primary/20 transition-colors"
                  >
                    <X className="w-6 h-6 text-accent-white" />
                  </button>
                </div>
                
                {/* YouTube Embed in Modal */}
                <div className="mb-8">
                  <VideoPlayer
                    src={selectedProject.video}
                    thumbnail={selectedProject.thumbnail}
                    title={selectedProject.title}
                    isInstagram={false}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-2xl font-bold text-accent-white mb-4 font-display">Project Details</h4>
                    <p className="text-accent-gray mb-6 font-body leading-relaxed">{selectedProject.description}</p>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-accent-border pb-2">
                        <span className="text-accent-gray font-body">Client:</span>
                        <span className="text-accent-white font-body">{selectedProject.client}</span>
                      </div>
                      <div className="flex justify-between border-b border-accent-border pb-2">
                        <span className="text-accent-gray font-body">Year:</span>
                        <span className="text-accent-white font-body">{selectedProject.year}</span>
                      </div>
                      <div className="flex justify-between border-b border-accent-border pb-2">
                        <span className="text-accent-gray font-body">Duration:</span>
                        <span className="text-accent-white font-body">{selectedProject.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-gray font-body">Category:</span>
                        <span className="text-accent-primary font-body">{selectedProject.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-accent-white mb-4 font-display">Techniques Used</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm rounded-full border border-accent-primary/20 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-accent-border">
                      <h5 className="text-lg font-bold text-accent-white mb-3 font-display">Behind the Scenes</h5>
                      <p className="text-accent-gray text-sm font-body leading-relaxed">
                        This project showcased innovative editing techniques and creative storytelling approaches, 
                        pushing the boundaries of traditional video editing to create a truly unique visual experience.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
