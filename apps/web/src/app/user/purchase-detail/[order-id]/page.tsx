'use client'

import React, { useState } from 'react'      
import { useQuery } from '@tanstack/react-query'     
import { useMutation } from '@tanstack/react-query'; 
import { usePathname, useRouter } from 'next/navigation'
import instance from '@/utils/axiosInstance'  
import Link from 'next/link'

const PurchaseDetailPage = () => {

    const pathname = usePathname();
    const id = pathname?.split('/').pop();
    const transactionId = id ? `ORDER_${id}` : null; 

    console.log(transactionId, 'THIS IS THE ID')

    const { data: transaction, isPending } = useQuery({
        queryKey: ['getTransaction', transactionId],
        queryFn: async() => {
          const res = await instance.get(`/transaction/${transactionId}`, {
    
          })
          console.log(res.data.data, 'RESPONSE')
          return res.data.data
        },
        // enabled: !!id,
    })

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })


    return (
        <main className='w-full h-screen'>
            <section className='m-auto max-w-screen-2xl w-full h-screen flex flex-col items-start gap-5'>
                {transaction && (
                    <div className='bg-white border w-full min-h-min rounded-lg p-5'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col items-start justify-start'>
                                <p className='font-bold'>{transaction.room.property.name}</p>
                                <span className='text-xs text-slate-500'>{transaction.room.property.city.name}, {transaction.room.property.country.name}</span>
                            </div>
                            {transaction.transactionStatus[0]?.status === 'PAID' ? (
                                <div className='flex items-center justify-end gap-2'>
                                    <p className='border rounded text-xs px-2 py-1'>PAID</p>
                                    <p className='bg-black rounded text-xs text-white px-2 py-1'>{transaction.id}</p>
                                </div>        
                            ): transaction.transactionStatus[0]?.status === 'WAITING_FOR_CONFIRMATION_PAYMENT' ? (
                                <div className='flex items-center justify-end gap-2'>
                                    <p className='border rounded text-xs px-2 py-1'>WAITING FOR CONFIRMATION PAYMENT</p>
                                    <p className='bg-black rounded text-xs text-white px-2 py-1'>{transaction.id}</p>
                                </div>
                            ): null}
                        </div>
                        {transaction.transactionStatus[0]?.status === 'WAITING_FOR_CONFIRMATION_PAYMENT' ? (
                            <div className='bg-[#fef9ec] border border-[#e2e8f0] rounded-lg w-full min-h-min flex items-center justify-start gap-3 px-5 py-2 mt-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                    <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 3c9.4 0 17 7.6 17 17s-7.6 17-17 17S7 33.4 7 24 14.6 7 24 7zm0 7a2 2 0 100 4 2 2 0 000-4zm-0.02 6.98A1.5 1.5 0 0022.5 22.5v11a1.5 1.5 0 003 0v-11a1.5 1.5 0 00-1.52-1.52z" />
                                </svg>
                                <p className='text-xs'>
                                    The payment has been successfully processed. However, please note that the tenant will first review the payment before approving it. <br/>
                                    Please wait 2 to 5 minutes for the tenant's approval, then refresh this page or check your purchase list. You can also check your notifications or email for any updates that have been sent.
                                </p> 
                            </div>
                        ): null}
                        <div>

                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}

export default PurchaseDetailPage