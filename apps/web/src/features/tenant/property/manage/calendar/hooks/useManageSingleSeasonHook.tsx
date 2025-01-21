'use client'

import React from 'react'
import useMutateGetSingleSeasonApi from '../api/useMutateGetSingleSeasonApi'
import useMutateCreateSingleSeasonApi from '../api/useMutateCreateSingleSeasonApi'
import toast from 'react-hot-toast'
import useMutateUpdateSingleSeasonApi from '../api/useMutateUpdateSingleSeasonApi'
import useMutateDeleteSingleSeasonApi from '../api/useMutateDeleteSingleSeasonApi'
import {
  IActiveRoomSetter,
  IDataPropertyRoomTypeSeason,
  IDateRange,
} from '@/features/tenant/property/manage/calendar/types'

const useManageSingleSeasonHook = ({
  setDateRange,
  setDataPropertyRoomTypeSeason,
  setDataRoomPerDate,
  setRatesPercentage,
  selectRoom,
  activeRoomSetter,
  dataPropertyRoomTypeSeason,
  dateRange,
  selectedPropertyRoomType,
}: {
  selectedPropertyRoomType: any
  setDateRange: any
  dateRange: IDateRange
  dataPropertyRoomTypeSeason: IDataPropertyRoomTypeSeason
  setDataPropertyRoomTypeSeason: any
  setDataRoomPerDate: any
  setRatesPercentage: any
  selectRoom: string
  activeRoomSetter: IActiveRoomSetter
}) => {
  const {
    mutateGetSeasonalPriceByRoomType,
    isPendingGetSeasonalPriceByRoomType,
  } = useMutateGetSingleSeasonApi({
    onSuccess: (res) => {
      setDataPropertyRoomTypeSeason({
        basePrice: res?.data?.propertySeason?.propertyRoomType?.price,
        isBulk: true,
        totalRooms: res?.data?.propertySeason?.propertyRoomType?.totalRooms,
        roomPrices:
          (Number(res?.data?.propertySeason?.propertyRoomType?.price) *
            Number(res?.data?.propertySeason?.ratesPercentage)) /
          100,
        roomsToSell:
          res?.data?.propertySeason?.roomToRent ||
          res?.data?.propertySeason?.propertyRoomType?.totalRooms,
        seasonalPriceId: res?.data?.seasonalPrice?.id,
        seasonId: res?.data?.propertySeason?.id,
        pricePercentage: res?.data?.propertySeason?.ratesPercentage || 100,
        availability:
          res?.data?.propertySeason?.availability === undefined
            ? true
            : res?.data?.propertySeason?.availability,
        propertyRoomTypeId: res?.data?.propertySeason?.propertyRoomType?.id,
        name: res?.data?.propertySeason?.name,
        startDate: res?.data?.propertySeason?.startDate,
        endDate: res?.data?.propertySeason?.endDate,
        isPeak: res?.data?.propertySeason?.isPeak
          ? res?.data?.propertySeason?.isPeak
          : false,
      })
      setDataRoomPerDate(res?.data)
      setRatesPercentage(
        Math.floor(
          (res?.data?.seasonalPrice?.price /
            res?.data?.seasonalPrice?.basePrice) *
            100,
        ),
      )
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center text-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

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

  const { mutateCreateOneSeason, isPendingCreateOneSeason } =
    useMutateCreateSingleSeasonApi({
      dataPropertyRoomTypeSeason,
      onSuccess,
      onError,
      selectRoom,
      dateRange,
      activeRoomSetter,
    })

  const { mutateUpdateSingleSeason, isPendingUpdateSingleSeason } =
    useMutateUpdateSingleSeasonApi({
      dataPropertyRoomTypeSeason,
      onSuccess,
      onError,
      selectRoom,
      dateRange,
      activeRoomSetter,
    })

  const { mutateDeleteSingleSeason, isPendingDeleteSingleSeason } =
    useMutateDeleteSingleSeasonApi({
      dataPropertyRoomTypeSeason,
      onSuccess,
      onError,
      selectedPropertyRoomType,
    })

  return {
    mutateGetSeasonalPriceByRoomType,
    mutateCreateOneSeason,
    mutateDeleteSingleSeason,
    mutateUpdateSingleSeason,
    isPendingCreateOneSeason,
    isPendingDeleteSingleSeason,
    isPendingGetSeasonalPriceByRoomType,
    isPendingUpdateSingleSeason,
  }
}

export default useManageSingleSeasonHook
