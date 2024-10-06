'use client'

import { scripts } from '@/libs/scripts'
import Image from 'next/image'
import { useState } from 'react'
import * as Typewriter from 'react-effect-typewriter'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@nextui-org/react'

export default function Page() {
  const [scriptArray, setScriptArray] = useState(scripts.earth.conservetaion)
  const [order, setOrder] = useState(0)
  const [effect, setEffect] = useState('')
  const [image, setImage] = useState(scriptArray[0].image)
    const [choices, setChoices] = useState("undefined")
  const [isTyping, setTyping] = useState(true)

  console.log(order)

  return (
    <>
      {effect == 'darkness:open' ? (
        <AnimatePresence>
          <motion.div
            key={effect}
            onAnimationStart={() => {
              setEffect(null)
              if (scriptArray[order]?.image) setImage(scriptArray[order]?.image)
            }}
            initial={{
              opacity: 1,
              zIndex: -999,
            }}
            animate={{
              opacity: effect.length > 1 ? 0 : 1,
              zIndex: effect.length > 1 ? 500 : -999,
            }}
            exit={{
              opacity: 1,
              zIndex: -999,
            }}
            transition={{ ease: 'linear', delay: 0.2 }}
            className='w-screen h-screen fixed bg-black'
          ></motion.div>
        </AnimatePresence>
      ) : (
        ''
      )}

      <div
        onClick={() => {
          console.log(scripts.earth.players[`${scriptArray[order].talks}`])
          console.log(scripts.earth.players)
          console.log(scriptArray[order])

          if ((choices == 'undefined' || choices == 'selected') && !isTyping) setOrder(order + 1)
          if (scriptArray[order]?.effect) setEffect(scriptArray[order].effect + ':open')
        }}
        className='w-full h-full min-h-screen overflow-hidden'
      >
        <div className='relative w-[40rem] h-[22.5rem] mx-auto mt-32 mb-12 '>
          <Image
            alt=''
            key={image}
            src={image}
            width={1600}
            height={1100}
            className='brightness-90 w-full h-full object-cover -z-50'
          />
        </div>
        {scripts.earth.players[`${scriptArray[order].talks}`] ? (
          <Image
            alt=''
            key={scripts.earth.players[scriptArray[order].talks]}
            src={scripts.earth.players[scriptArray[order].talks].sprite}
            width={500}
            height={500}
            className='brightness-90 w-[20rem] right-[40%] -mt-64 h-[20rem] object-cover absolute <-20'
          />
        ) : (
          ''
        )}
        {choices == 'waiting' && (
          <motion.div transition={{
            ease: "linear",
            delay: 0.1
          }} initial={{ opacity: 1 }} animate={{
            opacity: choices == "waiting" ? 1 : 0
          }} className='w-full absolute backdrop-blur-lg h-[10rem] bg-white/40 px-6 py-5 z-50 mt-auto'>
            <h1 className='text-center mb-4 mt-4 text-black'>
              {scriptArray[order].choices.question}
            </h1>
            <div className='flex my-auto mx-auto w-min gap-x-6'>
              {
                scriptArray[order].choices.choices.map((choice, i) => {
                  return (
                    <div key={i}>
                      <Button className='rounded-none' onPress={() => {
                        if(choice.value == "die") alert("öldün")
                        else {
                      setChoices("selected")
                      setTyping(false)
                        }
                      }}>
                        {choice.text}
                      </Button>
                    </div>
                  )
                })
              }
            </div>
          </motion.div>
        )}
        <div className='w-[90%] relative mt-auto mx-auto px-6 py-5 bg-black'>
          <div className='w-full'>
            <Typewriter.Paragraph
            onStart={() => setTyping(true)}
              onEnd={() => {
                if (scriptArray[order]?.choices) setChoices('waiting')
                else setTyping(false)
              }}
              className='text-2xl'
              key={order}
            >
              {scriptArray[order].speeched}
            </Typewriter.Paragraph>
          </div>
        </div>
      </div>
    </>
  )
}
