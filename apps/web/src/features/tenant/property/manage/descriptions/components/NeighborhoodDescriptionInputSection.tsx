'use client'

import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import React from 'react'
import { BsBuildings } from 'react-icons/bs'
const NeighborhoodDescriptionInputSection = ({ dataPropertyDescriptions }: {dataPropertyDescriptions: any}) => {
  return (
    <section className="p-5 rounded-md shadow-md border border-slate-200 flex flex-col gap-5">
      <h1 className="text-lg font-bold text-gray-800 flex items-center gap-1.5">
        <BsBuildings className="text-xl" />
        Neighborhood Description
      </h1>
      <p className="text-sm font-light text-gray-700 mb-[-15px]">
        This description will be shown to the guest.
      </p>
      <div className="bg-slate-100 rounded-md p-3 text-justify text-sm font-normal text-gray-600">
        {
          dataPropertyDescriptions?.property?.propertyDetail
            ?.neighborhoodDescription
        }
      </div>
      <div className="collapse collapse-plus bg-white rounded-md border border-slate-300">
        <input type="checkbox" name={`accordion-neighborhood-description`} />
        <div className="collapse-title text-sm font-bold">
          Show Edit Description
        </div>
        <div className="collapse-content">
          <TextAreaCustom
            labelName="Edit Description"
            name="neighborhoodDescription"
            placeholder="Describe the neighborhood, including nearby amenities, transport, parks, and attractions."
          />
        </div>
      </div>
    </section>
  )
}

export default NeighborhoodDescriptionInputSection
