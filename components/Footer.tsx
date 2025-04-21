import React from 'react'
import Magicbutton from './Magicbutton'
import { GiSupersonicArrow } from 'react-icons/gi'
import { socialMedia } from '@/data'

const Footer = () => {
  return (
    <footer className="w-full  pb-10 mb-[100px] md:mb-5 " id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-80"
        />
      </div>

      <div className="flex flex-col items-center ">
        <h1 className="heading lg:max-w-[70vw]">
          Ready to <span className="text-[#8333ea]">transform</span> your
          digital presence?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center text-base md:text-lg">
          Let’s build something impactful together — drop a message and let’s
          turn your vision into reality.
        </p>
        <a href="mailto:sumitkaintura73@gmail.com">
          <Magicbutton
            title="Get in touch"
            icon={<GiSupersonicArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          © 2025 Sumit Singh Kaintura — All rights reserved.
        </p>
        <div className="flex items-center md:gap-3 gap-6 ">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-200 bg-opacity-75 bg-black-200 rounded-2xl border border-black-300"
            >
              <a href={profile.link}>
                <img
                  src={profile.img}
                  alt={profile.id}
                  width={20}
                  height={20}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
