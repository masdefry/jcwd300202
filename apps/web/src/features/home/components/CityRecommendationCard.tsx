'use client'

import React from 'react'
import Image from 'next/image'

interface ICityRecommendationCard {
    imgSrc: string,
    alt: string,
    city: string,
    country: string,
    h1Size: string,
}

const CityRecommendationCard = ({ imgSrc, alt, city, country, h1Size }: ICityRecommendationCard) => {
  return (
    <div className='flex flex-col gap-3'>
        <div className='h-[230px] overflow-hidden hover:cursor-pointer active:scale-95 transition duration-200 relative w-full flex items-end px-4 py-3 rounded-md'>
            <figure className='absolute top-0 left-0 w-full h-full'>
              <Image 
              src={imgSrc}
              width={700}
              height={700}
              alt={alt}
              className='object-cover w-full h-full'
              />
            </figure>
            <div className='z-10 rounded-md bg-black bg-opacity-50 lg:bg-opacity-35 transition duration-200 hover:bg-opacity-0 absolute top-0 left-0 w-full h-full'></div>
            <hgroup className='lg:hidden absolute bottom-4 left-4 z-20 flex flex-col gap-1 items-start'>
              <h1 className={`${h1Size} font-bold text-white`}>{city}</h1>
              <h6 className='text-sm font-light text-white'>{country}</h6>
            </hgroup>
          </div>
          <hgroup className='hidden lg:flex flex-col gap-1 items-start z-10'>
            <h1 className={`${h1Size} font-bold text-black`}>{city}</h1>
            <h6 className='text-xl font-light text-gray-600'>{country}</h6>
          </hgroup>
    </div>
  )
}

export default CityRecommendationCard
