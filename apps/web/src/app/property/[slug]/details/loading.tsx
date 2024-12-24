'use client'

import CardSmall from '@/components/CardSmall'
// import SimpleMap from '@/components/SimpleMap'
import { Separator } from '@/components/ui/separator'
import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { LucideBedDouble } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { FaCheck, FaStar, FaWifi } from 'react-icons/fa'
import { GoChecklist } from 'react-icons/go'
import { IoIosArrowForward } from 'react-icons/io'
import { IoPerson, IoTimeOutline } from 'react-icons/io5'
import { MdAttachMoney, MdKeyboardArrowDown } from 'react-icons/md'
import { TbPawOff } from 'react-icons/tb'


const PropertyDetailPage = ({params}:{params : { slug: string }}) => {
  const { data: dataPropertyDetail, isPending: isPendingPropertyDetail } = useQuery({
    queryKey: ['getPropertyDetail'],
    queryFn: async() => {
        const res = await instance.get(`/property/${params.slug}`)
        console.log(res)
        return res?.data?.data?.property
    }
  })  

  const review = `The rental experience was excellent from start to finish. 
                The property was exactly as described—clean, well-maintained, and located in a convenient area. 
                Communication was smooth, with any questions or concerns addressed promptly. 
                The move-in process was seamless, and I felt comfortable and at ease during my entire stay. 
                Overall, it was a hassle-free and enjoyable rental experience that I would highly recommend to others.`  
  return (
    <main className='p-10 flex flex-col gap-10'>
        <section className='grid grid-cols-5 gap-5 w-full h-[600px]'>
            {
                Array.from({length: 8}).map((item, index) => {
                    let className
                    if(index === 0) {
                        className = 'overflow-hidden relative rounded-md bg-slate-300 w-full h-full col-span-3 row-span-6'
                    } else if(index === 1 || index === 2) {
                        className = 'overflow-hidden relative rounded-md bg-slate-300 w-full h-full col-span-2 row-span-3'
                    } else {
                        className = 'overflow-hidden relative rounded-md bg-slate-300 w-full h-full col-span-1 row-span-2'
                    }
                    if(index === 7) {
                        return (
                            <figure className={className}>
                                <Image 
                                src={`http://localhost:5000/api/src/public/images/property_${index + 1}_images_1.jpg`}
                                width={800}
                                height={800}
                                alt=''
                                className='h-full w-full object-cover'
                                />
                                <div className='rounded-md absolute top-0 left-0 w-full h-full hover:bg-opacity-60 bg-black bg-opacity-40 flex items-center justify-center'>
                                    <p className='text-xl text-white font-bold hover:cursor-pointer hover:underline transition duration-100'>+10 Photos</p>
                                </div>
                            </figure>
                        )
                    }
                    return(
                        <figure className={className}>
                            <Image 
                            src={`http://localhost:5000/api/src/public/images/property_${index + 1}_images_1.jpg`}
                            width={800}
                            height={800}
                            alt=''
                            className='h-full w-full object-cover'
                            />
                        </figure>
                    )
                })
            }
        </section>
        <hgroup className='flex flex-col leading-3 gap-2'>
            <h1 className='text-5xl font-bold tracking-wide'>Pan Pacific Jakarta</h1>
            <p className='text-base font-light text-gray-700 flex items-center gap-2'><CiLocationOn size={23} className='text-red-600' />Jalan M.H. Thamrin, 10230 Jakarta, Indonesia</p>
        </hgroup>
        <section className='grid grid-cols-3 gap-5 h-[400px] rounded-md bg-white'>
            <section id='review' className='h-[400px] flex flex-col gap-5 col-span-1 row-span-3 rounded-md drop-shadow-md bg-white w-full p-5'>
                <hgroup className='flex items-center gap-3 w-full'>
                    <p className='text-xl font-bold text-white bg-gray-800 shadow-md rounded-2xl p-3 border border-slate-300'>9.8</p>
                    <div className='flex flex-col gap-1 w-full'>
                        <p className='text-lg font-bold'>Spectacular</p>
                        <div className='flex justify-between items-center w-full'>
                            <p className='text-sm font-light text-gray-600'>Reviews from <b className='text-blue-600 font-bold hover:underline hover:cursor-pointer'>2.700 verified guests</b></p>
                            <IoIosArrowForward size={20}/>
                        </div>
                    </div>
                </hgroup>
                <section className='p-1 overflow-y-scroll scrollbar-thumb-slate-300 scrollbar-track-white scrollbar-thin scrollbar-thumb-rounded-full'>
                    <section id='comments' className='flex flex-col gap-3'>
                    {
                        Array.from({length: 5}).map((_,index) => {
                            return (
                            <div key={index} className='p-3 rounded-md border border-slate-300 flex flex-col gap-1.5'>
                                <hgroup className='flex justify-between items-center'>
                                    <p className='text-sm font-bold text-gray-800'>Adit</p>
                                    <div className='flex items-center gap-1'>
                                        {
                                            Array.from({length: 9}).map((_, index) => {
                                                return (
                                                    <FaStar key={index} size={10} className='text-yellow-400'/>
                                                )
                                            })
                                        }
                                    </div>
                                </hgroup>
                                <article className='text-sm font-light text-gray-900 text-justify'>
                                    {
                                        review.length > 200 ? (
                                        <p className='flex flex-col gap-2'>{review.slice(0,200)}... <b className='text-blue-600 font-bold hover:underline hover:cursor-pointer'>Read more</b></p>
                                        ) : review
                                    }
                                
                                </article>
                            </div>

                            )
                        })
                    }
                    </section>
                </section>
            </section>
            <section id='map' className=' col-span-1 rounded-md drop-shadow-md row-span-2 w-full h-full overflow-hidden'>
            {/* <SimpleMap /> */}
            </section>
            <section className='p-5 flex flex-col gap-5 col-span-1 rounded-md drop-shadow-md bg-white row-span-2'>
                <hgroup className='flex items-center justify-between'>
                    <h1 className='text-base text-gray-800 font-bold'>Property Highlighted Facilities</h1>
                    <span className='text-sm font-bold flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:cursor-pointer'>
                    Details
                    <IoIosArrowForward size={16} className='mt-1'/>
                    </span>
                </hgroup>
                <Separator/>
                <section className='grid grid-cols-2 gap-5' >
                    {
                        Array.from({ length: 8 }).map((_, index) => {
                            return(
                                <div className='flex text-sm tracking-wide items-center gap-2'><FaWifi  size={18}/>Free wifi</div>
                            )
                        })
                    }
                </section>
            </section>
            <article className='text-sm font-light text-justify p-5 flex flex-col pjustify-between leading-relaxed col-span-2 rounded-md drop-shadow-md bg-white row-span-1'>
                <p>
                    Berlokasi terbaik di wilayah Menteng di Jakarta, Ashley Tugu Tani Menteng berlokasi kurang dari 1 km dari Stasiun Gambir, 
                    17 menit jalan kaki dari Monumen Nasional, dan 1,4 km dari Sarinah. 
                    Selain WiFi gratis, hotel bintang 4 ini menawarkan layanan kamar dan resepsionis 24 jam. 
                    Terdapat restoran yang menyajikan hidangan Indonesia, dan parkir pribadi tersedia gratis.
                </p>
                <p className='flex items-center gap-2 font-bold text-blue-600 hover:underline hover:cursor-pointer'>Read more<IoIosArrowForward size={20}/></p>
            </article>
        </section>
        <Separator />
        <div className='flex flex-col gap-5'>
            <p className='text-2xl font-bold'>Room Types Available in Pan Pacific Jakarta</p>
            <div className='flex items-center gap-2 bg-black text-sm font-bold p-3 rounded-md text-white'>
                <div className='bg-green-100 flex items-center rounded-full p-2'>
                    <GoChecklist size={18} className='text-green-600' /> 
                </div>
                <p>Choose the room type according to your needs</p>
            </div>
        </div>
        <section className='flex flex-col gap-5'>
            {
                Array.from({length: 5}).map((item, index) => {
                    return (
                    <section className='w-full grid grid-cols-3 gap-10 items-center rounded-md bg-white shadow-md p-3'>
                        <div className='w-full h-fit rounded-md flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>Deluxe</h1>
                            <figure className='bg-gray-500 rounded-3xl w-full h-[150px] overflow-hidden'>
                                <Image
                                src={`http://localhost:5000/api/src/public/images/property_${index + 1}_room_${index + 1 + (2 * index)}_images_1.jpg`}
                                width={500}
                                height={500}
                                alt=''
                                className='w-full h-full object-cover'
                                />
                            </figure>
                        </div>
                        <div className='col-span-2'>
                            <div className="overflow-x-auto">
                            <table className="table">
                                    {/* head */}
                                    <thead>
                                    <tr className='text-lg font-bold text-gray-800'>
                                        <th>Room Choice</th>
                                        <th className='text-center'>Guest</th>
                                        <th className='text-right'>Price/Room/Night</th>
                                        <th className='text-center'></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <td className='flex flex-col gap-2'>
                                            <p className='text-sm font-light text-gray-500'>Deluxe Room</p>
                                            <p className='text-base font-semibold text-black'>With breakfast for 2 people</p>
                                            <p className='flex items-center gap-2 text-green-600 text-sm font-semibold'><FaCheck size={18} />Include refund before 2 days check-in time</p>
                                            <p className='flex items-center gap-2 text-sm text-gray-500'><LucideBedDouble size={18}/>1 King Size Bed</p>
                                        </td>
                                        <td>
                                            <div className='mx-auto flex flex-wrap gap-2 items-center w-[100px] justify-center'>
                                                {
                                                    Array.from({length:10}).map((item, index) => {
                                                        return(
                                                            <IoPerson key={index} size={16}/>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </td>
                                        <td className='text-right '>
                                            <p className='text-xl mb-1 font-semibold'>Rp2000000</p>
                                            <p className='text-xs font-semibold text-gray-400'>Include taxes and price</p>
                                        </td>
                                        <td>
                                            <button className='my-auto text-lg font-semibold px-8 py-3 rounded-full bg-blue-600 text-white hover:opacity-75 active:scale-90 transition duration-100'>Book now</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                    )
                })
            }
            <button className='flex items-center gap-2 text-base font-bold px-6 py-3 hover:underline transition duration-100'><MdKeyboardArrowDown />See more room type</button>
        </section>
        <section id='another-recommendation' className='flex flex-col gap-5'>
            <hgroup>
                <h1 className='text-2xl font-bold text-gray-900'>Accommodation recommendations in Jakarta</h1>
                <p className='text-base font-light text-gray-600'>Find the best place to stay</p>
            </hgroup>
            <div className='carousel rounded-none flex gap-4 h-fit py-2'>
                {
                    Array.from({length: 10}).map((_, index) => {
                        return(
                        <div key={index} className='carousel-item hover:opacity-65 transition duration-100 hover:cursor-pointer'>
                            <CardSmall
                            isPending={false}
                            level={'template'}
                            propertyName='Template'
                            city='Template'
                            country='Template'
                            ratingAvg={9.8}
                            totalReviews={30}
                            price={20000000}
                            imageUrl={`http://localhost:5000/api/src/public/images/property_${index + 1}_images_1.jpg`}
                            />
                        </div> 
                        )
                    })
                }
            </div>
        </section>
        <section id='property-facilities' className='rounded-3xl flex flex-col gap-5 bg-white shadow-md p-5'>
            <hgroup>
                <h1 className='text-2xl font-bold text-gray-900'>Property Facility</h1>
                <p className='text-base font-light text-gray-600'>Get all these facilities from this property</p>
            </hgroup>
            <section className='grid grid-cols-2'>
                <div className='grid grid-cols-2 h-fit gap-4'>
                    {
                        Array.from({length: 10}).map((_,index) => {
                            return(
                                <div key={index} className='flex items-center gap-2 text-sm'><FaWifi />Free Wifi</div>
                            )
                        })
                    }
                </div>
                <div className='grid grid-cols-2 h-fit gap-4'>
                    {
                        Array.from({length: 10}).map((_,index) => {
                            return(
                                <div key={index} className='flex items-center gap-2 text-sm'><FaWifi />Free Wifi</div>
                            )
                        })
                    }
                </div>
            </section>
        </section>
        <section className='grid grid-cols-3 gap-5'>
            <div className='bg-slate-200 rounded-l-md'></div>
            <div className='col-span-2 flex flex-col w-full'>
                <div id='ci-co-time' className='flex items-center gap-3 border-b border-slate-300 w-full py-3'>
                    <div><IoTimeOutline size={30} className='text-gray-400'/></div>
                    <article className='flex flex-col gap-1 text-sm'>
                        <h1 className='font-bold text-gray-900'>Check-in/Check-out Time</h1>
                        <span className='flex items-center gap-5 text-gray-600'>
                            <p>Check-in from: <b className='text-gray-700'>After 14.00</b></p>
                            <p>Check-out at: <b className='text-gray-700'>Before 12:00</b></p>
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
                    <div><TbPawOff size={30} className='text-red-600'/></div>
                    <article className='flex flex-col gap-1 text-sm'>
                        <h1 className='font-bold text-gray-900'>Pet Policy</h1>
                        <p className='text-gray-600'>Pets are <b className='text-gray-700'>prohibited</b> at this accommodation</p>
                    </article>
                </div>
            </div>
        </section>
    </main>
  )
}

export default PropertyDetailPage
