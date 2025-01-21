'use client'

import React, { useState, useEffect } from 'react'
import { TbConfetti } from 'react-icons/tb'
import CardForExplore from '@/features/explore/components/CardForExplore'
import CardForNotFound from '@/features/explore/components/CardForNotFound'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import { ISearchParamsExplore } from '@/features/explore/types'
import useExploreFunctionalityHook from '@/features/explore/hooks/useExploreFunctionalityHook'
import FilteringExplore from '@/features/explore/components/FilteringExplore'
import SortFirstSection from '@/features/explore/components/SortFirstSection'
import SortSecondSection from '@/features/explore/components/SortSecondSection'
import FilterByNameMobile from '@/features/explore/components/FilterByNameMobile'
import ButtonPaginationExplore from '@/features/explore/components/ButtonPaginationExplore'

const ExplorePage = ({
  searchParams,
}: {
  searchParams: ISearchParamsExplore
}) => {
  const {
    fetchDataProperties,
    isPendingExplorePagination,
    isPendingExploreFilterAndSort,
    errorStatus,
    dataProperties,
    filterMobileMode,
    setFilterMobileMode,
    searchName,
    setSearchName,
    sortMobileMode,
    setSortMobileMode,
    isLoading,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
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
    showFilterPropertyFacility,
    showFilterPropertyRoomFacility,
    showPropertyType,
    setShowFilterPropertyFacility,
    setShowFilterPropertyRoomFacility,
    setShowPropertyType,
    dataForFilteringProperty,
  } = useExploreFunctionalityHook({ searchParams })

  useEffect(() => {
    fetchDataProperties()
  }, [])

  if (errorStatus) {
    if (errorStatus === 404) {
      return <NotFoundMain />
    } else if (errorStatus === 500) {
      return <Custom500 />
    }
  }

  return (
    <main className="w-full min-h-min py-5">
      <section className="m-auto max-w-screen-xl flex flex-col 2xl:grid grid-cols-4  gap-5 w-full h-full">
        <FilteringExplore
          showFilterPropertyRoomFacility={showFilterPropertyRoomFacility}
          setShowFilterPropertyRoomFacility={setShowFilterPropertyRoomFacility}
          handlePropertyRoomFacilityFilter={handlePropertyRoomFacilityFilter}
          setShowFilterPropertyFacility={setShowFilterPropertyFacility}
          handlePropertyFacilityFilter={handlePropertyFacilityFilter}
          showPropertyType={showPropertyType}
          handlePropertyTypeIdFilter={handlePropertyTypeIdFilter}
          showFilterPropertyFacility={showFilterPropertyFacility}
          setShowPropertyType={setShowPropertyType}
          dataForFilteringProperty={dataForFilteringProperty}
          handlePriceFilterSubmit={handlePriceFilterSubmit}
          mutateExploreFilterAndSort={mutateExploreFilterAndSort}
          handlePropertyStarFilter={handlePropertyStarFilter}
          handlePrice={handlePrice}
          filterMobileMode={filterMobileMode}
          setFilterMobileMode={setFilterMobileMode}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
        <SortFirstSection
          setFilterMobileMode={setFilterMobileMode}
          setSortMobileMode={setSortMobileMode}
          sortMobileMode={sortMobileMode}
          handleSort={handleSort}
          dataProperties={dataProperties}
        />
        <div className="2xl:col-span-3 w-full min-h-min flex flex-col gap-3 px-3">
          <SortSecondSection
            searchParams={searchParams}
            mutateExplorePagination={mutateExplorePagination}
            dataProperties={dataProperties}
            handleSort={handleSort}
            handleFilterName={handleFilterName}
            setSearchName={setSearchName}
            searchName={searchName}
          />
          <div className="hidden grid-cols-4 gap-4 2xl:grid">
            <span className="flex items-center gap-5 col-span-4">
              <FilterByNameMobile
                setSearchName={setSearchName}
                handleFilterName={handleFilterName}
                searchName={searchName}
              />
            </span>
          </div>
          <span className="sm:flex bg-blue-900 hidden items-center gap-2 p-3 px-5 text-white text-sm font-bold rounded-md">
            <div className="text-green-900 bg-green-200 p-1 rounded-full">
              <TbConfetti size={19} />
            </div>
            <p>40% off for selected accomodation in Jakarta City region</p>
          </span>
          {dataProperties?.properties &&
            Array.isArray(dataProperties?.properties) &&
            dataProperties?.properties?.length <= 0 && <CardForNotFound />}
          {dataProperties?.properties &&
          Array.isArray(dataProperties?.properties)
            ? dataProperties?.properties.map((item: any, index: number) => {
                return (
                  <CardForExplore
                    key={index}
                    item={item}
                    searchParams={searchParams}
                    isPending={
                      isPendingExploreFilterAndSort ||
                      isPendingExplorePagination ||
                      isLoading
                    }
                  />
                )
              })
            : Array.from({ length: 5 }).map((item: any, index: number) => {
                return (
                  <CardForExplore
                    key={index}
                    item={item}
                    searchParams={searchParams}
                    isPending={
                      isPendingExploreFilterAndSort ||
                      isPendingExplorePagination ||
                      isLoading
                    }
                  />
                )
              })}
          <ButtonPaginationExplore
            handlePagination={handlePagination}
            dataProperties={dataProperties}
          />
        </div>
      </section>
    </main>
  )
}

export default ExplorePage
