// src/components/Background/QuantumGeometric.tsx
import React from 'react';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import type { Engine } from '@tsparticles/engine';
import type { IOptions } from 'tsparticles-engine';

const QuantumGeometric: React.FC = () => {
  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };

  const options: IOptions = {
    background: {
      color: {
        value: "#ffffff",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: { enable: true }, // オブジェクト形式に修正
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
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 2, straight: false },
      number: { density: { enable: true, area: 800 }, value: 50 }, // 'area' が有効なプロパティであることを確認
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  } as IOptions;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
    />
  );
};

export default QuantumGeometric;
