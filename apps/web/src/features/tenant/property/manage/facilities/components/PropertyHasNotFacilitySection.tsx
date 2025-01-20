'use client'

import Image from 'next/image'
import React from 'react'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'
import { IoSearchOutline } from 'react-icons/io5'

const PropertyHasNotFacilitySection = ({
  showMorePropertyNotHasFacility,
  dataPropertyHasFacilities,
  values,
  push,
  remove,
  setShowMorePropertyNotHasFacility,
  isPending,
  setShowCreatePropertyFacilityForm
}: {
  showMorePropertyNotHasFacility: boolean
  setShowCreatePropertyFacilityForm: any
  dataPropertyHasFacilities: any
  values: any
  push: any
  remove: any
  setShowMorePropertyNotHasFacility: any
  isPending: boolean
}) => {
  if (isPending) {
    return (
      <section className=" flex flex-col gap-3">
        {Array.from({ length: 6 }).map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="  flex text-transparent items-center rounded-md shadow-md justify-between p-4 skeleton bg-gray-200 "
            >
              <p className="text-sm font-medium">dsd</p>
            </div>
          )
        })}
      </section>
    )
  }
  return (
    <section className=" flex flex-col gap-3">
      {dataPropertyHasFacilities?.propertyNotHasFacility
        .slice(0, 5)
        .map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white"
            >
              <div className="flex items-center gap-1.5">
                <figure>
                  <Image
                    src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                    width={100}
                    height={100}
                    alt=""
                    className="h-4 w-4"
                  />
                </figure>
                <p className="text-sm font-medium text-gray-700">
                  {item?.name}
                </p>
              </div>
              <input
                onChange={(e) => {
                  if (e.target.checked) {
                    push(item?.id)
                  } else {
                    const findIdIndex = values.propertyFacilitiesId.findIndex(
                      (itm: number) => itm === item?.id,
                    )
                    remove(findIdIndex)
                  }
                }}
                type="checkbox"
                className="toggle toggle-sm"
              />
            </div>
          )
        })}
      {dataPropertyHasFacilities?.propertyNotHasFacility.length > 5 &&
        !showMorePropertyNotHasFacility && (
          <div
            onClick={() => setShowMorePropertyNotHasFacility(true)}
            className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
          >
            <CiSquarePlus className="text-base" />
            Show more facilities
          </div>
        )}
      {showMorePropertyNotHasFacility &&
        dataPropertyHasFacilities?.propertyNotHasFacility
          .slice(5, dataPropertyHasFacilities?.propertyNotHasFacility.length)
          .map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white"
              >
                <div className="flex items-center gap-1.5">
                  <figure>
                    <Image
                      src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                      width={100}
                      height={100}
                      alt=""
                      className="h-4 w-4"
                    />
                  </figure>
                  <p className="text-sm font-medium text-gray-700">
                    {item?.name}
                  </p>
                </div>
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      push(item?.id)
                    } else {
                      const findIdIndex = values.propertyFacilitiesId.findIndex(
                        (itm: number) => itm === item?.id,
                      )
                      remove(findIdIndex)
                    }
                  }}
                  type="checkbox"
                  className="toggle toggle-sm"
                />
              </div>
            )
          })}
      {dataPropertyHasFacilities?.propertyNotHasFacility.length <= 0 && (
        <div className="flex items-center text-sm gap-1.5 font-medium text-gray-300 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white">
          <IoSearchOutline className="text-base" />
          Property facility not found
        </div>
      )}
      {showMorePropertyNotHasFacility && (
        <div
          onClick={() => setShowMorePropertyNotHasFacility(false)}
          className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
        >
          <CiSquareMinus className="text-base" />
          Show less facilities
        </div>
      )}
      <div
        onClick={() => setShowCreatePropertyFacilityForm(true)}
        className="transition duration-100 hover:cursor-pointer active:scale-[0.98] hover:opacity-75 flex items-center text-sm gap-1.5 font-bold text-white rounded-md shadow-md justify-center p-4 border border-slate-200 bg-gray-900"
      >
        <CiSquarePlus className="text-base" />
        Doesn’t meet your facility needs? Click this to create a new one!
      </div>
    </section>
  )
}

export default PropertyHasNotFacilitySection
