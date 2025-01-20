'use client'

import React from 'react'
import { Formik, Form, Field, FieldArray, insert, ErrorMessage } from 'formik'
import { FaPlus } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'

import 'rsuite/SelectPicker/styles/index.css'
import 'rsuite/Rate/styles/index.css'
import {
  IPropertyRoomFacility,
  IUseStateCreatePropertyHook,
} from '../types'
const FormCreateRoomFacility = ({
  setDataCreatePropertyRoomFacility,
  isPendingCreatePropertyRoomFacility,
  setShowCreatePropertyRoomFacilityForm,
  mutateCreatePropertyRoomFacility,
  dataCreatePropertyRoomFacility,
  setUploadFile,
  showCreatePropertyRoomFacilityForm,
}: Pick<
  IUseStateCreatePropertyHook,
  | 'setUploadFile'
  | 'dataCreatePropertyRoomFacility'
  | 'setDataCreatePropertyRoomFacility'
  | 'setShowCreatePropertyRoomFacilityForm'
  | 'showCreatePropertyRoomFacilityForm'
> & {
  mutateCreatePropertyRoomFacility: any
  isPendingCreatePropertyRoomFacility: boolean
}) => {
  return (
    <section>
      {showCreatePropertyRoomFacilityForm && (
        <div className="fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center p-5">
          <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-7">
            <div className="flex items-center justify-end">
              <IoClose
                className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                onClick={() => {
                  setShowCreatePropertyRoomFacilityForm(false)
                  setDataCreatePropertyRoomFacility({
                    name: '',
                    file: [] as File[],
                  })
                }}
              />
            </div>
            <hgroup className="flex flex-col mt-[-10px]">
              <h1 className="text-lg font-bold text-slate-800">
                Add Room Facility
              </h1>
              <p className="text-sm font-light text-gray-500">
                Customize Your Space: Add New Room Facilities to Fit Your Needs!
              </p>
            </hgroup>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 ">
                <label className="text-sm font-bold text-black ml-5">
                  Name
                </label>
                <Field
                  id="propertyRoomFacilityName"
                  onChange={(e: any) => {
                    setDataCreatePropertyRoomFacility((state: any) => {
                      state.name = e.target.value
                      return state
                    })
                    setUploadFile((state: boolean) => !state)
                  }}
                  name="createPropertyRoomFacilityName"
                  type="text"
                  placeholder="Bathtub"
                  className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                />
                <ErrorMessage
                  name="propertyRoomFacilityName"
                  component={'div'}
                  className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                />
              </div>
              <label className="flex items-center gap-3 text-sm font-bold text-slate-900 justify-start w-full h-full cursor-pointer ">
                <p className="mb-1 ml-5">Icon</p>
                <div className="flex items-center justify-between gap-3 w-full rounded-md shadow-md border border-slate-200 bg-white p-2 px-3">
                  {dataCreatePropertyRoomFacility?.file[0]?.name ? (
                    <figure className="relative rounded-md overflow-hidden h-12 w-12 border-2 border-slate-600 border-dotted">
                      <Image
                        src={URL.createObjectURL(
                          dataCreatePropertyRoomFacility?.file[0],
                        )}
                        width={100}
                        height={100}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </figure>
                  ) : (
                    <div className="flex flex-col border-2 border-dotted border-slate-600 items-center justify-center h-12 w-12 text-slate-400 bg-slate-300 rounded-md hover:bg-slate-400 transition duration-75">
                      <FaPlus size={24} />
                    </div>
                  )}
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-xs w-full max-w-xs"
                    name="createPropertyRoomFacilityIcon"
                    onChange={(e: any) => {
                      if (e.target.files[0]) {
                        setDataCreatePropertyRoomFacility((state) => {
                          state.file[0] = e.target.files[0]
                          return state
                        })
                      }
                      setUploadFile((state: boolean) => !state)
                    }}
                  />
                </div>
              </label>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowCreatePropertyRoomFacilityForm(false)
                  setDataCreatePropertyRoomFacility({
                    name: '',
                    file: [] as File[],
                  })
                }}
                className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  isPendingCreatePropertyRoomFacility ||
                  !dataCreatePropertyRoomFacility?.name ||
                  !dataCreatePropertyRoomFacility?.file[0]?.name
                }
                onClick={() => mutateCreatePropertyRoomFacility()}
                className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default FormCreateRoomFacility
