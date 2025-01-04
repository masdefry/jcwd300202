'use client'

import React, { useState } from 'react'

const useShowRoomDetailHook = () => {
  const [ showDataRoom, setShowDataRoom ] = useState({
          roomImages: [],
          roomHasFacilities: [],
          name: '',
          description: '', 
          rooms: 0,
          capacity: 0,
          bathrooms: 0,
          price: 0
  
      })
      const [currSlideRoomImages, setCurrSlideRoomImages] = useState(0)
      const prevRoomImage = ({ roomImagesLength }: { roomImagesLength : number }) => {
          setCurrSlideRoomImages(currSlideRoomImages == 0 ? roomImagesLength - 1 : currSlideRoomImages - 1)
      }
      
      const nextRoomImage = ({ roomImagesLength }: { roomImagesLength : number }) => {
          setCurrSlideRoomImages(currSlideRoomImages == roomImagesLength - 1 ? 0 : currSlideRoomImages + 1)
      }
  
    return {
        showDataRoom, 
        setShowDataRoom,
        currSlideRoomImages, 
        setCurrSlideRoomImages,
        prevRoomImage, 
        nextRoomImage
    }
}

export default useShowRoomDetailHook
