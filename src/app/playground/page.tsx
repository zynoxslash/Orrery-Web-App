'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import planetData from '@/libs/planetData'
import { Lights } from '@/components/lights'
import { CustomMesh, Sun } from '@/components/sun'
import { Planet } from '@/components/planet'
import { Astroid, Astroids } from '@/components/rocks'
import { textureLoader } from '@/libs/textureLoader'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Accordion,
  AccordionItem,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { Starfield } from '@/components/stars'
import { TbSquareRoundedLetterXFilled, TbArrowDownRight, TbArrowUpLeft, TbArrowUpRight } from 'react-icons/tb'
import { motion } from 'framer-motion'
import Image from 'next/image'
import CameraControls from 'camera-controls'
import Link from 'next/link'
import { orbs } from '@/libs/orbDatas'
import Markdown from 'react-markdown'
import '../global.css'
import { OrbitControls } from '@react-three/drei'

CameraControls.install({ THREE })

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    console.log(focus)
    zoom ? pos.set(focus.x, focus.y + 7, focus.z) : pos.set(0, 12, 5)
    zoom ? look.set(focus.x, focus.y + 7, focus.z) : look.set(0, 12, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true,
    )
    return controls.update(delta)
  })
}

export default function Page() {
  const main = useRef()
  const [target, setTarget] = useState({ key: 'sun', position: [0, 20, 25] })
  const [textures, setTextures] = useState({})
  const [infoModal, setInfoModal] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  const [detailedInfo, setDetailedInfo] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [cameraControl, setCameraControl] = useState("auto")

  useEffect(() => {
    const loadTextures = async () => {
      const loadedTextures = await Promise.all(
        planetData.map(
          (planet) =>
            new Promise((resolve) => {
              textureLoader.load(`/textures/${planet.key}.png`, resolve)
            }),
        ),
      )
      const texturesMap = planetData.reduce((acc, planet, index) => {
        acc[planet.key] = loadedTextures[index]
        return acc
      }, {})
      setTextures(texturesMap)
    }
    loadTextures()
  }, [])

  return (
    <main ref={main} className='w-full h-full min-h-screen'>
      <div className='fixed left-0 top-0 w-16 h-16 m-6 z-50'>
        <Button as={Link} href='/' isIconOnly variant='light' className='w-24 h-24'>
          <Image
            width={500}
            height={500}
            className='bg-transparent fill-neutral-200/60 w-24 w-24'
            alt='UA Logo'
            src='/logo.svg'
          />
        </Button>
      </div>
      <div className='flex flex-col fixed left-0 bottom-0 m-6 z-50'>
        <p className='text-gray-400 max-w-[7rem] mb-4'>Click on any planet and see details.</p>
        <Dropdown className='w-[30rem]'>
          <DropdownTrigger>
            <Button variant='faded' className='capitalize mb-6'>
              Select Camera Control
            </Button>
          </DropdownTrigger>
          <DropdownMenu color='secondary' variant='flat'>
            <DropdownItem
              onPress={() => {
                setCameraControl('auto')
              }}
            >
              Auto
            </DropdownItem>
            <DropdownItem
              onPress={() => {
                setCameraControl('manuel')
              }}
            >
              Manuel
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button target='_blank' as={Link} href='/games/guess' variant='faded'>
          PLAY GUESS GAME
          <TbArrowUpRight />
        </Button>
      </div>
      {
        <>
          {infoModal ? (
            <motion.div
              animate={{ opacity: infoModal ? 1 : 0 }}
              className='bg-zinc-950 shadow-2xl p-4 w-[30%] right-0 h-full min-h-screen fixed z-50'
            >
              <div className='w-full h-[50%] rounded-2xl bg-zinc-900 mb-4'>
                <Canvas>
                  {target.key == 'sun' ? (
                    <mesh>
                      <CustomMesh radius={0.9} />

                      <shaderMaterial
                        uniforms={{
                          color1: { value: new THREE.Color(0xffffff) },
                          color2: { value: new THREE.Color(0xffffff) },
                          fresnelBias: { value: 0.2 },
                          fresnelScale: { value: 1.5 },
                          fresnelPower: { value: 4.0 },
                        }}
                        vertexShader={`
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
  `}
                        fragmentShader={`
    uniform vec3 color1;
    uniform vec3 color2;

    varying float vReflectionFactor;

    void main() {
      float f = clamp( vReflectionFactor, 0.0, 1.0 );
      gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
    }
  `}
                        transparent={true}
                        blending={THREE.AdditiveBlending}
                      />
                      <mesh>
                        <sphereGeometry args={[2.5, 32, 32]} />
                        <meshStandardMaterial color={0xf66812} />
                      </mesh>
                    </mesh>
                  ) : target.key == 'astroids' ? (
                    <Astroids scale={[0.2, 0.2, 0.2]} />
                  ) : (
                    <mesh>
                      <sphereGeometry args={[2, 32, 32]} />
                      <meshStandardMaterial map={textures[target.key]} />
                      <mesh>
                        <sphereGeometry args={[1.2, 32, 32]} />
                        <meshStandardMaterial transparent={true} color={0x1e90ff} opacity={0.5} />
                      </mesh>
                    </mesh>
                  )}

                  <Lights />
                </Canvas>
              </div>
              <div>
                <h1 className='text-white text-3xl font-semibold'>{target.key}</h1>
                <div className='mt-3 overflow-y-scroll h-[14rem] scrollbar-none	'>
                  {Object.entries(orbs[`${target.key}`].configs).map((configedData, i) => {
                    return (
                      <>
                        <div key={i} className='bg-zinc-800 flex items-center justify-between w-[95%] h-min pr-3 mb-3'>
                          <div className='max-w-[60%] w-full px-3 py-2 bg-zinc-900'>
                            <h1 className='uppercase'>{configedData[0]}</h1>
                          </div>

                          <span>{configedData[1]?.value ? configedData[1]?.value : configedData[1]}</span>
                        </div>

                        {configedData[1]?.notes ? (
                          <Accordion
                            variant='splitted'
                            itemClasses={{
                              trigger: 'px-0',
                            }}
                            className='w-[95%] text-sm rounded-none px-0 mx-0 mb-3 -mt-3'
                          >
                            {configedData[1].notes.map((note, i) => (
                              <AccordionItem className='mx-0 rounded-none' key={i} title='Note'>
                                {note}
                              </AccordionItem>
                            ))}
                          </Accordion>
                        ) : (
                          ''
                        )}
                      </>
                    )
                  })}

                  <span>
                    Visit for unknown information:{' '}
                    <Link
                      target='_blank'
                      className='text-indigo-600 underline text-sm'
                      href='https://nssdc.gsfc.nasa.gov/planetary/factsheet/planetfact_notes.html'
                    >
                      Planetary Fact Sheet Notes
                    </Link>
                  </span>
                </div>
              </div>
              <div className='flex w-[30rem] absolute mb-6 bottom-0 h-min gap-x-4'>
                <Button
                  onPress={() => {
                    setDetailedInfo(orbs[target.key].description)
                    setInfoModal(false)
                    onOpen()
                  }}
                  variant='ghost'
                  color='secondary'
                >
                  Open in Detailed
                </Button>
                <Dropdown className='w-[30rem]'>
                  <DropdownTrigger>
                    <Button color='secondary' variant='flat' className='capitalize'>
                      Select Planet
                      <TbArrowDownRight />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu color='secondary' variant='flat'>
                    {planetData.map((planet, i) => (
                      <DropdownItem
                        onClick={() => {
                          setTarget({
                            key: planet.key,
                          })
                          setInfoModal(true)
                        }}
                        key={planet.id}
                        className='uppercase'
                      >
                        {planet.key}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button
                  onPress={() => {
                    if (target.key == 'sun') {
                      setInfoModal(false)
                      return
                    }
                    setInfoModal(false)
                    setZoom(false)
                    setTarget({
                      key: 'sun',
                    })
                    setFocus({})
                  }}
                  isIconOnly
                  color='danger'
                  variant='flat'
                  className='capitalize'
                >
                  <TbSquareRoundedLetterXFilled />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div className='absolute bottom-0 right-0 w-32 h-32 z-50 p-12'>
              <Button
                onPress={() => setInfoModal(true)}
                isIconOnly
                color='secondary'
                variant='flat'
                className='relative'
              >
                <TbArrowUpLeft />
              </Button>
            </motion.div>
          )}
        </>
      }
      <Canvas
        linear
        camera={{ position: [30, 100, 5] }}
        gl={{
          antialias: true,
        }}
        className='bg-black'
      >
        <Sun />
        {planetData.map((planet, index) => (
          <Planet
            mainRef={main.current}
            target={target}
            setTarget={setTarget}
            onClick={(e, mesh: THREE.Mesh) => {
              e.stopPropagation()
              setTarget({
                key: planet.key,
              })
              setInfoModal(true)
              setFocus(mesh.position)
              setZoom(true)
            }}
            planet={planet}
            key={planet.id}
          />
        ))}
        <Astroids
          mainRef={main.current}
          onClick={(e) => {
            setZoom(true)
            setTarget({ key: 'astroids' })
            setFocus(e.point)
            setInfoModal(true)
          }}
        />
        <Lights />
        <Starfield numStars={500} size={0.2} />
        {cameraControl == 'auto' ? <Controls focus={focus} zoom={zoom} /> : <OrbitControls position={[0, 12, 5]} />}
      </Canvas>

      <Modal placement='top' isDismissable={false} size='4xl' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Detailed Informations</ModalHeader>
              <ModalBody>
                <div className='flex h-[20rem]'>
                  <div className='w-[20rem] h-full rounded-2xl bg-zinc-950 mb-4'>
                    <Canvas>
                      {target.key == 'sun' ? (
                        <mesh scale={[0.7, 0.7, 0.7]}>
                          {/* Custom geometry that updates */}
                          <CustomMesh radius={0.9} />

                          {/* Fresnel effect shader material */}
                          <shaderMaterial
                            uniforms={{
                              color1: { value: new THREE.Color(0xffffff) },
                              color2: { value: new THREE.Color(0xffffff) },
                              fresnelBias: { value: 0.2 },
                              fresnelScale: { value: 1.5 },
                              fresnelPower: { value: 4.0 },
                            }}
                            vertexShader={`
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
  `}
                            fragmentShader={`
    uniform vec3 color1;
    uniform vec3 color2;

    varying float vReflectionFactor;

    void main() {
      float f = clamp( vReflectionFactor, 0.0, 1.0 );
      gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
    }
  `}
                            transparent={true}
                            blending={THREE.AdditiveBlending}
                          />

                          {/* Optional base sphere */}
                          <mesh>
                            <sphereGeometry args={[2.5, 32, 32]} />
                            <meshStandardMaterial color={0xf66812} />
                          </mesh>
                        </mesh>
                      ) : target.key == 'astroids' ? (
                        <Astroids scale={[2, 2, 2]} />
                      ) : (
                        <mesh>
                          <sphereGeometry args={[2, 32, 32]} />
                          <meshStandardMaterial map={textures[target.key]} />
                          <mesh>
                            <sphereGeometry args={[1.2, 32, 32]} />
                            <meshStandardMaterial transparent={true} color={0x1e90ff} opacity={0.5} />
                          </mesh>
                        </mesh>
                      )}

                      <Lights />
                    </Canvas>
                  </div>
                  <div className='w-full px-8'>
                    <h1 className='uppercase text-5xl'>THE {target.key} </h1>
                    <div className='bg-zinc-950 px-6 py-5 mt-6 overflow-y-scroll h-[80%] scrollbar-none	'>
                      {Object.entries(orbs[`${target.key as 'jupiter'}`].configs).map((configedData, i) => {
                        return (
                          <>
                            <div
                              key={i}
                              className='bg-zinc-800 flex items-center justify-between w-[95%] h-min pr-3 mb-3'
                            >
                              <div className='max-w-[60%] w-full px-3 py-2 bg-zinc-900'>
                                <h1 className='uppercase'>{configedData[0]}</h1>
                              </div>

                              <span>{configedData[1]?.value ? configedData[1]?.value : configedData[1]}</span>
                            </div>

                            {configedData[1]?.notes ? (
                              <Accordion
                                variant='splitted'
                                itemClasses={{
                                  trigger: 'px-0',
                                }}
                                className='w-[95%] text-sm rounded-none px-0 mx-0 mb-3 -mt-3'
                              >
                                {configedData[1].notes.map((note, i) => (
                                  <AccordionItem className='mx-0 rounded-none' key={i} title='Note'>
                                    {note}
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            ) : (
                              ''
                            )}
                          </>
                        )
                      })}

                      <span>
                        Visit for unknown information:{' '}
                        <Link
                          target='_blank'
                          className='text-indigo-600 underline text-sm'
                          href='https://nssdc.gsfc.nasa.gov/planetary/factsheet/planetfact_notes.html'
                        >
                          Planetary Fact Sheet Notes
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
                <article className='prose prose-invert prose-a:text-indigo-600 prose-a:underline'>
                  <Markdown className='mt-6'>{detailedInfo}</Markdown>
                </article>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='secondary'
                  onPress={() => {
                    setInfoModal(true)
                    onClose()
                  }}
                >
                  OKAY
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  )
}
