import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { ImprovedNoise } from "three-stdlib"
import * as THREE from 'three'

export const CustomMesh = ({ radius }) => {
  const meshRef = useRef()
  const noise = new ImprovedNoise()

  useEffect(() => {
    const mesh = meshRef.current
    const pos = mesh.geometry.attributes.position
    pos.usage = THREE.DynamicDrawUsage
  }, [])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    const time = clock.getElapsedTime()
    const pos = mesh.geometry.attributes.position
    const len = pos.count

    let v3 = new THREE.Vector3()
    let p = new THREE.Vector3()

    for (let i = 0; i < len; i += 1) {
      p.fromBufferAttribute(pos, i).normalize()
      v3.copy(p).multiplyScalar(3.0)
      let ns = noise.noise(v3.x + Math.cos(time), v3.y + Math.sin(time), v3.z + time)
      v3.copy(p)
        .setLength(radius)
        .addScaledVector(p, ns * 0.3)
      pos.setXYZ(i, v3.x, v3.y, v3.z)
    }
    pos.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} scale={[2.8, 2.8, 2.8]}>
      <icosahedronGeometry args={[radius, 6]} />
      <meshBasicMaterial color={'#e67e22'} side={THREE.BackSide} />
    </mesh>
  )
}

export function Sun() {
  const uniforms = {
    color1: { value: new THREE.Color(0xffffff) },
    color2: { value: new THREE.Color(0xffffff) },
    fresnelBias: { value: 0.2 },
    fresnelScale: { value: 1.5 },
    fresnelPower: { value: 4.0 },
  }

  const vs = `
    uniform float fresnelBias;
    uniform float fresnelScale;
    uniform float fresnelPower;

    varying float vReflectionFactor;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

      vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

      vec3 I = worldPosition.xyz - cameraPosition;

      vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );

      gl_Position = projectionMatrix * mvPosition;
    }
  `

  const fs = `
    uniform vec3 color1;
    uniform vec3 color2;

    varying float vReflectionFactor;

    void main() {
      float f = clamp( vReflectionFactor, 0.0, 1.0 );
      gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
    }
  `

  return (
    <mesh scale={[3, 3, 3]}>
      {/* Custom geometry that updates */}
      <CustomMesh radius={0.9} />

      {/* Fresnel effect shader material */}
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vs}
        fragmentShader={fs}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />

      {/* Optional base sphere */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial color={0xf66812} />
      </mesh>
    </mesh>
  )
}
