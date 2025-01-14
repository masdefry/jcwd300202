'use client'

import CardSmall from '@/components/CardSmall'
// import SimpleMap from '@/components/SimpleMap'
import { Separator } from '@/components/ui/separator'
import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LucideBedDouble, LucideShowerHead } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdAttachMoney, MdKeyboardArrowDown, MdOutlineEmojiFoodBeverage, MdOutlineMeetingRoom } from 'react-icons/md'
import Link from 'next/link'
import authStore from '@/zustand/authStore' 
import { useRouter } from 'next/navigation' 
import { RiCloseFill } from 'react-icons/ri'
import { MdPeopleOutline } from "react-icons/md";
import useFilterRoomHook from '@/features/property/details/hooks/useFilterRoomHook'
import useShowRoomDetailHook from '@/features/property/details/hooks/useShowRoomDetailHook'
import PropertyImages from '@/features/property/components/PropertyImages'
import PropertyDetailDescription from '@/features/property/details/components/PropertyDetailDescription'
import SearchRoomsAvailability from '@/features/property/details/components/SearchRoomsAvailability'
import HGroupPropertyDetail from '@/features/property/details/components/HGroupPropertyDetail'
import PropertyRoomDetailList from '@/features/property/details/components/PropertyRoomDetailList'
import PropertyDetailFacilities from '@/features/property/details/components/PropertyDetailFacilities'
import PropertyDetailPolicies from '@/features/property/details/components/PropertyDetailPolicies'
import { addDays } from 'date-fns'
import NotFoundMain from '@/app/not-found'

const PropertyDetailPage = ({params, searchParams}:{params : { slug: string }, searchParams: any}) => {
    const [ showMoreDescription, setShowMoreDescription ] = useState(false)
    const [ showPropertyImages, setShowPropertyImages ] = useState(false)
    const [ dataPropertyRoomType, setDataPropertyRoomType ] = useState<any>([])
    const [ isError, setIsError ] = useState(false)
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
    const urlParams = new URLSearchParams({})
    const handleSearchParams = (orderBy: string, value: string) => {
        const currParams = window.location.href.includes('/search?')
          ? window.location.href.split('?')[1].split('&')
          : null
        currParams &&
          currParams.forEach((item: any) => {
            urlParams.set(item.split('=')[0], decodeURIComponent(item.split('=')[1]))
          })
        urlParams.set(orderBy, value)
        window.history.pushState({}, '', '?' + urlParams.toString())
      }

    const token = authStore(state => state.token)
    const role = authStore(state => state.role)
    const router = useRouter()
    const [ dataPropertyDetail, setDataPropertyDetail ] = useState<any>()
    const [ isPendingPropertyDetail, setIsPendingPropertyDetail ] = useState(true)
    const fetchDataPropertyDetail = async() => {
        try {
            const res = await instance.get(`/property/${params?.slug}/search`)
            mutatePropertyRoomType({ limit: 2, offset: 0 })
            if(res?.status === 200) {
                setDataPropertyDetail(res?.data?.data)
                console.log(res?.data?.data)
                setIsPendingPropertyDetail(false)
            } else {
                setIsError(true)
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    const createHistory = async() => {
        try {
            const res = await instance.post(`/history/${params?.slug}`)
            if(res?.status === 200) {
                console.log(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // const { data: dataPropertyDetail, isPending: isPendingPropertyDetail } = useQuery({
    //     queryKey: ['getPropertyDetail'],
    //     queryFn: async() => {
    //         const res = await instance.get(`/property/${params?.slug}/search`)
    //         mutatePropertyRoomType({ limit: 2, offset: 0 })

    //         return res?.data?.data
    //     }
    //   })
    useEffect(() => {
        if(searchParams['check-in-date'] && searchParams['check-out-date']) {
            setDateRange([ new Date(searchParams['check-in-date']), new Date(searchParams['check-out-date'])])
        }
        fetchDataPropertyDetail()
        createHistory()
    }, [])

  const { mutate: mutatePropertyRoomType, isPending: isPendingPropertyRoomType } = useMutation({
    mutationFn: async({ limit, offset, checkInDate, checkOutDate }: { limit?: number, offset?: number, checkInDate?: Date, checkOutDate?: Date }) => {
        if(limit && offset) {
            handleSearchParams('limit', limit.toString())
            handleSearchParams('offset', offset.toString()) 
            if(searchParams['check-in-date'] && searchParams['check-out-date']) {
                handleSearchParams('check-in-date', searchParams['check-in-date'])
                handleSearchParams('check-out-date', searchParams['check-out-date'])
                handleSearchParams('capacity', searchParams?.capacity)
            }
        } else if(checkInDate && checkOutDate) {
            handleSearchParams('check-in-date', checkInDate.toISOString())
            handleSearchParams('check-out-date', checkOutDate.toISOString())
            handleSearchParams('capacity', (adult + children).toString())
        }
        const res = await instance.get(`/room-type/property/${params?.slug}/search?limit=${limit || '2'}&offset=${offset || '0'}&checkInDate=${checkInDate || searchParams['check-in-date'] || new Date().toISOString()}&checkOutDate=${checkOutDate || searchParams['check-out-date'] || addDays(new Date(), 1).toISOString()}&capacity=${adult + children || searchParams['capacity'] || 1}`)
        return res?.data
    },
    onSuccess: (res) => {
        setDataPropertyRoomType(res?.data)
    },
    onError: (err: any) => {
        console.log(err?.response?.data?.message)
    }
  })

  if(isError) {
    return (
        <div>
            <NotFoundMain />
        </div>
    )
  }
 
  return (
    <main className='w-full min-h-min 2xl:py-5 pb-5'>
        <section className='m-auto max-w-screen-xl flex flex-col gap-7'>
        <PropertyImages showPropertyImages={showPropertyImages} setShowPropertyImages={setShowPropertyImages} dataPropertyDetail={dataPropertyDetail} isPending={isPendingPropertyDetail}/>
        <HGroupPropertyDetail dataPropertyDetail={dataPropertyDetail} isPending={isPendingPropertyDetail}/>
        <PropertyDetailDescription showMoreDescription={showMoreDescription} setShowMoreDescription={setShowMoreDescription} dataPropertyDetail={dataPropertyDetail}  isPending={isPendingPropertyDetail}/>

        <Separator />
        <SearchRoomsAvailability mutatePropertyRoomType={mutatePropertyRoomType} handleGuest={handleGuest} dateRange={dateRange} setDateRange={setDateRange} checkInDate={checkInDate} checkOutDate={checkOutDate} dataPropertyDetail={dataPropertyDetail} setShowGuestCounter={setShowGuestCounter} showGuestCounter={showGuestCounter} adult={adult} children={children} isPending={isPendingPropertyDetail}/>
        <PropertyRoomDetailList dataPropertyRoomType={dataPropertyRoomType} isPending={isPendingPropertyRoomType || isPendingPropertyDetail} setShowDataRoom={setShowDataRoom} token={token} searchParams={searchParams} mutatePropertyRoomType={mutatePropertyRoomType} dataPropertyDetail={dataPropertyDetail} role={role} checkInDate={checkInDate} checkOutDate={checkOutDate} />
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
        <PropertyDetailFacilities dataPropertyDetail={dataPropertyDetail} isPending={isPendingPropertyDetail}/>
        <PropertyDetailPolicies dataPropertyDetail={dataPropertyDetail} isPending={isPendingPropertyDetail}/>
        </section>
    </main>
  )
}

export default PropertyDetailPage
