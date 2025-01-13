'use client'

import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import TextInput from '@/features/tenant/property/create/components/TextInput'
import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import { CgRename } from 'react-icons/cg'
import {
  MdOutlineBedroomParent,
  MdOutlineMeetingRoom,
  MdOutlinePeopleAlt,
} from 'react-icons/md'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { GiShower } from 'react-icons/gi'
import Image from 'next/image'
import { FaRegSave } from 'react-icons/fa'
import { IoCameraOutline } from 'react-icons/io5'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { manageRoomValidationSchema } from '@/features/tenant/property/manage/room-details/edit/schemas/manageRoomValidationSchema'

const PropertyManageRoomDetailsEditPage = ({
  params,
}: {
  params: { slug: string; id: string }
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: dataPropertyRoomType, isPending: isPendingPropertyRoomType } =
    useQuery({
      queryKey: ['getPropertyRoomType'],
      queryFn: async () => {
        const res = await instance.get(`/room-type/${params?.id}`)
        return res?.data?.data
      },
    })

  const {
    mutate: mutateUpdatePropertyRoomTypeGeneral,
    isPending: isPendingUpdatePropertyRoomTypeGeneral,
  } = useMutation({
    mutationFn: async (values: any) => {
      const res = await instance.patch(`/room-type/property/${params?.slug}`, {
        name: values?.name,
        totalRooms: values?.totalRooms,
        rooms: values?.rooms,
        bathrooms: values?.bathrooms,
        capacity: values?.capacity,
        price: values?.price,
        propertyRoomTypeId: params?.id
      })
      console.log(res)
      return res?.data
    },
    onSuccess: (res) => {
      setIsSubmitting(false)
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })
  return (
    <main className="flex flex-col gap-7 py-5">
      <hgroup className="flex flex-col px-5">
        <h1 className="text-lg font-bold text-gray-800">
          Edit Deluxe Property Room Type
        </h1>
      </hgroup>
      <section className="flex flex-col gap-5 px-5">
        <div className="flex items-center justify-center w-full h-[150px] lg:h-[420px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg">
          {Boolean(
            dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[0]
              ?.directory,
          ) ? (
            <Link
              href={`/tenant/property/manage/${params.slug}/room-details/edit/${params.id}/photos`}
              className="w-full h-full relative"
            >
              <figure className="w-full h-full relative">
                <Image
                  src={`http://localhost:5000/api/${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[0]?.directory}/${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[0]?.filename}.${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[0]?.fileExtension}`}
                  width={1000}
                  height={1000}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </figure>
            </Link>
          ) : (
            <Link
              href={`/tenant/property/manage/${params.slug}/room-details/edit/${params.id}/photos`}
              className="w-full h-full relative"
            >
              <label className="flex flex-col items-center justify-center w-full h-full  cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <IoCameraOutline className="text-gray-300 text-6xl" />
              </label>
            </Link>
          )}
        </div>
        <section className="grid grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 rounded-lg"
              >
                {Boolean(
                  dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[
                    index + 1
                  ]?.directory,
                ) ? (
                  <Link
                    href={`/tenant/property/manage/${params.slug}/room-details/edit/${params.id}/photos`}
                    className="w-full h-full relative"
                  >
                    <figure className="w-full h-full relative">
                      <Image
                        src={`http://localhost:5000/api/${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[index + 1]?.directory}/${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[index + 1]?.filename}.${dataPropertyRoomType?.propertyRoomType[0]?.propertyRoomImage[index + 1]?.fileExtension}`}
                        width={1000}
                        height={1000}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </figure>
                  </Link>
                ) : (
                  <Link
                    href={`/tenant/property/manage/${params.slug}/room-details/edit/${params.id}/photos`}
                    className="w-full h-full relative"
                  >
                    <label className="flex flex-col items-center justify-center w-full h-full bg-slate-200 dark:bg-gray-700  dark:border-gray-600 ">
                      <IoCameraOutline className="text-white text-6xl" />
                    </label>
                  </Link>
                )}
              </div>
            )
          })}
        </section>
      </section>
      <Formik
        initialValues={{
          name: dataPropertyRoomType?.propertyRoomType[0]?.name || '',
          totalRooms:
            dataPropertyRoomType?.propertyRoomType[0]?.totalRooms || '',
          rooms: dataPropertyRoomType?.propertyRoomType[0]?.rooms || 1,
          bathrooms: dataPropertyRoomType?.propertyRoomType[0]?.bathrooms || 1,
          capacity: dataPropertyRoomType?.propertyRoomType[0]?.capacity || 2,
          price: dataPropertyRoomType?.propertyRoomType[0]?.price || '',
        }}
        validationSchema={manageRoomValidationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log('aaaaaaaaaaaaaaaa')
          mutateUpdatePropertyRoomTypeGeneral(values)
        }}
      >
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
            type="button"
            onClick={() => setIsSubmitting(true)}
            disabled={false}
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
                You’ve updated your room details. Please review them before
                saving.
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
                  type="submit"
                  disabled={false}
                  className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-blue-800 border-slate-100"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </main>
  )
}

export default PropertyManageRoomDetailsEditPage
