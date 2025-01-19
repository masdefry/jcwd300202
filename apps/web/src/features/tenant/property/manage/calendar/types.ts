export interface IDateRange {
    startDate: string | null
    endDate: string | null
    id?: string | number
    name?: string
  }
  
  export interface IDataPropertyRoomTypeSeason {
    basePrice: number
    isBulk: boolean
    roomPrices: number
    roomsToSell: number
    totalRooms: number
    pricePercentage: string
    availability: boolean
    propertyRoomTypeId: number
    name: string
    seasonId: string
    seasonalPriceId: string
    startDate: string
    endDate: string
    isPeak: boolean
  }
  
  export interface IBulkSeason {
    pricePercentage: number
    availability: boolean
    name: string
    seasonId: string
    startDate: string
    endDate: string
    isPeak: boolean
  }
  
  export interface IActiveRoomSetter {
    startDate: string
    endDate: string
    name: string
  }
  