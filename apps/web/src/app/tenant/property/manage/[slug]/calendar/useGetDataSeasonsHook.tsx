'use client'

import React from 'react'
import useMutateGetSeasonsByRoom from './useMutateGetSeasonsByRoom'
import toast from 'react-hot-toast'
import useMutateGetSeasonsByProperty from './useMutateGetSeasonsByProperty'

const useGetDataSeasonsHook = ({
  setDataSeasonsByProperty,
  selectRoom,
  params
}: {
  setDataSeasonsByProperty: any,
  selectRoom: string,
  params: { slug: string }
}) => {

  function onSuccess(res: any) {
    setDataSeasonsByProperty(res?.data?.data)
  }
  function onError(err: any) {
    toast((t) => (
      <span className='flex gap-2 items-center font-semibold justify-center text-xs text-red-600'>
        {err?.response?.data?.message || 'Connection error!'}
      </span>
    ))
  }
    const {
        mutateDataSeasonsByPropertyRoomType,
        isPendingDataSeasonsByPropertyRoomType,
      } = useMutateGetSeasonsByRoom({
       onError,
       onSuccess,
        selectRoom
      })
      
    
      const {
        mutateDataSeasonsByProperty,
        isPendingDataSeasonsByProperty,
      } = useMutateGetSeasonsByProperty({
        params,
        onError,
        onSuccess
      })
  
    return {
      mutateDataSeasonsByProperty,
      isPendingDataSeasonsByProperty,
      mutateDataSeasonsByPropertyRoomType,
      isPendingDataSeasonsByPropertyRoomType

  }
}

export default useGetDataSeasonsHook
