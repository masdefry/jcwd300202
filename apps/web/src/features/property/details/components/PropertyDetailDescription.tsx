'use client'

import Separator from '@/features/auth/components/Separator'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'

interface IPropertyDetailDescriptionProps {
    dataPropertyDetail: any,
    isPending: boolean
    showMoreDescription: boolean,
    setShowMoreDescription: any
}
const PropertyDetailDescription = ({ dataPropertyDetail, isPending = true, showMoreDescription, setShowMoreDescription }: IPropertyDetailDescriptionProps) => {
  
  const dummyReview = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi laudantium earum similique commodi, porro laborum ratione voluptas reiciendis consequatur vero ad, non maxime quia cum culpa dolores? Suscipit, molestias hic.
  Dolor rerum, reiciendis repellat nulla, corporis expedita necessitatibus laborum assumenda aperiam, delectus nostrum. Fugit aspernatur doloribus molestiae numquam? In quasi voluptatem consequatur vitae provident placeat velit possimus ullam molestiae architecto?`
    if(isPending) {
      return (
        <section className='flex flex-col 2xl:p-0 px-5 gap-5 rounded-md bg-white'>
               
               <section id='map' className='max-h-[200px] col-span-1 rounded-md drop-shadow-md row-span-2 w-full h-full overflow-hidden'>
               {/* <SimpleMap latitudeAndLongitude={dataPropertyDetail?.property?.location.split(', ').map((item: string) => Number(item))} /> */}
               </section>
               <section className='p-5 flex flex-col gap-5 col-span-1 rounded-md drop-shadow-md bg-white row-span-2'>
                   <hgroup className='flex items-center justify-between'>
                       <h1 className='skeleton rounded-none text-transparent font-bold'>Property Highlighted Facilities</h1>
                   </hgroup>
                   <Separator/>
                   <section className='grid grid-cols-2 gap-5' >
                       {
                           Array.from({length: 8}).map((item: any, index: number) => {
                               return(
                                   <div key={index} className='flex text-sm tracking-wide items-center gap-2'>
                                       <figure className='h-4 w-4 bg-slate-300 skeleton rounded-full'>
                                       </figure>
                                       <p className='skeleton bg-slate-300 text-transparent rounded-none'>Property</p>
                                   </div>
                               )
                           })
                       }
                   </section>
               </section>
               <article className='text-sm font-light text-justify p-5 flex flex-col pjustify-between leading-relaxed col-span-2 rounded-md drop-shadow-md bg-white row-span-1'>
                   <p className='skeleton rounded-none bg-slate-300 text-transparent'>
                       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum exercitationem aut odit, tenetur tempore animi. Esse, officiis maxime! Nemo illum sunt tenetur eos ducimus beatae dolorum porro quibusdam, accusantium laudantium.
                   </p>
                   <p className='skeleton rounded-none bg-slate-300 text-transparent my-2'>
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, saepe. Ratione obcaecati doloremque odit est, quas quis aut, animi laborum aperiam, nam voluptatibus consequatur ut. Consectetur at explicabo tenetur laborum.
                   </p>
                   <button type='button' className='flex items-center gap-2 font-bold '><p className='skeleton rounded-none text-transparent flex items-center gap-2'>Less Description</p></button>
               </article>
               
                       <section id='review' className='h-fit max-h-[400px] flex flex-col gap-5 col-span-1 row-span-3 rounded-md drop-shadow-md bg-white w-full p-5'>
                           <hgroup className='flex items-center gap-3 w-full'>
                               <p className='text-xl font-bold skeleton rounded-none text-transparent bg-slate-300 shadow-md p-3 border border-slate-300'>9.8</p>
                               <div className='flex flex-col gap-1 w-full'>
                                   <p className='text-lg font-bold skeleton rounded-none text-transparent bg-slate-300'>Spectacular</p>
                                   <div className='flex justify-between items-center w-full'>
                                       <p className='text-sm font-light skeleton rounded-none text-transparent bg-slate-300'>Reviews from 10 Verified Guests</p>
                                   </div>
                               </div>
                           </hgroup>
                           <section className='p-1 overflow-y-hidden scrollbar-thumb-slate-300 scrollbar-track-white scrollbar-thin scrollbar-thumb-rounded-full'>
                               <section id='comments' className='flex flex-col gap-3'>
                               {
                                   Array.from({length: 3}).map((item: any,index: number) => {
                                       return (
                                       <div key={index} className='p-3 rounded-md border border-slate-300 flex flex-col gap-1.5'>
                                           <hgroup className='flex justify-between items-center'>
                                               <p className='text-sm font-bold text-gray-800'>{item?.user?.username}</p>
                                               <div className='flex items-center gap-1'>
                                                   {
                                                       Array.from({length: item?.rating}).map((_, idx) => {
                                                           return (
                                                               <FaStar key={idx} size={10} className='text-yellow-400'/>
                                                           )
                                                       })
                                                   }
                                               </div>
                                           </hgroup>
                                           <article className='text-sm font-light text-transparent text-justify'>
                                               {
                                                   dummyReview.length > 200 ? (
                                                   <p className='flex flex-col gap-2 skeleton rounded-none'>{dummyReview?.slice(0,200)}... <b className=' skeleton rounded-none font-bold'>Read more</b></p>
                                                   ) : dummyReview
                                               }
                                           
                                           </article>
                                       </div>
           
                                       )
                                   })
                               }
                               </section>
                           </section>
                       </section>
           </section>
      )

  }
  
  return (
    <section className='flex flex-col 2xl:p-0 px-5 gap-5 rounded-md bg-white'>
           
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
               <button type='button' onClick={() => setShowMoreDescription((state: boolean) => !state)} className='flex items-center gap-2 font-bold text-blue-600 hover:underline hover:cursor-pointer'>{showMoreDescription ?  (<p className='flex items-center gap-2'>Less Description</p>) : (<p className='flex items-center gap-2'>Read more<IoIosArrowForward size={20}/></p>)}</button>
           </article>
           {
               (dataPropertyDetail?.reviews && dataPropertyDetail?.reviews.length > 0) && (
                   <section id='review' className='h-fit max-h-[400px] flex flex-col gap-5 col-span-1 row-span-3 rounded-md drop-shadow-md bg-white w-full p-5'>
                       <hgroup className='flex items-center gap-3 w-full'>
                           <p className='text-xl font-bold text-white bg-gray-800 shadow-md rounded-2xl p-3 border border-slate-300'>{dataPropertyDetail?.avgRating.toFixed(1)}</p>
                           <div className='flex flex-col gap-1 w-full'>
                               <p className='text-lg font-bold'>{dataPropertyDetail?.avgRating >= 9
                    ? 'Sensational'
                    : dataPropertyDetail?.avgRating >= 7.5
                      ? 'Awesome'
                      : dataPropertyDetail?.avgRating >= 6
                        ? 'Nice'
                        : 'Good'}</p>
                               <div className='flex justify-between items-center w-full'>
                                   <p className='text-sm font-light text-gray-600'>Reviews from <b className='text-blue-600 font-bold hover:underline hover:cursor-pointer'>{dataPropertyDetail?.reviews?.length} verified guests</b></p>
                                   <IoIosArrowForward size={20}/>
                               </div>
                           </div>
                       </hgroup>
                       <section className='p-1 overflow-y-scroll scrollbar-thumb-slate-300 scrollbar-track-white scrollbar-thin scrollbar-thumb-rounded-full'>
                           <section id='comments' className='flex flex-col gap-3'>
                           {
                               dataPropertyDetail?.reviews?.map((item: any,index: number) => {
                                   return (
                                   <div key={index} className='p-3 rounded-md border border-slate-300 flex flex-col gap-1.5'>
                                       <hgroup className='flex justify-between items-center'>
                                           <p className='text-sm font-bold text-gray-800'>{item?.user?.username}</p>
                                           <div className='flex items-center gap-1'>
                                               {
                                                   Array.from({length: item?.rating}).map((_, index) => {
                                                       return (
                                                           <FaStar key={index} size={10} className='text-yellow-400'/>
                                                       )
                                                   })
                                               }
                                           </div>
                                       </hgroup>
                                       <article className='text-sm font-light text-gray-900 text-justify'>
                                           {
                                               item?.comment?.length > 200 ? (
                                               <p className='flex flex-col gap-2'>{item?.comment?.slice(0,200)}... <b className='text-blue-600 font-bold hover:underline hover:cursor-pointer'>Read more</b></p>
                                               ) : item?.comment
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
       </section>
  )
}

export default PropertyDetailDescription
