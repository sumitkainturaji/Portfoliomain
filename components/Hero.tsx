import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { cn } from '@/lib/utils'
import { TextGenerateEffect } from './ui/TextgenrationEffect'
import Magicbutton from './Magicbutton'
import { GiSupersonicArrow } from 'react-icons/gi'

const Hero = () => {
  return (
    <div className="pb-20 pt-36 ">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[5-vw]" fill="blue" />
      </div>

      {/* Background  */}
      <div className=" flex  w-full items-center justify-center bg-white dark:bg-black  h-screen absolute top-0 left-0">
        <div
          className={cn(
            'absolute inset-0',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
            'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      </div>

      <div className="flex justify-center relative my-20">
        <div className="max-w-[90vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase text">
            Crafting Interactive Web Experiences
          </h2>

          <TextGenerateEffect
            className="text-center text-[50px] md:text-5xl lg:text-6xl"
            words="Learn new things with docs "
          />
          <p className="text-cente md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi,👋 I&apos;m Sumit , a Full Stack Devloper
          </p>
          <a href="#about">
            <Magicbutton
              title=" Check My Work "
              icon={<GiSupersonicArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
