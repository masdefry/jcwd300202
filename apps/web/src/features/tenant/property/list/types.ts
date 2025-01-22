export interface ISearchParamsPropertyList {
    sort: string
    limit: string
    offset: string
    select: string
    period: string
    name: string
  }

  export interface IPropertyData {
    id: string
    name: string
    description: string
    location: string
    price: number
    status: string
  }
  
  export interface IFetchDataPropertiesResponse {
    data: {
      data: IPropertyData[]
    }
  }
  
  export interface IFilterAndSortPropertyListResponse {
    data: IPropertyData[]
  }
  
  export interface IFilterAndSortParams {
    searchParams: ISearchParamsPropertyList
    searchProperty: string
    searchParamsInState: ISearchParamsPropertyList
  }
  
  export interface IUseFilterAndSortPropertyListHook {
    searchProperty: string
    setSearchProperty: React.Dispatch<React.SetStateAction<string>>
    dataProperties: IPropertyData[]
    setDataProperties: React.Dispatch<React.SetStateAction<IPropertyData[]>>
    isPendingProperties: boolean
    setIsPendingProperties: React.Dispatch<React.SetStateAction<boolean>>
    searchParamsInState: ISearchParamsPropertyList
    setSearchParamsInState: React.Dispatch<React.SetStateAction<ISearchParamsPropertyList>>
  handleSortedDataProperties: ({orderBy, value} : {orderBy: string, value: string}) => void
    handleFilterByStatus: ({value}:{value: string}) => void
    handlePeriod: ({value}:{value: string}) => void
    handlePagination: (limit: number, offset: number) => void
    debouncedMutateFilterAndSortPropertyList: () => void
    handleFilterByName: (value: string) => void
  }
  