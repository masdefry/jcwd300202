'use client'

import React from 'react'

const SingleSeasonButtonSection = ({
  setActiveRoomSetter,
  setDataPropertyRoomTypeSeason,
  setDateRange,
  dataPropertyRoomTypeSeason,
  mutateUpdateSingleSeason,
  mutateCreateOneSeason,
  mutateUpdateSeason,
  mutateCreateSeason,
}: {
  setActiveRoomSetter: any
  setDataPropertyRoomTypeSeason: any
  setDateRange: any
  dataPropertyRoomTypeSeason: any
  mutateUpdateSingleSeason: any
  mutateCreateOneSeason: any
  mutateUpdateSeason: any
  mutateCreateSeason: any
}) => {
  return (
    <div className="flex items-center gap-2 justify-end mt-4">
      <button
        onClick={() => {
          setActiveRoomSetter({
            startDate: '',
            endDate: '',
            name: '',
          })
          setDataPropertyRoomTypeSeason({
            basePrice: 0,
            isBulk: false,
            roomPrices: 0,
            roomsToSell: 0,
            totalRooms: 0,
            availability: true,
            propertyRoomTypeId: 0,
            name: '',
            seasonId: '',
            seasonalPriceId: '',
            startDate: '',
            endDate: '',
            isPeak: false,
          })
          setDateRange({
            startDate: null,
            endDate: null,
          })
        }}
        className="text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-white text-gray-800 shadow-md"
        type="button"
      >
        Cancel
      </button>
      <button
        type="button"
        disabled={!dataPropertyRoomTypeSeason?.name}
        onClick={() => {
          if (
            dataPropertyRoomTypeSeason?.endDate !==
            dataPropertyRoomTypeSeason?.startDate
          ) {
            if (dataPropertyRoomTypeSeason?.seasonId) {
              mutateUpdateSingleSeason()
            } else {
              mutateCreateOneSeason()
            }
          } else {
            if (dataPropertyRoomTypeSeason?.seasonId) {
              mutateUpdateSeason()
            } else {
              mutateCreateSeason()
            }
          }
        }}
        className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-gray-800 text-white shadow-md"
      >
        Save
      </button>
    </div>
  )
}

export default SingleSeasonButtonSection
