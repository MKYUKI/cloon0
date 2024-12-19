// src/components/Particles.tsx
import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { Engine } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

const ParticlesBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // tsParticlesをフルロード
    await loadFull(engine);
  }, []);

  const options = {
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
      collisions: { enable: true, mode: "bounce" },
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, speed: 2 },
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

export default ParticlesBackground;
