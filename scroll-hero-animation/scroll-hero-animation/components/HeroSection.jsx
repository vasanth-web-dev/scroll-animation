'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const carRef = useRef(null);
  const statsRef = useRef([]);
  const containerRef = useRef(null);

  // Statistics data
  const stats = [
    { value: '98%', label: 'Performance Score', color: 'var(--color-accent)' },
    { value: '150+', label: 'Active Projects', color: 'var(--color-secondary)' },
    { value: '24/7', label: 'Support Available', color: '#fbbf24' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline animation - fade in and slide up
      tl.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Stats stagger animation
      tl.from(
        statsRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // Car initial animation
      tl.from(
        carRef.current,
        {
          x: -100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.8'
      );

      // Scroll-triggered car animation
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: false,
        },
        x: '50vw',
        rotation: 5,
        scale: 1.1,
        ease: 'none',
      });

      // Headline scroll animation - fade and blur effect
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0.3,
        y: -100,
        scale: 0.95,
        filter: 'blur(3px)',
        ease: 'none',
      });

      // Stats scroll animation - fade out
      gsap.to(statsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0,
        y: -50,
        stagger: 0.05,
        ease: 'none',
      });

      // Parallax background effect
      gsap.to('.bg-gradient-layer', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: '30%',
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      {/* Hero Container with sticky positioning */}
      <div
        ref={containerRef}
        className="relative h-[200vh] bg-gradient-to-b from-[#0a0a0a] via-[#0f0f1a] to-[#0a0a0a]"
      >
        {/* Animated gradient background layer */}
        <div className="bg-gradient-layer absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>
        </div>

        {/* Noise texture overlay */}
        <div className="noise-overlay absolute inset-0 pointer-events-none"></div>

        {/* Main sticky hero content */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Headline */}
          <div ref={headlineRef} className="text-center mb-12 will-change-transform">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display tracking-[0.3em] gradient-text glow-effect">
              WELCOME
            </h1>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display tracking-[0.4em] mt-2 text-white/90">
              ITZFIZZ
            </h2>
            <div className="mt-6 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>

          {/* Statistics Grid */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 z-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="text-center group cursor-pointer will-change-transform"
              >
                <div
                  className="text-5xl md:text-6xl font-display mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-body text-gray-400 tracking-wider uppercase">
                  {stat.label}
                </div>
                <div
                  className="mt-2 h-0.5 w-0 group-hover:w-full transition-all duration-500 mx-auto"
                  style={{ backgroundColor: stat.color }}
                ></div>
              </div>
            ))}
          </div>

          {/* Animated Car/Object */}
          <div
            ref={carRef}
            className="absolute bottom-20 left-10 will-change-transform gpu-accelerated"
            style={{ transformOrigin: 'center center' }}
          >
            <div className="relative">
              {/* Car SVG */}
              <svg
                width="200"
                height="100"
                viewBox="0 0 200 100"
                className="drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(0, 217, 255, 0.3))',
                }}
              >
                {/* Car body */}
                <defs>
                  <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d9ff" />
                    <stop offset="100%" stopColor="#ff3366" />
                  </linearGradient>
                </defs>
                
                {/* Main body */}
                <rect x="20" y="50" width="140" height="30" rx="5" fill="url(#carGradient)" />
                
                {/* Top cabin */}
                <path d="M 50 50 L 70 30 L 120 30 L 140 50 Z" fill="url(#carGradient)" opacity="0.9" />
                
                {/* Windows */}
                <rect x="55" y="35" width="30" height="15" rx="2" fill="#0a0a0a" opacity="0.7" />
                <rect x="95" y="35" width="30" height="15" rx="2" fill="#0a0a0a" opacity="0.7" />
                
                {/* Wheels */}
                <circle cx="50" cy="80" r="15" fill="#1a1a1a" stroke="var(--color-accent)" strokeWidth="3" />
                <circle cx="50" cy="80" r="8" fill="var(--color-accent)" />
                
                <circle cx="130" cy="80" r="15" fill="#1a1a1a" stroke="var(--color-accent)" strokeWidth="3" />
                <circle cx="130" cy="80" r="8" fill="var(--color-accent)" />
                
                {/* Headlights */}
                <circle cx="165" cy="65" r="4" fill="#fbbf24" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
                
                {/* Speed lines for effect */}
                <line x1="5" y1="55" x2="15" y2="55" stroke="var(--color-accent)" strokeWidth="2" opacity="0.5" />
                <line x1="0" y1="65" x2="12" y2="65" stroke="var(--color-accent)" strokeWidth="2" opacity="0.4" />
                <line x1="5" y1="75" x2="15" y2="75" stroke="var(--color-accent)" strokeWidth="2" opacity="0.3" />
              </svg>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-cyan-400">
              <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content section below hero */}
      <div className="relative bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-display mb-6 gradient-text">
            SCROLL-DRIVEN EXCELLENCE
          </h3>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-body">
            This hero section demonstrates advanced scroll-driven animations using GSAP ScrollTrigger.
            Notice how elements move, fade, and transform smoothly as you scroll, creating an immersive
            experience optimized for performance.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {['Smooth Animations', 'Performance Optimized', 'Responsive Design'].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-2xl font-display text-cyan-400 mb-3">{feature}</div>
                <div className="text-sm text-gray-400 font-body">
                  Built with modern web technologies and best practices
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
