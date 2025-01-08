'use client'

import TextInput from '@/features/tenant/property/create/components/TextInput'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useQuery, useMutation } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import toast from 'react-hot-toast'
import { FaRegBuilding, FaRegTrashCan } from 'react-icons/fa6'
import { BsBuildingSlash } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { FaRegSave } from 'react-icons/fa'
import Rate from 'rsuite/Rate'
import SelectPicker from 'rsuite/SelectPicker'

import 'rsuite/SelectPicker/styles/index.css'
import 'rsuite/Rate/styles/index.css'
const PropertyManageGeneralInfoPage = ({
  params,
}: {
  params: { slug: string }
}) => {
  const [roomFacilities, setRoomFacilities] = useState<any[]>([[]])
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
  const [countryId, setCountryId] = useState<null | number>(null)
  const [propertyTypeId, setPropertyTypeId] = useState<null | number>(null)
  const [dataPropertyTypes, setDataPropertyTypes] = useState<any>([])
  const handleClearInputPropertyType = () => {
    setInputPropertyType('')
  }
  const handleInputPropertyType = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputPropertyType(event.target.value)
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

  const [cityList, setCityList] = useState([])
  const [countryList, setCountryList] = useState([])
  const [propertyTypes, setPropertyTypes] = useState([])

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
          enableReinitialize={true}
          onSubmit={(values) => {
            setIsSubmitting(false)
            console.log(values)
            mutateUpdateGeneralInfo(values)
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-7">
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
              <section className="flex items-center gap-2">
                <TextInput
                  labelName="Zip Code"
                  name="zipCode"
                  placeholder="Enter the zip code for the property’s location"
                  type="text"
                />
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
                      menuClassName="text-sm font-bold text-gray-800"
                      value={countryId}
                      className="text-gray-600"
                      data={countryList}
                      block
                    />
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
                        const getPropertyType: any = propertyTypes.find((item: {value: string | number, label: string}) => Number(item?.value) === Number(value))
                        
                        setFieldValue('propertyTypeName', getPropertyType?.label)
                      }}
                      menuClassName="text-sm font-bold text-gray-800"
                      value={propertyTypeId}
                      className="text-gray-600"
                      data={propertyTypes}
                      block
                    />
                  </div>
                </div>
                {/* <div className="grid items-center gap-1.5 w-full relative">
                  <label
                    htmlFor="propertyType"
                    className="text-sm font-bold text-gray-900"
                  >
                    Property Type
                  </label>
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
                      placeholder={propertyType?.name ? '' : 'Hotel / Apartment'}
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
                  </section>
                </div> */}
              </section>
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
