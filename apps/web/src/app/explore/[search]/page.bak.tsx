'use client'

import React, { useEffect } from 'react'
import CardForExplore from '@/features/explore/components/CardForExplore'
import SortDesktop from '@/features/explore/components/SortFirstSection'
import SortMobile from '@/features/explore/components/SortThirdSection'
import FilteringExplore from '@/features/explore/components/FilteringExplore'
import ButtonPaginationExplore from '@/features/explore/components/ButtonPaginationExplore'
import useFilterExplorePageHook from '@/features/explore/hooks/useFilterExplorePageHook'

const ExplorePage = ({ searchParams }: { searchParams: { 'min-price': string, 'max-price': string, country: string, city: string, 'check-in-date': string, 'check-out-date': string, sort: string, order: string, limit: string, offset: string, adult: string, children: string } }) => {

  const {
    handlePrice,
    handlePropertyFacilityFilter,
    handlePropertyRoomFacilityFilter,
    handlePropertyStarFilter,
    handlePropertyTypeIdFilter,
    handleSearchParams,
    handleSort,
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
    isPendingExplorePagination,
    setSortMobileMode,
    mutateExplorePagination,
    dataForFilteringProperty,
    filterMobileMode,
    sortMobileMode,
    fetchDataProperties
  } = useFilterExplorePageHook({ searchParams })

  useEffect(() => {
    fetchDataProperties()
}, [])
  return (
    <main className="w-full min-h-min py-5">
      <section className="m-auto max-w-screen-xl flex flex-col 2xl:grid grid-cols-4  gap-5 w-full h-full">
        <SortMobile setFilterMobileMode={setFilterMobileMode} setSortMobileMode={setSortMobileMode} sortMobileMode={sortMobileMode} mutateExplorePagination={mutateExplorePagination} dataProperties={dataProperties}/>
        <FilteringExplore showFilterPropertyRoomFacility={showFilterPropertyRoomFacility} setShowFilterPropertyRoomFacility={setShowFilterPropertyRoomFacility} handlePropertyRoomFacilityFilter={handlePropertyRoomFacilityFilter} setShowFilterPropertyFacility={setShowFilterPropertyFacility} handlePropertyFacilityFilter={handlePropertyFacilityFilter} showPropertyType={showPropertyType} handlePropertyTypeIdFilter={handlePropertyTypeIdFilter} showFilterPropertyFacility={showFilterPropertyFacility} setShowPropertyType={setShowPropertyType} dataForFilteringProperty={dataForFilteringProperty} searchParams={searchParams} mutateExplorePagination={mutateExplorePagination} handlePropertyStarFilter={handlePropertyStarFilter} handlePrice={handlePrice} filterMobileMode={filterMobileMode} setFilterMobileMode={setFilterMobileMode} minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>
        <div className="2xl:col-span-3 w-full min-h-min flex flex-col gap-3 px-3">
        <SortDesktop handleSort={handleSort} setFilterMobileMode={setFilterMobileMode} setSortMobileMode={setSortMobileMode} searchParams={searchParams}/>

          {
            dataProperties?.properties && Array.isArray(dataProperties?.properties) ? (
              dataProperties?.properties.map((item: any, index: number) => {
                return (
                  <CardForExplore item={item} searchParams={searchParams} isPending={isPendingExplorePagination || isLoading}/>
                )
              })
            ) : (
              Array.from({length: 5}).map((item: any, index: number) => {
                return (
                  <CardForExplore item={item} searchParams={searchParams} isPending={isPendingExplorePagination || isLoading}/>
                )
              })
            )
          }
          <ButtonPaginationExplore mutateExplorePagination={mutateExplorePagination} dataProperties={dataProperties}/>
        </div>
      </section>
    </main>
  )
}

export default ExplorePage