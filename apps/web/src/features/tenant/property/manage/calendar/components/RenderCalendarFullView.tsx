'use client'

import React from 'react'

const RenderCalendarFullView = ({
  seasonalPriceIdxPropertySeason,
  seasonIdxPropertySeason,
  isStartSeason,
  isEndSeason,
  isAvailable,
  highestPrice,
  lowestPrice,
  roomPrice,
  selectRoom,
  dataSeasonsByProperty,
  seasonName,
}: {
  seasonalPriceIdxPropertySeason: any,
  seasonIdxPropertySeason: any,
  isStartSeason: any,
  isEndSeason: any,
  isAvailable: any,
  highestPrice: any,
  lowestPrice: any,
  roomPrice: any,
  selectRoom: string
  dataSeasonsByProperty: any
  seasonName: any
}) => {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center text-xs font-medium text-gray-500">
      {isStartSeason && isEndSeason && seasonName && (
        <div className="mt-[2px] px-5 w-full">
          <div
            className={`py-[2px] px-1 relative w-full rounded-full text-[10px] text-white font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}
          >
            {
              dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]
                ?.name
            }
          </div>
        </div>
      )}
      {isStartSeason && !isEndSeason && seasonName && (
        <div
          className={`mt-[2px] py-[2px] px-6 relative left-[30px]  text-left rounded-l-full w-[calc(100%+10px)] text-[10px] text-white font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}
        >
          {
            dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]
              ?.name
          }
        </div>
      )}
      {!isStartSeason && isEndSeason && seasonName && (
        <div
          className={`mt-[2px] text-transparent py-[2px] px-1 relative right-[30px] rounded-r-full w-[calc(100%+10px)] text-[10px] font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}
        >
          {
            dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]
              ?.name
          }
        </div>
      )}
      {!isStartSeason && !isEndSeason && seasonName && (
        <div
          className={`mt-[2px] text-transparent py-[2px] px-1 relative w-[calc(100%+20px)] text-[10px] font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}
        >
          {
            dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]
              ?.name
          }
        </div>
      )}

      {selectRoom === 'all-rooms' ? (
        <div className="w-full h-fit flex items-center justify-center p-1.5">
          <p>
            {Number(lowestPrice) > 100000
              ? Number(lowestPrice / 1000000)
                  .toFixed(1)
                  .toString() + 'M'
              : Number(lowestPrice).toString().slice(0, -3) + 'K'}
          </p>
          <p>-</p>
          <p>
            {Number(highestPrice) > 100000
              ? Number(highestPrice / 1000000)
                  .toFixed(1)
                  .toString() + 'M'
              : Number(highestPrice).toString().slice(0, -3) + 'K'}
          </p>
        </div>
      ) : (
        <p>
          {Number(roomPrice) > 100000
            ? Number(roomPrice / 1000000)
                .toFixed(1)
                .toString() + 'M'
            : Number(roomPrice).toString().slice(0, -3) + 'K'}
        </p>
      )}
    </div>
  )
}

export default RenderCalendarFullView
