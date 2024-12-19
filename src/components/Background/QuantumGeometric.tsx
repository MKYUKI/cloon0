// src/components/Background/QuantumGeometric.tsx
import React from 'react';
import Particles from '@tsparticles/react';
import { Engine, loadFull } from 'tsparticles';

const QuantumGeometric: React.FC = () => {
  const particlesInit = async (main: Engine) => {
    // tsParticlesの全機能をロード
    await loadFull(main);
  };

  return (
    <Particles
      id="quantum-geometric"
      init={particlesInit}
      options={{
        background: {
          color: { value: "#000000" }, // 背景色を黒に設定
        },
        particles: {
          color: { value: "#FFFFFF" }, // パーティクルの色を白に設定
          shape: { type: "triangle" }, // 幾何学的な形状（例: triangle）
          number: {
            value: 80,
            density: { enable: true, area: 800 },
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 1,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default QuantumGeometric;
