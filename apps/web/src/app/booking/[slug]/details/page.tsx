'use client'

import React from 'react'
import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'

const BookingPage = ({ params }: { params: { slug: string }}) => {

  const searchParams = useSearchParams()
  const router = useRouter()
  const checkInDate = searchParams.get('check-in-date')
  const checkOutDate = searchParams.get('check-out-date')
  const adult = searchParams.get('adult')
  const children = searchParams.get('children')

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const dateCheckIn = checkInDate ? dateFormatter.format(new Date(checkInDate)) : 'Invalid Date'
  const dateCheckOut = checkOutDate ? dateFormatter.format(new Date(checkOutDate)) : 'Invalid Date'

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })




  console.log('Check-in Date: test', checkInDate);
  console.log('Check-out Date: test', checkOutDate);
  console.log('Adults: test', adult);
  console.log('Children: test', children);

  const { data: dataPropertyRoomType, isPending: isPendingPropertyRoomType } = useQuery({
    queryKey: ['getPropertyRoomType', params.slug, searchParams],
    queryFn: async() => {
        const res = await instance.get(`/room-type/${params.slug}`, {
          params: { checkInDate, checkOutDate, adult, children }
        })
        console.log('BOOKING >>>', res.data.data.propertyRoomType)
        console.log('data', res.data.data)
        return res.data.data.propertyRoomType
    }
  })

  const {mutate: mutateTransaction, isPending: isPendingTransaction } = useMutation({
    mutationFn: async(transactionDetails: any) => {
      return await instance.post(`/transaction/create`, transactionDetails)
    },
    onSuccess: (data: any) => {
      router.push(`/transactions/${params.slug}`)
    },
    onError: (error: any) => {
      console.log('ERROR', error)
    }
    
  })

  if(isPendingPropertyRoomType){
    return (
        <div>Please wait</div>
    )
  }



    
  return (
    <main className='w-full h-screen'>
      <section className='m-auto max-w-screen-xl w-full h-full flex items-start justify-center gap-5 relative'>
        {dataPropertyRoomType?.map((item: any, index: number) => {
          return (
            <div key={index} className='flex gap-3'>
              <div className='flex flex-col gap-3'>
                <div className="collapse bg-white w-[50rem] min-h-min rounded">
                  <div className="collapse-title">
                    <div className="w-full min-h-min flex items-start gap-3">
                      <div className="bg-[#e2e8f0] w-[20rem] h-[14rem] rounded-md">
                        <Image 
                          src={`http://localhost:5000/api/${item.propertyRoomImage[0].directory}/${item.propertyRoomImage[0].filename}.${item.propertyRoomImage[0].fileExtension}`}
                          width={400} 
                          height={400} 
                          alt='Proprty Image'
                          className='object-cover w-full h-full rounded-md'
                          />
                      </div>
                      <div className="min-h-min flex flex-col gap-3">
                        <p className="text-[25px] font-bold">{item.name}</p>
                        <p>2 King sized bed</p>
                        <button className="text-sm underline w-[5rem] flex justify-start">See details</button>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-content">
                    <div className="w-full min-h-min flex flex-col items-end justify-end gap-3">
                      <p className='text-sm'>Rp<span className="text-[25px] font-bold">3200000</span></p>
                      <button className="rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200">Book this room</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 relative p-3">
                <div className='bg-white w-[30rem] min-h-min border rounded sticky top-3 p-3'>
                  <p className='text-sm mt-2'>PAN PACIFIC JAKARTA</p>
                  <p className='text-md uppercase font-bold'>{item.name}</p>
                  <p className='text-xs'>CHECK IN 2.00 PM | CHECK OUT 12.00 PM</p>
                  <hr className='mt-3'/>
                  <p className='text-xs mt-3'>{dateCheckIn} - {dateCheckOut}</p>
                  <div className='flex items-center justify-start gap-3 mt-3'>
                    <div className='flex items-center justify-start gap-2 mt-2'>
                      <svg data-slot="icon" width="17" height="17" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
                      </svg>
                      <p className='text-sm'>{adult} adults</p>
                    </div>
                    <div className='flex items-center justify-start gap-2 mt-2'>
                      <svg data-slot="icon" width="17" height="17" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
                      </svg>
                      <p className='text-sm'>{children} children</p>
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
                    <p className='text-xs font-medium'>RP <span className='font-bold text-sm'>{item.price}</span></p>
                  </div>
                  <button 
                    onClick={() =>
                      mutateTransaction({
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        price: Number(item.price),
                        qty: 1,
                        adult: String(adult),
                        children: String(children),
                        tenantId: item.property.tenantId,
                        propertyId: item.propertyId,
                        roomId: item.id
                      })
                    }
                    disabled={isPendingTransaction}
                    className="w-full rounded-full bg-[#e2e8f0] text-black px-7 py-3 mt-10 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200">Continue</button>
                </div>
              </div> 
            </div>
          )
        })}
      </section>

    </main>
  )
}

export default BookingPage
