'use client'

import React, { useState } from 'react'      
import { useQuery } from '@tanstack/react-query'     
import { useMutation } from '@tanstack/react-query'; 
import { useSearchParams, useRouter } from 'next/navigation'
import instance from '@/utils/axiosInstance'  
import Link from 'next/link'          

const TransactionPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  
  const toggleAccordion = () => {
    setIsOpen((prev) => !prev)
  }

  const { data: transaction, isPending } = useQuery({
    queryKey: ['getTransaction'],
    queryFn: async() => {
      const res = await instance.get(`/transaction/all`, {

      })
      console.log(res.data.data)
      return res.data.data
    }
  })

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <main className="w-full min-h-min">
      <section className="m-auto max-w-screen-2xl w-full h-full flex items-start gap-5 px-5 py-5">
        <div className="flex flex-col gap-3">
          {transaction?.map((item: any, index: number) => {
            return (
              <div key={index} className="collapse bg-white border w-[60rem] min-h-min rounded">
                <input type="radio" name="my-accordion-1" defaultChecked />
                <div className="collapse-title">
                  <div className="w-full min-h-min items-center justify-between flex gap-3">
                    <div className="w-full min-h-min flex gap-3">
                      <p className="text-[15px] font-bold">{item.room.name} <span className='font-normal'>{item.room.property.name}</span></p>
                      <p className='text-sm'>{item.transactionStatus[0].status}</p>
                    </div>
                  </div>
                </div>
                <div className="collapse-content">
                  <div className='w-full min-h-min flex items-center justify-start'>
                    <p className='text-sm'>{item.id}</p>
                  </div>
                  <div className='w-full min-h-min flex flex-col items-start justify-start text-xs'>
                    <p className='text-xs'>Location: <span>{item.room.property.name}</span></p>
                    <p className='text-xs'>Room Type: <span>{item.room.name}</span></p>
                    <p className='text-xs'>Check In Date: <span>{dateFormatter.format(new Date(item.checkInDate))}</span></p>
                    <p className='text-xs'>Check Out Date: <span>{dateFormatter.format(new Date(item.checkOutDate))}</span></p>
                    <div className='flex items-center justify-start gap-5'>
                      <p className='text-xs'>Adult(s) <span>{item.adult}</span></p>
                      <p className='text-xs'>Children <span>{item.children}</span></p>
                      <p className='text-xs'>Night(s) <span>{item.nights}</span></p>
                    </div>
                    <div  className='flex flex-col mt-3 gap-2'>
                      <p className='text-xs'>Please proceed to payment</p>
                      <a href={item.redirectUrl} className="rounded-md bg-black text-white text-center px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200">Pay</a>
                    </div>
                  </div>
                  <div className="w-full min-h-min flex flex-col items-end justify-start gap-3">
                    {/* <button className="rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200"></button> */}
                  </div>
                </div>
              </div>
            )
          })}
        </div>    
      </section>
    </main>
  )
}

export default TransactionPage
