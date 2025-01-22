'use client'

import React from 'react'
import { FieldArray } from 'formik'
import { IoCloudUploadOutline } from 'react-icons/io5'
import Image from 'next/image'
import { FaRegTrashCan } from 'react-icons/fa6'
import { Checkbox } from '@/components/ui/checkbox'
import {
  IPropertyRoomFacility,
  IUseStateCreatePropertyHook,
} from '../types'
const PropertyFacilitiesInputSection = ({
  dataPropertyFacilities,
  values,
  isPendingPropertyFacilities
}: {
  dataPropertyFacilities: IPropertyRoomFacility[]
  values: any
  isPendingPropertyFacilities: boolean
}) => {
  if(isPendingPropertyFacilities) {
    return (
      <div>
          <div className="flex flex-col gap-2 w-full">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
              {Array.from({ length: 15 }).map((_, index: number) => {
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      disabled
                      value=''
                      name="propertyFacilitesId"
                      className="scale-90"
                    />
                    <label className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5">
                      <figure className="h-4 w-4 bg-gray-200 rounded-full">
                      </figure>
                      <p className='bg-slate-300 rounded-none text-transparent w-fit'>
                      Property Facility

                      </p>
                    </label>
                  </div>
                )
              })}
            </section>
          </div>
      </div>
    )

  }
  return (
    <FieldArray name="propertyFacilitiesId">
      {({ push: pushPropertyFacility }) => (
        <div className="flex flex-col gap-2 w-full">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
            {dataPropertyFacilities?.map((item: any, index: number) => {
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    value={item?.id}
                    name="propertyFacilitesId"
                    className="scale-90"
                    onCheckedChange={(e) => {
                      if (e) {
                        pushPropertyFacility(item?.id)
                      } else {
                        const findIdx = values.propertyFacilitiesId.findIndex(
                          (value: IPropertyRoomFacility) => value === item?.id,
                        )
                        values.propertyFacilitiesId.splice(findIdx, 1)
                      }
                    }}
                  />
                  <label className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5">
                    <figure>
                      <Image
                        src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                        width={100}
                        height={100}
                        alt=""
                        className="h-4 w-4"
                      />
                    </figure>
                    {item?.name}
                  </label>
                </div>
              )
            })}
          </section>
        </div>
      )}
    </FieldArray>
  )
}

export default PropertyFacilitiesInputSection
