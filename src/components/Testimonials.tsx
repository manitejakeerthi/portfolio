import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ArrowRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Creative Director',
      company: 'Visionary Media',
      content: 'Alex transformed our raw footage into cinematic gold. The attention to detail and creative vision exceeded all expectations. Every frame tells a story.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'Music Producer',
      company: 'Harmony Studios',
      content: 'The music video editing was phenomenal. Every beat, every transition was perfectly timed. Truly exceptional work that elevated our artist\'s vision.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      company: 'TechFlow Inc.',
      content: 'Our commercial campaign came to life beyond our wildest dreams. Professional, creative, and delivered on time with incredible attention to detail.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Film Director',
      company: 'Independent Films',
      content: 'Alex understood my vision instantly and brought it to life with incredible skill and artistry. A true professional who delivers excellence.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (carouselRef.current) {
      const testimonialCards = carouselRef.current.querySelectorAll('.testimonial-card');
      
      testimonialCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 80,
            rotationY: 25
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          }
        );
      });
    }
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-accent-primary fill-current' : 'text-accent-gray/30'
        }`}
      />
    ));
  };

  return (
    <section className="py-32 bg-dark-800 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 fade-in"
        >
          <div className="text-accent-primary text-sm font-mono tracking-widest mb-6 uppercase">
            CLIENT FEEDBACK
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-accent-white tracking-wide">
            Testimonials
          </h2>
          <p className="text-xl text-accent-gray max-w-4xl mx-auto font-body leading-relaxed">
            Don't just take my word for it. Here's what clients say about working with me and the 
            exceptional results we've achieved together.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div ref={carouselRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-accent-border hover:border-accent-primary/50 transition-all duration-500 group relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-10 h-10 text-accent-primary opacity-60" />
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <p className="text-accent-white text-lg leading-relaxed mb-8 font-body">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-accent-primary/30"
                  />
                  <div>
                    <h4 className="text-accent-white font-semibold text-lg font-display tracking-wide">{testimonial.name}</h4>
                    <p className="text-accent-gray text-sm font-body">{testimonial.role}</p>
                    <p className="text-accent-primary text-sm font-mono tracking-widest">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 fade-in"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent-white mb-2 font-display">98%</div>
            <div className="text-accent-gray font-body tracking-wide">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent-white mb-2 font-display">150+</div>
            <div className="text-accent-gray font-body tracking-wide">5-Star Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent-white mb-2 font-display">12h</div>
            <div className="text-accent-gray font-body tracking-wide">Avg. Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent-white mb-2 font-display">92%</div>
            <div className="text-accent-gray font-body tracking-wide">Repeat Clients</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center fade-in"
        >
          <div className="max-w-3xl mx-auto p-12 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 backdrop-blur-sm rounded-3xl border border-accent-primary/20">
            <h3 className="text-4xl font-bold text-accent-white mb-6 font-display tracking-wide">Join the Success Stories</h3>
            <p className="text-accent-gray mb-8 text-lg font-body leading-relaxed">
              Ready to create something extraordinary? Let's collaborate and add your project to this collection of success stories.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-full hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 font-body tracking-wide inline-flex items-center"
            >
              START YOUR PROJECT
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;