import React from 'react'
import Magicbutton from './Magicbutton'
import { GiSupersonicArrow } from 'react-icons/gi'
import { socialMedia } from '@/data'

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 " id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-70"
        />
      </div>

      <div className="flex flex-col items-center ">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple-300">your</span> digital
          presence to next{' '}
        </h1>
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
          Copyright © 2025 Sumit Kaintura
        </p>
        <div className="flex items-center md:gap-3 gap-6 ">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-200 bg-opacity-75 bg-black-200 rounded-2xl border border-black-300"
            >
              <a href={profile.link}>
                <img
                  alt={profile.id}
                  src={profile.img}
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

export default Footer;