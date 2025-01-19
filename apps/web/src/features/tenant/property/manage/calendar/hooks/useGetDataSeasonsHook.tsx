'use client'

import React from 'react'
import useMutateGetSeasonsByRoomApi from '../api/useMutateGetSeasonsByRoomApi'
import toast from 'react-hot-toast'
import useMutateGetSeasonsByPropertyApi from '../api/useMutateGetSeasonsByPropertyApi'

const useGetDataSeasonsHook = ({
  setDataSeasonsByProperty,
  selectRoom,
  params,
}: {
  setDataSeasonsByProperty: any
  selectRoom: string
  params: { slug: string }
}) => {
  function onSuccess(res: any) {
    setDataSeasonsByProperty(res?.data?.data)
  }
  function onError(err: any) {
    toast((t) => (
      <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
        {err?.response?.data?.message || 'Connection error!'}
      </span>
    ))
  }
  const {
    mutateDataSeasonsByPropertyRoomType,
    isPendingDataSeasonsByPropertyRoomType,
  } = useMutateGetSeasonsByRoomApi({
    onError,
    onSuccess,
    selectRoom,
  })

  const { mutateDataSeasonsByProperty, isPendingDataSeasonsByProperty } =
    useMutateGetSeasonsByPropertyApi({
      params,
      onError,
      onSuccess,
    })

  return {
    mutateDataSeasonsByProperty,
    isPendingDataSeasonsByProperty,
    mutateDataSeasonsByPropertyRoomType,
    isPendingDataSeasonsByPropertyRoomType,
  }
}

export default useGetDataSeasonsHook
