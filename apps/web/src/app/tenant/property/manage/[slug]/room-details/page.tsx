'use client'

import React from 'react'
import toast from 'react-hot-toast'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import SkeletonLoadingRoomDetails from '@/features/tenant/property/manage/room-details/components/SkeletonLoadingRoomDetails'
import RoomDetailsCards from '@/features/tenant/property/manage/room-details/components/RoomDetailsCards'
import useManageRoomDetailsHook from '@/features/tenant/property/manage/room-details/hooks/useManageRoomDetailsHook'

const PropertyManageRoomDetailsPage = ({
  params,
}: {
  params: { slug: string }
}) => {
  const {
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    change,
    setChange,
    dataForDelete,
    setDataForDelete,
    dataPropertyRoomTypes,
    isPendingPropertyRoomTypes,
    isError,
    error,
    mutateDeletePropertyRoomType,
    isPendingDeletePropertyRoomType,
  } = useManageRoomDetailsHook({ params })

  if (isError) {
    let getError: any = error
    if (getError.status === 403) {
      return <UnauthorizedPage />
    } else if (getError.status === 404) {
      return <NotFoundMain />
    } else if (getError.status === 500) {
      return <Custom500 />
    } else {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {getError?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    }
  }
  if (isPendingPropertyRoomTypes) {
    return <SkeletonLoadingRoomDetails />
  }
  return (
    <main className="flex flex-col gap-7 py-5">
      <hgroup className="flex flex-col px-5">
        <h1 className="text-lg font-bold text-gray-800">Room Details</h1>
        <p className="text-sm font-medium text-slate-600">
          Easily Manage Your Space: Update Room Details Anytime, Anywhere
        </p>
      </hgroup>
      <RoomDetailsCards
        params={params}
        setChange={setChange}
        mutateDeletePropertyRoomType={mutateDeletePropertyRoomType}
        dataForDelete={dataForDelete}
        dataPropertyRoomTypes={dataPropertyRoomTypes}
        setDataForDelete={setDataForDelete}
        setShowDeleteConfirmation={setShowDeleteConfirmation}
        showDeleteConfirmation={showDeleteConfirmation}
        isPendingDeletePropertyRoomType={isPendingDeletePropertyRoomType}
      />
    </main>
  )
}

export default PropertyManageRoomDetailsPage
