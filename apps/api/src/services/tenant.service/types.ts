import { Role } from "../auth.service/types";

export interface ITenant {
    id: string;                 
    email: string;                
    password?: string;             
    role: Role;                  
    isVerified: boolean;          
    companyName?: string;          
    token?: string;               
    pic?: string;                  
    phoneNumber?: string;         
    address?: string;           
    directory?: string;           
    filename?: string;             
    fileExtension?: string;       
    
    
    createdAt: Date;              
    updatedAt: Date;               
    deletedAt?: Date | null;      
  }