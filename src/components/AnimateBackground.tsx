// src/components/AnimatedBackground.tsx
import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div style={styles.container}>
      <svg width="100%" height="100%" viewBox="0 0 800 600" style={styles.svg}>
        {/* 幾何学的な線 */}
        <line x1="100" y1="300" x2="700" y2="300" stroke="#add8e6" strokeWidth="2">
          <animate
            attributeName="x1"
            from="100"
            to="700"
            dur="4s"
            repeatCount="indefinite"
            direction="alternate"
          />
          <animate
            attributeName="x2"
            from="700"
            to="100"
            dur="4s"
            repeatCount="indefinite"
            direction="alternate"
          />
        </line>
        <line x1="400" y1="100" x2="400" y2="500" stroke="#add8e6" strokeWidth="2">
          <animate
            attributeName="y1"
            from="100"
            to="500"
            dur="4s"
            repeatCount="indefinite"
            direction="alternate"
          />
          <animate
            attributeName="y2"
            from="500"
            to="100"
            dur="4s"
            repeatCount="indefinite"
            direction="alternate"
          />
        </line>
        {/* その他の線や図形を追加可能 */}
      </svg>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: -1,
  },
  svg: {
    width: "100%",
    height: "100%",
  },
};

export default AnimatedBackground;
