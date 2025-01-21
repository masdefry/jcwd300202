'use client'

import React from 'react'

const CalendarSelectDropdownMenu = ({
  year,
  month,
  setMonth,
  setYear,
  handleSearchParams,
  setViewMode,
  viewMode,
  propertyRoomTypes,
  setSelectedPropertyRoomType,
  setSelectRoom,
  handleRoomName,
}: {
  year: number,
  month: number,
  setMonth: any,
  setYear: any,
  handleSearchParams: (param: string, value: string ) => void
  setViewMode: any,
  viewMode: string,
  propertyRoomTypes: any,
  setSelectedPropertyRoomType: any,
  setSelectRoom: any,
  handleRoomName: (value: string) => void,  
}) => {
  return (
    <section className="min-w-max">
      <section className="flex items-center gap-5">
        <span className="w-fit flex gap-2 items-center">
          <label
            htmlFor="view"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            View:
          </label>
          <select
            onChange={(e) => {
              handleSearchParams('view', e.target.value)
              setViewMode(e.target.value)
            }}
            name="view"
            value={viewMode}
            id="view"
            className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[200px] min-w-max dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="monthly-view">Monthly View</option>
            <option value="list-view">List View</option>
          </select>
        </span>

        <span className="w-fit flex gap-2 items-center">
          <label
            htmlFor="select-room"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            Select room:
          </label>
          <select
            name="select-room"
            onChange={(e) => {
              const findPropertyRoomType = propertyRoomTypes.find(
                (item: any) => Number(item?.id) === Number(e.target.value),
              )
              setSelectedPropertyRoomType(findPropertyRoomType)
              setSelectRoom((state: string) => {
                state = e.target.value
                return state
              })
              handleRoomName(e.target.value)
            }}
            defaultValue="all-rooms"
            id="select-room"
            className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 w-[250px] min-w-max focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all-rooms">All Rooms</option>
            {propertyRoomTypes?.map((item: any, index: number) => {
              return (
                <option key={index} value={item?.id}>
                  {item?.name}
                </option>
              )
            })}
          </select>
        </span>
        {viewMode === 'list-view' && (
          <span className="w-fit flex gap-2 items-center">
            <label
              htmlFor="period"
              className="text-xs min-w-max font-bold text-gray-500"
            >
              Period:
            </label>
            <select
              name="period"
              onChange={(e) => {
                setMonth(Number(e.target.value.split('-')[0]))
                setYear(Number(e.target.value.split('-')[1]))
              }}
              defaultValue={`${month}-${year}`}
              id="period"
              className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[200px] min-w-max dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {Array.from({ length: 12 }).map((_, index) => {
                return (
                  <option value={`${index}-${year}`}>
                    {index + 1 < 10 ? '0' + (index + 1) : index + 1} - {year}
                  </option>
                )
              })}
            </select>
          </span>
        )}
      </section>
    </section>
  )
}

export default CalendarSelectDropdownMenu
