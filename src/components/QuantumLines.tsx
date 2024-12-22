// components/QuantumLines.tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const Line = ({ color }: { color: string }) => {
  const ref = useRef<THREE.Line>(null!);
  const speed = 0.01;

  useFrame(() => {
    ref.current.rotation.x += speed;
    ref.current.rotation.y += speed;
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
      camera={{ position: [0, 0, 20], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} />
      <Line color="#00aaff" />
      <Line color="#00aaff" />
      <Line color="#00aaff" />
      {/* 必要に応じてラインを追加 */}
    </Canvas>
  );
};

export default QuantumLines;
