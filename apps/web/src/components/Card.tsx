'use client'

import React from 'react'
import Image from 'next/image'
import { CiBookmarkPlus } from "react-icons/ci";
import { BsBuildings } from 'react-icons/bs';
import { RiBuilding3Fill } from 'react-icons/ri';
import { IoLocationOutline } from 'react-icons/io5';

interface ICardProps {
    isPending: boolean,
    propertyType?: string,
    propertyName?: string,
    city?: string,
    country?: string,
    ratingAvg?: number,
    totalReviews?: number,
    price?: number,
    imageUrl?: string
}

const Card = ({isPending, imageUrl = '', propertyType = 'Hotek', propertyName = 'loading', city = 'loading', country = 'loading', ratingAvg = 0, totalReviews = 0, price = 1000000}: ICardProps) => {
  return (
    <div className='w-[135px] h-[240px]  md:w-[285px] md:h-[370px] rounded-md overflow-hidden border border-slate-200 bg-white relative shadow-md'>
        <div className='flex flex-col'>
            <figure className={`${isPending ? 'skeleton' : 'bg-slate-200' } md:h-[200px] h-[100px] rounded-none overflow-hidden`}>
                {
                    !isPending && (
                        <Image 
                        src={imageUrl}
                        width={1000}
                        height={1000}
                        alt=''
                        className='object-cover w-full h-full'
                        />
                    )
                }
            </figure>
            <div className={`${isPending ? 'rounded-none skeleton text-transparent bg-slate-300' : 'text-white bg-gray-900'} text-xs font-semibold  flex md:hidden p-1.5 gap-1 items-center`}>   
                <CiBookmarkPlus size={17}/>
                Book now!
            </div>
        </div>
        <div className='flex flex-col md:gap-2 p-1.5 md:p-3'>
            <div className='hidden md:flex items-center gap-2'>
                <div className={`${isPending ? 'rounded-none skeleton text-transparent' : 'bg-blue-700 text-white'} text-xs font-semibold py-1 px-3 rounded-full w-fit flex items-center gap-1.5`}><BsBuildings className='text-sm' />{propertyType}</div>
                <div className={`${isPending ? 'rounded-none skeleton text-transparent' : 'bg-white text-gray-900'} text-xs font-semibold py-1 px-3 rounded-full w-fit flex items-center gap-1.5`}><RiBuilding3Fill />Roomify</div>
            </div>
            <hgroup className='hidden md:flex flex-col '>
                <h1 className={`text-lg font-bold ${isPending ? 'rounded-none text-transparent skeleton w-fit' : 'text-gray-800' } h-fit`}>{propertyName.length > 20 ? propertyName.slice(0 ,20) + '...' : propertyName}</h1>
                <h6 className={`text-sm font-light ${isPending ? 'rounded-none text-transparent skeleton w-fit' : 'text-gray-600' } h-fit flex items-center gap-1.5`}>{!isPending && <IoLocationOutline className='text-red-600 text-base' />}{city}, {country}</h6>
            </hgroup>
            <hgroup className='flex md:hidden flex-col '>
                <h1 className={`text-sm font-bold ${isPending ? 'rounded-none text-transparent skeleton w-fit' : 'text-gray-900' } h-fit`}>{propertyName.length > 11 ? propertyName.slice(0 ,11) + '...' : propertyName}</h1>
                <h6 className={`text-sm font-light ${isPending ? 'rounded-none text-transparent skeleton w-fit' : 'text-gray-600' } h-fit`}>{city.length > 11 ? city.slice(0 ,11) + '...' : city}</h6>
            </hgroup>
            {
                isPending ? (
                <section className='rounded-none flex  text-xs md:text-lg items-center text-transparent gap-2 h-fit skeleton w-fit font-medium'>
                    <p className=' text-lg font-bold w-fit'>8.9</p>
                    <div className='h-[2px] w-[2px] rounded-none'></div>
                    <p className=''>33 Reviews</p>
                </section>
                ) : totalReviews > 0 ? (
                <section className='flex text-xs md:text-lg items-center gap-2 font-medium'>
                    <p className='text-gray-900 font-bold w-fit'>{ratingAvg}</p>
                    <div className='h-[2px] w-[2px] rounded-full bg-gray-600'></div>
                    <p className='text-gray-600'>{totalReviews} Reviews</p>
                </section>
                ) : (
                    <></>
                )
            }
            <section className='w-full flex md:hidden justify-start gap-2 mt-1'>
                <p className={`font-bold text-orange-600 text-sm h-[1em] ${isPending && 'rounded-none skeleton text-transparent'}`}>Rp{price}</p>
            </section>
            <section className='w-full flex md:hidden justify-start gap-2 mt-[7px]'>
                <p className={`font-light text-gray-400 text-xs h-[1em] ${isPending && 'rounded-none skeleton text-transparent'}`}>After tax & price</p>
            </section>
        </div>
        <section className='absolute bottom-3 w-full right-3 hidden md:flex justify-end items-center gap-2 mt-14'>
            <p className={`font-normal text-sm h-[1em] ${isPending ? 'skeleton text-transparent rounded-none' : 'text-gray-700'}`}>Starts from</p>
            <p className={`text-orange-600 font-bold text-xl h-[1em] ${isPending && 'rounded-none skeleton text-transparent'}`}>Rp{price}</p>
        </section>
    </div>
  )
}

export default Card
