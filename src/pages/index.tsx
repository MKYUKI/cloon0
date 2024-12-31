// src/pages/index.tsx

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Chat from "../components/Chat";
import * as THREE from "three";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const { data: session } = useSession();
  const threeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = threeContainerRef.current;
    if (!container) return;

    // Three.js シーンのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 150;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 幾何学的なラインの生成
    const linesGroup = new THREE.Group();
    const lineCount = 100; // ラインの本数を増やして量子的な雰囲気を演出
    const pointsPerLine = 50; // 各ラインの点数を増やす

    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(pointsPerLine * 3);

      for (let j = 0; j < pointsPerLine; j++) {
        const angle = (j / pointsPerLine) * Math.PI * 2;
        const radius = 50 + Math.random() * 100;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const z = (Math.random() - 0.5) * 200;
        positions[j * 3] = x;
        positions[j * 3 + 1] = y;
        positions[j * 3 + 2] = z;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: 0x000000, // 黒色
        linewidth: 1, // 線の太さを更に細く
        transparent: true,
        opacity: 0.2, // 線の透明度を下げて幻想的な雰囲気を強調
      });

      const line = new THREE.Line(geometry, material);
      line.rotation.x = Math.random() * Math.PI * 2;
      line.rotation.y = Math.random() * Math.PI * 2;
      line.rotation.z = Math.random() * Math.PI * 2;

      linesGroup.add(line);
    }

    scene.add(linesGroup);

    // アニメーション
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      linesGroup.rotation.x += 0.0003;
      linesGroup.rotation.y += 0.0005;
      linesGroup.rotation.z += 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    // リサイズ対応
    const onWindowResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // クリーンアップ
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <main className={styles.main}>
        {/* Three.jsのレンダリングコンテナ */}
        <div ref={threeContainerRef} className={styles.background}></div>
        <div className={styles.container}>
          <h1 className={styles.title}>0へようこそ！</h1>
          {session ? (
            <div className={styles.content}>
              <p className={styles.text}>ログイン中: {session.user?.email}</p>
              <Chat />
            </div>
          ) : (
            <p className={styles.text}>ログインしてください。</p>
          )}
        </div>
      </main>

      {/* ChatGPTライクな入力フォーム/ファイル添付UIの例 */}
      <div className={styles.chatInputArea}>
        <input type="text" placeholder="メッセージを入力..." className={styles.inputText} />
        <input type="file" className={styles.inputFile} />
        <button className={styles.sendButton}>送信</button>
      </div>
    </div>
  );
};

export default Home;
