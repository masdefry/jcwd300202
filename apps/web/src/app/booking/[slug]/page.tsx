'use client'

import React from 'react'
import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'

const BookingPage = ({params}: {params: { slug: string}}) => {

  const { data: dataPropertyRoomType, isPending: isPendingPropertyRoomType } = useQuery({
    queryKey: ['getPropertyRoomType'],
    queryFn: async() => {
        const res = await instance.get(`/room-type/${params.slug}`)
        console.log('BOOKING >>>', res.data.data.propertyRoomType)
        return res.data.data.propertyRoomType
    }
  })

  if(isPendingPropertyRoomType){
    return (
        <div>Loading ...</div>
    )
  }
    
  return (
    <main className='w-full h-screen'>
      <section className='m-auto max-w-screen-xl w-full h-full flex items-start gap-5 p-5 relative'>
        <div className='flex flex-col gap-3'>


        </div>
        <div className="flex flex-col gap-3 sticky top-0">
          {dataPropertyRoomType?.map((item: any, index: number) => {
            return (
              <div key={index} className='bg-white w-[30rem] min-h-min border rounded sticky top-0 p-3'>
                <p className='text-sm mt-2'>PAN PACIFIC JAKARTA</p>
                <p className='text-md uppercase font-bold'>{item.name}</p>
                <p className='text-xs'>CHECK IN 2.00 PM | CHECK OUT 12.00 PM</p>
                <hr className='mt-3'/>
                <p className='text-xs mt-3'>December 9, 2024 - December 10, 2024</p>
                <div className='flex items-center justify-start gap-3 mt-3'>
                  <div className='flex items-center justify-start gap-2 mt-2'>
                    <svg data-slot="icon" width="17" height="17" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
                    </svg>
                    <p className='text-sm'>2 adults</p>
                  </div>
                  <div className='flex items-center justify-start gap-2 mt-2'>
                    <svg data-slot="icon" width="17" height="17" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
                    </svg>
                    <p className='text-sm'>1 children</p>
                  </div>
                </div>
                <div className="collapse">
                  <input type="radio" name="accordion-toggle" defaultChecked />
                  <div className="collapse-content p-0">
                    <div className='flex flex-col gap-5'>
                      <div className='flex items-center justify-between'>
                        <p className='text-xs font-medium'>ROOM</p>
                        <p className='text-xs font-medium'>RP <span className='font-bold'>{item.price}</span></p>
                      </div>
                      <hr/>
                      <div className='flex items-center justify-between'>
                        <p className='text-xs font-medium'>TAX</p>
                        <p className='text-xs font-medium'>RP <span className='font-bold'>460000</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collapse">
                  <input type="checkbox" name="accordion-toggle"/>
                  <div className="collapse-title flex items-center justify-center p-0">
                    <p className='text-xs hover:underline'>SEE DETAILS</p>
                  </div>
                  <div className="collapse-content p-0">
                    <div className='flex flex-col gap-5'>
                      <div className='flex flex-col'>
                        <p className='text-xs font-medium'>ROOM</p>
                        <div className='flex items-center justify-between mt-2'>
                          <p className='text-xs '>{item.name}</p>
                          <p className='text-xs font-medium'>RP <span className='font-bold'>{item.price}</span></p>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                          <p className='text-xs '>Capacity</p>
                          <p className='text-xs font-medium'><span className='font-bold'>{item.capacity}</span></p>
                        </div>
                      </div>
                      <hr/>
                      <div className='flex flex-col'>
                        <p className='text-xs font-medium'>TAXES AND FEES</p>
                        <div className='flex items-center justify-between mt-2'>
                          <p className='text-xs'>VAT</p>
                          <p className='text-xs font-medium'>RP <span className='font-bold'>253932</span></p>
                        </div>
                        <div className='flex items-center justify-between'>
                          <p className='text-xs'>Taxes</p>
                          <p className='text-xs font-medium'>RP <span className='font-bold'>263994</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-bold'>TOTAL <span className='text-xs font-normal'>(fees and taxes included)</span></p>
                  <p className='text-xs font-medium'>RP <span className='font-bold text-sm'>460000</span></p>
                </div>
                <button className="w-full rounded-full bg-[#e2e8f0] text-black px-7 py-3 mt-10 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200">Continue</button>
              </div>
            )
          })}
        </div> 
      </section>

    </main>
  )
}

export default BookingPage
