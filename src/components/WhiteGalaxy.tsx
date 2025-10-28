"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function randomGaussian() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

const fragmentShader = `
varying float vDistance;

void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    float halo = 1.0 - smoothstep(0.12, 0.68, dist);
    float core = 1.0 - smoothstep(0.04, 0.22, dist);

    vec3 deep = vec3(0.28, 0.1, 0.52);
    vec3 mid = vec3(0.56, 0.32, 0.92);
    vec3 glow = vec3(0.74, 0.46, 0.98);
    vec3 highlight = vec3(0.86, 0.58, 1.0);

    vec3 color = mix(deep, mid, halo);
    color = mix(color, glow, clamp(vDistance * 0.65 + 0.25, 0.0, 1.0));
    color = mix(color, highlight, core * 0.45);

    float alpha = clamp(pow(halo, 1.15) + core * 0.42, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
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

mat3 rotation3dZ(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0);
}

void main() {
    float distToCenter = distance(position, vec3(0.0));
    float normalized = clamp(distToCenter / uRadius, 0.0, 1.0);
    vec3 particlePosition = position;

    float swirl = mix(0.6, 0.15, normalized);
    particlePosition = rotation3dY(uTime * swirl) * particlePosition;
    particlePosition = rotation3dZ(uTime * 0.18 * (1.0 - normalized)) * particlePosition;
    particlePosition.y += sin(uTime * 1.4 + distToCenter * 5.0) * 0.04 * (1.0 - normalized);

    vDistance = 1.0 - normalized;

    vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    float baseSize = mix(14.0, 5.0, normalized);
    float flicker = sin(uTime * 1.8 + distToCenter * 6.5) * 1.4;
    float size = max(baseSize + flicker, 4.0);

    gl_PointSize = size * (1.0 / -viewPosition.z);
}
`;

interface CustomGeometryParticlesProps {
  count: number;
}

const CustomGeometryParticles: React.FC<CustomGeometryParticlesProps> = ({ count }) => {
  const points = useRef<THREE.Points>(null!);
  const radius = 3.2;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const group = Math.random();
      let x = 0;
      let y = 0;
      let z = 0;

      if (group < 0.55) {
        const radial = Math.pow(Math.random(), 0.65) * radius * 1.05;
        const angle = Math.random() * Math.PI * 2;
        const swirl = Math.pow(radial / (radius * 1.05), 1.2) * 1.4;
        x = Math.cos(angle + swirl) * radial;
        z = Math.sin(angle + swirl) * radial;
        y = randomGaussian() * 0.22 * (1 - radial / (radius * 1.05));
      } else if (group < 0.85) {
        const spread = radius * 0.45;
        x = randomGaussian() * spread * 0.55;
        y = randomGaussian() * spread * 0.45;
        z = randomGaussian() * spread * 0.55;
      } else {
        const radial = radius * 0.75 + Math.pow(Math.random(), 0.25) * radius * 0.7;
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * radial + THREE.MathUtils.randFloatSpread(0.25);
        z = Math.sin(angle) * radial + THREE.MathUtils.randFloatSpread(0.25);
        y = THREE.MathUtils.randFloatSpread(0.6) * (1 - radial / (radius * 1.45));
      }

      x += THREE.MathUtils.randFloatSpread(0.08);
      z += THREE.MathUtils.randFloatSpread(0.08);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uRadius: { value: radius },
    }),
    []
  );

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

const WhiteGalaxy: React.FC = () => {
  return (
    <div className="fixed -z-10 inset-0 w-screen h-screen pointer-events-none bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(216,196,255,0.45),_rgba(255,255,255,0)_72%)]" />
      <Canvas camera={{ position: [2, 2, 2] }}>
        <ambientLight intensity={0.5} />
        <CustomGeometryParticles count={5500} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default WhiteGalaxy;
