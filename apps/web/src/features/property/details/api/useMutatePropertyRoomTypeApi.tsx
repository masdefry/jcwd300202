'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { addDays } from 'date-fns'
import React from 'react'
import { ISearchParamsPropertyDetails } from '../types'

const useMutatePropertyRoomTypeApi = ({ onSuccess, onError, params, searchParams, adult, children }: { adult: number, children: number, searchParams: ISearchParamsPropertyDetails, onSuccess: (res: AxiosResponse) => void,  onError: (err: any) => void, params: { slug: string } }) => {
    const {
        mutate: mutatePropertyRoomType,
        isPending: isPendingPropertyRoomType,
      } = useMutation({
        mutationFn: async ({
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

          const res = await instance.get(
            `/room-type/property/${params?.slug}/search?limit=${limit || '2'}&offset=${offset || '0'}&checkInDate=${checkInDate ? checkInDate : searchParams['check-in-date'] ? searchParams['check-in-date'] : new Date().toISOString()}&checkOutDate=${checkOutDate ? checkOutDate : searchParams['check-out-date'] ? searchParams['check-out-date'] : addDays(new Date(), 1).toISOString()}&adult=${adult ? adult : searchParams.adult ? searchParams.adult : 1}&children=${children ? children : searchParams.children ? searchParams.children : 0}`,
          )
          return res?.data
        },
        onSuccess,
        onError,
      })
  
    return {
        mutatePropertyRoomType,
        isPendingPropertyRoomType
    }
}

export default useMutatePropertyRoomTypeApi
