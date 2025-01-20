'use client'

import React from 'react'
import { CgSearchFound } from 'react-icons/cg'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import { IoFilter } from 'react-icons/io5'
import { TbConfetti } from 'react-icons/tb'

const SortFirstSection = ({
  setFilterMobileMode,
  setSortMobileMode,
  sortMobileMode,
  handleSort,
  dataProperties,
}: {
  setFilterMobileMode: any
  setSortMobileMode: any
  sortMobileMode: any
  handleSort: any
  dataProperties: any
}) => {
  return (
    <div className="2xl:hidden text-sm rounded-md w-full flex items-center gap-2 p-3">
      <div
        onClick={() => setFilterMobileMode(true)}
        className="hover:bg-slate-200 active:scale-90 transition duration-100 flex items-center border border-slate-100 flex-col rounded-md bg-white text-gray-800 shadow-md h-12 min-w-12 justify-center w-12"
      >
        <IoFilter />
        <span className="text-xs font-bold">Filter</span>
      </div>
      <div
        onClick={() => setSortMobileMode(true)}
        className="hover:bg-slate-200 active:scale-90 transition duration-100 flex items-center border border-slate-100 flex-col rounded-md bg-white text-gray-800 shadow-md h-12 min-w-12 justify-center w-12"
      >
        <FaSortAmountDownAlt />
        <span className="text-xs font-bold">Sort</span>
      </div>
      <section
        className={`${sortMobileMode ? 'fixed' : 'hidden'} top-0 left-0 w-full h-full   z-[90]`}
      >
        <div
          id="sort-mobile"
          className={`${sortMobileMode ? 'scale-y-100' : 'scale-y-0'} border-t border-slate-200 absolute bottom-0 flex flex-col bg-white shadow-md w-full left-0 rounded-t-md transition duration-300`}
        >
          <div className="flex justify-center w-full p-2">
            <span
              className="bg-slate-500 rounded-full h-1.5 w-[90px]"
              onClick={() => setSortMobileMode(false)}
            ></span>
          </div>
          <div className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-bold">
            Sort by:
          </div>
          <div
            onClick={() => handleSort({ sortBy: 'name', order: 'asc' })}
            className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-medium border-t border-slate-500"
          >
            Ascending by Name
          </div>
          <div
            onClick={() => handleSort({ sortBy: 'name', order: 'desc' })}
            className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-medium border-t border-slate-300"
          >
            Descending by Name
          </div>
          <div
            onClick={() => handleSort({ sortBy: 'price', order: 'asc' })}
            className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-medium border-t border-slate-300"
          >
            Lowest to Highest by Price
          </div>
          <div
            onClick={() => handleSort({ sortBy: 'price', order: 'desc' })}
            className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-medium border-t border-slate-300"
          >
            Highest to Lowest by Price
          </div>
        </div>
      </section>
      <div className="min-w-max text-sm font-bold overflow-x-auto">
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
      <div className="carousel w-fit gap-3">
        <div className="carousel-item flex items-center gap-1.5 p-1 rounded-md">
          <span className="col-span-2 bg-slate-800 flex  min-w-max items-center gap-2 p-2 text-white text-sm font-bold rounded-md">
            <div className="text-green-900 bg-green-200 p-1 rounded-full">
              <TbConfetti size={19} />
            </div>
            <p className="text-white min-w-max">
              40% off for accomodation in Medan City region
            </p>
          </span>
        </div>
        <div className="carousel-item flex items-center gap-2">
          <span className="col-span-2 bg-slate-200 flex  min-w-max items-center gap-2 p-2 text-white text-sm font-bold rounded-md">
            <div className="text-red-800 bg-red-200 p-1 rounded-full">
              <TbConfetti size={19} />
            </div>
            <p className="text-gray-900 min-w-max">
              Up to 10% off for the first booking
            </p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SortFirstSection
