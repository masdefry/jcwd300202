'use client'

import React, { useState } from 'react'

const useHamburgerMenuHook = () => {
    const [ hamburgerMenuActive, setHamburgerMenuActive ] = useState('')
    const [ showHamburgerNav, setShowHamburgerNav ] = useState('scale-y-0')
    const [ loadingPromotion, setLoadingPromotion ] = useState(true)
    
    const toggleHamburger = () => {
        if(hamburgerMenuActive) {
          setHamburgerMenuActive(state => {
            state = ''
            return state
          })
          setShowHamburgerNav(state => {
            state = 'scale-y-0'
            return state
          })
        } else {
          setHamburgerMenuActive(state => {
            state = 'hamburger-active'
            return state
          })
          setShowHamburgerNav(state => {
            state = 'scale-y-100'
            return state
          })
        }
      }
  
    return {
        toggleHamburger,
        showHamburgerNav,
        hamburgerMenuActive,
        setHamburgerMenuActive
  }
}

export default useHamburgerMenuHook
