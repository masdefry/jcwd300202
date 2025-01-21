'use client'

import Image from 'next/image'
import React from 'react'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'
import { IoSearchOutline } from 'react-icons/io5'

const PropertyHasFacilitySection = ({
  showMorePropertyHasFacility,
  dataPropertyHasFacilities,
  values,
  push,
  remove,
  setShowMorePropertyHasFacility,
  isPending,
  setShowCreatePropertyFacilityForm
}: {
  setShowCreatePropertyFacilityForm: any,
  showMorePropertyHasFacility: boolean
  dataPropertyHasFacilities: any
  values: any
  push: any
  remove: any
  setShowMorePropertyHasFacility: any
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
      {dataPropertyHasFacilities?.propertyHasFacility
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
                    src={`http://localhost:5000/api/${item?.propertyFacility?.iconDirectory}/${item?.propertyFacility?.iconFilename}.${item?.propertyFacility?.iconFileExtension}`}
                    width={100}
                    height={100}
                    alt=""
                    className="h-4 w-4"
                  />
                </figure>
                <p className="text-sm font-medium text-gray-700">
                  {item?.propertyFacility?.name}
                </p>
              </div>
              <input
                type="checkbox"
                name="propertyFacilitiesId"
                onChange={(e) => {
                  if (e.target.checked) {
                    push(item?.propertyFacility?.id)
                  } else {
                    const findIdIndex = values.propertyFacilitiesId.findIndex(
                      (itm: number) => itm === item?.propertyFacility?.id,
                    )
                    remove(findIdIndex)
                  }
                }}
                className="toggle toggle-sm"
                defaultChecked
              />
            </div>
          )
        })}
      {dataPropertyHasFacilities?.propertyHasFacility.length > 5 &&
        !showMorePropertyHasFacility && (
          <div
            onClick={() => setShowMorePropertyHasFacility(true)}
            className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
          >
            <CiSquarePlus className="text-base" />
            Show more facilities
          </div>
        )}
      {showMorePropertyHasFacility &&
        dataPropertyHasFacilities?.propertyHasFacility
          .slice(5, dataPropertyHasFacilities?.propertyHasFacility.length)
          .map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white"
              >
                <div className="flex items-center gap-1.5">
                  <figure>
                    <Image
                      src={`http://localhost:5000/api/${item?.propertyFacility?.iconDirectory}/${item?.propertyFacility?.iconFilename}.${item?.propertyFacility?.iconFileExtension}`}
                      width={100}
                      height={100}
                      alt=""
                      className="h-4 w-4"
                    />
                  </figure>
                  <p className="text-sm font-medium text-gray-700">
                    {item?.propertyFacility?.name}
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="propertyFacilitiesId"
                  onChange={(e) => {
                    if (e.target.checked) {
                      push(item?.propertyFacility?.id)
                    } else {
                      const findIdIndex = values.propertyFacilitiesId.findIndex(
                        (itm: number) => itm === item?.propertyFacility?.id,
                      )
                      remove(findIdIndex)
                    }
                  }}
                  className="toggle toggle-sm"
                  defaultChecked
                />
              </div>
            )
          })}
      {dataPropertyHasFacilities?.propertyHasFacility.length <= 0 && (
        <div className="flex items-center text-sm gap-1.5 font-medium text-gray-300 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white">
          <IoSearchOutline className="text-base" />
          Property facility not found
        </div>
      )}
      {showMorePropertyHasFacility && (
        <div
          onClick={() => setShowMorePropertyHasFacility(false)}
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

export default PropertyHasFacilitySection
