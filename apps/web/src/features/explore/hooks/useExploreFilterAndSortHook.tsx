'use client'

import React from 'react'
import { IExploreFilterAndSortProps, IParamMutateExplore } from '../types'
import { useDebouncedCallback } from 'use-debounce'

const useExploreFilterAndSortHook = ({
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
}: IExploreFilterAndSortProps) => {
  const handleSearchParams = (orderBy: string, value: string) => {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set(orderBy, value)
    window.history.pushState({}, '', '?' + urlParams.toString())
  }

  const handlePrice = (
    priceType: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

  const handlePriceFilterSubmit = () => {
    handlePagination({ limit: 5, offset: 0 })
    setParamMutateExplore((state: IParamMutateExplore) => {
      state.limit = 5
      state.offset = 0
      state.minPrice = minPrice || 0
      state.maxPrice = maxPrice
      return state
    })
    handleSearchParams('min-price', minPrice.toString())
    handleSearchParams('max-price', maxPrice.toString())
    mutateExploreFilterAndSort()
  }

  const handlePropertyFacilityFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyFacilityIdArr([...propertyFacilityIdArr, Number(value)])
    } else {
      setPropertyFacilityIdArr((state) => state.filter((item) => item != value))
    }
    mutateExploreFilterAndSort()
  }

  const handlePropertyRoomFacilityFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyRoomFacilityIdArr([
        ...propertyRoomFacilityIdArr,
        Number(value),
      ])
    } else {
      setPropertyRoomFacilityIdArr((state) =>
        state.filter((item) => item != value),
      )
    }
    mutateExploreFilterAndSort()
  }

  const handlePropertyTypeIdFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyTypeIdArr([...propertyTypeIdArr, Number(value)])
    } else {
      setPropertyTypeIdArr((state) => state.filter((item) => item != value))
    }
    mutateExploreFilterAndSort()
  }

  const handlePropertyStarFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyStarArr([...propertyStarArr, Number(value)])
    } else {
      setPropertyStarArr((state) => state.filter((item) => item != value))
    }
    mutateExploreFilterAndSort()
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
    setParamMutateExplore((state: IParamMutateExplore) => {
      state.limit = limit
      state.offset = offset
      return state
    })
    mutateExplorePagination()
  }

  const handleFilterName = (name: string) => {
    handleSearchParams('name', name)
    handlePagination({ limit: 5, offset: 0 })
    setParamMutateExplore((state: IParamMutateExplore) => {
      state.name = name
      state.limit = 5
      state.offset = 0
      return state
    })
    debouncedMutateFilter()
  }

  const debouncedMutateFilter = useDebouncedCallback(() => {
    mutateExploreFilterAndSort()
  }, 500)

  const handleSort = ({ sortBy, order }: { sortBy: string; order: string }) => {
    handleSearchParams('sort', sortBy)
    handleSearchParams('order', order)
    handlePagination({ limit: 5, offset: 0 })
    setParamMutateExplore((state: IParamMutateExplore) => {
      state.sort = sortBy
      state.order = order
      state.limit = 5
      state.offset = 0
      return state
    })
    mutateExploreFilterAndSort()
  }
  return {
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
  }
}

export default useExploreFilterAndSortHook
