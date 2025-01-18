'use client'

import React from 'react'
import useHeroHook from '../hooks/useHeroHook'
import Image from 'next/image'
import { useEffect } from 'react'
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import Link from 'next/link'

interface IHeroProps {
  isPending: boolean
}

const Hero = ({ isPending }: IHeroProps) => {

  const { 
    heroSlider,
    currSlide,
    next,
    prev 
  } = useHeroHook()  
  
  useEffect(() => {
    const intervalId = setInterval(next,5000)

    return () => clearInterval(intervalId)
  }, [currSlide, next])

  if(isPending) {
    return (
      <section className='mx-auto w-full h-[190px] md:h-[250px] lg:h-[300px] overflow-hidden relative skeleton rounded-none'></section>
    )
  }


  return (
        <section id='hero-section-carousel' className='mx-auto w-full h-[190px] md:h-[250px] lg:h-[300px] overflow-hidden relative'>
          <div className='flex transition-transform ease-in-out duration-1000 min-w-max' style={{transform: `translateX(-${currSlide/heroSlider.length * 100}%)`}}>
              {
                heroSlider.map((item, index) => {
                  return(
                      <Link key={index} href={`/explore/search?type=${item.name.toLowerCase()}`} className='hover:cursor-pointer w-full flex justify-start z-20'>
                    <section key={index} id={`carousel-${index + 1}`} className="relative rounded-none h-[190px] md:h-[250px] lg:h-[300px] w-screen my-bg-lin-1">
                      <figure className='absolute bottom-0 h-[190px] md:h-[250px] lg:h-[300px] w-screen -z-10'>
                        <Image
                          loading='lazy'
                          src={item.img}
                          width={1500}
                          height={1500}
                          alt={`pict-${index + 1}`} 
                          className="origin-bottom object-cover w-full h-full"
                        />
                      </figure>
                      <div className='bg-black opacity-30 absolute top-0 left-0 w-full h-full'></div>
                      <article className='bg-black bg-opacity-25 h-full z-10 pr-12 p-4 md:p-8 lg:p-12 2xl:p-16 flex flex-col justify-center items-center md:gap-3 lg:gap-5'>
                        <h1 className='lg:text-4xl md:text-3xl text-xl font-semibold text-left text-white drop-shadow-sm w-full transition duration-75'>{item.name}</h1>
                        <p className='text-sm md:text-lg lg:text-xl font-light text-white text-left w-full drop-shadow-sm'>{item.description}</p>
                      </article>
                          {/* <div onClick={prev} className='z-30 hover:cursor-pointer absolute top-0 left-0 bg-transparent transition duration-150 hover:bg-black active:bg-opacity-50 hover:bg-opacity-25 h-full flex items-center px-3'>
                            <IoMdArrowDropleft size={28} className='text-white'/>
                          </div>
                          <div onClick={next} className='z-30 hover:cursor-pointer absolute top-0 right-20 bg-transparent transition duration-150 hover:bg-black active:bg-opacity-50 hover:bg-opacity-25 h-full flex items-center px-3'>
                            <IoMdArrowDropright size={28} className='text-white'/>
                          </div> */}
                    </section>
                    </Link>
                  )
                })
              }
          </div>
        </section>
  )
}

export default Hero