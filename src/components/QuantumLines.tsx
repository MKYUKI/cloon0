// src/components/QuantumLines.tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const Line = ({ color, speed, scale }: { color: string; speed: number; scale: number }) => {
  const ref = useRef<THREE.Line>(null!);

  useFrame(() => {
    ref.current.rotation.x += speed;
    ref.current.rotation.y += speed;
    ref.current.scale.set(scale, scale, scale);
  });

  const points = [
    new THREE.Vector3(-5, -5, 0),
    new THREE.Vector3(5, -5, 0),
    new THREE.Vector3(5, 5, 0),
    new THREE.Vector3(-5, 5, 0),
    new THREE.Vector3(-5, -5, 0),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={2} />
    </line>
  );
};

const QuantumLines = () => {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 30], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} />
      {/* 複数のラインを追加 */}
      <Line color="#00aaff" speed={0.01} scale={1} />
      <Line color="#00ffaa" speed={0.015} scale={1.2} />
      <Line color="#aaff00" speed={0.02} scale={0.8} />
      <Line color="#ffaa00" speed={0.025} scale={1.5} />
      {/* 必要に応じてラインを追加 */}
    </Canvas>
  );
};

export default QuantumLines;
