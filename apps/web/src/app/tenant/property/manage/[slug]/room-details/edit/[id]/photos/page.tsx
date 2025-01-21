'use client'

import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'
import {
  MdOutlineAddPhotoAlternate,
  MdOutlineDeleteOutline,
} from 'react-icons/md'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FaRegTrashCan } from 'react-icons/fa6'
import { manageRoomPhotosValidationSchema } from '@/features/tenant/property/manage/room-details/edit/photos/schemas/manageRoomPhotosValidationSchema'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import useManageRoomImagesHook from '@/features/tenant/property/manage/room-details/edit/photos/hooks/useManageRoomImagesHook'
import FormCreateRoomImage from '@/features/tenant/property/manage/room-details/edit/photos/components/FormCreateRoomImage'
import ShowRoomImagePopup from '@/features/tenant/property/manage/room-details/edit/photos/components/ShowRoomImagePopup'

const PropertyManageRoomPhotosPage = ({
  params,
}: {
  params: { slug: string; id: string }
}) => {
  const {
    isSubmitting,
    setIsSubmitting,
    showPhoto,
    setShowPhoto,
    showAddPhoto,
    setShowAddPhoto,
    dataPropertyRoomImages,
    isPendingPropertyRoomImages,
    isError,
    error,
    mutateDeletePropertyImage,
    isPendingDeletePropertyImage,
    mutateCreatePropertyRoomImage,
    isPendingCreatePropertyRoomImage,
  } = useManageRoomImagesHook({ params })
  if (isError) {
    let getError: any = error
    if (getError.status === 403) {
      return <UnauthorizedPage />
    } else if (getError.status === 404) {
      return <NotFoundMain />
    } else if (getError.status === 500) {
      return <Custom500 />
    } else {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {getError?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    }
  }

  return (
    <main className="flex flex-col gap-7 py-5">
      <hgroup className="flex flex-col px-5">
        <h1 className="text-lg font-bold text-gray-800">Room Photos</h1>
        <p className="text-sm font-medium text-slate-600">
          Empower Your Space: Effortlessly Update Your Room Images Anytime!
        </p>
      </hgroup>
      <div className="w-full flex justify-end px-5">
        <button
          type="button"
          onClick={() => setShowAddPhoto(true)}
          disabled={
            Array.isArray(dataPropertyRoomImages) &&
            dataPropertyRoomImages.length >= 5 ||
            isPendingPropertyRoomImages ||
            isPendingCreatePropertyRoomImage ||
            isPendingDeletePropertyImage
          }
          className="disabled:bg-slate-300 disabled:text-white disabled:border-none disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm px-4 py-2 rounded-md text-gray-800 font-bold border-2 border-gray-800 bg-white hover:bg-gray-800 hover:text-white transition duration-100 active:scale-90"
        >
          <MdOutlineAddPhotoAlternate />
          Add Photo
        </button>
      </div>
      <section className="gap-3 grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 px-5">
        {dataPropertyRoomImages?.map((item: any, index: number) => {
          return (
            <figure
            key={index}
              onClick={() =>
                setShowPhoto({
                  id: item?.id,
                  directory: item?.directory,
                  filename: item?.filename,
                  fileExtension: item?.fileExtension,
                })
              }
              className="p-1 rounded-md h-[200px] bg-slate-200 shadow-md pb-3 overflow-hidden hover:scale-105 transition duration-100 hover:cursor-pointer"
            >
              <Image
                src={`http://localhost:5000/api/${item?.directory}/${item?.filename}.${item?.fileExtension}`}
                alt=""
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-sm"
              />
            </figure>
          )
        })}
      </section>
      {showPhoto?.directory && (
        <ShowRoomImagePopup
          setShowPhoto={setShowPhoto}
          setIsSubmitting={setIsSubmitting}
          isSubmitting={isSubmitting}
          mutateDeletePropertyImage={mutateDeletePropertyImage}
          isPendingDeletePropertyImage={isPendingDeletePropertyImage}
          showPhoto={showPhoto}
        />
      )}
      <section
        className={`z-[54] p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${showAddPhoto ? 'flex' : 'hidden'} flex-col gap-1 items-center justify-center`}
      >
        <Formik
          initialValues={{
            file: [] as File[],
          }}
          validationSchema={manageRoomPhotosValidationSchema}
          onSubmit={(values) => {
            const fd = new FormData()
            fd.append('images', values?.file[0])
            mutateCreatePropertyRoomImage(fd)
          }}
        >
          {({ setFieldValue, values }) => (
            <FormCreateRoomImage
              setFieldValue={setFieldValue}
              setShowAddPhoto={setShowAddPhoto}
              values={values}
            />
          )}
        </Formik>
      </section>
    </main>
  )
}

export default PropertyManageRoomPhotosPage
