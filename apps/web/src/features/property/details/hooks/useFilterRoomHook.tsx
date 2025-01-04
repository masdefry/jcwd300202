'use client'

import React, { useState } from 'react'

const useFilterRoomHook = () => {
  const [ dateRange, setDateRange] = useState<any>([null, null]);
      const [ checkInDate, checkOutDate] = dateRange;
      const [ showGuestCounter, setShowGuestCounter ] = useState(false)
      const [ children, setChildren ] = useState(0)
      const [ adult, setAdult ] = useState(1)
  
      const handleGuest = (type: string, operation: string) => {
          if(type === 'children') {
              if(operation === 'plus') {
                  setChildren(state => state + 1)
              } else if(operation === 'minus' && children > 0) {
                  setChildren(state => state - 1)
              }
          } else if(type === 'adult') {
              if(operation === 'plus') {
                  setAdult(state => state + 1)
              } else if(operation === 'minus' && adult > 1) {
                  setAdult(state => state - 1)
              }
          }
      }
  
    return {
        checkInDate,
        checkOutDate,
        setDateRange,
        dateRange,
        handleGuest,
        showGuestCounter,
        setShowGuestCounter,
        adult,
        children,
        setAdult,
        setChildren
    }
}

export default useFilterRoomHook
