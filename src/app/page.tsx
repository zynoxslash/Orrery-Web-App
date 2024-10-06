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
      </div>
    </main>
  )
}
