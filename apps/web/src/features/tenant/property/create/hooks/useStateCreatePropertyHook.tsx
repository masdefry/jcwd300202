'use client'

import React, { useState } from 'react'

const useStateCreatePropertyHook = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCreateCity, setShowCreateCity] = useState(false)
  const [dataCreateCity, setDataCreateCity] = useState<{
    name: string
    file: File[]
    countryId: null | number
  }>({
    name: '',
    file: [] as File[],
    countryId: null,
  })

  const [showCreateCountry, setShowCreateCountry] = useState(false)
  const [dataCreateCountry, setDataCreateCountry] = useState<{
    name: string
    description: string
    file: File[]
  }>({
    name: '',
    description: '',
    file: [] as File[],
  })

  const [change, setChange] = useState(true)
  const [roomFacilities, setRoomFacilities] = useState<any[]>([[]])
  const [showFormCreatePropertyType, setShowFormCreatePropertyType] =
    useState<boolean>(false)
  const [inputPropertyType, setInputPropertyType] = useState('')
  const [inputCity, setInputCity] = useState('')
  const [inputCountry, setInputCountry] = useState('')
  const [dataCities, setDataCities] = useState<any>([])
  const [dataCountries, setDataCountries] = useState<any>([])
  const [inputCheckInStartTime, setInputCheckInStartTime] = useState('14:00')
  const [inputCheckInEndTime, setInputCheckInEndTime] = useState('')
  const [inputCheckOutStartTime, setInputCheckOutStartTime] = useState('')
  const [inputCheckOutEndTime, setInputCheckOutEndTime] = useState('10:00')
  const [showCreatePropertyFacilityForm, setShowCreatePropertyFacilityForm] =
    useState(false)
  const [dataCreatePropertyFacility, setDataCreatePropertyFacility] = useState({
    name: '',
    file: [] as File[],
  })
  const [dataCreatePropertyType, setDataCreatePropertyType] = useState({
    name: '',
    description: '',
  })
  const [cityId, setCityId] = useState<null | number>(null)
  const [
    showCreatePropertyRoomFacilityForm,
    setShowCreatePropertyRoomFacilityForm,
  ] = useState(false)
  const [dataCreatePropertyRoomFacility, setDataCreatePropertyRoomFacility] =
    useState({
      name: '',
      file: [] as File[],
    })
  const [uploadFile, setUploadFile] = useState(false)
  const [countryId, setCountryId] = useState<null | number>(null)
  const [propertyTypeId, setPropertyTypeId] = useState<null | number>(null)
  const [dataPropertyTypes, setDataPropertyTypes] = useState<any>([])
  const [cityList, setCityList] = useState([])
  const [countryList, setCountryList] = useState<any>([])
  const [propertyTypes, setPropertyTypes] = useState([])
  const [propertyType, setPropertyType] = useState({ name: '', id: '' })
  const [changedCheckbox, setChangedCheckbox] = useState(false)

  return {
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
  }
}

export default useStateCreatePropertyHook
