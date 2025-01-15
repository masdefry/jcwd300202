// Enum types
export enum Role {
    USER = 'USER',
    TENANT = 'TENANT',

  }
  
  export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',

  }
  

  export interface IUser {
    id: string;                      
    email: string;                   
    password?: string | null;        
    isVerified: boolean;             
    role: Role;                      
    isGoogleRegistered: boolean;     
    token?: string | null;           
    username?: string | null;        
    phoneNumber?: string | null;     
    birthDate?: Date | null;       
    nationality?: string | null;    
    gender?: Gender | null;         
    address?: string | null;        
    directory?: string | null;       
    filename?: string | null;        
    fileExtension?: string | null;  
  }
  
  