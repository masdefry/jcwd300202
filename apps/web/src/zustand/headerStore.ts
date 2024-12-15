import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { addDays } from 'date-fns'

interface IHeaderStore {
    cityId: number | null,
    countryId: number | null,
    countryName: string,
    cityName: string,
    checkInDate: Date,
    checkOutDate: Date,
    totalGuest: number,
    adult: number,
    children: number,
    totalRooms: number,
    roomCapacityReq: number
}

export const headerStore = create((set) => ({
    cityId: null,
    countryId: null,
    countryName: '',
    cityName: '',
    checkInDate: new Date(),
    checkOutdate: new Date(addDays(new Date(), 1)),
    totalGuest: 0,
    adult: 0,
    children: 0,
    totalRooms: 0,
    roomCapacityReq: 0,
    setCityAndCountrySearch: ({ 
        cityId, 
        countryId, 
        cityName, 
        countryName
        }: Pick<IHeaderStore, 'cityId' | 'countryId' | 'countryName' | 'cityName'>) => {
        set({ cityId, countryId, cityName, countryName })
    },
    setDate: ({ 
        checkInDate, 
        checkOutDate 
        }: Pick<IHeaderStore, 'checkInDate' | 'checkOutDate'>) => {
        set({ checkInDate, checkOutDate })
    },
    setTotalGuest: ({ 
        adult, 
        children,
        totalRooms = 1
        }: Pick<IHeaderStore, 'adult' | 'children' | 'totalRooms'>) => {
            const totalGuest = adult! + ( children ? children : 0)
            let roomCapacityReq
            if(totalRooms > 1) {
                roomCapacityReq = totalGuest / totalRooms
            } else {
                roomCapacityReq = totalGuest
            }
        set({ totalGuest, totalRooms, children, adult })
    },
}))