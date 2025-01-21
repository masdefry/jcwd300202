'use client'

import React, { useState } from 'react'
import useQueryPropertyDescriptionsApi from '../api/useQueryPropertyDescriptionsApi'
import useMutateUpdatePropertyDescriptions from '../api/useMutateUpdatePropertyDescriptions'
import toast from 'react-hot-toast'

const useManageDescriptionsHook = ({
  params,
}: {
  params: { slug: string }
}) => {
  const {
    dataPropertyDescriptions,
    isPendingPropertyDescriptions,
    error,
    isError,
  } = useQueryPropertyDescriptionsApi({ params })

  const {
    mutateUpdatePropertyDescriptions,
    isPendingUpdatePropertyDescriptions,
  } = useMutateUpdatePropertyDescriptions({
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
      }, 1500)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  return {
    dataPropertyDescriptions,
    isPendingPropertyDescriptions,
    error,
    isError,
    mutateUpdatePropertyDescriptions,
    isPendingUpdatePropertyDescriptions,
    isSubmitting,
    setIsSubmitting,
  }
}

export default useManageDescriptionsHook
