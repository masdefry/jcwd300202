'use client'

import { ErrorMessage } from 'formik'
import React from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { SelectPicker } from 'rsuite'
import 'rsuite/SelectPicker/styles/index.css'
import { ICity } from '../types'
const CityInputSection = ({
  setShowCreateCity,
  setCityId,
  setFieldValue,
  cityId,
  cityList,
  isPendingPropertyGeneralInfo,
  isPendingUpdateGeneralInfo,
}: {
  setShowCreateCity: any
  setCityId: any
  setFieldValue: any
  cityId: number | string | null | undefined
  cityList: ICity[] | undefined
  isPendingPropertyGeneralInfo: boolean
  isPendingUpdateGeneralInfo: boolean
}) => {
  return (
    <section className="flex flex-col gap-1.5 w-full">
      <section className="flex items-end gap-2 w-full">
        <div className="grid items-center gap-1.5 w-full relative">
          <label htmlFor="city" className="text-sm font-bold text-gray-900">
            City
          </label>
          <div>
            <SelectPicker
              onChange={(value) => {
                setCityId(Number(value))
                setFieldValue('cityId', Number(value))
              }}
              menuClassName="text-sm font-bold text-gray-800"
              value={cityId}
              className="text-gray-600"
              data={cityList!}
              block
            />
          </div>
        </div>
        <button
          onClick={() => setShowCreateCity(true)}
          disabled={
            Boolean(cityId) ||
            isPendingPropertyGeneralInfo ||
            isPendingUpdateGeneralInfo
          }
          className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition hidden sm:flex items-center gap-1.5 duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
          type="button"
        >
          <CiSquarePlus size={21} /> City
        </button>
      </section>
      <button
        onClick={() => setShowCreateCity(true)}
        disabled={
          Boolean(cityId) ||
          isPendingPropertyGeneralInfo ||
          isPendingUpdateGeneralInfo
        }
        className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition sm:hidden justify-center flex items-center gap-1.5 duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
        type="button"
      >
        <CiSquarePlus size={21} /> City
      </button>
      <p className="text-slate-600 text-xs font-bold">
        Can't find your city? Simply click button Add City to add it.
      </p>
      <ErrorMessage
        name="cityId"
        component={'div'}
        className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
      />
    </section>
  )
}

export default CityInputSection
