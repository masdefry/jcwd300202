'use client'

import React, { useState, useRef } from 'react'
import { Formik, Form, Field, FieldArray, insert, ErrorMessage } from 'formik'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import TextInput from '@/features/tenant/property/create/components/TextInput'
import { Textarea } from '@/components/ui/textarea'
import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import Separator from '@/features/auth/components/Separator'
import { Checkbox } from '@/components/ui/checkbox'
import { FiPlus } from 'react-icons/fi'
import { CiTrash } from 'react-icons/ci'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'
import { GiModernCity } from 'react-icons/gi'
import { FaMountainCity } from 'react-icons/fa6'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import TextInputForTabs from '@/features/tenant/property/create/components/TextInputForTabs'
import { MultiSelect } from 'primereact/multiselect'
import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import toast from 'react-hot-toast'
import { AnyARecord } from 'dns'
import { url } from 'inspector'
import { FaRegBuilding, FaRegTrashCan } from 'react-icons/fa6'
import { BsBuildingSlash } from 'react-icons/bs'

const CreatePropertyPage = () => {
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
  const [dataCreatePropertyType, setDataCreatePropertyType] = useState({
    name: '',
    description: '',
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
  const [dataPropertyTypes, setDataPropertyTypes] = useState<any>([])
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

  const { mutate: mutateGetCities } = useMutation({
    mutationFn: async (value: string) => {
      const res = await instance.get(`/city?cityName=${value}`)
      console.log(res)
      return res
    },
    onSuccess: (res) => {
      if (res?.data?.data?.cities.length > 0) {
        setDataCities(res?.data?.data?.cities)
      } else {
        const notFound = [{ name: 'City not found', id: '' }]
        setDataCities(notFound)
      }
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.message || 'Connection error!')
    },
  })

  const { mutate: mutateGetCountries } = useMutation({
    mutationFn: async (value: string) => {
      const res = await instance.get(`/country?countryName=${value}`)
      console.log(res)
      return res
    },
    onSuccess: (res) => {
      if (res?.data?.data?.countries.length > 0) {
        setDataCountries(res?.data?.data?.countries)
      } else {
        const notFound = [{ name: 'Country not found', id: '' }]
        setDataCountries(notFound)
      }
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.message || 'Connection error!')
    },
  })

  const { mutate: mutateCreateProperty, isPending: isPendingCreateProperty } =
    useMutation({
      mutationFn: async (fd: FormData) => {
        const res = await instance.post('/property', fd)
        console.log('MUTATIONCREATEPROPERTY')
        return res
      },
      onSuccess: (res) => {
        console.log(res)
      },
      onError: (err) => {
        console.log(err)
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
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const [city, setCity] = useState({ name: '', id: '' })
  const [country, setCountry] = useState({ name: '', id: '' })
  const [changedCheckbox, setChangedCheckbox] = useState(false)

  return (
    <main className="w-full p-5">
      <section className="mx-auto max-w-screen-2xl w-full h-full flex items-start gap-5 px-5 py-5">
        <div className="w-full">
          <Formik
            initialValues={{
              cityName: '',
              countryName: '',
              cityId: 0,
              countryId: 0,
              name: '',
              zipCode: '',
              address: '',
              location: '',
              checkInStartTime: '14:00',
              checkInEndTime: '',
              checkOutStartTime: '10:00',
              checkOutEndTime: '',
              propertyTypeId: 0,
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
                  roomImages: [],
                },
              ],
            }}
            onSubmit={(values) => {
              console.log('SUBMIT', values)
              const fd = new FormData()
              fd.append('cityName', values?.cityName)
              fd.append('countryName', values?.countryName)
              fd.append('cityId', values?.cityId.toString())
              fd.append('countryId', values?.countryId.toString())
              fd.append('name', values?.name)
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
            {({ values, setFieldValue }) => (
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
                  <div className="grid items-center gap-1.5 w-full relative">
                    <Label
                      htmlFor="propertyType"
                      className="text-sm font-bold text-gray-900"
                    >
                      Property Type
                    </Label>
                    <div className="flex items-center">
                      <input
                        onChange={(e) => {
                          handleInputPropertyType(e)
                          if (e.target.value.length > 2) {
                            mutateGetPropertyTypes(e.target.value)
                          } else if (e.target.value.length <= 0) {
                            setDataPropertyTypes([])
                          } else {
                            const notFound = [
                              { name: 'Minimum 3 characters', id: '' },
                            ]
                            setDataPropertyTypes(notFound)
                          }
                        }}
                        name="propertyType"
                        value={inputPropertyType}
                        type="text"
                        id="propertyType"
                        placeholder={
                          propertyType?.name ? '' : 'Hotel / Apartment'
                        }
                        className="w-full py-1.5 border-b-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-none focus:outline-none focus:border-blue-600"
                      />
                      <button
                        onClick={() => setShowFormCreatePropertyType(true)}
                        disabled={Boolean(propertyType?.name)}
                        className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-r-full bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                        type="button"
                      >
                        Add new
                      </button>
                    </div>
                    {dataPropertyTypes && dataPropertyTypes.length > 0 && (
                      <ul
                        id="property-type-list"
                        className="bg-white z-[51] absolute top-[65px] w-full flex flex-col rounded-md text-sm text-gray-800 border-2 border-gray-900 overflow-hidden"
                      >
                        {dataPropertyTypes &&
                          dataPropertyTypes.length > 0 &&
                          dataPropertyTypes.map((item: any, index: number) => {
                            return (
                              <li
                                className={`px-5 py-2 ${item?.id ? 'hover:bg-gray-800 hover:text-white hover:cursor-pointer' : 'bg-gray-300 text-gray-600'} flex items-center gap-1.5 active:opacity-80 transition duration-100`}
                                onClick={() => {
                                  if (item?.id) {
                                    setPropertyType({
                                      name: item?.name,
                                      id: item?.id,
                                    })
                                    handleClearInputPropertyType()
                                    setDataPropertyTypes([])
                                    setFieldValue('propertyTypeId', item?.id)
                                  }
                                }}
                              >
                                {item?.id ? (
                                  <FaRegBuilding className="text-base text-gray-600" />
                                ) : (
                                  <BsBuildingSlash className="text-base" />
                                )}
                                {item?.name}
                              </li>
                            )
                          })}
                      </ul>
                    )}
                    {propertyType?.name && (
                      <div className="absolute top-[25px] border-2 border-slate-600 py-1 px-3 flex items-center gap-1.5 text-sm font-bold text-gray-800 rounded-full bg-white w-fit">
                        <FaRegBuilding className="text-base text-gray-600" />
                        {propertyType?.name}
                        <IoClose
                          className="text-base ml-2 hover:cursor-pointer hover:opacity-60"
                          onClick={() => {
                            setPropertyType({ name: '', id: '' })
                            setFieldValue('propertyTypeId', null)
                          }}
                        />
                      </div>
                    )}
                    <section>
                      {showFormCreatePropertyType && (
                        <div className="fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center">
                          <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-7">
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
                                disabled={isPendingCreatePropertyType}
                                onClick={() => mutateCreatePropertyType()}
                                className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
                              >
                                Create
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </section>
                  </div>

                  <section
                    id="region"
                    className="flex flex-col xl:flex-row gap-5 items-center"
                  >
                    <TextInput
                      labelName="Zip Code"
                      name="zipCode"
                      type="text"
                      placeholder="10332"
                    />
                    <div className="grid items-center gap-1.5 w-full relative">
                      <Label
                        htmlFor="city"
                        className="text-sm font-bold text-gray-900"
                      >
                        City
                      </Label>
                      <div className="flex items-center">
                        <input
                          onChange={(e) => {
                            handleInputCity(e)
                            if (e.target.value.length > 2) {
                              mutateGetCities(e.target.value)
                            } else if (e.target.value.length <= 0) {
                              setDataCities([])
                            } else {
                              const notFound = [
                                { name: 'Minimum 3 characters', id: '' },
                              ]
                              setDataCities(notFound)
                            }
                          }}
                          name="city"
                          value={inputCity}
                          type="text"
                          id="city"
                          placeholder={city?.name ? '' : 'Jakarta / New York'}
                          className="w-full py-1.5 border-b-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-none focus:outline-none focus:border-blue-600"
                        />
                        <button
                          onClick={() => {
                            setCity({ name: inputCity, id: '' })
                            handleClearInputCity()
                            setFieldValue('cityName', inputCity)
                          }}
                          disabled={Boolean(city?.name)}
                          className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-r-full bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                          type="button"
                        >
                          Add
                        </button>
                      </div>
                      {dataCities && dataCities.length > 0 && (
                        <ul
                          id="city-list"
                          className="bg-white z-[51] absolute top-[65px] w-full flex flex-col rounded-md text-sm text-gray-800 border-2 border-gray-900 overflow-hidden"
                        >
                          {dataCities &&
                            dataCities.length > 0 &&
                            dataCities.map((item: any, index: number) => {
                              return (
                                <li
                                  className={`px-5 py-2 ${item?.id ? 'hover:bg-gray-800 hover:text-white hover:cursor-pointer' : 'bg-gray-300 text-gray-600'} flex items-center gap-1.5 active:opacity-80 transition duration-100`}
                                  onClick={() => {
                                    if (item?.id) {
                                      setCity({
                                        name: item?.name,
                                        id: item?.id,
                                      })
                                      handleClearInputCity()
                                      setDataCities([])
                                      setFieldValue('cityName', item?.name)
                                      setFieldValue('cityId', item?.id)
                                    }
                                  }}
                                >
                                  {item?.id ? (
                                    <GiModernCity className="text-base text-gray-600" />
                                  ) : (
                                    <BsBuildingSlash className="text-base" />
                                  )}
                                  {item?.name}
                                </li>
                              )
                            })}
                        </ul>
                      )}
                      {city?.name && (
                        <div className="absolute top-[25px] border-2 border-slate-600 py-1 px-3 flex items-center gap-1.5 text-sm font-bold text-gray-800 rounded-full bg-white w-fit">
                          <GiModernCity className="text-base text-gray-600" />
                          {city?.name}
                          <IoClose
                            className="text-base ml-2 hover:cursor-pointer hover:opacity-60"
                            onClick={() => {
                              setCity({ name: '', id: '' })
                              setFieldValue('cityName', '')
                              setFieldValue('cityId', null)
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid items-center gap-1.5 w-full relative">
                      <Label
                        htmlFor="country"
                        className="text-sm font-bold text-gray-900"
                      >
                        Country
                      </Label>
                      <div className="flex items-center">
                        <input
                          onChange={(e) => {
                            handleInputCountry(e)
                            if (e.target.value.length > 2) {
                              mutateGetCountries(e.target.value)
                            } else if (e.target.value.length <= 0) {
                              setDataCountries([])
                            } else {
                              const notFound = [
                                { name: 'Minimum 3 characters', id: '' },
                              ]
                              setDataCountries(notFound)
                            }
                          }}
                          name="country"
                          value={inputCountry}
                          type="text"
                          id="country"
                          placeholder={country?.name ? '' : 'Indonesia'}
                          className="w-full py-1.5 border-b-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-none focus:outline-none focus:border-blue-600"
                        />
                        <button
                          onClick={() => {
                            setCountry({ name: inputCountry, id: '' })
                            handleClearInputCountry()
                            setFieldValue('countryName', inputCountry)
                          }}
                          disabled={Boolean(country?.name)}
                          className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-r-full bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                          type="button"
                        >
                          Add
                        </button>
                      </div>
                      {dataCountries && dataCountries.length > 0 && (
                        <ul
                          id="country-list"
                          className="bg-white z-[51] absolute top-[65px] w-full flex flex-col rounded-md text-sm text-gray-800 border-2 border-gray-900 overflow-hidden"
                        >
                          {dataCountries &&
                            dataCountries.length > 0 &&
                            dataCountries.map((item: any, index: number) => {
                              return (
                                <li
                                  className={`px-5 py-2 ${item?.id ? 'hover:bg-gray-800 hover:text-white hover:cursor-pointer' : 'bg-gray-300 text-gray-600'} flex items-center gap-1.5 active:opacity-80 transition duration-100`}
                                  onClick={() => {
                                    if (item?.id) {
                                      setCountry({
                                        name: item?.name,
                                        id: item?.id,
                                      })
                                      handleClearInputCountry()
                                      setDataCountries([])
                                      setFieldValue('countryName', item?.name)
                                      setFieldValue('countryId', item?.id)
                                    }
                                  }}
                                >
                                  {item?.id ? (
                                    <FaMountainCity className="text-base text-gray-600" />
                                  ) : (
                                    <BsBuildingSlash className="text-base" />
                                  )}
                                  {item?.name}
                                </li>
                              )
                            })}
                        </ul>
                      )}
                      {country?.name && (
                        <div className="absolute top-[25px] border-2 border-slate-600 py-1 px-3 flex items-center gap-1.5 text-sm font-bold text-gray-800 rounded-full bg-white w-fit">
                          <FaMountainCity className="text-base text-gray-600" />
                          {country?.name}
                          <IoClose
                            className="text-base ml-2 hover:cursor-pointer hover:opacity-60"
                            onClick={() => {
                              setCountry({ name: '', id: '' })
                              setFieldValue('countryName', '')
                              setFieldValue('countryId', null)
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </section>
                  <TextInput
                    labelName="Phone Number"
                    name="phoneNumber"
                    type="text"
                    placeholder="021-111-xxx"
                  />
                  <TextInput
                    labelName="Property URL"
                    name="url"
                    type="text"
                    placeholder="www.myhotel.com"
                  />
                </section>
                <Separator />
                <section className="flex flex-col gap-5">
                  <hgroup className="mb-5">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Detail Property Information
                    </h1>
                    <p className="text-sm font-medium text-gray-600">
                      property detail is used to explain in more detail what the
                      property has
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
                        value={inputCheckInStartTime}
                        className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
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
                        value={inputCheckOutEndTime}
                        className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
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
                  <TextAreaCustom
                    name="location"
                    labelName="Location URL"
                    placeholder="https://maps.app.goo.gl/mZnwt7g1pm88BnCEA"
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
                                  <label className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                </section>
                <section className="flex flex-col gap-5">
                  <hgroup className="mb-5">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Property Images
                    </h1>
                    <p className="text-sm font-medium text-gray-600">
                      Showcase Your Space: Stunning Property Images for Renters{' '}
                    </p>
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
                                  JPG, PNG or JPEG (MAX. 2MB)
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
                                          removeFilePropertyImage(imageIdx + 1)
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
                                        JPG, PNG or JPEG (MAX. 2MB)
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
                                          removeFilePropertyImage(imageIdx + 3)
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
                                        JPG, PNG or JPEG (MAX. 2MB)
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
                      Room types are used to provide customers with choices for
                      several types in one property
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
                                    if (values.propertyRoomTypes.length <= 1) {
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
                            <h1 className="text-sm font-bold">Add Room Type</h1>
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
                                        <FieldArray
                                          name={`propertyRoomTypes.${index}.roomFacilities`}
                                        >
                                          {({ push: pushRoomFacility }) => (
                                            <section className="flex flex-col gap-10 w-full">
                                              <section className="grid grid-cols-3 w-full gap-6">
                                                {dataRoomFacilities?.map(
                                                  (
                                                    roomFacility: any,
                                                    indexRoomFacility: number,
                                                  ) => {
                                                    return (
                                                      <div
                                                        key={indexRoomFacility}
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
                                                          id={roomFacility?.id}
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
                                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                          {roomFacility?.name}
                                                        </label>
                                                      </div>
                                                    )
                                                  },
                                                )}
                                              </section>
                                              <section></section>
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
                                          customers are exploring your property
                                          detail
                                        </CardDescription>
                                      </CardHeader>
                                      <CardContent>
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
                                                        2MB)
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
                                                {Array.from({ length: 4 }).map(
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
                                                                JPG, PNG or JPEG
                                                                (MAX. 2MB)
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
                <button className="rounded-full py-3 flex items-center gap-1.5 justify-center w-full transition duration-100 bg-black hover:opacity-75 active:scale-95 text-white text-sm font-bold">
                  Create Property
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  )
}

export default CreatePropertyPage
