'use client'

import { ErrorMessage } from 'formik'
import React from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { Rate, SelectPicker } from 'rsuite'
import 'rsuite/SelectPicker/styles/index.css'
import 'rsuite/Rate/styles/index.css'
import { IPropertyGeneralInfo, IPropertyType } from '../types'
const PropertyTypeInputSection = ({
  setShowFormCreatePropertyType,
  setPropertyTypeId,
  setFieldValue,
  propertyTypeId,
  propertyTypes,
  isPendingPropertyGeneralInfo,
  isPendingUpdateGeneralInfo,
  values,
}: {
  setShowFormCreatePropertyType: any
  setPropertyTypeId: any
  setFieldValue: any
  propertyTypeId: number | string | null | undefined
  propertyTypes: { value: string | number; label: string }[]
  isPendingPropertyGeneralInfo?: boolean | undefined
  isPendingUpdateGeneralInfo?: boolean | undefined
  values: (IPropertyGeneralInfo & { propertyTypeName: string }) | undefined
}) => {
  return (
    <section className="flex flex-col gap-1.5 w-full">
      <section className="flex sm:flex-row flex-col items-start sm:items-center gap-8">
        {values?.propertyTypeName?.toLowerCase().includes('hotel') && (
          <div className="flex justify-center items-start flex-col gap-1.5 min-w-max relative">
            <label
              htmlFor="propertyType"
              className="text-sm font-bold text-gray-900"
            >
              Star
            </label>
            <div>
              <Rate
                value={values?.star}
                color="yellow"
                size="xs"
                onChangeActive={(value: number) => setFieldValue('star', value)}
              />
            </div>
          </div>
        )}
        <div className="flex items-end gap-2 w-full">
          <div className="grid items-center gap-1.5 w-full relative">
            <label
              htmlFor="propertyType"
              className="text-sm font-bold text-gray-900"
            >
              Property Type
            </label>
            <div>
              <SelectPicker
                onChange={(value) => {
                  setPropertyTypeId(value)
                  setFieldValue('propertyTypeId', Number(value))
                  const getPropertyType: any = propertyTypes!.find(
                    (item: { value: string | number; label: string }) =>
                      Number(item?.value) === Number(value),
                  )

                  setFieldValue('propertyTypeName', getPropertyType?.label)
                }}
                menuClassName="text-sm font-bold text-gray-800"
                value={propertyTypeId}
                className="text-gray-600"
                data={propertyTypes!}
                block
              />
            </div>
          </div>
          <button
            onClick={() => setShowFormCreatePropertyType(true)}
            disabled={
              Boolean(propertyTypeId) ||
              isPendingPropertyGeneralInfo ||
              isPendingUpdateGeneralInfo
            }
            className="hidden sm:flex items-center gap-1.5 disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
            type="button"
          >
            <CiSquarePlus size={21} />
            Type
          </button>
        </div>
      </section>
      <button
        onClick={() => setShowFormCreatePropertyType(true)}
        disabled={
          Boolean(propertyTypeId) ||
          isPendingPropertyGeneralInfo ||
          isPendingUpdateGeneralInfo
        }
        className="sm:hidden flex justify-center items-center gap-1.5 disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
        type="button"
      >
        <CiSquarePlus size={21} />
        Type
      </button>
      <p className="text-slate-600 text-xs font-bold">
        If Your property type is missing, click button Add Property Type to add
        it.
      </p>
      <ErrorMessage
        name="propertyTypeId"
        component={'div'}
        className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
      />
      <ErrorMessage
        name="star"
        component={'div'}
        className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
      />
    </section>
  )
}

export default PropertyTypeInputSection
