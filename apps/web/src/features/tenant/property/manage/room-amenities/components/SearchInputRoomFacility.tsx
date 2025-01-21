'use client'

import React from 'react'

const SearchInputRoomFacility = ({
  searchParams,
  debounceSearchRoomFacility,
  debounceSearchGeneralRoomFacility,
  selectRoom,
}: {
    searchParams: any
    debounceSearchRoomFacility: any
    debounceSearchGeneralRoomFacility: any
    selectRoom: string | null
}) => {
  return (
    <div className="flex flex-col px-5">
      <input
        onChange={(e) => {
          searchParams.name = e.target.value
          if (selectRoom !== 'all-rooms') {
            if (e.target.value.length > 2) {
              debounceSearchRoomFacility(e.target.value)
            } else {
              debounceSearchRoomFacility('')
            }
          } else {
            if (e.target.value.length > 2) {
              debounceSearchGeneralRoomFacility(e.target.value)
            } else {
              debounceSearchGeneralRoomFacility('')
            }
          }
        }}
        type="text"
        placeholder="Search facility ( minimum 3 or more characters )"
        className="px-5 rounded-full py-3 text-sm font-medium font-gray-800 w-full border-2 border-slate-300 bg-white placeholder-shown:text-sm"
      />
    </div>
  )
}

export default SearchInputRoomFacility
