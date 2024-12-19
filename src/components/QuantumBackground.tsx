import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const QuantumBackground: React.FC = () => {
  const lineRef = useRef<THREE.Line>(null);
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.x += 0.0005;
      lineRef.current.rotation.y += 0.0005;
    }
  });

  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 50; i++) {
    points.push(new THREE.Vector3(
      Math.sin(i * 0.2) * 3,
      Math.cos(i * 0.2) * 3,
      (i - 25) * 0.05
    ));
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <ambientLight intensity={0.4}/>
        <pointLight position={[10,10,10]}/>
        <Line
          ref={lineRef}
          points={points}
          color="#1e90ff"
          lineWidth={1.5}
        />
      </Canvas>
    </div>
  );
};

export default QuantumBackground;
