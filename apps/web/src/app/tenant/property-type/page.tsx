'use client'

import React, { useEffect, useState } from 'react'
import HGroupPropertyType from './HGroupPropertyType'
import PropertyTypeList from './PropertyTypeList'
import FilterAndSortPropertyType from './FilterAndSortPropertyType'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import ButtonPropertyTypePagination from './ButtonPropertyTypePagination'

export interface ISearchParamsTenantPropertyType {
  order: string
  name: string
  limit: string
  offset: string
}
const TenantPropertyTypePage = ({
  searchParams,
}: {
  searchParams: ISearchParamsTenantPropertyType
}) => {
  const router = useRouter()
  const [ isLoading, setIsLoading ] = useState(true)
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

  const { mutate: mutateRefreshPage, isPending: isPendingRefreshPage } = useMutation({
    mutationFn: async () => {
      console.log('res', paramMutatePage)
      const res = await instance.get(
        `/property-type?name=${paramMutatePage?.name ? paramMutatePage?.name : searchParams?.name ? searchParams?.name : ''}&order=${paramMutatePage?.order ? paramMutatePage?.order : searchParams?.order ? searchParams?.order : 'asc'}&limit=${paramMutatePage?.limit ? paramMutatePage?.limit : searchParams?.limit ? searchParams?.limit : 5}&offset=${paramMutatePage?.offset ? paramMutatePage?.offset : searchParams?.offset ? searchParams?.offset : 0}`,
      )
      return res?.data
    },
    onSuccess: (res) => {
      setDataPropertyTypes(res?.data)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const fetchDataPropertyTypes = async () => {
    try {
      const res = await instance.get(
        `/property-type?name=${searchParams?.name || ''}&order=${searchParams?.order || 'asc'}&limit=${searchParams?.limit || 5}&offset=${searchParams?.offset || 0}`,
      )

      setDataPropertyTypes(res?.data?.data)
      setIsLoading(false)
    } catch (error) {
      setIsError(true)
    }
  }

  const { mutate: mutateCreatePropertyType, isPending: isPendingCreatePropertyType } = useMutation({
    mutationFn: async (values: any) => {
      const res = await instance.post('/property-type', {
        name: values?.name,
        description: values?.description,
      })

      return res?.data
    },
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
  const { mutate: mutateUpdatePropertyType } = useMutation({
    mutationFn: async (values: any) => {
      const res = await instance.patch('/property-type', {
        propertyTypeId: values?.id,
        name: values?.name,
        description: values?.description,
      })

      return res?.data
    },
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

  const { mutate: mutateDeletePropertyType, isPending: isPendingDeletePropertyType } = useMutation({
    mutationFn: async ({ id, password }: { id: number; password: string }) => {
      const res = await instance.patch('/property-type/delete', {
        propertyTypeId: id,
        password,
      })

      return res?.data
    },
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

  useEffect(() => {
    fetchDataPropertyTypes()
  }, [])
  return (
    <main className="overflow-x-auto">
      <section className="flex flex-col gap-5">
        <HGroupPropertyType isPending={isLoading} />
        <FilterAndSortPropertyType
          isPending={isLoading}
          handleCreatePropertyType={handleCreatePropertyType}
          searchParams={searchParams}
          handleSort={handleSort}
          handleFilter={handleFilter}
        />
        <div className="w-[1080px]">
          <PropertyTypeList
            isPending={isLoading || isPendingCreatePropertyType || isPendingDeletePropertyType || isPendingRefreshPage}
            offset={dataPropertyTypes?.offset}
            handleCreatePropertyType={handleCreatePropertyType}
            handleDeletePropertyType={handleDeletePropertyType}
            dataPropertyTypes={dataPropertyTypes?.propertyTypes}
            handleUpdatePropertyType={handleUpdatePropertyType}
          />
        </div>
        <div className="w-[1080px]">
        <ButtonPropertyTypePagination
          isPending={false}
          dataPropertyTypes={dataPropertyTypes}
          handlePagination={handlePagination}
          />
          </div>
      </section>
    </main>
  )
}

export default TenantPropertyTypePage
