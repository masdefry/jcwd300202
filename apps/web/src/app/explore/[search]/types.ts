export interface ISearchParamsExplore {
  name: string
  city: string
  country: string
  type: string
  order: string
  sort: string
  limit: string
  offset: string
  children: string
  adult: string
  'min-price': string
  'max-price': string
  'check-in-date': string
  'check-out-date': string
}

export interface IParamMutateExplore {
  sort: string
  order: string
  limit: number
  offset: number
  minPrice: number
  maxPrice: number
  name: string
}

export interface IUseExploreProperties {
  priceRange: number[]
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>
  errorStatus: null | number
  setErrorStatus: React.Dispatch<React.SetStateAction<null | number>>
  totalDays: number
  setTotalDays: React.Dispatch<React.SetStateAction<number>>
  dataProperties: any
  setDataProperties: React.Dispatch<React.SetStateAction<any>>
  propertyFacilityIdArr: any[]
  setPropertyFacilityIdArr: React.Dispatch<React.SetStateAction<any[]>>
  propertyRoomFacilityIdArr: any[]
  setPropertyRoomFacilityIdArr: React.Dispatch<React.SetStateAction<any[]>>
  paramMutateExplore: IParamMutateExplore
  setParamMutateExplore: React.Dispatch<
    React.SetStateAction<IParamMutateExplore>
  >
  propertyTypeIdArr: any[]
  setPropertyTypeIdArr: React.Dispatch<React.SetStateAction<any[]>>
  propertyStarArr: any[]
  setPropertyStarArr: React.Dispatch<React.SetStateAction<any[]>>
  filterMobileMode: boolean
  setFilterMobileMode: React.Dispatch<React.SetStateAction<boolean>>
  searchName: string
  setSearchName: React.Dispatch<React.SetStateAction<string>>
  sortMobileMode: boolean
  setSortMobileMode: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  minPrice: number
  setMinPrice: React.Dispatch<React.SetStateAction<number>>
  maxPrice: number
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>
  changeParameter: boolean
  setChangeParameter: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IExploreFilterAndSortProps {
  mutateExploreFilterAndSort: () => void
  mutateExplorePagination: () => void
  setParamMutateExplore: React.Dispatch<React.SetStateAction<any>>
  minPrice: number
  setMinPrice: React.Dispatch<React.SetStateAction<number>>
  maxPrice: number
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>
  propertyFacilityIdArr: number[]
  setPropertyFacilityIdArr: React.Dispatch<React.SetStateAction<number[]>>
  propertyRoomFacilityIdArr: number[]
  setPropertyRoomFacilityIdArr: React.Dispatch<React.SetStateAction<number[]>>
  propertyTypeIdArr: number[]
  setPropertyTypeIdArr: React.Dispatch<React.SetStateAction<number[]>>
  propertyStarArr: number[]
  setPropertyStarArr: React.Dispatch<React.SetStateAction<number[]>>
  searchParams: any
  setDataProperties: React.Dispatch<React.SetStateAction<any>>
  setErrorStatus: React.Dispatch<React.SetStateAction<null | number>>
}

export type THandleSearchParams = (orderBy: string, value: string) => void

export type THandlePrice = (
  priceType: 'minPrice' | 'maxPrice',
  event: React.ChangeEvent<HTMLInputElement>,
) => void

export type THandlePriceFilterSubmit = () => void

export type THandlePropertyFacilityFilter = (
  isChecked: boolean,
  value: string | number,
) => void

export type THandlePropertyRoomFacilityFilter = (
  isChecked: boolean,
  value: string | number,
) => void

export type THandlePropertyTypeIdFilter = (
  isChecked: boolean,
  value: string | number,
) => void

export type THandlePropertyStarFilter = (
  isChecked: boolean,
  value: string | number,
) => void

export type THandlePagination = ({
  limit,
  offset,
}: {
  limit: number
  offset: number
}) => void

export type THandleFilterName = (name: string) => void

export type THandleSort = ({
  sortBy,
  order,
}: {
  sortBy: string
  order: string
}) => void
