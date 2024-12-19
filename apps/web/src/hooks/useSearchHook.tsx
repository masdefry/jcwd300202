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





// interface IHeaderStore {
//     cityId: number | null,
//     countryId: number | null,
//     countryName: string,
//     cityName: string,
//     checkInDate: Date,
//     checkOutDate: Date,
//     totalGuest: number,
//     adult: number,
//     children: number,
//     totalRooms: number,
//     roomCapacityReq: number
// }

// export const headerStore = create((set) => ({
//     cityId: null,
//     countryId: null,
//     countryName: '',
//     cityName: '',
//     checkInDate: new Date(),
//     checkOutdate: new Date(addDays(new Date(), 1)),
//     totalGuest: 1,
//     adult: 1,
//     setAdult: ({adult}: Pick<IHeaderStore, 'adult'>) => {set((state: any) => ({adult, totalGuest: adult + state.children}))},
    
//     children: 0,
//     setChildren: ({children}: Pick<IHeaderStore, 'children'>) => {set((state: any) => ({children, totalGuest: state.adult + children}))},
    
//     totalRooms: 1,
//     setTotalRooms: ({totalRooms}: Pick<IHeaderStore, 'totalRooms'>) => {set((state: any) => ({ totalRooms, roomCapacityReq: state.totalGuest / totalRooms }))},
//     roomCapacityReq: 1,
//     setCityAndCountrySearch: ({ 
//         cityId, 
//         countryId, 
//         cityName, 
//         countryName
//         }: Pick<IHeaderStore, 'cityId' | 'countryId' | 'countryName' | 'cityName'>) => {
//         set({ cityId, countryId, cityName, countryName })
//     },
//     setDate: ({ 
//         checkInDate, 
//         checkOutDate 
//         }: Pick<IHeaderStore, 'checkInDate' | 'checkOutDate'>) => {
//         set({ checkInDate, checkOutDate })
//     },
//     setCheckInDate: ({checkInDate}: Pick<IHeaderStore, 'checkInDate'>) => {set({checkInDate})},
//     setCheckOutDate: ({checkOutDate}: Pick<IHeaderStore, 'checkOutDate'>) => {set({checkOutDate})},