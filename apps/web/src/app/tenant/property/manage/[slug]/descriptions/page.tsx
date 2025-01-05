'use client'

import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import React, { useState } from 'react'
import { MdTipsAndUpdates } from 'react-icons/md'
import { Formik, Form, FieldArray } from 'formik'
import { BsBuildings } from 'react-icons/bs'
import { RiDoorOpenLine } from 'react-icons/ri'
import { FaRegSave } from 'react-icons/fa'
import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import toast from 'react-hot-toast'

const PropertyManageDescriptionPage = ({ params }: { params: { slug: string } }) => {
  const { data: dataPropertyDescriptions, isPending: isPendingPropertyDescriptions, error, isError} = useQuery({
    queryKey: ['getPropertyDescriptions'],
    queryFn: async() => {
      const res = await instance.get(`/property/${params?.slug}`)
      return res?.data?.data
    },
  })

  const { mutate: mutateUpdatePropertyDescriptions } = useMutation({
    mutationFn: async(values: any) => {
      const res = await instance.patch(`/property/descriptions/${params?.slug}`, {
        propertyDescription: values?.propertyDescription,
        neighborhoodDescription: values?.neighborhoodDescription,
        propertyRoomType: values?.propertyRoomType
      })
      console.log(res)
      return res?.data
    },
    onSuccess: (res) => {
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs text-red-600'>
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    }
  })
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  return (
    <main className='flex flex-col gap-5 p-5'>
      <hgroup className='flex flex-col pb-5 border-b-4 border-slate-700'>
        <h1 className='text-2xl font-bold text-gray-800'>Property Descriptions</h1>
        <p className='text-sm font-medium text-gray-500'>Easily Update Your Property Description – Keep it Fresh, Keep it Yours!</p>
      </hgroup>
      <section className='rounded-md text-sm font-bold shadow-md border border-slate-200 bg-white text-gray-800 flex items-center gap-1.5 px-5 py-3'>
        <div className='h-7 w-7 flex items-center justify-center rounded-full bg-blue-200'><MdTipsAndUpdates className='text-base text-blue-800'/></div>Keep It Accurate, Keep It Attractive – Update Your Property Today!
      </section>
      <Formik
        initialValues={{
          propertyDescription: dataPropertyDescriptions?.property?.propertyDetail?.propertyDescription || '',
          neighborhoodDescription: dataPropertyDescriptions?.property?.propertyDetail?.neighborhoodDescription || '',
          propertyRoomType: dataPropertyDescriptions?.propertyRoomType.map((item: any, index: number) => ({
            id: item?.id,
            description: item?.description
          })
          ) || []
        }}

        enableReinitialize={true}

        onSubmit={(values) => {
          setIsSubmitting(false)
          mutateUpdatePropertyDescriptions(values)
          console.log(values)
        }}
      >
        <Form className='flex flex-col gap-5'>
          <section className='p-5 rounded-md shadow-md border border-slate-200 flex flex-col gap-5'>
            <h1 className='text-lg font-bold text-gray-800 flex items-center gap-1.5'>
            <BsBuildings className='text-xl'/>Property Description
            </h1>
            <p className='text-sm font-light text-gray-700 mb-[-15px]'>This description will be shown to the guest.</p>
            <div className='bg-slate-100 rounded-md p-3 text-justify text-sm font-normal text-gray-600'>
              {dataPropertyDescriptions?.property?.propertyDetail?.propertyDescription}
            </div>
            <TextAreaCustom 
            labelName='New Description'
            name='propertyDescription'
            placeholder='Describe your property – Highlight its best features, location, and amenities to attract potential renters'
            />
          </section>
          <section className='p-5 rounded-md shadow-md border border-slate-200 flex flex-col gap-5'>
            <h1 className='text-lg font-bold text-gray-800 flex items-center gap-1.5'>
            <BsBuildings className='text-xl'/>Neighborhood Description
            </h1>
            <p className='text-sm font-light text-gray-700 mb-[-15px]'>This description will be shown to the guest.</p>
            <div className='bg-slate-100 rounded-md p-3 text-justify text-sm font-normal text-gray-600'>
              {dataPropertyDescriptions?.property?.propertyDetail?.neighborhoodDescription}
            </div>
            <TextAreaCustom 
            labelName='New Description'
            name='neighborhoodDescription'
            placeholder='Describe the neighborhood, including nearby amenities, transport, parks, and attractions.'
            />
          </section>
          <section className='p-5 rounded-md shadow-md border border-slate-200 flex flex-col gap-5'>
            <h1 className='text-lg font-bold text-gray-800 flex items-center gap-1.5'>
            <RiDoorOpenLine className='text-xl'/>Property Room Type Descriptions
            </h1>
          <FieldArray name='propertyRoomType'>
            {
              ({ push, remove }) => (
              <section className='flex flex-col gap-7'>
                {
                  dataPropertyDescriptions?.propertyRoomType.map((item: any, index: number) => {
                    return (
                    <div className='flex flex-col gap-5'>
                      <p className='text-sm font-light text-gray-700 mb-[-15px] flex items-center gap-1'>This description for <b>{item?.name}</b> type:</p>
                      <div className='bg-slate-100 rounded-md p-3 text-justify text-sm font-normal text-gray-600'>
                      {item?.description}
                      </div>
                      <TextAreaCustom 
                      labelName='New Description'
                      name={`propertyRoomType.${index}.description`}
                      placeholder='Enter a detailed description of your room type – Highlight key features such as bed size, amenities, views, and unique characteristics to attract potential renters.'
                      />
                    </div>

                    )
                  })
                }
              </section>
              )
            }
          </FieldArray>
            <button type='button' onClick={() => setIsSubmitting(true)} disabled={false} className='transition duration-100 disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-slate-900 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center'><FaRegSave className='text-base'/>Save Changes</button>
            <div className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}>
              <div className='bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5'>
                 <h1 className='text-lg font-bold text-slate-800 pb-2 border-b border-slate-300'>
                 Are you sure you want to update the property description?
                 </h1>
                 <article className='text-sm font-medium text-gray-500'>
                 Your changes will be saved and immediately reflected on your listing.
                 </article>
                <div className='flex items-center justify-end gap-2'>
              <button type='button' onClick={() => setIsSubmitting(false)} className='px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 '>Cancel</button>
               <button type='submit' disabled={false} className='disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-blue-800 border-slate-100'>Confirm Update</button>
              </div>
            </div>
          </div>  
          </section>
        </Form>
      </Formik>
    </main>
  )
}

export default PropertyManageDescriptionPage
