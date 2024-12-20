'use client'

import TwoHandleSlider from '@/components/TwoHandleSlider'
import MultiRangeSlider from 'multi-range-slider-react'
import React, { ReactNode, useRef, useState } from 'react'

const ExploreLayout = ({ children }: {children: ReactNode}) => {
  const [ minValue, setMinValue ] = useState(0)
  const [ maxValue, setMaxValue ] = useState(1)
  const handleInput = (e: any) => {
	setMinValue(e.minValue);
	setMaxValue(e.maxValue);
};
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
  return (
    <main className='w-full min-h-min'>
        <section className='m-auto max-w-screen-xl grid grid-cols-4  gap-5 w-full h-full'>
            <section className='flex flex-col gap-5'>
                <div className='rounded-md w-full shadow-md bg-white p-5' id='price-filter'>
                    {/* <div>
                        <input type="range" min={0} value={slider1Value} max={100} maxLength={50} onChange={(e) =>  handleMaxValue(Number(e.target.value))} />
                        <input type="range" min={0} value={slider2Value} max={100} maxLength={100} onChange={(e) =>  handleMinValue(Number(e.target.value))} />
                    </div>
                    {/* <input type="range" min="50"  className="range range-xs" /> */}
                    {/* <p>{slider1Value}</p>
                    <p>{slider2Value}</p>  */}
                    <MultiRangeSlider
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
                    />
                </div>
                <div tabIndex={0} className="collapse collapse-arrow shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-bold text-gray-800 bg-slate-200">Filter Property Type</div>
                    <div className="collapse-content pt-3">
                        <ul className='flex flex-col gap-4'>
                            {
                                Array.from({length: 10}).map((item, index) => {
                                    return (
                                    <li key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox" />
                                            <span className="text-gray-600 label-text">Breakfast</span>
                                        </label>
                                    </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-bold text-gray-800 bg-slate-200">Property Facility</div>
                    <div className="collapse-content pt-3">
                        <ul className='flex flex-col gap-4'>
                            {
                                Array.from({length: 10}).map((item, index) => {
                                    return (
                                    <li key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox" />
                                            <span className="text-gray-600 label-text">Breakfast</span>
                                        </label>
                                    </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
            </section>
            <section className='col-span-3'>{children}</section>
        </section>
    </main>
  )
}

export default ExploreLayout
