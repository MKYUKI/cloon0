// src/components/Particles.tsx
import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { Engine, Container } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

const ParticlesBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // tsParticlesをフルロード
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    if (container) {
      console.log('Particles loaded:', container);
    }
  }, []);

  const options = {
    background: {
      color: {
        value: "#ffffff",
      },
      image: "",
      opacity: 1,
      position: "center center",
      repeat: "no-repeat",
      size: "cover",
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { 
          enable: true, 
          mode: "repulse", 
          parallax: { enable: false, force: 60, smooth: 10 } 
        },
        resize: { enable: true, delay: 0 },
        onDiv: { 
          enable: false, 
          mode: "repulse", 
          selectors: "", 
          type: "circle" 
        },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { 
        value: "#1e90ff",
        animation: { 
          enable: false, 
          speed: 1, 
          sync: false, 
          offset: 0,
          count: 0,
          decay: 0,
          delay: 0
        },
      },
      links: { 
        color: "#1e90ff", 
        distance: 150, 
        enable: true, 
        opacity: 0.5, 
        width: 1 
      },
      collisions: { 
        enable: true, 
        mode: "bounce",       
        bounce: { 
          horizontal: { value: 2 },   
          vertical: { value: 2 }
        }, 
        absorb: { 
          color: { value: "#ffffff" },
          opacity: { value: 1 },
          speed: { value: 2 },
        },      
        maxSpeed: 10,         
        overlap: { enable: false, retries: 0 }        
      },
      move: { 
        direction: "none", 
        enable: true, 
        outModes: { default: "bounce" }, 
        random: false, 
        speed: 2, 
        straight: false 
      },
      number: { 
        density: { enable: true, value_area: 800 }, 
        value: 50 
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
    />
  );
};

export default ParticlesBackground;
