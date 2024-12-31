// 例: src/components/Logo.tsx
import Image from "next/image";
import React from "react";

const Logo: React.FC = () => {
  return (
    <div>
      <Image
        src="/images/your-image.jpg"
        alt="Logo"
        width={150}
        height={50}
        fetchPriority="high"
      />
    </div>
  );
};

export default Logo;
