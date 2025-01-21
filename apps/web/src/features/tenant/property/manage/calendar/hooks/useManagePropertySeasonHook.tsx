'use client'

import React from 'react'
import toast from 'react-hot-toast'
import useMutateCreatePropertySeasonApi from '../api/useMutateCreatePropertySeasonApi'
import useMutateDeletePropertySeasonApi from '../api/useMutateDeletePropertySeasonApi'
import useMutateUpdatePropertySeasonApi from '../api/useMutateUpdatePropertySeasonApi'
import useGetDataPropertySeasonsApi from '../api/useGetDataPropertySeasonsApi'

const useManagePropertySeasonHook = ({
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

  const { fetchDataSeasonsByProperty } = useGetDataPropertySeasonsApi({
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
    useMutateDeletePropertySeasonApi({
      dataBulkSeason,
      params,
      onError,
      onSuccess,
    })

  const { mutateCreatePropertySeason, isPendingCreatePropertySeason } =
    useMutateCreatePropertySeasonApi({
      dataBulkSeason,
      params,
      onError,
      onSuccess,
    })

  const { mutateUpdatePropertySeason, isPendingUpdatePropertySeason } =
    useMutateUpdatePropertySeasonApi({
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

export default useManagePropertySeasonHook
