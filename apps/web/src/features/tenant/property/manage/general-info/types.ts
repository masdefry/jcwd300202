export interface IDataCreatePropertyType {
    name: string;
    description: string;
  }
  
  export interface IDataCreateCity {
    name: string;
    file: File[];
    countryId: number | null;
  }
  
  export interface IDataCreateCountry {
    name: string;
    description: string;
    file: File[];
  }
  
  export interface IPropertyType {
    id: number;
    name: string;
  }
  
  export interface ICity {
    id: number;
    name: string;
  }
  
  export interface ICountry {
    id: number;
    name: string;
  }
  
  export interface IPropertyGeneralInfo {
    name: string;
    zipCode: string;
    phoneNumber: string;
    url: string;
    location: string;
    star: number;
    cityId: number;
    countryId: number;
    propertyTypeId: number;
    checkInStartTime: string;
    checkInEndTime: string;
    checkOutStartTime: string;
    checkOutEndTime: string;
    totalRooms: number;
    address: string;
  }
  
  export interface IUseManagePropertyGeneralInfoHookReturn {
    showFormCreatePropertyType: boolean;
    setShowFormCreatePropertyType: React.Dispatch<React.SetStateAction<boolean>>;
    inputPropertyType: string;
    setInputPropertyType: React.Dispatch<React.SetStateAction<string>>;
    inputCheckInStartTime: string;
    setInputCheckInStartTime: React.Dispatch<React.SetStateAction<string>>;
    inputCheckInEndTime: string;
    setInputCheckInEndTime: React.Dispatch<React.SetStateAction<string>>;
    inputCheckOutStartTime: string;
    setInputCheckOutStartTime: React.Dispatch<React.SetStateAction<string>>;
    inputCheckOutEndTime: string;
    setInputCheckOutEndTime: React.Dispatch<React.SetStateAction<string>>;
    isSubmitting: boolean;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    dataCreatePropertyType: IDataCreatePropertyType;
    setDataCreatePropertyType: React.Dispatch<React.SetStateAction<IDataCreatePropertyType>>;
    cityId: number | null;
    setCityId: React.Dispatch<React.SetStateAction<number | null>>;
    dataCreateCity: IDataCreateCity;
    setDataCreateCity: React.Dispatch<React.SetStateAction<IDataCreateCity>>;
    dataCreateCountry: IDataCreateCountry;
    setDataCreateCountry: React.Dispatch<React.SetStateAction<IDataCreateCountry>>;
    showCreateCity: boolean;
    setShowCreateCity: React.Dispatch<React.SetStateAction<boolean>>;
    showCreateCountry: boolean;
    setShowCreateCountry: React.Dispatch<React.SetStateAction<boolean>>;
    uploadFile: boolean;
    setUploadFile: React.Dispatch<React.SetStateAction<boolean>>;
    countryId: number | null;
    setCountryId: React.Dispatch<React.SetStateAction<number | null>>;
    propertyTypeId: number | null;
    setPropertyTypeId: React.Dispatch<React.SetStateAction<number | null>>;
    dataPropertyTypes: IPropertyType[];
    setDataPropertyTypes: React.Dispatch<React.SetStateAction<IPropertyType[]>>;
    cityList: ICity[];
    setCityList: React.Dispatch<React.SetStateAction<ICity[]>>;
    countryList: ICountry[];
    setCountryList: React.Dispatch<React.SetStateAction<ICountry[]>>;
    propertyTypes: IPropertyType[];
    setPropertyTypes: React.Dispatch<React.SetStateAction<IPropertyType[]>>;
    isPendingCreateCountry: boolean;
    isPendingCities: boolean;
    isPendingCountries: boolean;
    isPendingPropertyTypes: boolean;
    propertyType: IPropertyType;
    setPropertyType: React.Dispatch<React.SetStateAction<IPropertyType>>;
    isPendingCreatePropertyType: boolean;
    dataPropertyGeneralInfo: IPropertyGeneralInfo | null;
    isPendingPropertyGeneralInfo: boolean;
    isError: boolean;
    error: string | null;
    isPendingUpdateGeneralInfo: boolean; 
    isPendingCreateCity: boolean; 
    mutateCreateCountry: () => void;
    mutateCreatePropertyType: () => void;
    mutateCreateCity: () => void;
    mutateUpdateGeneralInfo: any;
  }