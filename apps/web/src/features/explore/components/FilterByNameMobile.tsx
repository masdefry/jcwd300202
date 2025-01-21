'use client'

import React from 'react'

const FilterByNameMobile = ({ setSearchName, handleFilterName, searchName }: { setSearchName: any, handleFilterName: any, searchName: string, }) => {
  return (
    <span className="sm:hidden mt-[-10px] mb-[10px] flex gap-2 items-center">
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
        className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-medium placeholder-shown:text:xs rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-amber-400 focus:border-amber-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </span>
  )
}

export default FilterByNameMobile
