'use client'

import React, { useState } from 'react'
import { addDays } from 'date-fns'

const useSearchHook = () => {
    const [
        searchLocation, 
        setSearchLocation
    ] = useState({
        cityId: '',
        countryId: '',
        countryName: '',
        cityName: '',
    })

    const [
        bookingDays,
        setBookingDays
    ] = useState({
        checkInDate: new Date(),
        checkOutDate: new Date(addDays(new Date() ,1))
    })

    const [
        totalGuest,
        setTotalGuest
    ] = useState({
        adult: 1,
        children: 0,
    })

    const [
        allGuest,
        setAllGuest
    ] = useState({
        totalGuest: totalGuest.adult + totalGuest.children
    })

    const [
        searchResults,
        setSearchResults
    ] = useState([])


    return {
        searchLocation,
        setSearchLocation,
        bookingDays,
        setBookingDays,
        totalGuest,
        setTotalGuest,
        searchResults,
        setSearchResults,
        allGuest,
        setAllGuest
    }
}

export default useSearchHook



