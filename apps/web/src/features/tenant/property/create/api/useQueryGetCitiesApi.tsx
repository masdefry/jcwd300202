'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryGetCitiesApi = ({ setCityList }: {setCityList: any}) => {
    const { isPending: isPendingCities } = useQuery({
        queryKey: ['getCities'],
        queryFn: async () => {
          const res = await instance.get('/city?limit=10000')
          const dataForCityList = res?.data?.data?.cities?.map((item: any) => {
            return {
              label: `${item?.name}, ${item?.country?.name}`,
              value: item?.id,
            }
          })
          setCityList(dataForCityList)
          return res
        },
      })
  
    return {
        isPendingCities
  }
}

export default useQueryGetCitiesApi
