'use client'

import React from 'react'

const LoadingFilterAndSortPropertyList = () => {
  return (
    <section className="grid grid-cols-4 gap-2 min-w-[1080px]">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sort"
            className="text-xs min-w-max font-bold skeleton rounded-none bg-slate-300 w-fit text-transparent flex items-center gap-1.5"
          >
            Sort by:
          </label>
          <input
            disabled={true}
            id="sort"
            className=" bg-gray-200 skeleton  text-tranparent text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-select"
            className="text-xs min-w-max font-bold skeleton rounded-none bg-slate-300 w-fit text-transparent flex items-center gap-1.5"
          >
            Filter by:
          </label>
          <input
            disabled={true}
            id="filter-select"
            className=" bg-gray-200 skeleton  text-tranparent text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-input"
            className="text-xs min-w-max font-bold skeleton rounded-none bg-slate-300 w-fit text-transparent flex items-center gap-1.5"
          >
            Filter by name:
          </label>
          <input
            disabled={true}
            type="text"
            name="filterInput"
            className="  bg-gray-200 skeleton placeholder-shown:text-xs font-semibold text-xs text-tranparent rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-period"
            className="text-xs min-w-max font-bold skeleton rounded-none bg-slate-300 w-fit text-transparent flex items-center gap-1.5"
          >
            Period:
          </label>
          <input
            disabled={true}
            name="filter-period"
            id="filter-period"
            className=" bg-gray-200 skeleton  text-tranparent text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </section>
  )
}

export default LoadingFilterAndSortPropertyList
