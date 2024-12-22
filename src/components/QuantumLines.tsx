// components/QuantumLines.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const QuantumLines = () => {
  const linesRef = useRef<THREE.Line[]>([]);

  useEffect(() => {
    linesRef.current.forEach((line) => {
      const speed = 0.01;
      const animate = () => {
        line.rotation.x += speed;
        line.rotation.y += speed;
        requestAnimationFrame(animate);
      };
      animate();
    });
  }, []);

  const createLine = () => {
    const points = [];
    for (let i = 0; i < 5; i++) {
      points.push(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#00aaff', linewidth: 2 });
    return new THREE.Line(geometry, material);
  };

  const lines = Array.from({ length: 10 }, () => createLine());

  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} camera={{ position: [0, 0, 20] }}>
      <ambientLight intensity={0.5} />
      <OrbitControls enableZoom={false} />
      {lines.map((line, index) => (
        <primitive object={line} key={index} ref={(el: any) => (linesRef.current[index] = el)} />
      ))}
    </Canvas>
  );
};

export default QuantumLines;
