'use client'

import React from 'react'
import instance from '@/utils/axiosInstance'
import { ISearchParamsExplore } from '../types'
import { AxiosResponse } from 'axios'
const useFetchDataPropertiesApi = ({
  searchParams,
  handleError,
  handleFinally,
  handleSuccess,
}: {
  searchParams: ISearchParamsExplore
  handleSuccess: (res: AxiosResponse) => void
  handleError: (err: any) => void
  handleFinally: () => void
}) => {
  const fetchDataProperties = async () => {
    try {
      const res = await instance.get(
        `/property?countryId=${searchParams.country}&cityId=${searchParams.city}&name=${searchParams.name || ''}&checkInDate=${searchParams['check-in-date']}&checkOutDate=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}&offset=${searchParams.offset || 0}&limit=${searchParams.limit || 5}&order=${searchParams.order || 'asc'}&sortBy=${searchParams.sort || 'price'}&type=${searchParams.type}&minPrice=${searchParams['min-price']}&maxPrice=${searchParams['max-price']}`,
        {
          headers: {
            propertyFacilityIdArr: [],
            propertyRoomFacilityIdArr: [],
            propertyTypeIdArr: [],
          },
        },
      )
      handleSuccess(res)
    } catch (err: any) {
      handleError(err)
    } finally {
      handleFinally()
    }
  }

  return {
    fetchDataProperties,
  }
}

export default useFetchDataPropertiesApi
