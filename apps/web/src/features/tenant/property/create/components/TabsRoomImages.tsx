'use client'

import React from 'react'
import { Formik, Form, Field, FieldArray, insert, ErrorMessage } from 'formik'
import { IoCloudUploadOutline } from 'react-icons/io5'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { FaRegTrashCan } from 'react-icons/fa6'
const TabsRoomImages = ({
  values,
  index
}: {
  values: any
  index: number
}) => {
  return (
    <TabsContent value="roomImages">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">
          Room Images
        </CardTitle>
        <CardDescription className="text-sm font-medium text-gray-600">
          Room images will be displayed when customers are
          exploring your property detail
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <ErrorMessage
          name={`propertyRoomTypes[${index}].roomImages`}
          component={'div'}
          className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
        />
        <FieldArray
          name={`propertyRoomTypes[${index}].roomImages`}
        >
          {({
            insert: insertFile,
            remove: removeFile,
            push: pushFile,
          }) => (
            <section className="flex flex-col gap-5 mb-8 mt-3">
              <div className="flex items-center justify-center w-full h-[150px] lg:h-[420px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg">
                {Boolean(
                  values?.propertyRoomTypes[index]
                    ?.roomImages[0]?.['name'],
                ) ? (
                  <figure className="w-full h-full relative">
                    <Image
                      src={URL.createObjectURL(
                        values?.propertyRoomTypes[index]
                          ?.roomImages[0],
                      )}
                      width={1000}
                      height={1000}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                    <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                      <FaRegTrashCan
                        onClick={() => removeFile(0)}
                      />
                    </div>
                  </figure>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full  cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <IoCloudUploadOutline size={28} />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Click to upload
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        JPG, PNG or JPEG (MAX. 1MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      name={`propertyRoomTypes[${index}].roomImages[0]`}
                      onChange={(e: any) => {
                        if (e.currentTarget.files[0]) {
                          insertFile(
                            0,
                            e.currentTarget.files[0],
                          )
                        }
                        console.log(values)
                      }}
                    />
                  </label>
                )}
              </div>
              <section className="grid grid-cols-4 gap-5">
                {Array.from({
                  length: 4,
                }).map((_, imageIdx: number) => {
                  return (
                    <div
                      key={imageIdx}
                      className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg"
                    >
                      {Boolean(
                        values?.propertyRoomTypes[index]
                          ?.roomImages[imageIdx + 1]?.[
                          'name'
                        ],
                      ) ? (
                        <figure className="w-full h-full relative">
                          <Image
                            src={URL.createObjectURL(
                              values.propertyRoomTypes[index]
                                .roomImages[imageIdx + 1],
                            )}
                            width={1000}
                            height={1000}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                          <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                            <FaRegTrashCan
                              onClick={() =>
                                removeFile(imageIdx + 1)
                              }
                            />
                          </div>
                        </figure>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <IoCloudUploadOutline size={28} />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{' '}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              JPG, PNG or JPEG (MAX. 1MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            name={`propertyRoomTypes[${index}].roomImages[${imageIdx + 1}]`}
                            onChange={(e: any) => {
                              if (e.currentTarget.files[0]) {
                                insertFile(
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
              </section>
            </section>
          )}
        </FieldArray>
      </CardContent>
    </Card>
  </TabsContent>
  )
}

export default TabsRoomImages
