'use client'

import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import { FieldArray } from 'formik'
import React from 'react'

const RoomTypesDescriptionsInputSection = ({
  dataPropertyDescriptions,
  isPendingPropertyDescriptions,
}: {
  dataPropertyDescriptions: any
  isPendingPropertyDescriptions: boolean
}) => {
  return (
    <FieldArray name="propertyRoomType">
      {({ push, remove }) => (
        <section className="flex flex-col gap-7">
          {isPendingPropertyDescriptions
            ? Array.from({length: 3}).map(
                (_, index: number) => {
                  return (
                    <div key={index} className="flex flex-col gap-5">
                      <div className="text-sm font-normal text-gray-700 mb-[-15px] sm:flex-row flex-col flex justify-start sm:items-center gap-1">
                        <b className="bg-slate-300 skeleton rounded-none text-transparent w-fit">My Room Type 123</b>
                        <p className='bg-slate-300 skeleton rounded-none text-transparent w-fit'>
                        type description:
                        </p>
                      </div>
                      <div className="bg-slate-100 rounded-md p-3 text-justify text-sm font-normal text-gray-600">
                      </div>
                      <div className="collapse collapse-plus rounded-md skeleton bg-gray-200 text-transparent">
                        <input disabled type="checkbox" name={`accordion-${index}`} />
                        <div className="collapse-title text-sm font-bold">
                          Show Edit Description
                        </div>
                      </div>
                    </div>
                  )
                },
              )
            : dataPropertyDescriptions?.propertyRoomType.map(
                (item: any, index: number) => {
                  return (
                    <div key={index} className="flex flex-col gap-5">
                      <p className="text-sm font-normal text-gray-700 mb-[-15px] sm:flex-row flex-col flex justify-start sm:items-center gap-1">
                        <b className="text-base font-bold">{item?.name}</b>
                        type description:
                      </p>
                      <div className="bg-slate-100 rounded-md p-3 text-justify text-sm font-normal text-gray-600">
                        {item?.description}
                      </div>
                      <div className="collapse collapse-plus bg-white rounded-md border border-slate-300">
                        <input type="checkbox" name={`accordion-${index}`} />
                        <div className="collapse-title text-sm font-bold">
                          Show Edit Description
                        </div>
                        <div className="collapse-content">
                          <TextAreaCustom
                            labelName=""
                            name={`propertyRoomType.${index}.description`}
                            placeholder="Enter a detailed description of your room type – Highlight key features such as bed size, amenities, views, and unique characteristics to attract potential renters."
                          />
                        </div>
                      </div>
                    </div>
                  )
                },
              )}
        </section>
      )}
    </FieldArray>
  )
}

export default RoomTypesDescriptionsInputSection
