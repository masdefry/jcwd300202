'use client'

import CardSmall from '@/components/CardSmall'
import Link from 'next/link'
import React from 'react'

const AccomodationRecommendation = ({ dataPropertyDetail }: { dataPropertyDetail: any }) => {
  return (
    <section
    id="another-recommendation"
    className="flex flex-col gap-5 2xl:p-0 px-5"
  >
    <hgroup>
      <h1 className="text-lg md:text-xl 2xl:text-2xl font-bold text-gray-900">
        Accommodation recommendations in{' '}
        {dataPropertyDetail?.city?.name}
      </h1>
      <p className="text-sm md:text-base font-medium md:font-light  text-gray-600">
        Find the best place to stay
      </p>
    </hgroup>
    <div className="carousel rounded-none flex gap-4 h-fit py-2">
      {dataPropertyDetail?.propertyListByCity?.map(
        (item: any, idx: number) => {
          return (
            <Link key={idx} href={`/property/${item?.slug}/details`}>
              <div className="carousel-item hover:opacity-65 transition duration-100 hover:cursor-pointer">
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
        },
      )}
    </div>
  </section>
  )
}

export default AccomodationRecommendation
