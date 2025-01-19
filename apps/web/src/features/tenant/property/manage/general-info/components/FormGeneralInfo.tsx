'use client'

import TextInput from '@/features/tenant/property/create/components/TextInput'
import { Form } from 'formik'
import React from 'react'
import CityInputSection from './CityInputSection'
import CountryInputSection from './CountryInputSection'
import FormCreateCountry from './FormCreateCountry'
import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import PropertyTypeInputSection from './PropertyTypeInputSection'
import FormCreatePropertyType from './FormCreatePropertyType'
import CheckInTimeInputSection from './CheckInTimeInputSection'
import CheckOutTimeInputSection from './CheckOutTimeInputSection'
import { FaRegSave } from 'react-icons/fa'
import UpdateGeneralInfoConfir from './UpdateGeneralInfoConfir'
import FormCreateCity from './FormCreateCity'
import { IUseManagePropertyGeneralInfoHookReturn } from '../types'

const FormGeneralInfo = ({
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
  isPendingPropertyGeneralInfo,
  isPendingUpdateGeneralInfo,
  mutateCreateCountry,
  mutateCreatePropertyType,
  mutateUpdateGeneralInfo,
  mutateCreateCity,
  isPendingCreateCity,
  setFieldValue,
  values,
}: Partial<IUseManagePropertyGeneralInfoHookReturn> & {
  propertyTypes: { value: string | number; label: string }[]
  setFieldValue: any
  values: any
}) => {
  return (
    <Form className="flex flex-col gap-5">
      <TextInput
        labelName="Property Name"
        name="name"
        placeholder="Enter a unique name for your property (e.g., 'Sunny Beach House')"
        type="text"
      />
      <TextInput
        labelName="Property Phone Number"
        name="phoneNumber"
        placeholder="Enter property phone number (e.g., 68793729818)"
        type="text"
      />
      <TextInput
        labelName="Property URL"
        name="url"
        placeholder="Provide the website or listing URL for this property"
        type="text"
      />
      <TextInput
        labelName="Total Rooms in this Property"
        name="totalRooms"
        type="number"
        placeholder="30"
      />
      <TextInput
        labelName="Zip Code"
        name="zipCode"
        placeholder="Enter the zip code for the property’s location"
        type="text"
      />
      <CityInputSection
        setShowCreateCity={setShowCreateCity}
        setCityId={setCityId}
        setFieldValue={setFieldValue}
        cityId={cityId}
        cityList={cityList}
        isPendingPropertyGeneralInfo={isPendingPropertyGeneralInfo!}
        isPendingUpdateGeneralInfo={isPendingUpdateGeneralInfo!}
      />
      <FormCreateCity
        countryList={countryList!}
        isPendingCreateCity={isPendingCreateCity!}
        mutateCreateCity={mutateCreateCity}
        setUploadFile={setUploadFile}
        dataCreateCity={dataCreateCity!}
        showCreateCity={showCreateCity!}
        setDataCreateCity={setDataCreateCity}
        setShowCreateCity={setShowCreateCity}
      />
      <CountryInputSection
        setShowCreateCountry={setShowCreateCountry}
        setCountryId={setCountryId}
        setFieldValue={setFieldValue}
        countryId={countryId}
        countryList={countryList}
        isPendingPropertyGeneralInfo={isPendingPropertyGeneralInfo}
        isPendingUpdateGeneralInfo={isPendingUpdateGeneralInfo}
      />
      <FormCreateCountry
        mutateCreateCountry={mutateCreateCountry}
        setUploadFile={setUploadFile}
        dataCreateCountry={dataCreateCountry}
        showCreateCountry={showCreateCountry}
        setDataCreateCountry={setDataCreateCountry}
        setShowCreateCountry={setShowCreateCountry}
      />

      <TextInput
        labelName="Google Maps URL"
        name="location"
        placeholder="Enter your property’s Google Maps URL (e.g., https://goo.gl/maps/xyz123)"
        type="text"
      />
      <TextAreaCustom
        name="address"
        labelName="Full Address"
        placeholder="Jl. Sudirman-Thamrin No.9, Kec. Menteng, Kota Jakarta Pusat, Jakarta, Indonesia"
      />
      <PropertyTypeInputSection
        setShowFormCreatePropertyType={setShowFormCreatePropertyType}
        setPropertyTypeId={setPropertyTypeId}
        setFieldValue={setFieldValue}
        propertyTypeId={propertyTypeId}
        propertyTypes={propertyTypes!}
        isPendingPropertyGeneralInfo={isPendingPropertyGeneralInfo}
        isPendingUpdateGeneralInfo={isPendingUpdateGeneralInfo}
        values={values}
      />
      {showFormCreatePropertyType && (
        <FormCreatePropertyType
          isPendingCreatePropertyType={isPendingCreatePropertyType}
          mutateCreatePropertyType={mutateCreatePropertyType}
          setUploadFile={setUploadFile}
          dataCreatePropertyType={dataCreatePropertyType}
          showFormCreatePropertyType={showFormCreatePropertyType}
          setDataCreatePropertyType={setDataCreatePropertyType}
          setShowFormCreatePropertyType={setShowFormCreatePropertyType}
        />
      )}
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
      <button
        type="submit"
        disabled={isPendingPropertyGeneralInfo || isPendingUpdateGeneralInfo}
        className="transition duration-100 disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-slate-900 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center"
      >
        <FaRegSave className="text-base" />
        Save Changes
      </button>
      <UpdateGeneralInfoConfir
        isPendingPropertyGeneralInfo={isPendingPropertyGeneralInfo}
        isPendingUpdateGeneralInfo={isPendingUpdateGeneralInfo}
        values={values}
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
        mutateUpdateGeneralInfo={mutateUpdateGeneralInfo}
      />
    </Form>
  )
}

export default FormGeneralInfo
