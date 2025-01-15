'use client'

import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import toast from 'react-hot-toast'
import { IoIosSend } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'

const PropertySettingsPage = ({ params }: { params: { slug: string } }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
    const [ change, setChange ] = useState(true)
    const [ isDeleted, setIsDeleted ] = useState(false)
    const [ dataForDelete, setDataForDelete ] = useState({
      password: '',
      id: '',
      name: ''
    })
  const { data: dataProperty, isPending: isPendingProperty } = useQuery({
    queryKey: ['getProperty'],
    queryFn: async () => {
      const res = await instance.get(`/property/${params?.slug}`)
      return res?.data?.data
    },
  })

  const {
    mutate: mutateDeletePropertyRoomType,
    isPending: isPendingDeletePropertyRoomType,
  } = useMutation({
    mutationFn: async () => {
        const res = await instance.patch(
            `/property/delete/${params?.slug}`,
            {
                password: dataForDelete?.password,
            },
        )
        setDataForDelete({ password: '', id: '', name: '' })
        setIsSubmitting(false)
      return res?.data
    },
    onSuccess: (res) => {
      setIsDeleted(true)
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
          {res?.message}
        </span>
      ))
      setTimeout(() => {
      window.location.href = '/tenant/property/list'
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
  if(isPendingProperty) {
    return (
      <main className="flex flex-col gap-5 2xl:p-5">
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-bold skeleton bg-slate-300 rounded-none w-fit text-transparent'>Property Settings</h1>
          <p className='text-sm font-medium skeleton bg-slate-300 rounded-none w-fit text-transparent'>Manage your Pan Pacific Jakarta property</p>
        </div>
        <section className="flex flex-col gap-4 py-4">
          <div className="bg-white px-5 pb-4 border-b border-slate-300 flex items-center justify-between">
            <hgroup className="flex flex-col gap-1">
              <h1 className="skeleton bg-slate-300 rounded-none w-fit text-transparent text-medium font-bold">
                Delete Property
              </h1>
              <p className="skeleton bg-slate-300 rounded-none w-fit text-transparent text-xs font-semibold">
                Your Property, Your Control – Delete Anytime, No Questions Asked!
              </p>
            </hgroup>
            <button
              disabled={isPendingProperty || isPendingDeletePropertyRoomType}
              className=" flex items-center gap-1.5 text-sm font-bold  rounded-full px-5 py-3 shadow-sm skeleton bg-gray-200 text-transparent"
            >
              
              00 Delete
            </button>
          </div>
        </section>
      </main>
    )

  }
  return (
    <main className="flex flex-col gap-5 2xl:p-5">
      <div className='flex flex-col'>
        <h1 className='text-lg font-bold text-gray-800'>Property Settings</h1>
        <p className='text-sm font-medium text-slate-600'>Manage your {dataProperty?.property?.name} property</p>
      </div>
      <section className="flex flex-col gap-4 py-4">
        <div className="bg-white px-5 pb-4 border-b border-slate-300 flex items-center justify-between">
          <hgroup className="flex flex-col">
            <h1 className="text-gray-800 text-medium font-bold">
              Delete Property
            </h1>
            <p className="text-gray-400 text-xs font-semibold">
              Your Property, Your Control – Delete Anytime, No Questions Asked!
            </p>
          </hgroup>
          <button
            disabled={isPendingProperty || isPendingDeletePropertyRoomType || isDeleted}
            onClick={() => {
              setDataForDelete({ password: '', id: dataProperty?.property?.id, name: dataProperty?.property?.name })
              setIsSubmitting(true)
            }}
            className="disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-white transition duration-100 flex items-center gap-1.5 text-sm font-bold text-white bg-red-600 rounded-full px-5 py-3 shadow-sm hover:opacity-75 active:scale-90"
          >
            <RiDeleteBin6Line size={18} />
            Delete
          </button>
          {isSubmitting && (
            <div className="fixed bg-black bg-opacity-25 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center p-5">
              <div className="bg-white shadow-md p-5 rounded-md flex flex-col gap-7 w-[400px]">
                <div className="flex items-center justify-end">
                  <IoClose
                    className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                    onClick={() => {
                      setDataForDelete({ password: '', id: '', name: '' })
                      setIsSubmitting(false)
                    }}
                  />
                </div>
                <hgroup className="flex flex-col mt-[-10px]">
                  <h1 className="text-lg font-bold text-slate-800">
                  Confirm Property Deletion
                  </h1>
                  <p className="text-sm font-light text-gray-500">
                  Are you sure you want to delete {' '}<b className="text-gray-800 font-bold">
                      {dataForDelete?.name}
                    </b>{' '} property? This action is permanent and cannot be undone.
                  To proceed, please enter your password for confirmation.
                  </p>
                </hgroup>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1 ">
                    <label className="text-sm font-bold text-black">
                      Please confirm by password below:
                    </label>
                    <input
                      id="password"
                      onChange={(e: any) => {
                        setDataForDelete((state: any) => {
                          state.password = e.target.value
                          return state
                        })
                        setChange((state) => !state)
                      }}
                      name="password"
                      type="password"
                      placeholder="secure123"
                      className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:border-blue-800 border-b-2 border-slate-300 rounded-none py-1.5"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setDataForDelete({ password: '', id: '', name: '' })
                      setIsSubmitting(false)
                    }}
                    className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={dataForDelete.password.length < 8  || isPendingDeletePropertyRoomType || isDeleted}
                    onClick={() => mutateDeletePropertyRoomType()}
                    className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
                  >
                    Delete Room
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default PropertySettingsPage
