import * as THREE from 'three'

export function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const points = []
  for (let index = 0; index < 100; index++) {
    const angle = (index / 100) * 2 * Math.PI
    const x = xRadius * Math.cos(angle)
    const z = zRadius * Math.sin(angle)
    points.push(new THREE.Vector3(x, 0, z))
  }

  points.push(points[0])

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach='material' color='#BFBBDA' linewidth={100} />
    </line>
  )
}
