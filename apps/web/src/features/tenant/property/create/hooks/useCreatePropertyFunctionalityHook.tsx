'use client'

import React from 'react'
import useMutateGetPropertyTypeApi from '../api/useMutateGetPropertyTypeApi'
import useStateCreatePropertyHook from './useStateCreatePropertyHook'
import useCreateCityHook from './useCreateCityHook'
import useCreateCountryHook from './useCreateCountryHook'
import useCreatePropertyRoomFacilityHook from './useCreatePropertyRoomFacilityHook'
import useCreatePropertyTypeHook from './useCreatePropertyTypeHook'
import useMutateCreatePropertyApi from '../api/useMutateCreatePropertyApi'
import toast from 'react-hot-toast'
import useCreatePropertyFacilityHook from './usePropertyFacilityHook'

const useCreatePropertyFunctionalityHook = () => {
  const {
    showCreateCity,
    showCreateCountry,
    setShowCreateCity,
    setShowCreateCountry,
    dataCreateCity,
    setDataCreateCity,
    dataCreateCountry,
    setDataCreateCountry,
    change,
    setChange,
    roomFacilities,
    setRoomFacilities,
    showFormCreatePropertyType,
    setShowFormCreatePropertyType,
    inputPropertyType,
    setInputPropertyType,
    inputCity,
    setInputCity,
    inputCountry,
    setInputCountry,
    dataCities,
    setDataCities,
    dataCountries,
    setDataCountries,
    inputCheckInStartTime,
    setInputCheckInStartTime,
    inputCheckInEndTime,
    setInputCheckInEndTime,
    inputCheckOutStartTime,
    setInputCheckOutStartTime,
    inputCheckOutEndTime,
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
    dataPropertyTypes,
    setDataPropertyTypes,
    cityList,
    setCityList,
    countryList,
    setCountryList,
    propertyTypes,
    setPropertyTypes,
    propertyType,
    setPropertyType,
    changedCheckbox,
    setChangedCheckbox,
    isSubmitting,
    setIsSubmitting,
  } = useStateCreatePropertyHook()

  const { mutateGetPropertyTypes } = useMutateGetPropertyTypeApi({
    onSuccess: (res) => {
      if (res?.data?.data.length > 0) {
        setDataPropertyTypes(res?.data?.data)
      } else {
        const notFound = [{ name: 'Property type not found', id: '' }]
        setDataPropertyTypes(notFound)
      }
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const {
    mutateCreateCity,
    isPendingCreateCity,
    isPendingCities,
    isErrorCities,
  } = useCreateCityHook({
    setCityList,
    showCreateCity,
    setShowCreateCity,
    dataCreateCity,
    setDataCreateCity,
  })

  const { mutateCreateCountry, isPendingCountries, isPendingCreateCountry } =
    useCreateCountryHook({
      dataCreateCountry,
      setDataCreateCountry,
      setShowCreateCountry,
      setCountryList,
    })

  const {
    mutateCreatePropertyRoomFacility,
    isPendingCreatePropertyRoomFacility,
    dataRoomFacilities,
    isPendingRoomFacilities,
  } = useCreatePropertyRoomFacilityHook({
    dataCreatePropertyRoomFacility,
    setShowCreatePropertyRoomFacilityForm,
    setDataCreatePropertyRoomFacility,
  })

  const {
    isPendingCreatePropertyType,
    isPendingPropertyTypes,
    mutateCreatePropertyType,
  } = useCreatePropertyTypeHook({
    setPropertyTypes,
    setPropertyType,
    setShowFormCreatePropertyType,
    dataCreatePropertyType,
  })

  const {
    dataPropertyFacilities,
    isPendingPropertyFacilities,
    mutateCreatePropertyFacility,
    isPendingCreatePropertyFacility,
  } = useCreatePropertyFacilityHook({
    dataCreatePropertyFacility,
    setShowCreatePropertyFacilityForm,
    setDataCreatePropertyFacility,
  })

  const { mutateCreateProperty, isPendingCreateProperty } =
    useMutateCreatePropertyApi({
      onSuccess: (res) => {
        setShowCreatePropertyFacilityForm(false)
        setDataCreatePropertyFacility({
          name: '',
          file: [],
        })
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      },
      onError: (err: any) => {
        setDataCreatePropertyFacility({
          name: '',
          file: [],
        })
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  return {
    showCreateCity,
    setShowCreateCity,
    dataCreateCity,
    setDataCreateCity,
    showCreateCountry,
    setShowCreateCountry,
    dataCreateCountry,
    setDataCreateCountry,
    change,
    setChange,
    roomFacilities,
    setRoomFacilities,
    showFormCreatePropertyType,
    setShowFormCreatePropertyType,
    inputPropertyType,
    setInputPropertyType,
    inputCity,
    setInputCity,
    inputCountry,
    setInputCountry,
    dataCities,
    setDataCities,
    dataCountries,
    setDataCountries,
    inputCheckInStartTime,
    setInputCheckInStartTime,
    inputCheckInEndTime,
    setInputCheckInEndTime,
    inputCheckOutStartTime,
    setInputCheckOutStartTime,
    inputCheckOutEndTime,
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
    dataPropertyTypes,
    setDataPropertyTypes,
    cityList,
    setCityList,
    countryList,
    setCountryList,
    propertyTypes,
    setPropertyTypes,
    propertyType,
    setPropertyType,
    changedCheckbox,
    setChangedCheckbox,
    mutateGetPropertyTypes,
    mutateCreateCity,
    isPendingCreateCity,
    isPendingCities,
    isErrorCities,
    mutateCreateCountry,
    isPendingCountries,
    isPendingCreateCountry,
    mutateCreatePropertyRoomFacility,
    isPendingCreatePropertyRoomFacility,
    dataRoomFacilities,
    isPendingRoomFacilities,
    isPendingCreatePropertyType,
    isPendingPropertyTypes,
    mutateCreatePropertyType,
    mutateCreateProperty,
    isPendingCreateProperty,
    dataPropertyFacilities,
    isPendingPropertyFacilities,
    mutateCreatePropertyFacility,
    isPendingCreatePropertyFacility,
    isSubmitting,
    setIsSubmitting,
  }
}

export default useCreatePropertyFunctionalityHook
