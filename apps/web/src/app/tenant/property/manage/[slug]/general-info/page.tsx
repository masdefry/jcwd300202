'use client'

import TextInput from '@/features/tenant/property/create/components/TextInput'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useQuery, useMutation } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import toast from 'react-hot-toast'
import { FaRegBuilding, FaRegTrashCan } from 'react-icons/fa6'
import { BsBuildingSlash } from 'react-icons/bs'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'
import { FaRegSave } from 'react-icons/fa'
import Rate from 'rsuite/Rate'
import SelectPicker from 'rsuite/SelectPicker'

import 'rsuite/SelectPicker/styles/index.css'
import 'rsuite/Rate/styles/index.css'
import Image from 'next/image'
import { manageGeneralInfoValidationSchema } from '@/features/tenant/property/manage/general-info/schemas/manageGeneralInfoValidationSchema'
const PropertyManageGeneralInfoPage = ({
  params,
}: {
  params: { slug: string }
}) => {
  const [showFormCreatePropertyType, setShowFormCreatePropertyType] =
    useState<boolean>(false)
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
  const { mutate: mutateCreateCountry, isPending: isPendingCreateCountry } =
    useMutation({
      mutationFn: async () => {
        const fd = new FormData()
        fd.append('name', dataCreateCountry?.name)
        fd.append('description', dataCreateCountry?.description)
        fd.append('images', dataCreateCountry?.file[0])
        const res = await instance.post('/country', fd)

        console.log(res)
        return res?.data
      },
      onSuccess: (res) => {
        setDataCreateCountry({ name: '', file: [], description: '' })
        setShowCreateCountry(false)
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
  const { isPending: isPendingCities } = useQuery({
    queryKey: ['getCities'],
    queryFn: async () => {
      const res = await instance.get('/city')
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
      const res = await instance.get('/country')
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
    data: dataPropertyGeneralInfo,
    isPending: isPendingPropertyGeneralInfo,
  } = useQuery({
    queryKey: ['getPropertyGeneralInfo'],
    queryFn: async () => {
      const res = await instance.get(`/property/${params?.slug}`)
      console.log(res)
      setCityId(res?.data?.data?.property?.cityId)
      setCountryId(res?.data?.data?.property?.countryId)
      setPropertyTypeId(res?.data?.data?.property?.propertyTypeId)
      return res?.data?.data
    },
  })

  const { mutate: mutateUpdateGeneralInfo } = useMutation({
    mutationFn: async (values: any) => {
      const res = await instance.patch(
        `/property/general-info/${params?.slug}`,
        {
          name: values?.name,
          address: values?.address,
          zipCode: values?.zipCode,
          location: values?.location,
          cityId: values?.cityId,
          countryId: values?.countryId,
          checkInStartTime: values?.checkInStartTime,
          checkInEndTime: values?.checkInEndTime,
          checkOutStartTime: values?.checkOutStartTime,
          checkOutEndTime: values?.checkOutEndTime,
          star: values?.star,
          phoneNumber: values?.phoneNumber,
          url: values?.url,
        },
      )

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
          }}
          validationSchema={manageGeneralInfoValidationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            setIsSubmitting(false)
            console.log(values)
            mutateUpdateGeneralInfo(values)
          }}
        >
          {({ values, setFieldValue }) => (
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
                placeholder="Update the contact phone number for this property"
                type="text"
              />
              <TextInput
                labelName="Property URL"
                name="url"
                placeholder="Provide the website or listing URL for this property"
                type="text"
              />
              <TextInput
                labelName="Zip Code"
                name="zipCode"
                placeholder="Enter the zip code for the property’s location"
                type="text"
              />
              <section className="flex items-end gap-2">
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
                  className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                  type="button"
                >
                  Add City
                </button>
              </section>
              <section
                className={`z-[52] p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${showCreateCity ? 'flex' : 'hidden'} flex-col gap-1 items-center justify-center`}
              >
                <div className=" flex flex-col gap-1 items-center justify-center w-full">
                  <div className="w-[400px] flex justify-end">
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
                  <div className="bg-white  flex flex-col gap-3 shadow-md p-5 w-[400px] rounded-md h-fit">
                    <div className="grid items-center gap-1.5 w-full relative">
                      <label
                        htmlFor="createCityName"
                        className="text-sm font-bold text-gray-900"
                      >
                        City Name
                      </label>
                      <input
                        name="createCityName"
                        onChange={(e) =>
                          setDataCreateCity((state) => {
                            state.name = e.target.value
                            return state
                          })
                        }
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
                      <div className="z-[53]">
                        <SelectPicker
                          onChange={(value) => {
                            setDataCreateCity((state) => {
                              state.countryId = Number(value)
                              return state
                            })
                          }}
                          menuClassName="text-sm font-bold text-gray-800"
                          className="text-gray-600"
                          data={countryList}
                          block
                        />
                      </div>
                    </div>
                    {dataCreateCity?.file[0]?.name ? (
                      <figure className="w-full h-[200px] relative rounded-md overflow-hidden">
                        <Image
                          src={URL.createObjectURL(dataCreateCity?.file[0])}
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
                              console.log(dataCreateCity)
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
                        className="text-sm font-bold rounded-md p-2 w-full shadow-md text-gray-800 bg-white border border-slate-100 hover:opacity-75 active:scale-95 transition duration-100"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={
                          !dataCreateCity?.name ||
                          !dataCreateCity?.countryId ||
                          !dataCreateCity?.file[0]?.name
                        }
                        type="button"
                        className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-sm font-bold rounded-md p-2 w-full shadow-md text-white bg-gray-800 hover:opacity-75 active:scale-95 transition duration-100"
                      >
                        Add City
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section className="flex items-end gap-2">
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
                      menuClassName="text-sm font-bold text-gray-800 z-[53]"
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
                  className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                  type="button"
                >
                  Add Country
                </button>
              </section>
              <section
                className={`z-[52] p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${showCreateCountry ? 'flex' : 'hidden'} flex-col gap-1 items-center justify-center`}
              >
                <div className=" flex flex-col gap-1 items-center justify-center w-full">
                  <div className="w-[400px] flex justify-end">
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
                  <div className="bg-white  flex flex-col gap-3 shadow-md p-5 w-[400px] rounded-md h-fit">
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
                          src={URL.createObjectURL(dataCreateCountry?.file[0])}
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
                        className="text-sm font-bold rounded-md p-2 w-full shadow-md text-gray-800 bg-white border border-slate-100 hover:opacity-75 active:scale-95 transition duration-100"
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
                        className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-sm font-bold rounded-md p-2 w-full shadow-md text-white bg-gray-800 hover:opacity-75 active:scale-95 transition duration-100"
                      >
                        Add Country
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <TextInput
                labelName="Location (Coordinates)"
                name="location"
                placeholder="Update the property’s location by entering the latitude and longitude coordinates"
                type="text"
              />
              <section className="flex items-center gap-8">
                {values?.propertyTypeName?.toLowerCase().includes('hotel') && (
                  <div className="grid items-center gap-1.5 min-w-max relative">
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
                        const getPropertyType: any = propertyTypes.find(
                          (item: { value: string | number; label: string }) =>
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
                  className="disabled:bg-slate-300 disabled:opacity-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:scale-100 min-w-max text-white text-sm hover:opacity-75 transition duration-100 active:scale-95 font-bold rounded-md bg-gray-900 border-2 border-gray-900 p-5 py-1.5"
                  type="button"
                >
                  Add Property Type
                </button>
              </section>
              {showFormCreatePropertyType && (
                <div className="fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center">
                  <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-7">
                    <div className="flex items-center justify-end">
                      <IoClose
                        className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                        onClick={() => setShowFormCreatePropertyType(false)}
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
                        onClick={() => setShowFormCreatePropertyType(false)}
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
                    value={values?.checkInStartTime}
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
                    value={values?.checkInEndTime}
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
                    value={values?.checkOutStartTime}
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
                    value={values?.checkOutEndTime}
                    className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              </section>
              <button
                type="button"
                onClick={() => setIsSubmitting(true)}
                disabled={false}
                className="transition duration-100 disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-slate-900 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center"
              >
                <FaRegSave className="text-base" />
                Save Changes
              </button>
              <div
                className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}
              >
                <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
                  <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
                    Are you sure you want to update the property details?
                  </h1>
                  <article className="text-sm font-medium text-gray-500">
                    Once confirmed, your changes will be visible on your listing
                    immediately.
                  </article>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSubmitting(false)}
                      className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={false}
                      className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-blue-800 border-slate-100"
                    >
                      Confirm Update
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default PropertyManageGeneralInfoPage
