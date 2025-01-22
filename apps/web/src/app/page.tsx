'use client'

import Image from 'next/image'
import styles from './page.module.css'
import CityRecommendationCard from '@/features/home/components/CityRecommendationCard'
import Hero from '@/features/home/components/Hero'
import { useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import Card from '@/components/Card'
import authStore from '@/zustand/authStore'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function Home() {
  const token = authStore(state => state.token)
  const role = authStore(state => state.role)
  const isVerified = authStore(state => state.isVerified)
  const { 
    data: dataLandingPage, 
    isPending: isPendingDataLandingPage, 
    isError: isErrorDataLandingPage
    } = useQuery({
    queryKey: ['getLandingPageData'],
    queryFn: async() => {
      const res = await instance.get('/landing-page')
      return res.data
    }
  })

  const {
    data: dataPropertiesByUser,
    isPending: isPendingPropertiesByUser,
  } = useQuery({
    queryKey: ['getPropertiesByUser'],
    queryFn: async() => {
      const res = await instance.get('/property/user')
      return res?.data?.data
    }
  })

  if(isPendingDataLandingPage) {
    return (
      <main className='flex flex-col gap-5 md:gap-12 lg:gap-16 lg:p-16 md:p-12 sm:p-8 p-4'>
      <section className='m-auto max-w-screen-xl w-full h-full'>
      <section className='flex flex-col gap-3 md:gap-12 lg:gap-16'>
        
        <section className='grid grid-cols-1 lg:grid-cols-2 h-fit gap-3 md:gap-6'>
          {
            Array.from({length: 5}).map((item: any, index: number) => {
              if(index < 2) {
                return(
                  <div key={index}>
                    <CityRecommendationCard
                    isPending={true} 
                    imgSrc=''
                    alt={item?.name.toLowerCase().split(' ').join('-')}
                    city='loading'
                    country='loading'
                    h1Size='text-3xl'
                    />
                  </div>
              )
              }
            })
          }
        </section>
        <section className='grid grid-cols-1 lg:grid-cols-3 h-fit gap-3 md:gap-6'>
          {
            Array.from({length: 5}).map((item: any, index: number) => {
              if(index >= 2) {
                return(
                  <div key={index}>
                    <CityRecommendationCard
                    isPending={true} 
                    imgSrc=''
                    alt={item?.name.toLowerCase().split(' ').join('-')}
                    city='loading'
                    country='loading'
                    h1Size='text-3xl'
                    />
                  </div>
              )
              }
            })
          }
        </section>
      </section>
      </section>
      <section className='relative'>
          <Hero isPending={true}/>
      </section>
      {
        Array.from({length: 3}).map((_, index) => {
          return (
        <section key={index} className='m-auto max-w-screen-xl w-full h-full'>
        <section className='flex flex-col gap-5'>
          <hgroup className='flex flex-col '>
            <h1 className='skeleton lg:text-3xl font-bold text-lg md:text-3xl w-fit text-transparent rounded-none bg-slate-300 '>Explore Property</h1>
            <p className='skeleton md:text-base text-sm font-medium text-transparent rounded-none mt-1 w-fit bg-slate-300 '>See, book, and stay in our partner properties</p>
          </hgroup>
          <div className="carousel rounded-none flex gap-3 md:gap-5 h-fit py-2">
          {
            Array.from({length: 5}).map((item: any, idx: number) => {
              return (
              <div className="carousel-item  transition duration-100" key={idx}>
               
                <Card 
                        isPending={true}
                        propertyType='loading'
                        propertyName='loading'
                        city='loading'
                        country='loading'
                        ratingAvg={100}
                        totalReviews={100}
                        price={50000000}
                        imageUrl=''
                        />
              </div>
              )
            })
          }
          </div>
        </section>
        </section>
          )
        })
      }
    </main>
    )
  }

  if(isErrorDataLandingPage) {
    return (
      <main>

      </main>
    )
  }


  return (

    <main className='flex flex-col gap-5 md:gap-12 lg:gap-16 lg:p-16 md:p-12 sm:p-8 p-4'>
      <section className='m-auto max-w-screen-xl w-full h-full'>
      <section className='flex flex-col gap-3 md:gap-12 lg:gap-16'>
        
        <section className='grid grid-cols-1 lg:grid-cols-2 h-fit gap-3 md:gap-6'>
          {
            dataLandingPage?.data?.cities?.map((item: any, index: number) => {
              if(index < 2) {
                return(
                <Link key={index} href={`/explore/search?city=${item?.id}`}>
                  <div>
                    <CityRecommendationCard
                    isPending={isPendingDataLandingPage} 
                    imgSrc={`http://localhost:5000/api/${item?.directory}/${item?.filename}.jpg`}
                    alt={item?.name.toLowerCase().split(' ').join('-')}
                    city={item?.name}
                    country={item?.country?.name}
                    h1Size='text-3xl'
                    />
                  </div>
                </Link>
              )
            }
            })
          }
        </section>
        <section className='grid grid-cols-1 lg:grid-cols-3 h-fit gap-3 md:gap-6'>
          {
            dataLandingPage?.data?.cities?.map((item: any, index: number) => {
              if(index >= 2) {
                return(
                <Link key={index} href={`/explore/search?city=${item?.id}`}>
                  <div key={index}>
                    <CityRecommendationCard
                    isPending={isPendingDataLandingPage} 
                    imgSrc={`http://localhost:5000/api/${item?.directory}/${item?.filename}.jpg`}
                    alt={item?.name.toLowerCase().split(' ').join('-')}
                    city={item?.name}
                    country={item?.country?.name}
                    h1Size='text-3xl'
                    />
                  </div>
                </Link>
              )
              }
            })
          }
        </section>
      </section>
      </section>
      <section className='relative '>
          <Hero isPending={isPendingDataLandingPage}/>
      </section>
      <section className='m-auto max-w-screen-xl w-full h-full'>
      <section className='flex flex-col gap-5'>
        <hgroup className='flex flex-col'>
          <h1 className='lg:text-3xl font-bold text-lg md:text-3xl text-gray-900'>Explore Property</h1>
          <p className='md:text-base text-sm font-medium text-gray-600'>See, book, and stay in our partner properties</p>
        </hgroup>
        <div className="carousel rounded-none flex gap-3 md:gap-5 h-fit py-2">
        {
          dataLandingPage?.data?.properties.map((item: any, index: number) => {
            return (
            <div className="carousel-item hover:cursor-pointer md:hover:translate-y-2 transition duration-100 active:opacity-75" key={index}>
              <Link href={`/property/${item?.slug}/details`}>
                <Card 
                isPending={isPendingDataLandingPage}
                propertyType={item?.propertyType?.name}
                propertyName={item?.name}
                city={item?.city?.name}
                country={item?.country?.name}
                ratingAvg={0}
                totalReviews={item?.review?.length}
                price={item?.propertyRoomType[0]?.price}
                imageUrl={`http://localhost:5000/api/${item.propertyDetail.propertyImage[0].directory}/${item.propertyDetail.propertyImage[0].filename}.jpg`}
                />
              </Link>
            </div>
            )
          })
        }
        </div>
      </section>
      </section>
      {
        (token && (role === 'USER')) && (
        <section className='m-auto max-w-screen-xl w-full h-full'>
        <section className='flex flex-col gap-5'>
          <hgroup className='flex flex-col'>
            <h1 className='lg:text-3xl font-bold text-lg md:text-3xl text-gray-900'>Recent Property Bookings</h1>
            <p className='md:text-base text-sm font-medium text-gray-600'>Your Rental Journey, All in One Place</p>
          </hgroup>
          {
            Array.isArray(dataPropertiesByUser?.propertyByRecentBooks) && dataPropertiesByUser?.propertyByRecentBooks.length <= 0 ? (
            <div className='flex flex-col gap-1 text-center justify-center w-full'>
              <h1 className='text-gray-300 lg:text-2xl md:text-xl text-base font-bold'>Oops, Seems you don't have any transactions</h1>
              <p className='text-gray-300 md:text-base text-xs font-medium'>Explore Roomify and book any properties you want</p>
            </div>
            ):(
            <div className="carousel rounded-none flex gap-3 md:gap-5 h-fit py-2">
                { 
                  dataPropertiesByUser?.propertyByRecentBooks.map((item: any, index: number) => {
                    return (
                    <div className="carousel-item hover:cursor-pointer md:hover:translate-y-2 transition duration-100 active:opacity-75" key={index}>
                      <Link href={`/property/${item?.slug}/details`}>
                        <Card 
                        isPending={isPendingDataLandingPage}
                        propertyType={item?.propertyType?.name}
                        propertyName={item?.name}
                        city={item?.city?.name}
                        country={item?.country?.name}
                        ratingAvg={0}
                        totalReviews={item?.review?.length}
                        price={item?.propertyRoomType[0]?.price}
                        imageUrl={`http://localhost:5000/api/${item.propertyDetail.propertyImage[0].directory}/${item.propertyDetail.propertyImage[0].filename}.jpg`}
                        />
                      </Link>
                    </div>
                    )
                  })
                }
            </div>
            )
          }
        </section>
        </section>
        )
      }
      {
        (token && (role === 'USER')) && (
        <section className='m-auto max-w-screen-xl w-full h-full'>
        <section className='flex flex-col gap-5'>
          <hgroup className='flex flex-col'>
            <h1 className='lg:text-3xl font-bold text-lg md:text-3xl text-gray-900'>Last Seen</h1>
            <p className='md:text-base text-sm font-medium text-gray-600'>Your Rental History, Just a Click Away</p>
          </hgroup>
          {
            Array.isArray(dataPropertiesByUser?.propertyByHistoryView) && dataPropertiesByUser?.propertyByHistoryView.length <= 0 ? (
            <div className='flex flex-col gap-1 text-center justify-center w-full'>
              <h1 className='text-gray-300 lg:text-2xl md:text-xl text-base font-bold'>Oops, Seems you don't have explore Roomify</h1>
              <p className='text-gray-300 md:text-base text-xs font-medium'>Explore Roomify and look any properties you want</p>
            </div>
            ):(
            <div className="carousel rounded-none flex gap-3 md:gap-5 h-fit py-2">
                { 
                  dataPropertiesByUser?.propertyByHistoryView.map((item: any, index: number) => {
                    return (
                  <div className="carousel-item hover:cursor-pointer md:hover:translate-y-2 transition duration-100 active:opacity-75" key={index}>
                    <Link href={`/property/${item?.slug}/details`}>
                      <Card 
                      isPending={isPendingDataLandingPage}
                      propertyType={item?.propertyType?.name}
                      propertyName={item?.name}
                      city={item?.city?.name}
                      country={item?.country?.name}
                      ratingAvg={0}
                      totalReviews={item?.review?.length}
                      price={item?.propertyRoomType[0]?.price}
                      imageUrl={`http://localhost:5000/api/${item.propertyDetail.propertyImage[0].directory}/${item.propertyDetail.propertyImage[0].filename}.jpg`}
                      />
                    </Link>
                  </div>
                    )
                  })
                }
            </div>
            )
          }
        </section>
        </section>

        )
      }     
    </main>
  )
}