'use client'

import React, { useState } from 'react'
import { ISearchParamsExplore } from '../types'
import useSearchHook from '@/hooks/useSearchHook'

const useStateExploreHook = ({
  searchParams,
}: {
  searchParams: ISearchParamsExplore
}) => {
  const {
    searchLocation,
    setSearchLocation,
    bookingDays,
    setBookingDays,
    totalGuest,
    setTotalGuest,
    searchResults,
    setSearchResults,
    allGuest,
    setAllGuest,
  } = useSearchHook()

  const [priceRange, setPriceRange] = useState([300000, 1000000])
  const [errorStatus, setErrorStatus] = useState<null | number>(null)
  const [totalDays, setTotalDays] = useState(0)
  const [dataProperties, setDataProperties] = useState<any>()
  const [propertyFacilityIdArr, setPropertyFacilityIdArr] = useState<any[]>([])
  const [propertyRoomFacilityIdArr, setPropertyRoomFacilityIdArr] = useState<
    any[]
  >([])
  const [paramMutateExplore, setParamMutateExplore] = useState({
    sort: 'price',
    order: 'asc',
    limit: 5,
    offset: 0,
    minPrice: 0,
    maxPrice: searchParams['max-price']
      ? Number(searchParams['max-price'])
      : 100000000,
    name: '',
  })
  const [propertyTypeIdArr, setPropertyTypeIdArr] = useState<any[]>([])
  const [propertyStarArr, setPropertyStarArr] = useState<any[]>([])
  const [filterMobileMode, setFilterMobileMode] = useState(false)
  const [searchName, setSearchName] = useState(searchParams?.name || '')
  const [sortMobileMode, setSortMobileMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilterPropertyFacility, setShowFilterPropertyFacility] =
    useState(false)
  const [showFilterPropertyRoomFacility, setShowFilterPropertyRoomFacility] =
    useState(false)
  const [showPropertyType, setShowPropertyType] = useState(false)

  const [minPrice, setMinPrice] = useState(
    searchParams['min-price'] ? Number(searchParams['min-price']) : 0,
  )
  const [maxPrice, setMaxPrice] = useState(
    searchParams['max-price'] ? Number(searchParams['max-price']) : 100000000,
  )
  const [changeParameter, setChangeParameter] = useState(false)

  return {
    searchLocation,
    setSearchLocation,
    bookingDays,
    setBookingDays,
    totalGuest,
    setTotalGuest,
    searchResults,
    setSearchResults,
    allGuest,
    setAllGuest,
    showFilterPropertyFacility,
    showFilterPropertyRoomFacility,
    showPropertyType,
    setShowFilterPropertyFacility,
    setShowFilterPropertyRoomFacility,
    setShowPropertyType,
    priceRange,
    setPriceRange,
    errorStatus,
    setErrorStatus,
    totalDays,
    setTotalDays,
    dataProperties,
    setDataProperties,
    propertyFacilityIdArr,
    setPropertyFacilityIdArr,
    propertyRoomFacilityIdArr,
    setPropertyRoomFacilityIdArr,
    paramMutateExplore,
    setParamMutateExplore,
    propertyTypeIdArr,
    setPropertyTypeIdArr,
    propertyStarArr,
    setPropertyStarArr,
    filterMobileMode,
    setFilterMobileMode,
    searchName,
    setSearchName,
    sortMobileMode,
    setSortMobileMode,
    isLoading,
    setIsLoading,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    changeParameter,
    setChangeParameter,
  }
}

export default useStateExploreHook
