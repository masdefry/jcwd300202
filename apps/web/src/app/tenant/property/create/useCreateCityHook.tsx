'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useMutateCreateCityApi from './useMutateCreateCityApi'

const useCreateCityHook = () => {
  const [showCreateCity, setShowCreateCity] = useState(false)
  const [dataCreateCity, setDataCreateCity] = useState<{
    name: string
    file: File[]
    countryId: null | number
  }>({
    name: '',
    file: [] as File[],
    countryId: null,
  })

  const {
    mutateCreateCity,
    isPendingCreateCity
  } = useMutateCreateCityApi({
    dataCreateCity,
    setDataCreateCity,
    setShowCreateCity,
    onSuccess: (res) => {
      setShowCreateCity(false)
      setDataCreateCity({
        name: '',
        file: [] as File[],
        countryId: null,
      })
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
      setDataCreateCity({
        name: '',
        file: [] as File[],
        countryId: null,
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  return {
    showCreateCity,
    setShowCreateCity,
    setDataCreateCity,
    dataCreateCity,
    mutateCreateCity,
    isPendingCreateCity,
  }
}

export default useCreateCityHook
