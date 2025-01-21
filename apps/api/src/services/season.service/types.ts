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