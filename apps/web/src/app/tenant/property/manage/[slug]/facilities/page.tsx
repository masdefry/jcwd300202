'use client'

import React, { useEffect } from 'react'
import { BsBuildingCheck, BsBuildingExclamation } from 'react-icons/bs'
import { Formik, Form, FieldArray } from 'formik'
import { FiSend } from 'react-icons/fi'
import { managePropertyFacilitiesValidationSchema } from '@/features/tenant/property/manage/facilities/schemas/managePropertyFacilitiesValidationSchema'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import useManagePropertyFacilitiesHook from '@/features/tenant/property/manage/facilities/api/useManagePropertyFacilitiesHook'
import PropertyHasFacilitySection from '@/features/tenant/property/manage/facilities/components/PropertyHasFacilitySection'
import PropertyHasNotFacilitySection from '@/features/tenant/property/manage/facilities/components/PropertyHasNotFacilitySection'
import UpdateConfirmationPopup from '@/features/tenant/property/manage/facilities/components/UpdateConfirmationPopup'
import FormCreatePropertyFacility from '@/features/tenant/property/create/components/FormCreatePropertyFacility'

const PropertyManageFacilitiesPage = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { name: string }
}) => {
  const {
    setDataCreatePropertyFacility,
    isPendingCreatePropertyFacility,
    setShowCreatePropertyFacilityForm,
    mutateCreatePropertyFacility,
    dataCreatePropertyFacility,
    setUploadFile,
    showCreatePropertyFacilityForm,
    isLoadingFetch,
    dataPropertyHasFacilities,
    showMorePropertyNotHasFacility,
    setShowMorePropertyNotHasFacility,
    showMorePropertyHasFacility,
    setShowMorePropertyHasFacility,
    fetchPropertyHasFacilities,
    errorStatus,
    isSubmitting,
    setIsSubmitting,
    debounceSearchPropertyFacility,
    isPendingSearchPropertyFacility,
    mutateUpdatePropertyHasFacilities,
    isPendingUpdatePropertyHasFacilities,
  } = useManagePropertyFacilitiesHook({ params })

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
      <hgroup className="flex flex-col px-5">
        <h1 className="text-lg font-bold text-gray-800">
          Facilities & Services
        </h1>
        <p className="text-sm font-medium text-slate-600">
          Update Your Space: Let Us Know What You Need
        </p>
      </hgroup>
      <div className="flex flex-col px-5">
        <input
          disabled={isPendingUpdatePropertyHasFacilities || isLoadingFetch}
          onChange={(e) => {
            searchParams.name = e.target.value
            if (e.target.value.length > 2) {
              debounceSearchPropertyFacility(e.target.value)
            } else {
              debounceSearchPropertyFacility('')
            }
          }}
          type="text"
          placeholder="Search facility ( minimum 3 or more characters )"
          className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:cursor-not-allowed px-5 rounded-full py-3 text-sm font-medium font-gray-800 w-full border-2 border-slate-300 bg-white placeholder-shown:text-sm"
        />
      </div>
      <Formik
        initialValues={{
          propertyFacilitiesId:
            dataPropertyHasFacilities?.propertyFacilitiesId || [],
        }}
        validationSchema={managePropertyFacilitiesValidationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          mutateUpdatePropertyHasFacilities(values)
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-7">
            <FieldArray name="propertyFacilitiesId">
              {({ push, remove }) => (
                <div className="flex flex-col gap-7">
                  <section className="px-5 flex flex-col gap-5">
                    {isPendingSearchPropertyFacility || isLoadingFetch ? (
                      <h1 className="skeleton bg-slate-300 w-fit text-transparent rounded-none">
                        loading loadingame Does Have
                      </h1>
                    ) : (
                      <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                        <BsBuildingCheck className="text-lg" />
                        {dataPropertyHasFacilities?.property?.name} Does Have
                      </h1>
                    )}
                    <PropertyHasFacilitySection
                      isPending={
                        isPendingSearchPropertyFacility || isLoadingFetch
                      }
                      showMorePropertyHasFacility={showMorePropertyHasFacility}
                      dataPropertyHasFacilities={dataPropertyHasFacilities}
                      values={values}
                      push={push}
                      remove={remove}
                      setShowMorePropertyHasFacility={
                        setShowMorePropertyHasFacility
                      }
                      setShowCreatePropertyFacilityForm={setShowCreatePropertyFacilityForm}
                    />
                  </section>
                  <section className="px-5 flex flex-col gap-5">
                    {isPendingSearchPropertyFacility || isLoadingFetch ? (
                      <h1 className="skeleton bg-slate-300 w-fit text-transparent rounded-none">
                        loading loadingame Does Have
                      </h1>
                    ) : (
                      <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                        <BsBuildingExclamation className="text-lg" />
                        {dataPropertyHasFacilities?.property?.name} Does Not
                        Have
                      </h1>
                    )}
                    <PropertyHasNotFacilitySection
                    setShowCreatePropertyFacilityForm={setShowCreatePropertyFacilityForm}
                      isPending={
                        isPendingSearchPropertyFacility || isLoadingFetch
                      }
                      showMorePropertyNotHasFacility={
                        showMorePropertyNotHasFacility
                      }
                      dataPropertyHasFacilities={dataPropertyHasFacilities}
                      values={values}
                      push={push}
                      remove={remove}
                      setShowMorePropertyNotHasFacility={
                        setShowMorePropertyNotHasFacility
                      }
                    />
                  </section>
                </div>
              )}
            </FieldArray>
            <section className="px-5">
              <button
                type="button"
                disabled={
                  isPendingUpdatePropertyHasFacilities || isLoadingFetch
                }
                onClick={() => setIsSubmitting(true)}
                className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:cursor-not-allowed bg-blue-800 text-sm rounded-full w-full px-5 py-3 flex gap-1.5 items-center justify-center font-bold text-white hover:opacity-75 transition duration-100 active:scale-95"
              >
                <FiSend className="text-base" />
                Update
              </button>
            </section>
            <UpdateConfirmationPopup
              setIsSubmitting={setIsSubmitting}
              isSubmitting={isSubmitting}
              isPendingUpdatePropertyHasFacilities={
                isPendingUpdatePropertyHasFacilities
              }
            />
            <FormCreatePropertyFacility
              setDataCreatePropertyFacility={setDataCreatePropertyFacility}
              isPendingCreatePropertyFacility={isPendingCreatePropertyFacility}
              setShowCreatePropertyFacilityForm={setShowCreatePropertyFacilityForm}
              mutateCreatePropertyFacility={mutateCreatePropertyFacility}
              dataCreatePropertyFacility={dataCreatePropertyFacility}
              setUploadFile={setUploadFile}
              showCreatePropertyFacilityForm={showCreatePropertyFacilityForm}
              />
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default PropertyManageFacilitiesPage