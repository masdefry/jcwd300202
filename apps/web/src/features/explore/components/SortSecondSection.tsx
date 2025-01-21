
'use client'

import React from 'react'
import { CgSearchFound } from 'react-icons/cg'
import { TbConfetti } from 'react-icons/tb'

const SortSecondSection = ({
  searchParams,
  mutateExplorePagination,
  dataProperties,
  handleSort,
  handleFilterName,
  setSearchName,
  searchName
}: {
  searchParams: any
  mutateExplorePagination: any
  dataProperties: any
  handleSort: any
  handleFilterName: any
  setSearchName: any
  searchName: string
}) => {
  return (
    <div className="hidden  2xl:flex col-span-4 w-full">
      <span className="flex items-center gap-5 col-span-4">
        <div className="w-full text-sm font-bold">
          {dataProperties?.country?.name ? (
            <p className="text-gray-800">
              {dataProperties?.city?.name && dataProperties?.city?.name + ','}{' '}
              {dataProperties?.country?.name}
            </p>
          ) : (
            <p className="text-gray-800">All properties</p>
          )}
          <p className="text-gray-800 font-normal mt-[-3px] flex items-center">
            {dataProperties?.countProperties} property found
            <CgSearchFound className="ml-2 text-green-600" />
          </p>
        </div>
        <span className="w-full flex gap-2 items-center min-w-max">
          <label
            htmlFor="sort"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            Sort by:
          </label>
          <select
            name="sort"
            onChange={(e) => {
              handleSort({
                sortBy: e.target.value.split('-')[1],
                order: e.target.value.split('-')[0],
              })
            }}
            defaultValue={`${searchParams?.order || 'asc'}-${searchParams['sort'] || 'price'}`}
            id="sort"
            className="min-w-max bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="asc-price">Lowest to Highest Price</option>
            <option value="desc-price">Highest to Lowest Price</option>
            <option value="asc-name">Ascending by Name</option>
            <option value="desc-name">Descending by Name</option>
          </select>
        </span>
        <span className="w-full flex gap-2 items-center">
          <label
            htmlFor="name"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            Filter by name:
          </label>
          <input
            name="name"
            onChange={(e) => {
              setSearchName((state: string) => {
                state = e.target.value
                return state
              })
              handleFilterName(e.target.value)
            }}
            value={searchName}
            placeholder="Pan Pacific Jakarta"
            id="name"
            className="min-w-max bg-gray-50 border border-slate-300 text-gray-800 text-xs font-medium placeholder-shown:text:xs rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-amber-400 focus:border-amber-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </span>
      </span>
    </div>
  )
}

export default SortSecondSection
