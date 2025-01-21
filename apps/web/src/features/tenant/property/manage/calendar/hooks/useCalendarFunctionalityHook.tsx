'use client'

import React from 'react'
import useStateCalendarHook from './useStateCalendarHook'
import { isBefore } from 'date-fns'
import { addHours } from 'date-fns'
import {
  IBulkSeason,
  IDataPropertyRoomTypeSeason,
  IDateRange,
} from '@/features/tenant/property/manage/calendar/types'

const useCalendarFunctionalityHook = ({
  searchParamsWithValue,
  setSearchParamsWithValue,
  dataBulkSeason,
  setDataBulkSeason,
  setDataPropertyRoomTypeSeason,
  dataPropertyRoomTypeSeason,
  selectedPropertyRoomType,
  selectRoom,
  setDateRange,
  dateRange,
  dataSeasonsByProperty,
  setRoomName,
  mutateDataSeasonsByProperty,
  mutateDataSeasonsByPropertyRoomType,
}: {
  searchParamsWithValue: any
  setSearchParamsWithValue: any
  dataBulkSeason: IBulkSeason
  setDataBulkSeason: any
  setDataPropertyRoomTypeSeason: any
  dataPropertyRoomTypeSeason: IDataPropertyRoomTypeSeason
  selectedPropertyRoomType: any
  selectRoom: string
  setDateRange: any
  dateRange: IDateRange
  dataSeasonsByProperty: any
  setRoomName: any
  mutateDataSeasonsByProperty: any
  mutateDataSeasonsByPropertyRoomType: any
}) => {
  const paramsSearch = new URLSearchParams()
  const handleSearchParams = (orderBy: string, value: string) => {
    let isOrderByExistIndex = -1
    if (searchParamsWithValue.length > 0) {
      isOrderByExistIndex = searchParamsWithValue.findIndex(
        (item: any) => item[0] === orderBy,
      )
    }
    if (isOrderByExistIndex <= -1) {
      setSearchParamsWithValue((state: any) => {
        state.push([orderBy, value])
        return state
      })
    } else {
      setSearchParamsWithValue((state: any) => {
        state[isOrderByExistIndex] = [orderBy, value]
        return state
      })
    }
    searchParamsWithValue.forEach((item: any) => {
      paramsSearch.set(item[0], item[1])
    })
    window.history.pushState({}, '', '?' + paramsSearch.toString())
  }

  const handleDateRange = (date: Date) => {
    const dateISOString = date.toISOString()
    if (selectRoom === 'all-rooms') {
      if (isBefore(addHours(new Date(), 7), date)) {
        if (
          !dataBulkSeason?.startDate ||
          isBefore(date, dataBulkSeason.startDate) ||
          (dataBulkSeason?.startDate &&
            dataBulkSeason?.endDate &&
            dataBulkSeason?.endDate !== dateISOString)
        ) {
          setDataBulkSeason((state: any) => {
            state.endDate = null
            state.startDate = dateISOString
            return state
          })
          setDateRange((state: any) => {
            state.endDate = null
            state.startDate = dateISOString
            return state
          })
        } else if (dataBulkSeason?.endDate === dateISOString) {
          setDataBulkSeason((state: any) => {
            state.endDate = null
            state.startDate = null
            return state
          })
          setDateRange((state: any) => {
            state.endDate = null
            state.startDate = null
            return state
          })
        } else if (dataBulkSeason?.startDate && !dataBulkSeason?.endDate) {
          setDataBulkSeason((state: any) => {
            state.endDate = dateISOString
            return state
          })
          setDateRange((state: any) => {
            state.endDate = dateISOString
            return state
          })
        }
      }
    } else {
      if (isBefore(addHours(new Date(), 7), date)) {
        if (
          !dataPropertyRoomTypeSeason?.startDate ||
          isBefore(date, dataPropertyRoomTypeSeason.startDate) ||
          (dataPropertyRoomTypeSeason?.startDate &&
            dataPropertyRoomTypeSeason?.endDate &&
            dataPropertyRoomTypeSeason?.endDate !== dateISOString)
        ) {
          setDataPropertyRoomTypeSeason((state: any) => {
            state.endDate = null
            state.startDate = dateISOString
            return state
          })
          setDateRange((state: any) => {
            state.endDate = null
            state.startDate = dateISOString
            return state
          })
        } else if (dataPropertyRoomTypeSeason?.endDate === dateISOString) {
          setDataPropertyRoomTypeSeason((state: any) => {
            state.endDate = null
            state.startDate = null
            return state
          })
          setDateRange((state: any) => {
            state.endDate = null
            state.startDate = null
            return state
          })
        } else if (
          dataPropertyRoomTypeSeason?.startDate &&
          !dataPropertyRoomTypeSeason?.endDate
        ) {
          setDataPropertyRoomTypeSeason((state: any) => {
            state.endDate = dateISOString
            return state
          })
          setDateRange((state: any) => {
            state.endDate = dateISOString
            return state
          })
          setDataPropertyRoomTypeSeason({
            basePrice: selectedPropertyRoomType?.price,
            isBulk: true,
            roomPrices: selectedPropertyRoomType?.price,
            roomsToSell: selectedPropertyRoomType?.totalRooms,
            totalRooms: selectedPropertyRoomType?.totalRooms,
            pricePercentage: 100,
            availability: true,
            propertyRoomTypeId: selectedPropertyRoomType?.id,
            name: '',
            seasonId: '',
            seasonalPriceId: '',
            startDate: dateRange?.startDate,
            endDate: dateRange?.endDate,
            isPeak: false,
          })
        }
      }
    }
  }

  const handleRoomName = (value: string) => {
    const findIndex =
      dataSeasonsByProperty?.property?.propertyRoomType?.findIndex(
        (item: any) => Number(item?.id) === Number(value),
      )
    setRoomName(
      dataSeasonsByProperty?.property?.propertyRoomType[Number(findIndex)]
        ?.name,
    )
    if (value === 'all-rooms') {
      mutateDataSeasonsByProperty()
    } else {
      mutateDataSeasonsByPropertyRoomType()
    }
  }

  return {
    handleSearchParams,
    handleDateRange,
    handleRoomName,
  }
}

export default useCalendarFunctionalityHook
