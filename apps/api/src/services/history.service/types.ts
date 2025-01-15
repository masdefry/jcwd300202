export interface IHistoryView {
    userId: string;      
    propertyId: string; 
    createdAt: Date;    
    updatedAt: Date;       
    deletedAt?: Date | null; 
  }