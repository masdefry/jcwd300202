'use client'

import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
import { manageRoomAmenitiesValidationSchema } from '@/features/tenant/property/manage/room-amenities/schemas/manageRoomAmenitiesValidationSchema'
import FieldArrayRoomAmenities from '@/features/tenant/property/manage/room-amenities/components/FieldArrayRoomAmenities'
import ButtonUpdate from '@/features/tenant/property/manage/room-amenities/components/ButtonUpdate'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import useManageRoomAmenitiesHook from '../../../../../../features/tenant/property/manage/room-amenities/hooks/useManageRoomAmenitiesHook'
import UpdateConfirmationPopup from '../../../../../../features/tenant/property/manage/room-amenities/components/UpdateConfirmationPopup'
import FormCreateRoomFacility from '@/features/tenant/property/create/components/FormCreateRoomFacility'

const PropertyManageRoomAmenitiesPage = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { name: string }
}) => {
  const {
    setDataCreatePropertyRoomFacility,
    isPendingCreatePropertyRoomFacility,
    setShowCreatePropertyRoomFacilityForm,
    mutateCreatePropertyRoomFacility,
    dataCreatePropertyRoomFacility,
    setUploadFile,
    showCreatePropertyRoomFacilityForm,
    dataGeneralRoomFacilities,
    setDataGeneralRoomFacilities,
    showMoreRoomNotHasFacilities,
    setShowMoreRoomNotHasFacilities,
    showMoreRoomHasFacilities,
    setShowMoreRoomHasFacilities,
    selectRoom,
    setSelectRoom,
    isPendingPropertyHasFacilities,
    setIsPendingPropertyHasFacilities,
    errorStatus,
    setErrorStatus,
    isSubmitting,
    setIsSubmitting,
    fetchPropertyHasFacilities,
    mutateSearchRoomFacility,
    isPendingSearchRoomFacility,
    debounceSearchRoomFacility,
    mutateSearchGeneralRoomFacility,
    isPendingSearchGeneralRoomFacility,
    debounceSearchGeneralRoomFacility,
    mutateRoomFacilityByRoom,
    mutateUpdateRoomHasFacilities,
    isPendingUpdateRoomHasFacilities,
    mutateUpdateGeneralRoomFacilities,
    isPendingUpdateGeneralRoomFacilities,
  } = useManageRoomAmenitiesHook({ params })

  useEffect(() => {
    fetchPropertyHasFacilities()
  }, [])

  if (errorStatus === 403) {
    return <UnauthorizedPage />
  } else if (errorStatus === 404) {
    return <NotFoundMain />
  } else if (errorStatus === 500) {
    return <Custom500 />
  }
  return (
    <main className="flex flex-col gap-7 py-5">
      {isPendingPropertyHasFacilities ? (
        <hgroup className="flex flex-col gap-1 px-5">
          <h1 className="text-lg font-bold skeleton bg-slate-300 rounded-none w-fit text-transparent">
            Room Amenities
          </h1>
          <p className="text-sm font-medium skeleton bg-slate-300 rounded-none w-fit text-transparent">
            Your Room, Your Way: Effortlessly Customize Amenities to Suit Your
            Style!
          </p>
        </hgroup>
      ) : (
        <hgroup className="flex flex-col px-5">
          <h1 className="text-lg font-bold text-gray-800">Room Amenities</h1>
          <p className="text-sm font-medium text-slate-600">
            Your Room, Your Way: Effortlessly Customize Amenities to Suit Your
            Style!
          </p>
        </hgroup>
      )}
      <section className="flex items-center gap-5 px-5">
        <span className="w-fit flex flex-col sm:flex-row gap-1 items-start sm:items-center">
          <label
            htmlFor="select-room"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            Select Room:
          </label>
          <select
            onChange={(e) => {
              setSelectRoom((state) => {
                state = e.target.value
                return state
              })
              if (e.target.value !== 'all-rooms') {
                mutateSearchRoomFacility('')
              } else {
                mutateSearchGeneralRoomFacility('')
              }
            }}
            name="select-room"
            defaultValue="all-rooms"
            id="select-room"
            className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[200px] min-w-max dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all-rooms">All Room Types</option>
            {dataGeneralRoomFacilities?.property?.propertyRoomType?.map(
              (item: any, index: number) => {
                return <option value={item?.id}>{item?.name}</option>
              },
            )}
          </select>
        </span>
      </section>
      <div className="flex flex-col px-5">
        <input
          onChange={(e) => {
            searchParams.name = e.target.value
            if (selectRoom !== 'all-rooms') {
              if (e.target.value.length > 2) {
                debounceSearchRoomFacility(e.target.value)
              } else {
                debounceSearchRoomFacility('')
              }
            } else {
              if (e.target.value.length > 2) {
                debounceSearchGeneralRoomFacility(e.target.value)
              } else {
                debounceSearchGeneralRoomFacility('')
              }
            }
          }}
          type="text"
          placeholder="Search facility ( minimum 3 or more characters )"
          className="px-5 rounded-full py-3 text-sm font-medium font-gray-800 w-full border-2 border-slate-300 bg-white placeholder-shown:text-sm"
        />
      </div>
      <Formik
        initialValues={{
          propertyRoomFacilitiesId:
            dataGeneralRoomFacilities?.propertyRoomFacilitiesId || [],
        }}
        validationSchema={manageRoomAmenitiesValidationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          setIsSubmitting(false)
          if (selectRoom === 'all-rooms') {
            mutateUpdateGeneralRoomFacilities(values)
          } else {
            mutateUpdateRoomHasFacilities(values)
          }
        }}
      >
        {({ values, setFieldValue, isValid }) => {
          if (!isValid) setIsSubmitting(false)
          return (
            <Form className="flex flex-col gap-7">
              <FieldArrayRoomAmenities
              setShowCreatePropertyRoomFacilityForm={setShowCreatePropertyRoomFacilityForm}
                isPending={
                  isPendingUpdateGeneralRoomFacilities ||
                  isPendingPropertyHasFacilities
                }
                dataGeneralRoomFacilities={dataGeneralRoomFacilities}
                selectRoom={selectRoom}
                values={values}
                showMoreRoomHasFacilities={showMoreRoomHasFacilities}
                setShowMoreRoomHasFacilities={setShowMoreRoomHasFacilities}
                setShowMoreRoomNotHasFacilities={
                  setShowMoreRoomNotHasFacilities
                }
                showMoreRoomNotHasFacilities={showMoreRoomNotHasFacilities}
              />
              <ButtonUpdate
                setIsSubmitting={setIsSubmitting}
                isPending={isPendingPropertyHasFacilities}
                disabled={
                  isPendingUpdateGeneralRoomFacilities ||
                  isPendingUpdateRoomHasFacilities
                }
              />
              <UpdateConfirmationPopup
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                isPendingUpdateRoomHasFacilities={
                  isPendingUpdateRoomHasFacilities
                }
              />
            <FormCreateRoomFacility
              setDataCreatePropertyRoomFacility={setDataCreatePropertyRoomFacility}
              isPendingCreatePropertyRoomFacility={
                isPendingCreatePropertyRoomFacility
              }
              setShowCreatePropertyRoomFacilityForm={
                setShowCreatePropertyRoomFacilityForm
              }
              mutateCreatePropertyRoomFacility={mutateCreatePropertyRoomFacility}
              dataCreatePropertyRoomFacility={dataCreatePropertyRoomFacility}
              setUploadFile={setUploadFile}
              showCreatePropertyRoomFacilityForm={showCreatePropertyRoomFacilityForm}
            />
            </Form>
          )
        }}
      </Formik>
    </main>
  )
}

export default PropertyManageRoomAmenitiesPage
