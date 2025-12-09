import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function Box3D({ dimensions }) {
  const meshRef = useRef()
  const { length, width, height } = dimensions

  // Convert mm to Three.js units (scale down)
  const scale = 0.01
  const l = length * scale
  const w = width * scale
  const h = height * scale

  // Auto-rotate
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={[0, h / 2, 0]}>
      <boxGeometry args={[w, h, l]} />
      <meshStandardMaterial 
        color="#f5deb3" 
        roughness={0.8}
        metalness={0.2}
      />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(w, h, l)]} />
        <lineBasicMaterial attach="material" color="#333" linewidth={2} />
      </lineSegments>
    </mesh>
  )
}

export default function Box3DPreview({ dimensions, boxStyle }) {
  if (!dimensions) {
    return (
      <div className="preview-3d-empty">
        <p>Generate a box to see 3D preview</p>
      </div>
    )
  }

  return (
    <div className="preview-3d-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls enablePan={false} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />

        <Box3D dimensions={dimensions} />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      </Canvas>
    </div>
  )
}