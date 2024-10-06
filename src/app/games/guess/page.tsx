'use client'

import {
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { orbs } from '@/libs/orbDatas'
import { usePathname, useRouter } from 'next/navigation'

export default function Page() {

  const navigator = useRouter()
  const pathname = usePathname()

  const [onGame, setOnGame] = useState(false)
  const [planet, setPlanet] = useState({ name:"", datas: null })
  const [showedInfos, setShowedInfos] = useState([])
  const [keys, setKeys] = useState([
    'Mass (10²⁴ kg)',
    'Diameter(km)',
    'Density(kg/m3)',
    'Gravity(m/s2)',
    'Escape Velocity(km/s)',
    'Rotation Period(hours)',
    'Length of Day(hours)',
    'Distance from Sun (10⁶ km)',
    'Perihelion (10⁶ km)',
    'Aphelion (10⁶ km)',
    'Orbital Period(days)',
    'Orbital Velocity(km/s)',
    'Orbital Inclination(degrees)',
    'Orbital Eccentricity',
    'Obliquity to Orbit(degrees)',
    'Mean Temperature(C)',
    'Surface Pressure(bars)',
    'Number of Moons',
    'Ring System?',
    'Global Magnetic Field?',
  ])
  const [point, setPoint] = useState(9500)
  const [guess, setGuess] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [gameStatus, setStatus] = useState("")

  useEffect(() => {
    const allOrbs = Object.keys(orbs).filter((e) => !['astroids', 'sun'].includes(e))
    const random = Math.floor(Math.random() * 11)
    setPlanet({
      name: allOrbs[random],
      datas: orbs[allOrbs[random]],
    })
    setShowedInfos([orbs[allOrbs[random]]?.configs[keys[0]]])
  }, [onGame])

  if(planet.datas == undefined) return

  return (
    <div className='w-full h-full min-h-screen'>
      <AnimatePresence>
        <motion.div
          key={onGame}
          animate={{
            opacity: onGame ? 0 : 1,
            visibility: onGame ? 'hidden' : 'visible',
          }}
          className='pt-48 p-20 text-center mt-auto'
        >
          <Image
            width={500}
            height={500}
            className='bg-transparent fill-neutral-200/60 w-44 w-44 mx-auto'
            alt='UA Logo'
            src='/logo.svg'
          />
          <h1 className='text-6xl text-white font-semibold'>Guess IT</h1>
          <p className='italic text-md text-gray-400 mt-4'>
            See the feature of the planets and try to guess the planet.
          </p>
          <Button
            onPress={() => {
              setOnGame(true)
            }}
            variant='flat'
            color='secondary'
            className='mt-6'
          >
            <TbPlayerPlayFilled />
            LET'S PLAY
          </Button>
        </motion.div>

        <motion.div
          key='game'
          transition={{
            delay: 1,
            ease: 'linear',
          }}
          className='fixed top-[10%] right-[15%] text-center'
          initial={{ visibility: 'hidden', opacity: 1 }}
          animate={{ visibility: onGame ? 'visible' : 'hidden', opacity: onGame ? 1 : 0 }}
        >
          <div className='w-full flex justify-between'>
            <div>
              <div className='mx-auto mb-6 bg-zinc-900 rounded-full w-[20rem] h-[20rem] grid place-content-center'>
                <h1 className='text-8xl font-semibold'> ?</h1>
              </div>
              <h1 className='text-4xl font-semibold'>What Is This Planet?</h1>
              <Input onValueChange={setGuess} variant='faded' className='mt-6 w-[20rem] mx-auto' />
              <Button
                onPress={() => {
                  if (guess.toLowerCase() == planet.name.toLowerCase()) {
                    setStatus('won')
                  } else setStatus('lost')
                  onOpen()
                }}
                variant='faded'
                className='w-[20rem] mt-6'
              >
                GUESS IT
              </Button>
              <p className='mt-3 text-gray-300'>
                YOU EARN <span className='text-indigo-500'>{point} POINTS.</span>
              </p>
            </div>
            <div key={showedInfos} className='ml-12 w-[45rem] overflow-y-scroll scrollbar-none h-[40rem]'>
              {planet?.datas != null &&
                showedInfos.length > 0 &&
                showedInfos.map((key, a) => {
                  return (
                    <div key={a} className='bg-zinc-800 flex items-center justify-between w-full h-min pr-3 mb-3'>
                      <div className='max-w-[60%] text-left w-full px-3 py-2 bg-zinc-900'>
                        <h1 className='uppercase'>{keys[a]}</h1>
                      </div>

                      <span>{showedInfos[a]}</span>
                    </div>
                  )
                })}
              <Button
                onPress={() => {
                  if (planet?.datas?.configs && keys.length != showedInfos.length) {
                    setPoint(point - 500)
                    setShowedInfos([...showedInfos, planet.datas.configs[keys[showedInfos.length]]])
                  }
                }}
                className='mt-4'
                variant='faded'
              >
                I WANT A TIP (-500 POINT)
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Modal
        placement='center'
        isDismissable={false}
        size='4xl'
        isOpen={isOpen}
        onClose={() => {
          navigator.push(`/games/guess?id=${crypto.randomUUID()}`)
          onClose()
        }}
      >
        <ModalContent className='p-12'>
          {(onClose) => (
            <>
              <div className='w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden'>
                <Image src={`/textures/${planet.name}.png`} width={500} height={500} alt='' className='w-full h-full' />
              </div>
              <h1 className='text-lg text-center w-full text-gray-400'>
                YOU {gameStatus.toUpperCase()}. THIS PLANET IS {planet.name.toUpperCase()}
              </h1>
              {gameStatus == 'won' && (
                <>
                  <h1 className='text-indigo-600 text-6xl mt-4 text-center font-semibold'>{point}</h1>
                  <p className='text-gray-400 italic text-center mt-2'>YOU EARNED</p>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
