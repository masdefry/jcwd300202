import { IProperty } from "../../create/types"

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
    totalRooms: number
    roomsToSell: number
  }
  
  export interface IActiveRoomSetter {
    startDate: string
    endDate: string
    name: string
  }
  
  export interface ISeason {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    ratesPercentage: number;
    availability: boolean;
    isPeak: boolean;
    roomToRent?: number;
    seasonalPrice: ISeasonalPrice[];
    propertyRoomTypeId: number;
    propertyId: string;

    property: IProperty[]

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }
  
  export interface ISeasonalPrice {
    id: number;
    price: number;
    date: Date;
    isStartSeason: boolean;
    isEndSeason: boolean;
    roomAvailability: boolean;
    roomToRent: number;
    isPeak: boolean;
    seasonId: number;
    season: ISeason;
    propertyRoomTypeId: number;
    propertyId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }