'use client'

import React from 'react'
import useMutateCreatePropertyTypeApi from '../api/useMutateCreatePropertyTypeApi'
import toast from 'react-hot-toast'
import useQueryPropertyTypeApi from '../api/useQueryPropertyTypeApi'
import { IUseStateCreatePropertyHook } from '../types'

const useCreatePropertyTypeHook = ({
  setPropertyTypes,
  setPropertyType,
  setShowFormCreatePropertyType,
  dataCreatePropertyType,
} : Pick<IUseStateCreatePropertyHook, 'setPropertyType' | 'setPropertyTypes' | 'setShowFormCreatePropertyType' | 'dataCreatePropertyType'>) => {
  const { isPendingPropertyTypes } = useQueryPropertyTypeApi({
    setPropertyTypes,
  })

  const { mutateCreatePropertyType, isPendingCreatePropertyType } =
    useMutateCreatePropertyTypeApi({
      dataCreatePropertyType,
      onSuccess: (res) => {
        setPropertyType({ name: res?.data?.name, id: res?.data?.id })
        setShowFormCreatePropertyType(false)
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
    isPendingCreatePropertyType,
    isPendingPropertyTypes,
    mutateCreatePropertyType,
  }
}

export default useCreatePropertyTypeHook
