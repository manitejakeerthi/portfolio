import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SoftwareLogosTicker: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const softwareLogos = [
    {
      name: 'Adobe Premiere Pro',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg',
    },
    {
      name: 'Adobe After Effects',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg',
    },
    {
      name: 'DaVinci Resolve',
      url: 'https://logos-world.net/wp-content/uploads/2021/02/DaVinci-Resolve-Logo.png',
    },
    {
      name: 'CapCut',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNmZmYiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMjggMjRBMTA0IDEwNCAwIDEgMCAyMzIgMTI4IDEwNC4xMSAxMDQuMTEgMCAwIDAgMTI4IDI0Wm0wIDE5MmE4OCA4OCAwIDEgMSA4OC04OCA4OC4xIDg4LjEgMCAwIDEtODggODhabTQ0LTEyNC40YTEyIDEyIDAgMCAxIDAgMTYuOEwxNDAuOCAxNDBsOS42IDkuNmExMiAxMiAwIDAgMS0xNi44IDE2LjhMMTIwIDEzMi44bC0xMy42IDEzLjZhMTIgMTIgMCAwIDEtMTYuOC0xNi44TDk5LjIgMTIwbC05LjYtOS42YTEyIDEyIDAgMSAxIDE2LjgtMTYuOEwxMjAgMTA3LjJsNi4yLTYuMmExMiAxMiAwIDAgMSAxNi44IDB6Ii8+PC9zdmc+',
    },
    {
      name: 'Canva',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
    },
    {
      name: 'Adobe Photoshop',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg',
    },
    {
      name: 'Runway ML',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiMwMGZmMDAiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyOCAyNEExMDQgMTA0IDAgMSAwIDIzMiAxMjggMTA0LjExIDEwNC4xMSAwIDAgMCAxMjggMjRabTAgMTkyYTg4IDg4IDAgMSAxIDg4LTg4IDg4LjEgODguMSAwIDAgMS04OCA4OFpNOTYgMTEyYTEyIDEyIDAgMCAxIDEyLTEyaDQwYTEyIDEyIDAgMCAxIDAgMjRIMTA4YTEyIDEyIDAgMCAxLTEyLTEyWm02NCAwYTEyIDEyIDAgMCAxIDEyLTEyaDhhMTIgMTIgMCAwIDEgMCAyNGgtOGExMiAxMiAwIDAgMS0xMi0xMloiLz48L3N2Zz4=',
    },
    {
      name: 'HeyGen',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNmZjU5MDAiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyOCAyNEExMDQgMTA0IDAgMSAwIDIzMiAxMjggMTA0LjExIDEwNC4xMSAwIDAgMCAxMjggMjRabTAgMTkyYTg4IDg4IDAgMSAxIDg4LTg4IDg4LjEgODguMSAwIDAgMS04OCA4OFptMC0xNDRhNTYgNTYgMCAxIDAgNTYgNTYgNTYuMDYgNTYuMDYgMCAwIDAtNTYtNTZabTAgOTZhNDAgNDAgMCAxIDEgNDAtNDAgNDAgNDAgMCAwIDEtNDAgNDBaIi8+PC9zdmc+',
    },
    {
      name: 'PlayHT',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiMwMDcwZjMiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMjggMjRBMTA0IDEwNCAwIDEgMCAyMzIgMTI4IDEwNC4xMSAxMDQuMTEgMCAwIDAgMTI4IDI0Wm0wIDE5MmE4OCA4OCAwIDEgMSA4OC04OCA4OC4xIDg4LjEgMCAwIDEtODggODhaTTE2NCA5NnY2NGExMiAxMiAwIDAgMS0yNCAwaC04YTEyIDEyIDAgMCAxIDAtMjRoOGExMiAxMiAwIDAgMSAyNCAweiIvPjwvc3ZnPg==',
    }
  ];

  useEffect(() => {
    if (!tickerRef.current) return;

    const ticker = tickerRef.current;
    
    const setupAnimation = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      gsap.set(ticker, { x: '0%' });

      animationRef.current = gsap.to(ticker, {
        x: '-50%',
        duration: 25,
        ease: 'none',
        repeat: -1,
      });
    };

    setupAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, []);

  const LogoItem = ({ logo }: { logo: typeof softwareLogos[0] }) => (
    <div 
      className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
      title={logo.name}
    >
      <img 
        src={logo.url}
        alt={`${logo.name} - Video editing software used by freelance video editor Mani Teja Keerthi India`}
        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );

  return (
    <div className="py-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden relative">
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black via-black/50 to-transparent z-10" />
      
      <div 
        ref={tickerRef}
        className="flex items-center gap-12 will-change-transform"
        style={{ width: '200%' }}
      >
        <div className="flex items-center gap-12" style={{ width: '50%' }}>
          {softwareLogos.map((logo, index) => (
            <LogoItem key={`first-${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
        
        <div className="flex items-center gap-12" style={{ width: '50%' }}>
          {softwareLogos.map((logo, index) => (
            <LogoItem key={`second-${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoftwareLogosTicker;
