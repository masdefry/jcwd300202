'use client'

import React, { useState } from 'react'
import useMutateCreatePropertyTypeApi from '@/features/tenant/property/create/api/useMutateCreatePropertyTypeApi'
import toast from 'react-hot-toast'
import useGetPropertyTypesApi from '../api/useGetPropertyTypesApi'
import useQueryCountryApi from '../api/useQueryCountryApi'
import useQueryCityApi from '../api/useQueryCityApi'
import useMutateCreateCountryApi from '@/features/tenant/property/create/api/useMutateCreateCountryApi'
import useMutateUpdateGeneralInfoApi from '../api/useMutateUpdateGeneralInfoApi'
import useQueryGeneralInfoApi from '../api/useQueryGeneralInfoApi'
import useMutateCreateCityApi from '@/features/tenant/property/create/api/useMutateCreateCityApi'

const useManagePropertyGeneralInfoHook = ({
  params,
}: {
  params: { slug: string }
}) => {
  const [showFormCreatePropertyType, setShowFormCreatePropertyType] =
    useState<boolean>(false)
  const [change, setChange] = useState<boolean>(false)
  const [inputPropertyType, setInputPropertyType] = useState('')
  const [inputCheckInStartTime, setInputCheckInStartTime] = useState('14:00')
  const [inputCheckInEndTime, setInputCheckInEndTime] = useState('')
  const [inputCheckOutStartTime, setInputCheckOutStartTime] = useState('')
  const [inputCheckOutEndTime, setInputCheckOutEndTime] = useState('10:00')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dataCreatePropertyType, setDataCreatePropertyType] = useState({
    name: '',
    description: '',
  })
  const [cityId, setCityId] = useState<null | number>(null)
  const [dataCreateCity, setDataCreateCity] = useState<{
    name: string
    file: File[]
    countryId: null | number
  }>({
    name: '',
    file: [] as File[],
    countryId: null,
  })
  const [dataCreateCountry, setDataCreateCountry] = useState<{
    name: string
    description: string
    file: File[]
  }>({
    name: '',
    description: '',
    file: [] as File[],
  })
  const [showCreateCity, setShowCreateCity] = useState(false)
  const [showCreateCountry, setShowCreateCountry] = useState(false)
  const [uploadFile, setUploadFile] = useState(false)
  const [countryId, setCountryId] = useState<null | number>(null)
  const [propertyTypeId, setPropertyTypeId] = useState<null | number>(null)
  const [dataPropertyTypes, setDataPropertyTypes] = useState<any>([])
  const [cityList, setCityList] = useState([])
  const [countryList, setCountryList] = useState([])
  const [propertyTypes, setPropertyTypes] = useState([])
  const { mutateCreateCountry, isPendingCreateCountry } =
    useMutateCreateCountryApi({
      dataCreateCountry,
      setDataCreateCountry,
      setShowCreateCountry,
      onSuccess: (res) => {
        setDataCreateCountry({ name: '', file: [], description: '' })
        setShowCreateCountry(false)
        setTimeout(() => {
          window.location.reload()
        }, 1200)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })
  const { isPendingCities, isErrorCities } = useQueryCityApi({ setCityList })
  const { isPendingCountries, isErrorCountries } = useQueryCountryApi({
    setCountryList,
  })
  const { isPendingPropertyTypes, isErrorPropertyTypes } =
    useGetPropertyTypesApi({ setPropertyTypes })

  const [propertyType, setPropertyType] = useState({ name: '', id: '' })
  const { mutateCreatePropertyType, isPendingCreatePropertyType } =
    useMutateCreatePropertyTypeApi({
      dataCreatePropertyType,
      onSuccess: (res) => {
        setPropertyType({ name: res?.data?.name, id: res?.data?.id })
        setShowFormCreatePropertyType(false)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.reload()
        }, 1200)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const { mutateCreateCity, isPendingCreateCity } = useMutateCreateCityApi({
    dataCreateCity,
    setDataCreateCity,
    setShowCreateCity,
    onSuccess: (res) => {
      setShowCreateCity(false)
      setDataCreateCity({
        name: '',
        file: [] as File[],
        countryId: null,
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
      setDataCreateCity({
        name: '',
        file: [] as File[],
        countryId: null,
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const {
    dataPropertyGeneralInfo,
    isPendingPropertyGeneralInfo,
    isError,
    error,
  } = useQueryGeneralInfoApi({
    params,
    setCityId,
    setCountryId,
    setPropertyTypeId,
  })

  const { mutateUpdateGeneralInfo, isPendingUpdateGeneralInfo } =
    useMutateUpdateGeneralInfoApi({
      params,
      onSuccess: (res) => {
        setTimeout(() => {
          window.location.reload()
        }, 1200)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  return {
    showFormCreatePropertyType,
    setShowFormCreatePropertyType,
    inputPropertyType,
    setInputPropertyType,
    inputCheckInStartTime,
    setInputCheckInStartTime,
    inputCheckInEndTime,
    setInputCheckInEndTime,
    inputCheckOutStartTime,
    setInputCheckOutStartTime,
    inputCheckOutEndTime,
    setInputCheckOutEndTime,
    isSubmitting,
    setIsSubmitting,
    dataCreatePropertyType,
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
    isPendingCreateCountry,
    isPendingCities,
    isPendingCountries,
    isPendingPropertyTypes,
    propertyType,
    setPropertyType,
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
    setChange,
  }
}

export default useManagePropertyGeneralInfoHook
