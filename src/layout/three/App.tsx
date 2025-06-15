import { styled, type CSSProperties } from 'styled-components';

import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField/ParticleField';
import { OrbitControls, Environment } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  DepthOfField
} from '@react-three/postprocessing';
const canvasTheme: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  backgroundColor: 'black'
} as const;

export default function App() {
  return (
    <Canvas style={canvasTheme} camera={{ position: [0, 0, 5], fov: 50 }}>
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
        minDistance={12}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ParticleField count={2000} />
      <Environment preset='night' />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
        <DepthOfField focusDistance={0.01} focalLength={0.5} bokehScale={0.5} />
      </EffectComposer>
    </Canvas>
  );
}
