export interface IRoomHasFacilities {
    propertyRoomTypeId: number;
    propertyRoomFacilityId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }