'use client'

import React from 'react'
import Image from 'next/image'

interface ICityRecommendationCard {
    imgSrc: string,
    alt: string,
    city: string,
    country: string,
    h1Size: string,
    isPending: boolean
}

const CityRecommendationCard = ({ imgSrc, alt, city, country, h1Size, isPending }: ICityRecommendationCard) => {
  return (
    <div className='flex flex-col gap-3'>
        <div className={`${isPending ? 'skeleton' : 'duration-200 hover:cursor-pointer active:scale-95'} h-[160px] lg:h-[230px] overflow-hidden transition relative w-full flex items-end px-4 py-3 rounded-md`}>
            <figure className='absolute top-0 left-0 w-full h-full'>
              {
                !isPending && (
                  <Image 
                  src={imgSrc}
                  width={700}
                  height={700}
                  alt={alt}
                  className='object-cover w-full h-full'
                  />
                )
              }
            </figure>
            <div className={`z-10 rounded-md ${!isPending && 'bg-black bg-opacity-50 hover:bg-opacity-0 lg:bg-opacity-35'} transition duration-200 absolute top-0 left-0 w-full h-full`}></div>
            <hgroup className='lg:hidden absolute bottom-4 left-4 z-20 flex flex-col gap-1 items-start'>
              <h1 className={`${isPending ? 'skeleton text-transparent bg-slate-300 rounded-none w-fit' : 'text-white'} ${h1Size} h-[1em] font-bold md:text-xl text-lg`}>{city}{isPending && 'LOADINGL'}</h1>
              <h6 className={`${isPending ? 'skeleton text-transparent bg-slate-300 rounded-none w-fit' : 'text-white'} text-sm h-[1em] font-light`}>{country}{isPending && 'loading'}</h6>
            </hgroup>
          </div>
          <hgroup className='hidden lg:flex flex-col gap-1 items-start z-10'>
            <h1 className={`${isPending ? 'skeleton text-transparent bg-slate-300 w-fit rounded-none' : 'text-black'} ${h1Size} font-bold h-[1em]`}>{city}{isPending && 'LLOADING'}</h1>
            <h6 className={`${isPending ? 'skeleton text-transparent bg-slate-300 w-fit rounded-none' : 'text-gray-600'} text-xl h-[1em] font-light`}>{country}{isPending && 'loading'}</h6>
          </hgroup>
    </div>
  )
}

export default CityRecommendationCard
