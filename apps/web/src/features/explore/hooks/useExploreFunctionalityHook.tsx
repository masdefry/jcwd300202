import React from 'react'
import useFetchDataPropertiesApi from '../api/useFetchDataPropertiesApi'
import { ISearchParamsExplore } from '../types'
import toast from 'react-hot-toast'
import useMutateExplorePaginationApi from '../api/useMutateExplorePaginationApi'
import useMutateExploreFilterAndSortApi from '../api/useMutateExploreFilterAndSortApi'
import useStateExploreHook from './useStateExploreHook'
import useExploreFilterAndSortHook from './useExploreFilterAndSortHook'
import useFilteringPropertyHook from '@/features/property/hooks/useFilteringPropertyHook'

const useExploreFunctionalityHook = ({
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
  } = useStateExploreHook({ searchParams })

  const { dataForFilteringProperty, setDataForFilteringProperty } =
    useFilteringPropertyHook()

  const { fetchDataProperties } = useFetchDataPropertiesApi({
    searchParams,
    handleError(err) {
      console.log(err?.message)
      if (err?.message === 'Network Error') {
        setErrorStatus(500)
      }
      if (err.status === 406 || err.status === 401) {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      } else {
        setErrorStatus(err?.response?.data?.status)
      }
    },
    handleFinally() {
      setIsLoading(false)
    },
    handleSuccess(res) {
      setDataProperties(res?.data?.data)
      setDataForFilteringProperty(res?.data?.data?.dataForFilteringProperty)
    },
  })

  const { mutateExplorePagination, isPendingExplorePagination } =
    useMutateExplorePaginationApi({
      searchParams,
      setFilterMobileMode,
      setSortMobileMode,
      paramMutateExplore,
      propertyFacilityIdArr,
      propertyRoomFacilityIdArr,
      propertyTypeIdArr,
      propertyStarArr,
      onSuccess: (res) => {
        setFilterMobileMode(false)
        setSortMobileMode(false)
        setDataProperties(res?.data)
      },
      onError: (err: any) => {
        setFilterMobileMode(false)
        setSortMobileMode(false)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const { mutateExploreFilterAndSort, isPendingExploreFilterAndSort } =
    useMutateExploreFilterAndSortApi({
      searchParams,
      paramMutateExplore,
      propertyFacilityIdArr,
      propertyRoomFacilityIdArr,
      propertyTypeIdArr,
      propertyStarArr,
      onSuccess: (res) => {
        handleSearchParams('limit', '5')
        handleSearchParams('offset', '0')
        setFilterMobileMode(false)
        setSortMobileMode(false)
        setDataProperties(res?.data)
        setSortMobileMode(false)
      },
      onError: (err: any) => {
        setFilterMobileMode(false)
        setSortMobileMode(false)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const {
    handleSearchParams,
    handlePrice,
    handlePriceFilterSubmit,
    handlePropertyFacilityFilter,
    handlePropertyRoomFacilityFilter,
    handlePropertyTypeIdFilter,
    handlePropertyStarFilter,
    handlePagination,
    handleFilterName,
    handleSort,
  } = useExploreFilterAndSortHook({
    mutateExploreFilterAndSort,
    mutateExplorePagination,
    setParamMutateExplore,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    propertyFacilityIdArr,
    setPropertyFacilityIdArr,
    propertyRoomFacilityIdArr,
    setPropertyRoomFacilityIdArr,
    propertyTypeIdArr,
    setPropertyTypeIdArr,
    propertyStarArr,
    setPropertyStarArr,
    searchParams,
    setDataProperties,
    setErrorStatus,
  })
  return {
    fetchDataProperties,
    isPendingExplorePagination,
    isPendingExploreFilterAndSort,
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
    handleSearchParams,
    handlePrice,
    handlePriceFilterSubmit,
    handlePropertyFacilityFilter,
    handlePropertyRoomFacilityFilter,
    handlePropertyTypeIdFilter,
    handlePropertyStarFilter,
    handlePagination,
    handleFilterName,
    handleSort,
    mutateExploreFilterAndSort,
    mutateExplorePagination,
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
    dataForFilteringProperty,
    setDataForFilteringProperty,
  }
}

export default useExploreFunctionalityHook
