// src/components/Background/QuantumGeometric.tsx
import React from 'react';
import Particles from '@tsparticles/react';
import type { IOptions } from '@tsparticles/engine';

const QuantumGeometric: React.FC = () => {
  const options: IOptions = {
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
          enable: false, 
          // 必要に応じて以下のプロパティを設定
          // color: { value: "#ffffff" },
          // opacity: { value: 1 },
          // speed: { value: 2 },
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
      options={options}
    />
  );
};

export default QuantumGeometric;
