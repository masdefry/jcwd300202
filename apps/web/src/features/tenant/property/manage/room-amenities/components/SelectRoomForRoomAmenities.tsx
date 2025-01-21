'use client'

import React from 'react'

const SelectRoomForRoomAmenities = ({
  setSelectRoom,
  mutateSearchRoomFacility,
  mutateSearchGeneralRoomFacility,
  dataGeneralRoomFacilities,
}: {
    setSelectRoom: any
    mutateSearchRoomFacility: any
    mutateSearchGeneralRoomFacility: any
    dataGeneralRoomFacilities: any
}) => {
  return (
    <section className="flex items-center gap-5 px-5">
      <span className="w-fit flex flex-col sm:flex-row gap-1 items-start sm:items-center">
        <label
          htmlFor="select-room"
          className="text-xs min-w-max font-bold text-gray-500"
        >
          Select Room:
        </label>
        <select
          onChange={(e) => {
            setSelectRoom((state: string | null) => {
              state = e.target.value
              return state
            })
            if (e.target.value !== 'all-rooms') {
              mutateSearchRoomFacility('')
            } else {
              mutateSearchGeneralRoomFacility('')
            }
          }}
          name="select-room"
          defaultValue="all-rooms"
          id="select-room"
          className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[200px] min-w-max dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="all-rooms">All Room Types</option>
          {dataGeneralRoomFacilities?.property?.propertyRoomType?.map(
            (item: any, index: number) => {
              return <option key={index} value={item?.id}>{item?.name}</option>
            },
          )}
        </select>
      </span>
    </section>
  )
}

export default SelectRoomForRoomAmenities
