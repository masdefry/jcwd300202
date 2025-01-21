'use client'

import React from 'react'
import Image from 'next/image'
import { useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import useImageCarouselHook from '../hooks/useImageCarouselHook'

interface IHeroProps {
  isPending?: boolean,
  imagesArr: any
}

const ImageCarousel = ({ isPending = false, imagesArr }: IHeroProps) => {

  const { 
    currSlide,
    next,
    prev 
  } = useImageCarouselHook({ imagesArr })  

  if(isPending) {
    return (
      <section className='w-full h-full overflow-hidden relative skeleton rounded-none'></section>
    )
  }


  return (
        <section id='hero-section-carousel' className='w-full h-full overflow-hidden relative'>
          <div className={`flex transition-transform ease-in-out duration-1000 h-full min-w-max bg-slate-200`} style={{transform: `translateX(-${currSlide/(imagesArr?.length || 1) * 100}%)`}}>
              {
                imagesArr?.map((item: any, index: number) => {
                  return(
                    <section key={index} id={`carousel-${index + 1}`} className="relative rounded-none h-full min-w-max my-bg-lin-1">
                      <figure className='min-w-max h-full'>
                        <Image
                          src={`http://localhost:5000/api/${item?.directory}/${item?.filename}.${item?.fileExtension}`}
                          width={850}
                          height={1500}
                          alt='' 
                          className="h-full object-cover min-w-max"
                        />
                      </figure>
                    </section>
                  )
                })
              }
          </div>
          <div id='carousel-buttons' className='w-full absolute inset-0 flex items-center justify-between z-20 p-3'>
              <div onClick={prev} className='rounded-full bg-white p-2 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90'>
                <IoIosArrowBack /> 
              </div>
              <div onClick={next} className='rounded-full bg-white p-2 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90'>
                <IoIosArrowForward /> 
              </div>
          </div>
        </section>
  )
}

export default ImageCarousel