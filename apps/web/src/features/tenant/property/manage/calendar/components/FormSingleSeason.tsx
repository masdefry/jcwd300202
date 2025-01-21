'use client'

import { Checkbox } from '@/components/ui/checkbox'
import Separator from '@/features/auth/components/Separator'
import { IActiveRoomSetter, IDataPropertyRoomTypeSeason } from '@/features/tenant/property/manage/calendar/types'
import React from 'react'

const FormSingleSeason = ({
    activeRoomSetter,
    isPendingGetSeasonalPrice,
    dataPropertyRoomTypeSeason,
    selectedPropertyRoomType,
    setDataPropertyRoomTypeSeason,
    setChangeDate,
    isEditRateByPercentage,
    viewMode,
    selectRoom,
    mutateUpdateSingleSeason,
    mutateCreateOneSeason,
    mutateUpdateSeason,
    mutateCreateSeason,
    setShowDeleteSingleSeasonConfirmation,
    showDeleteSingleSeasonConfirmation,
    mutateDeleteSingleSeason,
    mutateDeleteSeason,
    setActiveRoomSetter,
    setDateRange,
    isPendingDeleteSingleSeason,
    setIsEditRateByPercentage,
    isPendingDeleteSeason,
} : {
    activeRoomSetter: IActiveRoomSetter,
    isPendingGetSeasonalPrice: boolean,
    dataPropertyRoomTypeSeason: IDataPropertyRoomTypeSeason,
    selectedPropertyRoomType: any,
    setDataPropertyRoomTypeSeason: any,
    setChangeDate: any,
    isEditRateByPercentage: any,
    viewMode: string,
    selectRoom: string,
    mutateUpdateSingleSeason: any,
    mutateCreateOneSeason: any,
    mutateUpdateSeason: any,
    mutateCreateSeason: any,
    setShowDeleteSingleSeasonConfirmation: any,
    showDeleteSingleSeasonConfirmation: boolean,
    mutateDeleteSingleSeason: any,
    mutateDeleteSeason: any,
    setActiveRoomSetter: any,
    setDateRange: any,
    isPendingDeleteSingleSeason: boolean,
    setIsEditRateByPercentage: any,
    isPendingDeleteSeason: boolean,
}) => {
  return (
    <section
    className={`${(activeRoomSetter?.startDate && !isPendingGetSeasonalPrice) || (dataPropertyRoomTypeSeason?.startDate && dataPropertyRoomTypeSeason?.endDate) || dataPropertyRoomTypeSeason?.isBulk ? 'flex' : 'hidden'} w-full backdrop-blur-sm bg-black bg-opacity-25 h-full top-0 left-0 fixed items-center justify-center z-[51] p-5`}
  >
    <div className="shadow-md rounded-2xl bg-white p-5 flex flex-col gap-5 w-full max-w-[400px]">
      <hgroup className="text-base font-bold text-gray-900 flex flex-col items-center">
        <h1>
          {activeRoomSetter?.name || selectedPropertyRoomType?.name} Type
        </h1>
        {!dataPropertyRoomTypeSeason?.isBulk ? (
          <p className="text-sm font-medium text-gray-500 flex items-center">
            {dataPropertyRoomTypeSeason?.startDate &&
              dataPropertyRoomTypeSeason?.startDate
                .split('T')[0]
                .split('-')
                .reverse()
                .join('-')}
          </p>
        ) : (
          <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
            {dataPropertyRoomTypeSeason?.startDate &&
              dataPropertyRoomTypeSeason?.startDate
                .split('T')[0]
                .split('-')
                .reverse()
                .join('-')}
            {dataPropertyRoomTypeSeason?.endDate &&
              dataPropertyRoomTypeSeason?.endDate !==
                dataPropertyRoomTypeSeason?.startDate &&
              ' until ' +
                dataPropertyRoomTypeSeason?.endDate
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-')}
          </p>
        )}
      </hgroup>

      <Separator />
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="oneDaySeasonName"
            className="text-sm font-bold text-black ml-5"
          >
            Season Name
          </label>
          <input
            id="oneDaySeasonName"
            onChange={(e) => {
              setDataPropertyRoomTypeSeason((state: any) => {
                state.name = e.target.value
                return state
              })
              setChangeDate((state: boolean) => !state)
            }}
            value={dataPropertyRoomTypeSeason.name}
            name="oneDaySeasonName"
            type="text"
            placeholder="Eid al-fitr "
            className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Checkbox
            name="isEditRateByPercentage"
            checked={isEditRateByPercentage}
            onCheckedChange={(e) => {
              if (e) {
                setIsEditRateByPercentage(true)
                setChangeDate((state: boolean) => !state)
              } else {
                setIsEditRateByPercentage(false)
                setChangeDate((state: boolean) => !state)
              }
            }}
            className="ml-5"
          />
          <label
            htmlFor="isEditRateByPercentage"
            className="text-sm font-bold text-black"
          >
            Edit Rates By Percentage
          </label>
        </div>
        <div className="flex sm:flex-row flex-col justify-center items-center gap-2 w-full">
          <div className="w-full text-xs text-gray-600 bg-slate-300 rounded-full px-2 flex justify-center py-1 font-bold">
            Default: Rp{dataPropertyRoomTypeSeason?.basePrice}
          </div>
          {isEditRateByPercentage && (
            <div className="w-full text-xs text-amber-400 bg-gray-900 rounded-full px-2 flex justify-center py-1 font-bold">
              New: Rp
              {dataPropertyRoomTypeSeason?.roomPrices ||
                dataPropertyRoomTypeSeason?.basePrice}
            </div>
          )}
        </div>
        {!isEditRateByPercentage &&
        !(viewMode === 'monthly-view' && selectRoom === 'all-rooms') ? (
          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="oneDaySeasonRoomPrice"
              className="text-sm font-bold text-black ml-5"
            >
              Rates
            </label>
            <input
              id="oneDaySeasonRoomPrice"
              onChange={(e) => {
                setDataPropertyRoomTypeSeason((state: any) => {
                  state.roomPrices = Number(e.target.value)
                  return state
                })
                setChangeDate((state: boolean) => !state)
              }}
              value={dataPropertyRoomTypeSeason.roomPrices}
              name="oneDaySeasonRoomPrice"
              type="number"
              placeholder="Rp500000"
              className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="oneDaySeasonRoomPricePercentage"
              className="text-sm font-bold text-black ml-5"
            >
              Rates Percentage (%)
            </label>
            {dataPropertyRoomTypeSeason.isBulk ? (
              <div className="flex items-center gap-3 w-full justify-center ">
                <div
                  className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
                  onClick={() => {
                    let getPercent: number = Number(
                      Number(
                        dataPropertyRoomTypeSeason.pricePercentage,
                      ).toFixed(0),
                    )
                    getPercent -= 5
                    setDataPropertyRoomTypeSeason((state: any) => {
                      state.roomPrices = Number(
                        (Number(getPercent) / 100) * state.basePrice,
                      ).toFixed(0)
                      state.pricePercentage =
                        Number(getPercent).toFixed(0)
                      return state
                    })
                    setChangeDate((state: boolean) => !state)
                  }}
                >
                  -
                </div>
                <input
                  value={Number(
                    dataPropertyRoomTypeSeason.pricePercentage,
                  ).toFixed(0)}
                  onChange={(e) => {
                    setDataPropertyRoomTypeSeason((state: any) => {
                      state.roomPrices = Number(
                        (Number(e.target.value) / 100) * state.basePrice,
                      ).toFixed(0)
                      state.pricePercentage = Number(
                        e.target.value,
                      ).toFixed(0)
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
                      Number(
                        dataPropertyRoomTypeSeason.pricePercentage,
                      ).toFixed(0),
                    )
                    getPercent += 5
                    setDataPropertyRoomTypeSeason((state: any) => {
                      state.roomPrices = Number(
                        (Number(getPercent) / 100) * state.basePrice,
                      ).toFixed(0)
                      state.pricePercentage =
                        Number(getPercent).toFixed(0)
                      return state
                    })
                    setChangeDate((state: boolean) => !state)
                  }}
                >
                  +
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 w-full justify-center ">
                <div
                  className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
                  onClick={() => {
                    let getPercent: number = Number(
                      Number(
                        (dataPropertyRoomTypeSeason.roomPrices /
                          dataPropertyRoomTypeSeason.basePrice) *
                          100,
                      ).toFixed(0),
                    )
                    getPercent -= 5
                    setDataPropertyRoomTypeSeason((state: any) => {
                      state.roomPrices = Number(
                        (Number(getPercent) / 100) * state.basePrice,
                      ).toFixed(0)
                      return state
                    })
                    setChangeDate((state: boolean) => !state)
                  }}
                >
                  -
                </div>
                <input
                  value={Number(
                    (dataPropertyRoomTypeSeason.roomPrices /
                      dataPropertyRoomTypeSeason.basePrice) *
                      100,
                  ).toFixed(0)}
                  onChange={(e) => {
                    setDataPropertyRoomTypeSeason((state: any) => {
                      state.roomPrices = Number(
                        (Number(e.target.value) / 100) * state.basePrice,
                      ).toFixed(0)
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
                      Number(
                        (dataPropertyRoomTypeSeason.roomPrices /
                          dataPropertyRoomTypeSeason.basePrice) *
                          100,
                      ).toFixed(0),
                    )
                    getPercent += 5
                    setDataPropertyRoomTypeSeason((state: any) => {
                      state.roomPrices = Number(
                        (Number(getPercent) / 100) * state.basePrice,
                      ).toFixed(0)
                      return state
                    })
                    setChangeDate((state: boolean) => !state)
                  }}
                >
                  +
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Checkbox
            name="oneDaySeasonRoomAvailability"
            checked={dataPropertyRoomTypeSeason.availability}
            onCheckedChange={(e) => {
              if (e) {
                setDataPropertyRoomTypeSeason((state: any) => {
                  state.availability = true
                  return state
                })
                setChangeDate((state: boolean) => !state)
              } else {
                setDataPropertyRoomTypeSeason((state: any) => {
                  state.availability = false
                  return state
                })
                setChangeDate((state: boolean) => !state)
              }
            }}
            className="ml-5"
          />
          <label
            htmlFor="oneDaySeasonRoomAvailability"
            className="text-sm font-bold text-black"
          >
            Room available
          </label>
        </div>
        {(selectRoom !== 'all-rooms' || viewMode === 'list-view') && (
            <div className="flex flex-col gap-1 ">
              <label
                htmlFor="oneDaySeasonRoomToRent"
                className="text-sm font-bold text-black ml-5"
              >
                Rooms to sell
              </label>
              <input
                disabled={!dataPropertyRoomTypeSeason.availability}
                id="oneDaySeasonRoomToRent"
                name="oneDaySeasonRoomToRent"
                onChange={(e) => {
                  setDataPropertyRoomTypeSeason((state: any) => {
                    state.roomsToSell = Number(e.target.value)
                    return state
                  })
                  setChangeDate((state: boolean) => !state)
                }}
                max={dataPropertyRoomTypeSeason?.totalRooms}
                value={dataPropertyRoomTypeSeason?.roomsToSell}
                type="number"
                placeholder="30 Rooms"
                className={`${!dataPropertyRoomTypeSeason.availability ? 'text-gray-400' : 'text-gray-900'} placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium  focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2`}
              />
            </div>
          )}
      </section>
      <div className="flex items-center gap-1.5">
        <Checkbox
          name="oneDaySeasonIsPeak"
          checked={dataPropertyRoomTypeSeason.isPeak}
          onCheckedChange={(e) => {
            if (e) {
              setDataPropertyRoomTypeSeason((state: any) => {
                state.isPeak = true
                return state
              })
              setChangeDate((state: boolean) => !state)
            } else {
              setDataPropertyRoomTypeSeason((state: any) => {
                state.isPeak = false
                return state
              })
              setChangeDate((state: boolean) => !state)
            }
          }}
          className="ml-5"
        />
        <label
          htmlFor="oneDaySeasonIsPeak"
          className="text-sm font-bold text-black"
        >
          Peak of the season
        </label>
      </div>
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
      {dataPropertyRoomTypeSeason?.seasonId && (
        <button
          type="button"
          onClick={() => {
            setShowDeleteSingleSeasonConfirmation(true)
          }}
          disabled={isPendingDeleteSingleSeason || isPendingDeleteSeason}
          className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-red-700 text-white shadow-md"
        >
          Delete Season
        </button>
      )}
    </div>
    {showDeleteSingleSeasonConfirmation && (
      <div
        className={` backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-25 z-[51] flex items-center justify-center`}
      >
        <div className="bg-white rounded-3xl flex flex-col justify-between gap-3 p-5">
          <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
            Are you sure you want to delete this season?
          </h1>
          <article className="text-sm font-medium text-gray-500">
            This action will permanently remove the season details from
            your rental. You won't be able to recover it afterward.
          </article>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowDeleteSingleSeasonConfirmation(false)}
              className="border border-slate-100 box-border flex items-center gap-1.5 rounded-full hover:opacity-75 hover:bg-slate-200 active:scale-90 transition duration-100 bg-white text-gray-800 text-sm font-bold px-5 py-3 shadow-md justify-center"
            >
              No, keep season
            </button>
            <button
              type="button"
              onClick={() => {
                setShowDeleteSingleSeasonConfirmation(false)
                if (viewMode === 'monthly-view') {
                  mutateDeleteSingleSeason()
                } else {
                  mutateDeleteSeason()
                }
              }}
              className="z-20 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-90 transition duration-100 bg-red-600 text-white text-sm font-bold px-5 py-3 shadow-md justify-center"
            >
              Yes, delete season
            </button>
          </div>
        </div>
      </div>
    )}
  </section>
  )
}

export default FormSingleSeason
