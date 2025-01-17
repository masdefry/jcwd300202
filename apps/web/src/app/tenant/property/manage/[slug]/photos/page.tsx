'use client'

import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'
import {
  MdOutlineAddPhotoAlternate,
  MdOutlineDeleteOutline,
} from 'react-icons/md'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FaRegTrashCan } from 'react-icons/fa6'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import { managePropertyPhotosValidationSchema } from '@/features/tenant/property/manage/photos/schemas/managePropertyPhotosValidationSchema'

const PropertyManagePhotosPage = ({ params }: { params: { slug: string } }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPhoto, setShowPhoto] = useState({
    id: 0,
    directory: '',
    filename: '',
    fileExtension: '',
  })
  const [showAddPhoto, setShowAddPhoto] = useState(false)
  const { data: dataPropertyImages, isError, error } = useQuery({
    queryKey: ['getPropertyImages'],
    queryFn: async () => {
      const res = await instance.get(`/property-images/${params?.slug}`)
      return res?.data?.data
    },
  })

  const {
    mutate: mutateDeletePropertyImage,
    isPending: isPendingDeletePropertyImage,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.delete(`/property-images/${showPhoto?.id}`)

      return res?.data
    },
    onSuccess: (res) => {
      setIsSubmitting(false)
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const {
    mutate: mutateCreatePropertyImage,
    isPending: isPendingCreatePropertyImage,
  } = useMutation({
    mutationFn: async (fd: FormData) => {
      const res = await instance.post(`/property-images/${params?.slug}`, fd)
      console.log(res)
      return res?.data
    },
    onSuccess: (res) => {
      setShowAddPhoto(false)
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  if(isError) {
    let getError: any = error
    if (getError.status === 403) {
      return <UnauthorizedPage />
    } else if (getError.status === 404) {
      return <NotFoundMain />
    } else if (getError.status === 500) {
      return <Custom500 />
    } else {
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs text-red-600'>
          {getError?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    }
  }

  return (
    <main className="flex flex-col gap-7 py-5">
      <hgroup className="flex flex-col px-5">
        <h1 className="text-lg font-bold text-gray-800">Property Photos</h1>
        <p className="text-sm font-medium text-slate-600">
          Bring Your Property to Life – Upload New Photos Anytime!
        </p>
      </hgroup>
      <div className="w-full flex justify-end px-5">
        <button
          type="button"
          onClick={() => setShowAddPhoto(true)}
          disabled={
            Array.isArray(dataPropertyImages) && dataPropertyImages.length >= 7
          }
          className="disabled:bg-slate-300 disabled:text-white disabled:border-none disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm px-4 py-2 rounded-md text-gray-800 font-bold border-2 border-gray-800 bg-white hover:bg-gray-800 hover:text-white transition duration-100 active:scale-90"
        >
          <MdOutlineAddPhotoAlternate />
          Add Photo
        </button>
      </div>
      <section className="gap-3 grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 px-5">
        {dataPropertyImages?.map((item: any, index: number) => {
          return (
            <figure
              onClick={() =>
                setShowPhoto({
                  id: item?.id,
                  directory: item?.directory,
                  filename: item?.filename,
                  fileExtension: item?.fileExtension,
                })
              }
              className="p-1 rounded-md h-[200px] bg-slate-200 shadow-md pb-3 overflow-hidden hover:scale-105 transition duration-100 hover:cursor-pointer"
            >
              <Image
                src={`http://localhost:5000/api/${item?.directory}/${item?.filename}.${item?.fileExtension}`}
                alt=""
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-sm"
              />
            </figure>
          )
        })}
      </section>
      {showPhoto?.directory && (
        <section className="p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col gap-1 items-center justify-center">
          <div className="w-[400px] flex justify-end">
            <div
              onClick={() =>
                setShowPhoto({
                  id: 0,
                  directory: '',
                  filename: '',
                  fileExtension: '',
                })
              }
              className="bg-white rounded-full flex items-center text-lg text-gray-800 justify-center h-7 w-7 hover:bg-slate-100 hover:cursor-pointer transition duration-100 active:scale-90"
            >
              <IoClose />
            </div>
          </div>
          <div className="bg-white rounded-md flex flex-col gap-3 shadow-md p-1 pb-2">
            <figure className="w-[400px] rounded-md h-[300px] bg-blue-200 shadow-md overflow-hidden">
              <Image
                src={`http://localhost:5000/api/${showPhoto?.directory}/${showPhoto?.filename}.${showPhoto?.fileExtension}`}
                alt=""
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-sm"
              />
            </figure>
            <div className="w-full flex justify-center items-center">
              <div
                onClick={() => setIsSubmitting(true)}
                className="flex items-center justify-center rounded-full h-10 w-10 text-gray-800 text-lg bg-slate-300 border-2 border-slate-400 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100"
              >
                <MdOutlineDeleteOutline />
              </div>
              <div
                className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}
              >
                <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
                  <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
                    Are you sure you want to delete this image?
                  </h1>
                  <article className="text-sm font-medium text-gray-500">
                    This action is permanent and cannot be undone.
                  </article>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSubmitting(false)}
                      className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        mutateDeletePropertyImage()
                      }}
                      disabled={isPendingDeletePropertyImage}
                      className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-red-700 border-slate-100"
                    >
                      Delete Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className={` p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${showAddPhoto ? 'flex' : 'hidden'} flex-col gap-1 items-center justify-center`}>
        <Formik
        initialValues={{
          file: [] as File[]
        }}
        validationSchema={managePropertyPhotosValidationSchema}
        onSubmit={(values) => {
          const fd = new FormData()
          fd.append('images', values?.file[0])
          mutateCreatePropertyImage(fd)
        }}
        >
          {
            ({ setFieldValue, values }) => (
          <Form className=' flex flex-col gap-1 items-center justify-center w-full'>
            <div className="w-[400px] flex justify-end">
              <div
                onClick={() => {
                  setFieldValue('file[0]', null)
                  setShowAddPhoto(false)
                }}
                className="bg-white rounded-full flex items-center text-lg text-gray-800 justify-center h-7 w-7 hover:bg-slate-100 hover:cursor-pointer transition duration-100 active:scale-90"
              >
                <IoClose />
              </div>
            </div>
            <div className="bg-white  flex flex-col gap-3 shadow-md p-1 pb-2 w-[400px] rounded-md h-[300px]">
              {values?.file[0]?.name ? (
                <figure className="w-full h-full relative overflow-hidden">
                  <Image
                    src={URL.createObjectURL(values?.file[0])}
                    width={1000}
                    height={1000}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                  <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                    <FaRegTrashCan
                      onClick={() => setFieldValue('file[0]', null)}
                    />
                  </div>
                </figure>
              ) : (
                <label className="border-2 border-gray-300 border-dashed flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IoCloudUploadOutline size={24} />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      JPG, PNG or JPEG (MAX. 1MB)
                    </p>
                  </div>
                  <input
                    type='file'
                    className="hidden"
                    name='file'
                    onChange={(e: any) => {
                      if (e.currentTarget.files[0]) {
                        setFieldValue( "file[0]", e.currentTarget.files[0] )
                      }
                    }}
                  />
                </label>
              )}
              <ErrorMessage name="file" component={'div'} className='text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5'/>
              <div className='flex items-center justify-between w-full gap-1.5'>
                <button onClick={() => {
                  setShowAddPhoto(false)
                  setFieldValue('file[0]', null)
                  }} 
                  type='button' className='text-sm font-bold rounded-md p-2 w-full shadow-md text-gray-800 bg-white border border-slate-100 hover:opacity-75 active:scale-95 transition duration-100'>Cancel</button>
                <button disabled={!values?.file[0]?.name} type='submit' className='disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-sm font-bold rounded-md p-2 w-full shadow-md text-white bg-gray-800 hover:opacity-75 active:scale-95 transition duration-100'>Add image</button>
              </div>
            </div>
          </Form>
            )
          }
        </Formik>
      </section>
    </main>
  )
}

export default PropertyManagePhotosPage
