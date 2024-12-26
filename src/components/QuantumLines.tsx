// src/components/QuantumLines.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls, Line } from '@react-three/drei';
import { Line2 } from 'three-stdlib';

interface LineProps {
  color: string;
  speed: number;
  points: number[][];
}

const QuantumLine: React.FC<LineProps> = ({ color, speed, points }) => {
  const ref = useRef<Line2>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += speed;
      ref.current.rotation.y += speed;
    }
  });

  return (
    <Line
      ref={ref as React.RefObject<Line2>}
      points={points}
      color={color}
      lineWidth={2}
    />
  );
};

// OrbitControlsをanyとして再定義
const OrbitControls: any = DreiOrbitControls;

const QuantumLines: React.FC = () => {
  const lines = [
    {
      color: '#00aaff',
      speed: 0.01,
      points: [
        [-5, -5, 0],
        [5, -5, 0],
        [5, 5, 0],
        [-5, 5, 0],
        [-5, -5, 0],
      ],
    },
    {
      color: '#00aaff',
      speed: 0.015,
      points: [
        [-5, 0, 0],
        [0, 5, 0],
        [5, 0, 0],
        [0, -5, 0],
        [-5, 0, 0],
      ],
    },
    {
      color: '#00aaff',
      speed: 0.02,
      points: [
        [0, -5, 0],
        [5, 5, 0],
        [-5, 5, 0],
        [0, -5, 0],
      ],
    },
  ];

  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 20], fov: 75 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} />

      {/* 型エラーを無視してenableZoomを設定 */}
      <OrbitControls enableZoom={false} />

      {lines.map((line, i) => (
        <QuantumLine
          key={i}
          color={line.color}
          speed={line.speed}
          points={line.points}
        />
      ))}
    </Canvas>
  );
};

export default QuantumLines;
