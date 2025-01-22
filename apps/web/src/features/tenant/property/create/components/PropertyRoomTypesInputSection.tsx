'use client'

import React from 'react'
import { FieldArray, insert, ErrorMessage } from 'formik'
import { FiPlus } from 'react-icons/fi'
import { CiTrash } from 'react-icons/ci'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import toast from 'react-hot-toast'

import {
  IPropertyRoomFacility,
  IUseStateCreatePropertyHook,
} from '../types'
import { IPropertyRoomType } from '@/features/tenant/property/create/types'
import TabsRoomGeneralInfo from './TabsRoomGeneralInfo'
import TabsRoomDetailInfo from './TabsRoomDetailInfo'
import TabsRoomFacilities from './TabsRoomFacilities'
import TabsRoomImages from './TabsRoomImages'
const PropertyRoomTypesInputSection = ({
  values,
  setRoomFacilities,
  setDataCreatePropertyRoomFacility,
  isPendingCreatePropertyRoomFacility,
  setShowCreatePropertyRoomFacilityForm,
  mutateCreatePropertyRoomFacility,
  dataRoomFacilities,
  dataCreatePropertyRoomFacility,
  setUploadFile,
  isPendingRoomFacilities,
  setChangedCheckbox,
  showCreatePropertyRoomFacilityForm,
}: Pick<
  IUseStateCreatePropertyHook,
  | 'setUploadFile'
  | 'dataCreatePropertyRoomFacility'
  | 'setRoomFacilities'
  | 'setDataCreatePropertyRoomFacility'
  | 'setShowCreatePropertyRoomFacilityForm'
  | 'setChangedCheckbox'
  | 'showCreatePropertyRoomFacilityForm'
> & {
  isPendingRoomFacilities: boolean
  dataRoomFacilities: IPropertyRoomFacility[]
  mutateCreatePropertyRoomFacility: any
  isPendingCreatePropertyRoomFacility: boolean
  values: any
}) => {
  return (
    <FieldArray name="propertyRoomTypes">
      {({ push, remove }) => (
        <div className="w-full flex flex-col gap-5">
          <section className="py-5 flex gap-5 items-center flex-wrap">
            {values.propertyRoomTypes.map(
              (item: IPropertyRoomType, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex gap-5 items-center px-5 py-2 rounded-full border-2 border-slate-900 bg-white relative"
                  >
                    <h1 className="text-sm font-bold text-gray-800">
                      {values.propertyRoomTypes[index].name ||
                        `Room type ${index + 1}`}
                    </h1>
                    <CiTrash
                      className="text-red-600 hover:cursor-pointer hover:opacity-60 active:scale-90 transition duration-100 text-lg"
                      onClick={() => {
                        if (values.propertyRoomTypes.length <= 1) {
                          toast.error('Minimum 1 room type required')
                        } else {
                          remove(index)
                          setRoomFacilities((state: any) => {
                            state.splice(index, 1)
                            return state
                          })
                        }
                      }}
                    />
                  </div>
                )
              },
            )}
            <div
              onClick={() => {
                push({
                  name: '',
                  capacity: 1,
                  totalRooms: 1,
                  rooms: 1,
                  bathrooms: 1,
                  description: '',
                  roomFacilities: [],
                  roomImages: [],
                })
              }}
              className="flex gap-5 items-center px-5 py-2 rounded-full border-2 border-slate-900 bg-slate-900 text-white hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100"
            >
              <h1 className="text-sm font-bold">Add Room Type</h1>
              <FiPlus className="text-base" />
            </div>
          </section>
          <section className="flex flex-col gap-7">
            {values.propertyRoomTypes.map(
              (item: IPropertyRoomType, index: number) => {
                return (
                  <div key={index} className="w-full flex flex-col gap-3">
                    <hgroup className="text-xl font-bold">
                      <h1>
                        {values.propertyRoomTypes[index].name ||
                          `Room type ${index + 1}`}
                      </h1>
                    </hgroup>
                    <Tabs defaultValue="roomGeneralInfo" className="w-full">
                      <TabsList className="grid w-full h-[8em] grid-cols-1 md:h-[4em] lg:h-fit md:grid-cols-2 lg:grid-cols-4">
                        <TabsTrigger value="roomGeneralInfo">
                          Room General Information
                        </TabsTrigger>
                        <TabsTrigger value="roomDetailInfo">
                          Room Details
                        </TabsTrigger>
                        <TabsTrigger value="roomFacilities">
                          Room Facilities
                        </TabsTrigger>
                        <TabsTrigger value="roomImages">
                          Room Images
                        </TabsTrigger>
                      </TabsList>
                      <TabsRoomGeneralInfo index={index} />
                      <TabsRoomDetailInfo index={index} />
                      <TabsRoomFacilities
                        values={values}
                        isPendingRoomFacilities={isPendingRoomFacilities}
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
                        dataRoomFacilities={dataRoomFacilities}
                        dataCreatePropertyRoomFacility={
                          dataCreatePropertyRoomFacility
                        }
                        setUploadFile={setUploadFile}
                        setChangedCheckbox={setChangedCheckbox}
                        showCreatePropertyRoomFacilityForm={
                          showCreatePropertyRoomFacilityForm
                        }
                        index={index}
                      />
                      <TabsRoomImages values={values} index={index} />
                    </Tabs>
                  </div>
                )
              },
            )}
          </section>
        </div>
      )}
    </FieldArray>
  )
}

export default PropertyRoomTypesInputSection
