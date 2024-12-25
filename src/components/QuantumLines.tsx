// src/components/QuantumLines.tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

interface LineProps {
  color: string;
  speed: number;
  points: THREE.Vector3[];
}

const QuantumLine: React.FC<LineProps> = ({ color, speed, points }) => {
  const ref = useRef<THREE.Line | null>(null); // 非nullアサーションを削除

  useFrame(() => {
    if (ref.current) { // nullチェックを追加
      ref.current.rotation.x += speed;
      ref.current.rotation.y += speed;
    }
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={2} />
    </line>
  );
};

const QuantumLines = () => {
  const lines = [
    {
      color: '#00aaff',
      speed: 0.01,
      points: [
        new THREE.Vector3(-5, -5, 0),
        new THREE.Vector3(5, -5, 0),
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(-5, 5, 0),
        new THREE.Vector3(-5, -5, 0),
      ],
    },
    // 他のライン
  ];

  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 20], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} />
      {lines.map((line, index) => (
        <QuantumLine key={index} color={line.color} speed={line.speed} points={line.points} />
      ))}
    </Canvas>
  );
};

export default QuantumLines;
