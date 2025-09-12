import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Calendar, Clock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create email body
      const emailBody = `
New Project Inquiry from ${formData.name}

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}

Project Details:
- Type: ${formData.projectType}
- Budget: ${formData.budget || 'Not specified'}

Message:
${formData.message}

---
Sent from Portfolio Contact Form
      `;

      // Using EmailJS or similar service for actual email sending
      // For demonstration, using mailto (you'll want to replace with actual backend)
      const mailtoLink = `mailto:keerthimaniteja003@gmail.com?subject=New Project Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(emailBody)}`;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Open mailto link
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'keerthimaniteja003@gmail.com',
      link: 'mailto:keerthimaniteja003@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 6302078588',
      link: 'tel:+916302078588'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Hyderabad, India',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: 'Within 12 hours',
      link: '#'
    }
  ];

  const projectTypes = [
    'Music Video',
    'Commercial',
    'Documentary',
    'Film/Short Film',
    'Brand Video',
    'Event Coverage',
    'Social Media Content',
    'Other'
  ];

  const budgetRanges = [
    'Under $10',
    '$11 - $100',
    '$101 - $299',
    '$300 - $1000',
    '$1,000+',
    'Let\'s discuss'
  ];

  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-6 py-4 bg-white/5 border rounded-2xl text-accent-white placeholder-accent-gray/50 focus:outline-none transition-all duration-300 font-body";
    const focusedClass = focusedField === fieldName ? "border-accent-primary ring-2 ring-accent-primary/50 shadow-lg shadow-accent-primary/20" : "border-accent-border hover:border-accent-primary/50";
    return `${baseClass} ${focusedClass}`;
  };

  return (
    <section id="contact" className="py-32 bg-dark-950 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 fade-in"
        >
          <div className="text-accent-primary text-sm font-mono tracking-widest mb-6 uppercase">
            LET'S COLLABORATE
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-accent-white tracking-wide">
            Start Your Project
          </h2>
          <p className="text-xl text-accent-gray max-w-4xl mx-auto font-body leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-10 border border-accent-border relative overflow-hidden"
          >
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-6 right-6 bg-green-500/20 border border-green-500/50 rounded-2xl p-4 flex items-center z-10"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-green-400 font-medium">Message sent successfully! I'll get back to you soon.</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-6 right-6 bg-red-500/20 border border-red-500/50 rounded-2xl p-4 flex items-center z-10"
              >
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-red-400 font-medium">Failed to send message. Please try again.</span>
              </motion.div>
            )}

            <h3 className="text-3xl font-bold text-accent-white mb-8 font-display tracking-wide">Tell Me About Your Vision</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-accent-gray text-sm font-medium mb-3 font-body tracking-wide">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={getInputClassName('name')}
                    placeholder="Your name"
                  />
                </motion.div>
                
                <motion.div 
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-accent-gray text-sm font-medium mb-3 font-body tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={getInputClassName('email')}
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <motion.div 
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-accent-gray text-sm font-medium mb-3 font-body tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className={getInputClassName('phone')}
                  placeholder="+91 XXX XXX XXXX"
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-accent-gray text-sm font-medium mb-3 font-body tracking-wide">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('projectType')}
                    onBlur={() => setFocusedField(null)}
                    className={getInputClassName('projectType')}
                  >
                    <option value="" className="bg-dark-900">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-dark-900">
                        {type}
                      </option>
                    ))}
                  </select>
                </motion.div>
                
                <motion.div 
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-accent-gray text-sm font-medium mb-3 font-body tracking-wide">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('budget')}
                    onBlur={() => setFocusedField(null)}
                    className={getInputClassName('budget')}
                  >
                    <option value="" className="bg-dark-900">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range} className="bg-dark-900">
                        {range}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div 
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-accent-gray text-sm font-medium mb-3 font-body tracking-wide">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`${getInputClassName('message')} resize-none`}
                  placeholder="Tell me about your project, vision, and any specific requirements..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-body tracking-wide relative overflow-hidden"
              >
                {isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-primary/50 to-accent-secondary/50"
                    animate={{ x: [-100, 100] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    SENT SUCCESSFULLY!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    SEND MESSAGE
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Enhanced Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-accent-white mb-8 font-display tracking-wide">Get In Touch</h3>
              <p className="text-accent-gray text-lg mb-8 font-body leading-relaxed">
                Whether you have a specific project in mind or want to explore creative possibilities, 
                I'm here to help transform your vision into compelling visual stories.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-accent-border hover:border-accent-primary/50 transition-all duration-300 group block"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-accent-primary" />
                  </div>
                  <h4 className="text-accent-white font-semibold mb-2 font-display tracking-wide">{info.title}</h4>
                  <p className="text-accent-gray font-body">{info.value}</p>
                </motion.a>
              ))}
            </div>

            {/* Enhanced Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-accent-primary/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5" />
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-accent-primary mr-3" />
                  <h4 className="text-accent-white font-semibold text-lg font-display tracking-wide">Current Availability</h4>
                </div>
                <p className="text-accent-gray mb-6 font-body leading-relaxed">
                  Currently booking projects for Q1 2025. Rush projects available based on schedule and requirements.
                </p>
                <div className="flex items-center">
                  <motion.div 
                    className="w-3 h-3 bg-accent-primary rounded-full mr-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <span className="text-accent-primary font-medium font-body tracking-wide">Available for new projects</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
