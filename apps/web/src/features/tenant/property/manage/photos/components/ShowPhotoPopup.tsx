'use client'

import { IShowPhoto } from '@/features/tenant/property/manage/photos/types'
import Image from 'next/image'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { MdOutlineDeleteOutline } from 'react-icons/md'

const ShowPhotoPopup = ({
  setShowPhoto,
  setIsSubmitting,
  isSubmitting,
  mutateDeletePropertyImage,
  isPendingDeletePropertyImage,
  showPhoto,
}: {
  setShowPhoto: any
  setIsSubmitting: any
  isSubmitting: boolean
  mutateDeletePropertyImage: any
  isPendingDeletePropertyImage: boolean
  showPhoto: IShowPhoto
}) => {
  return (
    <section className="p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col gap-1 items-center justify-center z-[54]">
      <div className="w-[400px] flex justify-end">
        <div
          onClick={() =>
            setShowPhoto({
              id: 0,
              directory: '',
              filename: '',
              fileExtension: '',
            })
          }
          className="bg-white rounded-full flex items-center text-lg text-gray-800 justify-center h-7 w-7 hover:bg-slate-100 hover:cursor-pointer transition duration-100 active:scale-90"
        >
          <IoClose />
        </div>
      </div>
      <div className="bg-white rounded-md flex flex-col gap-3 shadow-md p-1 pb-2">
        <figure className="w-[400px] rounded-md h-[300px] bg-blue-200 shadow-md overflow-hidden">
          <Image
            src={`http://localhost:5000/api/${showPhoto?.directory}/${showPhoto?.filename}.${showPhoto?.fileExtension}`}
            alt=""
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-sm"
          />
        </figure>
        <div className="w-full flex justify-center items-center">
          <div
            onClick={() => setIsSubmitting(true)}
            className="flex items-center justify-center rounded-full h-10 w-10 text-gray-800 text-lg bg-slate-300 border-2 border-slate-400 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100"
          >
            <MdOutlineDeleteOutline />
          </div>
          <div
            className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}
          >
            <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
              <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
                Are you sure you want to delete this image?
              </h1>
              <article className="text-sm font-medium text-gray-500">
                This action is permanent and cannot be undone.
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
                  onClick={() => {
                    mutateDeletePropertyImage()
                  }}
                  disabled={isPendingDeletePropertyImage}
                  className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-red-700 border-slate-100"
                >
                  Delete Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowPhotoPopup
