'use client'

import React from 'react'
import { useState } from 'react'

const useHeroHook = () => {
  const heroSlider = [
    {
        name: 'Hotel',
        description: 'Traditional accommodation offering rooms and various amenities for travelers.',
        img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/572680011.jpg?k=8477cd050faece50644f46c687c0858885736dac54a7c7c93ba3e4a0fe474b84&o=&hp=1'
    },
    {
        name: 'Apartment',
        description: 'Self-contained unit within a building, offering privacy and home-like amenities.',
        img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/343023775.jpg?k=0bc10f92289a5d5359daa84c430afa6a98c865e221f5f52ea1a07595b5dd67b0&o=&hp=1'
    },
    {
        name: 'Villa',
        description: 'Spacious and luxurious standalone property, often with private facilities.',
        img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/610936394.jpg?k=4c276add01f9635dd8907053cff0f9ff6d8d7fad8500ade067b02f2128d96bef&o=&hp=1'
    },
    {
        name: 'Guesthouse',
        description: 'Smaller, cozy accommodation often run by local hosts.',
        img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/384217214.jpg?k=c68dc0b6e78b101dd5a6c524ac929914aad1aaefabde20618ef38664a6ac8641&o=&hp=1'
    },
  ]  
    
    const [currSlide, setCurrSlide] = useState(0)
    const prev = () => {
        setCurrSlide(currSlide == 0 ? heroSlider.length - 1 : currSlide - 1)
    }
    
    const next = () => {
        setCurrSlide(currSlide == heroSlider.length - 1 ? 0 : currSlide + 1)
    }
  
    return {
        heroSlider,
        currSlide,
        prev,
        next
    }
}

export default useHeroHook