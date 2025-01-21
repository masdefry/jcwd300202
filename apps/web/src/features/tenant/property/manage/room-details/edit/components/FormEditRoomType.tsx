'use client'

import React from 'react'
import { Form } from 'formik'
import TextInput from '@/features/tenant/property/create/components/TextInput'
import { CgRename } from 'react-icons/cg'
import {
  MdOutlineBedroomParent,
  MdOutlineMeetingRoom,
  MdOutlinePeopleAlt,
} from 'react-icons/md'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { GiShower } from 'react-icons/gi'
import { FaRegSave } from 'react-icons/fa'
import { IUseManageRoomDetailsHook } from '../../types'
const FormEditRoomType = ({
  dataPropertyRoomType,
  isPendingUpdatePropertyRoomTypeGeneral,
  isPendingPropertyRoomType,
  isSubmitting,
  mutateUpdatePropertyRoomTypeGeneral,
  setIsSubmitting,
  values,
}: {
  dataPropertyRoomType: any
  isPendingUpdatePropertyRoomTypeGeneral: boolean
  isPendingPropertyRoomType: boolean
  isSubmitting: boolean
  mutateUpdatePropertyRoomTypeGeneral: any
  setIsSubmitting: any
  values: any
}) => {
  return (
    <Form className="flex flex-col gap-5 px-5">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-base font-light text-gray-900 flex items-center gap-1.5">
          <CgRename className="text-lg text-gray-600" />
          Edit Name
        </h1>
        <section className="bg-slate-200 rounded-md px-3 py-2 flex items-center gap-1.5 text-gray-800 font-medium text-sm">
          {dataPropertyRoomType?.propertyRoomType[0]?.name}
        </section>
        <div className="rounded-md shadow-md bg-white border border-slate-100 p-3">
          <TextInput
            name="name"
            placeholder="Penthouse"
            labelName="New Name"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-base font-light text-gray-900 flex items-center gap-1.5">
          <MdOutlineMeetingRoom className="text-lg text-gray-600" />
          Edit Number of This Room Type
        </h1>
        <section className="bg-slate-200 rounded-md px-3 py-2 flex items-center gap-1.5 text-gray-800 font-medium text-sm">
          {dataPropertyRoomType?.propertyRoomType[0]?.totalRooms}
        </section>
        <div className="rounded-md shadow-md bg-white border border-slate-100 p-3">
          <TextInput
            name="totalRooms"
            placeholder="1"
            labelName="New Number of This Room Type"
            type="number"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-base font-light text-gray-900 flex items-center gap-1.5">
          <MdOutlinePeopleAlt className="text-lg text-gray-600" />
          Edit Capacity
        </h1>
        <section className="bg-slate-200 rounded-md px-3 py-2 flex items-center gap-1.5 text-gray-800 font-medium text-sm">
          {dataPropertyRoomType?.propertyRoomType[0]?.capacity}
        </section>
        <div className="rounded-md shadow-md bg-white border border-slate-100 p-3">
          <TextInput
            name="capacity"
            placeholder="2"
            labelName="New Total Guest Capacity"
            type="number"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-base font-light text-gray-900 flex items-center gap-1.5">
          <RiMoneyDollarCircleLine className="text-lg text-gray-600" />
          Edit Base Price
        </h1>
        <section className="bg-slate-200 rounded-md px-3 py-2 flex items-center gap-1.5 text-gray-800 font-medium text-sm">
          {dataPropertyRoomType?.propertyRoomType[0]?.price}
        </section>
        <div className="rounded-md shadow-md bg-white border border-slate-100 p-3">
          <TextInput
            name="price"
            placeholder="Rp500000"
            labelName="New Base Price"
            type="number"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-base font-light text-gray-900 flex items-center gap-1.5">
          <MdOutlineBedroomParent className="text-lg text-gray-600" />
          Edit Total Rooms
        </h1>
        <section className="bg-slate-200 rounded-md px-3 py-2 flex items-center gap-1.5 text-gray-800 font-medium text-sm">
          {dataPropertyRoomType?.propertyRoomType[0]?.rooms || 1}
        </section>
        <div className="rounded-md shadow-md bg-white border border-slate-100 p-3">
          <TextInput
            name="rooms"
            placeholder="1"
            labelName="New Total Rooms"
            type="number"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-base font-light text-gray-900 flex items-center gap-1.5">
          <GiShower className="text-lg text-gray-600" />
          Edit Total Bathrooms
        </h1>
        <section className="bg-slate-200 rounded-md px-3 py-2 flex items-center gap-1.5 text-gray-800 font-medium text-sm">
          {dataPropertyRoomType?.propertyRoomType[0]?.bathrooms}
        </section>
        <div className="rounded-md shadow-md bg-white border border-slate-100 p-3">
          <TextInput
            name="bathrooms"
            placeholder="1"
            labelName="New Total Bathrooms"
            type="number"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={
          isPendingUpdatePropertyRoomTypeGeneral || isPendingPropertyRoomType
        }
        className="transition duration-100 disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-slate-900 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center"
      >
        <FaRegSave className="text-base" />
        Save Changes
      </button>
      <div
        className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}
      >
        <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
          <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
            Are you sure you want to save these changes?
          </h1>
          <article className="text-sm font-medium text-gray-500">
            You’ve updated your room details. Please review them before saving.
          </article>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSubmitting(false)}
              className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => mutateUpdatePropertyRoomTypeGeneral(values)}
              disabled={isPendingUpdatePropertyRoomTypeGeneral}
              className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-blue-800 border-slate-100"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default FormEditRoomType
