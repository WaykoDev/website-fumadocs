"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// -------------------
// Shaders inline
// -------------------
const fragmentShader = `
varying float vDistance;

void main() {
    vec3 color = vec3(0.58, 0.0, 0.83);
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);

    color = mix(color, vec3(0.5, 0.5, 1.0), vDistance * 0.5);
    color = mix(vec3(0.0), color, strength);
    gl_FragColor = vec4(color, strength);
}
`;

const vertexShader = `
uniform float uTime;
uniform float uRadius;

varying float vDistance;

mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

void main() {
    float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
    float size = distanceFactor * 10.0 + 10.0;
    vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);

    vDistance = distanceFactor;

    vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = size * (1.0 / -viewPosition.z);
}
`;

// -------------------
// Props et Component
// -------------------
interface CustomGeometryParticlesProps {
  count: number;
}

const CustomGeometryParticles: React.FC<CustomGeometryParticlesProps> = ({ count }) => {
  const points = useRef<THREE.Points>(null!);
  const radius = 2;

  // Génération des positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * radius;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count]);

  // Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uRadius: { value: radius },
    }),
    []
  );

  // Animation
  useFrame((state) => {
    if (points.current) {
      (points.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
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
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};

// -------------------
// Scene principale
// -------------------
const Galaxy: React.FC = () => {
  return (
    <div className="fixed -z-10 inset-0 w-screen h-screen pointer-events-none bg-transparent">
      <Canvas camera={{ position: [2, 2, 2] }}>
        <ambientLight intensity={0.5} />
        <CustomGeometryParticles count={4000} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Galaxy;
