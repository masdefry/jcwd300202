'use client'

import React, { useState } from 'react'      
import { useQuery } from '@tanstack/react-query'     
import { useMutation } from '@tanstack/react-query'; 
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import instance from '@/utils/axiosInstance'  
import Link from 'next/link'

const PaymentPage = () => {

    const {id} = useParams()

    const { data: transaction, isPending } = useQuery({
        queryKey: ['getTransaction', id],
        queryFn: async() => {
          const res = await instance.get(`/transaction/${id}`, {
    
          })
          console.log(res)
          return res
        }
    })

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })


    return (
        <main className='w-full h-screen'>
            <section className='m-auto max-w-screen-2xl w-full h-full flex items-start gap-5'>
                <div className='bg-white border w-full min-h-min rounded-lg'>
                    <div className='flex items-center justify-between'>
                        <p></p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default PaymentPage