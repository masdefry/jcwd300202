'use client'

import React from 'react'
import Image from 'next/image'

const PropertyDetailFacilities = ({ dataPropertyDetail, isPending }: any) => {
    if(isPending) {
        return (
          <section id='property-facilities' className='rounded-3xl flex flex-col gap-5 bg-white shadow-md p-5 mx-5 2xl:mx-0'>
                      <hgroup>
                          <h1 className='text-lg md:text-xl 2xl:text-2xl font-bold skeleton text-transparent w-fit rounded-none bg-slate-300'>Property Facility</h1>
                          <p className='text-sm md:text-base font-medium md:font-light  skeleton text-transparent w-fit rounded-none bg-slate-300 mt-1'>Get all these facilities from this property</p>
                      </hgroup>
                      <section className='grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-5'>
                              {
                                  Array.from({length: 16}).map((item: any, index: number) => {
                                      return(
                                          <div key={index} className='flex sm:text-sm font-medium text-slate-800 text-xs tracking-wide items-center gap-2'>
                                              <figure className='h-4 w-4 skeleton bg bg-slate-300 rounded-full'>
                                              </figure>
                                              <p className='skeleton text-transparent w-fit rounded-none bg-slate-300'>Property feature</p>
                                          </div>
                                      )
                                  })
                              }
                      </section>
                  </section>
        )

    }
  return (
    <section id='property-facilities' className='rounded-3xl flex flex-col gap-5 bg-white shadow-md p-5 mx-5 2xl:mx-0'>
                <hgroup>
                    <h1 className='text-lg md:text-xl 2xl:text-2xl font-bold'>Property Facility</h1>
                    <p className='text-sm md:text-base font-medium md:font-light  text-gray-600'>Get all these facilities from this property</p>
                </hgroup>
                <section className='grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-5'>
                        {
                            dataPropertyDetail?.propertyFacilities?.map((item: any, index: number) => {
                                return(
                                    <div key={index} className='flex sm:text-sm font-medium text-slate-800 text-xs tracking-wide items-center gap-2'>
                                        <figure>
                                            <Image
                                            src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                                            width={100}
                                            height={100}
                                            alt=''
                                            className='h-4 w-4'
                                            />    
                                        </figure>
                                        <p>{item?.name}</p>
                                    </div>
                                )
                            })
                        }
                </section>
            </section>
  )
}

export default PropertyDetailFacilities
