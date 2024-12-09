'use client'

import Image from 'next/image'
import styles from './page.module.css'
import CityRecommendationCard from '@/features/home/components/CityRecommendationCard'
import Hero from '@/features/home/components/Hero'
import { useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import Card from '@/components/Card'

export default function Home() {
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
      {
        Array.from({length: 3}).map((_, index) => {
          return(
            <section key={index} className='flex flex-col gap-5'>
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

    <main className='flex flex-col gap-12 lg:gap-16 lg:p-16 md:p-12 sm:p-8 p-4'>
      <section className='grid grid-cols-1 lg:grid-cols-2 h-fit gap-10'>
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
      <section className='grid grid-cols-1 lg:grid-cols-3 h-fit gap-10'>
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
      <section className='relative right-4 sm:right-8 md:right-12 lg:right-16'>
          <Hero isPending={isPendingDataLandingPage}/>
      </section>
      <section className='flex flex-col gap-5'>
        <hgroup className='flex flex-col gap-2'>
          <h1 className='lg:text-4xl font-bold text-3xl'>Recent Property Bookings</h1>
          <p className='lg:text-lg text-base font-light'>Book back the property you like</p>
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
      </section>
    </main>
  )
}