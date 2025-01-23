'use client'

import React from 'react'

const RatesPercentageBulkSection = ({
  dataPropertyRoomTypeSeason,
  setDataPropertyRoomTypeSeason,
  setChangeDate,
}: {
  dataPropertyRoomTypeSeason: any
  setDataPropertyRoomTypeSeason: any
  setChangeDate: any
}) => {
  return (
    <div className="flex items-center gap-3 w-full justify-center ">
      <div
        className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
        onClick={() => {
          let getPercent: number = Number(
            Number(dataPropertyRoomTypeSeason.pricePercentage).toFixed(0),
          )
          getPercent -= 5
          setDataPropertyRoomTypeSeason((state: any) => {
            state.roomPrices = Number(
              (Number(getPercent) / 100) * state.basePrice,
            ).toFixed(0)
            state.pricePercentage = Number(getPercent).toFixed(0)
            return state
          })
          setChangeDate((state: boolean) => !state)
        }}
      >
        -
      </div>
      <input
        value={Number(dataPropertyRoomTypeSeason.pricePercentage).toFixed(0)}
        onChange={(e) => {
          setDataPropertyRoomTypeSeason((state: any) => {
            state.roomPrices = Number(
              (Number(e.target.value) / 100) * state.basePrice,
            ).toFixed(0)
            state.pricePercentage = Number(e.target.value).toFixed(0)
            return state
          })
          setChangeDate((state: boolean) => !state)
        }}
        id="oneDaySeasonRoomPricePercentage"
        min={0}
        name="oneDaySeasonRoomPricePercentage"
        type="number"
        placeholder="100"
        className="sm:w-max w-[150px] text-center placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
      />
      <div
        className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
        onClick={() => {
          let getPercent: number = Number(
            Number(dataPropertyRoomTypeSeason.pricePercentage).toFixed(0),
          )
          getPercent += 5
          setDataPropertyRoomTypeSeason((state: any) => {
            state.roomPrices = Number(
              (Number(getPercent) / 100) * state.basePrice,
            ).toFixed(0)
            state.pricePercentage = Number(getPercent).toFixed(0)
            return state
          })
          setChangeDate((state: boolean) => !state)
        }}
      >
        +
      </div>
    </div>
  )
}

export default RatesPercentageBulkSection
