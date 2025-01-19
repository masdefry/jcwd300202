'use client'

import { Checkbox } from '@/components/ui/checkbox'
import Separator from '@/features/auth/components/Separator'
import { IBulkSeason } from '@/features/tenant/property/manage/calendar/types'
import React from 'react'

const FormPropertySeason = ({
    dataBulkSeason,
    viewMode,
    roomName,
    setDataBulkSeason,
    setChangeDate,
    setDateRange,
    setShowDeletePropertySeasonConfirmation,
    showDeletePropertySeasonConfirmation,
    isPendingDeletePropertySeason,
    mutateUpdatePropertySeason,
    mutateCreatePropertySeason,
    mutateDeletePropertySeason,
} : {
    dataBulkSeason: IBulkSeason,
    viewMode: string,
    roomName: string,
    setDataBulkSeason: any,
    setChangeDate: any,
    setDateRange: any,
    setShowDeletePropertySeasonConfirmation: any,
    showDeletePropertySeasonConfirmation: boolean,
    isPendingDeletePropertySeason: boolean,
    mutateUpdatePropertySeason: any,
    mutateCreatePropertySeason: any,
    mutateDeletePropertySeason: any,
}) => {
  return (
    <section
    className={`${dataBulkSeason?.startDate && dataBulkSeason?.endDate ? 'flex' : 'hidden'} p-5 w-full backdrop-blur-sm bg-black bg-opacity-25 h-full top-0 left-0 fixed items-center justify-center z-[51]`}
  >
    <div className="shadow-md rounded-2xl bg-white p-5 flex flex-col gap-5 w-full max-w-[400px]">
      {viewMode === 'monthly-view' && (
        <hgroup className="text-base font-bold text-gray-900 flex flex-col items-center">
          <h1>{roomName ? roomName + ' Type' : 'All Room Types'}</h1>
          <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
            {dataBulkSeason?.startDate &&
              dataBulkSeason?.startDate
                .split('T')[0]
                .split('-')
                .reverse()
                .join('-')}
            {dataBulkSeason?.endDate &&
              dataBulkSeason?.endDate !== dataBulkSeason?.startDate &&
              ' until ' +
                dataBulkSeason?.endDate
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-')}
          </p>
        </hgroup>
      )}

      <Separator />
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="bulkSeasonName"
            className="text-sm font-bold text-black ml-5"
          >
            Season Name
          </label>
          <input
            id="bulkSeasonName"
            onChange={(e) => {
              setDataBulkSeason((state: any) => {
                state.name = e.target.value
                return state
              })
              setChangeDate((state: boolean) => !state)
            }}
            value={dataBulkSeason.name}
            name="bulkSeasonName"
            type="text"
            placeholder="Eid al-fitr "
            className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="bulkSeasonRoomPricePercentage"
            className="text-sm font-bold text-black ml-5"
          >
            Rates Percentage (%)
          </label>
          <div className="flex items-center gap-3 w-full justify-center ">
            <div
              className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
              onClick={() => {
                setDataBulkSeason((state: any) => {
                  state.pricePercentage -= 5
                  return state
                })
                setChangeDate((state: boolean) => !state)
              }}
            >
              -
            </div>
            <input
              value={Number(dataBulkSeason.pricePercentage)}
              onChange={(e) => {
                setDataBulkSeason((state: any) => {
                  state.pricePercentage = Number(e.target.value)
                  return state
                })
                setChangeDate((state: boolean) => !state)
              }}
              id="bulkSeasonRoomPricePercentage"
              min={0}
              name="bulkSeasonRoomPricePercentage"
              type="number"
              placeholder="100"
              className="w-[150px] sm:w-max text-center placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
            />
            <div
              className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
              onClick={() => {
                setDataBulkSeason((state: any) => {
                  state.pricePercentage += 5
                  return state
                })
                setChangeDate((state: boolean) => !state)
              }}
            >
              +
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Checkbox
            name="bulkSeasonRoomAvailability"
            checked={dataBulkSeason?.availability}
            onCheckedChange={(e: any) => {
              if (e) {
                setDataBulkSeason((state: any) => {
                  state.availability = true
                  return state
                })
                setChangeDate((state: boolean) => !state)
              } else {
                setDataBulkSeason((state: any) => {
                  state.availability = false
                  return state
                })
                setChangeDate((state: boolean) => !state)
              }
            }}
            className="ml-5"
          />
          <label
            htmlFor="bulkSeasonRoomAvailability"
            className="text-sm font-bold text-black"
          >
            Room available
          </label>
        </div>
        {viewMode === 'list-view' && (
          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="bulkSeasonRoomToRent"
              className="text-sm font-bold text-black ml-5"
            >
              Rooms to sell
            </label>
            <input
              disabled={!dataBulkSeason.availability}
              id="bulkSeasonRoomToRent"
              name="bulkSeasonRoomToRent"
              onChange={(e) => {
                setDataBulkSeason((state: any) => {
                  state.roomsToSell = Number(e.target.value)
                  return state
                })
                setChangeDate((state: boolean) => !state)
              }}
              max={dataBulkSeason?.totalRooms}
              value={dataBulkSeason?.roomsToSell}
              type="number"
              placeholder="30 Rooms"
              className={`${!dataBulkSeason.availability ? 'text-gray-400' : 'text-gray-900'} placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium  focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2`}
            />
          </div>
        )}
      </section>
      <div className="flex items-center gap-1.5">
        <Checkbox
          name="bulkSeasonIsPeak"
          checked={dataBulkSeason.isPeak}
          onCheckedChange={(e) => {
            if (e) {
              setDataBulkSeason((state: any) => {
                state.isPeak = true
                return state
              })
              setChangeDate((state: boolean) => !state)
            } else {
              setDataBulkSeason((state: any) => {
                state.isPeak = false
                return state
              })
              setChangeDate((state: boolean) => !state)
            }
          }}
          className="ml-5"
        />
        <label
          htmlFor="bulkSeasonIsPeak"
          className="text-sm font-bold text-black"
        >
          Peak of the season
        </label>
      </div>
      <div className="flex items-center gap-2 justify-end mt-4">
        <button
          onClick={() => {
            setDataBulkSeason({
              pricePercentage: 100,
              availability: true,
              name: '',
              seasonId: '',
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
          disabled={!dataBulkSeason?.name}
          onClick={() => {
            if (dataBulkSeason?.seasonId) {
              mutateUpdatePropertySeason()
            } else {
              mutateCreatePropertySeason()
            }
          }}
          className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-gray-800 text-white shadow-md"
        >
          Save
        </button>
      </div>
      {dataBulkSeason?.seasonId && (
        <button
          type="button"
          onClick={() => {
            setShowDeletePropertySeasonConfirmation(true)
          }}
          disabled={isPendingDeletePropertySeason}
          className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-red-700 text-white shadow-md"
        >
          Delete Season
        </button>
      )}
    </div>
    {showDeletePropertySeasonConfirmation && (
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
              onClick={() =>
                setShowDeletePropertySeasonConfirmation(false)
              }
              className="border border-slate-100 box-border flex items-center gap-1.5 rounded-full hover:opacity-75 hover:bg-slate-200 active:scale-90 transition duration-100 bg-white text-gray-800 text-sm font-bold px-5 py-3 shadow-md justify-center"
            >
              No, keep season
            </button>
            <button
              type="button"
              onClick={() => {
                setShowDeletePropertySeasonConfirmation(false)
                mutateDeletePropertySeason()
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

export default FormPropertySeason
