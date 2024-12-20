// src/components/Particles.tsx
import React from 'react';
import Particles from '@tsparticles/react';
import { Engine } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

const ParticlesBackground: React.FC = () => {
  const particlesInit = async (main: Engine) => {
    // tsParticlesのフルロード
    await loadFull(main);
  };

  const options = {
    // パーティクルの設定をここに記述
  };

  return (
    <Particles id="tsparticles" init={particlesInit} options={options} />
  );
};

export default ParticlesBackground;
