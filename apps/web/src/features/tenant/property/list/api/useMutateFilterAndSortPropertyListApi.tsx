'use client'

import { useMutation } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import { AxiosResponse } from 'axios'
import { ISearchParamsPropertyList } from '../types'

const useMutateFilterAndSortPropertyListApi = ({
  searchProperty,
  searchParams,
  searchParamsInState,
  onSuccess,
  onError,
}: {
  onSuccess: (res: AxiosResponse) => void
  onError: (err: any) => void
  searchParamsInState: any
  searchParams: ISearchParamsPropertyList
  searchProperty: string
}) => {
  const {
    mutate: mutateFilterAndSortPropertyList,
    isPending: isPendingFilterAndSortPropertyList,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.get(
        `/property/tenant?limit=${searchParamsInState?.limit ? searchParamsInState?.limit : searchParams?.limit ? searchParams?.limit : 10}&offset=${searchParamsInState?.offset ? searchParamsInState?.offset : searchParams?.offset ? searchParams?.offset : 0}&sortBy=${searchParamsInState?.sort?.split('-')[1] ? searchParamsInState?.sort?.split('-')[1] : searchParams?.sort?.split('-')[1] ? searchParams?.sort?.split('-')[1] : 'name'}&order=${searchParamsInState?.sort?.split('-')[0] ? searchParamsInState?.sort?.split('-')[0] : searchParams?.sort?.split('-')[0] ? searchParams?.sort?.split('-')[0] : 'asc'}&filterBy=${searchParamsInState?.select ? searchParamsInState?.select : searchParams?.select ? searchParams?.select : ''}&period=${searchParamsInState?.period ? searchParamsInState?.period : searchParams?.period ? searchParams?.period : '30'}&name=${searchParamsInState?.name ? searchParamsInState?.name : searchProperty ? searchProperty : ''}`,
      )
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateFilterAndSortPropertyList,
    isPendingFilterAndSortPropertyList,
  }
}

export default useMutateFilterAndSortPropertyListApi
