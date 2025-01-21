'use client'

import React from 'react'
import { FieldArray } from 'formik'
import { BsBuildingCheck, BsBuildingExclamation } from 'react-icons/bs'
import Image from 'next/image'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'
import { IoSearchOutline } from 'react-icons/io5'

const FieldArrayRoomAmenities = ({
  dataGeneralRoomFacilities,
  selectRoom,
  values,
  showMoreRoomHasFacilities,
  setShowMoreRoomHasFacilities,
  setShowMoreRoomNotHasFacilities,
  setShowCreatePropertyRoomFacilityForm,
  showMoreRoomNotHasFacilities,
  isPending,
}: any) => {
  if (isPending) {
    return (
      <div>
        <div className="flex flex-col gap-7">
          <section className="px-5 flex flex-col gap-5">
            <h1 className="flex items-center gap-1.5 text-md font-bold skeleton bg-slate-300 rounded-none text-transparent w-fit">
              Pan Pacific Jakarta Rooms Does Have
            </h1>
            <section className=" flex flex-col gap-3">
              <div className="flex items-center text-sm gap-1.5 font-medium rounded-md skeleton bg-gray-200 text-transparent shadow-md justify-center p-4 border border-slate-200 ">
                General room facility not found
              </div>
            </section>
          </section>
          <section className="px-5 flex flex-col gap-5">
            <h1 className="flex items-center gap-1.5 text-md font-bold skeleton bg-slate-300 rounded-none text-transparent w-fit">
              Pan Pacific Jakarta Rooms Does Not Have
            </h1>

            <section className=" flex flex-col gap-3">
              <div className="flex items-center text-sm gap-1.5 font-medium rounded-md skeleton bg-gray-200 text-transparent shadow-md justify-center p-4 border border-slate-200 ">
                Property facility not found
              </div>
            </section>
          </section>
        </div>
      </div>
    )
  }

  return (
    <FieldArray name="propertyRoomFacilitiesId">
      {({ push, remove }) => (
        <div className="flex flex-col gap-7">
          <section className="px-5 flex flex-col gap-5">
            {selectRoom === 'all-rooms' ? (
              <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                <BsBuildingCheck className="text-lg" />
                {dataGeneralRoomFacilities?.property?.name} Rooms Does Have
              </h1>
            ) : (
              <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                <BsBuildingCheck className="text-lg" />
                {dataGeneralRoomFacilities?.propertyRoomType?.name} Room Type
                Does Have
              </h1>
            )}
            <section className=" flex flex-col gap-3">
              {dataGeneralRoomFacilities?.roomHasFacilities
                ?.slice(0, 5)
                ?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white"
                    >
                      <div className="flex items-center gap-1.5">
                        <figure>
                          <Image
                            src={`http://localhost:5000/api/${item?.iconDirectory || item?.propertyRoomFacility?.iconDirectory}/${item?.iconFilename || item?.propertyRoomFacility?.iconFilename}.${item?.iconFileExtension || item?.propertyRoomFacility?.iconFileExtension}`}
                            width={100}
                            height={100}
                            alt=""
                            className="h-4 w-4"
                          />
                        </figure>
                        <p className="text-sm font-medium text-gray-700">
                          {item?.name || item?.propertyRoomFacility?.name}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="propertyRoomFacilitiesId"
                        onChange={(e) => {
                          if (e.target.checked) {
                            push(item?.id || item?.propertyRoomFacility?.id)
                          } else {
                            const findIdIndex = item?.propertyRoomFacility?.id
                              ? values.propertyRoomFacilitiesId.findIndex(
                                  (itm: number) =>
                                    itm === item?.propertyRoomFacility?.id,
                                )
                              : values.propertyRoomFacilitiesId.findIndex(
                                  (itm: number) => itm === item?.id,
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
              {dataGeneralRoomFacilities?.roomHasFacilities?.length > 5 &&
                !showMoreRoomHasFacilities && (
                  <div
                    onClick={() => setShowMoreRoomHasFacilities(true)}
                    className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
                  >
                    <CiSquarePlus className="text-base" />
                    Show more facilities
                  </div>
                )}
              {showMoreRoomHasFacilities &&
                dataGeneralRoomFacilities?.roomHasFacilities
                  ?.slice(
                    5,
                    dataGeneralRoomFacilities?.roomHasFacilities?.length,
                  )
                  ?.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white"
                      >
                        <div className="flex items-center gap-1.5">
                          <figure>
                            <Image
                              src={`http://localhost:5000/api/${item?.iconDirectory || item?.propertyRoomFacility?.iconDirectory}/${item?.iconFilename || item?.propertyRoomFacility?.iconFilename}.${item?.iconFileExtension || item?.propertyRoomFacility?.iconFileExtension}`}
                              height={100}
                              width={100}
                              alt=""
                              className="h-4 w-4"
                            />
                          </figure>
                          <p className="text-sm font-medium text-gray-700">
                            {item?.name || item?.propertyRoomFacility?.name}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          name="propertyRoomFacilitiesId"
                          onChange={(e) => {
                            if (e.target.checked) {
                              push(item?.id || item?.propertyRoomFacility?.id)
                            } else {
                              const findIdIndex = item?.propertyRoomFacility?.id
                                ? values.propertyRoomFacilitiesId.findIndex(
                                    (itm: number) =>
                                      itm === item?.propertyRoomFacility?.id,
                                  )
                                : values.propertyRoomFacilitiesId.findIndex(
                                    (itm: number) => itm === item?.id,
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
              {dataGeneralRoomFacilities?.roomHasFacilities?.length <= 0 && (
                <div className="flex items-center text-sm gap-1.5 font-medium text-gray-300 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white">
                  <IoSearchOutline className="text-base" />
                  General room facility not found
                </div>
              )}
              {showMoreRoomHasFacilities && (
                <div
                  onClick={() => setShowMoreRoomHasFacilities(false)}
                  className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
                >
                  <CiSquareMinus className="text-base" />
                  Show less facilities
                </div>
              )}
              <div
                onClick={() => setShowCreatePropertyRoomFacilityForm(true)}
                className="transition duration-100 hover:cursor-pointer active:scale-[0.98] hover:opacity-75 flex items-center text-sm gap-1.5 font-bold text-white rounded-md shadow-md justify-center p-4 border border-slate-200 bg-gray-900"
              >
                <CiSquarePlus className="text-base" />
                Doesn’t meet your facility needs? Click this to create a new
                one!
              </div>
            </section>
          </section>
          <section className="px-5 flex flex-col gap-5">
            {selectRoom === 'all-rooms' ? (
              <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                <BsBuildingExclamation className="text-lg" />
                {dataGeneralRoomFacilities?.property?.name} Rooms Does Not Have
              </h1>
            ) : (
              <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                <BsBuildingExclamation className="text-lg" />
                {dataGeneralRoomFacilities?.propertyRoomType?.name} Room Type
                Does Not Have
              </h1>
            )}
            <section className=" flex flex-col gap-3">
              {dataGeneralRoomFacilities?.roomNotHasFacilities
                ?.slice(0, 5)
                ?.map((item: any, index: number) => {
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
                            const findIdIndex =
                              values.propertyRoomFacilitiesId.findIndex(
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
              {dataGeneralRoomFacilities?.roomNotHasFacilities?.length > 5 &&
                !showMoreRoomNotHasFacilities && (
                  <div
                    onClick={() => setShowMoreRoomNotHasFacilities(true)}
                    className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
                  >
                    <CiSquarePlus className="text-base" />
                    Show more facilities
                  </div>
                )}
              {showMoreRoomNotHasFacilities &&
                dataGeneralRoomFacilities?.roomNotHasFacilities
                  ?.slice(
                    5,
                    dataGeneralRoomFacilities?.roomNotHasFacilities.length,
                  )
                  ?.map((item: any, index: number) => {
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
                              const findIdIndex =
                                values.propertyRoomFacilitiesId.findIndex(
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
              {dataGeneralRoomFacilities?.roomNotHasFacilities?.length <= 0 && (
                <div className="flex items-center text-sm gap-1.5 font-medium text-gray-300 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white">
                  <IoSearchOutline className="text-base" />
                  Property facility not found
                </div>
              )}
              {showMoreRoomNotHasFacilities && (
                <div
                  onClick={() => setShowMoreRoomNotHasFacilities(false)}
                  className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
                >
                  <CiSquareMinus className="text-base" />
                  Show less facilities
                </div>
              )}
              <div
                onClick={() => setShowCreatePropertyRoomFacilityForm(true)}
                className="transition duration-100 hover:cursor-pointer active:scale-[0.98] hover:opacity-75 flex items-center text-sm gap-1.5 font-bold text-white rounded-md shadow-md justify-center p-4 border border-slate-200 bg-gray-900"
              >
                <CiSquarePlus className="text-base" />
                Doesn’t meet your facility needs? Click this to create a new
                one!
              </div>
            </section>
          </section>
        </div>
      )}
    </FieldArray>
  )
}

export default FieldArrayRoomAmenities
