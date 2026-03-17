import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

function GiftBox() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1.5}>
      {/* Box */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* Ribbon Vertical */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.05, 2.05, 0.4]} />
        <meshStandardMaterial color="#FFE66D" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Ribbon Horizontal */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 2.05, 2.05]} />
        <meshStandardMaterial color="#FFE66D" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Bow Left */}
      <mesh castShadow receiveShadow position={[-0.4, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#FFE66D" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Bow Right */}
      <mesh castShadow receiveShadow position={[0.4, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#FFE66D" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Bow Center */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#FFE66D" roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 sm:opacity-100 pointer-events-none sm:pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <GiftBox />
          </Float>
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
