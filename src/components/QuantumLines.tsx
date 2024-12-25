// src/components/QuantumLines.tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { Line, OrbitControls } from '@react-three/drei';

interface LineProps {
  color: string;
  speed: number;
  points: THREE.Vector3[];
}

const QuantumLine: React.FC<LineProps> = ({ color, speed, points }) => {
  const ref = useRef<THREE.Line>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += speed;
      ref.current.rotation.y += speed;
    }
  });

  return (
    <Line ref={ref} points={points} color={color} lineWidth={2} />
  );
};

const QuantumLines = () => {
  const lines = [
    {
      color: '#00aaff', // 明るい青
      speed: 0.01,
      points: [
        new THREE.Vector3(-5, -5, 0),
        new THREE.Vector3(5, -5, 0),
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(-5, 5, 0),
        new THREE.Vector3(-5, -5, 0),
      ],
    },
    {
      color: '#00aaff',
      speed: 0.015,
      points: [
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(0, 5, 0),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(0, -5, 0),
        new THREE.Vector3(-5, 0, 0),
      ],
    },
    {
      color: '#00aaff',
      speed: 0.02,
      points: [
        new THREE.Vector3(0, -5, 0),
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(-5, 5, 0),
        new THREE.Vector3(0, -5, 0),
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
      <OrbitControls enableZoom={false} />
      {lines.map((line, index) => (
        <QuantumLine
          key={index}
          color={line.color}
          speed={line.speed}
          points={line.points}
        />
      ))}
    </Canvas>
  );
};

export default QuantumLines;
