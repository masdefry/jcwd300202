import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import useMutateCreateCountryApi from './useMutateCreateCountryApi'
import toast from 'react-hot-toast'

const useCreateCountryHook = () => {
  const [showCreateCountry, setShowCreateCountry] = useState(false)
  const [dataCreateCountry, setDataCreateCountry] = useState<{
    name: string
    description: string
    file: File[]
  }>({
    name: '',
    description: '',
    file: [] as File[],
  })

  const {
    mutateCreateCountry,
    isPendingCreateCountry
  } = useMutateCreateCountryApi({
    dataCreateCountry,
    setDataCreateCountry,
    setShowCreateCountry,
    onSuccess: (res) => {
      setDataCreateCountry({ name: '', file: [], description: '' })
      setShowCreateCountry(false)
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
      setDataCreateCountry({ name: '', file: [], description: '' })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  return {
    showCreateCountry,
    setShowCreateCountry,
    setDataCreateCountry,
    dataCreateCountry,
    mutateCreateCountry,
    isPendingCreateCountry,
  }
}

export default useCreateCountryHook
