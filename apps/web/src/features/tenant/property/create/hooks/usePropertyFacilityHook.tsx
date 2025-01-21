'use client'

import React from 'react'
import toast from 'react-hot-toast'
import useStateCreatePropertyHook from './useStateCreatePropertyHook'
import useMutateCreatePropertyFacilityApi from '../api/useMutateCreatePropertyFacilityApi'
import useQueryPropertyFacilitiesApi from '../api/useQueryPropertyFacilitiesApi'
import { IUseStateCreatePropertyHook } from '../types'

const useCreatePropertyFacilityHook = ({
  dataCreatePropertyFacility,
  setShowCreatePropertyFacilityForm,
  setDataCreatePropertyFacility,
}: Pick<
  IUseStateCreatePropertyHook,
  | 'dataCreatePropertyFacility'
  | 'setShowCreatePropertyFacilityForm'
  | 'setDataCreatePropertyFacility'
>) => {
  const { mutateCreatePropertyFacility, isPendingCreatePropertyFacility } =
    useMutateCreatePropertyFacilityApi({
      dataCreatePropertyFacility,
      onSuccess: (res) => {
        setShowCreatePropertyFacilityForm(false)
        setDataCreatePropertyFacility({
          name: '',
          file: [],
        })
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
  const { isPendingPropertyFacilities, dataPropertyFacilities } =
    useQueryPropertyFacilitiesApi()
  return {
    mutateCreatePropertyFacility,
    isPendingCreatePropertyFacility,
    isPendingPropertyFacilities,
    dataPropertyFacilities,
  }
}

export default useCreatePropertyFacilityHook
