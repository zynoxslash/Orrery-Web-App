import { Button } from "@nextui-org/react";
import Link from "next/link";
import { TbArrowUpRight, TbPlayerPlayFilled } from "react-icons/tb";

export default function Page() {
  return (
    <main className='bg-zinc-950 w-full h-full min-h-screen'>
      <div className='p-16'>
        <div className='flex w-full'>
          <div className='h-full'>
            <h1 className='text-7xl text-white'>
              Interactive Orrery App for <br /> Students Designed with <br /> Simple Interface
            </h1>
            <div className='flex gap-x-6'>
              <Button as={Link} href="/playground" className='mt-5 rounded-full' variant='flat' color='secondary'>
                TRY IT ON UA PLAYGROUND
                <TbArrowUpRight />
              </Button>
              <Button as={Link} href="https://github.com/zynoxslash/Orrery-Web-App" className='mt-5 rounded-full' variant='ghost' color='secondary'>
                LEARN HOW WE DO IT
                <TbArrowUpRight />
              </Button>
            </div>
          </div>
        </div>
        <div className='flex absolute mt-[10rem] mb-32 rounded-2xl w-[90%] h-[13rem] bg-indigo-500 overflow-visible'>
          {[1, 2, 3, 4].map((m, a) => (
            <div key={a} className='hover:cursor-pointer relative group/card flex flex-col'>
              <div
                className='transition-all group-hover/card:scale-110 group-hover/card:rounded-xl w-[16rem] ml-12 
                        -mt-24 h-[9rem] bg-indigo-700 z-30 relative grid place-content-center text-white'
              > 
                <TbPlayerPlayFilled className="w-10 h-10"/>
              </div>
              <div className='mt-3 ml-12'>
                <h1 className='text-2xl font-semibold'>Information</h1>
                <p className='max-w-[16rem] italic text-indigo-900'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat nam maiores recusandae
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
