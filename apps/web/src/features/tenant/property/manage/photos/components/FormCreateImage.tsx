'use client'

import { ErrorMessage, Form } from 'formik'
import Image from 'next/image'
import React from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'

const FormCreateImage = ({
  setFieldValue,
  setShowAddPhoto,
  values,
}: {
  setFieldValue: any
  setShowAddPhoto: any
  values: any
}) => {
  return (
    <Form className=" flex flex-col gap-1 items-center justify-center w-full">
      <div className="w-[400px] flex justify-end">
        <div
          onClick={() => {
            setFieldValue('file[0]', null)
            setShowAddPhoto(false)
          }}
          className="bg-white rounded-full flex items-center text-lg text-gray-800 justify-center h-7 w-7 hover:bg-slate-100 hover:cursor-pointer transition duration-100 active:scale-90"
        >
          <IoClose />
        </div>
      </div>
      <div className="bg-white  flex flex-col gap-3 shadow-md p-1 pb-2 w-[400px] rounded-md h-[300px]">
        {values?.file[0]?.name ? (
          <figure className="w-full h-full relative overflow-hidden">
            <Image
              src={URL.createObjectURL(values?.file[0])}
              width={1000}
              height={1000}
              alt=""
              className="object-cover w-full h-full"
            />
            <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
              <FaRegTrashCan onClick={() => setFieldValue('file[0]', null)} />
            </div>
          </figure>
        ) : (
          <label className="border-2 border-gray-300 border-dashed flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <IoCloudUploadOutline size={24} />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPG, PNG or JPEG (MAX. 1MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              name="file"
              onChange={(e: any) => {
                if (e.currentTarget.files[0]) {
                  setFieldValue('file[0]', e.currentTarget.files[0])
                }
              }}
            />
          </label>
        )}
        <ErrorMessage
          name="file"
          component={'div'}
          className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
        />
        <div className="flex items-center justify-between w-full gap-1.5">
          <button
            onClick={() => {
              setShowAddPhoto(false)
              setFieldValue('file[0]', null)
            }}
            type="button"
            className="text-sm font-bold rounded-md p-2 w-full shadow-md text-gray-800 bg-white border border-slate-100 hover:opacity-75 active:scale-95 transition duration-100"
          >
            Cancel
          </button>
          <button
            disabled={!values?.file[0]?.name}
            type="submit"
            className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-sm font-bold rounded-md p-2 w-full shadow-md text-white bg-gray-800 hover:opacity-75 active:scale-95 transition duration-100"
          >
            Add image
          </button>
        </div>
      </div>
    </Form>
  )
}

export default FormCreateImage
