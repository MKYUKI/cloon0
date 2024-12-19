// src/components/Background/QuantumGeometric.tsx
import React from 'react';
import Particles from '@tsparticles/react';
import { Engine, loadFull } from 'tsparticles';

const QuantumGeometric: React.FC = () => {
  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
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
            resize: true,
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
          number: { density: { enable: true, area: 800 }, value: 50 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default QuantumGeometric;
