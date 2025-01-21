'use client'

import React from 'react'
import Image from 'next/image'
import { RiCloseFill } from 'react-icons/ri'
import ImageCarousel from './ImageCarousel'

interface IPropertyImagesProps {
    dataPropertyDetail: any,
    setShowPropertyImages: any,
    showPropertyImages: boolean
    isPending?: boolean
}

const PropertyImages = ({ dataPropertyDetail, setShowPropertyImages, showPropertyImages, isPending = true }: IPropertyImagesProps) => {
  if(isPending) {
      return (
      <section className='flex flex-col gap-7'>
          <section className='hidden 2xl:grid grid-cols-5 gap-5 w-full h-[700px]'>
              {
                  Array.from({length : 8}).map((item: any, index: number) => {
                      let className
                      if(index === 0) {
                          className = 'overflow-hidden relative rounded-md skeleton bg-gray-200 w-full h-full col-span-3  row-span-6'
                      } else if(index === 1 || index === 2) {
                          className = 'overflow-hidden relative rounded-md skeleton bg-gray-200 w-full h-full col-span-2  row-span-3'
                      } else {
                          className = 'overflow-hidden relative rounded-md skeleton bg-gray-200 w-full h-full col-span-1  row-span-2'
                      }
                      if(index === 7) {
                          return (
                          <div key={index} className={className}>
                                      <div className='h-full w-full object-cover skeleton bg-gray-200' >
                                      </div>
                              <div className='rounded-md absolute top-0 left-0 w-full h-full  bg-black bg-opacity-10 flex items-center justify-center'>
                                  <p className='text-xl text-transparent font-bold  transition duration-100'>Photos</p>
                              </div>
                          </div>
                          )
                      }
                      return(
                          <div key={index} className={className}>
                                      <div className='h-full w-full object-cover skeleton bg-gray-200' >
                                      </div>
                          </div>
                      )
                  })
              }
          </section>
          {
              showPropertyImages && (
              <section className='bg-black bg-opacity-25 backdrop-blur-sm z-[52] fixed top-0 left-0 w-full h-full flex items-center justify-center p-5'>
                  <div className='w-full max-w-[800px] h-[500px] p-1 flex flex-col gap-3 bg-white rounded-md shadow-md'>
                      <div className='text-gray-950 text-lg w-full flex justify-end'>
                          <RiCloseFill onClick={() => setShowPropertyImages(false)} className='hover:opacity-60 transition duration-100 hover:cursor-pointer'/>
                      </div>
                      <ImageCarousel imagesArr={dataPropertyDetail?.propertyImages}/>
                  </div>
              </section>
              )
          }
          <section className='px-5 pt-8 2xl:hidden'>
              <div className='bg-slate-200 skeleton w-full md:h-[300px] h-[200px] rounded-xl shadow-md overflow-hidden'>

              </div>
          </section>
          </section>
    )

  }
  
    return (
    <section className='flex flex-col gap-7'>
        <section className='hidden 2xl:grid grid-cols-5 gap-5 w-full h-[700px]'>
            {
                dataPropertyDetail?.propertyImagesPreview?.map((item: any, index: number) => {
                    let className
                    if(index === 0) {
                        className = 'overflow-hidden relative rounded-md w-full h-full bg-gray-200 col-span-3 hover:cursor-pointer row-span-6'
                    } else if(index === 1 || index === 2) {
                        className = 'overflow-hidden relative rounded-md w-full h-full bg-gray-200 col-span-2 hover:cursor-pointer row-span-3'
                    } else {
                        className = 'overflow-hidden relative rounded-md w-full h-full bg-gray-200 col-span-1 hover:cursor-pointer row-span-2'
                    }
                    if(index === 7) {
                        return (
                        <div onClick={() => setShowPropertyImages(true)} key={index} className={className}>
                            {
                                item?.directory ? (
                                    <Image 
                                    src={`http://localhost:5000/api/${item?.directory}/${item?.filename}.${item?.fileExtension}`}
                                    width={800}
                                    height={800}
                                    alt=''
                                    className='h-full w-full object-cover '
                                    />
                                ) : (
                                    <div className='h-full w-full object-cover bg-blue-200' >
                                    </div>
                                )
                            }
                            {
                                (dataPropertyDetail?.propertyImages.length - dataPropertyDetail?.propertyImagesPreview.length > 0) && (
                                <div className='rounded-md absolute top-0 left-0 w-full h-full hover:bg-opacity-60 bg-black bg-opacity-40 flex items-center justify-center'>
                                    <p className='text-xl text-white font-bold hover:cursor-pointer hover:underline transition duration-100'>+{dataPropertyDetail?.propertyImages.length - dataPropertyDetail?.propertyImagesPreview.length} Photos</p>
                                </div>
                                )
                            }
                        </div>
                        )
                    }
                    return(
                        <div onClick={() => setShowPropertyImages(true)} key={index} className={className}>
                            {
                                item?.directory ? (
                                    <Image 
                                        src={`http://localhost:5000/api/${item?.directory}/${item?.filename}.${item?.fileExtension}`}
                                        width={1000}
                                        height={1000}
                                        alt=''
                                        className='h-full w-full object-cover '
                                    />
                                ) : (
                                    <div className='h-full w-full object-cover bg-blue-200' >
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </section>
        {
            showPropertyImages && (
            <section className='bg-black bg-opacity-25 backdrop-blur-sm z-[52] fixed top-0 left-0 w-full h-full flex items-center justify-center p-5'>
                <div className='w-full max-w-[800px] h-[500px] p-1 flex flex-col gap-3 bg-white rounded-md shadow-md'>
                    <div className='text-gray-950 text-lg w-full flex justify-end'>
                        <RiCloseFill onClick={() => setShowPropertyImages(false)} className='hover:opacity-60 transition duration-100 hover:cursor-pointer'/>
                    </div>
                    <ImageCarousel imagesArr={dataPropertyDetail?.propertyImages}/>
                </div>
            </section>
            )
        }
        <section className='px-5 pt-8 2xl:hidden'>
            <div onClick={() => setShowPropertyImages(true)} className='bg-slate-200 w-full md:h-[300px] h-[200px] rounded-xl shadow-md overflow-hidden'>
                <Image
                src={`http://localhost:5000/api/${dataPropertyDetail?.propertyImages[0]?.directory}/${dataPropertyDetail?.propertyImages[0]?.filename}.${dataPropertyDetail?.propertyImages[0]?.fileExtension}`}
                width={1000}
                height={1000}
                alt=''
                className='h-full w-full object-cover '
                />
            </div>
        </section>
        </section>
  )
}

export default PropertyImages
