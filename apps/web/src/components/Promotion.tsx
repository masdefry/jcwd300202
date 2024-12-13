import React from 'react'
import Image from 'next/image'

const Promotion = () => {
  return (
    <section className='p-4 sm:px-8 md:px-12 lg:px-16 justify-center flex flex-col gap-5 h-[250px] w-full overflow-hidden relative'>
        <figure className='absolute top-0 left-0 w-full h-full'>
            <Image
            src='https://cache.marriott.com/marriottassets/marriott/LASJW/lasjw-guestroom-0111-hor-clsc.jpg?interpolation=progressive-bilinear&'
            width={1500}
            height={1500}
            alt='promotion'
            className='object-cover w-full h-full'
            />
        </figure>
        <div className="bg-black bg-opacity-50 absolute top-0 left-0 z-10 w-full h-full"></div> 
        <hgroup className="flex flex-col gap-1 z-20 text-white">
            <p className="text-2xl lg:text-4xl font-bold">Discounts up to 10% at 100+ hotels</p>
            <h1 className="text-sm md:text-base lg:text-xl font-light">Min. 2 nights. Book before 15 Jan 25.</h1>
        </hgroup>
        <button className="text-white active:scale-90 z-20 rounded-full transition duration-200 px-9 py-5 border border-white hover:bg-white hover:text-black w-fit">Book now</button>
    </section>
  )
}

export default Promotion