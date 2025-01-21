'use client'

import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
import { manageRoomAmenitiesValidationSchema } from '@/features/tenant/property/manage/room-amenities/schemas/manageRoomAmenitiesValidationSchema'
import FieldArrayRoomAmenities from '@/features/tenant/property/manage/room-amenities/components/FieldArrayRoomAmenities'
import ButtonUpdate from '@/features/tenant/property/manage/room-amenities/components/ButtonUpdate'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import useManageRoomAmenitiesHook from '@/features/tenant/property/manage/room-amenities/hooks/useManageRoomAmenitiesHook'
import UpdateConfirmationPopup from '@/features/tenant/property/manage/room-amenities/components/UpdateConfirmationPopup'
import FormCreateRoomFacility from '@/features/tenant/property/create/components/FormCreateRoomFacility'
import SearchInputRoomFacility from '@/features/tenant/property/manage/room-amenities/components/SearchInputRoomFacility'
import SelectRoomForRoomAmenities from '@/features/tenant/property/manage/room-amenities/components/SelectRoomForRoomAmenities'

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
      <SelectRoomForRoomAmenities
        setSelectRoom={setSelectRoom}
        mutateSearchRoomFacility={mutateSearchRoomFacility}
        mutateSearchGeneralRoomFacility={mutateSearchGeneralRoomFacility}
        dataGeneralRoomFacilities={dataGeneralRoomFacilities}
      />
      <SearchInputRoomFacility
        searchParams={searchParams}
        debounceSearchRoomFacility={debounceSearchRoomFacility}
        debounceSearchGeneralRoomFacility={debounceSearchGeneralRoomFacility}
        selectRoom={selectRoom}
      />
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
                setShowCreatePropertyRoomFacilityForm={
                  setShowCreatePropertyRoomFacilityForm
                }
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
                setDataCreatePropertyRoomFacility={
                  setDataCreatePropertyRoomFacility
                }
                isPendingCreatePropertyRoomFacility={
                  isPendingCreatePropertyRoomFacility
                }
                setShowCreatePropertyRoomFacilityForm={
                  setShowCreatePropertyRoomFacilityForm
                }
                mutateCreatePropertyRoomFacility={
                  mutateCreatePropertyRoomFacility
                }
                dataCreatePropertyRoomFacility={dataCreatePropertyRoomFacility}
                setUploadFile={setUploadFile}
                showCreatePropertyRoomFacilityForm={
                  showCreatePropertyRoomFacilityForm
                }
              />
            </Form>
          )
        }}
      </Formik>
    </main>
  )
}

export default PropertyManageRoomAmenitiesPage
