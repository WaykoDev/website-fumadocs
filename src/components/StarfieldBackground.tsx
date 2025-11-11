"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface StarfieldProps {
  count: number;
  isDark: boolean;
}

// Create a circular texture for the points
function createCircleTexture(isDark: boolean) {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const centerX = 16;
  const centerY = 16;
  const radius = 16;

  // Create radial gradient for smooth circular dots
  // Dark stars for light mode, light stars for dark mode
  const color = isDark ? '255, 255, 255' : '0, 0, 0';
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, `rgba(${color}, 1)`);
  gradient.addColorStop(0.5, `rgba(${color}, 0.5)`);
  gradient.addColorStop(1, `rgba(${color}, 0)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

const Starfield: React.FC<StarfieldProps> = ({ count, isDark }) => {
  const points = useRef<THREE.Points>(null!);

  // Generate star positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return positions;
  }, [count]);

  // Create circular texture based on theme
  const texture = useMemo(() => createCircleTexture(isDark), [isDark]);

  // Update material when theme changes
  useEffect(() => {
    if (points.current && points.current.material) {
      const material = points.current.material as THREE.PointsMaterial;
      material.map = createCircleTexture(isDark);
      material.color.setHex(isDark ? 0xffffff : 0x000000);
      material.needsUpdate = true;
    }
  }, [isDark]);

  // Gentle rotation animation
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.025;
      points.current.rotation.x = state.clock.elapsedTime * 0.0125;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={isDark ? "#ffffff" : "#000000"}
        map={texture}
        transparent
        opacity={0.78}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const StarfieldBackground: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <div className="fixed -z-10 inset-0 w-screen h-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <Starfield count={2000} isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default StarfieldBackground;
