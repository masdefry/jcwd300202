export interface IShowPhoto {
    id: number;
    directory: string;
    filename: string;
    fileExtension: string;
  }
  
 export interface IApiResponse<T> {
    data: T;
    message: string;
  }
  
 export interface IPropertyImage {
    id: number;
    directory: string;
    filename: string;
    fileExtension: string;
  }
  