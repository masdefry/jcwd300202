'use client'

import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import React from 'react'
import { BsBuildings } from 'react-icons/bs'
import { IUseManageDescriptionsHook } from '../types'

const PropertyDescriptionInputSection = ({
  dataPropertyDescriptions,
  isPendingPropertyDescriptions,
}: Pick<IUseManageDescriptionsHook, 'isPendingPropertyDescriptions'> & {
  dataPropertyDescriptions: any
}) => {
  return (
    <section className="p-5 rounded-md shadow-md border border-slate-200 flex flex-col gap-5">
      <h1 className="text-lg font-bold text-gray-800 flex items-center gap-1.5">
        <BsBuildings className="text-xl" />
        Property Description
      </h1>
      <p className="text-sm font-light text-gray-700 mb-[-15px]">
        This description will be shown to the guest.
      </p>
      <div className="bg-slate-100 rounded-md p-3 text-justify text-sm font-normal text-gray-600">
        {
          dataPropertyDescriptions?.property?.propertyDetail
            ?.propertyDescription
        }
      </div>
      {
        isPendingPropertyDescriptions ? (
        <div className="collapse collapse-plus rounded-md skeleton bg-gray-200 text-transparent">
          <input type="checkbox" disabled name={`accordion-property-description`} />
          <div className="collapse-title text-sm font-bold">
            Show Edit Description
          </div>
        </div>
        ) : (
        <div className="collapse collapse-plus bg-white rounded-md border border-slate-300">
          <input type="checkbox" name={`accordion-property-description`} />
          <div className="collapse-title text-sm font-bold">
            Show Edit Description
          </div>
          <div className="collapse-content">
            <TextAreaCustom
              labelName="Edit Description"
              name="propertyDescription"
              placeholder="Describe your property – Highlight its best features, location, and amenities to attract potential renters"
            />
          </div>
        </div>
        )
      }
    </section>
  )
}

export default PropertyDescriptionInputSection
