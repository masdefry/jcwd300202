'use client'

import { IDateRange } from '@/features/tenant/property/manage/calendar/types'
import { addDays, isBefore } from 'date-fns'
import { addHours, differenceInDays } from 'date-fns'
import React from 'react'
import { Calendar } from 'rsuite'
import 'rsuite/Calendar/styles/index.css'
import RenderCalendarFullView from './RenderCalendarFullView'
const CalendarMonthlyView = ({
  setChangeDate,
  dateRange,
  handleDateRange,
  isPendingSeasons,
  selectRoom,
  dataSeasonsByProperty,
  selectedPropertyRoomType,
  setDataBulkSeason,
  mutateGetSeasonalPriceByRoomType,
}: {
  setChangeDate: any
  dateRange: IDateRange
  handleDateRange: (value: Date) => void
  isPendingSeasons: boolean
  selectRoom: string
  dataSeasonsByProperty: any
  selectedPropertyRoomType: any
  setDataBulkSeason: any
  mutateGetSeasonalPriceByRoomType: any
}) => {
  return (
    <section className="w-full flex flex-col ">
      <div className="w-full flex flex-col gap-5 h-screen">
        {isPendingSeasons ? (
          <hgroup className="text-xl font-bold text-gray-900 flex items-center gap-1">
            <h1 className=" flex items-center gap-1 skeleton text-transparent bg-slate-300 rounded-none w-fit">
              Pan Pacific Jakarta Property
            </h1>
          </hgroup>
        ) : (
          <hgroup className="text-xl font-bold text-gray-900 flex items-center gap-1">
            <h1 className=" flex items-center gap-1">
              {selectRoom === 'all-rooms'
                ? dataSeasonsByProperty?.property?.name + ' Property'
                : selectedPropertyRoomType?.name + ' Room Type'}
            </h1>
          </hgroup>
        )}
        <div className="w-full h-full flex items-center">
          <Calendar
            className="w-full h-full"
            onSelect={(date) => {
              let seasonStartDate: any
              let seasonEndDate: any
              let seasonId: any
              let seasonName: any
              let seasonRatesPercentage: any
              let seasonIsPeak: any
              let seasonAvailability: any
              let seasonRoomToRent: any
              let seasonBasePrice: any
              let isBulk: false, seasonRoomTypeTotalRooms: any
              dataSeasonsByProperty?.propertySeasons?.forEach(
                (seasonalPrice: any, index: number) => {
                  const getIndex = seasonalPrice?.seasonalPrice?.findIndex(
                    (season: any) =>
                      season?.date === addHours(date, 7).toISOString() &&
                      season?.propertyId ===
                        dataSeasonsByProperty?.property?.id,
                  )
                  if (getIndex > -1) {
                    seasonStartDate = seasonalPrice?.startDate
                    seasonEndDate = seasonalPrice?.endDate
                    seasonId = seasonalPrice?.id
                    seasonName = seasonalPrice?.name
                    seasonRatesPercentage = seasonalPrice?.ratesPercentage
                    seasonIsPeak = seasonalPrice?.isPeak
                    seasonRoomToRent = seasonalPrice?.roomToRent
                    seasonAvailability = seasonalPrice?.availability
                    seasonBasePrice = seasonalPrice?.basePrice
                    seasonRoomTypeTotalRooms = seasonalPrice?.totalRooms
                  }
                },
              )
              if (seasonId) {
                if (selectRoom === 'all-rooms') {
                  setDataBulkSeason({
                    pricePercentage: seasonRatesPercentage,
                    availability: seasonAvailability,
                    name: seasonName,
                    seasonId: seasonId,
                    startDate: seasonStartDate,
                    endDate: seasonEndDate,
                    isPeak: seasonIsPeak,
                  })
                } else {
                  mutateGetSeasonalPriceByRoomType({
                    startDate: seasonStartDate,
                    endDate: seasonEndDate,
                    seasonId,
                  })
                }
              } else {
                handleDateRange(addHours(date, 7))
              }
              setChangeDate((state: boolean) => !state)
            }}
            cellClassName={(date) => {
              let rangeDateArr: any[] = []
              if (dateRange?.endDate && dateRange?.startDate) {
                rangeDateArr = Array.from({
                  length:
                    differenceInDays(dateRange?.endDate, dateRange?.startDate) +
                    1,
                }).map((_, index) => {
                  return addDays(
                    dateRange?.startDate as string,
                    index,
                  ).toISOString()
                })
              }

              if (isBefore(date, new Date())) {
                return 'bg-gray-200 active:outline-none active:border-none active:ring-0 hover:cursor-not-allowed hover:bg-gray-200 active:cursor-not-allowed text-gray-500'
              } else if (
                rangeDateArr.length > 0 &&
                rangeDateArr.includes(new Date(addHours(date, 7)).toISOString())
              ) {
                return 'bg-blue-300 text-gray-900'
              }
              return ''
            }}
            renderCell={(date) => {
              const seasonIdxHighestPrice =
                dataSeasonsByProperty?.seasons?.findIndex(
                  (season: any) =>
                    season?.date === addHours(date, 7).toISOString() &&
                    season?.propertyRoomTypeId ===
                      dataSeasonsByProperty?.property?.propertyRoomType[
                        dataSeasonsByProperty?.property?.propertyRoomType
                          .length - 1
                      ]?.id,
                )
              const seasonIdxLowestPrice =
                dataSeasonsByProperty?.seasons?.findIndex(
                  (season: any) =>
                    season?.date === addHours(date, 7).toISOString() &&
                    season?.propertyRoomTypeId ===
                      dataSeasonsByProperty?.property?.propertyRoomType[0]?.id,
                )
              let seasonalPriceIdxPropertySeason
              let seasonIdxPropertySeason = -1
              let isStartSeason
              let isEndSeason
              let isAvailable
              let seasonStartDate: any
              let seasonEndDate: any
              let seasonId: any
              dataSeasonsByProperty?.propertySeasons?.forEach(
                (seasonalPrice: any, index: number) => {
                  const getIndex = seasonalPrice?.seasonalPrice?.findIndex(
                    (season: any) =>
                      season?.date === addHours(date, 7).toISOString() &&
                      season?.propertyId ===
                        dataSeasonsByProperty?.property?.id,
                  )
                  if (getIndex > -1) {
                    seasonalPriceIdxPropertySeason = getIndex
                    seasonIdxPropertySeason = index
                    isEndSeason =
                      seasonalPrice?.seasonalPrice[getIndex]?.isEndSeason
                    isStartSeason =
                      seasonalPrice?.seasonalPrice[getIndex]?.isStartSeason
                    isAvailable =
                      seasonalPrice?.seasonalPrice[getIndex]?.roomAvailability
                    seasonStartDate = seasonalPrice?.startDate
                    seasonEndDate = seasonalPrice?.endDate
                    seasonId = seasonalPrice?.id
                  }
                },
              )

              let highestPrice =
                dataSeasonsByProperty?.property?.propertyRoomType[
                  dataSeasonsByProperty?.property?.propertyRoomType.length - 1
                ]?.price
              let lowestPrice =
                dataSeasonsByProperty?.property?.propertyRoomType[0]?.price
              let isPropertyHasSeason = false
              let isRoomHasSeason = false
              if (seasonIdxHighestPrice > -1) {
                highestPrice =
                  dataSeasonsByProperty?.seasons[seasonIdxHighestPrice]?.price
              }
              if (seasonIdxLowestPrice > -1) {
                lowestPrice =
                  dataSeasonsByProperty?.seasons[seasonIdxLowestPrice]?.price
              }
              let roomPrice = 0
              if (selectRoom !== 'all-rooms') {
                const findRoomIdx =
                  dataSeasonsByProperty?.property?.propertyRoomType.findIndex(
                    (room: any) => Number(room?.id) === Number(selectRoom),
                  )
                roomPrice =
                  dataSeasonsByProperty?.property?.propertyRoomType[findRoomIdx]
                    ?.price
                const seasonIdx = dataSeasonsByProperty?.seasons?.findIndex(
                  (season: any) =>
                    season?.date === addHours(date, 7).toISOString() &&
                    Number(season?.propertyRoomTypeId) === Number(selectRoom),
                )
                if (seasonIdx > -1) {
                  roomPrice = dataSeasonsByProperty?.seasons[seasonIdx]?.price
                  isStartSeason =
                    dataSeasonsByProperty?.seasons[seasonIdx]?.isStartSeason
                  isEndSeason =
                    dataSeasonsByProperty?.seasons[seasonIdx]?.isEndSeason
                }
              }
              const seasonName =
                dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]
                  ?.name
              if (isPendingSeasons) {
                return (
                  <div className="w-full h-fit flex flex-col items-center justify-center text-xs font-medium text-gray-500">
                    <div className="w-full h-fit flex flex-col items-center justify-center p-1.5">
                      <p className="skeleton rounded-none bg-slate-300 w-fit text-transparent">
                        10M 30M 20M
                      </p>
                    </div>
                  </div>
                )
              }
              return (
                <RenderCalendarFullView
                  seasonalPriceIdxPropertySeason={seasonalPriceIdxPropertySeason}
                  seasonIdxPropertySeason={seasonIdxPropertySeason}
                  isStartSeason={isStartSeason}
                  isEndSeason={isEndSeason}
                  isAvailable={isAvailable}
                  highestPrice={highestPrice}
                  lowestPrice={lowestPrice}
                  roomPrice={roomPrice}
                  selectRoom={selectRoom}
                  dataSeasonsByProperty={dataSeasonsByProperty}
                  seasonName={seasonName}
                />
              )
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default CalendarMonthlyView
