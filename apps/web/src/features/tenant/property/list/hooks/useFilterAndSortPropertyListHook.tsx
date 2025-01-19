'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import useMutateFilterAndSortPropertyListApi from '../api/useMutateFilterAndSortPropertyListApi'
import useFetchDataPropertiesApi from '../api/useFetchDataPropertiesApi'
import { ISearchParamsPropertyList } from '../types'

const useFilterAndSortPropertyListHook = ({
  searchParams,
}: {
  searchParams: ISearchParamsPropertyList
}) => {
  const [searchProperty, setSearchProperty] = useState(searchParams?.name || '')
  const params = new URLSearchParams()
  const [isPendingProperties, setIsPendingProperties] = useState(true)
  const [searchParamsInState, setSearchParamsInState] = useState<{
    sort: string
    limit: string
    offset: string
    select: string
    period: string
    name: string
  }>({ sort: '', limit: '', offset: '', select: '', period: '', name: '' })
  const pathname = usePathname()
  const handleSearchParams = (orderBy: string, value: string) => {
    const currParams = window.location.href.includes('/list?')
      ? window.location.href.split('?')[1].split('&')
      : null

    currParams &&
      currParams.forEach((item: any) => {
        params.set(item.split('=')[0], item.split('=')[1])
      })
    params.set(orderBy, value)
    window.history.pushState({}, '', '?' + params.toString())
  }
  const [dataProperties, setDataProperties] = useState<any>({})

  const { fetchDataProperties } = useFetchDataPropertiesApi({
    handleError(err) {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
    handleSuccess(res) {
      setDataProperties(res?.data?.data)
    },
    handleFinally() {
      setIsPendingProperties(false)
    },
    searchParams,
    searchParamsInState,
  })

  const {
    mutateFilterAndSortPropertyList,
    isPendingFilterAndSortPropertyList,
  } = useMutateFilterAndSortPropertyListApi({
    searchParams,
    searchProperty,
    searchParamsInState,
    onSuccess: (res) => {
      setDataProperties(res?.data)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const handleSortedDataProperties = ({
    orderBy,
    value,
  }: {
    orderBy: string
    value: string
  }) => {
    handleSearchParams(orderBy, value)
    handleSearchParams('limit', '10')
    handleSearchParams('offset', '0')
    setSearchParamsInState((state: ISearchParamsPropertyList) => {
      state.sort = value
      state.limit = '10'
      state.offset = '0'
      return state
    })
    mutateFilterAndSortPropertyList()
  }

  const handleFilterByStatus = ({ value }: { value: string }) => {
    handleSearchParams('select', value)
    handleSearchParams('limit', '10')
    handleSearchParams('offset', '0')
    setSearchParamsInState((state: ISearchParamsPropertyList) => {
      state.select = value
      state.limit = '10'
      state.offset = '0'
      return state
    })
    mutateFilterAndSortPropertyList()
  }

  const handlePeriod = ({ value }: { value: string }) => {
    handleSearchParams('period', value)
    handleSearchParams('limit', '10')
    handleSearchParams('offset', '0')
    setSearchParamsInState((state: ISearchParamsPropertyList) => {
      state.period = value
      state.limit = '10'
      state.offset = '0'
      return state
    })
    mutateFilterAndSortPropertyList()
  }

  const handlePagination = ({
    limit,
    offset,
  }: {
    limit: number
    offset: number
  }) => {
    handleSearchParams('limit', limit.toString())
    handleSearchParams('offset', offset.toString())
    setSearchParamsInState((state: ISearchParamsPropertyList) => {
      state.limit = limit.toString()
      state.offset = offset.toString()
      return state
    })
    mutateFilterAndSortPropertyList()
  }

  const debouncedMutateFilterAndSortPropertyList = useDebouncedCallback(() => {
    mutateFilterAndSortPropertyList()
  }, 500)

  const handleFilterByName = (value: string) => {
    handleSearchParams('name', value)
    handleSearchParams('limit', '10')
    handleSearchParams('offset', '0')
    setSearchParamsInState((state: ISearchParamsPropertyList) => {
      state.name = value
      state.limit = '10'
      state.offset = '0'
      return state
    })

    debouncedMutateFilterAndSortPropertyList()
  }

  return {
    searchProperty,
    setSearchProperty,
    searchParamsInState,
    handleFilterByName,
    handleFilterByStatus,
    handlePagination,
    handlePeriod,
    handleSearchParams,
    handleSortedDataProperties,
    fetchDataProperties,
    dataProperties,
    isPendingProperties,
    isPendingFilterAndSortPropertyList,
  }
}

export default useFilterAndSortPropertyListHook
