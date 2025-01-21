'use client'

import React, { useEffect } from 'react'
import 'rsuite/Calendar/styles/index.css'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import useStateCalendarHook from '@/features/tenant/property/manage/calendar/hooks/useStateCalendarHook'
import useCalendarFunctionalityHook from '@/features/tenant/property/manage/calendar/hooks/useCalendarFunctionalityHook'
import useGetDataSeasonsHook from '@/features/tenant/property/manage/calendar/hooks/useGetDataSeasonsHook'
import useManageOneDaySeasonHook from '@/features/tenant/property/manage/calendar/hooks/useManageOneDaySeasonHook'
import useManagePropertySeasonHook from '@/features/tenant/property/manage/calendar/hooks/useManagePropertySeasonHook'
import useManageSingleSeasonHook from '@/features/tenant/property/manage/calendar/hooks/useManageSingleSeasonHook'
import CalendarMainTitle from '@/features/tenant/property/manage/calendar/components/CalendarMainTitle'
import CalendarSelectDropdownMenu from '@/features/tenant/property/manage/calendar/components/CalendarSelectDropdownMenu'
import CalendarListView from '@/features/tenant/property/manage/calendar/components/CalendarListView'
import CalendarMonthlyView from '@/features/tenant/property/manage/calendar/components/CalendarMonthlyView'
import FormSingleSeason from '@/features/tenant/property/manage/calendar/components/FormSingleSeason'
import FormPropertySeason from '@/features/tenant/property/manage/calendar/components/FormPropertySeason'

const CalendarPage = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { view: string }
}) => {
  const {
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
    dateRange,
    setDateRange,
    dataPropertyRoomTypeSeason,
    setDataPropertyRoomTypeSeason,
    dataBulkSeason,
    setDataBulkSeason,
    roomName,
    setRoomName,
    setRoomAvailability,
    setIsPeakSeason,
    setChangeDate,
    setDataRoomPerDate,
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
    setSelectRoom,
  } = useStateCalendarHook()

  const {
    mutateDataSeasonsByProperty,
    mutateDataSeasonsByPropertyRoomType,
  } = useGetDataSeasonsHook({ setDataSeasonsByProperty, selectRoom, params })

  const { handleSearchParams, handleDateRange, handleRoomName } =
    useCalendarFunctionalityHook({
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
    })

  const {
    mutateGetSeasonalPrice,
    mutateCreateSeason,
    mutateDeleteSeason,
    mutateUpdateSeason,
    isPendingGetSeasonalPrice,
    isPendingDeleteSeason,
  } = useManageOneDaySeasonHook({
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
  })

  const {
    isPendingDeletePropertySeason,
    mutateCreatePropertySeason,
    mutateUpdatePropertySeason,
    mutateDeletePropertySeason,
    fetchDataSeasonsByProperty,
  } = useManagePropertySeasonHook({
    setDateRange,
    setDataBulkSeason,
    params,
    dataBulkSeason,
    setDataSeasonsByProperty,
    setPropertyRoomTypes,
    setIsPendingSeasons,
    setErrorStatus,
  })

  const {
    mutateGetSeasonalPriceByRoomType,
    mutateCreateOneSeason,
    mutateDeleteSingleSeason,
    mutateUpdateSingleSeason,
    isPendingDeleteSingleSeason,
  } = useManageSingleSeasonHook({
    setDateRange,
    setDataPropertyRoomTypeSeason,
    setDataRoomPerDate,
    setRatesPercentage,
    selectRoom,
    activeRoomSetter,
    dataPropertyRoomTypeSeason,
    dateRange,
    selectedPropertyRoomType,
  })

  useEffect(() => {
    setViewMode(searchParams?.view || 'monthly-view')
    fetchDataSeasonsByProperty()
  }, [])

  if (errorStatus === 403) {
    return <UnauthorizedPage />
  } else if (errorStatus === 404) {
    return <NotFoundMain />
  } else if (errorStatus === 500) {
    return <Custom500 />
  }
  return (
    <main className="overflow-x-auto w-screen-lg relative min-h-screen 2xl:p-5 pb-5">
      <div className="flex flex-col gap-10 min-w-[1080px] h-full">
        <CalendarMainTitle />
        <CalendarSelectDropdownMenu
          year={year}
          month={month}
          setMonth={setMonth}
          setYear={setYear}
          handleSearchParams={handleSearchParams}
          setViewMode={setViewMode}
          viewMode={viewMode}
          propertyRoomTypes={propertyRoomTypes}
          setSelectedPropertyRoomType={setSelectedPropertyRoomType}
          setSelectRoom={setSelectRoom}
          handleRoomName={handleRoomName}
        />
        {viewMode === 'list-view' &&
          dataSeasonsByProperty?.property?.propertyRoomType?.map(
            (item: any, index: number) => {
              return (
                <CalendarListView
                  key={index}
                  setChangeDate={setChangeDate}
                  item={item}
                  isPendingSeasons={isPendingSeasons}
                  dataSeasonsByProperty={dataSeasonsByProperty}
                  month={month}
                  year={year}
                  mutateGetSeasonalPrice={mutateGetSeasonalPrice}
                  setActiveRoomSetter={setActiveRoomSetter}
                  setDataPropertyRoomTypeSeason={setDataPropertyRoomTypeSeason}
                />
              )
            },
          )}
        {viewMode === 'monthly-view' && (
          <CalendarMonthlyView
            setChangeDate={setChangeDate}
            dateRange={dateRange}
            handleDateRange={handleDateRange}
            isPendingSeasons={isPendingSeasons}
            selectRoom={selectRoom}
            dataSeasonsByProperty={dataSeasonsByProperty}
            selectedPropertyRoomType={selectedPropertyRoomType}
            setDataBulkSeason={setDataBulkSeason}
            mutateGetSeasonalPriceByRoomType={mutateGetSeasonalPriceByRoomType}
          />
        )}
        <FormSingleSeason
          activeRoomSetter={activeRoomSetter}
          isPendingGetSeasonalPrice={isPendingGetSeasonalPrice}
          dataPropertyRoomTypeSeason={dataPropertyRoomTypeSeason}
          selectedPropertyRoomType={selectedPropertyRoomType}
          setDataPropertyRoomTypeSeason={setDataPropertyRoomTypeSeason}
          setChangeDate={setChangeDate}
          isEditRateByPercentage={isEditRateByPercentage}
          viewMode={viewMode}
          selectRoom={selectRoom}
          mutateUpdateSingleSeason={mutateUpdateSingleSeason}
          mutateCreateOneSeason={mutateCreateOneSeason}
          mutateUpdateSeason={mutateUpdateSeason}
          mutateCreateSeason={mutateCreateSeason}
          setShowDeleteSingleSeasonConfirmation={
            setShowDeleteSingleSeasonConfirmation
          }
          showDeleteSingleSeasonConfirmation={
            showDeleteSingleSeasonConfirmation
          }
          mutateDeleteSingleSeason={mutateDeleteSingleSeason}
          mutateDeleteSeason={mutateDeleteSeason}
          setActiveRoomSetter={setActiveRoomSetter}
          setDateRange={setDateRange}
          isPendingDeleteSingleSeason={isPendingDeleteSingleSeason}
          setIsEditRateByPercentage={setIsEditRateByPercentage}
          isPendingDeleteSeason={isPendingDeleteSeason}
        />
        <FormPropertySeason
          dataBulkSeason={dataBulkSeason}
          viewMode={viewMode}
          roomName={roomName}
          setDataBulkSeason={setDataBulkSeason}
          setChangeDate={setChangeDate}
          setDateRange={setDateRange}
          setShowDeletePropertySeasonConfirmation={
            setShowDeletePropertySeasonConfirmation
          }
          showDeletePropertySeasonConfirmation={
            showDeletePropertySeasonConfirmation
          }
          isPendingDeletePropertySeason={isPendingDeletePropertySeason}
          mutateUpdatePropertySeason={mutateUpdatePropertySeason}
          mutateCreatePropertySeason={mutateCreatePropertySeason}
          mutateDeletePropertySeason={mutateDeletePropertySeason}
        />
      </div>
    </main>
  )
}

export default CalendarPage
