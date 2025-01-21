'use client'

import React from 'react'
import { IPropertyData } from '../types'

const useHandleCreatePropertyHook = ({
  mutateCreateProperty,
  values,
}: {
  mutateCreateProperty: (values: FormData) => void
  values: IPropertyData
}) => {
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
    JSON.stringify(values?.propertyFacilitiesId.map((item) => ({ id: item }))),
  )
  fd.append(
    'propertyFacilitiesName',
    JSON.stringify(
      values?.propertyFacilitiesName.map((item) => ({
        name: item,
      })),
    ),
  )
  fd.append('countPropertyImages', values?.propertyImages.length.toString())
  fd.append('propertyDescription', values?.propertyDescription)
  fd.append('neighborhoodDescription', values?.neighborhoodDescription)
  fd.append('phoneNumber', values?.phoneNumber)
  fd.append('url', values?.url)
  fd.append('totalRooms', values?.totalRooms.toString())
  const propertyRoomTypes = values?.propertyRoomTypes.map((item) => {
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
  })
  fd.append('propertyRoomTypes', JSON.stringify(propertyRoomTypes))
  values?.propertyImages.forEach((item: File) => fd.append('images', item))
  values?.propertyRoomTypes.forEach((item: any) => {
    item?.roomImages.forEach((itm: File) => fd.append('images', itm))
  })

  mutateCreateProperty(fd)
}

export default useHandleCreatePropertyHook
