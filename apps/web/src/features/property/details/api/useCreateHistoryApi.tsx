'use client'

import instance from '@/utils/axiosInstance'
import { AxiosResponse } from 'axios'
import React from 'react'

const useCreateHistoryApi = ({
  handleSuccess,
  handleError,
  params,
}: {
  handleSuccess?: (res: AxiosResponse) => void
  handleError?: (err: any) => void
  params: { slug: string }
}) => {
    const createHistory = async() => {
        try {
            const res = await instance.post(`/history/${params?.slug}`)

        } catch (err) {
        }
    }
  
    return {
        createHistory
    }
}

export default useCreateHistoryApi
