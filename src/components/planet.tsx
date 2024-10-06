import { useFrame, useLoader } from '@react-three/fiber'
import { Ecliptic } from './ecliptic'
import { useRef, useState } from 'react'
import { textureLoader } from '@/libs/textureLoader'
import * as THREE from 'three'


const Rings = ({ color }) => {
  return (
    <mesh scale={[3, 3, 3]} rotation={[200, 0, 0]} position={[0, 0, 0]}>
      {' '}
      <torusGeometry args={[2, 0.1, 30, 64, 12]} />
      <meshStandardMaterial
        color={color}
        opacity={0.6} // Adjust opacity for more transparency
        transparent={true} // Enable transparency
        side={THREE.DoubleSide} // Render both sides of the torus
        roughness={0.5} // Control the surface roughness
        metalness={0.1} // Add a little metallic sheen
        emissive={color} // Add an emissive color to simulate glow
        emissiveIntensity={0.1} // Control the intensity of the glow
      />{' '}
    </mesh>
  )
}

export function Planet({
  planet: { key, textures, xRadius, zRadius, size, color, speed, rotationSpeed, isOpposite },
  onClick,
  target,
  setTarget, mainRef
}) {
  const planetRef = useRef()
  const texture = useLoader(THREE.TextureLoader, textures)

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * speed) / 2
    const x = xRadius * Math.sin(t)
    const z = zRadius * Math.cos(t)
    planetRef.current.position.x = x
    planetRef.current.position.z = z
    planetRef.current.rotation.y += (isOpposite ? -rotationSpeed : rotationSpeed)
  })

  return (
    <>
      <mesh
      userData={{
        id: key
      }}
        onPointerOver={(e) => {
          if (mainRef) mainRef.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          if (mainRef) mainRef.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick(e, planetRef.current)
        }}
        ref={planetRef}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
        <mesh>
          <sphereGeometry args={[size * 1.2, 32, 32]} /> 
          <meshStandardMaterial
            transparent={true}
            opacity={0.5}
            color={color} 
          />
        </mesh>
        {["saturn", "uranus", "neptune"].includes(key) && (<Rings color={color} />)}
      </mesh>

      <Ecliptic xRadius={xRadius} zRadius={zRadius} />
    </>
  )
}
