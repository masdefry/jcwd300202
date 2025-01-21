'use client'

import { ErrorMessage, Field, FieldArray } from 'formik'
import Image from 'next/image'
import React from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { IoCloudUploadOutline } from 'react-icons/io5'

const PropertyRoomImageInputSection = ({
    values,
    setUploadFile,
  }: {
    values: any
    setUploadFile: any
  }) => {
  return (
    <FieldArray name="file">
      {({ insert: insertFile, remove: removeFile, push: pushFile }) => (
        <section className="flex flex-col gap-5 mb-8 mt-3">
          <div className="flex items-center justify-center w-full h-[150px] lg:h-[420px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg">
            {Boolean(values.file[0]?.['name']) ? (
              <figure className="w-full h-full relative">
                <Image
                  src={URL.createObjectURL(values?.file[0])}
                  width={1000}
                  height={1000}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                  <FaRegTrashCan
                    onClick={() => {
                      removeFile(0)
                      setUploadFile((state: boolean) => !state)
                    }}
                  />
                </div>
              </figure>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full  cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <IoCloudUploadOutline size={28} />
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
                  name={`file[0]`}
                  onChange={(e: any) => {
                    if (e.currentTarget.files[0]) {
                      insertFile(0, e.currentTarget.files[0])
                    }
                  }}
                />
              </label>
            )}
          </div>
          <section className="grid grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, imageIdx: number) => {
              return (
                <div
                  key={imageIdx}
                  className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg"
                >
                  {Boolean(values?.file[imageIdx + 1]?.['name']) ? (
                    <figure className="w-full h-full relative">
                      <Image
                        src={URL.createObjectURL(values.file[imageIdx + 1])}
                        width={1000}
                        height={1000}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                      <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                        <FaRegTrashCan
                          onClick={() => {
                            removeFile(imageIdx + 1)
                            setUploadFile((state: boolean) => !state)
                          }}
                        />
                      </div>
                    </figure>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <IoCloudUploadOutline size={28} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          JPG, PNG or JPEG (MAX. 1MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        name={`file[${imageIdx + 1}]`}
                        onChange={(e: any) => {
                          if (e.currentTarget.files[0]) {
                            insertFile(imageIdx + 1, e.currentTarget.files[0])
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              )
            })}
          </section>
        </section>
      )}
    </FieldArray>
  )
}

export default PropertyRoomImageInputSection
