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

const PropertyListPage = ({
  searchParams,
}: {
  searchParams: { sort: string; limit: string; offset: string, select: string }
}) => {
  const params = new URLSearchParams()
  const [searchParamsInState, setSearchParamsInState] = useState<any>({}) 
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

  const { mutate: mutateSortedDataProperties } = useMutation({
    mutationFn: async ({
      orderBy,
      value,
    }: {
      orderBy: string
      value: string
    }) => {
      handleSearchParams(orderBy, value)
      handleSearchParams('limit', searchParams?.limit ? searchParams?.limit.toString() : '10')
      handleSearchParams('offset', searchParams?.offset ? searchParams?.offset.toString() : '0')
      setSearchParamsInState((state: any) => ({...state, sortBy: value.split('-')[1], order: value.split('-')[0], limit: 10, offset: 0}))
      const res = await instance.get(`/property/tenant?limit=${searchParams?.limit || 10}&offset=${searchParams?.offset || 0}&sortBy=${value.split('-')[1] || 'name'}&order=${value.split('-')[0] || 'asc'}`)
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

  const { mutate: mutateFilterByDataProperties } = useMutation({
    mutationFn: async ({
      value,
    }: {
      value: string
    }) => {
      handleSearchParams('select', value)
      handleSearchParams('limit', searchParams?.limit ? searchParams?.limit.toString() : '10')
      handleSearchParams('offset', searchParams?.offset ? searchParams?.offset.toString() : '0')
      setSearchParamsInState((state: any) => ({...state, select: value, limit: 10, offset: 0}))
      const res = await instance.get(`/property/tenant?limit=${searchParams?.limit || 10}&offset=${searchParams?.offset || 0}&sortBy=${searchParamsInState?.sortBy || 'name'}&order=${searchParamsInState?.order || 'asc'}&filterBy=${value}`)
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
  const fetchDataProperties = async() => {
    const res = await instance.get(`/property/tenant?limit=${searchParams?.limit || 10}&offset=${searchParams?.offset || 0}&sortBy=${searchParams?.sort ? searchParams?.sort.split('-')[1] : 'name'}&order=${searchParams?.sort ? searchParams?.sort.split('-')[0] : 'asc'}&filterBy=${searchParams?.select || ''}`)
      if(res?.status === 200) {
        setDataProperties(res?.data?.data)
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
        setSearchParamsInState((state: any) => ({...state, limit, offset}))
        const res = await instance.get(`/property/tenant?limit=${limit || 10}&offset=${offset || 0}&sortBy=${searchParamsInState?.sortBy || 'name'}&order=${searchParamsInState?.order ||  'asc'}&filterBy=${searchParamsInState?.filterBy}`)
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

  return (
    <main className="flex flex-col gap-5">
      <hgroup className="flex flex-col pb-5 border-b-4 border-slate-700">
        <h1 className="text-2xl font-bold text-gray-800">Property List</h1>
        <p className="text-sm font-medium text-gray-500">
          Effortlessly Manage and Monitor Your Active Properties
        </p>
      </hgroup>
      <section>
        <div className="grid grid-cols-5 rounded-md py-5 shadow-md bg-white border border-slate-100">
          <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
            <CiBoxList size={23} className="text-gray-600 ml-[-4px] mb-2" />
            <p className="text-xl font-bold text-gray-800">0</p>
            <p className="text-sm font-medium text-blue-700">Reservation</p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
            <RiLoginBoxLine
              size={23}
              className="text-gray-600 ml-[-4px] mb-2"
            />
            <p className="text-xl font-bold text-gray-800">0</p>
            <p className="text-sm font-medium text-blue-700">Arrival</p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
            <RiLogoutBoxRLine
              size={23}
              className="text-gray-600 ml-[-4px] mb-2"
            />
            <p className="text-xl font-bold text-gray-800">0</p>
            <p className="text-sm font-medium text-blue-700">Departure</p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
            <FaRegStar size={23} className="text-gray-600 ml-[-4px] mb-2" />
            <p className="text-xl font-bold text-gray-800">0</p>
            <p className="text-sm font-medium text-blue-700">Review</p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start px-5">
            <TbHomeCancel size={23} className="text-gray-600 ml-[-4px] mb-2" />
            <p className="text-xl font-bold text-gray-800">0</p>
            <p className="text-sm font-medium text-blue-700">Cancellation</p>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-3">
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
            defaultValue={searchParams?.sort || "asc-name"}
            id="sort"
            className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="asc-name">Ascending by Name</option>
            <option value="desc-name">Descending by Name</option>
            <option value="asc-booked">
              Lowest to Highest Booked
            </option>
            <option value="desc-booked">
              Highest to Lowest Booked
            </option>
            <option value="asc-review">Lowest to Highest Review</option>
            <option value="desc-review">Highest to Lowest Review</option>
            <option value="asc-cancellation">Lowest to Highest Cancellation</option>
            <option value="desc-cancellation">Highest to Lowest Cancellation</option>
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
            onChange={(e) => mutateFilterByDataProperties({value: e.target.value})}
            defaultValue={searchParams?.select || ""}
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
            Filter by:
          </label>
          <input
            type="text"
            name="filterInput"
            placeholder="Filter by name, city, or country"
            className="border border-slate-300 bg-gray-50 placeholder-shown:text-xs font-semibold text-xs text-gray-800 rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </section>
      <section>
        <div className="overflow-x-auto flex flex-col gap-4">
          <table className="table table-xs">
            <thead className="text-gray-800">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Booked</th>
                <th>Review</th>
                <th>Cancellation</th>
              </tr>
            </thead>
            <tbody>
              {dataProperties?.properties?.map((item: any, index: number) => {
                return (
                  <tr>
                    <th>{Number(dataProperties?.offset) + index + 1}</th>
                    <td className="hover:text-blue-800 transition duration-100 underline active:text-blue-500">
                      <Link href={`/tenant/property/manage/${item?.slug}`}>
                        {item?.name}
                      </Link>
                    </td>
                    <td>{item?.address}</td>
                    <td className={`${item?.availability ? 'text-green-700' : 'text-red-600'}`}>{item?.availability ? 'Open' : 'Close'}</td>
                    <td>{item?.totalBooked}</td>
                    <td>{item?.avgRating}</td>
                    <td>{item?.totalCancelled}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-center w-full">
            <div className="join">
              {Array.from({ length: dataProperties?.totalPage }).map(
                (_, index) => {
                  return (
                    <button
                      onClick={() =>
                        handleMutateRefreshPage({ limit: 10, offset: 10 * index })
                      }
                      className={`join-item btn btn-sm scale:90 ${dataProperties?.pageInUse === index + 1 && 'btn-active'}`}
                    >
                      {index + 1}
                    </button>
                  )
                },
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PropertyListPage
