'use client'

import React from 'react'
import { Formik, Form, Field, FieldArray, insert, ErrorMessage } from 'formik'
import { FaPlus } from 'react-icons/fa6'
import { Checkbox } from '@/components/ui/checkbox'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'

import 'rsuite/SelectPicker/styles/index.css'
import 'rsuite/Rate/styles/index.css'
import { IPropertyRoomFacility, IUseStateCreatePropertyHook } from '../types'
import FormCreateRoomFacility from './FormCreateRoomFacility'
const TabsRoomFacilities = ({
  values,
  setDataCreatePropertyRoomFacility,
  isPendingCreatePropertyRoomFacility,
  setShowCreatePropertyRoomFacilityForm,
  mutateCreatePropertyRoomFacility,
  dataRoomFacilities,
  dataCreatePropertyRoomFacility,
  setUploadFile,
  setChangedCheckbox,
  showCreatePropertyRoomFacilityForm,
  index,
  isPendingRoomFacilities
}: Pick<
  IUseStateCreatePropertyHook,
  | 'setUploadFile'
  | 'dataCreatePropertyRoomFacility'
  | 'setDataCreatePropertyRoomFacility'
  | 'setShowCreatePropertyRoomFacilityForm'
  | 'setChangedCheckbox'
  | 'showCreatePropertyRoomFacilityForm'
> & {
  dataRoomFacilities: IPropertyRoomFacility[]
  mutateCreatePropertyRoomFacility: any
  isPendingCreatePropertyRoomFacility: boolean
  values: any
  index: number
  isPendingRoomFacilities: boolean
}) => {
  return (
    <TabsContent value="roomFacilities">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">
            Room Facilities
          </CardTitle>
          <CardDescription className="text-sm font-medium text-gray-600">
            Explain the facilities the room has
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ErrorMessage
            name={`propertyRoomTypes.${index}.roomFacilities`}
            component={'div'}
            className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
          />
          {isPendingRoomFacilities ? (
            <div>
              <div className="flex flex-col gap-2 w-full">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
                  {Array.from({ length: 15 }).map((_, index: number) => {
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          disabled
                          value=""
                          name="propertyFacilitesId"
                          className="scale-90"
                        />
                        <label className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5">
                          <figure className="h-4 w-4 bg-gray-200 rounded-full"></figure>
                          <p className="bg-slate-300 rounded-none text-transparent w-fit">
                            Property Facility
                          </p>
                        </label>
                      </div>
                    )
                  })}
                </section>
              </div>
            </div>
          ) : (
            <FieldArray name={`propertyRoomTypes.${index}.roomFacilities`}>
              {({ push: pushRoomFacility }) => (
                <section className="flex flex-col gap-10 w-full">
                  <section className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 w-full gap-6">
                    {dataRoomFacilities?.map(
                      (roomFacility: any, indexRoomFacility: number) => {
                        return (
                          <div
                            key={indexRoomFacility}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={
                                values.propertyRoomTypes[
                                  index
                                ].roomFacilities.findIndex(
                                  (value: any) => value === roomFacility?.id,
                                ) > -1
                              }
                              id={roomFacility?.id}
                              value={roomFacility?.id}
                              name={`propertyRoomTypes.${index}.roomFacilities.${indexRoomFacility}`}
                              onCheckedChange={(e: boolean) => {
                                if (e) {
                                  pushRoomFacility(roomFacility?.id)
                                } else {
                                  const findIdx = values.propertyRoomTypes[
                                    index
                                  ].roomFacilities.findIndex(
                                    (value: any) => value === roomFacility?.id,
                                  )
                                  values.propertyRoomTypes[
                                    index
                                  ].roomFacilities.splice(findIdx, 1)
                                  setChangedCheckbox((state: boolean) => !state)
                                }
                              }}
                              className="scale-90"
                            />
                            <label className="flex items-center gap-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              <figure>
                                <Image
                                  src={`http://localhost:5000/api/${roomFacility?.iconDirectory}/${roomFacility?.iconFilename}.${roomFacility?.iconFileExtension}`}
                                  width={100}
                                  height={100}
                                  alt=""
                                  className="h-4 w-4"
                                />
                              </figure>
                              {roomFacility?.name}
                            </label>
                          </div>
                        )
                      },
                    )}
                  </section>
                  <div
                    onClick={() => setShowCreatePropertyRoomFacilityForm(true)}
                    className="px-3 flex items-center gap-1.5 py-1.5 bg-slate-800 text-xs font-bold w-fit text-white rounded-md shadow-md hover:opacity-70 hover:cursor-pointer active:scale-90 transition duration-100 mt-[-15px]"
                  >
                    <FaPlus className="text-sm" />
                    Add Room Facility
                  </div>
                  <FormCreateRoomFacility
                    setDataCreatePropertyRoomFacility={
                      setDataCreatePropertyRoomFacility
                    }
                    isPendingCreatePropertyRoomFacility={
                      isPendingCreatePropertyRoomFacility
                    }
                    setShowCreatePropertyRoomFacilityForm={
                      setShowCreatePropertyRoomFacilityForm
                    }
                    mutateCreatePropertyRoomFacility={
                      mutateCreatePropertyRoomFacility
                    }
                    dataCreatePropertyRoomFacility={
                      dataCreatePropertyRoomFacility
                    }
                    setUploadFile={setUploadFile}
                    showCreatePropertyRoomFacilityForm={
                      showCreatePropertyRoomFacilityForm
                    }
                  />
                </section>
              )}
            </FieldArray>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  )
}

export default TabsRoomFacilities
