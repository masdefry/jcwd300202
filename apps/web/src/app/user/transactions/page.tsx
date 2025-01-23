'use client'

import React, { useState, useEffect } from 'react'      
import { useQuery } from '@tanstack/react-query'     
import { useMutation } from '@tanstack/react-query'; 
import { useSearchParams, useRouter } from 'next/navigation'
import instance from '@/utils/axiosInstance'  
import Link from 'next/link'       
import LoadingMain from '@/app/loading'   
import { toast, Toaster } from 'react-hot-toast';

const TransactionPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  const toggleAccordion = () => {
    setIsOpen((prev) => !prev)
  }

  const { data: transaction, isLoading: isLoadingTransaction, refetch } = useQuery({
    queryKey: ['getTransaction'],
    queryFn: async() => {
      const res = await instance.get(`/transaction/all`, {

      })
      console.log(res.data.data)
      return res.data.data
    },
  })

  const {mutate: mutateCancel, isPending: isPendingCancel} = useMutation({
    mutationFn: async(transactionId: any) => {
      return await instance.post(`/transaction/cancel/${transactionId}`)    
    },
    onSuccess: (data: any) => {
      toast.success('Cancellation successful!')
      router.push(`/user/transactions`)
    },
    onError: (error: any) => {
      console.log('ERROR', error)
    }
  })

  

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
      } catch (error) {
        console.error('Error fetching transaction:', error);
        if (retryCount < 1) { 
          setRetryCount((prev) => prev + 1);
        }
      }
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    const onFocus = () => {
      fetchData();
    };

    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [retryCount, refetch]); 

  if(isLoadingTransaction && isPendingCancel){
    return (
      <LoadingMain/>
    )
  }



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
                          <button onClick={openModal} className="border bg-white text-sm px-4 py-2 rounded-md shadow cursor-pointer">
                            Cancel
                          </button>

                          {/* Modal */}
                          {isModalOpen && (
                            <dialog open className="modal modal-bottom sm:modal-middle">
                              <div className="modal-box">
                                <div className='flex items-center gap-2'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                                      <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 3c9.4 0 17 7.6 17 17s-7.6 17-17 17S7 33.4 7 24 14.6 7 24 7zm0 7a2 2 0 100 4 2 2 0 000-4zm-0.02 6.98A1.5 1.5 0 0022.5 22.5v11a1.5 1.5 0 003 0v-11a1.5 1.5 0 00-1.52-1.52z" />
                                  </svg>
                                  <p className="text-sm">Do you wish to proceed with the cancellation?</p>
                                </div>
                                <div className="modal-action">
                                  <form method="dialog">
                                    <div className='flex items-center gap-3'>
                                      <button 
                                        className="px-4 py-2 bg-white border rounded text-xs"
                                        onClick={closeModal}
                                      >
                                        Cancel
                                      </button>
                                      <button 
                                        className="px-4 py-2 bg-black rounded text-white text-xs"
                                        onClick={()=> {
                                          mutateCancel(item.id); 
                                        }}
                                      >
                                        Proceed
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </dialog>
                          )}

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
                    <svg data-slot="icon" width={18} height={18} fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                    </svg>
                    <div className="min-h-min flex flex-col justify-start">
                      <p className="text-xs text-slate-500">Check Out</p>
                      <p className="text-sm font-bold">{dateFormatter.format(new Date(item.checkOutDate))}</p>
                    </div>
                  </div>
                  <div className="w-2/6 min-h-min flex items-center justify-end">
                    {item.transactionStatus[0]?.status === 'EXPIRED' || item.transactionStatus[0].status === 'CANCELLED' ? (
                      <Link href={`/user/purchase-detail/${item.id.split("ORDER_")[1]}`} className="border bg-white text-sm px-4 py-2 rounded-md shadow cursor-pointer">
                        Purchase Detail
                      </Link>
                    ): <p className="text-sm font-bold text-end">Expires at 1hr</p>}
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
