'use client'

import React, { useState } from 'react'

const useStateCalendarHook = () => {
  const [
    showDeletePropertySeasonConfirmation,
    setShowDeletePropertySeasonConfirmation,
  ] = useState(false)
  const [
    showDeleteSingleSeasonConfirmation,
    setShowDeleteSingleSeasonConfirmation,
  ] = useState(false)
  const [selectedPropertyRoomType, setSelectedPropertyRoomType] =
    useState<any>()
  const [dataSeasonsByProperty, setDataSeasonsByProperty] = useState<any>()
  const [errorStatus, setErrorStatus] = useState<null | number>()
  const [propertyRoomTypes, setPropertyRoomTypes] = useState<any>()
  const [isPendingSeasons, setIsPendingSeasons] = useState(true)

  const paramsSearch = new URLSearchParams()
  const [searchParamsWithValue, setSearchParamsWithValue] = useState<any>([])
  const [dateRange, setDateRange] = useState<{
    startDate: string | null
    endDate: string | null
    id?: string | number
    name?: string
  }>({
    startDate: null,
    endDate: null,
  })
  const [dataPropertyRoomTypeSeason, setDataPropertyRoomTypeSeason] =
    useState<any>({
      basePrice: 0,
      isBulk: false,
      roomPrices: 0,
      roomsToSell: 0,
      totalRooms: 0,
      pricePercentage: '',
      availability: true,
      propertyRoomTypeId: 0,
      name: '',
      seasonId: '',
      seasonalPriceId: '',
      startDate: '',
      endDate: '',
      isPeak: false,
    })
  const [dataBulkSeason, setDataBulkSeason] = useState<any>({
    pricePercentage: 100,
    availability: true,
    name: '',
    seasonId: '',
    startDate: '',
    endDate: '',
    isPeak: false,
  })
  const [roomName, setRoomName] = useState('')
  const [roomAvailability, setRoomAvailability] = useState(true)
  const [isPeakSeason, setIsPeakSeason] = useState(false)
  const [changeDate, setChangeDate] = useState(true)
  const [dataRoomPerDate, setDataRoomPerDate] = useState<any>()
  const [ratesPercentage, setRatesPercentage] = useState(100)
  const [isEditRateByPercentage, setIsEditRateByPercentage] = useState(true)
  const [activeRoomSetter, setActiveRoomSetter] = useState<any>({
    startDate: '',
    endDate: '',
    name: '',
  })

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [viewMode, setViewMode] = useState('monthly-view')
  const [selectRoom, setSelectRoom] = useState('all-rooms')

  return {
    showDeletePropertySeasonConfirmation,
    setShowDeletePropertySeasonConfirmation,
    showDeleteSingleSeasonConfirmation,
    setShowDeleteSingleSeasonConfirmation,
    selectedPropertyRoomType,
    setSelectedPropertyRoomType,
    dataSeasonsByProperty,
    setDataSeasonsByProperty,
    errorStatus,
    setErrorStatus,
    propertyRoomTypes,
    setPropertyRoomTypes,
    isPendingSeasons,
    setIsPendingSeasons,
    searchParamsWithValue,
    setSearchParamsWithValue,
    paramsSearch,
    dateRange,
    setDateRange,
    dataPropertyRoomTypeSeason,
    setDataPropertyRoomTypeSeason,
    dataBulkSeason,
    setDataBulkSeason,
    roomName,
    setRoomName,
    roomAvailability,
    setRoomAvailability,
    isPeakSeason,
    setIsPeakSeason,
    changeDate,
    setChangeDate,
    dataRoomPerDate,
    setDataRoomPerDate,
    ratesPercentage,
    setRatesPercentage,
    isEditRateByPercentage,
    setIsEditRateByPercentage,
    activeRoomSetter,
    setActiveRoomSetter,
    month,
    setMonth,
    year,
    setYear,
    viewMode,
    setViewMode,
    selectRoom,
    setSelectRoom
  }
}

export default useStateCalendarHook
