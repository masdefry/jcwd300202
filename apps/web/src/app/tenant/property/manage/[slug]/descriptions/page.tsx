'use client'

import React from 'react'
import { MdTipsAndUpdates } from 'react-icons/md'
import { Formik, Form, FieldArray } from 'formik'
import { RiDoorOpenLine } from 'react-icons/ri'
import { FaRegSave } from 'react-icons/fa'
import toast from 'react-hot-toast'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import { manageDescriptionValidationSchema } from '@/features/tenant/property/manage/descriptions/manageDescriptionValidationSchema'
import useManageDescriptionsHook from '@/features/tenant/property/manage/descriptions/hooks/useManageDescriptionsHook'
import PropertyDescriptionInputSection from '@/features/tenant/property/manage/descriptions/components/PropertyDescriptionInputSection'
import NeighborhoodDescriptionInputSection from '@/features/tenant/property/manage/descriptions/components/NeighborhoodDescriptionInputSection'
import UpdateDescriptionsConfirmationPopup from '@/features/tenant/property/manage/descriptions/components/UpdateDescriptionsConfirmationPopup'
import RoomTypesDescriptionsInputSection from '@/features/tenant/property/manage/descriptions/components/RoomTypesDescriptionsInputSection'

const PropertyManageDescriptionPage = ({
  params,
}: {
  params: { slug: string }
}) => {
  const {
    dataPropertyDescriptions,
    isPendingPropertyDescriptions,
    error,
    isError,
    mutateUpdatePropertyDescriptions,
    isPendingUpdatePropertyDescriptions,
    isSubmitting,
    setIsSubmitting,
  } = useManageDescriptionsHook({ params })

  if (isError) {
    let getError: any = error
    if (getError.status === 403) {
      return <UnauthorizedPage />
    } else if (getError.status === 404) {
      return <NotFoundMain />
    } else if (getError.status === 500) {
      return <Custom500 />
    } else {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {getError?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    }
  }
  return (
    <main className="flex flex-col gap-5 2xl:p-5">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-gray-800">
          Property Descriptions
        </h1>
        <p className="text-sm font-medium text-slate-600">
          Easily Update Your Property Description – Keep it Fresh, Keep it
          Yours!
        </p>
      </div>
      <section className="rounded-md text-sm font-bold shadow-md border border-slate-200 bg-white text-gray-800 flex items-center gap-1.5 px-5 py-3">
        <div className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-200">
          <MdTipsAndUpdates className="text-base text-blue-800" />
        </div>
        Keep It Accurate, Keep It Attractive – Update Your Property Today!
      </section>
      <Formik
        initialValues={{
          propertyDescription:
            dataPropertyDescriptions?.property?.propertyDetail
              ?.propertyDescription || '',
          neighborhoodDescription:
            dataPropertyDescriptions?.property?.propertyDetail
              ?.neighborhoodDescription || '',
          propertyRoomType:
            dataPropertyDescriptions?.propertyRoomType.map(
              (item: any, index: number) => ({
                id: item?.id,
                description: item?.description,
              }),
            ) || [],
        }}
        enableReinitialize={true}
        validationSchema={manageDescriptionValidationSchema}
        onSubmit={(values) => {
          setIsSubmitting(true)
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-5">
            <PropertyDescriptionInputSection
              dataPropertyDescriptions={dataPropertyDescriptions}
            />
            <NeighborhoodDescriptionInputSection
              dataPropertyDescriptions={dataPropertyDescriptions}
            />
            <section className="p-5 rounded-md shadow-md border border-slate-200 flex flex-col gap-5">
              <h1 className="text-lg font-bold text-gray-800 flex items-center gap-1.5">
                <RiDoorOpenLine className="text-xl" />
                Property Room Type Descriptions
              </h1>
              <RoomTypesDescriptionsInputSection
                dataPropertyDescriptions={dataPropertyDescriptions}
              />
              <button
                type="submit"
                disabled={
                  isPendingUpdatePropertyDescriptions ||
                  isPendingPropertyDescriptions
                }
                className="transition duration-100 disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-white flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-slate-900 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center"
              >
                <FaRegSave className="text-base" />
                Save Changes
              </button>
              <UpdateDescriptionsConfirmationPopup
                values={values}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                mutateUpdatePropertyDescriptions={
                  mutateUpdatePropertyDescriptions
                }
                isPendingUpdatePropertyDescriptions={
                  isPendingUpdatePropertyDescriptions
                }
                isPendingPropertyDescriptions={isPendingPropertyDescriptions}
              />
            </section>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default PropertyManageDescriptionPage
