import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import {
  Bloom,
  EffectComposer,
  DepthOfField
} from '@react-three/postprocessing';
import * as THREE from 'three';

import {
  AXES,
  COLOR_POOL,
  ORBIT,
  PARTICLE,
  type Particle,
  SPARKLE,
  DIRECTION,
  SUPER_NOVA
} from './core/config';
import {
  getParticles,
  getColors,
  getSparkle,
  randomDirection,
  updateSparkle
} from './core/utils';
import { Html } from '@react-three/drei';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function ParticleField({
  count = PARTICLE.count,
  upperBound = 10
}: {
  count?: number;
  upperBound?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => getParticles(count), [count]);
  const [colors, setColors] = useState(() => getColors(count));
  const { pointer, camera, gl } = useThree();

  // Supernova state
  const [readyForHold, setReadyForHold] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);
  const [ramping, setRamping] = useState(false);
  const [superNova, setSuperNova] = useState(false);
  const [whiteFlash, setWhiteFlash] = useState(false);
  const rampStart = useRef<number | null>(null); ,


  
  const [rampPointer, setRampPointer] = useState<THREE.Vector3 | null>(null);

  // --- Pointer event logic ---
  useEffect(() => {
    const canvas = gl.domElement;

    const handleDblClick = (event: MouseEvent) => {
      setReadyForHold(true);
      // Get pointer position in world space at z=0
      const ndc = new THREE.Vector2(
        (event.offsetX / canvas.width) * 2 - 1,
        -(event.offsetY / canvas.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);
      const point = new THREE.Vector3();
      raycaster.ray.intersectPlane(
        new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
        point
      );
      setRampPointer(point.clone());
      // Only allow hold for a short window after dblclick
      setTimeout(() => setReadyForHold(false), 500);
    };

    const handleDown = () => {
      if (readyForHold && !superNova) {
        setPointerDown(true);
        setRamping(true);
        rampStart.current = performance.now();
      }
    };

    const handleUp = () => {
      setPointerDown(false);
      setRamping(false);
      rampStart.current = null;
    };

    canvas.addEventListener('dblclick', handleDblClick);
    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mouseup', handleUp);

    return () => {
      canvas.removeEventListener('dblclick', handleDblClick);
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mouseup', handleUp);
    };
  }, [gl, camera, readyForHold, superNova]);

  // --- Animation logic ---
  useFrame(() => {
    let rampProgress = 0;
    if (ramping && pointerDown && rampStart.current !== null) {
      rampProgress = Math.min(
        1,
        (performance.now() - rampStart.current) / SUPER_NOVA.trigger.msHoldTime
      );
      // Ramp up colors, bloom, etc.
      if (rampProgress === 1 && !superNova) {
        setWhiteFlash(true);
        setRamping(false);
        setTimeout(() => {
          setWhiteFlash(false);
          setSuperNova(true);
        }, 400); // White flash duration
      }
    } else {
      rampProgress = 0;
    }

    // Update particles
    particles.forEach((p, i) => {
      // --- Supernova state ---
      if (superNova) {
        // Outward explosion and swirling
        const outward = p.position
          .clone()
          .normalize()
          .multiplyScalar(SUPER_NOVA.supernova.particleOutwardVelocity);
        p.velocity.add(outward);
        // Optionally, add swirling
        const swirl = new THREE.Vector3(-p.position.y, p.position.x, 0)
          .normalize()
          .multiplyScalar(0.002);
        p.velocity.add(swirl);
        p.position.add(p.velocity);

        // Color cycling (nebula)
        const colorIdx = Math.floor(
          Math.random() * SUPER_NOVA.nebulusColors.length
        );
        const color = new THREE.Color(SUPER_NOVA.nebulusColors[colorIdx]);
        color.toArray(colors, i * 3);
      }
      // --- Ramp-up state ---
      else if (ramping && rampPointer) {
        // Interpolate attraction/strength
        const attractionRadius = lerp(
          SUPER_NOVA.buildup.minAttractionRadius,
          SUPER_NOVA.buildup.maxAttractionRadius,
          rampProgress
        );
        const orbitStrength = lerp(
          SUPER_NOVA.buildup.minOrbitStrength,
          SUPER_NOVA.buildup.maxOrbitStrength,
          rampProgress
        );
        // Color ramp
        const colorIdx = Math.floor(
          rampProgress * (SUPER_NOVA.nebulusColors.length - 1)
        );
        const color = new THREE.Color(SUPER_NOVA.nebulusColors[colorIdx]);
        color.toArray(colors, i * 3);

        // Attraction to rampPointer
        const toPointer = rampPointer.clone().sub(p.position);
        if (toPointer.length() < attractionRadius) {
          p.orbit.active = true;
        }
        if (p.orbit.active) {
          const orbitDirection = new THREE.Vector3(
            -toPointer.y,
            toPointer.x,
            0
          ).normalize();
          const attraction = toPointer.multiplyScalar(orbitStrength);
          const orbit = orbitDirection.multiplyScalar(orbitStrength);
          p.position.add(attraction).add(orbit);
        }
      }
      // --- Normal state ---
      else {
        p.position.add(p.velocity);
      }

      // Out of bounds check
      AXES.forEach((axis) => {
        if (Math.abs(p.position[axis]) > upperBound)
          p.velocity[axis] *= DIRECTION[0];
      });

      // Sparkle
      const sparkleScale = updateSparkle(p);

      // Set dummy position and scale
      dummy.position.copy(p.position);
      dummy.scale.set(sparkleScale, sparkleScale, sparkleScale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    // Update color buffer
    meshRef.current!.geometry.setAttribute(
      'color',
      new THREE.InstancedBufferAttribute(colors, 3)
    );
    meshRef.current!.instanceMatrix.needsUpdate = true;
  });

  // --- White flash overlay ---
  return (
    <>
      <EffectComposer>
        <Bloom
          intensity={
            superNova ? SUPER_NOVA.supernova.bloomAfter
            : ramping ?
              lerp(
                SUPER_NOVA.buildup.minBloom,
                SUPER_NOVA.buildup.maxBloom,
                (performance.now() - (rampStart.current ?? 0))
                  / SUPER_NOVA.trigger.msHoldTime
              )
            : SUPER_NOVA.buildup.minBloom
          }
        />
        <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
      </EffectComposer>
      <Html>
        {whiteFlash && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'white',
              opacity: 1,
              pointerEvents: 'none',
              zIndex: 9999,
              animation: 'fadeOut 0.4s forwards'
            }}
          />
        )}
        <style>
          {`
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        `}
        </style>
      </Html>

      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={PARTICLE.style.geometry}>
          <instancedBufferAttribute
            attach='attributes-color'
            args={[colors, 3]}
          />
        </sphereGeometry>
        <meshStandardMaterial
          vertexColors
          transparent
          opacity={PARTICLE.style.opacity}
        />
      </instancedMesh>
    </>
  );
}
