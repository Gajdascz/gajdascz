import {
  DIRECTION,
  ORBIT,
  PARTICLE,
  SPARKLE,
  COLOR_POOL,
  type Particle
} from './config';
import * as THREE from 'three';
export const randomDirection = () =>
  Math.floor(Math.random() * DIRECTION.length);
export const random3DVector = (min: number, factor: number) =>
  new THREE.Vector3(
    (Math.random() - min) * factor,
    (Math.random() - min) * factor,
    (Math.random() - min) * factor
  );
export const randomOrbit = () => ({
  active: false,
  speed: ORBIT.speed.min + Math.random() * (ORBIT.speed.max - ORBIT.speed.min),
  phase: Math.random() * ORBIT.phaseRange,
  dir: randomDirection()
});
export const getParticles = (count: number) =>
  Array.from({ length: count }, () => ({
    position: random3DVector(PARTICLE.position.base, PARTICLE.position.range),
    velocity: random3DVector(PARTICLE.velocity.base, PARTICLE.velocity.range),
    sparkle: { intensity: 0, speed: 0 },
    orbit: randomOrbit()
  }));
export const getColors = (count: number) => {
  const colorArray = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const color = new THREE.Color(COLOR_POOL[i % COLOR_POOL.length]);
    color.toArray(colorArray, i * 3);
  }
  return colorArray;
};
export const getSparkle = () => ({
  intensity: SPARKLE.intensity.base + Math.random() * SPARKLE.intensity.range,
  speed: SPARKLE.speed.base + Math.random() * SPARKLE.speed.range
});
export const updateSparkle = (p: Particle, baseScale = PARTICLE.scale) => {
  // Trigger randomly
  if (p.sparkle.intensity <= 0 && Math.random() < SPARKLE.triggerProbability) {
    const { intensity, speed } = getSparkle();
    p.sparkle.intensity = intensity;
    p.sparkle.speed = speed;
  }
  // Decay
  if (p.sparkle.intensity > 0) {
    p.sparkle.intensity -= p.sparkle.speed;
    if (p.sparkle.intensity <= 0) p.sparkle.intensity = 0;
  }
  return baseScale * (1 + p.sparkle.intensity * SPARKLE.scaleFactor);
};
