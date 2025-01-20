'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import TextInputForTabs from '@/features/tenant/property/create/components/TextInputForTabs'

import 'rsuite/SelectPicker/styles/index.css'
import 'rsuite/Rate/styles/index.css'
const TabsRoomGeneralInfo = ({
  index
}: {
  index: number
}) => {
  return (
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
  )
}

export default TabsRoomGeneralInfo
