'use client'

import { useState } from 'react'

const useFilteringPropertyHook = () => {
const [ dataForFilteringProperty, setDataForFilteringProperty ] = useState<any>({
    propertyType: [],
    propertyFacility: [],
    propertyRoomFacility: []
})
  return {
    dataForFilteringProperty,
    setDataForFilteringProperty
  }
}

export default useFilteringPropertyHook
