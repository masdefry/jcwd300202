'use client'

import React, { useEffect, useState } from 'react'
import { CiBoxList } from 'react-icons/ci'
import { FaArrowUpShortWide, FaRegStar } from 'react-icons/fa6'
import { RiLoginBoxLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { TbHomeCancel } from 'react-icons/tb'
import { CgArrowsScrollV } from 'react-icons/cg'
import { IoSearchSharp } from 'react-icons/io5'
import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { GiBackwardTime } from 'react-icons/gi'
import TablePropertyList from '@/features/tenant/property/list/components/TablePropertyList'
import TenantPropertiesGeneralInfo from '@/features/tenant/property/list/components/TenantPropertiesGeneralInfo'
import HGroupPropertyList from '@/features/tenant/property/list/components/HGroupPropertyList'
import { useDebouncedCallback } from 'use-debounce'

interface ISearchParams {
    sort: string
    limit: string
    offset: string
    select: string
    period: string
    name: string
}
const PropertyListPage = ({
  searchParams,
}: {
  searchParams: ISearchParams
}) => {
  const [searchProperty, setSearchProperty] = useState('')
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

  const {
    mutate: mutateSortedDataProperties,
    isPending: isPendingSortedDataProperties,
  } = useMutation({
    mutationFn: async ({
      orderBy,
      value,
    }: {
      orderBy: string
      value: string
    }) => {
      handleSearchParams(orderBy, value)
      handleSearchParams(
        'limit',
        searchParams?.limit ? searchParams?.limit.toString() : '10',
      )
      handleSearchParams(
        'offset',
        searchParams?.offset ? searchParams?.offset.toString() : '0',
      )
      setSearchParamsInState((state: ISearchParams) => {
        state.sort = value
        state.limit = '10'
        state.offset = '0'
        return state
      })
      const res = await instance.get(
        `/property/tenant?limit=${searchParamsInState?.limit || searchParams?.limit || 10}&offset=${searchParamsInState?.offset || searchParams?.offset || 0}&sortBy=${value?.split('-')[1] || 'name'}&order=${value?.split('-')[0] || 'asc'}&period=${searchParamsInState?.period || searchParams?.period || '30'}&name=${searchParamsInState?.name || searchParams?.name || ''}`,
      )
      return res?.data
    },
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

  const { mutate: mutateFilterByStatus, isPending: isPendingFilterByStatus } =
    useMutation({
      mutationFn: async ({ value }: { value: string }) => {
        handleSearchParams('select', value)
        handleSearchParams(
          'limit',
          searchParams?.limit ? searchParams?.limit.toString() : '10',
        )
        handleSearchParams(
          'offset',
          searchParams?.offset ? searchParams?.offset.toString() : '0',
        )
        setSearchParamsInState((state: ISearchParams) => {
          state.select = value
          state.limit = '10'
          state.offset = '0'
          return state
        })
        const res = await instance.get(
          `/property/tenant?limit=${searchParams?.limit || 10}&offset=${searchParams?.offset || 0}&sortBy=${searchParamsInState?.sort?.split('-')[1] || 'name'}&order=${searchParamsInState?.sort?.split('-')[0] || 'asc'}&filterBy=${value}&period=${searchParamsInState?.period || searchParams?.period || '30'}&name=${searchParams?.name || ''}`,
        )
        return res?.data
      },
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

  const { mutate: mutatePeriod, isPending: isPendingPeriod } = useMutation({
    mutationFn: async ({ value }: { value: string }) => {
      handleSearchParams('period', value)
      setSearchParamsInState((state: ISearchParams) => {
        state.period = value
        state.limit = '10'
        state.offset = '0'
        return state
      })
      const res = await instance.get(
        `/property/tenant?limit=${searchParams?.limit || 10}&offset=${searchParams?.offset || 0}&sortBy=${searchParamsInState?.sort?.split('-')[1] || 'name'}&order=${searchParamsInState?.sort?.split('-')[0] || 'asc'}&filterBy=${searchParamsInState?.select || searchParams?.select || ''}&period=${value}&name=${searchParams?.name || ''}`,
      )
      console.log(res)
      return res?.data
    },
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

  const [dataProperties, setDataProperties] = useState<any>({})
  const fetchDataProperties = async () => {
    try {
      const res = await instance.get(
        `/property/tenant?limit=${searchParams?.limit || 10}&offset=${searchParams?.offset || 0}&sortBy=${searchParams?.sort ? searchParams?.sort.split('-')[1] : 'name'}&order=${searchParams?.sort ? searchParams?.sort.split('-')[0] : 'asc'}&filterBy=${searchParamsInState?.select || searchParams?.select || ''}&period=${searchParamsInState?.period || searchParams?.period || '30'}&name=${searchParams?.name || ''}`,
      )
      if (res?.status === 200) {
        setDataProperties(res?.data?.data)
      }
      setIsPendingProperties(false)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchDataProperties()
  }, [])

  const handleMutateRefreshPage = ({
    limit,
    offset,
  }: {
    limit: number
    offset: number
  }) => {
    handleSearchParams('limit', limit.toString())
    handleSearchParams('offset', offset.toString())
    mutateRefreshPage({ limit, offset })
  }

  const { mutate: mutateRefreshPage, isPending: isPendingRefreshPage } =
    useMutation({
      mutationFn: async ({
        limit,
        offset,
      }: {
        limit: number
        offset: number
      }) => {
        setSearchParamsInState((state: ISearchParams) => {
          state.limit = limit.toString()
          state.offset = offset.toString()
          return state
        })
        const res = await instance.get(
          `/property/tenant?limit=${limit || 10}&offset=${offset || 0}&sortBy=${searchParamsInState?.sort?.split('-')[1] || searchParams?.sort?.split('-')[1] || 'name'}&order=${searchParamsInState?.sort?.split('-')[0] || searchParams?.sort?.split('-')[0] || 'asc'}&filterBy=${searchParamsInState?.select || searchParams?.select || ''}&period=${searchParamsInState?.period || searchParams?.period || '30'}&name=${searchParams?.name || ''}`,
        )
        return res?.data
      },
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

  const { mutate: mutateFilterByName, isPending: isPendingFilterByName } =
    useMutation({
      mutationFn: async (value: string) => {
        handleSearchParams('name', searchProperty)
        setSearchParamsInState((state: ISearchParams) => {
          state.name = value
          state.limit = '10'
          state.offset = '0'
          return state
        })
        const res = await instance.get(
          `/property/tenant?limit=${searchParams?.limit || 10}&offset=${searchParams?.offset || 0}&sortBy=${searchParamsInState?.sort?.split('-')[1] || searchParams?.sort?.split('-')[1] || 'name'}&order=${searchParamsInState?.sort?.split('-')[0] || searchParams?.sort?.split('-')[0] || 'asc'}&filterBy=${searchParamsInState?.select || searchParams?.select || ''}&period=${searchParamsInState?.period || searchParams?.period || '30'}&name=${value || searchProperty || ''}`,
        )
        return res?.data
      },
      onSuccess: (res) => {
        setDataProperties(res?.data)
      },
      onError: (err: any) => {
        console.log(err)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const debouncedFilterByName = useDebouncedCallback((value: string) => {
    mutateFilterByName(value)
  }, 500)

  return (
    <main className="overflow-x-auto">
      <section className="flex flex-col gap-5">
        <HGroupPropertyList isPending={isPendingProperties} />
        <TenantPropertiesGeneralInfo
          dataProperties={dataProperties}
          isPending={
            isPendingFilterByStatus ||
            isPendingSortedDataProperties ||
            isPendingPeriod ||
            isPendingRefreshPage ||
            isPendingProperties
          }
        />
        <section className="grid grid-cols-4 gap-2 min-w-[1080px]">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="sort"
              className="text-xs min-w-max font-bold text-gray-900 flex items-center gap-1.5"
            >
              <FaArrowUpShortWide />
              Sort by:
            </label>
            <select
              onChange={(e) =>
                mutateSortedDataProperties({
                  orderBy: 'sort',
                  value: e.target.value,
                })
              }
              defaultValue={searchParams?.sort || 'asc-name'}
              id="sort"
              className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="asc-name">Ascending by Name</option>
              <option value="desc-name">Descending by Name</option>
              <option value="asc-booked">Lowest to Highest Booked</option>
              <option value="desc-booked">Highest to Lowest Booked</option>
              <option value="asc-review">Lowest to Highest Ratings</option>
              <option value="desc-review">Highest to Lowest Ratings</option>
              <option value="asc-cancellation">
                Lowest to Highest Cancellation
              </option>
              <option value="desc-cancellation">
                Highest to Lowest Cancellation
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="filter-select"
              className="text-xs min-w-max font-bold text-gray-900 flex items-center gap-1.5"
            >
              <CgArrowsScrollV />
              Filter by:
            </label>
            <select
              onChange={(e) => mutateFilterByStatus({ value: e.target.value })}
              defaultValue={searchParams?.select || ''}
              id="filter-select"
              className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">All Properties</option>
              <option value="open">Bookable/Open</option>
              <option value="close">Unable to Order/Close</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="filter-input"
              className="text-xs min-w-max font-bold text-gray-900 flex items-center gap-1.5"
            >
              <IoSearchSharp />
              Filter by name:
            </label>
            <input
              type="text"
              name="filterInput"
              value={searchProperty}
              onChange={(e) => {
                setSearchProperty(e.target.value)
                debouncedFilterByName(e.target.value)
              }}
              placeholder="Search for your property..."
              className="border border-slate-300 bg-gray-50 placeholder-shown:text-xs font-semibold text-xs text-gray-800 rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="filter-period"
              className="text-xs min-w-max font-bold text-gray-900 flex items-center gap-1.5"
            >
              <GiBackwardTime />
              Period:
            </label>
            <select
              onChange={(e) => mutatePeriod({ value: e.target.value })}
              defaultValue={searchParams?.select || '30'}
              name="filter-period"
              id="filter-period"
              className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="1">Today</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="365">Last 365 Days</option>
            </select>
          </div>
        </section>
        <TablePropertyList
          dataProperties={dataProperties}
          handleMutateRefreshPage={handleMutateRefreshPage}
          isPending={
            isPendingFilterByStatus ||
            isPendingSortedDataProperties ||
            isPendingPeriod ||
            isPendingRefreshPage ||
            isPendingProperties
          }
        />
      </section>
    </main>
  )
}

export default PropertyListPage
