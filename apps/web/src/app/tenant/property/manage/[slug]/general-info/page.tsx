'use client'

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'

import 'rsuite/SelectPicker/styles/index.css'
import 'rsuite/Rate/styles/index.css'
import { manageGeneralInfoValidationSchema } from '@/features/tenant/property/manage/general-info/schemas/manageGeneralInfoValidationSchema'
import UnauthorizedPage from '@/app/403/page'
import NotFoundMain from '@/app/not-found'
import Custom500 from '@/app/500/page'
import useManagePropertyGeneralInfoHook from '@/features/tenant/property/manage/general-info/hooks/useManagePropertyGeneralInfoHook'
import FormGeneralInfo from '@/features/tenant/property/manage/general-info/components/FormGeneralInfo'
const PropertyManageGeneralInfoPage = ({
  params,
}: {
  params: { slug: string }
}) => {
  const {
    showFormCreatePropertyType,
    setShowFormCreatePropertyType,
    setInputCheckInStartTime,
    setInputCheckInEndTime,
    setInputCheckOutStartTime,
    setInputCheckOutEndTime,
    isSubmitting,
    setIsSubmitting,
    setDataCreatePropertyType,
    cityId,
    setCityId,
    dataCreateCity,
    setDataCreateCity,
    dataCreateCountry,
    setDataCreateCountry,
    showCreateCity,
    setShowCreateCity,
    showCreateCountry,
    setShowCreateCountry,
    setUploadFile,
    countryId,
    setCountryId,
    propertyTypeId,
    setPropertyTypeId,
    dataCreatePropertyType,
    cityList,
    countryList,
    propertyTypes,
    isPendingCreatePropertyType,
    dataPropertyGeneralInfo,
    isPendingPropertyGeneralInfo,
    isError,
    error,
    isPendingUpdateGeneralInfo,
    mutateCreateCountry,
    mutateCreatePropertyType,
    mutateUpdateGeneralInfo,
    mutateCreateCity,
    isPendingCreateCity,
  } = useManagePropertyGeneralInfoHook({ params })

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
    <main className="py-5">
      <section className="flex flex-col gap-7 px-5">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-gray-800">General Info</h1>
          <p className="text-sm font-medium text-slate-600">
            Update your property’s general information
          </p>
        </div>
        <Formik
          initialValues={{
            name: dataPropertyGeneralInfo?.property?.name || '',
            zipCode: dataPropertyGeneralInfo?.property?.zipCode || '',
            phoneNumber:
              dataPropertyGeneralInfo?.property?.propertyDetail?.phoneNumber ||
              '',
            url: dataPropertyGeneralInfo?.property?.propertyDetail?.url || '',
            location: dataPropertyGeneralInfo?.property?.location || '',
            star: dataPropertyGeneralInfo?.property?.star || '',
            cityId: dataPropertyGeneralInfo?.property?.cityId || '',
            countryId: dataPropertyGeneralInfo?.property?.countryId || '',
            propertyTypeName:
              dataPropertyGeneralInfo?.property?.propertyType?.name || '',
            propertyTypeId:
              dataPropertyGeneralInfo?.property?.propertyTypeId || '',
            checkInStartTime:
              dataPropertyGeneralInfo?.property?.checkInStartTime
                .split('T')[1]
                .split(':')
                .slice(0, 2)
                .join(':') || '',
            checkInEndTime:
              dataPropertyGeneralInfo?.property?.checkInEndTime
                .split('T')[1]
                .split(':')
                .slice(0, 2)
                .join(':') || '',
            checkOutStartTime:
              dataPropertyGeneralInfo?.property?.checkOutStartTime
                .split('T')[1]
                .split(':')
                .slice(0, 2)
                .join(':') || '',
            checkOutEndTime:
              dataPropertyGeneralInfo?.property?.checkOutEndTime
                .split('T')[1]
                .split(':')
                .slice(0, 2)
                .join(':') || '',
            address: dataPropertyGeneralInfo?.property?.address || '',
            totalRooms:
              dataPropertyGeneralInfo?.property?.propertyDetail?.totalRooms ||
              '',
          }}
          validationSchema={manageGeneralInfoValidationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            setIsSubmitting(true)
          }}
        >
          {({ values, setFieldValue, isValid }) => (
            <FormGeneralInfo
              showFormCreatePropertyType={showFormCreatePropertyType}
              setShowFormCreatePropertyType={setShowFormCreatePropertyType}
              setInputCheckInStartTime={setInputCheckInStartTime}
              setInputCheckInEndTime={setInputCheckInEndTime}
              setInputCheckOutStartTime={setInputCheckOutStartTime}
              setInputCheckOutEndTime={setInputCheckOutEndTime}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              setDataCreatePropertyType={setDataCreatePropertyType}
              cityId={cityId}
              setCityId={setCityId}
              dataCreateCity={dataCreateCity}
              setDataCreateCity={setDataCreateCity}
              dataCreateCountry={dataCreateCountry}
              setDataCreateCountry={setDataCreateCountry}
              showCreateCity={showCreateCity}
              setShowCreateCity={setShowCreateCity}
              showCreateCountry={showCreateCountry}
              setShowCreateCountry={setShowCreateCountry}
              setUploadFile={setUploadFile}
              countryId={countryId}
              setCountryId={setCountryId}
              propertyTypeId={propertyTypeId}
              setPropertyTypeId={setPropertyTypeId}
              dataCreatePropertyType={dataCreatePropertyType}
              cityList={cityList}
              countryList={countryList}
              propertyTypes={propertyTypes}
              isPendingCreatePropertyType={isPendingCreatePropertyType}
              isPendingPropertyGeneralInfo={isPendingPropertyGeneralInfo}
              isPendingUpdateGeneralInfo={isPendingUpdateGeneralInfo}
              mutateCreateCountry={mutateCreateCountry}
              mutateCreatePropertyType={mutateCreatePropertyType}
              mutateUpdateGeneralInfo={mutateUpdateGeneralInfo}
              mutateCreateCity={mutateCreateCity}
              isPendingCreateCity={isPendingCreateCity}
              setFieldValue={setFieldValue}
              values={values}
            />
          )}
        </Formik>
      </section>
    </main>
  )
}

export default PropertyManageGeneralInfoPage
