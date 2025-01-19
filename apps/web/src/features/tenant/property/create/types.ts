export interface IProperty {
    id: string;
    name: string;
    address: string;
    zipCode: string;
    location: string;
    checkInStartTime: Date;
    checkInEndTime?: Date;
    checkOutStartTime?: Date;
    checkOutEndTime: Date;
    slug: string;
    star?: number;
    propertyTypeId?: number;

    propertyRoomType: IPropertyRoomType[]
    propertyDetail: IPropertyDetail[]
  
    tenantId?: string;
  
    countryId?: number;
  
    cityId?: number;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }
  
  export interface IPropertyRoomType {
    id: number;
    name: string;
    description: string;
    rooms?: number;
    capacity: number;
    bathrooms: number;
    price: number;
    totalRooms: number;
  
    propertyId: string;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }

  export interface IPropertyDetail {
    id: number;
    propertyDescription: string;
    neighborhoodDescription: string;
    phoneNumber: string;
    url?: string;
    totalRooms: number;
  
    
    propertyId: string;
    property: IProperty;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  