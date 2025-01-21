'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import {
  ISearchParamsExplore,
  IUseExploreProperties,
  THandleSearchParams,
} from '../types'

const useMutateExploreFilterAndSortApi = ({
  searchParams,
  paramMutateExplore,
  propertyFacilityIdArr,
  propertyRoomFacilityIdArr,
  propertyTypeIdArr,
  propertyStarArr,
  onError,
  onSuccess,
}: Pick<
  IUseExploreProperties,
  | 'paramMutateExplore'
  | 'propertyFacilityIdArr'
  | 'propertyRoomFacilityIdArr'
  | 'propertyTypeIdArr'
  | 'propertyStarArr'
> & {
  searchParams: ISearchParamsExplore
  onError: (err: any) => void
  onSuccess: (res: any) => void
}) => {
  const {
    mutate: mutateExploreFilterAndSort,
    isPending: isPendingExploreFilterAndSort,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.get(
        `/property?countryId=${searchParams.country}&cityId=${searchParams.city}&name=${paramMutateExplore?.name ? paramMutateExplore?.name : searchParams.name ? searchParams.name : ''}&checkInDate=${searchParams['check-in-date']}&checkOutDate=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}&offset=0&limit=5&order=${paramMutateExplore?.order ? paramMutateExplore?.order : searchParams.order ? searchParams.order : 'asc'}&sortBy=${paramMutateExplore?.sort ? paramMutateExplore?.sort : searchParams.sort ? searchParams.sort : 'price'}&minPrice=${paramMutateExplore?.minPrice ? paramMutateExplore?.minPrice : searchParams['min-price'] ? searchParams['min-price'] : 0}&maxPrice=${paramMutateExplore?.maxPrice ? paramMutateExplore?.maxPrice : searchParams['max-price'] ? searchParams['max-price'] : 0}&type=${searchParams.type}`,
        {
          headers: {
            propertyFacilityIdArr,
            propertyRoomFacilityIdArr,
            propertyTypeIdArr,
            propertyStarArr,
          },
        },
      )
      console.log('FILTERRING', res)
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateExploreFilterAndSort,
    isPendingExploreFilterAndSort,
  }
}

export default useMutateExploreFilterAndSortApi
