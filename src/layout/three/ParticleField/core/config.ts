import type * as THREE from 'three';

export interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  sparkle: { intensity: number; speed: number };
  orbit: { active: boolean; phase: number; speed: number; dir: number };
}

export const AXES = ['x', 'y', 'z'] as const;
export const DIRECTION = [-1, 1] as const;
export const PARTICLE = {
  scale: 0.005,
  count: 1000,
  position: { base: 0.5, range: 10 },
  velocity: { base: 0.5, range: 0.001 },
  style: { opacity: 0.75, geometry: [1, 3, 3] as const }
} as const;

export const SPARKLE = {
  triggerProbability: 0.002,
  intensity: { base: 1, range: 0.5 },
  speed: { base: 0.005, range: 0.01 },
  scaleFactor: 2
} as const;
export const COLOR_POOL = ['#9acbf7', '#b18aff', '#fff888'] as const;

export const ORBIT = {
  speed: { min: 0.005, max: 0.02 },
  phaseRange: Math.PI * 2,
  strengthFactor: 0.005,
  ptr: {
    attractionRadius: 1,
    breakOffDistance: 2,
    breakOffSpeed: 0.05,
    attractionStrength: 0.0005,
    orbitStrength: 0.005
  }
} as const;

export const SUPER_NOVA = {
  nebulusColors: [
    ...COLOR_POOL,
    '#ff6f61',
    '#6b5b95',
    '#f7cac9',
    '#88b04b',
    '#92a8d1',
    '#955251',
    '#b565a7',
    '#e0b0ff'
  ],
  trigger: {
    msHoldTime: 7500, // How long to hold before supernova
    outwardForce: 0.01, // Initial explosion force
    attractionStrengthFactor: 0.01, // Multiplier for attraction during ramp
    orbitSpeedFactor: 0.01 // Multiplier for orbit speed during ramp
  },
  buildup: {
    minAttractionRadius: ORBIT.ptr.attractionRadius, // Starting attraction radius
    maxAttractionRadius: 8, // Max radius as energy builds
    minOrbitStrength: ORBIT.ptr.orbitStrength, // Starting orbit strength
    maxOrbitStrength: 1, // Max orbit strength before explosion
    minSparkle: SPARKLE.intensity.base, // Starting sparkle intensity
    maxSparkle: 8, // Max sparkle intensity at peak
    minBloom: 0.5, // Starting bloom strength
    maxBloom: 3, // Max bloom strength at peak
    minBrightness: 1, // Starting brightness
    maxBrightness: 3, // Max brightness at peak
    colorRamp: true // Whether to ramp through nebula colors
  },
  supernova: {
    particleOutwardVelocity: 0.2, // Velocity for explosion
    sparkleAfter: 10, // Sparkle intensity after explosion
    bloomAfter: 5, // Bloom after explosion
    brightnessAfter: 5, // Brightness after explosion
    duration: 3000 // How long the supernova effect lasts
  }
};
