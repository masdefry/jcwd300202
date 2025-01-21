'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import useMutateCreateCountryApi from '../api/useMutateCreateCountryApi'
import toast from 'react-hot-toast'
import { IUseStateCreatePropertyHook } from '../types'
import useQueryCountryApi from '@/features/tenant/property/manage/general-info/api/useQueryCountryApi'
import { isError } from 'cypress/types/lodash'

const useCreateCountryHook = ({
  dataCreateCountry,
  setDataCreateCountry,
  setShowCreateCountry,
  setCountryList,
}: Pick<
  IUseStateCreatePropertyHook,
  | 'dataCreateCountry'
  | 'setDataCreateCountry'
  | 'setShowCreateCountry'
  | 'setCountryList'
>) => {
  const { isPendingCountries, isErrorCountries } = useQueryCountryApi({
    setCountryList,
  })

  const { mutateCreateCountry, isPendingCreateCountry } =
    useMutateCreateCountryApi({
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
    isPendingCountries,
    setShowCreateCountry,
    setDataCreateCountry,
    dataCreateCountry,
    mutateCreateCountry,
    isPendingCreateCountry,
  }
}

export default useCreateCountryHook
