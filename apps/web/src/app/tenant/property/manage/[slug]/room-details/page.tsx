'use client'

import React from 'react'
import { BsDoorOpen } from 'react-icons/bs'
import { IoCameraOutline } from 'react-icons/io5'
import Image from 'next/image'
import { MdOutlinePeople } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import Link from 'next/link'
import { CiCirclePlus } from 'react-icons/ci'
import { FaMoneyBillWave } from 'react-icons/fa6'

const PropertyManageRoomDetailsPage = ({ params }: { params: { slug: string } }) => {
    const { data: dataPropertyRoomTypes, isPending: isPendingPropertyRoomTypes } = useQuery({
        queryKey: ['getPropertyRoomTypes'],
        queryFn: async() => {
            const res = await instance.get(`/room-type/property/${params?.slug}/search`)
            return res?.data?.data
        }
    })
  return (
    <main className='flex flex-col gap-7 py-5'>
        <hgroup className='flex flex-col px-5'>
        <h1 className='text-lg font-bold text-gray-800'>Room Details</h1>
        <p className='text-sm font-medium text-slate-600'>Easily Manage Your Space: Update Room Details Anytime, Anywhere</p>
        </hgroup>
        <section className='flex flex-wrap gap-3 p-5'>
            {
                dataPropertyRoomTypes?.propertyRoomType.map((item: any, index: number) => {
                    return (
                    <div key={index} className='flex flex-col h-[350px] w-[250px] rounded-2xl overflow-hidden shadow-md border border-slate-200'>   
                        <figure className='w-full h-[50%] bg-blue-200 relative'>
                            <Image
                            src={`http://localhost:5000/api/${item?.propertyRoomImage[0]?.directory}/${item?.propertyRoomImage[0]?.filename}.${item?.propertyRoomImage[0]?.fileExtension}`}
                            width={500}
                            height={500}
                            alt=''
                            className='w-full h-full object-cover'
                            />
                            <p className='absolute w-full bottom-0 left-0 p-3 bg-black bg-opacity-20 backdrop-blur-sm text-white font-bold'>{item?.name}</p>
                        </figure>
                        <section className='p-2 flex flex-col justify-between h-[50%] w-full text-sm font-bold text-gray-600'>
                            <article className='flex flex-col'>
                                <p className='flex items-center gap-1.5'><MdOutlinePeople className='text-base text-violet-800'/>Capacity: <span className='font-medium'>{item?.capacity} guest</span></p>
                                <p className='flex items-center gap-1.5'><BsDoorOpen className='text-base text-amber-500'/>Total number this room: <span className='font-medium'>{item?.totalRooms}</span></p>
                                <p className='flex items-center gap-1.5'><FaMoneyBillWave className='text-base text-emerald-500'/>Base price: <span className='font-medium'>Rp{item?.price}</span></p>
                            </article>
                            <section className='flex gap-1.5'>
                                <Link href={`/tenant/property/manage/${params.slug}/room-details/edit/${item?.id}`}  className='bg-gray-900 rounded-full text-white text-sm font-bold px-4 py-1.5 hover:opacity-65 transition duration-100 active:scale-90 hover:cursor-pointer'>
                                    Edit
                                </Link>
                                <Link href={`/tenant/property/manage/${params.slug}/room-details/edit/${item?.id}/photos`}  className='bg-gray-900 rounded-full text-white text-base font-bold px-4 py-1.5 hover:opacity-65 transition duration-100 active:scale-90 hover:cursor-pointer flex items-center justify-center'>
                                   <IoCameraOutline />
                                </Link>
                                <div className='bg-red-700 rounded-full text-white text-sm font-bold px-4 py-1.5 hover:opacity-65 transition duration-100 active:scale-90 hover:cursor-pointer'>Delete</div>
                            </section>
                        </section>
                    </div>
                    )
                })
            }
            <div className='flex flex-col gap-1 items-center justify-center text-lg font-bold text-gray-900 h-[350px] w-[250px] rounded-2xl overflow-hidden shadow-md border-2 border-slate-800 hover:bg-slate-800 hover:text-white transition duration-100 hover:cursor-pointer active:scale-95'>
                <CiCirclePlus className='text-2xl'/>
                <p>Add a new room</p>
            </div>
        </section>
    </main>
  )
}

export default PropertyManageRoomDetailsPage
