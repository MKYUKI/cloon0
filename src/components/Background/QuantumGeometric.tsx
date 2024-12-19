// src/components/Background/QuantumGeometric.tsx
import React from 'react';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles'; // 'tsparticles' からインポート
import type { Engine, IOptions } from '@tsparticles/engine';

const QuantumGeometric: React.FC = () => {
  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };

  const options: IOptions = {
    background: {
      color: {
        value: "#ffffff",
      },
      image: "",
      opacity: 1,
      position: "center center",
      repeat: "no-repeat",
      size: "cover"
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas", // 追加: インタラクション検出対象を指定
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
          type: "circle" // 修正: "circle" または "rectangle" を指定
        }
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#1e90ff" },
      links: { color: "#1e90ff", distance: 150, enable: true, opacity: 0.5, width: 1 },
      collisions: { enable: true },
      move: { 
        direction: "none", 
        enable: true, 
        outModes: { default: "bounce" }, 
        random: false, 
        speed: 2, 
        straight: false 
      },
      number: { density: { enable: true, value_area: 800 }, value: 50 },
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
      options={options}
    />
  );
};

export default QuantumGeometric;
