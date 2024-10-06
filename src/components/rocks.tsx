import { useFrame, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

import * as THREE from 'three'
import { useEffect, useRef } from 'react'

export function Astroid({ i, geometry, texture, onClick }) {
    const meshRef = useRef()
    const angle = (i / 65) * Math.PI * 2 + (Math.random() - 0.5) * 0.2
    const radius = 60 + (Math.random() - 0.5) * 5

    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    const rotationSpeed = 0.02 + Math.random() * 0.03 
    const movementAmplitude = 2 + Math.random() 
    const internalRotationSpeed = 0.01 + Math.random() * 0.02 

    useFrame(({ clock }) => {
      const t = clock.getElapsedTime() * 0.1 
      const offsetX = movementAmplitude * Math.sin(t)
      const offsetZ = movementAmplitude * Math.cos(t)

      meshRef.current.position.x = x + offsetX
      meshRef.current.position.z = z + offsetZ
      meshRef.current.rotation.y += rotationSpeed 

      meshRef.current.rotation.x += internalRotationSpeed 
      meshRef.current.rotation.z += internalRotationSpeed 
    })

  return (
    <instancedMesh
      scale={[1.5, 1.5, 1.5]}
      position={[x, 0, z]}
      key={i}
      ref={meshRef}
      rotation={[3, 0, 0]}
      args={[
        geometry,
        new THREE.MeshStandardMaterial({
          map: texture,
          transparent: false,
          opacity: 1,
        }),
        35,
      ]}
    />
  )
}

export function Astroids({ onClick, mainRef, scale = [1, 1, 1] }) {
  const obj = useLoader(OBJLoader, '/objs/Rock1.obj')
  const texture = useLoader(THREE.TextureLoader, '/textures/rock.png')
  const groupRef = useRef()

  let geometry

  obj.traverse((child) => {
    if (child.isMesh) {
      geometry = child.geometry
    }
  })

  useFrame(({ clock }) => {
    const rotationSpeed = 0.001
    groupRef.current.rotation.y += rotationSpeed 
  })

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerOver={(e) => {
        if (mainRef) mainRef.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        if (mainRef) mainRef.style.cursor = 'auto'
      }}
      onClick={(e) => onClick(e)}
    >
      {Array.from({ length: 65 }, (_, i) => i + 1).map((a, i) => {
        return <Astroid i={i} geometry={geometry} texture={texture} key={i} />
      })}
    </group>
  )
}
