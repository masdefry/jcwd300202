'use client'

import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import authStore from '@/zustand/authStore'
import useShowRoomDetailHook from '@/features/property/details/hooks/useShowRoomDetailHook'
import PropertyImages from '@/features/property/components/PropertyImages'
import PropertyDetailDescription from '@/features/property/details/components/PropertyDetailDescription'
import SearchRoomsAvailability from '@/features/property/details/components/SearchRoomsAvailability'
import HGroupPropertyDetail from '@/features/property/details/components/HGroupPropertyDetail'
import PropertyRoomDetailList from '@/features/property/details/components/PropertyRoomDetailList'
import PropertyDetailFacilities from '@/features/property/details/components/PropertyDetailFacilities'
import PropertyDetailPolicies from '@/features/property/details/components/PropertyDetailPolicies'
import NotFoundPropertyDetails from '@/app/property/not-found'
import DataRoomDetails from '@/features/property/details/components/DataRoomDetails'
import useGetPropertyDetailHook from '@/features/property/details/hooks/useGetPropertyDetailHook'

const TenantPropertyDetailPage = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: {
    limit: string
    offset: string
    adult: string
    children: string
    'check-in-date': string
    'check-out-date': string
  }
}) => {
  const token = authStore((state) => state.token)
  const role = authStore((state) => state.role)
  const [showMoreDescription, setShowMoreDescription] = useState(false)
  const [showPropertyImages, setShowPropertyImages] = useState(false)

  const {
    showDataRoom,
    setShowDataRoom,
    currSlideRoomImages,
    setCurrSlideRoomImages,
    prevRoomImage,
    nextRoomImage,
  } = useShowRoomDetailHook()

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
    handlePropertyRoomType,
    isPendingPropertyRoomType,
    dataPropertyRoomType,
    isError,
    isPendingPropertyDetail,
    dataPropertyDetail,
    fetchDataPropertyDetail,
  } = useGetPropertyDetailHook({ params, searchParams })

  useEffect(() => {
    if (searchParams['check-in-date'] && searchParams['check-out-date']) {
      setDateRange([
        new Date(searchParams['check-in-date']),
        new Date(searchParams['check-out-date']),
      ])
    }
    fetchDataPropertyDetail()
  }, [])

  if (isError) {
    return (
      <div>
        <NotFoundPropertyDetails />
      </div>
    )
  }

  return (
    <main className="w-full min-h-min 2xl:py-5 pb-5">
      <section className="m-auto max-w-screen-xl flex flex-col gap-7">
        <PropertyImages
          showPropertyImages={showPropertyImages}
          setShowPropertyImages={setShowPropertyImages}
          dataPropertyDetail={dataPropertyDetail}
          isPending={isPendingPropertyDetail}
        />
        <HGroupPropertyDetail
          dataPropertyDetail={dataPropertyDetail}
          isPending={isPendingPropertyDetail}
        />
        <PropertyDetailDescription
          showMoreDescription={showMoreDescription}
          setShowMoreDescription={setShowMoreDescription}
          dataPropertyDetail={dataPropertyDetail}
          isPending={isPendingPropertyDetail}
        />

        <Separator />
        <SearchRoomsAvailability
          searchParams={searchParams}
          handlePropertyRoomType={handlePropertyRoomType}
          handleGuest={handleGuest}
          dateRange={dateRange}
          setDateRange={setDateRange}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          dataPropertyDetail={dataPropertyDetail}
          setShowGuestCounter={setShowGuestCounter}
          showGuestCounter={showGuestCounter}
          adult={adult}
          children={children}
          isPending={isPendingPropertyDetail}
        />
        <PropertyRoomDetailList
          dataPropertyRoomType={dataPropertyRoomType}
          isPending={isPendingPropertyRoomType || isPendingPropertyDetail}
          setShowDataRoom={setShowDataRoom}
          token={token}
          searchParams={searchParams}
          handlePropertyRoomType={handlePropertyRoomType}
          dataPropertyDetail={dataPropertyDetail}
          role={role}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />
        {showDataRoom.name && (
          <DataRoomDetails
            showDataRoom={showDataRoom}
            setShowDataRoom={setShowDataRoom}
            currSlideRoomImages={currSlideRoomImages}
            nextRoomImage={nextRoomImage}
            prevRoomImage={prevRoomImage}
          />
        )}

        <PropertyDetailFacilities
          dataPropertyDetail={dataPropertyDetail}
          isPending={isPendingPropertyDetail}
        />
        <PropertyDetailPolicies
          dataPropertyDetail={dataPropertyDetail}
          isPending={isPendingPropertyDetail}
        />
      </section>
    </main>
  )
}

export default TenantPropertyDetailPage
