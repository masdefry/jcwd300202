'use client'

import React from 'react'
import TextInput from '@/features/tenant/property/create/components/TextInput'
import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
const PropertyRoomGeneralInfoSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <TextInput
        labelName="Room Name"
        name="name"
        type="text"
        placeholder="Enter Your Room Name (e.g., Cozy Bedroom, Executive Suite)"
      />
      <TextInput
        labelName="Room Price"
        name="price"
        type="number"
        placeholder="Enter Room Price (e.g., Rp500000)"
      />
      <TextInput
        labelName="Guest Capacity"
        name="capacity"
        type="number"
        placeholder="Enter Guest Capacity (e.g., 2, 4, 6 people)"
      />
      <TextInput
        labelName="Total rooms in the property"
        name="totalRooms"
        type="number"
        placeholder="Enter Total Rooms in Property (e.g., 5, 10, 20 rooms)"
      />
      <TextInput
        labelName="Rooms in room unit"
        name="rooms"
        type="number"
        placeholder="Enter Number of Rooms in Unit (e.g., 1, 2, 3 rooms)"
      />
      <TextInput
        labelName="Bathrooms"
        name="bathrooms"
        type="number"
        placeholder="Enter Number of Bathrooms in Unit (e.g., 1, 2, 3 bathrooms)"
      />
      <TextAreaCustom
        labelName="Room Description"
        name="description"
        placeholder="Enter Room Description (e.g., Spacious, bright room with a king-size bed and ocean view)"
      />
    </div>
  )
}

export default PropertyRoomGeneralInfoSection
