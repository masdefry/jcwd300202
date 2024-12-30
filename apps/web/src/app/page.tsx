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


  if(isPendingDataLandingPage) {
    return (
      <main className='flex flex-col gap-12 lg:gap-16 lg:p-16 md:p-12 sm:p-8 p-4'>
      <section className='grid grid-cols-1 lg:grid-cols-2 h-fit gap-10'>
        {
          Array.from({length: 2}).map((item, index) => {
            return(
              <div key= {index}>
                <CityRecommendationCard
                isPending={isPendingDataLandingPage} 
                imgSrc=''
                alt='loading'
                city='loading'
                country='loading'
                h1Size='lg:text-5xl text-3xl'
                />
              </div>
            )
          })
        }
      </section>
      <section className='grid grid-cols-1 lg:grid-cols-3 h-fit gap-10'>
        {
          Array.from({length: 3}).map((item, index) => {
            return(
              <div key={index}>
                <CityRecommendationCard
                isPending={isPendingDataLandingPage} 
                imgSrc=''
                alt='loading'
                city='loading'
                country='loading'
                h1Size='text-3xl'
                />
              </div>
            )
          })
        }
      </section>
      <section className='relative right-4 sm:right-8 md:right-12 lg:right-16'>
          <Hero isPending={isPendingDataLandingPage}/>
      </section>
      <section className='flex flex-col gap-5'>
        <hgroup className='flex flex-col gap-2'>
          <h1 className={`lg:text-4xl font-bold text-3xl w-fit ${isPendingDataLandingPage && 'skeleton text-transparent'}`}>Loading</h1>
          <p className={`lg:text-lg text-base font-light w-fit ${isPendingDataLandingPage && 'skeleton text-transparent'}`}>You can book the property you want</p>
        </hgroup>
        <div className={`${isPendingDataLandingPage ? 'overflow-hidden' : 'carousel'} rounded-none flex gap-8`}>
            {
              Array.from({length: 6}).map((item, index) => {
                return (
                <div className="carousel-item" key={index}>
                  <Card isPending={isPendingDataLandingPage}/>
                </div>
                )
              })
            }
        </div>
      </section>
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
        <section className='grid grid-cols-1 lg:grid-cols-2 h-fit gap-3 md:gap-7 lg:gap-10'>
          {
            dataLandingPage?.data?.cities?.map((item: any, index: number) => {
              if(index < 2) {
                return(
                <div key={index}>
                  <CityRecommendationCard
                  isPending={isPendingDataLandingPage} 
                  imgSrc={`http://localhost:5000/api/${item?.directory}/${item?.filename}.jpg`}
                  alt={item?.name.toLowerCase().split(' ').join('-')}
                  city={item?.name}
                  country={item?.country?.name}
                  h1Size='lg:text-5xl text-3xl'
                  />
                </div>
              )
              }
            })
          }
        </section>
        <section className='grid grid-cols-1 lg:grid-cols-3 h-fit gap-3 md:gap-7 lg:gap-10'>
          {
            dataLandingPage?.data?.cities?.map((item: any, index: number) => {
              if(index >= 2) {
                return(
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
              )
              }
            })
          }
        </section>
      </section>
      </section>
      <section className='relative right-4 sm:right-8 md:right-12 lg:right-16'>
          <Hero isPending={isPendingDataLandingPage}/>
      </section>
      <section className='m-auto max-w-screen-xl w-full h-full'>
      <section className='flex flex-col gap-5'>
        <hgroup className='flex flex-col lg:gap-2 md:gap-1'>
          <h1 className='lg:text-4xl font-bold text-lg md:text-3xl'>Recent Property Bookings</h1>
          <p className='lg:text-lg md:text-base text-sm font-light'>Book back the property you like</p>
        </hgroup>
        {
          dataLandingPage?.data?.propertyByRecentBooks ? (
          <div className='flex flex-col gap-1 text-center justify-center w-full'>
            <h1 className='text-gray-300 lg:text-2xl md:text-xl text-base font-bold'>Oops, Seems you don't have any transactions</h1>
            <p className='text-gray-300 md:text-base text-xs font-medium'>Explore Roomify and book any properties you want</p>
          </div>
          ):(
          <div className="carousel rounded-none flex gap-5 h-fit py-2">
              { 
                dataLandingPage?.data?.propertyByRecentBooks.map((item: any, index: number) => {
                  return (
                  <div className="carousel-item" key={index}>
                    <Card 
                    isPending={isPendingDataLandingPage}
                    propertyType={item?.propertyType?.name}
                    propertyName={item?.name}
                    city={item?.city?.name}
                    country={item?.country?.name}
                    ratingAvg={0}
                    totalReviews={item?.review?.length}
                    price={0}
                    imageUrl={`http://localhost:5000/api/${item.propertyDetail.propertyImage[0].directory}/${item.propertyDetail.propertyImage[0].filename}.jpg`}
                    />
                  </div>
                  )
                })
              }
          </div>
          )
        }
      </section>
      </section>
      {
        token && (
        <section className='m-auto max-w-screen-xl w-full h-full'>
        <section className='flex flex-col gap-5'>
          <hgroup className='flex flex-col lg:gap-2 md:gap-1'>
            <h1 className='lg:text-4xl font-bold text-lg md:text-3xl'>Best Property in Indonesia</h1>
            <p className='lg:text-lg md:text-base text-sm font-light'>Stay in the best property in Indonesia</p>
          </hgroup>
          {
            dataLandingPage?.data?.propertyByRecentBooks ? (
            <div className='flex flex-col gap-1 text-center justify-center w-full'>
              <h1 className='text-gray-300 lg:text-2xl md:text-xl text-base font-bold'>Oops, Seems you don't setup your profile account</h1>
              <p className='text-gray-300 md:text-base text-xs font-medium'>Explore Roomify and book any properties you want</p>
            </div>
            ):(
            <div className="carousel rounded-none flex gap-5 h-fit py-2">
                { 
                  dataLandingPage?.data?.propertyByRecentBooks.map((item: any, index: number) => {
                    return (
                    <div className="carousel-item" key={index}>
                      <Card 
                      isPending={isPendingDataLandingPage}
                      propertyType={item?.propertyType?.name}
                      propertyName={item?.name}
                      city={item?.city?.name}
                      country={item?.country?.name}
                      ratingAvg={0}
                      totalReviews={item?.review?.length}
                      price={0}
                      imageUrl={`http://localhost:5000/api/${item.propertyDetail.propertyImage[0].directory}/${item.propertyDetail.propertyImage[0].filename}.jpg`}
                      />
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
      <section className='m-auto max-w-screen-xl w-full h-full'>
      <section className='flex flex-col gap-5'>
        <hgroup className='flex flex-col lg:gap-2 md:gap-1'>
          <h1 className='lg:text-4xl font-bold text-lg md:text-3xl'>Explore Property</h1>
          <p className='lg:text-lg md:text-base text-sm font-light'>See, book, and stay in our partner properties</p>
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


      {/* <section className='flex flex-col gap-5'>
        <hgroup className='flex flex-col gap-2'>
          <h1 className='lg:text-4xl font-bold text-3xl'>Last Viewed</h1>
          <p className='lg:text-lg text-base font-light'>You can book the property you want</p>
        </hgroup>
        <div className="carousel rounded-none flex gap-8">
            {
              Array.from({length: 6}).map((_, index) => {
                return (
                <div className="carousel-item" key={index}>
                  <Card isPending={isPendingDataLandingPage}/>
                </div>
                )
              })
            }
        </div>
      </section>
      <section className='flex flex-col gap-5'>
        <hgroup className='flex flex-col gap-2'>
          <h1 className='lg:text-4xl font-bold text-3xl'>Top Rated Indonesia Property</h1>
          <p className='lg:text-lg text-base font-light'>You can stay at the best property</p>
        </hgroup>
        <div className="carousel rounded-none flex gap-8">
            {
              Array.from({length: 6}).map((_, index) => {
                return (
                <div className="carousel-item" key={index}>
                  <Card isPending={isPendingDataLandingPage}/>
                </div>
                )
              })
            }
        </div>
      </section> */}
    </main>
  )
}