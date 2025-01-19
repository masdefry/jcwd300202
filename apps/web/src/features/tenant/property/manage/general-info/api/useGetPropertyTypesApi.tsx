'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetPropertyTypesApi = ({ setPropertyTypes }: {setPropertyTypes: any}) => {
    const { isPending: isPendingPropertyTypes, isError: isErrorPropertyTypes } = useQuery({
        queryKey: ['getPropertyTypes'],
        queryFn: async () => {
          const res = await instance.get('/property-type/search?limit=10000')
          const dataForPropertyTypes = res?.data?.data?.map((item: any) => {
            return {
              label: item?.name,
              value: item?.id,
            }
          })
          setPropertyTypes(dataForPropertyTypes)
          return res
        },
      })
  
    return {
        isPendingPropertyTypes,
        isErrorPropertyTypes
    }
}

export default useGetPropertyTypesApi
