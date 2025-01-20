'use client'

import React, { useState, useRef } from 'react'
import { Formik, Form, Field, FieldArray, insert, ErrorMessage } from 'formik'
import { FaPlus } from 'react-icons/fa6'
import TextInput from '@/features/tenant/property/create/components/TextInput'
import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import Separator from '@/features/auth/components/Separator'
import { createPropertyValidationSchema } from '@/features/tenant/property/create/schemas/createPropertyValidationSchema'

import 'rsuite/SelectPicker/styles/index.css'
import 'rsuite/Rate/styles/index.css'
import CheckInTimeInputSection from '@/features/tenant/property/manage/general-info/components/CheckInTimeInputSection'
import CheckOutTimeInputSection from '@/features/tenant/property/manage/general-info/components/CheckOutTimeInputSection'
import useCreatePropertyFunctionalityHook from '../hooks/useCreatePropertyFunctionalityHook'
import PropertyRoomTypesInputSection from './PropertyRoomTypesInputSection'
import FormCreatePropertyFacility from './FormCreatePropertyFacility'
import PropertyImagesInputSection from './PropertyImagesInputSection'
import PropertyFacilitiesInputSection from './PropertyFacilitiesInputSection'
import SectionGeneralInfo from './SectionGeneralInfo'
import useHandleCreatePropertyHook from '../hooks/useHandleCreatePropertyHook'
import { IPropertyData } from '../types'

const FormCreateProperty = ({
  setFieldValue,
  values,
  isFormFilled,
  mutateCreateProperty,
}: {
  mutateCreateProperty: (values: FormData) => void
  setFieldValue: (key: string, value: any) => void
  values: IPropertyData
  isFormFilled: boolean
}) => {
  const {
    showCreateCity,
    setShowCreateCity,
    dataCreateCity,
    setDataCreateCity,
    showCreateCountry,
    setShowCreateCountry,
    dataCreateCountry,
    setDataCreateCountry,
    setRoomFacilities,
    showFormCreatePropertyType,
    setShowFormCreatePropertyType,
    setInputCheckInStartTime,
    setInputCheckInEndTime,
    setInputCheckOutStartTime,
    setInputCheckOutEndTime,
    showCreatePropertyFacilityForm,
    setShowCreatePropertyFacilityForm,
    dataCreatePropertyFacility,
    setDataCreatePropertyFacility,
    dataCreatePropertyType,
    setDataCreatePropertyType,
    cityId,
    setCityId,
    showCreatePropertyRoomFacilityForm,
    setShowCreatePropertyRoomFacilityForm,
    dataCreatePropertyRoomFacility,
    setDataCreatePropertyRoomFacility,
    uploadFile,
    setUploadFile,
    countryId,
    setCountryId,
    propertyTypeId,
    setPropertyTypeId,
    cityList,
    countryList,
    propertyTypes,
    setChangedCheckbox,
    mutateCreateCity,
    isPendingCreateCity,
    mutateCreateCountry,
    isPendingCreateCountry,
    mutateCreatePropertyRoomFacility,
    isPendingCreatePropertyRoomFacility,
    dataRoomFacilities,
    isPendingCreatePropertyType,
    mutateCreatePropertyType,
    isPendingCreateProperty,
    dataPropertyFacilities,
    mutateCreatePropertyFacility,
    isPendingCreatePropertyFacility,
  } = useCreatePropertyFunctionalityHook()

  return (
    <Form className="flex flex-col gap-10">
      <SectionGeneralInfo
        propertyTypes={propertyTypes}
        cityList={cityList}
        countryList={countryList}
        isPendingCreateProperty={isPendingCreateProperty}
        isPendingCreateCity={isPendingCreateCity}
        isPendingCreateCountry={isPendingCreateCountry}
        isPendingCreatePropertyType={isPendingCreatePropertyType}
        showFormCreatePropertyType={showFormCreatePropertyType}
        setShowFormCreatePropertyType={setShowFormCreatePropertyType}
        setPropertyTypeId={setPropertyTypeId}
        setCityId={setCityId}
        setCountryId={setCountryId}
        setFieldValue={setFieldValue}
        values={values}
        mutateCreateCity={mutateCreateCity}
        mutateCreateCountry={mutateCreateCountry}
        mutateCreatePropertyType={mutateCreatePropertyType}
        mutateCreateProperty={mutateCreateProperty}
        dataCreateCity={dataCreateCity}
        setDataCreateCity={setDataCreateCity}
        dataCreateCountry={dataCreateCountry}
        setDataCreateCountry={setDataCreateCountry}
        dataCreatePropertyType={dataCreatePropertyType}
        setDataCreatePropertyType={setDataCreatePropertyType}
        cityId={cityId}
        countryId={countryId}
        propertyTypeId={propertyTypeId}
        showCreateCity={showCreateCity}
        setShowCreateCity={setShowCreateCity}
        showCreateCountry={showCreateCountry}
        setShowCreateCountry={setShowCreateCountry}
        uploadFile={uploadFile}
        setUploadFile={setUploadFile}
      />
      <Separator />
      <section id="detail-info" className="flex flex-col gap-5">
        <hgroup className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Detail Property Information
          </h1>
          <p className="text-sm font-medium text-gray-600">
            property detail is used to explain in more detail what the property
            has
          </p>
        </hgroup>
        <TextInput
          labelName="Total Rooms / Property"
          name="totalRooms"
          type="number"
          placeholder="30"
        />
        <CheckInTimeInputSection
          setFieldValue={setFieldValue}
          setInputCheckInStartTime={setInputCheckInStartTime}
          values={values}
          setInputCheckInEndTime={setInputCheckInEndTime}
        />
        <CheckOutTimeInputSection
          setFieldValue={setFieldValue}
          setInputCheckOutStartTime={setInputCheckOutStartTime}
          values={values}
          setInputCheckOutEndTime={setInputCheckOutEndTime}
        />
        <TextAreaCustom
          name="propertyDescription"
          labelName="Description"
          placeholder="Describe the property: features, amenities, and unique qualities"
        />
        <TextAreaCustom
          name="neighborhoodDescription"
          labelName="Neighborhood Description"
          placeholder="What’s nearby? Share details about shops, transport, and recreation"
        />
        <TextAreaCustom
          name="address"
          labelName="Full Address"
          placeholder="Jl. Sudirman-Thamrin No.9, Kec. Menteng, Kota Jakarta Pusat, Jakarta, Indonesia"
        />
        <TextInput
          labelName="Google Maps URL"
          name="location"
          placeholder="Enter your property’s Google Maps URL (e.g., https://goo.gl/maps/xyz123)"
          type="text"
        />
      </section>
      <section className="flex flex-col gap-5">
        <hgroup className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Property Facilities
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Property facilities will explain to customers what they will get
            while staying in this property
          </p>
          <ErrorMessage
            name="propertyFacilitiesId"
            component={'div'}
            className="mt-1.5 text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
          />
        </hgroup>
        <PropertyFacilitiesInputSection
          dataPropertyFacilities={dataPropertyFacilities}
          values={values}
        />
        <div
          onClick={() => setShowCreatePropertyFacilityForm(true)}
          className="px-3 flex items-center gap-1.5 py-1.5 bg-slate-800 text-xs font-bold w-fit text-white rounded-md shadow-md hover:opacity-70 hover:cursor-pointer active:scale-90 transition duration-100"
        >
          <FaPlus className="text-sm" />
          Add Property Facility
        </div>
        <FormCreatePropertyFacility
          setDataCreatePropertyFacility={setDataCreatePropertyFacility}
          isPendingCreatePropertyFacility={isPendingCreatePropertyFacility}
          setShowCreatePropertyFacilityForm={setShowCreatePropertyFacilityForm}
          mutateCreatePropertyFacility={mutateCreatePropertyFacility}
          dataCreatePropertyFacility={dataCreatePropertyFacility}
          setUploadFile={setUploadFile}
          showCreatePropertyFacilityForm={showCreatePropertyFacilityForm}
        />
      </section>
      <section className="flex flex-col gap-5">
        <hgroup className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Property Images</h1>
          <p className="text-sm font-medium text-gray-600">
            Showcase Your Space: Stunning Property Images for Renters{' '}
          </p>
          <ErrorMessage
            name="propertyImages"
            component={'div'}
            className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
          />
        </hgroup>
        <PropertyImagesInputSection values={values} />
      </section>
      <section className="flex flex-col gap-5">
        <hgroup>
          <h1 className="text-2xl font-bold text-gray-900">Room Type</h1>
          <p className="text-sm font-medium text-gray-600">
            Room types are used to provide customers with choices for several
            types in one property
          </p>
        </hgroup>
        <PropertyRoomTypesInputSection
          values={values}
          setRoomFacilities={setRoomFacilities}
          setDataCreatePropertyRoomFacility={setDataCreatePropertyRoomFacility}
          isPendingCreatePropertyRoomFacility={
            isPendingCreatePropertyRoomFacility
          }
          setShowCreatePropertyRoomFacilityForm={
            setShowCreatePropertyRoomFacilityForm
          }
          mutateCreatePropertyRoomFacility={mutateCreatePropertyRoomFacility}
          dataRoomFacilities={dataRoomFacilities}
          dataCreatePropertyRoomFacility={dataCreatePropertyRoomFacility}
          setUploadFile={setUploadFile}
          setChangedCheckbox={setChangedCheckbox}
          showCreatePropertyRoomFacilityForm={
            showCreatePropertyRoomFacilityForm
          }
        />
      </section>
      <button
        type="submit"
        disabled={!isFormFilled}
        className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 rounded-full py-3 flex items-center gap-1.5 justify-center w-full transition duration-100 bg-black hover:opacity-75 active:scale-95 text-white text-sm font-bold"
      >
        Create Property
      </button>
    </Form>
  )
}

export default FormCreateProperty
