'use client'

import Image from 'next/image'
import React from 'react'
import { IoTimeOutline } from 'react-icons/io5'
import { MdAttachMoney, MdOutlineEmojiFoodBeverage } from 'react-icons/md'

const PropertyDetailPolicies = ({ dataPropertyDetail, isPending }: any) => {
    if(isPending) {
        return (
          <section className='grid grid-cols-3 gap-5 2xl:p-0 px-5'>
                      <div className='overflow-hidden col-span-3 2xl:col-span-1 rounded-t-3xl 2xl:rounded-l-3xl relative h-[150px] 2xl:h-[210px]'>
                          <figure className='w-full h-full object-cover overflow-hidden bg-gray-400 skeleton'>
                          </figure>
                      </div>
                      <div className='col-span-3 2xl:col-span-2 flex flex-col w-full'>
                          <div id='ci-co-time' className='flex items-center gap-3 border-b border-slate-300 w-full py-3'>
                              <div className='text-slate-200 rounded-full skeleton h-12 w-12'></div>
                              <article className='flex flex-col gap-1 text-sm'>
                                  <h1 className='font-bold bg-slate-300 rounded-none w-fit skeleton text-transparent'>Check-in/Check-out Time</h1>
                                  <span className='flex items-center gap-5 text-gray-600'>
                                      <p className='bg-slate-300 rounded-none w-fit skeleton text-transparent'>Check-in from:10:00 -  10:00</p>
                                      <p className='bg-slate-300 rounded-none w-fit skeleton text-transparent'>Check-out at:10:00 -  10:00</p>
                                  </span>
                              </article>
                          </div>
                          <div id='ci-co-time' className='flex items-center gap-3 border-b border-slate-300 w-full py-3'>
                              <div className='text-slate-200 rounded-full skeleton h-12 w-12'></div>
                              <article className='flex flex-col gap-1 text-sm'>
                                  <h1 className='font-bold bg-slate-300 rounded-none w-fit skeleton text-transparent'>Deposite</h1>
                                  <p className='bg-slate-300 rounded-none w-fit skeleton text-transparent'>You must pay a deposit of Rp100,000 before staying</p>
                              </article>
                          </div>
                          <div id='ci-co-time' className='flex items-center gap-3 border-b border-slate-300 w-full py-3'>
                              <div className='text-slate-200 rounded-full skeleton h-12 w-12'></div>
                              <article className='flex flex-col gap-1 text-sm'>
                                  <h1 className='font-bold bg-slate-300 rounded-none w-fit skeleton text-transparent'>Breakfast</h1>
                                  <p className='bg-slate-300 rounded-none w-fit skeleton text-transparent'> Breakfast facilities for guests follow property management policies</p>
                              </article>
                          </div>
                      </div>
                  </section>
        )
        
    }
  return (
    <section className='grid grid-cols-3 gap-5 2xl:p-0 px-5'>
                <div className='overflow-hidden col-span-3 2xl:col-span-1 rounded-t-3xl 2xl:rounded-l-3xl relative h-[150px] 2xl:h-[210px]'>
                    <figure className='w-full h-full object-cover overflow-hidden'>
                        {
                            Array.isArray(dataPropertyDetail?.propertyImages) && (
                                <Image
                                src={`http://localhost:5000/api/${dataPropertyDetail?.propertyImages[0]?.directory}/${dataPropertyDetail?.propertyImages[0]?.filename}.${dataPropertyDetail?.propertyImages[0]?.fileExtension}`}
                                width={500}
                                height={500}
                                alt=''
                                className='h-full w-full object-cover'
                                />
                            )
                        }
                    </figure>
                    <h1 className='absolute left-0 top-0 p-5 w-full h-full bg-black bg-opacity-45 text-lg md:text-xl font-bold text-white text-left'>Accommodation Policy & General Information at {dataPropertyDetail?.property?.name}</h1>
                </div>
                <div className='col-span-3 2xl:col-span-2 flex flex-col w-full'>
                    <div id='ci-co-time' className='flex items-center gap-3 border-b border-slate-300 w-full py-3'>
                        <div><IoTimeOutline size={30} className='text-gray-400'/></div>
                        <article className='flex flex-col gap-1 text-sm'>
                            <h1 className='font-bold text-gray-900'>Check-in/Check-out Time</h1>
                            <span className='flex items-center gap-5 text-gray-600'>
                                <p>Check-in from: <b className='text-gray-700'>{dataPropertyDetail?.property?.checkInStartTime.split('T')[1]?.slice(0, 5)}{dataPropertyDetail?.property?.checkInEndTime && ' - ' + dataPropertyDetail?.property?.checkInEndTime?.split('T')[1].slice(0, 5)}</b></p>
                                <p>Check-out at: <b className='text-gray-700'>{dataPropertyDetail?.property?.checkOutStartTime && dataPropertyDetail?.property?.checkOutStartTime?.split('T')[1]?.slice(0, 5) + ' - '}{dataPropertyDetail?.property?.checkOutEndTime?.split('T')[1].slice(0, 5)}</b></p>
                            </span>
                        </article>
                    </div>
                    <div id='ci-co-time' className='flex items-center gap-3 border-b border-slate-300 w-full py-3'>
                        <div><MdAttachMoney size={30} className='text-green-600'/></div>
                        <article className='flex flex-col gap-1 text-sm'>
                            <h1 className='font-bold text-gray-900'>Deposite</h1>
                            <p className='text-gray-600'>You must pay a deposit of <b className='text-gray-700'>Rp100,000</b> before staying</p>
                        </article>
                    </div>
                    <div id='ci-co-time' className='flex items-center gap-3 border-b border-slate-300 w-full py-3'>
                        <div><MdOutlineEmojiFoodBeverage size={30} className='text-blue-600'/></div>
                        <article className='flex flex-col gap-1 text-sm'>
                            <h1 className='font-bold text-gray-900'>Breakfast</h1>
                            <p className='text-gray-600'> Breakfast facilities for guests follow property <b className='text-gray-700'>management policies</b></p>
                        </article>
                    </div>
                </div>
            </section>
  )
}

export default PropertyDetailPolicies
