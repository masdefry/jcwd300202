'use client'

import Image from 'next/image'
import styles from './page.module.css'
import CityRecommendationCard from '@/features/home/components/CityRecommendationCard'
import Hero from '@/features/home/components/Hero'
import { useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'

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
      <main className='flex flex-col gap-10 lg:p-16 md:p-12 sm:p-8 p-4'>
      <section className='grid grid-cols-1 lg:grid-cols-2 h-fit gap-10'>
        <section className='col-[1/2] lg:col-[1/3] relative right-4 sm:right-8 md:right-12 lg:right-16'>
          <Hero isPending={isPendingDataLandingPage}/>
        </section>
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

    <main className='flex flex-col gap-10 lg:p-16 md:p-12 sm:p-8 p-4'>
      <section className='grid grid-cols-1 lg:grid-cols-2 h-fit gap-10'>
        <section className='col-[1/2] lg:col-[1/3] relative right-4 sm:right-8 md:right-12 lg:right-16'>
          <Hero isPending={isPendingDataLandingPage}/>
        </section>
        {
          dataLandingPage?.data?.cities?.map((item: any, index: number) => {
            if(index < 2) {
              return(
              <div key={index}>
                <CityRecommendationCard
                isPending={isPendingDataLandingPage} 
                imgSrc={`http://localhost:5000/${item?.directory}/${item?.filename}.jpg`}
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
                  imgSrc={`http://localhost:5000/${item?.directory}/${item?.filename}.jpg`}
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
    </main>
  )
}