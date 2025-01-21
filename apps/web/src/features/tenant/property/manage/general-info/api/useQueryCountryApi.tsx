'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryCountryApi = ({ setCountryList }: { setCountryList: any }) => {
    const { isPending: isPendingCountries, isError: isErrorCountries } = useQuery({
        queryKey: ['getCountries'],
        queryFn: async () => {
          const res = await instance.get('/country?limit=10000')
          const dataForCountryList = res?.data?.data?.countries?.map(
            (item: any) => {
              return {
                label: item?.name,
                value: item?.id,
              }
            },
          )
          setCountryList(dataForCountryList)
          return res
        },
      })
  
    return {
        isPendingCountries,
        isErrorCountries
    }
}

export default useQueryCountryApi
