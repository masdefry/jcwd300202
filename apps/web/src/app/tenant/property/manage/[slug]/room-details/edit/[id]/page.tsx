'use client'

import React from 'react'
import { Formik } from 'formik'
import toast from 'react-hot-toast'
import { manageRoomValidationSchema } from '@/features/tenant/property/manage/room-details/edit/schemas/manageRoomValidationSchema'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import useManageEditRoomHook from '@/features/tenant/property/manage/room-details/edit/hooks/useManageEditRoomHook'
import FormEditRoomType from '@/features/tenant/property/manage/room-details/edit/components/FormEditRoomType'
import ImagesSectionEditRoomType from '@/features/tenant/property/manage/room-details/edit/components/ImagesSectionEditRoomType'

const PropertyManageRoomDetailsEditPage = ({
  params,
}: {
  params: { slug: string; id: string }
}) => {
  const {
    isSubmitting,
    setIsSubmitting,
    dataPropertyRoomType,
    isPendingPropertyRoomType,
    isError,
    error,
    mutateUpdatePropertyRoomTypeGeneral,
    isPendingUpdatePropertyRoomTypeGeneral,
  } = useManageEditRoomHook({ params })

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
    <main className="flex flex-col gap-7 py-5">
      <hgroup className="flex flex-col px-5">
        <h1 className="text-lg font-bold text-gray-800">
          Edit {dataPropertyRoomType?.propertyRoomType[0]?.name} Property Room
          Type
        </h1>
      </hgroup>
      <ImagesSectionEditRoomType
        dataPropertyRoomType={dataPropertyRoomType}
        params={params}
      />
      <Formik
        initialValues={{
          name: dataPropertyRoomType?.propertyRoomType[0]?.name || '',
          totalRooms:
            dataPropertyRoomType?.propertyRoomType[0]?.totalRooms || '',
          rooms: dataPropertyRoomType?.propertyRoomType[0]?.rooms || 1,
          bathrooms: dataPropertyRoomType?.propertyRoomType[0]?.bathrooms || 1,
          capacity: dataPropertyRoomType?.propertyRoomType[0]?.capacity || 2,
          price: dataPropertyRoomType?.propertyRoomType[0]?.price || '',
        }}
        validationSchema={manageRoomValidationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          setIsSubmitting(true)
        }}
      >
        {({ values }) => (
          <FormEditRoomType
            dataPropertyRoomType={dataPropertyRoomType}
            isPendingUpdatePropertyRoomTypeGeneral={
              isPendingUpdatePropertyRoomTypeGeneral
            }
            isPendingPropertyRoomType={isPendingPropertyRoomType}
            isSubmitting={isSubmitting}
            mutateUpdatePropertyRoomTypeGeneral={
              mutateUpdatePropertyRoomTypeGeneral
            }
            setIsSubmitting={setIsSubmitting}
            values={values}
          />
        )}
      </Formik>
    </main>
  )
}

export default PropertyManageRoomDetailsEditPage
