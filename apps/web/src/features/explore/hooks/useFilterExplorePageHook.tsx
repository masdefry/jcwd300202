'use client'

import useFilteringPropertyHook from '@/features/property/hooks/useFilteringPropertyHook'
import instance from '@/utils/axiosInstance'
import React, { useState } from 'react'
import useMutateFilterExplorePageApi from '../api/useMutateFilterExplorePageApi'

const useFilterExplorePageHook = ({
  searchParams,
}: {
  searchParams: {
    'min-price': string
    'max-price': string
    country: string
    city: string
    'check-in-date': string
    'check-out-date': string
    sort: string
    order: string
    limit: string
    offset: string
    adult: string
    children: string
  }
}) => {
  const [dataProperties, setDataProperties] = useState<any>()
  const [propertyFacilityIdArr, setPropertyFacilityIdArr] = useState<any[]>([])
  const [propertyRoomFacilityIdArr, setPropertyRoomFacilityIdArr] = useState<any[]>([])
  const [sort, setSort] = useState({ sortBy: 'price', order: 'asc' })
  const [propertyTypeIdArr, setPropertyTypeIdArr] = useState<any[]>([])
  const [propertyStarArr, setPropertyStarArr] = useState<any[]>([])
  const [filterMobileMode, setFilterMobileMode] = useState(false)
  const [sortMobileMode, setSortMobileMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000000)
  const urlParams = new URLSearchParams({})
  const handleSearchParams = (orderBy: string, value: string) => {
    const currParams = window.location.href.includes('/search?')
      ? window.location.href.split('?')[1].split('&')
      : null

    currParams &&
      currParams.forEach((item: any) => {
        urlParams.set(
          item.split('=')[0],
          decodeURIComponent(item.split('=')[1]),
        )
      })
    urlParams.set(orderBy, value)
    window.history.pushState({}, '', '?' + urlParams.toString())
  }
  const { mutateExplorePagination, isPendingExplorePagination } =
    useMutateFilterExplorePageApi({
      handleSearchParams,
      searchParams,
      propertyFacilityIdArr,
      propertyRoomFacilityIdArr,
      propertyTypeIdArr,
      propertyStarArr,
      setDataProperties,
      setSortMobileMode,
      sort
    })

  const handlePrice = () => {
    if (priceType === 'minPrice') {
      if (
        Number(event.target.value) < maxPrice &&
        Number(event.target.value) >= 0
      ) {
        setMinPrice(Number(event.target.value))
      } else {
        setMinPrice(minPrice)
      }
      handleSearchParams('min-price', event.target.value)
    } else if (priceType === 'maxPrice') {
      if (
        Number(event.target.value) > minPrice &&
        Number(event.target.value) > 0
      ) {
        setMaxPrice(Number(event.target.value))
      } else {
        setMaxPrice(maxPrice)
      }
      handleSearchParams('max-price', event.target.value)
    }
  }
    const handlePrice = () => {
      handleSearchParams('min-price', minPrice.toString())
      handleSearchParams('max-price', maxPrice.toString())

      mutateExplorePagination({})
    }
  const handlePropertyFacilityFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyFacilityIdArr([...propertyFacilityIdArr, value])
    } else {
      setPropertyFacilityIdArr((state) =>
        state.filter((item) => item !== value),
      )
    }
    mutateExplorePagination({})
  }
  const handlePropertyRoomFacilityFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyRoomFacilityIdArr([...propertyRoomFacilityIdArr, value])
    } else {
      setPropertyRoomFacilityIdArr((state) =>
        state.filter((item) => item !== value),
      )
    }
    mutateExplorePagination({})
  }

  const handleSort = (value: string ) => {
    handleSearchParams('sort', value.split('-')[1])
    handleSearchParams('order', value.split('-')[0])
    setSort({
      sortBy: value.split('-')[1],
      order: value.split('-')[0],
    })
    // searchParams['sort'] = value.split('-')[1]
    // searchParams.order =value.split('-')[0]
    mutateExplorePagination({
      sortBy: value.split('-')[1],
      order: value.split('-')[0],
    })
    mutateExplorePagination({})
  }
  const handlePropertyTypeIdFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyTypeIdArr([...propertyTypeIdArr, value])
    } else {
      setPropertyTypeIdArr((state) => state.filter((item) => item !== value))
    }
    mutateExplorePagination({})
  }
  const handlePropertyStarFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyStarArr([...propertyStarArr, value])
    } else {
      setPropertyStarArr((state) => state.filter((item) => item !== value))
    }
    mutateExplorePagination({})
  }
  const [showFilterPropertyFacility, setShowFilterPropertyFacility] =
    useState(false)
  const [showFilterPropertyRoomFacility, setShowFilterPropertyRoomFacility] =
    useState(false)
  const [showPropertyType, setShowPropertyType] = useState(false)
  const { dataForFilteringProperty, setDataForFilteringProperty } =
    useFilteringPropertyHook()

  const fetchDataProperties = async () => {
    try {
      const res = await instance.get(
        `/property?countryId=${searchParams.country}&cityId=${searchParams.city}&checkInDate=${searchParams['check-in-date']}&checkOutDate=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}&offset=0&limit=5&order=asc&sortBy=price`,
        {
          headers: {
            propertyFacilityIdArr: [],
            propertyRoomFacilityIdArr: [],
            propertyTypeIdArr: [],
          },
        },
      )
      if (res.status === 200) {
        setIsLoading(false)
        setDataProperties(res?.data?.data)
        setDataForFilteringProperty(res?.data?.data?.dataForFilteringProperty)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return {
    handleSort,
    handlePrice,
    handlePropertyFacilityFilter,
    handlePropertyRoomFacilityFilter,
    handlePropertyStarFilter,
    handlePropertyTypeIdFilter,
    handleSearchParams,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    setFilterMobileMode,
    showFilterPropertyRoomFacility,
    showFilterPropertyFacility,
    showPropertyType,
    setShowFilterPropertyFacility,
    setShowFilterPropertyRoomFacility,
    setShowPropertyType,
    dataProperties,
    isLoading,
    setIsLoading,
    isPendingExplorePagination,
    setSortMobileMode,
    mutateExplorePagination,
    dataForFilteringProperty,
    filterMobileMode,
    sortMobileMode,
    fetchDataProperties,
  }
}

export default useFilterExplorePageHook
