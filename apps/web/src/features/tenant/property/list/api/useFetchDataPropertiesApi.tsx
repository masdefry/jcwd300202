'use client'

import instance from '@/utils/axiosInstance'
import { AxiosResponse } from 'axios'
import React from 'react'
import { ISearchParamsPropertyList } from '../types'

const useFetchDataPropertiesApi = ({
  handleSuccess,
  handleError,
  handleFinally,
  searchParams,
  searchParamsInState,
}: {
  handleSuccess: (res: AxiosResponse) => void
  handleError: (err: any) => void
  handleFinally: () => void
  searchParams: ISearchParamsPropertyList
  searchParamsInState: ISearchParamsPropertyList
}) => {
  const fetchDataProperties = async () => {
    try {
      const res = await instance.get(
        `/property/tenant?limit=${searchParams?.limit || 10}&offset=${searchParams?.offset || 0}&sortBy=${searchParams?.sort ? searchParams?.sort.split('-')[1] : 'name'}&order=${searchParams?.sort ? searchParams?.sort.split('-')[0] : 'asc'}&filterBy=${searchParamsInState?.select ? searchParamsInState?.select : searchParams?.select ? searchParams?.select : ''}&period=${searchParamsInState?.period ? searchParamsInState?.period : searchParams?.period ? searchParams?.period : '30'}&name=${searchParams?.name || ''}`,
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
