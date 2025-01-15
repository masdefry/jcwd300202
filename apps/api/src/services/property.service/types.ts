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
  
    tenantId?: string;
  
    countryId?: number;
  
    cityId?: number;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }
  