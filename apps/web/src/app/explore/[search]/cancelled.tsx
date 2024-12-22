'use client'

import TwoHandleSlider from '@/components/TwoHandleSlider'
import useFilteringPropertyHook from '@/features/property/hooks/useFilteringPropertyHook'
import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import MultiRangeSlider from 'multi-range-slider-react'
import React, { ReactNode, useRef, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { RiBuilding3Line } from "react-icons/ri";

const ExploreLayout = ({ children }: {children: ReactNode}) => {
  const [ showFilterPropertyFacility, setShowFilterPropertyFacility ] = useState(false)
  const [ showPropertyType, setShowPropertyType ] = useState(false)
  const [ minValue, setMinValue ] = useState(0)
  const [ maxValue, setMaxValue ] = useState(1)
  const handleInput = (e: any) => {
	setMinValue(e.minValue);
	setMaxValue(e.maxValue);
};
const {
    dataForFilteringProperty,
    setDataForFilteringProperty
} = useFilteringPropertyHook()

    // const { data: dataForFilteringProperty, isPending: isPendingForFilteringProperty} = useQuery({
    //     queryKey: ['getDataForFilteringProperty'],
    //     queryFn: async() => {
    //         const res = await instance.get('/property/nav/filter')
    //         return res?.data?.data
    //     }
    // })
//   const handleMaxValue = (value: number) => {
//     if( value <= 50 ) {
//         setSlider1Value(value)
//     } else {
//         setSlider1Value(50)
//     }
//   }

//   const handleMinValue = (value: number) => {
//     if( value > 50 ) {
//         setSlider2Value(value)
//     } else {
//         setSlider2Value(51)
//     }
//   }  
{/* <div className='rounded-md w-full shadow-md bg-white p-5' id='price-filter'> */}
    {/* <div>
        <input type="range" min={0} value={slider1Value} max={100} maxLength={50} onChange={(e) =>  handleMaxValue(Number(e.target.value))} />
        <input type="range" min={0} value={slider2Value} max={100} maxLength={100} onChange={(e) =>  handleMinValue(Number(e.target.value))} />
    </div>
    {/* <input type="range" min="50"  className="range range-xs" /> */}
    {/* <p>{slider1Value}</p>
    <p>{slider2Value}</p>  */}
    {/* <MultiRangeSlider
        min={0}
        max={100}
        step={1}
        barInnerColor='gray'
        thumbLeftColor='white'
        thumbRightColor='white'
        style={{
            boxShadow: 'none',
            border: 'none',
            textShadow: 'none',
        }}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e) => {
            handleInput(e);
        }}
    /> */}
{/* </div> */}
  return (
    <main className='w-full min-h-min py-5'>
        <section className='m-auto max-w-screen-xl grid grid-cols-4  gap-5 w-full h-full'>
            <section className='flex flex-col gap-5'>
                <div className='rounded-md w-full shadow-md flex flex-col overflow-hidden bg-white' id='price-filter'>
                    <hgroup className='felx flex-col gap-1.5 text-sm font-bold py-3 px-5 bg-gray-800 text-white'>
                        <h1>Price</h1>
                        <p className='font-light text-gray-300'>Get the best deal</p>
                    </hgroup>
                    <div className='flex items-center gap-1 p-5'>
                        <div className='text-sm font-semibold flex flex-col gap-1'>
                            <label className='ml-3' htmlFor='lowest-price'>Starts from</label>
                            <input type="text" id='lowest-price' className='w-full rounded-full border border-slate-300 bg-white text-xs placeholder-shown:text-xs text-gray-800 focus:outline-1 px-3 py-1' placeholder='300.000'/>
                        </div>
                        <div className='text-sm font-semibold flex flex-col gap-1'>
                            <label className='ml-3' htmlFor='highest-price'>to</label>
                            <input type="text" id='highest-price' className='w-full rounded-full border border-slate-300 bg-white text-xs placeholder-shown:text-xs text-gray-800 focus:outline-1 px-3 py-1' placeholder='3.000.000'/>
                        </div>
                    </div>
                </div>
                <div tabIndex={0} className="rounded-md collapse collapse-arrow shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-bold text-gray-800 bg-white">Accomodation Type</div>
                    <div className="collapse-content pt-3">
                        <ul className='flex flex-col gap-4 text-sm font-semibold'>
                            {
                                dataForFilteringProperty?.propertyType.slice(0,4).map((item: any, index: number) => {
                                    return (
                                    <li key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox" />
                                            <span className="text-gray-600 label-text">{item?.name} ({item?._count?.property})</span>
                                        </label>
                                    </li>
                                    )
                                })
                            }
                            {   !showPropertyType ? (
                                <li onClick={() => setShowPropertyType(true)} className='hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100'>Show more...</li>
                            )  : (
                                <ul className='flex flex-col gap-4 text-sm font-semibold'>
                                    {
                                        dataForFilteringProperty?.propertyType.slice(4).map((item: any, index: number) => {
                                            return (
                                            <li key={index} className="form-control">
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input type="checkbox" className="checkbox" />
                                                    <span className="text-gray-600 label-text">{item?.name} ({item?._count?.property})</span>
                                                </label>
                                            </li>
                                            )
                                        })
                                    }
                                    <li onClick={() => setShowPropertyType(false)} className='hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100'>Show less</li>
                                </ul>
                            )
                            }

                        </ul>
                    </div>
                </div>
                <div tabIndex={0} className="rounded-md collapse collapse-arrow shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-bold text-gray-800 bg-white">General Facility</div>
                    <div className="collapse-content pt-3">
                        <ul className='flex flex-col gap-4 text-sm font-semibold'>
                            {
                                dataForFilteringProperty?.propertyFacility.slice(0,5).map((item: any, index: number) => {
                                    return (
                                    <li key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox" />
                                            <span className="text-gray-600 label-text">{item?.name} ({item?._count?.propertyHasFacility})</span>
                                        </label>
                                    </li>
                                    )
                                })
                            }
                            {   !showFilterPropertyFacility ? (
                                <li onClick={() => setShowFilterPropertyFacility(true)} className='hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100'>Show more...</li>
                            )  : (
                                <ul className='flex flex-col gap-4 text-sm font-semibold'>
                                    {
                                        dataForFilteringProperty?.propertyFacility.slice(5).map((item: any, index: number) => {
                                            return (
                                            <li key={index} className="form-control">
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input type="checkbox" className="checkbox" />
                                                    <span className="text-gray-600 label-text">{item?.name} ({item?._count?.propertyHasFacility})</span>
                                                </label>
                                            </li>
                                            )
                                        })
                                    }
                                    <li onClick={() => setShowFilterPropertyFacility(false)} className='hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100'>Show less</li>
                                </ul>
                            )
                            }

                        </ul>
                    </div>
                </div>
                <div tabIndex={0} className="rounded-md collapse collapse-arrow shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-bold text-gray-800 bg-white">Room Facility</div>
                    <div className="collapse-content pt-3">
                        <ul className='flex flex-col gap-4 text-sm font-semibold'>
                            {
                                dataForFilteringProperty?.propertyRoomFacility.slice(0,5).map((item: any, index: number) => {
                                    return (
                                    <li key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox" />
                                            <span className="text-gray-600 label-text">{item?.name} ({item?._count?.roomHasFacilities})</span>
                                        </label>
                                    </li>
                                    )
                                })
                            }
                            {   !showFilterPropertyFacility ? (
                                <li onClick={() => setShowFilterPropertyFacility(true)} className='hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100'>Show more...</li>
                            )  : (
                                <ul className='flex flex-col gap-4 text-sm font-semibold'>
                                    {
                                        dataForFilteringProperty?.propertyRoomFacility.slice(5).map((item: any, index: number) => {
                                            return (
                                            <li key={index} className="form-control">
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input type="checkbox" className="checkbox" />
                                                    <span className="text-gray-600 label-text">{item?.name} ({item?._count?.roomHasFacilities})</span>
                                                </label>
                                            </li>
                                            )
                                        })
                                    }
                                    <li onClick={() => setShowFilterPropertyFacility(false)} className='hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100'>Show less</li>
                                </ul>
                            )
                            }

                        </ul>
                    </div>
                </div>
                <div tabIndex={0} className="rounded-md collapse collapse-arrow shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-bold text-gray-800 bg-white">Stars</div>
                    <div className="collapse-content pt-3">
                    <ul className='flex flex-col gap-4 text-sm font-semibold'>
                            {
                                Array.from({length: 4}).map((item, index) => {
                                    return (
                                    <li key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox" />
                                            <span className="text-gray-600 label-text flex items-center gap-1.5">
                                                <p>{5 - index}</p>
                                                <FaStar key={index} size={18} className='text-yellow-400'/>
                                                <p>(1200)</p>
                                            </span>
                                        </label>
                                    </li>
                                    )
                                })
                            }
                    </ul>
                    </div>
                </div>
                <div tabIndex={0} className="rounded-md collapse collapse-arrow shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-bold text-gray-800 bg-white">Ratings from Guest</div>
                    <div className="collapse-content pt-3">
                    <ul className='flex flex-col gap-4 text-sm font-semibold'>
                            {
                                Array.from({length: 4}).map((item, index) => {
                                    return (
                                    <li key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox" />
                                            <span className="text-gray-600 label-text flex items-center gap-1.5">
                                                <p>{9 - index}+</p> 
                                                <RiBuilding3Line key={index} size={18} className='text-gray-800'/>
                                                <p>(1200)</p>
                                            </span>
                                        </label>
                                    </li>
                                    )
                                })
                            }
                    </ul>
                    </div>
                </div>
            </section>
            <section className='col-span-3'>
                {children}
            </section>
        </section>
    </main>
  )
}

export default ExploreLayout
