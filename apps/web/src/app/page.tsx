'use client'

import Image from 'next/image'
import styles from './page.module.css'
import CityRecommendationCard from '@/features/home/components/CityRecommendationCard'

export default function Home() {
  return (
    <main className='flex flex-col gap-10 lg:p-16 md:p-12 sm:p-8 p-4'>
      <section className='grid grid-cols-1 lg:grid-cols-2 h-fit gap-10'>
        <CityRecommendationCard 
        imgSrc='https://cdn.antaranews.com/cache/1200x800/2020/06/03/20200603_172512.jpg'
        alt='jakarta'
        city='Jakarta'
        country='Indonesia'
        h1Size='lg:text-5xl text-3xl'
        />
        <CityRecommendationCard 
        imgSrc='https://klcciconic.com.my/wp-content/uploads/2020/03/TwinTower-e1587708654823-1024x767.jpg'
        alt='kuala-lumpur'
        city='Kuala Lumpur'
        country='Malaysia'
        h1Size='lg:text-5xl text-3xl'
        />
      </section>
      <section className='grid grid-cols-1 lg:grid-cols-3 h-fit gap-10'>
        <CityRecommendationCard 
        imgSrc='https://www.judethetourist.com/wp-content/uploads/2023/11/BGC.jpg'
        alt='makati'
        city='Makati'
        country='Philiphines'
        h1Size='text-3xl'
        />
        <CityRecommendationCard 
        imgSrc='https://video.cgtn.com/news/2020-10-14/Shenzhen-four-decades-of-transformation-UAy7Niyfq8/video/36316ad55ce34e0f91200c2318d638f9/36316ad55ce34e0f91200c2318d638f9.jpg'
        alt='shenzhen'
        city='Shenzhen'
        country='China'
        h1Size='text-3xl'
        />
        <CityRecommendationCard 
        imgSrc='https://wallpaperaccess.com/full/26403.jpg'
        alt='tokyo'
        city='Tokyo'
        country='Japan'
        h1Size='text-3xl'
        />
      </section>
    </main>
  )
}
