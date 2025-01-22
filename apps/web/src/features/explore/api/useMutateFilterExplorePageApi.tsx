'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useMutateFilterExplorePageApi = ({
  handleSearchParams,
  searchParams,
  propertyFacilityIdArr,
  propertyRoomFacilityIdArr,
  propertyTypeIdArr,
  propertyStarArr,
  setDataProperties,
  setSortMobileMode,
  sort,
}: any) => {
  const {
    mutate: mutateExplorePagination,
    isPending: isPendingExplorePagination,
  } = useMutation({
    mutationFn: async ({
      limit = 5,
      offset = 0,
      sortBy,
      order,
    }: {
      limit?: number
      offset?: number
      sortBy?: string
      order?: string
    }) => {
      handleSearchParams('limit', limit.toString() || searchParams.limit || '5')
      handleSearchParams(
        'offset',
        offset.toString() || searchParams.offset || '0',
      )
      const res = await instance.get(
        `/property?countryId=${searchParams.country}&cityId=${searchParams.city}&checkInDate=${searchParams['check-in-date']}&checkOutDate=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}&offset=${offset || searchParams.offset || 0}&limit=${limit || searchParams.limit || 5}&order=${sort?.order || order || searchParams.order || 'asc'}&sortBy=${sort?.sortBy || sortBy || searchParams.sort || 'price'}&minPrice=${searchParams['min-price'] || 0}&maxPrice=${searchParams['max-price'] || null}`,
        {
          headers: {
            propertyFacilityIdArr,
            propertyRoomFacilityIdArr,
            propertyTypeIdArr,
            propertyStarArr,
          },
        },
      )
      return res?.data
    },
    onSuccess: (res) => {
      setDataProperties(res?.data)
      setSortMobileMode(false)
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
    mutateExplorePagination,
    isPendingExplorePagination,
  }
}

export default useMutateFilterExplorePageApi
