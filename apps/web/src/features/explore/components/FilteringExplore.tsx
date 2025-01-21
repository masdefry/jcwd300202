'use client'

import React from 'react'
import FilterPrice from './FilterPrice'
import FilterPropertyFacility from './FilterPropertyFacility'
import FilterPropertyType from './FilterPropertyType'
import FilterRoomFacility from './FilterRoomFacility'
import FilterStar from './FilterStar'

const FilteringExplore = ({
  showFilterPropertyRoomFacility,
  setShowFilterPropertyRoomFacility,
  handlePropertyRoomFacilityFilter,
  setShowFilterPropertyFacility,
  handlePropertyFacilityFilter,
  showPropertyType,
  handlePropertyTypeIdFilter,
  showFilterPropertyFacility,
  setShowPropertyType,
  dataForFilteringProperty,
  handlePriceFilterSubmit,
  mutateExploreFilterAndSort,
  handlePropertyStarFilter,
  handlePrice,
  filterMobileMode,
  setFilterMobileMode,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: {
  showFilterPropertyRoomFacility: any,
  setShowFilterPropertyRoomFacility: any,
  handlePropertyRoomFacilityFilter: any,
  setShowFilterPropertyFacility: any,
  handlePropertyFacilityFilter: any,
  showPropertyType: any,
  handlePropertyTypeIdFilter: any,
  showFilterPropertyFacility: any,
  setShowPropertyType: any,
  dataForFilteringProperty: any,
  handlePriceFilterSubmit: any,
  mutateExploreFilterAndSort: any,
  handlePropertyStarFilter: any,
  handlePrice: any,
  filterMobileMode: any,
  setFilterMobileMode: any,
  minPrice: any,
  maxPrice: any,
  setMinPrice: any,
  setMaxPrice: any,
}) => {
  return (
    <section
      className={`${filterMobileMode ? 'flex' : 'hidden'} 2xl:relative fixed bottom-0 col-span-1 w-full 2xl:flex flex-col 2xl:gap-5 bg-white rounded-t-md z-[54]`}
    >
      <div className="2xl:hidden bg-gray-800 text-white p-2 flex items-center justify-center w-full rounded-t-md">
        <span
          className="bg-slate-300 rounded-full h-1.5 w-[90px]"
          onClick={() => setFilterMobileMode(false)}
        ></span>
      </div>
      <FilterPrice
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        handlePrice={handlePrice}
        handlePriceFilterSubmit={handlePriceFilterSubmit}
        mutateExploreFilterAndSort={mutateExploreFilterAndSort}
      />
      <FilterPropertyType
        dataForFilteringProperty={dataForFilteringProperty}
        setShowPropertyType={setShowPropertyType}
        showPropertyType={showPropertyType}
        handlePropertyTypeIdFilter={handlePropertyTypeIdFilter}
      />
      <FilterPropertyFacility
        dataForFilteringProperty={dataForFilteringProperty}
        setShowFilterPropertyFacility={setShowFilterPropertyFacility}
        showFilterPropertyFacility={showFilterPropertyFacility}
        handlePropertyFacilityFilter={handlePropertyFacilityFilter}
      />
      <FilterRoomFacility
        dataForFilteringProperty={dataForFilteringProperty}
        setShowFilterPropertyRoomFacility={setShowFilterPropertyRoomFacility}
        showFilterPropertyRoomFacility={showFilterPropertyRoomFacility}
        handlePropertyRoomFacilityFilter={handlePropertyRoomFacilityFilter}
      />
      <FilterStar
        dataForFilteringProperty={dataForFilteringProperty}
        handlePropertyStarFilter={handlePropertyStarFilter}
      />
    </section>
  )
}

export default FilteringExplore
