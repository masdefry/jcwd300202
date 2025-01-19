'use client'

import React from 'react'
import toast from 'react-hot-toast'
import useMutateCreatePropertySeasonHook from './useMutateCreatePropertySeasonHook'
import useMutateDeletePropertySeasonHook from './useMutateDeletePropertySeasonHook'
import useMutateUpdatePropertySeasonHook from './useMutateUpdatePropertySeasonHook'
import useGetDataPropertySeasonsHook from './useGetDataPropertySeasonsHook'

const useManagePropertySeason = ({
  setDateRange,
  setDataBulkSeason,
  params,
  dataBulkSeason,
  setDataSeasonsByProperty,
  setPropertyRoomTypes,
  setIsPendingSeasons,
  setErrorStatus,
}: {
  setDateRange: any
  setDataBulkSeason: any
  params: { slug: string }
  dataBulkSeason: any
  setDataSeasonsByProperty: any
  setPropertyRoomTypes: any
  setIsPendingSeasons: any
  setErrorStatus: any
}) => {
  const onSuccess = (res: any) => {
    setDateRange({
      startDate: null,
      endDate: null,
    })
    setDataBulkSeason({
      pricePercentage: 100,
      availability: true,
      name: '',
      seasonId: '',
      startDate: '',
      endDate: '',
      isPeak: false,
    })
    toast((t) => (
      <span className="flex gap-2 items-center font-semibold justify-center text-xs">
        {res?.message}
      </span>
    ))
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  const onError = (err: any) => {
    toast((t) => (
      <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
        {err?.response?.data?.message || 'Connection error!'}
      </span>
    ))
  }

  const { fetchDataSeasonsByProperty } = useGetDataPropertySeasonsHook({
    handleSuccess(res) {
      setDataSeasonsByProperty(res?.data?.data)
      setPropertyRoomTypes(res?.data?.data?.property?.propertyRoomType)
    },
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
    handleFinally() {
      setIsPendingSeasons(false)
    },
    params,
  })

  const { mutateDeletePropertySeason, isPendingDeletePropertySeason } =
    useMutateDeletePropertySeasonHook({
      dataBulkSeason,
      params,
      onError,
      onSuccess,
    })

  const { mutateCreatePropertySeason, isPendingCreatePropertySeason } =
    useMutateCreatePropertySeasonHook({
      dataBulkSeason,
      params,
      onError,
      onSuccess,
    })

  const { mutateUpdatePropertySeason, isPendingUpdatePropertySeason } =
    useMutateUpdatePropertySeasonHook({
      dataBulkSeason,
      params,
      onError,
      onSuccess,
    })

  return {
    dataBulkSeason,
    isPendingCreatePropertySeason,
    isPendingUpdatePropertySeason,
    isPendingDeletePropertySeason,
    mutateCreatePropertySeason,
    mutateUpdatePropertySeason,
    mutateDeletePropertySeason,
    fetchDataSeasonsByProperty,
  }
}

export default useManagePropertySeason
