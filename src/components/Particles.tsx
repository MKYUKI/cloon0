// src/components/Particles.tsx
import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadFull, Engine, Container } from '@tsparticles/engine';

const ParticlesBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // tsParticlesをフルロード
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (_container: Container | undefined) => {
    console.log('Particles loaded');
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#ffffff", // 白背景
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
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#00aaff" }, // 薄い青色
          links: {
            color: "#00aaff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: { enable: false },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 2,
            straight: false,
          },
          number: { density: { enable: true, area: 800 }, value: 50 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        emitters: {
          direction: "none",
          life: {
            count: 0,
            duration: 0,
            delay: 0,
          },
          rate: {
            delay: 0.1,
            quantity: 5,
          },
          size: {
            width: 0,
            height: 0,
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
