import React from 'react'
import Image from 'next/image'

const Promotion = () => {
  return (
    <section className='p-4 sm:px-8 md:px-12 lg:px-16 justify-center flex flex-col gap-5 h-[190px] md:h-[230px] w-full overflow-hidden relative'>
        <figure className='absolute top-0 left-0 w-full h-full'>
            <Image
            src='https://cache.marriott.com/marriottassets/marriott/LASJW/lasjw-guestroom-0111-hor-clsc.jpg?interpolation=progressive-bilinear&'
            width={1500}
            height={1500}
            alt='promotion'
            className='object-cover w-full h-full'
            />
        </figure>
        <div className="bg-black bg-opacity-70 absolute top-0 left-0 z-10 w-full h-full"></div> 
        <hgroup className="flex flex-col gap-1 z-20 text-white">
            <p className="text-lg md:text-2xl lg:text-4xl font-bold tracking-wide">Discounts up to 10% at 100+ hotels</p>
            <h1 className="text-xs md:text-sm font-normal tracking-wide">Min. 2 nights. Book before 15 Feb 25.</h1>
        </hgroup>
        <button className="text-white active:scale-90 z-20 rounded-md transition duration-200 md:text-base text-sm px-5 md:px-9 py-3 md:py-5 border border-white hover:bg-white hover:text-black w-fit">Book now</button>
    </section>
  )
}

export default Promotion
