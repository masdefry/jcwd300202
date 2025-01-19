'use client'

import { ErrorMessage } from 'formik'
import React from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { SelectPicker } from 'rsuite'
import 'rsuite/SelectPicker/styles/index.css'
import { ICountry } from '../types'
const CountryInputSection = ({
  setShowCreateCountry,
  setCountryId,
  setFieldValue,
  countryId,
  countryList,
  isPendingPropertyGeneralInfo,
  isPendingUpdateGeneralInfo,
}: {
  setShowCreateCountry: any
  setCountryId: any
  setFieldValue: any
  countryId: number | undefined | null
  countryList: ICountry[] | undefined
  isPendingPropertyGeneralInfo: boolean | undefined
  isPendingUpdateGeneralInfo: boolean | undefined
}) => {
  return (
    <section className="flex flex-col gap-1.5 w-full">
      <section className="flex items-end gap-2 w-full">
        <div className="grid items-center gap-1.5 w-full relative">
          <label htmlFor="country" className="text-sm font-bold text-gray-900">
            Country
          </label>
          <div>
            <SelectPicker
              onChange={(value) => {
                setCountryId(value)
                setFieldValue('countryId', Number(value))
              }}
              menuClassName="text-sm font-bold text-gray-800 z-[53] overflow-hidden"
              value={countryId}
              className="text-gray-600"
              data={countryList!}
              block
            />
          </div>
        </div>
        <button
          onClick={() => setShowCreateCountry(true)}
          disabled={
            Boolean(countryId) ||
            isPendingPropertyGeneralInfo ||
            isPendingUpdateGeneralInfo
          }
          className="hidden sm:flex items-center gap-1.5 disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
          type="button"
        >
          <CiSquarePlus size={21} /> Country
        </button>
      </section>
      <button
        onClick={() => setShowCreateCountry(true)}
        disabled={
          Boolean(countryId) ||
          isPendingPropertyGeneralInfo ||
          isPendingUpdateGeneralInfo
        }
        className="sm:hidden justify-center flex items-center gap-1.5 disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
        type="button"
      >
        <CiSquarePlus size={21} /> Country
      </button>
      <p className="text-slate-600 text-xs font-bold">
        Country not listed? Click button Add Country to add it to Our list.
      </p>
      <ErrorMessage
        name="countryId"
        component={'div'}
        className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
      />
    </section>
  )
}

export default CountryInputSection
