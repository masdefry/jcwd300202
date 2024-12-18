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
    totalGuest: 1,
    adult: 1,
    setAdult: ({adult}: Pick<IHeaderStore, 'adult'>) => {set((state: any) => ({adult, totalGuest: adult + state.children}))},
    
    children: 0,
    setChildren: ({children}: Pick<IHeaderStore, 'children'>) => {set((state: any) => ({children, totalGuest: state.adult + children}))},
    
    totalRooms: 1,
    setTotalRooms: ({totalRooms}: Pick<IHeaderStore, 'totalRooms'>) => {set((state: any) => ({ totalRooms, roomCapacityReq: state.totalGuest / totalRooms }))},
    roomCapacityReq: 1,
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
    setCheckInDate: ({checkInDate}: Pick<IHeaderStore, 'checkInDate'>) => {set({checkInDate})},
    setCheckOutDate: ({checkOutDate}: Pick<IHeaderStore, 'checkOutDate'>) => {set({checkOutDate})},
    // setTotalGuest: ({ 
    //     adult, 
    //     children,
    //     totalRooms = 1
    //     }: Partial<IHeaderStore, 'adult' | 'children' | 'totalRooms'>) => {
    //         const totalGuest = adult! + ( children ? children : 0)
    //         let roomCapacityReq
    //         if(totalRooms > 1) {
    //             roomCapacityReq = totalGuest / totalRooms
    //         } else {
    //             roomCapacityReq = totalGuest
    //         }
    //     set({ totalGuest, totalRooms, children, adult })
    // },
}))