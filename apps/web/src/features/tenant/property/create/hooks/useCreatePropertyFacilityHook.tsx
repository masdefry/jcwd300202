'use client'

import React from 'react'
import useMutateCreatePropertyFacilityApi from '../api/useMutateCreatePropertyFacilityApi'
import useQueryPropertyFacilitiesApi from '../api/useQueryPropertyFacilitiesApi'
import { IUseStateCreatePropertyHook } from '../types'
import toast from 'react-hot-toast'

const useCreatePropertyFacilityHook = ({ dataCreatePropertyFacility, setDataCreatePropertyFacility }: Pick<IUseStateCreatePropertyHook, 'setDataCreatePropertyFacility' | 'dataCreatePropertyFacility'>) => {
    const { dataPropertyFacilities, isPendingPropertyFacilities } = useQueryPropertyFacilitiesApi()
  const { mutateCreatePropertyFacility, isPendingCreatePropertyFacility } = useMutateCreatePropertyFacilityApi({ dataCreatePropertyFacility, 
    onSuccess: (res) => {
        setDataCreatePropertyFacility({
            name: '',
            file: [] as File[],
        })
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
            window.location.reload()
        }, 1200)
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
        dataPropertyFacilities,
        isPendingPropertyFacilities,
        mutateCreatePropertyFacility,
        isPendingCreatePropertyFacility
  }
}

export default useCreatePropertyFacilityHook
