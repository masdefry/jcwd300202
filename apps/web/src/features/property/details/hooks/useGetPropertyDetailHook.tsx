'use client'

import useGetPropertyRoomTypesHook from '@/features/property/details/hooks/useGetPropertyRoomTypesHook'
import { ISearchParamsPropertyDetails } from '@/features/property/details/types'
import React, { useState } from 'react'
import useFetchPropertyDetailsApi from '../api/useFetchPropertyDetailsApi'
import useCreateHistoryApi from '../api/useCreateHistoryApi'

const useGetPropertyDetailHook = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: ISearchParamsPropertyDetails
}) => {
  const {
    checkInDate,
    checkOutDate,
    setDateRange,
    dateRange,
    handleGuest,
    showGuestCounter,
    setShowGuestCounter,
    adult,
    children,
    setAdult,
    setChildren,
    handlePropertyRoomType,
    isPendingPropertyRoomType,
    dataPropertyRoomType,
  } = useGetPropertyRoomTypesHook({ searchParams, params })
  const [isError, setIsError] = useState(false)
  const [dataPropertyDetail, setDataPropertyDetail] = useState<any>()
  const [isPendingPropertyDetail, setIsPendingPropertyDetail] = useState(true)

  const { fetchDataPropertyDetail } = useFetchPropertyDetailsApi({
    handleError(err) {
      setIsError(true)
    },
    handleSuccess(res) {
      handlePropertyRoomType({ limit: 2, offset: 0 })
      if (searchParams?.adult) setAdult(Number(searchParams?.adult))
      if (searchParams?.children) setChildren(Number(searchParams?.children))
      setDataPropertyDetail(res?.data?.data)
    },
    handleFinally() {
      setIsPendingPropertyDetail(false)
    },
    params,
  })

  const { createHistory } = useCreateHistoryApi({
    params,
  })

  return {
    checkInDate,
    checkOutDate,
    setDateRange,
    dateRange,
    handleGuest,
    showGuestCounter,
    setShowGuestCounter,
    adult,
    children,
    setAdult,
    setChildren,
    handlePropertyRoomType,
    isPendingPropertyRoomType,
    dataPropertyRoomType,
    isError,
    isPendingPropertyDetail,
    dataPropertyDetail,
    fetchDataPropertyDetail,
    createHistory,
  }
}

export default useGetPropertyDetailHook
