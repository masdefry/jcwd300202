'use client'

import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { FaRegSave } from 'react-icons/fa'
import { manageAddRoomValidationSchema } from '@/features/tenant/property/manage/room-details/add-room/schemas/manageAddRoomValidationSchema'
import useManageAddRoomHook from '@/features/tenant/property/manage/room-details/add-room/hooks/useManageAddRoomHook'
import PropertyRoomFacilityInputSection from '@/features/tenant/property/manage/room-details/add-room/components/PropertyRoomFacilityInputSection'
import PropertyRoomImageInputSection from '@/features/tenant/property/manage/room-details/add-room/components/PropertyRoomImageInputSection'
import PropertyRoomGeneralInfoSection from '@/features/tenant/property/manage/room-details/add-room/components/PropertyRoomGeneralInfoSection'
const ManageAddRoom = ({ params }: { params: { slug: string } }) => {
  const {
    isSubmitting,
    setIsSubmitting,
    mutateCreateRoom,
    isPendingCreateRoom,
    dataRoomFacilities,
    isPendingRoomFacilities,
    showCreatePropertyRoomFacilityForm,
    setShowCreatePropertyRoomFacilityForm,
    dataCreatePropertyRoomFacility,
    setDataCreatePropertyRoomFacility,
    changedCheckbox,
    setChangedCheckbox,
    uploadFile,
    setUploadFile,
    mutateCreatePropertyRoomFacility,
    isPendingCreatePropertyRoomFacility,
  } = useManageAddRoomHook({ params })

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
            setIsSubmitting(true)
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-5">
              <PropertyRoomGeneralInfoSection />
              <section className="flex flex-col gap-5">
                <h1 className="text-sm font-bold text-gray-900">
                  Room Facilities
                </h1>
                <ErrorMessage
                  name="propertyRoomFacilitiesId"
                  component={'div'}
                  className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5 mt-[-12px]"
                />
                <PropertyRoomFacilityInputSection
                  values={values}
                  setUploadFile={setUploadFile}
                  mutateCreatePropertyRoomFacility={
                    mutateCreatePropertyRoomFacility
                  }
                  isPendingCreatePropertyRoomFacility={
                    isPendingCreatePropertyRoomFacility
                  }
                  dataCreatePropertyRoomFacility={
                    dataCreatePropertyRoomFacility
                  }
                  setDataCreatePropertyRoomFacility={
                    setDataCreatePropertyRoomFacility
                  }
                  showCreatePropertyRoomFacilityForm={
                    showCreatePropertyRoomFacilityForm
                  }
                  dataRoomFacilities={dataRoomFacilities}
                  setChangedCheckbox={setChangedCheckbox}
                  setShowCreatePropertyRoomFacilityForm={
                    setShowCreatePropertyRoomFacilityForm
                  }
                />
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
                <PropertyRoomImageInputSection
                  values={values}
                  setUploadFile={setUploadFile}
                />
              </section>
              <button
                type="submit"
                disabled={isPendingCreateRoom || isPendingRoomFacilities}
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
                      type="button"
                      onClick={() => {
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
                      disabled={isPendingCreateRoom}
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
