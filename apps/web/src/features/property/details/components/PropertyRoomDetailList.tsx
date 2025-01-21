'use client'

import Image from 'next/image'
import React from 'react'
import { IoPerson } from 'react-icons/io5'
import Link from 'next/link'
import { differenceInDays } from 'date-fns'
import { usePathname } from 'next/navigation'
import { IoIosSearch } from 'react-icons/io'

const PropertyRoomDetailList = ({ dataPropertyRoomType, isPending, setShowDataRoom, token, searchParams, handlePropertyRoomType, dataPropertyDetail, role, checkInDate, checkOutDate }: any) => {
  
    if(isPending) {
      return (
      
      <section className='flex flex-col gap-5 2xl:p-0 px-5'>
      { 
          Array.from({length: 2}).map((item: any, index: number) => {
              return (
              <section key={index} className='w-full grid grid-cols-3 gap-5 2xl:gap-10 items-center rounded-md bg-white shadow-md p-3'>
                  <div className='w-full rounded-md flex flex-col gap-2 2xl:col-span-1 col-span-3'>
                      <h1 className='text-base sm:text-lg text-transparent skeleton bg-slate-300 rounded-none font-bold w-fit'>Penthouse Oceanview</h1>
                      <figure className='bg-gray-200 skeleton rounded-lg 2xl:rounded-3xl w-full h-[150px] overflow-hidden 2xl:shadow-none shadow-md'>

                      </figure>
                      <div className='ml-5 text-left skeleton text-transparent w-fit bg-slate-300 rounded-none text-xs md:text-sm font-bold  '>Room details</div>
                  </div>
                  <div className='2xl:col-span-2 col-span-3'>
                      <div className="overflow-x-auto 2xl:border-none border-2 border-slate-200 rounded-md">
                      <table className="table min-w-max">
                              <thead>
                              <tr className='text-base font-bold text-transparent'>
                                  <th className='text-transparent bg-slate-300 rounded-none w-fit'>Room Choice</th>
                                  <th className='text-transparent bg-slate-300 rounded-none w-fit'>Guest</th>
                                  <th className='text-transparent bg-slate-300 rounded-none w-fit'>Price/Room</th>
                                  <th className='text-transparent bg-slate-300 rounded-none text-center w-[200px] '></th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td className='flex flex-col gap-2 w-[300px]'>
                                      <p className='sm:flex hidden text-sm font-light skeleton text-transparent bg-slate-300 rounded-none w-fit'>Deluxe Room</p>
                                      <p className='lg:text-base text-sm font-semibold skeleton text-transparent bg-slate-300 rounded-none w-fit'>With breakfast for 2 people</p>
                                      <section className='grid grid-cols-2 gap-1 justify-between' >
                                          {
                                              Array.from({length: 4}).map((itm: any, idx: number) => {
                                                  return(
                                                      <div key={idx} className='flex sm:text-sm font-medium text-transparent text-xs tracking-wide items-center gap-2'>
                                                          <figure className='h-4 w-4 rounded-full bg-slate-300 skeleton'>
                                                          </figure>
                                                          <p className='skeleton  bg-slate-300 rounded-none w-fit'>My Room</p>
                                                      </div>
                                                  )
                                              })
                                          }
                                      </section>
                                  </td>
                                  <td>
                                      <div className='mx-auto flex flex-wrap gap-2 items-center w-[100px] justify-center'>
                                          {
                                              Array.from({length:2}).map((item, index) => {
                                                  return(
                                                    <figure key={index} className='h-5 w-5 rounded-full bg-slate-300 skeleton'>
                                                          </figure>
                                                  )
                                              })
                                          }
                                      </div>
                                  </td>
                                  <td className='text-right'>
                                      <p className='text-lg mb-1 font-bold text-transparent skeleton rounded-none w-fit bg-slate-300'>Rp5000000</p>
                                      <p className='text-xs font-semibold text-transparent skeleton rounded-none w-fit bg-slate-300'>Include taxes and price</p>
                                  </td>
                                  <td className='w-[200px]'>
                                    <div className=' my-auto italic text-sm font-bold min-w-max px-8 py-3 rounded-full bg-gray-200 text-transparent skeleton ' >Book Now</div>
                                     
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
      <div id='pagination-button' className='w-full flex justify-center'>
          <div className="join">
              {
                  Array.from({ length: 3 }).map((_, index) => {
                      return(
                          <button key={index} disabled={true} className="disabled:text-transparent disabled:border-none join-item btn btn-sm bg-gray-200 text-transparent">{index + 1}</button>
                      )
                  })
              }
          </div>
      </div>
    </section>
    )

    }
  
    return (
    
    <section className='flex flex-col gap-5 2xl:p-0 px-5'>
    { dataPropertyRoomType?.propertyRoomTypeWithSeasonalPrice?.length > 0 ? (
        dataPropertyRoomType?.propertyRoomTypeWithSeasonalPrice?.map((item: any, index: number) => {
            return (
            <section key={index} className='w-full grid grid-cols-3 gap-5 2xl:gap-10 items-center rounded-md bg-white shadow-md p-3'>
                <div className='w-full rounded-md flex flex-col gap-2 2xl:col-span-1 col-span-3'>
                    <h1 className='text-base sm:text-lg text-gray-900 font-bold'>{item?.name}</h1>
                    <figure className='bg-blue-200 rounded-lg 2xl:rounded-3xl w-full h-[150px] overflow-hidden 2xl:shadow-none shadow-md'>
                        <Image
                        src={`http://localhost:5000/api/${item?.propertyRoomImage[0]?.directory}/${item?.propertyRoomImage[0]?.filename}.${item?.propertyRoomImage[0]?.fileExtension}`}
                        width={500}
                        height={500}
                        alt=''
                        className='w-full h-full object-cover'
                        />
                    </figure>
                    <button onClick={() => {
                        setShowDataRoom({
                            roomImages: item?.propertyRoomImage,
                            roomHasFacilities: item?.roomHasFacilities,
                            name: item?.name,
                            rooms: item?.rooms,
                            price: item?.price,
                            description: item?.description,
                            bathrooms: item?.bathrooms,
                            capacity: item?.capacity
                        })
                    }} className='ml-5 text-left text-blue-800 text-xs md:text-sm font-bold hover:underline active:opacity-60 transition duration-100'>Room details</button>
                </div>
                <div className='2xl:col-span-2 col-span-3'>
                    <div className="overflow-x-auto 2xl:border-none border-2 border-amber-400 rounded-md">
                    <table className="table min-w-max">
                            <thead>
                            <tr className='text-base font-bold text-gray-800'>
                                <th>Room Choice</th>
                                <th className='text-center'>Guest</th>
                                <th className='text-right'>Price/Room</th>
                                <th className='text-center w-[200px]'></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className='flex flex-col gap-2 w-[300px]'>
                                    <p className='sm:flex hidden text-sm font-light text-gray-500'>{item?.name} Room</p>
                                    <p className='lg:text-base text-sm font-semibold text-gray-800'>{dataPropertyRoomType?.isIncludeBreakfast[index] ? `With breakfast for ${item?.capacity} people` : 'Without breakfast'}</p>
                                    <section className='grid grid-cols-2 justify-between' >
                                        {
                                            item?.roomHasFacilities.slice(0,4).map((itm: any, idx: number) => {
                                                return(
                                                    <div key={idx} className='flex sm:text-sm font-medium text-slate-800 text-xs tracking-wide items-center gap-2'>
                                                        <figure>
                                                            <Image
                                                            src={`http://localhost:5000/api/${itm?.propertyRoomFacility?.iconDirectory}/${itm?.propertyRoomFacility?.iconFilename}.${itm?.propertyRoomFacility?.iconFileExtension}`}
                                                            width={100}
                                                            height={100}
                                                            alt=''
                                                            className='h-4 w-4'
                                                            />    
                                                        </figure>
                                                        <p>{itm?.propertyRoomFacility?.name}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </section>
                                </td>
                                <td>
                                    <div className='mx-auto flex flex-wrap gap-2 items-center w-[100px] justify-center'>
                                        {
                                            Array.from({length:item?.capacity}).map((item, index) => {
                                                return(
                                                    <IoPerson key={index} size={16}/>
                                                )
                                            })
                                        }
                                    </div>
                                </td>
                                <td className='text-right'>
                                    {
                                        item?.normalTotalPrice > item?.totalPrice && (
                                            <p className='text-sm font-bold line-through text-gray-600'>Rp{item?.normalTotalPrice}</p>
                                        )
                                    }
                                    <p className='text-lg mb-1 font-bold text-orange-500'>Rp{item?.totalPrice}</p>
                                    <p className='text-xs font-semibold text-gray-400'>Include taxes and price</p>
                                    <p className='text-xs font-semibold text-gray-800'>for {item?.totalNights || 1} Nights</p>
                                </td>
                                <td className='w-[200px]'>
                                    {
                                        token ? (
                                            <Link href={`/booking/${item?.id}/details?check-in-date=${searchParams['check-in-date']}&check-out-date=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}`}>
                                                <button disabled={item?.totalRoomsLeft <= 0 || !item?.isAvailable || role !== 'USER'} className='disabled:bg-slate-300 disabled:opacity-100 disabled:text-white disabled:scale-100 my-auto italic text-sm font-bold min-w-max px-8 py-3 rounded-full bg-blue-800 text-white hover:opacity-75 active:scale-95 transition duration-100' type='button'>{(item?.totalRoomsLeft <= 0 || !item?.isAvailable)  ? 'Not available' : 'Book now'}</button>
                                            </Link>
                                        ) : (
                                            <Link href='/auth'>
                                                <button  disabled={item?.totalRoomsLeft <= 0 || !item?.isAvailable || role !== 'USER'} className='disabled:bg-slate-300 disabled:opacity-100 disabled:text-white disabled:scale-100 my-auto italic text-sm font-bold min-w-max px-8 py-3 rounded-full bg-blue-800 text-white hover:opacity-75 active:scale-95 transition duration-100' type='button'>{(item?.totalRoomsLeft <= 0 || !item?.isAvailable)  ? 'Not available' : 'Book now'}</button>
                                            </Link>
                                        )
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            )
        })
    ) : (
            <section className='w-full flex justify-center items-center rounded-md bg-white shadow-md p-3 py-12'>
                <p className='text-center w-full text-slate-300 text-base justify-center 2xl:text-lg font-bold flex items-center gap-1.5'><IoIosSearch size={30}/>Room type not found! Maybe it's on vacation.</p>
            </section>
    )
    }
    <div id='pagination-button' className='w-full flex justify-center'>
        <div className="join">
            {
                Array.from({ length: dataPropertyRoomType?.totalPage }).map((_, index) => {
                    if(index + 1 === dataPropertyRoomType?.pageInUse) {
                        return (
                            <button key={index} disabled className="join-item btn btn-sm">{index + 1}</button>
                        )
                    }
                    return(
                        <button key={index} onClick={() => handlePropertyRoomType({ limit: 2, offset: index * 2, propertyId: dataPropertyDetail?.property?.id  })} className="join-item btn btn-sm">{index + 1}</button>
                    )
                })
            }
        </div>
    </div>
</section>
  )
}

export default PropertyRoomDetailList
