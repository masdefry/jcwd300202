'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCameraOutline } from 'react-icons/io5'

const ImagesSectionEditRoomType = ({
  dataPropertyRoomType,
  params,
}: {
  dataPropertyRoomType: any
  params: { slug: string; id: string }
}) => {
  return (
    <section className="flex flex-col gap-5 px-5">
      <div className="flex items-center justify-center w-full h-[150px] lg:h-[420px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg">
        {Boolean(
          dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[0]
            ?.directory,
        ) ? (
          <Link
            href={`/tenant/property/manage/${params.slug}/room-details/edit/${params.id}/photos`}
            className="w-full h-full relative"
          >
            <figure className="w-full h-full relative">
              <Image
                src={`http://localhost:5000/api/${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[0]?.directory}/${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[0]?.filename}.${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[0]?.fileExtension}`}
                width={1000}
                height={1000}
                alt=""
                className="object-cover w-full h-full"
              />
            </figure>
          </Link>
        ) : (
          <Link
            href={`/tenant/property/manage/${params.slug}/room-details/edit/${params.id}/photos`}
            className="w-full h-full relative"
          >
            <label className="flex flex-col items-center justify-center w-full h-full  cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <IoCameraOutline className="text-gray-300 text-6xl" />
            </label>
          </Link>
        )}
      </div>
      <section className="grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 rounded-lg"
            >
              {Boolean(
                dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[
                  index + 1
                ]?.directory,
              ) ? (
                <Link
                  href={`/tenant/property/manage/${params.slug}/room-details/edit/${params.id}/photos`}
                  className="w-full h-full relative"
                >
                  <figure className="w-full h-full relative">
                    <Image
                      src={`http://localhost:5000/api/${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[index + 1]?.directory}/${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[index + 1]?.filename}.${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[index + 1]?.fileExtension}`}
                      width={1000}
                      height={1000}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </figure>
                </Link>
              ) : (
                <Link
                  href={`/tenant/property/manage/${params.slug}/room-details/edit/${params.id}/photos`}
                  className="w-full h-full relative"
                >
                  <label className="flex flex-col items-center justify-center w-full h-full bg-slate-200 dark:bg-gray-700  dark:border-gray-600 ">
                    <IoCameraOutline className="text-white text-6xl" />
                  </label>
                </Link>
              )}
            </div>
          )
        })}
      </section>
    </section>
  )
}

export default ImagesSectionEditRoomType
