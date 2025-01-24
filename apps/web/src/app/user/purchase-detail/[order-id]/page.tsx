'use client'

import React, { useState } from 'react'      
import { useQuery } from '@tanstack/react-query'     
import { useMutation } from '@tanstack/react-query'; 
import { usePathname, useRouter } from 'next/navigation'
import instance from '@/utils/axiosInstance'  
import Link from 'next/link'
import Image from 'next/image'

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

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };



    return (
        <main className='w-full h-screen'>
            <section className='m-auto max-w-screen-xl w-full h-screen flex flex-col items-start gap-5'>
                {transaction && (
                    <div className='bg-white border w-full min-h-min rounded-lg p-5'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col items-start justify-start'>
                                <p className='font-bold'>{transaction.room.property.name}</p>
                                <span className='text-xs text-slate-500'>{transaction.room.property.city.name}, {transaction.room.property.country.name}</span>
                            </div>
                            {transaction.transactionStatus && transaction.transactionStatus[0]?.status === 'PAID' ? (
                                <div className='flex items-center justify-end gap-2'>
                                    <p className='border rounded text-xs px-2 py-1'>PAID</p>
                                    <p className='bg-black rounded text-xs text-white px-2 py-1'>{transaction.id}</p>
                                </div>        
                            ): transaction.transactionStatus && transaction.transactionStatus[0]?.status === 'WAITING_FOR_CONFIRMATION_PAYMENT' ? (
                                <div className='flex items-center justify-end gap-2'>
                                    <p className='border rounded text-xs px-2 py-1'>WAITING FOR CONFIRMATION PAYMENT</p>
                                    <p className='bg-black rounded text-xs text-white px-2 py-1'>{transaction.id}</p>
                                </div>
                            ): transaction.transactionStatus && transaction.transactionStatus[0]?.status === 'EXPIRED' ? (
                                <div className='flex items-center justify-end gap-2'>
                                    <p className='border rounded text-xs px-2 py-1'>EXPIRED</p>
                                    <p className='bg-black rounded text-xs text-white px-2 py-1'>{transaction.id}</p>
                                </div>
                            ): transaction.transactionStatus && transaction.transactionStatus[0]?.status === 'CANCELLED' ? (
                                <div className='flex items-center justify-end gap-2'>
                                    <p className='border rounded text-xs px-2 py-1'>CANCELLED</p>
                                    <p className='bg-black rounded text-xs text-white px-2 py-1'>{transaction.id}</p>
                                </div>
                            ): <p></p>}
                        </div>
                        {transaction.transactionStatus && transaction.transactionStatus[0]?.status === 'WAITING_FOR_CONFIRMATION_PAYMENT' ? (
                            <div className='bg-[#fef9ec] border border-[#e2e8f0] rounded-lg w-full min-h-min flex items-center justify-start gap-3 px-5 py-2 mt-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                    <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 3c9.4 0 17 7.6 17 17s-7.6 17-17 17S7 33.4 7 24 14.6 7 24 7zm0 7a2 2 0 100 4 2 2 0 000-4zm-0.02 6.98A1.5 1.5 0 0022.5 22.5v11a1.5 1.5 0 003 0v-11a1.5 1.5 0 00-1.52-1.52z" />
                                </svg>
                                <p className='text-xs'>
                                    The payment has been successfully processed. However, please note that the tenant will first review the payment before approving it. <br/>
                                    Please wait 2 to 5 minutes for the tenant's approval, then refresh this page or check your purchase list. You can also check your notifications or email for any updates that have been sent.
                                </p> 
                            </div>
                        ): transaction.transactionStatus && transaction. transactionStatus[0]?.status === 'EXPIRED' ? (
                            <div className='bg-[#fef9ec] border border-[#e2e8f0] rounded-lg w-full min-h-min flex items-center justify-start gap-3 px-5 py-2 mt-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                    <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 3c9.4 0 17 7.6 17 17s-7.6 17-17 17S7 33.4 7 24 14.6 7 24 7zm0 7a2 2 0 100 4 2 2 0 000-4zm-0.02 6.98A1.5 1.5 0 0022.5 22.5v11a1.5 1.5 0 003 0v-11a1.5 1.5 0 00-1.52-1.52z" />
                                </svg>
                                <p className='text-xs'>
                                    The payment has expired and has not been completed. Unfortunately, the transaction was not processed. <br/>
                                    Please initiate a new transaction to complete your purchase. You can check your purchase list for further updates or check your notifications and email for more details on the payment status.
                                </p> 
                            </div>
                        ): <p></p>}
                        <div className='w-full flex'>
                            <div className='w-1/2 w-full flex flex-col items-start mt-[2rem] gap-[2rem]'>
                                <div className="w-full min-h-min flex flex-col justify-start">
                                    <p className="text-xs text-slate-500">Room Type</p>
                                    <p className="text-sm font-bold">{transaction.room.name}</p>
                                </div>
                                <div className='w-fullflex flex-col items-start justify-start gap-2'>
                                    <div className="flex items-end justify-start gap-5">
                                        <div className="min-h-min flex flex-col justify-start">
                                            <p className="text-xs text-slate-500">Check In</p>
                                            <p className="text-sm font-bold">{dateFormatter.format(new Date(transaction.checkInDate))}</p>
                                        </div>
                                        <svg data-slot="icon" width={18} height={18} fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                                        </svg>
                                        <div className="min-h-min flex flex-col justify-start">
                                            <p className="text-xs text-slate-500">Check Out</p>
                                            <p className="text-sm font-bold">{dateFormatter.format(new Date(transaction.checkOutDate))}</p>
                                        </div>
                                    </div>
                                    <p className='text-xs text-slate-400'>{transaction.nights} night(s)</p>
                                </div>
                                <div className="w-full min-h-min flex flex-col justify-start">
                                    <p className="text-xs text-slate-500">Total Adult(s) and Children</p>
                                    <p className="text-sm font-bold">{transaction.adult + transaction.children}</p>
                                </div>

                            </div>
                            <div className='w-1/2 mt-[2rem]'>
                                <div className='w-full rounded-lg border bg-slate-50 p-3'>
                                    <div className='flex flex-col items-start justify-start'>
                                        <p className='text-sm font-bold'>Order Summary</p>
                                        <div className='w-full flex items-start justify-between mt-5'>
                                            <p className='text-sm'>
                                                {transaction.room.name} <br/>
                                                <span className='text-xs font-bold'>(includes tax and fees)</span>
                                            </p>
                                            <p className='text-xs'>Rp<span className='text-sm font-bold'>{Number(transaction.price)}</span></p>
                                        </div>
                                        <div className='w-full flex flex-col items-start justify-between mt-[2rem] gap-2'>
                                            <p className='text-xs'>Click to view the Midtrans payment</p>
                                            <button className="bg-slate-200 text-xs rounded shadow cursor-pointer px-4 py-2" onClick={openModal}>Uploaded Payment</button>
                                            {isOpen && (
                                                <dialog id="my_modal_1" className="modal" open>
                                                    <div className="modal-box">
                                                        <div className='w-[15.5rem]'>
                                                            <p className="bg-blue-50 rounded text-xs text-slate-500 px-2 py-1">{transaction.id}</p>
                                                        </div>
                                                        {
                                                            transaction.transactionStatus && (
                                                                transaction.transactionStatus[0]?.status === 'EXPIRED' || transaction.transactionStatus && transaction.transactionStatus[0]?.status === 'CANCELLED' 
                                                                ? (
                                                                    <div className="text-start text-slate-600 text-sm mt-[2rem]">
                                                                        User has not paid or has cancelled the transaction.
                                                                    </div>
                                                                ) 
                                                                : (
                                                                    <Image 
                                                                        src={`http://localhost:5000/api/${transaction.transactionUpload[0]?.directory}/${transaction.transactionUpload[0]?.filename}.${transaction.transactionUpload[0]?.fileExtension}`}
                                                                        width={400} 
                                                                        height={400} 
                                                                        alt="Payment"
                                                                        className="object-cover w-full h-full rounded absolute top-0 left-0 transition-transform duration-300 ease-in-out hover:scale-110 mt-[2rem]"
                                                                    />
                                                                )
                                                            )
                                                        }
                                                        <div className="modal-action">
                                                            <button className="text-sm bg-black text-white  px-4 py-2 rounded-md" onClick={closeModal}>Close</button>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}

export default PurchaseDetailPage