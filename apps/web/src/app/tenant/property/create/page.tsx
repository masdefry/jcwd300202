'use client'

import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray, insert } from 'formik'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import TextInput from '@/features/tenant/property/create/components/TextInput'
import { Textarea } from '@/components/ui/textarea'
import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
import Separator from '@/features/auth/components/Separator'
import { Checkbox } from '@/components/ui/checkbox'
import { FiPlus } from "react-icons/fi";
import { CiTrash } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import TextInputForTabs from '@/features/tenant/property/create/components/TextInputForTabs'
import { MultiSelect } from 'primereact/multiselect';
import { useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import toast from 'react-hot-toast'
import { AnyARecord } from 'dns'


const CreatePropertyPage = () => {
  const [ roomFacilities, setRoomFacilities ] = useState<any[]>([[]])
  const { data: dataRoomFacilities, isPending: isPendingRoomFacilities } = useQuery({
    queryKey: ['getPropertyRoomFacilities'],
    queryFn: async() => {
      const res = await instance.get('/room-facility')
      return res?.data?.data
    }
  })

  const { data: dataPropertyFacilities, isPending: isPendingPropertyFacilities } = useQuery({
    queryKey: ['getPropertyFacilities'],
    queryFn: async() => {
      const res = await instance.get('/property-facility')
      return res?.data?.data
    }
  })
  
  const [selectedCities, setSelectedCities] = useState(null);
  const cities = [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];        
  return (
    <main className="w-full p-5">
      <section className="mx-auto max-w-screen-2xl w-full h-full flex items-start gap-5 px-5 py-5">
        <div className='w-full'>
          <Formik
          initialValues={{
            id: '',
            role: '',
            cityName: '', 
            countryName: '', 
            cityId: null, 
            countryId: null, 
            name: '', 
            zipCode: '', 
            address: '', 
            location: '',
            checkInStartTime: '',
            checkInEndTime: '',
            checkOutStartTime: '',
            checkOutEndTime: '', 
            propertyTypeId: null,
            propertyFacilitiesId: null,
            propertyFacilitiesName: '',
            propertyImages: [] as File[],
            propertyDescription: '',
            neighborhoodDescription: '', 
            phoneNumber: '',
            url: '', 
            totalRooms: 0,
            propertyRoomType: [{
              roomFacilities: []
            }],
          }}

          onSubmit={(values) => {
            console.log(values.propertyRoomType)
          }}
          >
              {
                ({values, setFieldValue}) => (
                  <Form className='flex flex-col gap-10'>
                  <section className="flex flex-col gap-5">
                    <hgroup className='flex flex-col mb-5'>
                      <h1 className='text-3xl font-bold'>Property General Information</h1>
                      <p className='text-base font-light'>General information is used to describe the entire property</p>
                    </hgroup>
                    <TextInput 
                    labelName='Property Name'
                    name='name'
                    type='text'
                    placeholder='Pan Pacific / Westin Hotel'
                    />
                    <section id='region' className='flex flex-col xl:flex-row gap-5 items-center'>
                      <TextInput
                      labelName='Zip Code'
                      name='zipCode'
                      type='text'
                      placeholder='10332'
                      />
                      <TextInput 
                      labelName='City'
                      name='cityName'
                      type='text'
                      placeholder='Jakarta / New York'
                      />
                      <TextInput 
                      labelName='Country'
                      name='countryName'
                      type='text'
                      placeholder='Indonesia / United States of America'
                      />
                    </section>
                    <TextAreaCustom 
                    name='address'
                    labelName='Full Address'
                    placeholder='Jl. Sudirman-Thamrin No.9, Kec. Menteng, Kota Jakarta Pusat, Jakarta, Indonesia'
                    />
                    <TextAreaCustom 
                    name='location'
                    labelName='Location URL'
                    placeholder='https://maps.app.goo.gl/mZnwt7g1pm88BnCEA'
                    />
                  </section>
                  <Separator />
                  <section className="flex flex-col gap-5">
                    <hgroup className='mb-5'>
                      <h1 className='text-3xl font-bold'>Detail Property Information</h1>
                      <p className='text-lg font-light'>property detail is used to explain in more detail what the property has</p>
                    </hgroup>
                    <TextInput 
                    labelName='Check-In Start Time'
                    name='checkInStartTime'
                    type='text'
                    placeholder='02:00 PM'
                    />
                    <TextInput 
                    labelName='Check-In End Time (optional)'
                    name='checkInEndTime'
                    type='text'
                    placeholder='10:00 PM'
                    />
                    <TextInput 
                    labelName='Check-Out Start Time (optional)'
                    name='checkOutStartTime'
                    type='text'
                    placeholder='05:00 AM'
                    />
                    <TextInput 
                    labelName='Check-Out End Time'
                    name='checkOutEndTime'
                    type='text'
                    placeholder='10:00 AM'
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <hgroup className='mb-5'>
                      <h1 className='text-3xl font-bold'>Property Facilities</h1>
                      <p className='text-lg font-light'>Property facilities will explain to customers what they will get while staying in this property</p>
                    </hgroup>
                    <section className='flex flex-col gap-2 w-full'>
                      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6'>
                      {
                        dataPropertyFacilities?.map((item: any, index: number) => {
                          return(
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox id="terms" value={item?.id} name='propertyFacilitesId'/>
                              <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {item?.name}
                              </label>
                            </div>
                          )
                        })
                      }
                      </section>
                    </section>
                  </section>
                  <section className="flex flex-col gap-10">
                    <hgroup>
                      <h1 className='text-3xl font-bold'>Room Type</h1>
                      <p className='text-lg font-light'>Room types are used to provide customers with choices for several types in one property</p>
                    </hgroup>
                    {
                      
                    }
                    <FieldArray name='propertyRoomType'>
                      {
                        ({push, remove}) => (
                          <div className='w-full flex flex-col gap-10'>
                            <section className='py-5 flex gap-5 items-center flex-wrap'>
                            { 
                              values.propertyRoomType.map((item, index) => {
                                return (
                                  <div key={index} className='flex gap-5 items-center px-7 py-3 rounded-full border border-slate-400 bg-white relative'>
                                  <h1 className='text-base font-semibold'>Room Type {index + 1}</h1>
                                  <CiTrash 
                                  className='text-red-600 hover:cursor-pointer hover:opacity-75 active:scale-90 transition duration-100' size={20} 
                                  onClick={() => {
                                    if(values.propertyRoomType.length <= 1) {
                                      toast.error('Minimum 1 room type required')
                                    } else {
                                      remove(index)
                                      setRoomFacilities((state: any) => {
                                        state.splice(index, 1)
                                        return state
                                      })
                                    }
                                  }} />
                                  <div className='absolute h-1 w-[calc(100%-25px)] mx-auto bg-blue-600 bottom-[-10px] right-0 left-0 rounded-full'></div>
                                </div>
                                )
                              })
                            } 
                            <div onClick={() => {
                              push({ name: ''})
                              // s 
                            }} 
                            className='flex gap-5 items-center px-7 py-3 rounded-full bg-blue-600 text-white hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100'>
                              <h1 className='text-base font-semibold'>Add Room Type</h1>
                              <FiPlus size={20}/>
                            </div>
                          </section>
                            {
                              values.propertyRoomType.map((_,index) => {
                                return (
                                  <div className='w-full flex flex-col gap-3'>
                                    <hgroup className='text-3xl font-bold'>
                                      <h1>Room Type {index + 1}</h1>
                                    </hgroup>
                                    <Tabs defaultValue="roomGeneralInfo" className="w-full">
                                      <TabsList className="grid w-full h-[8em] grid-cols-1 md:h-[4em] lg:h-fit md:grid-cols-2 lg:grid-cols-4">
                                        <TabsTrigger value="roomGeneralInfo">Room General Information</TabsTrigger>
                                        <TabsTrigger value="roomDetailInfo">Room Details</TabsTrigger>
                                        <TabsTrigger value="roomFacilities">Room Facilities</TabsTrigger>
                                        <TabsTrigger value="roomImages">Room Images</TabsTrigger>
                                      </TabsList>
                                      <TabsContent value="roomGeneralInfo">
                                        <Card>
                                          <CardHeader>
                                            <CardTitle className='text-2xl font-bold'>Room General Information</CardTitle>
                                            <CardDescription>
                                            Describe the room type as a whole. Click save when you're done.
                                            </CardDescription>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <TextInputForTabs 
                                            labelName='Name'
                                            name={`propertyRoomType.${index}.name`}
                                            type='text'
                                            placeholder='Suite Oceanview'
                                            />
                                            <TextInputForTabs 
                                            labelName='Guest Capacity'
                                            name={`propertyRoomType.${index}.capacity`}
                                            type='number'
                                            placeholder='2'
                                            />
                                            <TextInputForTabs 
                                            labelName='How many total of this room in this property?'
                                            name={`propertyRoomType.${index}.totalRooms`}
                                            type='number'
                                            placeholder='Minimum is 1'
                                            />
                                          </CardContent>
                                          <CardFooter>
                                            <Button type='button' className='w-full p-5 rounded-full'>Save changes</Button>
                                          </CardFooter>
                                        </Card>
                                      </TabsContent>
                                      <TabsContent value="roomDetailInfo">
                                        <Card>
                                          <CardHeader>
                                            <CardTitle className='text-2xl font-bold'>Room Details</CardTitle>
                                            <CardDescription>
                                            To explain detailed information regarding the room. Click save when you're done.
                                            </CardDescription>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <TextInputForTabs 
                                            labelName='How Many Rooms in this room?'
                                            name={`propertyRoomType.${index}.rooms`}
                                            type='number'
                                            placeholder='If you had many rooms in this Room Type (default is 1)'
                                            />
                                            <TextInputForTabs 
                                            labelName='Bathrooms'
                                            name={`propertyRoomType.${index}.bathrooms`}
                                            type='number'
                                            placeholder='If you had many bathrooms in this Room Type (default is 1)'
                                            />
                                            <TextAreaCustom 
                                            labelName='Description'
                                            placeholder={`Describe your room preferences here. Please include details such as bed type, room features (e.g., balcony, view), amenities (e.g., Wi-Fi, TV, mini-fridge), and any special requests (e.g., extra pillows, early check-in).`}
                                            name={`propertyRoomType.${index}.description`}
                                            />
                                          </CardContent>
                                          <CardFooter>
                                            <Button type='button' className='w-full p-5 rounded-full'>Save changes</Button>
                                          </CardFooter>
                                        </Card>
                                      </TabsContent>
                                      <TabsContent value="roomFacilities">
                                        <Card>
                                          <CardHeader>
                                            <CardTitle className='text-2xl font-bold'>Room Facilities</CardTitle>
                                            <CardDescription>
                                            Explain the facilities the room has. Click save when you're done.
                                            </CardDescription>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <FieldArray name={`propertyRoomType.${index}.roomFacilities`}>
                                              {
                                                ({ push: pushRoomFacility, remove: removeRoomFacility, insert: insertRoomFacillity, replace: replaceRoomFacility }) => (

                                                <section className='flex flex-col gap-10 w-full'>
                                                  <section className='grid grid-cols-3 w-full gap-6'>
                                                  {
                                                    dataRoomFacilities?.map((roomFacility: any, indexRoomFacility: number) => {
                                                      return(
                                                        <div key={indexRoomFacility} className="flex items-center space-x-2">
                                                          <Checkbox id={roomFacility?.id} value={index} name={`propertyRoomType.${index}.roomFacilities.${indexRoomFacility}`}
                                                          // onCheckedChange={(e: any) => {
                                                          //   if(e) {
                                                          //     insertRoomFacillity(roomFacility?.id, roomFacility?.id)
                                                          //   } else {
                                                          //     removeRoomFacility(roomFacility?.id)
                                                          //   }
                                                          // }}
                                                          onCheckedChange={(e: any) => {
                                                            values.propertyRoomType.forEach((itm, idx) => {
                                                              if(e) {
                                                                //  setRoomFacilities([[...roomFacilities[index], roomFacility?.id]])
                                                                 pushRoomFacility(roomFacility?.id)
                                                                } else {
                                                                removeRoomFacility(idx)
                                                                // setRoomFacilities((state: any) => {
                                                                //     const changedRoomFacilities = state[index].filter((item: any) => (item.id !== roomFacility?.id))
                                                                //     state[index] = changedRoomFacilities
                                                                //     return state
                                                                //   })
                                                                // }
                                                            // })
                                                             console.log(roomFacilities)
                                                             console.log(values.propertyRoomType.map((item) => item))
                                                          }})}}
                                                          //   // values.propertyRoomType[index].roomFacilities.forEach((itm, idx) => {
                                                            //   if(!e) { 
                                                            //     setFieldValue(`propertyRoomType.${index}.roomFacilities.${indexRoomFacility}`, roomFacilities )
                                                            //     insertRoomFacillity(indexRoomFacility, roomFacility?.id)
                                                            //     setRoomFacilities((state: any) => {
                                                            //         // if(index)
                                                            //         const changedRoomFacilities = state[index].filter((item: any) => item !== roomFacility?.id)
                                                            //         state[index] = changedRoomFacilities
                                                            //         return state
                                                            //       })
                                                            //     } else {
                                                            //     removeRoomFacility(indexRoomFacility)
                                                            //     setRoomFacilities([[...roomFacilities[index], roomFacility?.id]])
                                                            //     setRoomFacilities(state => {
                                                            //       state[index].push(roomFacility?.id)
                                                            //       return state
                                                            //     })
                                                            //   }
                                                            // })
                                                            // console.log(roomFacilities)
                                                            // }}
                                                            />
                                                          <label
                                                            htmlFor={roomFacility?.id}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                          >
                                                            {roomFacility?.name} {roomFacility?.id} {index}
                                                          </label>
                                                        </div>
                                                      )
                                                    })
                                                  }
                                                  </section>
                                                  <section>

                                                    <div className='p-1 px-2 w-fit text-xs font-bold text-gray-700 bg-gray-200 rounded-full flex items-center gap-3'>
                                                      Amnenities
                                                      <CiTrash size={17} className='text-red-600 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100'/>
                                                    </div>
                                                  </section>
                                                </section>
                                                )
                                              }
                                            </FieldArray>
                                          </CardContent>
                                          <CardFooter>
                                            <Button type='button' onClick={() => setFieldValue(`propertyRoomType.${index}.roomFacilities`, roomFacilities[index] )} className='w-full p-5 rounded-full'>Save changes</Button>
                                          </CardFooter>
                                        </Card>
                                      </TabsContent>
                                      <TabsContent value="roomImages">
                                        <Card>
                                          <CardHeader>
                                            <CardTitle className='text-2xl font-bold'>Room Images</CardTitle>
                                            <CardDescription>
                                            Room images will be displayed when customers are exploring your property detail. Click save when you're done.
                                            </CardDescription>
                                          </CardHeader>
                                          <CardContent>
                                          <FieldArray name={`propertyRoomType.${index}.roomImages`}>
                                            {
                                              ({push, remove}) => (
                                            <section className='flex flex-col gap-5 mb-8 mt-3'>
                                              <div className="flex items-center justify-center w-full h-[150px] lg:h-[200px]">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <IoCloudUploadOutline size={28} />
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG or JPEG (MAX. 2MB)</p>
                                                    </div>
                                                    <input id="dropzone-file" type="file" className="hidden" 
                                                    onChange={(e: any) => e.currentTarget.files[0] ? push(e.currentTarget.files[0]) : remove(0)}
                                                    />
                                                </label>
                                              </div>
                                              <section className='grid grid-cols-4 gap-5'>
                                                {
                                                  Array.from({length:4}).map((_, index) => {
                                                    return(
                                                    <div key={index} className="flex items-center justify-center md:col-span-2 2xl:col-span-1 col-span-4 w-full h-[150px] lg:h-[200px]">
                                                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                              <IoCloudUploadOutline size={28} />
                                                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                              <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG or JPEG (MAX. 2MB)</p>
                                                          </div>
                                                          <input id="dropzone-file" type="file" className="hidden" onChange={(e: any) => e.currentTarget.files[0] ? push(e.currentTarget.files[0]) : remove(index + 1)}/>
                                                      </label>
                                                    </div>
                                                    )
    
                                                  })
                                                }
                                              </section> 
                                            </section>
                                              )
                                            }
                                          </FieldArray>
                                          </CardContent>
                                          <CardFooter>
                                            <Button type='button' className='w-full p-5 rounded-full'>Save changes</Button>
                                          </CardFooter>
                                        </Card>
                                      </TabsContent>
                                    </Tabs>
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                      }
                    </FieldArray>
                  </section>
                  <button className='rounded-full py-3 flex items-center gap-1.5 justify-center w-full transition duration-100 bg-blue-800 hover:opacity-75 active:scale-90 text-white text-sm font-bold'>Create Property</button>
                </Form>
                )
              }
          </Formik>
        </div>
      </section>
    </main>
  )
}

export default CreatePropertyPage
