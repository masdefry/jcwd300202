'use client'

import Separator from '@/features/auth/components/Separator'
import { IPropertyRoomType } from '@/features/tenant/property/create/types'
import { isBefore } from 'date-fns'
import { addHours } from 'date-fns'
import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FaCheck, FaFire, FaRegCalendar } from 'react-icons/fa6'
import { MdOutlineSell } from 'react-icons/md'

const CalendarListView = ({
  setChangeDate,
  item,
  isPendingSeasons,
  dataSeasonsByProperty,
  month,
  year,
  mutateGetSeasonalPrice,
  setActiveRoomSetter,
  setDataPropertyRoomTypeSeason,
}: {
    setChangeDate: any,
    item: IPropertyRoomType,
    isPendingSeasons: boolean,
    dataSeasonsByProperty: any,
    month: number,
    year: number,
    mutateGetSeasonalPrice: any,
    setActiveRoomSetter: any,
    setDataPropertyRoomTypeSeason: any,
}) => {
  return (
    <section className="flex flex-col gap-5">
      {isPendingSeasons ? (
        <hgroup className="text-xl font-bold text-gray-900 flex flex-col gap-1">
          <h1 className="text-transparent skeleton rounded-none bg-slate-300 w-fit">
            Pan Pacific
          </h1>
          <p className="text-sm font-medium text-transparent skeleton rounded-none bg-slate-300 w-fit">
            Pan Pacific Jakarta
          </p>
        </hgroup>
      ) : (
        <hgroup className="text-xl font-bold text-gray-900 flex flex-col">
          <h1>{item?.name}</h1>
          <p className="text-sm font-medium text-gray-500">
            {dataSeasonsByProperty?.property?.name}
          </p>
        </hgroup>
      )}
      <Separator />
      <div className="overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300">
        <div className="overflow-hidden flex items-center w-fit bg-white">
          <div className="flex flex-col border-2 border-white rounded-2xl overflow-hidden bg-slate-600">
            <div className=" bg-gray-800 text-white justify-center p-2 text-sm font-bold w-[200px] flex flex-col gap-2 h-[45px]">
              <span className="flex items-center gap-1.5">
                <FaRegCalendar className="text-gray-50" size={18} />
                Month {month + 1 < 10 ? '0' + (month + 1) : month + 1}-{year}
              </span>
            </div>
            <div className="  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[45px]">
              <span className="flex items-center gap-1.5">
                <FaCheck className="text-emerald-100" size={18} />
                Status
              </span>
            </div>
            <div className="  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[65px]">
              <span className="flex items-center gap-1.5">
                <MdOutlineSell className="text-gray-100" size={18} />
                Rooms to sell
              </span>
              <div className="text-blue-100 hover:opacity-75 hover:cursor-pointer active:underline transition duration-100">
                (Ready to rent)
              </div>
            </div>
            <div className="  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[45px]">
              <span className="flex items-center gap-1.5">
                <BsCurrencyDollar className="text-green-100" size={18} />
                Rates
              </span>
            </div>
          </div>
          {Array.from({
            length: new Date(year, month, 0).getDate(),
          }).map((_: any, index: number) => {
            const today = new Date(year, month, new Date().getDate())
            const seasonIdx = dataSeasonsByProperty?.seasons?.findIndex(
              (season: any) =>
                season?.date ===
                  addHours(new Date(year, month, index + 1), 7).toISOString() &&
                season?.propertyRoomTypeId === item?.id,
            )
            return (
              <div
                key={index}
                onClick={() => {
                  if (isBefore(new Date(), new Date(year, month, index + 1))) {
                    mutateGetSeasonalPrice({
                      propertyRoomTypeId: Number(item?.id),
                      date: new Date(year, month, index + 1),
                    })
                    setActiveRoomSetter({
                      startDate: new Date(year, month, index + 2),
                      endDate: new Date(year, month, index + 2),
                      name: item?.name,
                    })
                    setDataPropertyRoomTypeSeason((state: any) => {
                      state.startDate = new Date(
                        year,
                        month,
                        index + 2,
                      ).toISOString()
                      state.endDate = new Date(
                        year,
                        month,
                        index + 2,
                      ).toISOString()
                      return state
                    })
                    setChangeDate((state: boolean) => !state)
                  }
                }}
                className={`${seasonIdx <= -1 ? 'bg-slate-100' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'bg-slate-100' : 'bg-red-200'} rounded-2xl overflow-hidden flex flex-col   ${isBefore(new Date(year, month, index + 1), new Date()) ? 'hover:cursor-not-allowed opacity-60 hover:border-white' : 'hover:cursor-pointer hover:border-amber-400 active:border-blue-400'}border-white border-2 active:border-2  transition duration-75`}
              >
                <div className=" bg-gray-800 text-white flex items-center justify-between p-2 text-sm font-bold w-[85px]  gap-2 h-[45px]">
                  <div>
                    {seasonIdx <= -1 ? (
                      ''
                    ) : dataSeasonsByProperty?.seasons[seasonIdx]?.isPeak ? (
                      <FaFire className="text-amber-400 text-lg" />
                    ) : (
                      ''
                    )}
                  </div>
                  {index + 1}
                </div>
                <div className="  justify-center p-2 text-sm font-bold text-gray-800 w-[85px] flex flex-col gap-2 h-[45px]">
                  <div
                    className={`h-[70%] w-full ${seasonIdx <= -1 ? 'bg-green-300 text-green-800' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'}
                   opacity-65 rounded-full text-xs flex items-center justify-center `}
                  >
                    {seasonIdx <= -1
                      ? 'Open'
                      : dataSeasonsByProperty?.seasons[seasonIdx]
                            ?.roomAvailability
                        ? 'Open'
                        : 'Closed'}
                  </div>
                </div>
                <div
                  className={`  justify-center items-end p-2 text-base font-light ${seasonIdx <= -1 ? 'text-gray-800' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'text-gray-800' : 'text-transparent'}  w-[85px] flex flex-col gap-2 h-[65px]`}
                >
                  {seasonIdx > -1
                    ? dataSeasonsByProperty?.seasons[seasonIdx]?.roomToRent
                    : item?.totalRooms}
                </div>
                <div
                  className={`  justify-center items-end p-2 text-sm font-medium ${seasonIdx <= -1 ? 'text-gray-600' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'text-gray-600' : 'text-transparent'} w-full flex flex-col gap-2 h-[45px]`}
                >
                  <span className="flex items-center">
                    {seasonIdx > -1
                      ? Number(
                          dataSeasonsByProperty?.seasons[seasonIdx]?.price,
                        ) > 100000
                        ? Number(
                            dataSeasonsByProperty?.seasons[seasonIdx]?.price /
                              1000000,
                          )
                            .toFixed(1)
                            .toString() + 'M'
                        : Number(
                            dataSeasonsByProperty?.seasons[seasonIdx]?.price,
                          )
                            .toString()
                            .slice(0, -3) + 'K'
                      : Number(item?.price) > 100000
                        ? Number(item?.price / 1000000)
                            .toFixed(1)
                            .toString() + 'M'
                        : Number(item?.price).toString().slice(0, -3) + 'K'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CalendarListView
