'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useCalendarFunctionalityHook from './useCalendarFunctionalityHook'
import useStateCalendarHook from './useStateCalendarHook'
import useMutateCreateOneDaySeasonApi from '../api/useMutateCreateOneDaySeasonApi'
import useMutateUpdateOneDaySeasonApi from '../api/useMutateUpdateOneDaySeasonApi'
import useMutateDeleteOneDaySeasonApi from '../api/useMutateDeleteOneDaySeasonApi'
import useMutateGetOneDaySeasonApi from '../api/useMutateGetOneDaySeasonApi'
import {
  IActiveRoomSetter,
  IDataPropertyRoomTypeSeason,
  IDateRange,
} from '@/features/tenant/property/manage/calendar/types'

const useManageOneDaySeasonHook = ({
  params,
  searchParams,
  setDataPropertyRoomTypeSeason,
  dataPropertyRoomTypeSeason,
  setDateRange,
  dateRange,
  setActiveRoomSetter,
  activeRoomSetter,
  setDataRoomPerDate,
  setRoomAvailability,
  setIsPeakSeason,
  setRatesPercentage,
}: {
  params: { slug: string }
  searchParams: { view: string }
  setDataPropertyRoomTypeSeason: any
  dataPropertyRoomTypeSeason: IDataPropertyRoomTypeSeason
  setDateRange: any
  dateRange: IDateRange
  setActiveRoomSetter: any
  activeRoomSetter: IActiveRoomSetter
  setDataRoomPerDate: any
  setRoomAvailability: any
  setIsPeakSeason: any
  setRatesPercentage: any
}) => {
  const onSuccess = (res: any) => {
    setDateRange({
      startDate: null,
      endDate: null,
    })
    setDataPropertyRoomTypeSeason({
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
    setActiveRoomSetter({
      startDate: '',
      endDate: '',
      name: '',
    })
    toast((t) => (
      <span className="flex gap-2 items-center font-semibold justify-center text-xs">
        {res?.message}
      </span>
    ))
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const onError = (err: any) => {
    toast((t) => (
      <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
        {err?.response?.data?.message || 'Connection error!'}
      </span>
    ))
  }
  const { mutateGetSeasonalPrice, isPendingGetSeasonalPrice } =
    useMutateGetOneDaySeasonApi({
      onSuccess: (res) => {
        setDataPropertyRoomTypeSeason({
          pricePercentage: '',
          basePrice: res?.data?.seasonalPrice?.basePrice,
          isBulk: false,
          totalRooms: res?.data?.seasonalPrice?.totalRooms,
          roomPrices:
            res?.data?.seasonalPrice?.price ||
            res?.data?.seasonalPrice?.basePrice,
          roomsToSell:
            res?.data?.seasonalPrice?.roomToRent ||
            res?.data?.seasonalPrice?.totalRooms,
          seasonalPriceId: res?.data?.seasonalPrice?.id,
          seasonId: res?.data?.season?.id || '',
          availability:
            res?.data?.seasonalPrice?.roomAvailability === undefined
              ? true
              : res?.data?.seasonalPrice?.roomAvailability,
          propertyRoomTypeId: res?.data?.season?.propertyRoomTypeId,
          name: res?.data?.season?.name,
          startDate: dataPropertyRoomTypeSeason.startDate,
          endDate: dataPropertyRoomTypeSeason.endDate,
          isPeak: res?.data?.seasonalPrice?.isPeak || false,
        })
        setDataRoomPerDate(res?.data)
        setRoomAvailability(res?.data?.seasonalPrice?.roomAvailability)
        setIsPeakSeason(res?.data?.seasonalPrice?.isPeak)
        setRatesPercentage(
          Math.floor(
            (res?.data?.seasonalPrice?.price /
              res?.data?.seasonalPrice?.basePrice) *
              100,
          ),
        )
      },
      onError,
    })

  const { mutateCreateSeason, isPendingCreateSeason } =
    useMutateCreateOneDaySeasonApi({
      dataPropertyRoomTypeSeason,
      activeRoomSetter,
      dateRange,
      onSuccess,
      onError,
    })

  const { mutateUpdateSeason, isPendingUpdateSeason } =
    useMutateUpdateOneDaySeasonApi({
      dataPropertyRoomTypeSeason,
      activeRoomSetter,
      dateRange,
      onSuccess,
      onError,
    })

  const { mutateDeleteSeason, isPendingDeleteSeason } =
    useMutateDeleteOneDaySeasonApi({
      dataPropertyRoomTypeSeason,
      activeRoomSetter,
      dateRange,
      onSuccess,
      onError,
    })

  return {
    mutateGetSeasonalPrice,
    mutateCreateSeason,
    mutateDeleteSeason,
    mutateUpdateSeason,
    isPendingCreateSeason,
    isPendingGetSeasonalPrice,
    isPendingDeleteSeason,
    isPendingUpdateSeason,
  }
}

export default useManageOneDaySeasonHook
