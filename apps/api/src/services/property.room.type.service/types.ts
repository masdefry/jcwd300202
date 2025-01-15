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