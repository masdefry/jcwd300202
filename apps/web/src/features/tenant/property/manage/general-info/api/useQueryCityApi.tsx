'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryCityApi = ({ setCityList }: { setCityList: any }) => {
    const { isPending: isPendingCities, isError: isErrorCities } = useQuery({
        queryKey: ['getCities'],
        queryFn: async () => {
          const res = await instance.get('/city?limit=10000')
          const dataForCityList = res?.data?.data?.cities?.map((item: any) => {
            return {
              label: item?.name,
              value: item?.id,
            }
          })
          setCityList(dataForCityList)
          return res
        },
      })
  
    return {
        isPendingCities,
        isErrorCities
    }
}

export default useQueryCityApi
