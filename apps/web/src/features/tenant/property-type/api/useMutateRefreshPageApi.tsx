'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { ISearchParamsTenantPropertyType } from '../types'

const useMutateRefreshPageApi = ({
  paramMutatePage,
  searchParams,
  onError,
  onSuccess,
}: {
  paramMutatePage: any
  searchParams: ISearchParamsTenantPropertyType
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const { mutate: mutateRefreshPage, isPending: isPendingRefreshPage } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.get(
          `/property-type?name=${paramMutatePage?.name ? paramMutatePage?.name : searchParams?.name ? searchParams?.name : ''}&order=${paramMutatePage?.order ? paramMutatePage?.order : searchParams?.order ? searchParams?.order : 'asc'}&limit=${paramMutatePage?.limit ? paramMutatePage?.limit : searchParams?.limit ? searchParams?.limit : 5}&offset=${paramMutatePage?.offset ? paramMutatePage?.offset : searchParams?.offset ? searchParams?.offset : 0}`,
        )
        return res?.data
      },
      onSuccess,
      onError,
    })

  return {
    mutateRefreshPage,
    isPendingRefreshPage,
  }
}

export default useMutateRefreshPageApi
