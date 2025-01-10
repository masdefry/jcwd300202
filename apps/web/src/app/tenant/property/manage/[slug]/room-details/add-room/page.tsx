'use client'

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import TextInput from '@/features/tenant/property/create/components/TextInput'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Checkbox } from 'rsuite'
import instance from '@/utils/axiosInstance'
import Image from 'next/image'
import { FaPlus, FaRegTrashCan } from 'react-icons/fa6'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'
import { FaRegSave } from 'react-icons/fa'
import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import { manageAddRoomValidationSchema } from '@/features/tenant/property/manage/room-details/add-room/schemas/manageAddRoomValidationSchema'
const ManageAddRoom = ({ params }: { params: { slug: string } }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate: mutateCreateRoom, isPending: isPendingCreateRoom } =
    useMutation({
      mutationFn: async (fd: FormData) => {
        const res = await instance.post(
          `/room-type/property/${params?.slug}`,
          fd,
        )
        console.log(res)
        return res?.data
      },
      onSuccess: (res) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })
  const { data: dataRoomFacilities, isPending: isPendingRoomFacilities } =
    useQuery({
      queryKey: ['getPropertyRoomFacilities'],
      queryFn: async () => {
        const res = await instance.get('/room-facility')
        return res?.data?.data
      },
    })
  const [
    showCreatePropertyRoomFacilityForm,
    setShowCreatePropertyRoomFacilityForm,
  ] = useState(false)
  const [dataCreatePropertyRoomFacility, setDataCreatePropertyRoomFacility] =
    useState({
      name: '',
      file: [] as File[],
    })
  const [changedCheckbox, setChangedCheckbox] = useState(false)
  const [uploadFile, setUploadFile] = useState(false)

  const {
    mutate: mutateCreatePropertyRoomFacility,
    isPending: isPendingCreatePropertyRoomFacility,
  } = useMutation({
    mutationFn: async () => {
      const fd = new FormData()
      fd.append('name', dataCreatePropertyRoomFacility?.name)
      fd.append('images', dataCreatePropertyRoomFacility?.file[0])
      const res = await instance.post('/room-facility', fd)

      return res?.data
    },
    onSuccess: (res) => {
      setShowCreatePropertyRoomFacilityForm(false)
      setDataCreatePropertyRoomFacility({
        name: '',
        file: [],
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })
  return (
    <main className="py-5">
      <section className="flex flex-col gap-7 px-5">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-gray-800">Add Room</h1>
          <p className="text-sm font-medium text-slate-600">
            Empower Your Space: Tenants Can Now Add New Rooms!
          </p>
        </div>
        <Formik
          initialValues={{
            name: '',
            capacity: '',
            description: '',
            totalRooms: '',
            price: '',
            rooms: '',
            bathrooms: '',
            propertyRoomFacilitiesId: [],
            file: [] as File[],
          }}
          validationSchema={manageAddRoomValidationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log('aaaaaa')
            const fd = new FormData()
            fd.append('description', values?.description)
            fd.append('name', values?.name)
            fd.append('price', values?.price)
            fd.append('capacity', values?.capacity.toString())
            fd.append('totalRooms', values?.totalRooms.toString())
            fd.append('rooms', values?.rooms.toString())
            fd.append('bathrooms', values?.bathrooms.toString())
            fd.append(
              'propertyRoomFacilitiesId',
              JSON.stringify(values?.propertyRoomFacilitiesId),
            )
            values?.file.forEach((item) => {
              fd.append('images', item)
            })

            mutateCreateRoom(fd)
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-5">
              <TextInput
                labelName="Room Name"
                name="name"
                type="text"
                placeholder="Enter Your Room Name (e.g., Cozy Bedroom, Executive Suite)"
              />
              <TextInput
                labelName="Room Price"
                name="price"
                type="number"
                placeholder="Enter Room Price (e.g., Rp500000)"
              />
              <TextInput
                labelName="Guest Capacity"
                name="capacity"
                type="number"
                placeholder="Enter Guest Capacity (e.g., 2, 4, 6 people)"
              />
              <TextInput
                labelName="Total rooms in the property"
                name="totalRooms"
                type="number"
                placeholder="Enter Total Rooms in Property (e.g., 5, 10, 20 rooms)"
              />
              <TextInput
                labelName="Rooms in room unit"
                name="rooms"
                type="number"
                placeholder="Enter Number of Rooms in Unit (e.g., 1, 2, 3 rooms)"
              />
              <TextInput
                labelName="Bathrooms"
                name="bathrooms"
                type="number"
                placeholder="Enter Number of Bathrooms in Unit (e.g., 1, 2, 3 bathrooms)"
              />
              <TextAreaCustom
                labelName="Room Description"
                name="description"
                placeholder="Enter Room Description (e.g., Spacious, bright room with a king-size bed and ocean view)"
              />
              <section className="flex flex-col gap-5">
                <h1 className="text-sm font-bold text-gray-900">
                  Room Facilities
                </h1>
                <ErrorMessage
                  name="propertyRoomFacilitiesId"
                  component={'div'}
                  className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5 mt-[-12px]"
                />
                <FieldArray name="propertyRoomFacilitiesId">
                  {({ push: pushRoomFacility, remove: removeRoomFacility }) => (
                    <section className="flex flex-col gap-10 w-full">
                      <section className="grid grid-cols-3 w-full gap-6">
                        {dataRoomFacilities?.map(
                          (roomFacility: any, indexRoomFacility: number) => {
                            return (
                              <div
                                key={indexRoomFacility}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    values.propertyRoomFacilitiesId.findIndex(
                                      (value: any) =>
                                        value === roomFacility?.id,
                                    ) > -1
                                  }
                                  id={roomFacility?.id}
                                  value={roomFacility?.id}
                                  name={`propertyRoomFacilitiesId.${indexRoomFacility}`}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      pushRoomFacility(roomFacility?.id)
                                    } else {
                                      const findIdx =
                                        values.propertyRoomFacilitiesId.findIndex(
                                          (value: any) =>
                                            value === roomFacility?.id,
                                        )
                                      removeRoomFacility(findIdx)
                                      setChangedCheckbox(
                                        (state: boolean) => !state,
                                      )
                                    }
                                  }}
                                  className="checkbox checkbox-lg scale-50 border border-slate-600"
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
                        onClick={() =>
                          setShowCreatePropertyRoomFacilityForm(true)
                        }
                        className="px-3 flex items-center gap-1.5 py-1.5 bg-slate-800 text-xs font-bold w-fit text-white rounded-md shadow-md hover:opacity-70 hover:cursor-pointer active:scale-90 transition duration-100 mt-[-15px]"
                      >
                        <FaPlus className="text-sm" />
                        Add Room Facility
                      </div>
                      <section>
                        {showCreatePropertyRoomFacilityForm && (
                          <div className="fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center">
                            <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-7">
                              <div className="flex items-center justify-end">
                                <IoClose
                                  className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                                  onClick={() => {
                                    setShowCreatePropertyRoomFacilityForm(false)
                                    setDataCreatePropertyRoomFacility({
                                      name: '',
                                      file: [] as File[],
                                    })
                                  }}
                                />
                              </div>
                              <hgroup className="flex flex-col mt-[-10px]">
                                <h1 className="text-lg font-bold text-slate-800">
                                  Add Room Facility
                                </h1>
                                <p className="text-sm font-light text-gray-500">
                                  Customize Your Space: Add New Room Facilities
                                  to Fit Your Needs!
                                </p>
                              </hgroup>
                              <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1 ">
                                  <label className="text-sm font-bold text-black ml-5">
                                    Name
                                  </label>
                                  <Field
                                    id="propertyRoomFacilityName"
                                    onChange={(e: any) => {
                                      setDataCreatePropertyRoomFacility(
                                        (state: any) => {
                                          state.name = e.target.value
                                          return state
                                        },
                                      )
                                    }}
                                    name="createPropertyRoomFacilityName"
                                    type="text"
                                    placeholder="Bathub"
                                    className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                                  />
                                  <ErrorMessage
                                    name="propertyRoomFacilityName"
                                    component={'div'}
                                    className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                                  />
                                </div>
                                <label className="flex items-center gap-3 text-sm font-bold text-slate-900 justify-start w-full h-full cursor-pointer ">
                                  <p className="mb-1 ml-5">Icon</p>
                                  <div className="flex items-center justify-between gap-3 w-full rounded-md shadow-md border border-slate-200 bg-white p-2 px-3">
                                    {dataCreatePropertyRoomFacility?.file[0]
                                      ?.name ? (
                                      <figure className="relative rounded-md overflow-hidden h-12 w-12 border-2 border-slate-600 border-dotted">
                                        <Image
                                          src={URL.createObjectURL(
                                            dataCreatePropertyRoomFacility
                                              ?.file[0],
                                          )}
                                          width={100}
                                          height={100}
                                          alt=""
                                          className="object-cover w-full h-full"
                                        />
                                      </figure>
                                    ) : (
                                      <div className="flex flex-col border-2 border-dotted border-slate-600 items-center justify-center h-12 w-12 text-slate-400 bg-slate-300 rounded-md hover:bg-slate-400 transition duration-75">
                                        <FaPlus size={24} />
                                      </div>
                                    )}
                                    <input
                                      type="file"
                                      className="file-input file-input-bordered file-input-xs w-full max-w-xs"
                                      name="createPropertyRoomFacilityIcon"
                                      onChange={(e: any) => {
                                        if (e.target.files[0]) {
                                          setDataCreatePropertyRoomFacility(
                                            (state) => {
                                              state.file[0] = e.target.files[0]
                                              return state
                                            },
                                          )
                                        }
                                        setUploadFile(
                                          (state: boolean) => !state,
                                        )
                                      }}
                                    />
                                  </div>
                                </label>
                              </div>
                              <div className="flex items-center gap-2 justify-end">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowCreatePropertyRoomFacilityForm(false)
                                    setDataCreatePropertyRoomFacility({
                                      name: '',
                                      file: [] as File[],
                                    })
                                  }}
                                  className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  disabled={isPendingCreatePropertyRoomFacility}
                                  onClick={() =>
                                    mutateCreatePropertyRoomFacility()
                                  }
                                  className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
                                >
                                  Create
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </section>
                    </section>
                  )}
                </FieldArray>
              </section>
              <section className="flex flex-col gap-5">
              <h1 className="text-sm font-bold text-gray-900">
                  Room Type Photos
                </h1>
                <ErrorMessage
                  name="file"
                  component={'div'}
                  className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5 mt-[-12px]"
                />
              <FieldArray name="file">
                {({
                  insert: insertFile,
                  remove: removeFile,
                  push: pushFile,
                }) => (
                  <section className="flex flex-col gap-5 mb-8 mt-3">
                    <div className="flex items-center justify-center w-full h-[150px] lg:h-[420px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg">
                      {Boolean(values.file[0]?.['name']) ? (
                        <figure className="w-full h-full relative">
                          <Image
                            src={URL.createObjectURL(values?.file[0])}
                            width={1000}
                            height={1000}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                          <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                            <FaRegTrashCan
                              onClick={() => {
                                removeFile(0)
                                setUploadFile((state: boolean) => !state)
                              }}
                            />
                          </div>
                        </figure>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full  cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <IoCloudUploadOutline size={28} />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              JPG, PNG or JPEG (MAX. 2MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            name={`file[0]`}
                            onChange={(e: any) => {
                              if (e.currentTarget.files[0]) {
                                insertFile(0, e.currentTarget.files[0])
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                    <section className="grid grid-cols-4 gap-5">
                      {Array.from({ length: 4 }).map((_, imageIdx: number) => {
                        return (
                          <div
                            key={imageIdx}
                            className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg"
                          >
                            {Boolean(values?.file[imageIdx + 1]?.['name']) ? (
                              <figure className="w-full h-full relative">
                                <Image
                                  src={URL.createObjectURL(
                                    values.file[imageIdx + 1],
                                  )}
                                  width={1000}
                                  height={1000}
                                  alt=""
                                  className="object-cover w-full h-full"
                                />
                                <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                                  <FaRegTrashCan
                                    onClick={() => {
                                      removeFile(0)
                                      setUploadFile((state: boolean) => !state)
                                    }}
                                  />
                                </div>
                              </figure>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <IoCloudUploadOutline size={28} />
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{' '}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    JPG, PNG or JPEG (MAX. 2MB)
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  name={`file[${imageIdx + 1}]`}
                                  onChange={(e: any) => {
                                    if (e.currentTarget.files[0]) {
                                      insertFile(
                                        imageIdx + 1,
                                        e.currentTarget.files[0],
                                      )
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </div>
                        )
                      })}
                    </section>
                  </section>
                )}
              </FieldArray>
              </section>
              <button
                type="button"
                onClick={() => setIsSubmitting(true)}
                disabled={false}
                className="transition duration-100 disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-slate-900 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center"
              >
                <FaRegSave className="text-base" />
                Save Changes
              </button>
              <div
                className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}
              >
                <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
                  <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
                    Confirm Room Addition
                  </h1>
                  <article className="text-sm font-medium text-gray-500">
                    Once added, this room will be available for your property.
                    Do you wish to proceed?
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
                      type="submit"
                      disabled={false}
                      className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-blue-800 border-slate-100"
                    >
                      Confirm Update
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default ManageAddRoom
