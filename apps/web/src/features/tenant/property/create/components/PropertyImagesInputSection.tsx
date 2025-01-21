'use client'

import React from 'react'
import { FieldArray} from 'formik'
import { IoCloudUploadOutline } from 'react-icons/io5'
import Image from 'next/image'
import { FaRegTrashCan } from 'react-icons/fa6'
const PropertyImagesInputSection = ({ values }: { values: any }) => {
  return (
    <FieldArray name="propertyImages">
      {({
        insert: insertFilePropertyImage,
        remove: removeFilePropertyImage,
      }) => (
        <section className="grid grid-cols-4 gap-5">
          <div className="flex items-center justify-center 2xl:col-[1/4] 2xl:row-[1/3] col-span-4 w-full h-[150px] md:h-[320px] 2xl:h-[420px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg">
            {Boolean(values?.propertyImages[0]?.['name']) ? (
              <figure className="w-full h-full relative">
                <Image
                  src={URL.createObjectURL(values.propertyImages[0])}
                  width={1000}
                  height={1000}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                  <FaRegTrashCan onClick={() => removeFilePropertyImage(0)} />
                </div>
              </figure>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                  name={`propertyImages[0]`}
                  onChange={(e: any) => {
                    if (e.currentTarget.files[0]) {
                      insertFilePropertyImage(0, e.currentTarget.files[0])
                    }
                  }}
                />
              </label>
            )}
          </div>
          {Array.from({ length: 2 }).map((_, imageIdx: number) => {
            return (
              <div
                key={imageIdx}
                className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg"
              >
                {Boolean(values?.propertyImages[imageIdx + 1]?.['name']) ? (
                  <figure className="w-full h-full relative">
                    <Image
                      src={URL.createObjectURL(
                        values.propertyImages[imageIdx + 1],
                      )}
                      width={1000}
                      height={1000}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                    <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                      <FaRegTrashCan
                        onClick={() => removeFilePropertyImage(imageIdx + 1)}
                      />
                    </div>
                  </figure>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                      name={`propertyImages[${imageIdx + 1}]`}
                      onChange={(e: any) => {
                        if (e.currentTarget.files[0]) {
                          insertFilePropertyImage(
                            imageIdx + 1,
                            e.currentTarget.files[0],
                          )
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            )
          })}
          {Array.from({ length: 4 }).map((_, imageIdx: number) => {
            return (
              <div
                key={imageIdx}
                className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg"
              >
                {Boolean(values?.propertyImages[imageIdx + 3]?.['name']) ? (
                  <figure className="w-full h-full relative">
                    <Image
                      src={URL.createObjectURL(
                        values?.propertyImages[imageIdx + 3],
                      )}
                      width={1000}
                      height={1000}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                    <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                      <FaRegTrashCan
                        onClick={() => removeFilePropertyImage(imageIdx + 3)}
                      />
                    </div>
                  </figure>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                      name={`propertyImages[${imageIdx + 3}]`}
                      onChange={(e: any) => {
                        if (e.currentTarget.files[0]) {
                          insertFilePropertyImage(
                            imageIdx + 3,
                            e.currentTarget.files[0],
                          )
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            )
          })}
        </section>
      )}
    </FieldArray>
  )
}

export default PropertyImagesInputSection
