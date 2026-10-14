import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function ModernHome() {
  const group = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        (state.pointer.x * 0.16) + 0.12,
        2,
        delta,
      )
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04
    }
  })

  return (
    <group ref={group} position={[0, -0.45, 0]}>
      {/* Stylized architectural massing: replace with approved OLLIC models in Stage 3 */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.25, 0.9, 1.7]} />
        <meshStandardMaterial color="#e8e2d5" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.08, 0]} castShadow>
        <boxGeometry args={[1.72, 0.45, 1.4]} />
        <meshStandardMaterial color="#f5f1e8" roughness={0.65} />
      </mesh>
      <mesh position={[0, 1.38, 0]} rotation={[0, 0, -0.12]} castShadow>
        <boxGeometry args={[2.0, 0.12, 1.65]} />
        <meshStandardMaterial color="#173f36" roughness={0.38} metalness={0.12} />
      </mesh>
      {[-0.72, 0.72].map((x) => (
        <mesh key={x} position={[x, 0.42, 0.865]}>
          <boxGeometry args={[0.38, 0.42, 0.035]} />
          <meshStandardMaterial color="#244d4b" metalness={0.25} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0.28, 0.87]}>
        <boxGeometry args={[0.3, 0.56, 0.04]} />
        <meshStandardMaterial color="#a87948" roughness={0.55} />
      </mesh>
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.12, 2.7]} />
        <meshStandardMaterial color="#d3cbbd" roughness={0.92} />
      </mesh>
      {[-1.45, 1.45].map((x) => (
        <group key={x} position={[x, 0.08, -0.8]}>
          <mesh position={[0, 0.28, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.06, 0.55, 8]} />
            <meshStandardMaterial color="#826448" />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <icosahedronGeometry args={[0.35, 1]} />
            <meshStandardMaterial color="#426b50" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="scene3d" aria-label="Interactive 3D architectural preview">
      <Canvas camera={{ position: [3.2, 2.5, 4.7], fov: 36 }} dpr={[1, 1.5]} shadows>
        <color attach="background" args={['#102c27']} />
        <fog attach="fog" args={['#102c27', 7, 15]} />
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 6, 5]} intensity={3.2} castShadow />
        <Suspense fallback={null}>
          <Float speed={1.1} rotationIntensity={0.035} floatIntensity={0.13}>
            <ModernHome />
          </Float>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={3.7} maxDistance={7.5} minPolarAngle={0.75} maxPolarAngle={1.55} />
      </Canvas>
      <div className="scene-hint"><span className="hint-dot" /> Drag to explore</div>
    </div>
  )
}
