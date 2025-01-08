'use client'

import CardSmall from '@/components/CardSmall'
// import SimpleMap from '@/components/SimpleMap'
import { Separator } from '@/components/ui/separator'
import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LucideBedDouble, LucideShowerHead } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { CiLocationOn, CiSignpostR1 } from 'react-icons/ci'
import { FaCheck, FaStar, FaWifi } from 'react-icons/fa'
import { GoChecklist } from 'react-icons/go'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { IoPerson, IoPersonOutline, IoSearchOutline, IoTimeOutline } from 'react-icons/io5'
import { MdAttachMoney, MdKeyboardArrowDown, MdOutlineEmojiFoodBeverage, MdOutlineMeetingRoom } from 'react-icons/md'
import ImageCarousel from '@/features/property/components/ImageCarousel'
import Link from 'next/link'
import authStore from '@/zustand/authStore' 
import { useRouter } from 'next/navigation' 
import toast from 'react-hot-toast'
import { RiCloseFill } from 'react-icons/ri'
import { MdPeopleOutline } from "react-icons/md";
import DatePickerWithPrices from '@/features/property/components/DatePickerWithPrices'
import useFilterRoomHook from '@/features/property/details/hooks/useFilterRoomHook'
import useShowRoomDetailHook from '@/features/property/details/hooks/useShowRoomDetailHook'
import PropertyImages from '@/features/property/components/PropertyImages'

const PropertyDetailPage = ({params, searchParams}:{params : { slug: string }, searchParams: any}) => {
    const [ showMoreDescription, setShowMoreDescription ] = useState(false)
    const [ showPropertyImages, setShowPropertyImages ] = useState(false)
    const [ dataPropertyRoomType, setDataPropertyRoomType ] = useState<any>([])
    const {
        checkInDate,
        checkOutDate,
        setDateRange,
        dateRange,
        handleGuest,
        showGuestCounter,
        setShowGuestCounter,
        adult,
        children,
        setAdult,
        setChildren
    } = useFilterRoomHook()
    const {
        showDataRoom, 
        setShowDataRoom,
        currSlideRoomImages, 
        setCurrSlideRoomImages,
        prevRoomImage, 
        nextRoomImage
    } = useShowRoomDetailHook()


    const token = authStore(state => state.token)
    const router = useRouter()
    const handleUnauthorizedUser = () => {
        toast.error('Please Login First!')
    }
    const { data: dataPropertyDetail, isPending: isPendingPropertyDetail } = useQuery({
        queryKey: ['getPropertyDetail'],
        queryFn: async() => {
            const res = await instance.get(`/property/${params?.slug}/search`)
            mutatePropertyRoomType({ limit: 2, offset: 0, propertyId: res?.data?.data?.property?.id })

            return res?.data?.data
        }
      })

    useQuery({
        queryKey: ['createHistoryView'],
        queryFn: async() => {
            const res = await instance.post(`/history/${params?.slug}`)
            console.log(res)
            
            return res?.data?.data
        }
      })
  
  const { mutate: mutatePropertyRoomType, isPending: isPendingPropertyRoomType } = useMutation({
    mutationFn: async({ limit, offset, propertyId }: { limit: number, offset: number, propertyId: string }) => {
        const res = await instance.get(`/room-type/property/${params?.slug}/search?limit=${limit}&offset=${offset}`)
        return res?.data
    },
    onSuccess: (res) => {
        setDataPropertyRoomType(res?.data)
        console.log(res?.message)
    },
    onError: (err: any) => {
        console.log(err?.response?.data?.message)
    }
  })


  const review = `The rental experience was excellent from start to finish. 
                The property was exactly as described—clean, well-maintained, and located in a convenient area. 
                Communication was smooth, with any questions or concerns addressed promptly. 
                The move-in process was seamless, and I felt comfortable and at ease during my entire stay. 
                Overall, it was a hassle-free and enjoyable rental experience that I would highly recommend to others.`  
  return (
    <main className='w-full min-h-min 2xl:py-5 pb-5'>
        <section className='m-auto max-w-screen-xl flex flex-col gap-7'>
        <PropertyImages showPropertyImages={showPropertyImages} setShowPropertyImages={setShowPropertyImages} dataPropertyDetail={dataPropertyDetail} />
        <hgroup className='flex flex-col leading-3 2xl:gap-2 2xl:p-0 px-5 '>
            <h1 className='text-lg lg:text-xl 2xl:text-4xl font-bold tracking-wide text-gray-900'>{dataPropertyDetail?.property?.name}</h1>
            <p className='text-sm 2xl:text-base font-medium text-gray-700 flex items-center gap-2'><CiLocationOn size={23} className='text-red-600 md:flex hidden' />{dataPropertyDetail?.property?.address}</p>
            <p className='text-xs 2xl:text-sm font-medium 2xl:font-light text-gray-600 flex items-center gap-2'><CiSignpostR1 size={23} className='text-gray-600 md:flex hidden' />Zip Code: {dataPropertyDetail?.property?.zipCode}</p>
        </hgroup>
        <section className={`${(dataPropertyDetail?.reviews && dataPropertyDetail?.reviews.length > 0 )? 'grid grid-cols-3 h-[400px]' : 'flex flex-col'} 2xl:p-0 px-5 gap-5 rounded-md bg-white`}>
            {
                (dataPropertyDetail?.reviews && dataPropertyDetail?.reviews.length > 0) && (
                    <section id='review' className='h-[400px] flex flex-col gap-5 col-span-1 row-span-3 rounded-md drop-shadow-md bg-white w-full p-5'>
                        <hgroup className='flex items-center gap-3 w-full'>
                            <p className='text-xl font-bold text-white bg-gray-800 shadow-md rounded-2xl p-3 border border-slate-300'>9.8</p>
                            <div className='flex flex-col gap-1 w-full'>
                                <p className='text-lg font-bold'>Spectacular</p>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='text-sm font-light text-gray-600'>Reviews from <b className='text-blue-600 font-bold hover:underline hover:cursor-pointer'>{dataPropertyDetail?.reviews?.length} verified guests</b></p>
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
                )
            }
            <section id='map' className='max-h-[200px] col-span-1 rounded-md drop-shadow-md row-span-2 w-full h-full overflow-hidden'>
            {/* <SimpleMap latitudeAndLongitude={dataPropertyDetail?.property?.location.split(', ').map((item: string) => Number(item))} /> */}
            </section>
            <section className='p-5 flex flex-col gap-5 col-span-1 rounded-md drop-shadow-md bg-white row-span-2'>
                <hgroup className='flex items-center justify-between'>
                    <h1 className='text-base text-gray-800 font-bold'>Property Highlighted Facilities</h1>
                </hgroup>
                <Separator/>
                <section className='grid grid-cols-2 gap-5' >
                    {
                        dataPropertyDetail?.propertyFacilities?.slice(0,8).map((item: any, index: number) => {
                            return(
                                <div key={index} className='flex text-sm tracking-wide items-center gap-2'>
                                    <figure>
                                        <Image
                                        src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                                        width={100}
                                        height={100}
                                        alt=''
                                        className='h-4 w-4'
                                        />    
                                    </figure>
                                    <p>{item?.name}</p>
                                </div>
                            )
                        })
                    }
                </section>
            </section>
            <article className='text-sm font-light text-justify p-5 flex flex-col pjustify-between leading-relaxed col-span-2 rounded-md drop-shadow-md bg-white row-span-1'>
                <p>
                    {dataPropertyDetail?.propertyDetail?.propertyDescription}
                </p>
                <p className='my-2'>
                    {showMoreDescription && dataPropertyDetail?.propertyDetail?.neighborhoodDescription}
                </p>
                <button type='button' onClick={() => setShowMoreDescription(state => !state)} className='flex items-center gap-2 font-bold text-blue-600 hover:underline hover:cursor-pointer'>{showMoreDescription ?  (<p className='flex items-center gap-2'>Less Description</p>) : (<p className='flex items-center gap-2'>Read more<IoIosArrowForward size={20}/></p>)}</button>
            </article>
        </section>
        <Separator />
        <div className='flex flex-col gap-5 2xl:p-0 px-5'>
            <p className='text-lg md:text-xl 2xl:text-2xl font-bold'>Room Availability in {dataPropertyDetail?.property?.name}</p>
            <div className='flex items-center gap-2 bg-gray-900 text-sm font-medium md:font-bold p-3 rounded-md text-white'>
                <div className='bg-green-100 flex items-center rounded-full p-2'>
                    <GoChecklist size={18} className='text-green-600' /> 
                </div>
                <p className='md:text-sm text-xs font-bold'>Choose the room type according to your needs</p>
            </div>
            <div className='relative flex items-center justify-center w-full rounded-md  bg-white shadow-md border border-slate-200'>
                <div className='p-4 overflow-x-auto'>
                    <div className=' flex items-center justify-center bg-amber-400 rounded-md p-[1px]'>
                        <div>
                            <DatePickerWithPrices dateRange={dateRange} setDateRange={setDateRange} checkInDate={checkInDate} checkOutDate={checkOutDate} basePrice={dataPropertyDetail?.basePrice} dateAndPrice={dataPropertyDetail?.dateAndPrice} />
                        </div>
                        <button onClick={() => setShowGuestCounter(true)} className='min-w-max bg-white text-xs font-semibold text-gray-800 px-2 py-2 pr-5 flex items-center gap-3 border-2 border-amber-400 '><IoPersonOutline />{adult} Adult . {children} Children . 1 Room</button>
                        <button className='bg-blue-800 hover:opacity-75 transition duration-100 text-xs font-semibold text-white px-2 py-2 pr-5 flex items-center gap-3 rounded-r-md border-2 border-amber-400 '><IoSearchOutline />Search</button>
                    </div>
                </div>
                {
                    showGuestCounter && (
                    <div className='sm:w-fit w-full absolute top-[55px] border-2 border-gray-900 2xl:left-[47%] lg:left-[45%] left-0 sm:left-[43%] z-30 bg-white rounded-md text-sm font-bold flex flex-col gap-4 p-3 shadow-md'>
                        <div className='text-gray-950 text-lg w-full flex justify-end'>
                            <RiCloseFill onClick={() => setShowGuestCounter(false)} className='hover:opacity-60 transition duration-100 hover:cursor-pointer z-10'/>
                        </div>
                        <h1 className='text-base font-gray-800 pb-2 border-b border-slate-300 mt-[-20px]'>Total Guest</h1>
                        <div className='flex items-center gap-5 justify-between'>
                            <p className='text-gray-900'>Adult:</p>
                            <span className='flex items-center gap-1.5'>
                            <span onClick={() => handleGuest('adult', 'minus')} className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>-</span>
                                {adult}
                            <span onClick={() => handleGuest('adult', 'plus')} className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>+</span>
                            </span>
                        </div>
                        <div className='flex items-center gap-5 justify-between'>
                            <p className='text-gray-900'>Children:</p>
                            <span className='flex items-center gap-1.5'>
                            <span onClick={() => handleGuest('children', 'minus')} className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>-</span>
                                {children}
                            <span onClick={() => handleGuest('children', 'plus')} className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>+</span>
                            </span>
                        </div>
                    </div>
                    )
                }
            </div>
            {/* <div className='fixed top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full'>
                <div className='bg-white rounded-md text-sm font-bold flex flex-col gap-4 p-5 shadow-md'>
                    <h1 className='text-base font-gray-800 pb-2 border-b border-slate-300'>Total Guest</h1>
                    <div className='flex items-center gap-5 justify-between'>
                        <p className='text-gray-900'>Adult:</p>
                        <span className='flex items-center gap-1.5'>
                        <span className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>-</span>
                        1
                        <span className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>+</span>
                        </span>
                    </div>
                    <div className='flex items-center gap-5 justify-between'>
                        <p className='text-gray-900'>Children:</p>
                        <span className='flex items-center gap-1.5'>
                        <span className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>-</span>
                        1
                        <span className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>+</span>
                        </span>
                    </div>
                </div>
                
            </div> */}
        </div>
        <section className='flex flex-col gap-5 2xl:p-0 px-5'>
            { 
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
                                        <th className='text-right'>Price/Room/Night</th>
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
                                                            <div key={index} className='flex sm:text-sm font-medium text-slate-800 text-xs tracking-wide items-center gap-2'>
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
                                        </td>
                                        <td className='w-[200px]'>
                                            {
                                                token ? (
                                                    <Link href={`/booking/${item?.id}/details?check-in-date=${searchParams['check-in-date']}&check-out-date=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}`}>
                                                        <button disabled={item?.totalRoomsLeft <= 0} className='disabled:bg-slate-300 disabled:opacity-100 disabled:text-white disabled:scale-100 my-auto italic text-sm font-bold min-w-max px-8 py-3 rounded-full bg-blue-800 text-white hover:opacity-75 active:scale-95 transition duration-100' type='button'>{item?.totalRoomsLeft <= 0 ? 'Not available' : 'Book now'}</button>
                                                    </Link>
                                                ) : (
                                                    <Link href='/auth'>
                                                        <button  disabled={item?.totalRoomsLeft <= 0} className='disabled:bg-slate-300 disabled:opacity-100 disabled:text-white disabled:scale-100 my-auto italic text-sm font-bold min-w-max px-8 py-3 rounded-full bg-blue-800 text-white hover:opacity-75 active:scale-95 transition duration-100' type='button'>{item?.totalRoomsLeft <= 0 ? 'Not available' : 'Book now'}</button>
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
                                <button key={index} onClick={() => mutatePropertyRoomType({ limit: 2, offset: index * 2, propertyId: dataPropertyDetail?.property?.id  })} className="join-item btn btn-sm">{index + 1}</button>
                            )
                        })
                    }
                </div>
            </div>
        </section>
        {
            showDataRoom.name && (
            <section className='fixed top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm w-full h-full z-[53] flex items-center justify-center px-5'>
                <div className='bg-white rounded-lg shadow-md p-5 h-[600px] max-w-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 my-5 scrollbar-track-transparent'>
                    <div className='flex flex-col gap-5'>
                        <div className='text-gray-950 text-lg w-full flex justify-end'>
                            <RiCloseFill 
                            onClick={() => setShowDataRoom({
                            roomImages: [],
                            roomHasFacilities: [],
                            name: '',
                            description: '', 
                            rooms: 0,
                            capacity: 0,
                            bathrooms: 0,
                            price: 0
                            })} className='hover:opacity-60 transition duration-100 hover:cursor-pointer'/></div>
                        <div className='h-[300px] w-full bg-blue-200 rounded-md relative overflow-hidden'>
                            <div className={`flex items-center h-full w-[${showDataRoom?.roomImages.length * 100}] transition-transform ease-in-out duration-1000`} style={{transform: `translateX(-${currSlideRoomImages/showDataRoom?.roomImages.length * 100}%)`}}>
                                {
                                    showDataRoom?.roomImages.map((itm: any, idx: number) => {
                                        return (
                                            <figure className={`w-full h-full`} key={idx}>
                                                <Image
                                                src={`http://localhost:5000/api/${itm?.directory}/${itm?.filename}.${itm?.fileExtension}`}
                                                width={500}
                                                height={500}
                                                alt=''
                                                className='h-full w-full object-cover'
                                                />    
                                            </figure>
                                        )
                                    })
                                }
                            </div>
                        
                        <div className='text-gray-600 text-lg absolute top-0 h-full flex items-center right-3'>
                            <div onClick={() => nextRoomImage({ roomImagesLength: showDataRoom?.roomImages.length })} className='rounded-full bg-white p-2 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90'>
                                <IoIosArrowForward /> 
                            </div>
                        </div>
                        <div className='text-gray-600 text-lg absolute top-0 h-full flex items-center left-3'>
                            <div  onClick={() => prevRoomImage({ roomImagesLength: showDataRoom?.roomImages.length })} className='rounded-full bg-white p-2 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90'>
                                <IoIosArrowBack /> 
                            </div>
                        </div>

                        </div>
                        
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-white font-bold text-lg p-3 rounded-md bg-slate-900'>{showDataRoom?.name}</h1>
                            <p className='text-sm font-medium text-gray-600 text-justify'>{showDataRoom?.description}
                            </p>
                            <div className='flex flex-col gap-3'>
                                <h1 className='text-lg font-bold text-gray-900'>Room Facility</h1>
                                <div className='grid grid-cols-2 2xl:grid-cols-3 gap-2'>
                                {
                                    showDataRoom?.roomHasFacilities?.map((itm: any, idx: number) => {
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
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='flex items-center gap-1.5 text-sm font-medium text-gray-900'>
                                    <MdPeopleOutline className='text-md'/>
                                    <p className='font-bold'>Capacity</p>
                                    <p>{showDataRoom?.capacity}</p>
                                </span>
                                <span className='flex items-center gap-1.5 text-sm font-medium text-gray-900'>
                                    <MdOutlineMeetingRoom className='text-md' />
                                    <p className='font-bold'>Rooms</p>
                                    <p>{showDataRoom?.rooms || 1}</p>
                                </span>
                                <span className='flex items-center gap-1.5 text-sm font-medium text-gray-900'>
                                    <LucideShowerHead className='text-md'/>
                                    <p className='font-bold'>Bathrooms</p>
                                    <p>{showDataRoom?.bathrooms}</p>
                                </span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            )
        }
        {
            dataPropertyDetail?.propertyListByCity.length > 0 && (
            <section id='another-recommendation' className='flex flex-col gap-5 2xl:p-0 px-5'>
                <hgroup>
                    <h1 className='text-lg md:text-xl 2xl:text-2xl font-bold text-gray-900'>Accommodation recommendations in {dataPropertyDetail?.city?.name}</h1>
                    <p className='text-sm md:text-base font-medium md:font-light  text-gray-600'>Find the best place to stay</p>
                </hgroup>
                <div className='carousel rounded-none flex gap-4 h-fit py-2'>
                    {
                        dataPropertyDetail?.propertyListByCity?.map((item: any, idx: number) => {
                            return(
                            <Link key={idx} href={`/property/${item?.slug}/details`}>
                            <div className='carousel-item hover:opacity-65 transition duration-100 hover:cursor-pointer'>
                                <CardSmall
                                isPending={false}
                                level={'template'}
                                propertyName={item?.name}
                                city={item?.city?.name}
                                country={item?.country?.name}
                                ratingAvg={0}
                                totalReviews={item?.review?.length}
                                price={item?.propertyRoomType[0]?.price}
                                imageUrl={`http://localhost:5000/api/${item?.propertyDetail?.propertyImage[0]?.directory}/${item?.propertyDetail?.propertyImage[0]?.filename}.${item?.propertyDetail?.propertyImage[0]?.fileExtension}`}
                                />
                            </div> 
                            </Link>
                            )
                        })
                    }
                </div>
            </section>
            )
        }
        <section id='property-facilities' className='rounded-3xl flex flex-col gap-5 bg-white shadow-md p-5 mx-5 2xl:mx-0'>
            <hgroup>
                <h1 className='text-lg md:text-xl 2xl:text-2xl font-bold'>Property Facility</h1>
                <p className='text-sm md:text-base font-medium md:font-light  text-gray-600'>Get all these facilities from this property</p>
            </hgroup>
            <section className='grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-5'>
                    {
                        dataPropertyDetail?.propertyFacilities?.map((item: any, index: number) => {
                            return(
                                <div key={index} className='flex sm:text-sm font-medium text-slate-800 text-xs tracking-wide items-center gap-2'>
                                    <figure>
                                        <Image
                                        src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                                        width={100}
                                        height={100}
                                        alt=''
                                        className='h-4 w-4'
                                        />    
                                    </figure>
                                    <p>{item?.name}</p>
                                </div>
                            )
                        })
                    }
            </section>
        </section>
        <section className='grid grid-cols-3 gap-5 2xl:p-0 px-5'>
            <div className='overflow-hidden col-span-3 2xl:col-span-1 rounded-t-3xl 2xl:rounded-l-3xl relative h-[150px] 2xl:h-[210px]'>
                <figure className='w-full h-full object-cover overflow-hidden'>
                    {
                        Array.isArray(dataPropertyDetail?.propertyImages) && (
                            <Image
                            src={`http://localhost:5000/api/${dataPropertyDetail?.propertyImages[0]?.directory}/${dataPropertyDetail?.propertyImages[0]?.filename}.${dataPropertyDetail?.propertyImages[0]?.fileExtension}`}
                            width={500}
                            height={500}
                            alt=''
                            className='h-full w-full object-cover'
                            />
                        )
                    }
                </figure>
                <h1 className='absolute left-0 top-0 p-5 w-full h-full bg-black bg-opacity-45 text-lg md:text-xl font-bold text-white text-left'>Accommodation Policy & General Information at {dataPropertyDetail?.property?.name}</h1>
            </div>
            <div className='col-span-3 2xl:col-span-2 flex flex-col w-full'>
                <div id='ci-co-time' className='flex items-center gap-3 border-b border-slate-300 w-full py-3'>
                    <div><IoTimeOutline size={30} className='text-gray-400'/></div>
                    <article className='flex flex-col gap-1 text-sm'>
                        <h1 className='font-bold text-gray-900'>Check-in/Check-out Time</h1>
                        <span className='flex items-center gap-5 text-gray-600'>
                            <p>Check-in from: <b className='text-gray-700'>{dataPropertyDetail?.property?.checkInStartTime.split('T')[1]?.slice(0, 5)} -  {dataPropertyDetail?.property?.checkInEndTime?.split('T')[1].slice(0, 5)}</b></p>
                            <p>Check-out at: <b className='text-gray-700'>{dataPropertyDetail?.property?.checkOutStartTime.split('T')[1]?.slice(0, 5)} -  {dataPropertyDetail?.property?.checkOutEndTime?.split('T')[1].slice(0, 5)}</b></p>
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
                    <div><MdOutlineEmojiFoodBeverage size={30} className='text-blue-600'/></div>
                    <article className='flex flex-col gap-1 text-sm'>
                        <h1 className='font-bold text-gray-900'>Breakfast</h1>
                        <p className='text-gray-600'> Breakfast facilities for guests follow property <b className='text-gray-700'>management policies</b></p>
                    </article>
                </div>
            </div>
        </section>
        </section>
    </main>
  )
}

export default PropertyDetailPage
