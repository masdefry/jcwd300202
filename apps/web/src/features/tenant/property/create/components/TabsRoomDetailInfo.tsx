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
import TextAreaCustom from '@/features/tenant/property/create/components/TextArea'
const TabsRoomDetailInfo = ({
    index
  }: {
    index: number
  }) => {
  return (
    <TabsContent value="roomDetailInfo">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">
          Room Details
        </CardTitle>
        <CardDescription className="text-sm font-medium text-gray-600">
          To explain detailed information regarding the room
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
  )
}

export default TabsRoomDetailInfo
