export interface IPropertyRoomFacility {
    id: number;
    name: string;
    iconDirectory?: string;
    iconFilename?: string;
    iconFileExtension: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }