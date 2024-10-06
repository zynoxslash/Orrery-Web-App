import * as THREE from 'three'
import { useEffect, useRef } from 'react'

export function Starfield({ numStars = 1500, size = 0.2 }) {
  const pointsRef = useRef()

  useEffect(() => {
    const verts = []
    const colors = []

    function randomSpherePoint() {
      const radius = Math.random() * 300 + 75
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      let x = radius * Math.sin(phi) * Math.cos(theta)
      let y = radius * Math.sin(phi) * Math.sin(theta)
      let z = radius * Math.cos(phi)
      return new THREE.Vector3(x, y, z)
    }

    for (let i = 0; i < numStars; i += 1) {
      const pos = randomSpherePoint()
      const col = new THREE.Color().setHSL(0.6, 0.2, Math.random())
      verts.push(pos.x, pos.y, pos.z)
      colors.push(col.r, col.g, col.b)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('/star.png')

    pointsRef.current.geometry = geo
    pointsRef.current.material.size = size
    pointsRef.current.material.map = texture
    pointsRef.current.material.needsUpdate = true
  }, [numStars, size])

  return (
    <points ref={pointsRef}>
      <pointsMaterial vertexColors size={size} />
    </points>
  )
}
