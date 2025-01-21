'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import useMutateRefreshPageApi from '../api/useMutateRefreshPageApi'
import toast from 'react-hot-toast'
import useFetchDataPropertyTypesApi from '../api/useFetchDataPropertyTypesApi'
import useMutateCreatePropertyTypeApi from '../api/useMutateCreatePropertyTypeApi'
import useMutateUpdatePropertyTypeApi from '../api/useMutateUpdatePropertyTypeApi'
import useMutateDeletePropertyTypeApi from '../api/useMutateDeletePropertyTypeApi'
import { ISearchParamsTenantPropertyType } from '../types'

const useManagePropertyTypeHook = ({
  searchParams,
}: {
  searchParams: ISearchParamsTenantPropertyType
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [paramMutatePage, setParamMutatePage] = useState({
    order: '',
    name: '',
    limit: '',
    offset: '',
  })
  const [isError, setIsError] = useState(false)
  const [dataPropertyTypes, setDataPropertyTypes] = useState<any>()
  const params = new URLSearchParams()
  const handleSearchParams = (orderBy: string, value: string) => {
    const currParams = window.location.href.includes('/property-type?')
      ? window.location.href.split('?')[1].split('&')
      : null

    currParams &&
      currParams.forEach((item: any) => {
        params.set(item.split('=')[0], item.split('=')[1])
      })
    params.set(orderBy, value)
    window.history.pushState({}, '', '?' + params.toString())
  }

  const { mutateRefreshPage, isPendingRefreshPage } = useMutateRefreshPageApi({
    paramMutatePage,
    searchParams,
    onSuccess: (res) => {
      setDataPropertyTypes(res?.data)
    },
    onError: (err) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const { fetchDataPropertyTypes } = useFetchDataPropertyTypesApi({
    handleError(err) {
      setIsError(true)
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
    handleSuccess(res) {
      setDataPropertyTypes(res?.data?.data)
    },
    handleFinally() {
      setIsLoading(false)
    },
    searchParams,
  })

  const { mutateCreatePropertyType, isPendingCreatePropertyType } =
    useMutateCreatePropertyTypeApi({
      onSuccess: (res) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        window.location.reload()
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const handleCreatePropertyType = (values: any) => {
    mutateCreatePropertyType(values)
  }

  const handleDeletePropertyType = ({
    id,
    password,
  }: {
    id: number
    password: string
  }) => {
    mutateDeletePropertyType({ id, password })
  }

  const handleUpdatePropertyType = (values: any) => {
    mutateUpdatePropertyType(values)
  }

  const { mutateUpdatePropertyType, isPendingUpdatePropertyType } =
    useMutateUpdatePropertyTypeApi({
      onSuccess: (res) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const { mutateDeletePropertyType, isPendingDeletePropertyType } =
    useMutateDeletePropertyTypeApi({
      onSuccess: (res) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        window.location.reload()
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const handlePagination = ({
    limit,
    offset,
  }: {
    limit: string
    offset: string
  }) => {
    handleSearchParams('limit', limit)
    handleSearchParams('offset', offset)
    setParamMutatePage((state) => {
      state.limit = limit
      state.offset = offset
      return state
    })
    mutateRefreshPage()
  }
  const handleSort = (order: string) => {
    handleSearchParams('order', order)
    setParamMutatePage((state) => {
      state.order = order
      state.limit = '5'
      state.offset = '0'
      return state
    })
    mutateRefreshPage()
  }
  const handleFilter = (name: string) => {
    handleSearchParams('name', name)
    setParamMutatePage((state) => {
      state.name = name
      state.limit = '5'
      state.offset = '0'
      return state
    })
    mutateRefreshPage()
  }

  return {
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    dataPropertyTypes,
    setDataPropertyTypes,
    paramMutatePage,
    setParamMutatePage,
    mutateCreatePropertyType,
    isPendingCreatePropertyType,
    mutateDeletePropertyType,
    isPendingDeletePropertyType,
    mutateUpdatePropertyType,
    isPendingUpdatePropertyType,
    mutateRefreshPage,
    isPendingRefreshPage,
    handleCreatePropertyType,
    handleDeletePropertyType,
    handleUpdatePropertyType,
    handlePagination,
    handleSort,
    handleFilter,
    fetchDataPropertyTypes,
  }
}
export default useManagePropertyTypeHook
