'use client'

import React, { useState } from 'react'
import useFetchPropertyRoomFacilitiesApi from '../api/useFetchPropertyRoomFacilitiesApi'
import toast from 'react-hot-toast'
import useMutateSearchRoomFacilityApi from '../api/useMutateSearchRoomFacilityApi'
import { useDebouncedCallback } from 'use-debounce'
import useMutateSearchGeneralRoomFacilityApi from '../api/useMutateSearchGeneralRoomFacilityApi'
import useMutateRoomFacilityByRoomApi from '../api/useMutateRoomFacilityByRoomApi'
import useMutateUpdateRoomFacilityApi from '../api/useMutateUpdateRoomFacilityApi'
import useMutateUpdateGeneralRoomFacilitiesApi from '../api/useMutateUpdateGeneralRoomFacilitiesApi'
import useMutateCreatePropertyRoomFacilityApi from '../../../create/api/useMutateCreatePropertyRoomFacilityApi'

const useManageRoomAmenitiesHook = ({
  params,
}: {
  params: { slug: string }
}) => {
  const [
    showCreatePropertyRoomFacilityForm,
    setShowCreatePropertyRoomFacilityForm,
  ] = useState(false)
  const [dataCreatePropertyRoomFacility, setDataCreatePropertyRoomFacility] =
    useState({
      name: '',
      file: [] as File[],
    })
  const [dataGeneralRoomFacilities, setDataGeneralRoomFacilities] =
    useState<any>()
  const [showMoreRoomNotHasFacilities, setShowMoreRoomNotHasFacilities] =
    useState(false)
    const [uploadFile, setUploadFile] = useState(false)
  const [showMoreRoomHasFacilities, setShowMoreRoomHasFacilities] =
    useState(false)
  const [selectRoom, setSelectRoom] = useState<null | string>('all-rooms')
  const [isPendingPropertyHasFacilities, setIsPendingPropertyHasFacilities] =
    useState(true)
  const [errorStatus, setErrorStatus] = useState<null | number>()
  const { fetchPropertyHasFacilities } = useFetchPropertyRoomFacilitiesApi({
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
      setDataGeneralRoomFacilities(res?.data?.data)
    },
    handleFinally() {
      setIsPendingPropertyHasFacilities(false)
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mutateSearchRoomFacility, isPendingSearchRoomFacility } =
    useMutateSearchRoomFacilityApi({
      selectRoom,
      onSuccess: (res) => {
        setDataGeneralRoomFacilities(res?.data)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const debounceSearchRoomFacility = useDebouncedCallback((value) => {
    mutateSearchRoomFacility(value)
  }, 500)

  const {
    mutateSearchGeneralRoomFacility,
    isPendingSearchGeneralRoomFacility,
  } = useMutateSearchGeneralRoomFacilityApi({
    params,
    onSuccess: (res) => {
      setDataGeneralRoomFacilities(res?.data)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const debounceSearchGeneralRoomFacility = useDebouncedCallback((value) => {
    mutateSearchGeneralRoomFacility(value)
  }, 500)

  const { mutateRoomFacilityByRoom } = useMutateRoomFacilityByRoomApi({
    selectRoom,
    onSuccess: (res) => {
      setDataGeneralRoomFacilities(res?.data)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const { mutateUpdateRoomHasFacilities, isPendingUpdateRoomHasFacilities } =
    useMutateUpdateRoomFacilityApi({
      selectRoom,
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

  const {
    mutateUpdateGeneralRoomFacilities,
    isPendingUpdateGeneralRoomFacilities,
  } = useMutateUpdateGeneralRoomFacilitiesApi({
    params,
    onSuccess: (res) => {
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

  const { mutateCreatePropertyRoomFacility, isPendingCreatePropertyRoomFacility } = useMutateCreatePropertyRoomFacilityApi({
    dataCreatePropertyRoomFacility,
    onSuccess: (res) => {
        setShowCreatePropertyRoomFacilityForm(false);
        setDataCreatePropertyRoomFacility({
          name: '',
          file: [],
        });
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ));
      },
  })
  return {
    setDataCreatePropertyRoomFacility,
    isPendingCreatePropertyRoomFacility,
    setShowCreatePropertyRoomFacilityForm,
    mutateCreatePropertyRoomFacility,
    dataCreatePropertyRoomFacility,
    setUploadFile,
    showCreatePropertyRoomFacilityForm,
    dataGeneralRoomFacilities,
    setDataGeneralRoomFacilities,
    showMoreRoomNotHasFacilities,
    setShowMoreRoomNotHasFacilities,
    showMoreRoomHasFacilities,
    setShowMoreRoomHasFacilities,
    selectRoom,
    setSelectRoom,
    isPendingPropertyHasFacilities,
    setIsPendingPropertyHasFacilities,
    errorStatus,
    setErrorStatus,
    isSubmitting,
    setIsSubmitting,
    fetchPropertyHasFacilities,
    mutateSearchRoomFacility,
    isPendingSearchRoomFacility,
    debounceSearchRoomFacility,
    mutateSearchGeneralRoomFacility,
    isPendingSearchGeneralRoomFacility,
    debounceSearchGeneralRoomFacility,
    mutateRoomFacilityByRoom,
    mutateUpdateRoomHasFacilities,
    isPendingUpdateRoomHasFacilities,
    mutateUpdateGeneralRoomFacilities,
    isPendingUpdateGeneralRoomFacilities,
  }
}

export default useManageRoomAmenitiesHook
