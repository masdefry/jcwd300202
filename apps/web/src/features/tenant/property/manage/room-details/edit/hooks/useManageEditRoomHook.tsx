'use client'

import React, { useState } from 'react'
import useQueryDataRoomTypeApi from '../api/useQueryDataRoomTypeApi'
import useMutateUpdateRoomTypeApi from '../api/useMutateUpdateRoomTypeApi'
import toast from 'react-hot-toast'

const useManageEditRoomHook = ({
  params,
}: {
  params: { slug: string; id: string }
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { dataPropertyRoomType, isPendingPropertyRoomType, isError, error } =
    useQueryDataRoomTypeApi({ params })

  const {
    mutateUpdatePropertyRoomTypeGeneral,
    isPendingUpdatePropertyRoomTypeGeneral,
  } = useMutateUpdateRoomTypeApi({
    params,
    onSuccess: (res) => {
      setIsSubmitting(false)
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  return {
    isSubmitting,
    setIsSubmitting,
    dataPropertyRoomType,
    isPendingPropertyRoomType,
    isError,
    error,
    mutateUpdatePropertyRoomTypeGeneral,
    isPendingUpdatePropertyRoomTypeGeneral,
  }
}

export default useManageEditRoomHook
