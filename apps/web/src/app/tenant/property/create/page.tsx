'use client'

import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Formik, Form, Field, FieldArray, insert, ErrorMessage } from 'formik'
import { Label } from '@/components/ui/label'
import { FaPlus } from 'react-icons/fa6'
import TextInput from '@/features/tenant/property/create/components/TextInput'
import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import Separator from '@/features/auth/components/Separator'
import { Checkbox } from '@/components/ui/checkbox'
import { FiPlus } from 'react-icons/fi'
import { CiCirclePlus, CiTrash } from 'react-icons/ci'
import { CiSquarePlus } from 'react-icons/ci'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'
import { GiModernCity } from 'react-icons/gi'
import { FaMountainCity } from 'react-icons/fa6'
import Image from 'next/image'
import { createPropertyValidationSchema } from '@/features/tenant/property/create/schemas/createPropertyValidationSchema'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TextInputForTabs from '@/features/tenant/property/create/components/TextInputForTabs'
import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import toast from 'react-hot-toast'
import { FaRegBuilding, FaRegTrashCan } from 'react-icons/fa6'
import { BsBuildingSlash } from 'react-icons/bs'
import Rate from 'rsuite/Rate'
import SelectPicker from 'rsuite/SelectPicker'

import 'rsuite/SelectPicker/styles/index.css'
import 'rsuite/Rate/styles/index.css'
import useCreateCityHook from './useCreateCityHook'
import useCreateCountryHook from './useCreateCountryHook'

const CreatePropertyPage = () => {
  const {
    showCreateCity,
    setShowCreateCity,
    setDataCreateCity,
    dataCreateCity,
    mutateCreateCity,
    isPendingCreateCity,
  } = useCreateCityHook()

  const {
    showCreateCountry,
    setShowCreateCountry,
    setDataCreateCountry,
    dataCreateCountry,
    mutateCreateCountry,
    isPendingCreateCountry,
  } = useCreateCountryHook()

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
  // const [
  //   showCreatePropertyFacilityForm,
  //   setShowCreatePropertyFacilityForm,
  // ] = useState(false)
  const [dataCreatePropertyRoomFacility, setDataCreatePropertyRoomFacility] =
    useState({
      name: '',
      file: [] as File[],
    })
  // const [dataCreatePropertyFacility, setDataCreatePropertyFacility] =
  //   useState({
  //     name: '',
  //     file: [] as File[],
  //   })
  const {
    mutate: mutateCreatePropertyFacility,
    isPending: isPendingCreatePropertyFacility,
  } = useMutation({
    mutationFn: async () => {
      const fd = new FormData()
      fd.append('name', dataCreatePropertyFacility?.name)
      fd.append('images', dataCreatePropertyFacility?.file[0])
      const res = await instance.post('/property-facility', fd)

      console.log(res)
      return res?.data
    },
    onSuccess: (res) => {
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

  const { data: dataRoomFacilities, isPending: isPendingRoomFacilities } =
    useQuery({
      queryKey: ['getPropertyRoomFacilities'],
      queryFn: async () => {
        const res = await instance.get('/room-facility')
        return res?.data?.data
      },
    })

  const {
    data: dataPropertyFacilities,
    isPending: isPendingPropertyFacilities,
  } = useQuery({
    queryKey: ['getPropertyFacilities'],
    queryFn: async () => {
      const res = await instance.get('/property-facility')
      return res?.data?.data
    },
  })
  // const [dataPropertyTypes, setDataPropertyTypes] = useState<any>([])
  const handleClearInputPropertyType = () => {
    setInputPropertyType('')
  }
  const handleInputPropertyType = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputPropertyType(event.target.value)
  }

  const handleClearInputCity = () => {
    setInputCity('')
  }
  const handleInputCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(event.target.value)
  }

  const handleClearInputCountry = () => {
    setInputCountry('')
  }
  const handleInputCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCountry(event.target.value)
  }
  const { mutate: mutateGetPropertyTypes } = useMutation({
    mutationFn: async (value: string) => {
      const res = await instance.get(`/property-type/search?name=${value}`)
      return res
    },
    onSuccess: (res) => {
      if (res?.data?.data.length > 0) {
        setDataPropertyTypes(res?.data?.data)
      } else {
        const notFound = [{ name: 'Property type not found', id: '' }]
        setDataPropertyTypes(notFound)
      }
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.message || 'Connection error!')
    },
  })

  const {
    mutate: mutateCreatePropertyRoomFacility,
    isPending: isPendingCreatePropertyRoomFacility,
  } = useMutation({
    mutationFn: async () => {
      const fd = new FormData()
      fd.append('name', dataCreatePropertyRoomFacility?.name)
      fd.append('images', dataCreatePropertyRoomFacility?.file[0])
      const res = await instance.post('/room-facility', fd)

      return res?.data
    },
    onSuccess: (res) => {
      setShowCreatePropertyRoomFacilityForm(false)
      setDataCreatePropertyRoomFacility({
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
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const [uploadFile, setUploadFile] = useState(false)
  const [countryId, setCountryId] = useState<null | number>(null)
  const [propertyTypeId, setPropertyTypeId] = useState<null | number>(null)
  const [dataPropertyTypes, setDataPropertyTypes] = useState<any>([])
  const [cityList, setCityList] = useState([])
  const [countryList, setCountryList] = useState<any>([])
  const [propertyTypes, setPropertyTypes] = useState([])
  const { isPending: isPendingCities } = useQuery({
    queryKey: ['getCities'],
    queryFn: async () => {
      const res = await instance.get('/city?limit=10000')
      const dataForCityList = res?.data?.data?.cities?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        }
      })
      setCityList(dataForCityList)
      return res
    },
  })
  const { isPending: isPendingCountries } = useQuery({
    queryKey: ['getCountries'],
    queryFn: async () => {
      const res = await instance.get('/country?limit=10000')
      const dataForCountryList = res?.data?.data?.countries?.map(
        (item: any) => {
          return {
            label: item?.name,
            value: item?.id,
          }
        },
      )
      setCountryList(dataForCountryList)
      return res
    },
  })

  const { isPending: isPendingPropertyTypes } = useQuery({
    queryKey: ['getPropertyTypes'],
    queryFn: async () => {
      const res = await instance.get('/property-type/search')
      const dataForPropertyTypes = res?.data?.data?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        }
      })
      setPropertyTypes(dataForPropertyTypes)
      return res
    },
  })

  const [propertyType, setPropertyType] = useState({ name: '', id: '' })
  const {
    mutate: mutateCreatePropertyType,
    isPending: isPendingCreatePropertyType,
  } = useMutation({
    mutationFn: async (values) => {
      const res = await instance.post('/property-type', {
        name: dataCreatePropertyType?.name,
        description: dataCreatePropertyType?.description,
      })
      return res?.data
    },
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
      }, 1500)
    },
    onError: (err: any) => {
      setPropertyType({ name: '', id: '' })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const { mutate: mutateCreateProperty, isPending: isPendingCreateProperty } =
    useMutation({
      mutationFn: async (fd: FormData) => {
        console.log('MUTATIONCREATEPROPERTY')
        const res = await instance.post('/property', fd)
        return res?.data
      },
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
  const [changedCheckbox, setChangedCheckbox] = useState(false)

  return (
    <main className={`w-full md:px-5`}>
      <section className="mx-auto max-w-screen-2xl w-full h-full flex items-start gap-5 px-5 py-5">
        <div className="w-full">
          <Formik
            initialValues={{
              cityId: 0,
              countryId: 0,
              name: '',
              zipCode: '',
              address: '',
              location: '',
              star: 0,
              checkInStartTime: '14:00',
              checkInEndTime: '',
              checkOutStartTime: '',
              checkOutEndTime: '10:00',
              propertyTypeId: 0,
              propertyTypeName: '',
              propertyFacilitiesId: [],
              propertyFacilitiesName: [],
              propertyImages: [] as File[],
              propertyDescription: '',
              neighborhoodDescription: '',
              phoneNumber: '',
              url: '',
              totalRooms: 30,
              propertyRoomTypes: [
                {
                  name: '',
                  capacity: 2,
                  totalRooms: 1,
                  price: 500000,
                  rooms: 1,
                  bathrooms: 1,
                  description: '',
                  roomFacilities: [],
                  roomImages: [] as File[],
                },
              ],
            }}
            validationSchema={createPropertyValidationSchema}
            onSubmit={(values) => {
              console.log('>>>>>>>>>>>')
              const fd = new FormData()
              fd.append('cityId', values?.cityId.toString())
              fd.append('countryId', values?.countryId.toString())
              fd.append('name', values?.name)
              fd.append('star', values?.star.toString())
              fd.append('zipCode', values?.zipCode)
              fd.append('address', values?.address)
              fd.append('location', values?.location)
              fd.append('checkInStartTime', values?.checkInStartTime || '14:00')
              fd.append('checkInEndTime', values?.checkInEndTime)
              fd.append('checkOutStartTime', values?.checkOutStartTime)
              fd.append('checkOutEndTime', values?.checkOutEndTime || '10:00')
              fd.append('propertyTypeId', values?.propertyTypeId.toString())

              fd.append(
                'propertyFacilitiesId',
                JSON.stringify(
                  values?.propertyFacilitiesId.map((item) => ({ id: item })),
                ),
              )
              fd.append(
                'propertyFacilitiesName',
                JSON.stringify(
                  values?.propertyFacilitiesName.map((item) => ({
                    name: item,
                  })),
                ),
              )

              fd.append(
                'countPropertyImages',
                values?.propertyImages.length.toString(),
              )
              fd.append('propertyDescription', values?.propertyDescription)
              fd.append(
                'neighborhoodDescription',
                values?.neighborhoodDescription,
              )
              fd.append('phoneNumber', values?.phoneNumber)
              fd.append('url', values?.url)
              fd.append('totalRooms', values?.totalRooms.toString())
              const propertyRoomTypes = values?.propertyRoomTypes.map(
                (item) => {
                  return {
                    name: item?.name,
                    capacity: item?.capacity,
                    totalRooms: item?.totalRooms,
                    price: item?.price,
                    rooms: item?.rooms,
                    bathrooms: item?.bathrooms,
                    description: item?.description,
                    roomFacilities: item?.roomFacilities,
                    countRoomImages: item?.roomImages.length,
                  }
                },
              )
              fd.append('propertyRoomTypes', JSON.stringify(propertyRoomTypes))
              values?.propertyImages.forEach((item: File) =>
                fd.append('images', item),
              )
              values?.propertyRoomTypes.forEach((item: any) => {
                item?.roomImages.forEach((itm: File) =>
                  fd.append('images', itm),
                )
              })

              mutateCreateProperty(fd)
            }}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form className="flex flex-col gap-10">
                  <section className="flex flex-col gap-5">
                    <hgroup className="flex flex-col mb-5">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Property General Information
                      </h1>
                      <p className="text-sm font-medium text-gray-600">
                        General information is used to describe the entire
                        property
                      </p>
                    </hgroup>
                    <TextInput
                      labelName="Property Name"
                      name="name"
                      type="text"
                      placeholder="Pan Pacific / Westin Hotel"
                    />
                    <section className="flex flex-col gap-1.5 w-full">
                      <section className="flex sm:flex-row flex-col items-start sm:items-center gap-8">
                        {values?.propertyTypeName
                          ?.toLowerCase()
                          .includes('hotel') && (
                          <div className="flex justify-center items-start flex-col gap-1.5 min-w-max relative">
                            <label
                              htmlFor="propertyType"
                              className="text-sm font-bold text-gray-900"
                            >
                              Star
                            </label>
                            <div>
                              <Rate
                                value={values?.star}
                                color="yellow"
                                size="xs"
                                onChangeActive={(value: number) =>
                                  setFieldValue('star', value)
                                }
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex items-end gap-2 w-full">
                          <div className="grid items-center gap-1.5 w-full relative">
                            <label
                              htmlFor="propertyType"
                              className="text-sm font-bold text-gray-900"
                            >
                              Property Type
                            </label>
                            <div>
                              <SelectPicker
                                onChange={(value) => {
                                  setPropertyTypeId(value)
                                  setFieldValue('propertyTypeId', Number(value))
                                  const getPropertyType: any =
                                    propertyTypes.find(
                                      (item: {
                                        value: string | number
                                        label: string
                                      }) =>
                                        Number(item?.value) === Number(value),
                                    )

                                  setFieldValue(
                                    'propertyTypeName',
                                    getPropertyType?.label,
                                  )
                                }}
                                menuClassName="text-sm font-bold text-gray-800"
                                value={propertyTypeId}
                                className="text-gray-600"
                                data={propertyTypes}
                                block
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => setShowFormCreatePropertyType(true)}
                            disabled={Boolean(propertyTypeId)}
                            className="hidden sm:flex items-center gap-1.5 disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                            type="button"
                          >
                            <CiSquarePlus size={21} />
                            Type
                          </button>
                        </div>
                      </section>
                      <button
                        onClick={() => setShowFormCreatePropertyType(true)}
                        disabled={Boolean(propertyTypeId)}
                        className="sm:hidden flex justify-center items-center gap-1.5 disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                        type="button"
                      >
                        <CiSquarePlus size={21} />
                        Type
                      </button>
                      <p className="text-slate-600 text-xs font-bold">
                        If Your property type is missing, click button Add
                        Property Type to add it.
                      </p>
                      <ErrorMessage
                        name="propertyTypeId"
                        component={'div'}
                        className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                      />
                      <ErrorMessage
                        name="star"
                        component={'div'}
                        className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                      />
                    </section>
                    {showFormCreatePropertyType && (
                      <div className="fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] p-5 top-0 left-0 flex items-center justify-center">
                        <div className="bg-white border border-slate-200 max-w-[400px] w-full shadow-md p-5 rounded-md flex flex-col gap-7">
                          <div className="flex items-center justify-end">
                            <IoClose
                              className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                              onClick={() =>
                                setShowFormCreatePropertyType(false)
                              }
                            />
                          </div>
                          <hgroup className="flex flex-col mt-[-10px]">
                            <h1 className="text-lg font-bold text-slate-800">
                              Add Property Type
                            </h1>
                            <p className="text-sm font-light text-gray-500">
                              Can't Find Your Property Type? Build It Here!
                            </p>
                          </hgroup>
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1 ">
                              <label className="text-sm font-bold text-black ml-5">
                                Name
                              </label>
                              <Field
                                id="propertyTypeName"
                                onChange={(e: any) => {
                                  setDataCreatePropertyType((state: any) => {
                                    state.name = e.target.value
                                    return state
                                  })
                                  setChange((state) => !state)
                                }}
                                name="createPropertyTypeName"
                                type="text"
                                placeholder="Hotel / Apartment / Villa"
                                className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                              />
                              <ErrorMessage
                                name="propertyTypeName"
                                component={'div'}
                                className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                              />
                            </div>
                            <div className="flex flex-col gap-1 ">
                              <label className="text-sm font-bold text-black ml-5">
                                Description
                              </label>
                              <Field
                                as="textarea"
                                onChange={(e: any) => {
                                  setDataCreatePropertyType((state: any) => {
                                    state.description = e.target.value
                                    return state
                                  })
                                  setChange((state) => !state)
                                }}
                                id="createPropertyTypeDescription"
                                name="propertyTypeDescription"
                                type="text"
                                placeholder="Highlight its main features and target audience."
                                className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-3xl px-5 py-2 h-[150px]"
                              />
                              <ErrorMessage
                                name="propertyTypeDescription"
                                component={'div'}
                                className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                setShowFormCreatePropertyType(false)
                              }
                              className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              disabled={
                                isPendingCreatePropertyType ||
                                !dataCreatePropertyType?.description ||
                                !dataCreatePropertyType?.name
                              }
                              onClick={() => mutateCreatePropertyType()}
                              className="disabled:bg-slate-300 disabled:text-white flex items-center justify-center disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
                            >
                              Create
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <section
                      id="region"
                      className="flex flex-col gap-5 items-center"
                    >
                      <TextInput
                        labelName="Zip Code"
                        name="zipCode"
                        type="text"
                        placeholder="10332"
                      />
                      <section className="flex flex-col gap-1.5 w-full">
                        <section className="flex items-end gap-2 w-full">
                          <div className="grid items-center gap-1.5 w-full relative">
                            <label
                              htmlFor="city"
                              className="text-sm font-bold text-gray-900"
                            >
                              City
                            </label>
                            <div>
                              <SelectPicker
                                onChange={(value) => {
                                  setCityId(Number(value))
                                  setFieldValue('cityId', Number(value))
                                }}
                                menuClassName="text-sm font-bold text-gray-800"
                                value={cityId}
                                className="text-gray-600"
                                data={cityList}
                                block
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => setShowCreateCity(true)}
                            disabled={Boolean(cityId)}
                            className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition hidden sm:flex items-center gap-1.5 duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                            type="button"
                          >
                            <CiSquarePlus size={21} /> City
                          </button>
                        </section>
                        <button
                          onClick={() => setShowCreateCity(true)}
                          disabled={Boolean(cityId)}
                          className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition sm:hidden justify-center flex items-center gap-1.5 duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                          type="button"
                        >
                          <CiSquarePlus size={21} /> City
                        </button>
                        <p className="text-slate-600 text-xs font-bold">
                          Can't find your city? Simply click button Add City to
                          add it.
                        </p>
                        <ErrorMessage
                          name="cityId"
                          component={'div'}
                          className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                        />
                      </section>
                      <section
                        className={`z-[54] p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${showCreateCity ? 'flex' : 'hidden'} flex-col gap-1 items-center justify-center`}
                      >
                        <div className=" flex flex-col gap-1 items-center justify-center w-full">
                          <div className="max-w-[400px] w-full flex justify-end">
                            <div
                              onClick={() => {
                                setDataCreateCity({
                                  file: [],
                                  name: '',
                                  countryId: null,
                                })
                                setShowCreateCity(false)
                              }}
                              className="bg-white rounded-full flex items-center text-lg text-gray-800 justify-center h-7 w-7 hover:bg-slate-100 hover:cursor-pointer transition duration-100 active:scale-90"
                            >
                              <IoClose />
                            </div>
                          </div>
                          <div className="bg-white  flex flex-col gap-3 shadow-md p-5 max-w-[400px] w-full rounded-md h-fit">
                            <div className="grid items-center gap-1.5 w-full relative">
                              <label
                                htmlFor="createCityName"
                                className="text-sm font-bold text-gray-900"
                              >
                                City Name
                              </label>
                              <input
                                name="createCityName"
                                onChange={(e) => {
                                  setDataCreateCity((state) => {
                                    state.name = e.target.value
                                    return state
                                  })
                                  setChange((state) => !state)
                                }}
                                type="text"
                                id="createCityName"
                                placeholder="Jakarta / New York"
                                className="w-full py-1.5 border-b-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-none focus:outline-none focus:border-blue-600"
                              />
                            </div>
                            <div className="grid items-center gap-1.5 w-full relative">
                              <label
                                htmlFor="country"
                                className="text-sm font-bold text-gray-900"
                              >
                                Country
                              </label>
                              <div className="z-[54]">
                                <select
                                  onChange={(e) => {
                                    setDataCreateCity((state) => {
                                      state.countryId = Number(e.target.value)
                                      return state
                                    })
                                    setChange((state) => !state)
                                  }}
                                  className="select select-bordered select-sm w-full z-[50]"
                                >
                                  <option disabled selected>
                                    Choose a country
                                  </option>
                                  {countryList?.map(
                                    (item: any, index: number) => {
                                      return (
                                        <option
                                          className="w-full"
                                          key={index}
                                          value={item?.value}
                                        >
                                          {item?.label}
                                        </option>
                                      )
                                    },
                                  )}
                                </select>
                              </div>
                            </div>
                            {dataCreateCity?.file[0]?.name ? (
                              <figure className="w-full h-[200px] relative rounded-md overflow-hidden">
                                <Image
                                  src={URL.createObjectURL(
                                    dataCreateCity?.file[0],
                                  )}
                                  width={400}
                                  height={400}
                                  alt=""
                                  className="object-cover w-full h-full"
                                />
                                <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                                  <FaRegTrashCan
                                    onClick={() => {
                                      setDataCreateCity((state) => {
                                        state.file = []
                                        return state
                                      })
                                      setUploadFile((state) => !state)
                                    }}
                                  />
                                </div>
                              </figure>
                            ) : (
                              <label className="border-2 border-gray-300 border-dashed flex flex-col items-center justify-center w-full h-[200px] overflow-hidden rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <IoCloudUploadOutline size={24} />
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    JPG, PNG or JPEG (MAX. 1MB)
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  name="createCityFile"
                                  onChange={(e: any) => {
                                    if (e.target.files[0]) {
                                      setDataCreateCity((state) => {
                                        state.file[0] = e.target.files[0]
                                        return state
                                      })
                                      setUploadFile((state) => !state)
                                    }
                                  }}
                                />
                              </label>
                            )}
                            <div className="flex items-center justify-between w-full gap-1.5">
                              <button
                                onClick={() => {
                                  setShowCreateCity(false)
                                  setDataCreateCity({
                                    file: [],
                                    name: '',
                                    countryId: null,
                                  })
                                }}
                                type="button"
                                className="text-sm flex items-center justify-center font-bold rounded-md p-2 w-full shadow-md text-gray-800 bg-white border border-slate-100 hover:opacity-75 active:scale-95 transition duration-100"
                              >
                                Cancel
                              </button>
                              <button
                                disabled={
                                  !dataCreateCity?.name ||
                                  !dataCreateCity?.countryId ||
                                  !dataCreateCity?.file[0]?.name ||
                                  isPendingCreateCity
                                }
                                onClick={() => {
                                  mutateCreateCity()
                                }}
                                type="button"
                                className="disabled:text-white  justify-center disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-sm font-bold flex items-center gap-1.5 rounded-md p-2 w-full shadow-md text-white bg-gray-800 hover:opacity-75 active:scale-95 transition duration-100"
                              >
                                Add City
                              </button>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="flex flex-col gap-1.5 w-full">
                        <section className="flex items-end gap-2 w-full">
                          <div className="grid items-center gap-1.5 w-full relative">
                            <label
                              htmlFor="country"
                              className="text-sm font-bold text-gray-900"
                            >
                              Country
                            </label>
                            <div>
                              <SelectPicker
                                onChange={(value) => {
                                  setCountryId(value)
                                  setFieldValue('countryId', Number(value))
                                }}
                                menuClassName="text-sm font-bold text-gray-800 z-[53] overflow-hidden"
                                value={countryId}
                                className="text-gray-600"
                                data={countryList}
                                block
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => setShowCreateCountry(true)}
                            disabled={Boolean(countryId)}
                            className="hidden sm:flex items-center gap-1.5 disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                            type="button"
                          >
                            <CiSquarePlus size={21} /> Country
                          </button>
                        </section>
                        <button
                          onClick={() => setShowCreateCountry(true)}
                          disabled={Boolean(countryId)}
                          className="sm:hidden justify-center flex items-center gap-1.5 disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                          type="button"
                        >
                          <CiSquarePlus size={21} /> Country
                        </button>
                        <p className="text-slate-600 text-xs font-bold">
                          Country not listed? Click button Add Country to add it
                          to Our list.
                        </p>
                        <ErrorMessage
                          name="countryId"
                          component={'div'}
                          className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                        />
                      </section>
                      <section
                        className={`z-[52] p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${showCreateCountry ? 'flex' : 'hidden'} flex-col gap-1 items-center justify-center`}
                      >
                        <div className=" flex flex-col gap-1 items-center justify-center w-full">
                          <div className="max-w-[400px] w-full flex justify-end">
                            <div
                              onClick={() => {
                                setDataCreateCountry({
                                  file: [],
                                  name: '',
                                  description: '',
                                })
                                setShowCreateCountry(false)
                              }}
                              className="bg-white rounded-full flex items-center text-lg text-gray-800 justify-center h-7 w-7 hover:bg-slate-100 hover:cursor-pointer transition duration-100 active:scale-90"
                            >
                              <IoClose />
                            </div>
                          </div>
                          <div className="bg-white  flex flex-col gap-3 shadow-md p-5 max-w-[400px] w-full rounded-md h-fit">
                            <div className="grid items-center gap-1.5 w-full relative">
                              <label
                                htmlFor="createCountryName"
                                className="text-sm font-bold text-gray-900"
                              >
                                Country Name
                              </label>
                              <input
                                name="createCountryName"
                                onChange={(e) => {
                                  setDataCreateCountry((state) => {
                                    state.name = e.target.value
                                    return state
                                  })
                                  setUploadFile((state) => !state)
                                }}
                                type="text"
                                id="createCountryName"
                                placeholder="Indonesia"
                                className="w-full py-1.5 border-b-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-none focus:outline-none focus:border-blue-600"
                              />
                            </div>
                            <div className="grid items-center gap-1.5 w-full relative">
                              <label
                                htmlFor="createCountryDescription"
                                className="text-sm font-bold text-gray-900"
                              >
                                Description
                              </label>
                              <textarea
                                name="createCountryDescription"
                                onChange={(e) => {
                                  setDataCreateCountry((state) => {
                                    state.description = e.target.value
                                    return state
                                  })
                                  setUploadFile((state) => !state)
                                }}
                                placeholder="Provide a brief description of the country where your property is located. Include details like the region, culture, or notable landmarks"
                                className="w-full px-2 h-[100px] py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-md focus:outline-none focus:border-blue-600"
                              ></textarea>
                            </div>
                            {dataCreateCountry?.file[0]?.name ? (
                              <figure className="w-full h-[200px] relative rounded-md overflow-hidden">
                                <Image
                                  src={URL.createObjectURL(
                                    dataCreateCountry?.file[0],
                                  )}
                                  width={400}
                                  height={400}
                                  alt=""
                                  className="object-cover w-full h-full"
                                />
                                <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                                  <FaRegTrashCan
                                    onClick={() => {
                                      setDataCreateCountry((state) => {
                                        state.file = []
                                        return state
                                      })
                                      setUploadFile((state) => !state)
                                    }}
                                  />
                                </div>
                              </figure>
                            ) : (
                              <label className="border-2 border-gray-300 border-dashed flex flex-col items-center justify-center w-full h-[200px] overflow-hidden rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <IoCloudUploadOutline size={24} />
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    JPG, PNG or JPEG (MAX. 1MB)
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  name="createCountryFile"
                                  onChange={(e: any) => {
                                    if (e.target.files[0]) {
                                      setDataCreateCountry((state) => {
                                        state.file[0] = e.target.files[0]
                                        return state
                                      })
                                      console.log(dataCreateCountry)
                                      setUploadFile((state) => !state)
                                    }
                                  }}
                                />
                              </label>
                            )}
                            <div className="flex items-center justify-between w-full gap-1.5">
                              <button
                                onClick={() => {
                                  setShowCreateCountry(false)
                                  setDataCreateCountry({
                                    file: [],
                                    name: '',
                                    description: '',
                                  })
                                }}
                                type="button"
                                className="text-sm font-bold rounded-md flex items-center justify-center p-2 w-full shadow-md text-gray-800 bg-white border border-slate-100 hover:opacity-75 active:scale-95 transition duration-100"
                              >
                                Cancel
                              </button>
                              <button
                                disabled={
                                  !dataCreateCountry?.name ||
                                  !dataCreateCountry?.file[0]?.name
                                }
                                onClick={() => mutateCreateCountry()}
                                type="button"
                                className="flex items-center justify-center gap-1.5 disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-sm font-bold rounded-md p-2 w-full shadow-md text-white bg-gray-800 hover:opacity-75 active:scale-95 transition duration-100"
                              >
                                Add Country
                              </button>
                            </div>
                          </div>
                        </div>
                      </section>
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
                  <Separator />
                  <section className="flex flex-col gap-5">
                    <hgroup className="mb-5">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Detail Property Information
                      </h1>
                      <p className="text-sm font-medium text-gray-600">
                        property detail is used to explain in more detail what
                        the property has
                      </p>
                    </hgroup>
                    <TextInput
                      labelName="Total Rooms / Property"
                      name="totalRooms"
                      type="number"
                      placeholder="30"
                    />
                    <section className="flex sm:flex-row flex-col sm:items-center justify-between bg-white shadow-md border border-gray-200 rounded-md p-3">
                      <div className="grid items-center gap-1.5 w-full relative">
                        <label
                          htmlFor="checkInStartTime"
                          className="text-sm font-bold text-gray-900"
                        >
                          Check-In Start Time
                        </label>
                        <Field
                          name="checkInStartTime"
                          type="time"
                          id="checkInStartTime"
                          onChange={(e: any) => {
                            setFieldValue('checkInStartTime', e.target.value)
                            setInputCheckInStartTime(e.target.value)
                          }}
                          defaultValue="14:00"
                          value={inputCheckInStartTime}
                          className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
                        />
                        <ErrorMessage
                          name="checkInStartTime"
                          component={'div'}
                          className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                        />
                      </div>
                      <div className="grid items-center gap-1.5 w-full relative">
                        <label
                          htmlFor="checkInEndTime"
                          className="text-sm font-bold text-gray-900"
                        >
                          Check-In End Time (optional)
                        </label>
                        <Field
                          name="checkInEndTime"
                          type="time"
                          id="checkInEndTime"
                          onChange={(e: any) => {
                            setFieldValue('checkInEndTime', e.target.value)
                            setInputCheckInEndTime(e.target.value)
                          }}
                          value={inputCheckInEndTime}
                          className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
                        />
                        <ErrorMessage
                          name="checkInEndTime"
                          component={'div'}
                          className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                        />
                      </div>
                    </section>
                    <section className="flex sm:flex-row flex-col sm:items-center justify-between bg-white shadow-md border border-gray-200 rounded-md p-3">
                      <div className="grid items-center gap-1.5 w-full relative">
                        <label
                          htmlFor="checkOutStartTime"
                          className="text-sm font-bold text-gray-900"
                        >
                          Check-Out Start Time (optional)
                        </label>
                        <Field
                          name="checkOutStartTime"
                          type="time"
                          id="checkOutStartTime"
                          onChange={(e: any) => {
                            setFieldValue('checkOutStartTime', e.target.value)
                            setInputCheckOutStartTime(e.target.value)
                          }}
                          value={inputCheckOutStartTime}
                          className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
                        />
                        <ErrorMessage
                          name="checkOutStartTime"
                          component={'div'}
                          className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                        />
                      </div>
                      <div className="grid items-center gap-1.5 w-full relative">
                        <label
                          htmlFor="checkOutEndTime"
                          className="text-sm font-bold text-gray-900"
                        >
                          Check-Out End Time
                        </label>
                        <Field
                          name="checkOutEndTime"
                          type="time"
                          id="checkOutEndTime"
                          onChange={(e: any) => {
                            setFieldValue('checkOutEndTime', e.target.value)
                            setInputCheckOutEndTime(e.target.value)
                          }}
                          defaultValue="10:00"
                          value={inputCheckOutEndTime}
                          className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
                        />
                        <ErrorMessage
                          name="checkOutEndTime"
                          component={'div'}
                          className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                        />
                      </div>
                    </section>
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
                        Property facilities will explain to customers what they
                        will get while staying in this property
                      </p>
                      <ErrorMessage
                        name="propertyFacilitiesId"
                        component={'div'}
                        className="mt-1.5 text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                      />
                    </hgroup>
                    <FieldArray name="propertyFacilitiesId">
                      {({ push: pushPropertyFacility }) => (
                        <div className="flex flex-col gap-2 w-full">
                          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
                            {dataPropertyFacilities?.map(
                              (item: any, index: number) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id="terms"
                                      value={item?.id}
                                      name="propertyFacilitesId"
                                      className="scale-90"
                                      onCheckedChange={(e) => {
                                        if (e) {
                                          pushPropertyFacility(item?.id)
                                        } else {
                                          const findIdx =
                                            values.propertyFacilitiesId.findIndex(
                                              (value) => value === item?.id,
                                            )
                                          values.propertyFacilitiesId.splice(
                                            findIdx,
                                            1,
                                          )
                                        }
                                      }}
                                    />
                                    <label className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5">
                                      <figure>
                                        <Image
                                          src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                                          width={100}
                                          height={100}
                                          alt=""
                                          className="h-4 w-4"
                                        />
                                      </figure>
                                      {item?.name}
                                    </label>
                                  </div>
                                )
                              },
                            )}
                          </section>
                        </div>
                      )}
                    </FieldArray>
                    <div
                      onClick={() => setShowCreatePropertyFacilityForm(true)}
                      className="px-3 flex items-center gap-1.5 py-1.5 bg-slate-800 text-xs font-bold w-fit text-white rounded-md shadow-md hover:opacity-70 hover:cursor-pointer active:scale-90 transition duration-100"
                    >
                      <FaPlus className="text-sm" />
                      Add Property Facility
                    </div>
                    <section>
                      {showCreatePropertyFacilityForm && (
                        <div className="fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center">
                          <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-7">
                            <div className="flex items-center justify-end">
                              <IoClose
                                className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                                onClick={() => {
                                  setShowCreatePropertyFacilityForm(false)
                                  setDataCreatePropertyFacility({
                                    name: '',
                                    file: [] as File[],
                                  })
                                }}
                              />
                            </div>
                            <hgroup className="flex flex-col mt-[-10px]">
                              <h1 className="text-lg font-bold text-slate-800">
                                Add Property Facility
                              </h1>
                              <p className="text-sm font-light text-gray-500">
                                Customize Your Stay: Add Any Facility You Need,
                                If It's Not Already on the List!
                              </p>
                            </hgroup>
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-col gap-1 ">
                                <label className="text-sm font-bold text-black ml-5">
                                  Name
                                </label>
                                <Field
                                  id="propertyFacilityName"
                                  onChange={(e: any) => {
                                    setDataCreatePropertyFacility(
                                      (state: any) => {
                                        state.name = e.target.value
                                        return state
                                      },
                                    )
                                    setUploadFile((state) => !state)
                                  }}
                                  name="createPropertyFacilityName"
                                  type="text"
                                  placeholder="Bathtub"
                                  className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                                />
                                {/* <ErrorMessage
                                        name="propertyFacilityName"
                                        component={'div'}
                                        className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                                      /> */}
                              </div>
                              <label className="flex items-center gap-3 text-sm font-bold text-slate-900 justify-start w-full h-full cursor-pointer ">
                                <p className="mb-1 ml-5">Icon</p>
                                <div className="flex items-center justify-between gap-3 w-full rounded-md shadow-md border border-slate-200 bg-white p-2 px-3">
                                  {dataCreatePropertyFacility?.file[0]?.name ? (
                                    <figure className="relative rounded-md overflow-hidden h-12 w-12 border-2 border-slate-600 border-dotted">
                                      <Image
                                        src={URL.createObjectURL(
                                          dataCreatePropertyFacility?.file[0],
                                        )}
                                        width={100}
                                        height={100}
                                        alt=""
                                        className="object-cover w-full h-full"
                                      />
                                    </figure>
                                  ) : (
                                    <div className="flex flex-col border-2 border-dotted border-slate-600 items-center justify-center h-12 w-12 text-slate-400 bg-slate-300 rounded-md hover:bg-slate-400 transition duration-75">
                                      <FaPlus size={24} />
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-xs w-full max-w-xs"
                                    name="createPropertyFacilityIcon"
                                    onChange={(e: any) => {
                                      if (e.target.files[0]) {
                                        setDataCreatePropertyFacility(
                                          (state) => {
                                            state.file[0] = e.target.files[0]
                                            return state
                                          },
                                        )
                                      }
                                      setUploadFile((state: boolean) => !state)
                                    }}
                                  />
                                </div>
                              </label>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowCreatePropertyFacilityForm(false)
                                  setDataCreatePropertyFacility({
                                    name: '',
                                    file: [] as File[],
                                  })
                                }}
                                className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                disabled={
                                  isPendingCreatePropertyFacility ||
                                  !dataCreatePropertyFacility?.name ||
                                  !dataCreatePropertyFacility?.file[0]?.name
                                }
                                onClick={() => mutateCreatePropertyFacility()}
                                className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
                              >
                                Create
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </section>
                  </section>
                  <section className="flex flex-col gap-5">
                    <hgroup className="mb-5">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Property Images
                      </h1>
                      <p className="text-sm font-medium text-gray-600">
                        Showcase Your Space: Stunning Property Images for
                        Renters{' '}
                      </p>
                      <ErrorMessage
                        name="propertyImages"
                        component={'div'}
                        className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                      />
                    </hgroup>
                    <FieldArray name="propertyImages">
                      {({
                        insert: insertFilePropertyImage,
                        remove: removeFilePropertyImage,
                      }) => (
                        <section className="grid grid-cols-4 gap-5">
                          <div className="flex items-center justify-center 2xl:col-[1/4] 2xl:row-[1/3] col-span-4 w-full h-[150px] md:h-[320px] 2xl:h-[420px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg">
                            {Boolean(values?.propertyImages[0]?.['name']) ? (
                              <figure className="w-full h-full relative">
                                <Image
                                  src={URL.createObjectURL(
                                    values.propertyImages[0],
                                  )}
                                  width={1000}
                                  height={1000}
                                  alt=""
                                  className="object-cover w-full h-full"
                                />
                                <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                                  <FaRegTrashCan
                                    onClick={() => removeFilePropertyImage(0)}
                                  />
                                </div>
                              </figure>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <IoCloudUploadOutline size={28} />
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    JPG, PNG or JPEG (MAX. 1MB)
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  name={`propertyImages[0]`}
                                  onChange={(e: any) => {
                                    if (e.currentTarget.files[0]) {
                                      insertFilePropertyImage(
                                        0,
                                        e.currentTarget.files[0],
                                      )
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </div>
                          {Array.from({ length: 2 }).map(
                            (_, imageIdx: number) => {
                              return (
                                <div
                                  key={imageIdx}
                                  className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg"
                                >
                                  {Boolean(
                                    values?.propertyImages[imageIdx + 1]?.[
                                      'name'
                                    ],
                                  ) ? (
                                    <figure className="w-full h-full relative">
                                      <Image
                                        src={URL.createObjectURL(
                                          values.propertyImages[imageIdx + 1],
                                        )}
                                        width={1000}
                                        height={1000}
                                        alt=""
                                        className="object-cover w-full h-full"
                                      />
                                      <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                                        <FaRegTrashCan
                                          onClick={() =>
                                            removeFilePropertyImage(
                                              imageIdx + 1,
                                            )
                                          }
                                        />
                                      </div>
                                    </figure>
                                  ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <IoCloudUploadOutline size={28} />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                          <span className="font-semibold">
                                            Click to upload
                                          </span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                          JPG, PNG or JPEG (MAX. 1MB)
                                        </p>
                                      </div>
                                      <input
                                        type="file"
                                        className="hidden"
                                        name={`propertyImages[${imageIdx + 1}]`}
                                        onChange={(e: any) => {
                                          if (e.currentTarget.files[0]) {
                                            insertFilePropertyImage(
                                              imageIdx + 1,
                                              e.currentTarget.files[0],
                                            )
                                          }
                                        }}
                                      />
                                    </label>
                                  )}
                                </div>
                              )
                            },
                          )}
                          {Array.from({ length: 4 }).map(
                            (_, imageIdx: number) => {
                              return (
                                <div
                                  key={imageIdx}
                                  className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg"
                                >
                                  {Boolean(
                                    values?.propertyImages[imageIdx + 3]?.[
                                      'name'
                                    ],
                                  ) ? (
                                    <figure className="w-full h-full relative">
                                      <Image
                                        src={URL.createObjectURL(
                                          values?.propertyImages[imageIdx + 3],
                                        )}
                                        width={1000}
                                        height={1000}
                                        alt=""
                                        className="object-cover w-full h-full"
                                      />
                                      <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                                        <FaRegTrashCan
                                          onClick={() =>
                                            removeFilePropertyImage(
                                              imageIdx + 3,
                                            )
                                          }
                                        />
                                      </div>
                                    </figure>
                                  ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <IoCloudUploadOutline size={28} />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                          <span className="font-semibold">
                                            Click to upload
                                          </span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                          JPG, PNG or JPEG (MAX. 1MB)
                                        </p>
                                      </div>
                                      <input
                                        type="file"
                                        className="hidden"
                                        name={`propertyImages[${imageIdx + 3}]`}
                                        onChange={(e: any) => {
                                          if (e.currentTarget.files[0]) {
                                            insertFilePropertyImage(
                                              imageIdx + 3,
                                              e.currentTarget.files[0],
                                            )
                                          }
                                        }}
                                      />
                                    </label>
                                  )}
                                </div>
                              )
                            },
                          )}
                        </section>
                      )}
                    </FieldArray>
                  </section>
                  <section className="flex flex-col gap-5">
                    <hgroup>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Room Type
                      </h1>
                      <p className="text-sm font-medium text-gray-600">
                        Room types are used to provide customers with choices
                        for several types in one property
                      </p>
                    </hgroup>
                    {}
                    <FieldArray name="propertyRoomTypes">
                      {({ push, remove }) => (
                        <div className="w-full flex flex-col gap-5">
                          <section className="py-5 flex gap-5 items-center flex-wrap">
                            {values.propertyRoomTypes.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex gap-5 items-center px-5 py-2 rounded-full border-2 border-slate-900 bg-white relative"
                                >
                                  <h1 className="text-sm font-bold text-gray-800">
                                    {values.propertyRoomTypes[index].name ||
                                      `Room type ${index + 1}`}
                                  </h1>
                                  <CiTrash
                                    className="text-red-600 hover:cursor-pointer hover:opacity-60 active:scale-90 transition duration-100 text-lg"
                                    onClick={() => {
                                      if (
                                        values.propertyRoomTypes.length <= 1
                                      ) {
                                        toast.error(
                                          'Minimum 1 room type required',
                                        )
                                      } else {
                                        remove(index)
                                        setRoomFacilities((state: any) => {
                                          state.splice(index, 1)
                                          return state
                                        })
                                      }
                                    }}
                                  />
                                </div>
                              )
                            })}
                            <div
                              onClick={() => {
                                push({
                                  name: '',
                                  capacity: 1,
                                  totalRooms: 1,
                                  rooms: 1,
                                  bathrooms: 1,
                                  description: '',
                                  roomFacilities: [],
                                  roomImages: [],
                                })
                              }}
                              className="flex gap-5 items-center px-5 py-2 rounded-full border-2 border-slate-900 bg-slate-900 text-white hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100"
                            >
                              <h1 className="text-sm font-bold">
                                Add Room Type
                              </h1>
                              <FiPlus className="text-base" />
                            </div>
                          </section>
                          <section className="flex flex-col gap-7">
                            {values.propertyRoomTypes.map((_, index) => {
                              return (
                                <div className="w-full flex flex-col gap-3">
                                  <hgroup className="text-xl font-bold">
                                    <h1>
                                      {values.propertyRoomTypes[index].name ||
                                        `Room type ${index + 1}`}
                                    </h1>
                                  </hgroup>
                                  <Tabs
                                    defaultValue="roomGeneralInfo"
                                    className="w-full"
                                  >
                                    <TabsList className="grid w-full h-[8em] grid-cols-1 md:h-[4em] lg:h-fit md:grid-cols-2 lg:grid-cols-4">
                                      <TabsTrigger value="roomGeneralInfo">
                                        Room General Information
                                      </TabsTrigger>
                                      <TabsTrigger value="roomDetailInfo">
                                        Room Details
                                      </TabsTrigger>
                                      <TabsTrigger value="roomFacilities">
                                        Room Facilities
                                      </TabsTrigger>
                                      <TabsTrigger value="roomImages">
                                        Room Images
                                      </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="roomGeneralInfo">
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg font-bold text-gray-900">
                                            Room General Information
                                          </CardTitle>
                                          <CardDescription className="text-sm font-medium text-gray-600">
                                            Describe the room type as a whole
                                          </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                          <TextInputForTabs
                                            labelName="Name"
                                            name={`propertyRoomTypes.${index}.name`}
                                            type="text"
                                            placeholder="Suite Oceanview"
                                          />
                                          <TextInputForTabs
                                            labelName="Guest Capacity"
                                            name={`propertyRoomTypes.${index}.capacity`}
                                            type="number"
                                            placeholder="2"
                                          />
                                          <TextInputForTabs
                                            labelName="How many total of this room in this property?"
                                            name={`propertyRoomTypes.${index}.totalRooms`}
                                            type="number"
                                            placeholder="Minimum is 1"
                                          />
                                          <TextInputForTabs
                                            labelName="Room price"
                                            name={`propertyRoomTypes.${index}.price`}
                                            type="number"
                                            placeholder="Rp500000"
                                          />
                                        </CardContent>
                                      </Card>
                                    </TabsContent>
                                    <TabsContent value="roomDetailInfo">
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg font-bold text-gray-900">
                                            Room Details
                                          </CardTitle>
                                          <CardDescription className="text-sm font-medium text-gray-600">
                                            To explain detailed information
                                            regarding the room
                                          </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                          <TextInputForTabs
                                            labelName="How Many Rooms in this room?"
                                            name={`propertyRoomTypes.${index}.rooms`}
                                            type="number"
                                            placeholder="If you had many rooms in this Room Type (default is 1)"
                                          />
                                          <TextInputForTabs
                                            labelName="Bathrooms"
                                            name={`propertyRoomTypes.${index}.bathrooms`}
                                            type="number"
                                            placeholder="If you had many bathrooms in this Room Type (default is 1)"
                                          />
                                          <TextAreaCustom
                                            labelName="Description"
                                            placeholder={`Describe your room preferences here. Please include details such as bed type, room features (e.g., balcony, view), amenities (e.g., Wi-Fi, TV, mini-fridge), and any special requests (e.g., extra pillows, early check-in).`}
                                            name={`propertyRoomTypes.${index}.description`}
                                          />
                                        </CardContent>
                                      </Card>
                                    </TabsContent>
                                    <TabsContent value="roomFacilities">
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg font-bold text-gray-900">
                                            Room Facilities
                                          </CardTitle>
                                          <CardDescription className="text-sm font-medium text-gray-600">
                                            Explain the facilities the room has
                                          </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                          <ErrorMessage
                                            name={`propertyRoomTypes.${index}.roomFacilities`}
                                            component={'div'}
                                            className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                                          />
                                          <FieldArray
                                            name={`propertyRoomTypes.${index}.roomFacilities`}
                                          >
                                            {({ push: pushRoomFacility }) => (
                                              <section className="flex flex-col gap-10 w-full">
                                                <section className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 w-full gap-6">
                                                  {dataRoomFacilities?.map(
                                                    (
                                                      roomFacility: any,
                                                      indexRoomFacility: number,
                                                    ) => {
                                                      return (
                                                        <div
                                                          key={
                                                            indexRoomFacility
                                                          }
                                                          className="flex items-center space-x-2"
                                                        >
                                                          <Checkbox
                                                            checked={
                                                              values.propertyRoomTypes[
                                                                index
                                                              ].roomFacilities.findIndex(
                                                                (value: any) =>
                                                                  value ===
                                                                  roomFacility?.id,
                                                              ) > -1
                                                            }
                                                            id={
                                                              roomFacility?.id
                                                            }
                                                            value={
                                                              roomFacility?.id
                                                            }
                                                            name={`propertyRoomTypes.${index}.roomFacilities.${indexRoomFacility}`}
                                                            onCheckedChange={(
                                                              e: boolean,
                                                            ) => {
                                                              if (e) {
                                                                pushRoomFacility(
                                                                  roomFacility?.id,
                                                                )
                                                              } else {
                                                                const findIdx =
                                                                  values.propertyRoomTypes[
                                                                    index
                                                                  ].roomFacilities.findIndex(
                                                                    (
                                                                      value: any,
                                                                    ) =>
                                                                      value ===
                                                                      roomFacility?.id,
                                                                  )
                                                                values.propertyRoomTypes[
                                                                  index
                                                                ].roomFacilities.splice(
                                                                  findIdx,
                                                                  1,
                                                                )
                                                                setChangedCheckbox(
                                                                  (state) =>
                                                                    !state,
                                                                )
                                                              }
                                                            }}
                                                            className="scale-90"
                                                          />
                                                          <label className="flex items-center gap-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                            <figure>
                                                              <Image
                                                                src={`http://localhost:5000/api/${roomFacility?.iconDirectory}/${roomFacility?.iconFilename}.${roomFacility?.iconFileExtension}`}
                                                                width={100}
                                                                height={100}
                                                                alt=""
                                                                className="h-4 w-4"
                                                              />
                                                            </figure>
                                                            {roomFacility?.name}
                                                          </label>
                                                        </div>
                                                      )
                                                    },
                                                  )}
                                                </section>
                                                <div
                                                  onClick={() =>
                                                    setShowCreatePropertyRoomFacilityForm(
                                                      true,
                                                    )
                                                  }
                                                  className="px-3 flex items-center gap-1.5 py-1.5 bg-slate-800 text-xs font-bold w-fit text-white rounded-md shadow-md hover:opacity-70 hover:cursor-pointer active:scale-90 transition duration-100 mt-[-15px]"
                                                >
                                                  <FaPlus className="text-sm" />
                                                  Add Room Facility
                                                </div>
                                                <section>
                                                  {showCreatePropertyRoomFacilityForm && (
                                                    <div className="fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center">
                                                      <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-7">
                                                        <div className="flex items-center justify-end">
                                                          <IoClose
                                                            className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                                                            onClick={() => {
                                                              setShowCreatePropertyRoomFacilityForm(
                                                                false,
                                                              )
                                                              setDataCreatePropertyRoomFacility(
                                                                {
                                                                  name: '',
                                                                  file: [] as File[],
                                                                },
                                                              )
                                                            }}
                                                          />
                                                        </div>
                                                        <hgroup className="flex flex-col mt-[-10px]">
                                                          <h1 className="text-lg font-bold text-slate-800">
                                                            Add Room Facility
                                                          </h1>
                                                          <p className="text-sm font-light text-gray-500">
                                                            Customize Your
                                                            Space: Add New Room
                                                            Facilities to Fit
                                                            Your Needs!
                                                          </p>
                                                        </hgroup>
                                                        <div className="flex flex-col gap-3">
                                                          <div className="flex flex-col gap-1 ">
                                                            <label className="text-sm font-bold text-black ml-5">
                                                              Name
                                                            </label>
                                                            <Field
                                                              id="propertyRoomFacilityName"
                                                              onChange={(
                                                                e: any,
                                                              ) => {
                                                                setDataCreatePropertyRoomFacility(
                                                                  (
                                                                    state: any,
                                                                  ) => {
                                                                    state.name =
                                                                      e.target.value
                                                                    return state
                                                                  },
                                                                )
                                                                setUploadFile(
                                                                  (state) =>
                                                                    !state,
                                                                )
                                                              }}
                                                              name="createPropertyRoomFacilityName"
                                                              type="text"
                                                              placeholder="Bathtub"
                                                              className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                                                            />
                                                            <ErrorMessage
                                                              name="propertyRoomFacilityName"
                                                              component={'div'}
                                                              className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                                                            />
                                                          </div>
                                                          <label className="flex items-center gap-3 text-sm font-bold text-slate-900 justify-start w-full h-full cursor-pointer ">
                                                            <p className="mb-1 ml-5">
                                                              Icon
                                                            </p>
                                                            <div className="flex items-center justify-between gap-3 w-full rounded-md shadow-md border border-slate-200 bg-white p-2 px-3">
                                                              {dataCreatePropertyRoomFacility
                                                                ?.file[0]
                                                                ?.name ? (
                                                                <figure className="relative rounded-md overflow-hidden h-12 w-12 border-2 border-slate-600 border-dotted">
                                                                  <Image
                                                                    src={URL.createObjectURL(
                                                                      dataCreatePropertyRoomFacility
                                                                        ?.file[0],
                                                                    )}
                                                                    width={100}
                                                                    height={100}
                                                                    alt=""
                                                                    className="object-cover w-full h-full"
                                                                  />
                                                                </figure>
                                                              ) : (
                                                                <div className="flex flex-col border-2 border-dotted border-slate-600 items-center justify-center h-12 w-12 text-slate-400 bg-slate-300 rounded-md hover:bg-slate-400 transition duration-75">
                                                                  <FaPlus
                                                                    size={24}
                                                                  />
                                                                </div>
                                                              )}
                                                              <input
                                                                type="file"
                                                                className="file-input file-input-bordered file-input-xs w-full max-w-xs"
                                                                name="createPropertyRoomFacilityIcon"
                                                                onChange={(
                                                                  e: any,
                                                                ) => {
                                                                  if (
                                                                    e.target
                                                                      .files[0]
                                                                  ) {
                                                                    setDataCreatePropertyRoomFacility(
                                                                      (
                                                                        state,
                                                                      ) => {
                                                                        state.file[0] =
                                                                          e.target.files[0]
                                                                        return state
                                                                      },
                                                                    )
                                                                  }
                                                                  setUploadFile(
                                                                    (
                                                                      state: boolean,
                                                                    ) => !state,
                                                                  )
                                                                }}
                                                              />
                                                            </div>
                                                          </label>
                                                        </div>
                                                        <div className="flex items-center gap-2 justify-end">
                                                          <button
                                                            type="button"
                                                            onClick={() => {
                                                              setShowCreatePropertyRoomFacilityForm(
                                                                false,
                                                              )
                                                              setDataCreatePropertyRoomFacility(
                                                                {
                                                                  name: '',
                                                                  file: [] as File[],
                                                                },
                                                              )
                                                            }}
                                                            className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                                                          >
                                                            Cancel
                                                          </button>
                                                          <button
                                                            type="button"
                                                            disabled={
                                                              isPendingCreatePropertyRoomFacility ||
                                                              !dataCreatePropertyRoomFacility?.name ||
                                                              !dataCreatePropertyRoomFacility
                                                                ?.file[0]?.name
                                                            }
                                                            onClick={() =>
                                                              mutateCreatePropertyRoomFacility()
                                                            }
                                                            className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
                                                          >
                                                            Create
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
                                                </section>
                                              </section>
                                            )}
                                          </FieldArray>
                                        </CardContent>
                                      </Card>
                                    </TabsContent>
                                    <TabsContent value="roomImages">
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg font-bold text-gray-900">
                                            Room Images
                                          </CardTitle>
                                          <CardDescription className="text-sm font-medium text-gray-600">
                                            Room images will be displayed when
                                            customers are exploring your
                                            property detail
                                          </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                          <ErrorMessage
                                            name={`propertyRoomTypes[${index}].roomImages`}
                                            component={'div'}
                                            className="text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5"
                                          />
                                          <FieldArray
                                            name={`propertyRoomTypes[${index}].roomImages`}
                                          >
                                            {({
                                              insert: insertFile,
                                              remove: removeFile,
                                              push: pushFile,
                                            }) => (
                                              <section className="flex flex-col gap-5 mb-8 mt-3">
                                                <div className="flex items-center justify-center w-full h-[150px] lg:h-[420px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg">
                                                  {Boolean(
                                                    values?.propertyRoomTypes[
                                                      index
                                                    ]?.roomImages[0]?.['name'],
                                                  ) ? (
                                                    <figure className="w-full h-full relative">
                                                      <Image
                                                        src={URL.createObjectURL(
                                                          values
                                                            ?.propertyRoomTypes[
                                                            index
                                                          ]?.roomImages[0],
                                                        )}
                                                        width={1000}
                                                        height={1000}
                                                        alt=""
                                                        className="object-cover w-full h-full"
                                                      />
                                                      <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                                                        <FaRegTrashCan
                                                          onClick={() =>
                                                            removeFile(0)
                                                          }
                                                        />
                                                      </div>
                                                    </figure>
                                                  ) : (
                                                    <label className="flex flex-col items-center justify-center w-full h-full  cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <IoCloudUploadOutline
                                                          size={28}
                                                        />
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                          <span className="font-semibold">
                                                            Click to upload
                                                          </span>
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                          JPG, PNG or JPEG (MAX.
                                                          1MB)
                                                        </p>
                                                      </div>
                                                      <input
                                                        type="file"
                                                        className="hidden"
                                                        name={`propertyRoomTypes[${index}].roomImages[0]`}
                                                        onChange={(e: any) => {
                                                          if (
                                                            e.currentTarget
                                                              .files[0]
                                                          ) {
                                                            insertFile(
                                                              0,
                                                              e.currentTarget
                                                                .files[0],
                                                            )
                                                          }
                                                          console.log(values)
                                                        }}
                                                      />
                                                    </label>
                                                  )}
                                                </div>
                                                <section className="grid grid-cols-4 gap-5">
                                                  {Array.from({
                                                    length: 4,
                                                  }).map(
                                                    (_, imageIdx: number) => {
                                                      return (
                                                        <div
                                                          key={imageIdx}
                                                          className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px] overflow-hidden border-2 border-gray-300 border-dashed rounded-lg"
                                                        >
                                                          {Boolean(
                                                            values
                                                              ?.propertyRoomTypes[
                                                              index
                                                            ]?.roomImages[
                                                              imageIdx + 1
                                                            ]?.['name'],
                                                          ) ? (
                                                            <figure className="w-full h-full relative">
                                                              <Image
                                                                src={URL.createObjectURL(
                                                                  values
                                                                    .propertyRoomTypes[
                                                                    index
                                                                  ].roomImages[
                                                                    imageIdx + 1
                                                                  ],
                                                                )}
                                                                width={1000}
                                                                height={1000}
                                                                alt=""
                                                                className="object-cover w-full h-full"
                                                              />
                                                              <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                                                                <FaRegTrashCan
                                                                  onClick={() =>
                                                                    removeFile(
                                                                      imageIdx +
                                                                        1,
                                                                    )
                                                                  }
                                                                />
                                                              </div>
                                                            </figure>
                                                          ) : (
                                                            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <IoCloudUploadOutline
                                                                  size={28}
                                                                />
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                  <span className="font-semibold">
                                                                    Click to
                                                                    upload
                                                                  </span>{' '}
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                  JPG, PNG or
                                                                  JPEG (MAX.
                                                                  1MB)
                                                                </p>
                                                              </div>
                                                              <input
                                                                type="file"
                                                                className="hidden"
                                                                name={`propertyRoomTypes[${index}].roomImages[${imageIdx + 1}]`}
                                                                onChange={(
                                                                  e: any,
                                                                ) => {
                                                                  if (
                                                                    e
                                                                      .currentTarget
                                                                      .files[0]
                                                                  ) {
                                                                    insertFile(
                                                                      imageIdx +
                                                                        1,
                                                                      e
                                                                        .currentTarget
                                                                        .files[0],
                                                                    )
                                                                  }
                                                                }}
                                                              />
                                                            </label>
                                                          )}
                                                        </div>
                                                      )
                                                    },
                                                  )}
                                                </section>
                                              </section>
                                            )}
                                          </FieldArray>
                                        </CardContent>
                                      </Card>
                                    </TabsContent>
                                  </Tabs>
                                </div>
                              )
                            })}
                          </section>
                        </div>
                      )}
                    </FieldArray>
                  </section>
                  <button
                    type="submit"
                    className="rounded-full py-3 flex items-center gap-1.5 justify-center w-full transition duration-100 bg-black hover:opacity-75 active:scale-95 text-white text-sm font-bold"
                  >
                    Create Property
                  </button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </section>
    </main>
  )
}

export default CreatePropertyPage
