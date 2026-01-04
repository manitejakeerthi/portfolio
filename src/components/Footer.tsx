import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin, ArrowUp, Film, Camera, Palette } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/xx_maniteja_xx/', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/@DynesTech', label: 'YouTube' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/maitejakeerthi', label: 'LinkedIn' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Creative Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-400/5" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              )
            `
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl flex items-center justify-center mr-6 shadow-xl shadow-orange-500/30">
                <Film className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-white mb-2 tracking-wider">
                  PORTFOLIO
                </div>
                <div className="text-orange-500 font-mono text-sm tracking-widest">
                  VISUAL STORYTELLER
                </div>
              </div>
            </div>
            
            <p className="text-white/70 text-lg leading-relaxed mb-8 font-body max-w-2xl">
              Creating visual experiences that captivate, inspire, and tell your story through the art of motion. 
              Every frame crafted with precision and passion for cinematic excellence.
            </p>

            {/* Creative Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Camera className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-white font-display">200+</div>
                <div className="text-white/60 text-sm font-body">Projects</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Palette className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-white font-display">5+</div>
                <div className="text-white/60 text-sm font-body">Years</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Film className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-white font-display">12+</div>
                <div className="text-white/60 text-sm font-body">Clients</div>
              </div>
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h4 className="text-white font-semibold text-xl mb-6 font-display tracking-wide">Let's Connect</h4>
              
              <div className="space-y-4 mb-8">
                <a href="mailto:keerthimaniteja003@gmail.com" className="flex items-center text-white/70 hover:text-orange-500 transition-colors group">
                  <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-body">keerthimaniteja003@gmail.com</span>
                </a>
                <a href="tel:+916302078588" className="flex items-center text-white/70 hover:text-orange-500 transition-colors group">
                  <Phone className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-body">+91 6302078588</span>
                </a>
                <div className="flex items-center text-white/70">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span className="font-body">Hyderabad, India</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h5 className="text-white font-medium mb-4 font-display">Follow the Journey</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -3 }}
                    className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/70 hover:text-orange-500 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/50 text-sm mb-4 md:mb-0 font-body"
            >
              © 2024 Portfolio. Crafted with passion for visual storytelling.
            </motion.div>

            <div className="flex items-center space-x-8">
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors font-body">
                Privacy
              </a>
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors font-body">
                Terms
              </a>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-400/20 rounded-xl flex items-center justify-center hover:from-orange-500/30 hover:to-orange-400/30 transition-all duration-300 border border-white/10"
              >
                <ArrowUp className="w-5 h-5 text-orange-500" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-20 w-24 h-24 border border-orange-500/20 rounded-2xl rotate-45 animate-float" />
    </footer>
  );
};

export default Footer;