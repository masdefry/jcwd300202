'use client'

import { Input } from '@/components/ui/input'
import { ErrorMessage } from 'formik'
import Image from 'next/image'
import React from 'react'
import { AiOutlinePicture } from 'react-icons/ai'

const TenantProfilePictureInputSection = ({
  imagePreview,
  dataTenantProfile,
  setFieldValue,
  setImagePreview,
}: {
  imagePreview: any
  dataTenantProfile: any
  setFieldValue: any
  setImagePreview: any
}) => {
  return (
    <section className="flex sm:flex-row flex-col items-center gap-10 rounded-md p-5 border border-slate-300">
      <div className="flex flex-col gap-3 items-center">
        <figure className="overflow-hidden rounded-full h-[150px] w-[150px] bg-blue-300 border-2 border-slate-300">
          <Image
            src={imagePreview || dataTenantProfile?.profilePictureUrl}
            width={500}
            height={500}
            alt=""
            className="w-full h-full object-cover"
          />
        </figure>
        {imagePreview && (
          <p className="bg-slate-200 text-xs font-bold text-slate-600 p-1 rounded-md">
            Preview
          </p>
        )}
      </div>
      <hgroup className="flex flex-col">
        <h1 className="text-base font-bold text-gray-700 flex items-center gap-1.5">
          Picture Profile
          <AiOutlinePicture size={23} />
        </h1>
        <p className="text-sm font-medium text-gray-400">
          This picture will be displayed on your Roomify account
        </p>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <label htmlFor="file" className="text-sm font-bold text-gray-800">
            Change picture
          </label>
          <Input
            id="picture"
            type="file"
            onChange={(e: any) => {
              setFieldValue('file', Array.from(e.currentTarget.files || []))
              if (e.currentTarget.files && e.currentTarget.files[0])
                setImagePreview(URL.createObjectURL(e.target.files[0]))
            }}
            name="file"
            className="hover:cursor-pointer"
          />
          <ErrorMessage
            name="file"
            component={'div'}
            className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
          />
        </div>
      </hgroup>
    </section>
  )
}

export default TenantProfilePictureInputSection
