export interface IPropertyType {
    id: number;                   
    name: string;                 
    description: string;           
    isCustom: boolean;             
    tenantId?: string | null;  
    createdAt: Date;            
    updatedAt: Date;        
    deletedAt?: Date | null; 
  }