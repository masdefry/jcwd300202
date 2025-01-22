'use client'

import React, { useState } from 'react'
import { ISearchParamsPropertyDetails } from '../types'
import useFilterRoomHook from './useFilterRoomHook'
import useMutatePropertyRoomTypeApi from '../api/useMutatePropertyRoomTypeApi'
import toast from 'react-hot-toast'

const useGetPropertyRoomTypesHook = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: ISearchParamsPropertyDetails
}) => {
  const [dataPropertyRoomType, setDataPropertyRoomType] = useState<any>([])
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
  } = useFilterRoomHook()
  const urlParams = new URLSearchParams({})
  const handleSearchParams = (orderBy: string, value: string) => {
    const currParams = window.location.href.includes('/search?')
      ? window.location.href.split('?')[1].split('&')
      : null
    currParams &&
      currParams.forEach((item: any) => {
        urlParams.set(
          item.split('=')[0],
          decodeURIComponent(item.split('=')[1]),
        )
      })
    urlParams.set(orderBy, value)
    window.history.pushState({}, '', '?' + urlParams.toString())
  }

  const { mutatePropertyRoomType, isPendingPropertyRoomType } =
    useMutatePropertyRoomTypeApi({
      onSuccess: (res) => {
        setDataPropertyRoomType(res?.data)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
      searchParams,
      params,
      adult,
      children,
    })
  const handlePropertyRoomType = ({
    limit,
    offset,
    checkInDate,
    checkOutDate,
  }: {
    limit?: number
    offset?: number
    checkInDate?: Date
    checkOutDate?: Date
  }) => {
    if (limit && offset) {
      handleSearchParams('limit', limit.toString())
      handleSearchParams('offset', offset.toString())
      if (searchParams['check-in-date'] && searchParams['check-out-date']) {
        handleSearchParams('check-in-date', searchParams['check-in-date'])
        handleSearchParams('check-out-date', searchParams['check-out-date'])
        handleSearchParams('adult', searchParams?.adult)
        handleSearchParams('children', searchParams?.children)
      }
    } else if (checkInDate && checkOutDate) {
      handleSearchParams('check-in-date', checkInDate.toISOString())
      handleSearchParams('check-out-date', checkOutDate.toISOString())
      handleSearchParams('adult', adult.toString())
      handleSearchParams('children', children.toString())
    }
    mutatePropertyRoomType({
      limit: limit,
      offset: offset,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    })
  }

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
  }
}

export default useGetPropertyRoomTypesHook
