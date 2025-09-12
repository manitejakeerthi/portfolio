import React from 'react';
import { motion } from 'framer-motion';
import { Video, Palette, Zap, Music, Camera, Sparkles, Check, ArrowRight } from 'lucide-react';
import AnimatedTextReveal from './AnimatedTextReveal';

const Services: React.FC = () => {
  const services = [
    {
      icon: Video,
      title: 'Video Editing',
      description: 'Professional video editing with cinematic quality and storytelling expertise',
      features: ['Sound Designing', 'Advanced Transitions with Cinematic Touch', 'Fast / Low Pace', 'Color Grading'],
      price: 'From $10/hr',
      popular: false
    },
    {
      icon: Palette,
      title: 'AI Clone Editing',
      description: 'Clone client video and audio then generate realistic edits',
      features: ['Color Matching', 'Cinematic Looks', 'Skin Tone Correction', 'Realistic Editing'],
      price: 'From $50/hr',
      popular: true
    },
    {
      icon: Zap,
      title: 'Motion Graphics',
      description: 'Dynamic motion graphics and animations for engaging visual content',
      features: ['Logo Animations', '2D/3D Graphics', 'Title Sequences', 'Infographics'],
      price: 'From $100/project',
      popular: false
    },
    {
      icon: Music,
      title: 'Audio Post-Production',
      description: 'Professional audio editing, mixing, and sound design services',
      features: ['Audio Cleanup', 'Sound Mixing', 'Voice Enhancement', 'Music Synchronization'],
      price: 'From $30/hr',
      popular: false
    },
    {
      icon: Camera,
      title: 'VFX & Compositing',
      description: 'Visual effects and compositing for stunning cinematic results',
      features: ['Green Screen', 'Object Removal', 'Sky Replacement', 'Digital Environments'],
      price: 'From $200/project',
      popular: false
    },
    {
      icon: Sparkles,
      title: 'Full Production',
      description: 'Complete video production from concept to final delivery',
      features: ['Pre-production', 'Production Support', 'Post-production', 'Delivery Optimization'],
      price: 'From $500/project',
      popular: false
    }
  ];

  return (
    <section id="services" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 fade-in"
        >
          <div className="text-accent-primary text-sm font-mono tracking-widest mb-6 uppercase">
            WHAT I OFFER
          </div>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-wide" style={{ fontFamily: 'Dancing Script, cursive' }}>
            SERVICES
          </h2>
          <AnimatedTextReveal className="text-2xl md:text-3xl text-accent-gray max-w-5xl mx-auto font-body leading-relaxed font-normal">
            There may be millions of editors out there, but what you truly need is someone who understands you. Choose wisely—because your story deserves more than just edits, it deserves meaning.
          </AnimatedTextReveal>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 group ${
                service.popular 
                  ? 'border-accent-primary/50 shadow-xl shadow-accent-primary/20' 
                  : 'border-accent-border hover:border-accent-primary/50'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-xs font-mono tracking-widest px-4 py-2 rounded-full">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                service.popular 
                  ? 'bg-gradient-to-br from-accent-primary to-accent-secondary shadow-accent-primary/30'
                  : 'bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20'
              }`}>
                <service.icon className={`w-8 h-8 ${service.popular ? 'text-white' : 'text-accent-primary'}`} />
              </div>
              
              <h3 className="text-2xl font-semibold text-accent-white mb-3 font-display tracking-wide">{service.title}</h3>
              <p className="text-accent-gray mb-6 font-body leading-relaxed font-normal">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-accent-gray font-body font-normal">
                    <Check className="w-4 h-4 text-accent-primary mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <div className="text-2xl font-bold text-accent-white mb-6 font-display">{service.price}</div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center group ${
                    service.popular
                      ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:shadow-lg hover:shadow-accent-primary/25'
                      : 'bg-white/5 text-accent-white hover:bg-white/10 border border-accent-border'
                  } font-body tracking-wide`}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 fade-in"
        >
          <div className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 backdrop-blur-sm rounded-3xl border border-accent-primary/20">
            <h3 className="text-5xl md:text-6xl font-bold text-accent-white mb-6 font-display tracking-wide leading-none">
              NEED SOMETHING CUSTOM?
            </h3>
            <AnimatedTextReveal className="text-accent-gray mb-8 text-xl font-body leading-relaxed font-normal">
              Every project is unique. Let's discuss your specific requirements and create a tailored solution 
              that perfectly fits your vision, timeline, and budget.
            </AnimatedTextReveal>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium rounded-full hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 font-body tracking-wide"
              >
                GET CUSTOM QUOTE
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border border-accent-border text-accent-white font-medium rounded-full hover:bg-accent-primary/10 transition-all duration-300 font-body tracking-wide"
              >
                SCHEDULE CONSULTATION
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
