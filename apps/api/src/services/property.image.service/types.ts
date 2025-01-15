export interface IPropertyImage {
    id: number;
    directory: string;
    filename: string;
    fileExtension: string;
  
    propertyDetailId: number;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  