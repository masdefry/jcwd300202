'use client'

import React, { useState } from 'react'
import useFetchPropertyHasFacilitiesApi from '../hooks/useFetchPropertyHasFacilitiesApi'
import toast from 'react-hot-toast'
import useMutateSearchPropertyFacilityApi from '../hooks/useMutateSearchPropertyFacilityApi'
import useMutateUpdatePropertyFacilityApi from '../hooks/useMutateUpdatePropertyFacilityApi'
import { useDebouncedCallback } from 'use-debounce'
import useMutateCreatePropertyFacilityApi from '../../../create/api/useMutateCreatePropertyFacilityApi'

const useManagePropertyFacilitiesHook = ({
  params,
}: {
  params: { slug: string }
}) => {
  const [isLoadingFetch, setIsLoadingFetch] = useState(true)
  const [dataPropertyHasFacilities, setDataPropertyHasFacilities] =
    useState<any>({
      propertyHasFacility: [],
      propertyNotHasFacility: [],
      propertyFacilitiesId: [],
      property: {},
    })
  const [uploadFile, setUploadFile] = useState(false)
  const [showCreatePropertyFacilityForm, setShowCreatePropertyFacilityForm] =
    useState(false)
  const [dataCreatePropertyFacility, setDataCreatePropertyFacility] = useState({
    name: '',
    file: [] as File[],
  })
  const [showMorePropertyNotHasFacility, setShowMorePropertyNotHasFacility] =
    useState(false)
  const [showMorePropertyHasFacility, setShowMorePropertyHasFacility] =
    useState(false)
  const [errorStatus, setErrorStatus] = useState<null | number>()

  const { fetchPropertyHasFacilities } = useFetchPropertyHasFacilitiesApi({
    params,
    handleError(err) {
      if (err.status === 401 || err.status === 406) {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      } else {
        setErrorStatus(err.status)
      }
    },
    handleSuccess(res) {
      setDataPropertyHasFacilities(res?.data?.data)
    },
    handleFinally() {
      setIsLoadingFetch(false)
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounceSearchPropertyFacility = useDebouncedCallback((value) => {
    mutateSearchPropertyFacility(value)
  }, 500)

  const { mutateSearchPropertyFacility, isPendingSearchPropertyFacility } =
    useMutateSearchPropertyFacilityApi({
      params,
      onSuccess(res) {
        setDataPropertyHasFacilities(res?.data)
      },
      onError(err) {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const {
    mutateUpdatePropertyHasFacilities,
    isPendingUpdatePropertyHasFacilities,
  } = useMutateUpdatePropertyFacilityApi({
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
    setDataCreatePropertyFacility,
    isPendingCreatePropertyFacility,
    setShowCreatePropertyFacilityForm,
    mutateCreatePropertyFacility,
    dataCreatePropertyFacility,
    setUploadFile,
    showCreatePropertyFacilityForm,
    isLoadingFetch,
    setIsLoadingFetch,
    dataPropertyHasFacilities,
    setDataPropertyHasFacilities,
    showMorePropertyNotHasFacility,
    setShowMorePropertyNotHasFacility,
    showMorePropertyHasFacility,
    setShowMorePropertyHasFacility,
    fetchPropertyHasFacilities,
    errorStatus,
    setErrorStatus,
    isSubmitting,
    setIsSubmitting,
    debounceSearchPropertyFacility,
    mutateSearchPropertyFacility,
    isPendingSearchPropertyFacility,
    mutateUpdatePropertyHasFacilities,
    isPendingUpdatePropertyHasFacilities,
  }
}

export default useManagePropertyFacilitiesHook
