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
      <section className="m-auto max-w-screen-2xl w-full h-full flex items-start gap-5">
        <div className="w-full flex flex-col gap-3">
        {transaction && transaction.length > 0 ? (
          transaction.map((item: any, index: number) => {
            return (
              <div key={index} className="bg-white border w-full min-h-min rounded-lg">
                <div className="w-full flex items-center justify-center p-5 bg-gradient-to-r from-[#e2e8f0] to-white">
                  <div className="w-full min-h-min items-center justify-between flex gap-3">
                    <div className="w-full min-h-min flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="font-bold">{item.room.property.name}</p>
                      </div>
                      {item.transactionStatus[0]?.status === 'PAID' || 
                      item.transactionStatus[0]?.status === 'WAITING_FOR_CONFIRMATION_PAYMENT' ? (
                        <Link href={`/user/purchase-detail/${item.id.split("ORDER_")[1]}`} className="border bg-white text-sm px-4 py-2 rounded-md shadow cursor-pointer">
                          Purchase Detail
                        </Link>
                      ) : item.transactionStatus[0]?.status === 'WAITING_FOR_PAYMENT' ? (
                        <div className="flex gap-2">
                          <button className="border bg-white text-sm px-4 py-2 rounded-md shadow cursor-pointer">
                            Cancel
                          </button>
                          <Link href={`/user/proceed-to-payment/${item.id.split("ORDER_")[1]}`} className="bg-black text-white text-sm px-4 py-2 rounded-md shadow cursor-pointer">
                            Proceed to Payment
                          </Link>
                        </div>
                      ) : item.transactionStatus[0]?.status === 'CANCELLED' ? (
                        <p className="text-sm font-bold">CANCELLED</p>
                      ) : item.transactionStatus[0]?.status === 'EXPIRED' ? (
                        <p className="text-sm font-bold">EXPIRED</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-end justify-start gap-5 p-5">
                  <div className="w-1/6 min-h-min flex flex-col justify-start">
                    <p className="text-xs text-slate-500">Room Type</p>
                    <p className="text-sm font-bold">{item.room.name}</p>
                  </div>
                  <div className="w-3/6 flex items-end justify-start gap-5">
                    <div className="min-h-min flex flex-col justify-start">
                      <p className="text-xs text-slate-500">Check In</p>
                      <p className="text-sm font-bold">{dateFormatter.format(new Date(item.checkInDate))}</p>
                    </div>
                    <svg data-slot="icon" width={20} height={20} fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                    </svg>
                    <div className="min-h-min flex flex-col justify-start">
                      <p className="text-xs text-slate-500">Check Out</p>
                      <p className="text-sm font-bold">{dateFormatter.format(new Date(item.checkOutDate))}</p>
                    </div>
                  </div>
                  <div className="w-2/6 min-h-min flex items-center justify-end">
                    <p className="text-sm font-bold text-end">Expires at 1hr</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <p>No transactions available.</p>
          </div>
        )}

        </div>   
      </section>
    </main>
  )
}

export default TransactionPage
