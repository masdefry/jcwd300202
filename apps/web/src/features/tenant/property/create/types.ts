export interface IProperty {
    id: string;
    name: string;
    address: string;
    zipCode: string;
    location: string;
    checkInStartTime: Date;
    checkInEndTime?: Date;
    checkOutStartTime?: Date;
    checkOutEndTime: Date;
    slug: string;
    star?: number;
    propertyTypeId?: number;

    propertyRoomType: IPropertyRoomType[]
    propertyDetail: IPropertyDetail[]
  
    tenantId?: string;
  
    countryId?: number;
  
    cityId?: number;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }
  
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

  export interface IPropertyDetail {
    id: number;
    propertyDescription: string;
    neighborhoodDescription: string;
    phoneNumber: string;
    url?: string;
    totalRooms: number;
  
    
    propertyId: string;
    property: IProperty;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  


export interface IDataCreatePropertyFacility {
    name: string;
    file: File[];
  }
  
  export interface IDataCreatePropertyType {
    name: string;
    description: string;
  }
  
  export interface IDataCreatePropertyRoomFacility {
    name: string;
    file: File[];
  }
  
  type RoomFacilities = any[];  
  
  export interface IPropertyType {
    name: string;
    id: string;
  }

  export interface IDataCreateCity {
    name: string;
    file: File[];
    countryId: null | number;
  }
  
  export interface IDataCreateCountry {
    name: string;
    description: string;
    file: File[];
  }
  
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

  export interface IUseStateCreatePropertyHook {
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
    roomFacilities: RoomFacilities;
    setRoomFacilities: React.Dispatch<React.SetStateAction<RoomFacilities>>;
    showFormCreatePropertyType: boolean;
    setShowFormCreatePropertyType: React.Dispatch<React.SetStateAction<boolean>>;
    inputPropertyType: string;
    setInputPropertyType: React.Dispatch<React.SetStateAction<string>>;
    inputCity: string;
    setInputCity: React.Dispatch<React.SetStateAction<string>>;
    inputCountry: string;
    setInputCountry: React.Dispatch<React.SetStateAction<string>>;
    dataCities: any;
    setDataCities: React.Dispatch<React.SetStateAction<any>>;
    dataCountries: any;
    setDataCountries: React.Dispatch<React.SetStateAction<any>>;
    inputCheckInStartTime: string;
    setInputCheckInStartTime: React.Dispatch<React.SetStateAction<string>>;
    inputCheckInEndTime: string;
    setInputCheckInEndTime: React.Dispatch<React.SetStateAction<string>>;
    inputCheckOutStartTime: string;
    setInputCheckOutStartTime: React.Dispatch<React.SetStateAction<string>>;
    inputCheckOutEndTime: string;
    setInputCheckOutEndTime: React.Dispatch<React.SetStateAction<string>>;
    showCreatePropertyFacilityForm: boolean;
    setShowCreatePropertyFacilityForm: React.Dispatch<React.SetStateAction<boolean>>;
    showCreateCity: boolean;
    setShowCreateCity: React.Dispatch<React.SetStateAction<boolean>>;
    showCreateCountry: boolean;
    setShowCreateCountry: React.Dispatch<React.SetStateAction<boolean>>;
    dataCreatePropertyFacility: IDataCreatePropertyFacility;
    setDataCreatePropertyFacility: React.Dispatch<React.SetStateAction<IDataCreatePropertyFacility>>;
    dataCreateCity: IDataCreateCity;
    setDataCreateCity: React.Dispatch<React.SetStateAction<IDataCreateCity>>;
    dataCreateCountry: IDataCreateCountry;
    setDataCreateCountry: React.Dispatch<React.SetStateAction<IDataCreateCountry>>;
    dataCreatePropertyType: IDataCreatePropertyType;
    setDataCreatePropertyType: React.Dispatch<React.SetStateAction<IDataCreatePropertyType>>;
    cityId: null | number;
    setCityId: React.Dispatch<React.SetStateAction<null | number>>;
    showCreatePropertyRoomFacilityForm: boolean;
    setShowCreatePropertyRoomFacilityForm: React.Dispatch<React.SetStateAction<boolean>>;
    dataCreatePropertyRoomFacility: IDataCreatePropertyRoomFacility;
    setDataCreatePropertyRoomFacility: React.Dispatch<React.SetStateAction<IDataCreatePropertyRoomFacility>>;
    uploadFile: boolean;
    setUploadFile: React.Dispatch<React.SetStateAction<boolean>>;
    countryId: null | number;
    setCountryId: React.Dispatch<React.SetStateAction<null | number>>;
    propertyTypeId: null | number;
    setPropertyTypeId: React.Dispatch<React.SetStateAction<null | number>>;
    dataPropertyTypes: any;
    setDataPropertyTypes: React.Dispatch<React.SetStateAction<any>>;
    cityList: any;
    setCityList: React.Dispatch<React.SetStateAction<any>>;
    countryList: any;
    setCountryList: React.Dispatch<React.SetStateAction<any>>;
    propertyTypes: any;
    setPropertyTypes: React.Dispatch<React.SetStateAction<any>>;
    propertyType: IPropertyType;
    setPropertyType: React.Dispatch<React.SetStateAction<IPropertyType>>;
    changedCheckbox: boolean;
    setChangedCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export interface ISectionGeneralInfoProps {
    propertyTypes: any[];
    cityList: any[];
    countryList: any[];
    isPendingCreateProperty: boolean;
    isPendingCreateCity: boolean;
    isPendingCreateCountry: boolean;
    isPendingCreatePropertyType: boolean;
    showFormCreatePropertyType: boolean;
    setShowFormCreatePropertyType: React.Dispatch<React.SetStateAction<boolean>>;
    setPropertyTypeId: React.Dispatch<React.SetStateAction<number | null>>;
    setCityId: React.Dispatch<React.SetStateAction<number | null>>;
    setCountryId: React.Dispatch<React.SetStateAction<number | null>>;
    setFieldValue: (field: string, value: any) => void;
    values: any;
    mutateCreateCity: any;
    mutateCreateCountry: any;
    mutateCreatePropertyType: any;
    mutateCreateProperty: any;
    dataCreateCity: any;
    setDataCreateCity: React.Dispatch<React.SetStateAction<any>>;
    dataCreateCountry: any;
    setDataCreateCountry: React.Dispatch<React.SetStateAction<any>>;
    dataCreatePropertyType: any;
    setDataCreatePropertyType: React.Dispatch<React.SetStateAction<any>>;
    cityId: number | null;
    countryId: number | null;
    propertyTypeId: number | null;
    showCreateCity: boolean;
    setShowCreateCity: React.Dispatch<React.SetStateAction<boolean>>;
    showCreateCountry: boolean;
    setShowCreateCountry: React.Dispatch<React.SetStateAction<boolean>>;
    uploadFile: boolean;
    setUploadFile: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export interface IPropertyData {
    cityId: number;
    countryId: number;
    name: string;
    zipCode: string;
    address: string;
    location: string;
    star: number;
    checkInStartTime: string;
    checkInEndTime: string;
    checkOutStartTime: string;
    checkOutEndTime: string;
    propertyTypeId: number;
    propertyTypeName: string;
    propertyFacilitiesId: number[];
    propertyFacilitiesName: string[];
    propertyImages: File[];
    propertyDescription: string;
    neighborhoodDescription: string;
    phoneNumber: string;
    url: string;
    totalRooms: number;
    propertyRoomTypes: any[];
  }