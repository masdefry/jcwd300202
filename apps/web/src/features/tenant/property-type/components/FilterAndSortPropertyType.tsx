'use client'

import React, { useState } from 'react'
import { CgArrowsScrollV } from 'react-icons/cg'
import { FaArrowUpShortWide, FaCity } from 'react-icons/fa6'
import { GiBackwardTime } from 'react-icons/gi'
import { IoSearchSharp } from 'react-icons/io5'
import CreatePropertyType from './CreatePropertyType'
import { useDebouncedCallback } from 'use-debounce'
import { ISearchParamsTenantPropertyType } from '../types'

const FilterAndSortPropertyType = ({
  isPending,
  handleFilter,
  handleSort,
  searchParams,
  handleCreatePropertyType,
}: {
  handleCreatePropertyType: any
  searchParams: ISearchParamsTenantPropertyType
  handleFilter: (name: string) => void
  handleSort: (order: string) => void
  isPending: boolean
}) => {
  const [search, setSearch] = useState('')
  const [showCreatePropertyType, setShowCreatePropertyType] =
    useState<boolean>(false)
  const debounceHandleSearch = useDebouncedCallback((name: string) => {
    handleFilter(name)
  }, 500)

  if (isPending) {
    return (
      <section className="flex justify-between items-center gap-2 w-[1200px] mx-auto">
        <section className="flex gap-2 min-w-max max-w-[800px]">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="sort"
              className="text-xs min-w-max font-bold skeleton text-transparent bg-slate-300 rounded-none w-fit flex items-center gap-1.5"
            >
              Sort by:
            </label>
            <select
              disabled={true}
              id="sort"
              className="w-[300px] bg-slate-200 text-transparent skeleton text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="filter-input"
              className="text-xs min-w-max font-bold skeleton text-transparent bg-slate-300 rounded-none w-fit flex items-center gap-1.5"
            >
              Filter by name:
            </label>
            <input
              disabled={true}
              type="text"
              name="filterInput"
              className="w-[300px] bg-slate-200 text-transparent skeleton placeholder-shown:text-xs font-semibold text-xs text-gray-800 rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </section>
        <button
          disabled={true}
          className=" flex items-center gap-1.5 justify-center disabled:scale-100 disabled:opacity-100 px-5 bg-slate-200  py-2 skeleton text-transparent  text-sm font-bold rounded-full shadow-md"
        >
          <FaCity />
          Add Property Type
        </button>
      </section>
    )
  }

  return (
    <section className="flex justify-between items-center gap-2 w-[1200px] mx-auto">
      <section className="flex gap-2 min-w-max max-w-[800px]">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sort"
            className="text-xs min-w-max font-bold text-gray-900 flex items-center gap-1.5"
          >
            <FaArrowUpShortWide />
            Sort by:
          </label>
          <select
            onChange={(e) => handleSort(e.target.value)}
            defaultValue={searchParams?.order || 'asc'}
            id="sort"
            className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[300px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="asc">Ascending by Name</option>
            <option value="desc">Descending by Name</option>
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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              debounceHandleSearch(e.target.value)
            }}
            placeholder="Search for your property..."
            className="border border-slate-300 bg-gray-50 placeholder-shown:text-xs font-semibold text-xs text-gray-800 rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[300px] dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </section>
      <button
        onClick={() => setShowCreatePropertyType(true)}
        className="disabled:bg-slate-300 disabled:text-white flex items-center gap-1.5 justify-center disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-2 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
      >
        <FaCity />
        Add Property Type
      </button>
      {showCreatePropertyType && (
        <CreatePropertyType
          setShowCreatePropertyType={setShowCreatePropertyType}
          handleCreatePropertyType={handleCreatePropertyType}
        />
      )}
    </section>
  )
}

export default FilterAndSortPropertyType
