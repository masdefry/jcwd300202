'use client'

import React from 'react'
import { useState } from 'react'

const useImageCarouselHook = ({ imagesArr }: any) => {
    
    const [currSlide, setCurrSlide] = useState(0)
    const prev = () => {
        setCurrSlide(currSlide == 0 ? imagesArr?.length - 1 : currSlide - 1)
    }
    
    const next = () => {
        setCurrSlide(currSlide == imagesArr?.length - 1 ? 0 : currSlide + 1)
    }
  
    return {
        currSlide,
        prev,
        next
    }
}

export default useImageCarouselHook