'use client'

import React from 'react'
import { CgArrowsScrollV } from 'react-icons/cg'
import { FaArrowUpShortWide } from 'react-icons/fa6'
import { GiBackwardTime } from 'react-icons/gi'
import { IoSearchSharp } from 'react-icons/io5'
import LoadingFilterAndSortPropertyList from './LoadingFilterAndSortPropertyList'
import { ISearchParamsPropertyList } from '../types'

const FilterAndSortPropertyList = ({
  setSearchProperty,
  searchProperty,
  handleSortedDataProperties,
  handleFilterByStatus,
  handleFilterByName,
  handlePeriod,
  searchParams,
  isPending,
}: {
  isPending: boolean
  setSearchProperty: any
  searchProperty: string
  searchParams: ISearchParamsPropertyList
  handleSortedDataProperties: any
  handleFilterByStatus: any
  handleFilterByName: any
  handlePeriod: any
}) => {
  if (isPending) {
    return <LoadingFilterAndSortPropertyList />
  }
  return (
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
            handleSortedDataProperties({
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
          onChange={(e) => handleFilterByStatus({ value: e.target.value })}
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
            handleFilterByName(e.target.value)
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
          onChange={(e) => handlePeriod({ value: e.target.value })}
          defaultValue={searchParams?.period || '30'}
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
  )
}

export default FilterAndSortPropertyList
