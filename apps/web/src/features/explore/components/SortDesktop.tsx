'use client'

import React from 'react'
import { CgSearchFound } from 'react-icons/cg'
import { TbConfetti } from 'react-icons/tb'

const SortDesktop = ({
  searchParams,
  mutateExplorePagination,
  dataProperties,
  handleSort
}: any) => {
  return (
       <div className="hidden grid-cols-4 gap-4 2xl:grid">
            <span className="flex items-center gap-5 col-span-2">
              <div className="w-1/3 text-sm font-bold">
                {dataProperties?.country?.name ? (
                  <p className="text-gray-800">
                    {dataProperties?.city?.name &&
                      dataProperties?.city?.name + ','}{' '}
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
              <span className="w-2/3 flex gap-2 items-center">
                <label
                  htmlFor="sort"
                  className="text-xs min-w-max font-bold text-gray-500"
                >
                  Sort by:
                </label>
                <select
                  name="sort"
                  onChange={(e) => {
                    handleSort(e?.target?.value)
                  }}
                  defaultValue={`${searchParams?.order || 'asc'}-${searchParams['sort'] || 'price'}`}
                  id="sort"
                  className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="asc-price">Lowest to Highest Price</option>
                  <option value="desc-price">Highest to Lowest Price</option>
                  <option value="asc-name">Ascending by Name</option>
                  <option value="desc-name">Descending by Name</option>
                </select>
              </span>
            </span>
            <span className="col-span-2 bg-blue-900 flex items-center gap-2 p-3 px-5 text-white text-sm font-bold rounded-md">
              <div className="text-green-900 bg-green-200 p-1 rounded-full">
                <TbConfetti size={19} />
              </div>
              <p>40% off for accomodation in Medan City region</p>
            </span>
          </div>
  )
}

export default SortDesktop
