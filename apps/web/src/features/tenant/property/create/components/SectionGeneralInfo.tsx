'use client'

import React, { useState, useRef } from 'react'
import TextInput from '@/features/tenant/property/create/components/TextInput'

import PropertyTypeInputSection from '@/features/tenant/property/manage/general-info/components/PropertyTypeInputSection'
import FormCreatePropertyType from '@/features/tenant/property/manage/general-info/components/FormCreatePropertyType'
import CountryInputSection from '@/features/tenant/property/manage/general-info/components/CountryInputSection'
import FormCreateCountry from '@/features/tenant/property/manage/general-info/components/FormCreateCountry'
import FormCreateCity from '@/features/tenant/property/manage/general-info/components/FormCreateCity'
import CityInputSection from '@/features/tenant/property/manage/general-info/components/CityInputSection'
import { ISectionGeneralInfoProps } from '../types'

const SectionGeneralInfo = ({
  propertyTypes,
  cityList,
  countryList,
  isPendingCreateProperty,
  isPendingCreateCity,
  isPendingCreateCountry,
  isPendingCreatePropertyType,
  showFormCreatePropertyType,
  setShowFormCreatePropertyType,
  setPropertyTypeId,
  setCityId,
  setCountryId,
  setFieldValue,
  values,
  mutateCreateCity,
  mutateCreateCountry,
  mutateCreatePropertyType,
  mutateCreateProperty,
  dataCreateCity,
  setDataCreateCity,
  dataCreateCountry,
  setDataCreateCountry,
  dataCreatePropertyType,
  setDataCreatePropertyType,
  cityId,
  countryId,
  propertyTypeId,
  showCreateCity,
  setShowCreateCity,
  showCreateCountry,
  setShowCreateCountry,
  uploadFile,
  setUploadFile,
}: ISectionGeneralInfoProps) => {
  return (
    <section id="general-info" className="flex flex-col gap-5">
      <hgroup className="flex flex-col mb-5">
        <h1 className="text-2xl font-bold text-gray-900">
          Property General Information
        </h1>
        <p className="text-sm font-medium text-gray-600">
          General information is used to describe the entire property
        </p>
      </hgroup>
      <TextInput
        labelName="Property Name"
        name="name"
        type="text"
        placeholder="Pan Pacific / Westin Hotel"
      />
      <PropertyTypeInputSection
        setShowFormCreatePropertyType={setShowFormCreatePropertyType}
        setPropertyTypeId={setPropertyTypeId}
        setFieldValue={setFieldValue}
        propertyTypeId={propertyTypeId}
        propertyTypes={propertyTypes!}
        isPendingUpdateGeneralInfo={isPendingCreateProperty}
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

      <section id="region" className="flex flex-col gap-5 items-center">
        <TextInput
          labelName="Zip Code"
          name="zipCode"
          type="text"
          placeholder="10332"
        />
        <CityInputSection
          setShowCreateCity={setShowCreateCity}
          setCityId={setCityId}
          setFieldValue={setFieldValue}
          cityId={cityId}
          cityList={cityList}
          isPendingPropertyGeneralInfo={isPendingCreateProperty!}
          isPendingUpdateGeneralInfo={isPendingCreateProperty!}
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
          isPendingPropertyGeneralInfo={isPendingCreateProperty}
          isPendingUpdateGeneralInfo={isPendingCreateProperty}
        />
        <FormCreateCountry
          mutateCreateCountry={mutateCreateCountry}
          setUploadFile={setUploadFile}
          dataCreateCountry={dataCreateCountry}
          showCreateCountry={showCreateCountry}
          setDataCreateCountry={setDataCreateCountry}
          setShowCreateCountry={setShowCreateCountry}
        />
      </section>
      <TextInput
        labelName="Phone Number"
        name="phoneNumber"
        type="text"
        placeholder="Enter property phone number (e.g., 68793729818)"
      />
      <TextInput
        labelName="Property URL"
        name="url"
        type="text"
        placeholder="Paste your property’s website here (e.g., https://www.example.com/property)"
      />
    </section>
  )
}

export default SectionGeneralInfo
