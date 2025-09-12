import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const EnhancedSoftwareLogosTicker: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  const softwareLogos = [
    {
      name: 'Adobe Premiere Pro',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg',
      bgColor: 'bg-purple-600'
    },
    {
      name: 'Adobe After Effects',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg',
      bgColor: 'bg-purple-700'
    },
    {
      name: 'DaVinci Resolve',
      url: 'https://logos-world.net/wp-content/uploads/2021/02/DaVinci-Resolve-Logo.png',
      bgColor: 'bg-red-600'
    },
    {
      name: 'CapCut',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNmZmYiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMjggMjRBMTA0IDEwNCAwIDEgMCAyMzIgMTI4IDEwNC4xMSAxMDQuMTEgMCAwIDAgMTI4IDI0Wm0wIDE5MmE4OCA4OCAwIDEgMSA4OC04OCA4OC4xIDg4LjEgMCAwIDEtODggODhabTQ0LTEyNC40YTEyIDEyIDAgMCAxIDAgMTYuOEwxNDAuOCAxNDBsOS42IDkuNmExMiAxMiAwIDAgMS0xNi44IDE2LjhMMTIwIDEzMi44bC0xMy42IDEzLjZhMTIgMTIgMCAwIDEtMTYuOC0xNi44TDk5LjIgMTIwbC05LjYtOS42YTEyIDEyIDAgMSAxIDE2LjgtMTYuOEwxMjAgMTA3LjJsNi4yLTYuMmExMiAxMiAwIDAgMSAxNi44IDB6Ii8+PC9zdmc+',
      bgColor: 'bg-black'
    },
    {
      name: 'Canva',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'Adobe Photoshop',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg',
      bgColor: 'bg-blue-600'
    },
    {
      name: 'Runway ML',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiMwMGZmMDAiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyOCAyNEExMDQgMTA0IDAgMSAwIDIzMiAxMjggMTA0LjExIDEwNC4xMSAwIDAgMCAxMjggMjRabTAgMTkyYTg4IDg4IDAgMSAxIDg4LTg4IDg4LjEgODguMSAwIDAgMS04OCA4OFpNOTYgMTEyYTEyIDEyIDAgMCAxIDEyLTEyaDQwYTEyIDEyIDAgMCAxIDAgMjRIMTA4YTEyIDEyIDAgMCAxLTEyLTEyWm02NCAwYTEyIDEyIDAgMCAxIDEyLTEyaDhhMTIgMTIgMCAwIDEgMCAyNGgtOGExMiAxMiAwIDAgMS0xMi0xMloiLz48L3N2Zz4=',
      bgColor: 'bg-green-500'
    },
    {
      name: 'HeyGen',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNmZjU5MDAiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyOCAyNEExMDQgMTA0IDAgMSAwIDIzMiAxMjggMTA0LjExIDEwNC4xMSAwIDAgMCAxMjggMjRabTAgMTkyYTg4IDg4IDAgMSAxIDg4LTg4IDg4LjEgODguMSAwIDAgMS04OCA4OFptMC0xNDRhNTYgNTYgMCAxIDAgNTYgNTYgNTYuMDYgNTYuMDYgMCAwIDAtNTYtNTZabTAgOTZhNDAgNDAgMCAxIDEgNDAtNDAgNDAgNDAgMCAwIDEtNDAgNDBaIi8+PC9zdmc+',
      bgColor: 'bg-orange-500'
    },
    {
      name: 'PlayHT',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiMwMDcwZjMiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMjggMjRBMTA0IDEwNCAwIDEgMCAyMzIgMTI4IDEwNC4xMSAxMDQuMTEgMCAwIDAgMTI4IDI0Wm0wIDE5MmE4OCA4OCAwIDEgMSA4OC04OCA4OC4xIDg4LjEgMCAwIDEtODggODhaTTE2NCA5NnY2NGExMiAxMiAwIDAgMS0yNCAwaC04YTEyIDEyIDAgMCAxIDAtMjRoOGExMiAxMiAwIDAgMSAyNCAweiIvPjwvc3ZnPg==',
      bgColor: 'bg-blue-400'
    }
  ];

  useEffect(() => {
    if (tickerRef.current) {
      const ticker = tickerRef.current;
      const tickerWidth = ticker.scrollWidth;
      
      // Create seamless infinite loop
      gsap.fromTo(ticker, 
        { x: '0%' },
        {
          x: '-50%',
          duration: 30,
          ease: 'none',
          repeat: -1
        }
      );
    }
  }, []);

  return (
    <div className="py-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Subtle gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black via-black/50 to-transparent z-10" />
      
      <div 
        ref={tickerRef}
        className="flex items-center space-x-12"
        style={{ width: '200%' }}
      >
        {/* First set of logos */}
        <div className="flex items-center space-x-12" style={{ width: '50%' }}>
          {softwareLogos.map((logo, index) => (
            <div 
              key={`first-${logo.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              title={logo.name}
            >
              <img 
                src={logo.url}
                alt={logo.name}
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center space-x-12" style={{ width: '50%' }}>
          {softwareLogos.map((logo, index) => (
            <div 
              key={`second-${logo.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              title={logo.name}
            >
              <img 
                src={logo.url}
                alt={logo.name}
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSoftwareLogosTicker;
