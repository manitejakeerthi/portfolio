import React from 'react';

const VintageBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Vintage film grain texture */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.01) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")
          `,
          backgroundSize: '100px 100px, 150px 150px, 200px 200px'
        }}
      />
      
      {/* Vintage vignette */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.8) 100%)'
        }}
      />
      
      {/* Subtle orange glow */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(255, 69, 0, 0.3) 0%, transparent 70%)'
        }}
      />
    </div>
  );
};

export default VintageBackground;