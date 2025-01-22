export interface IPropertyFacility {
  id: string
  name: string
  description?: string
}

export interface IPropertyHasFacilitiesData {
  propertyHasFacility: IPropertyFacility[]
  propertyNotHasFacility: IPropertyFacility[]
  propertyFacilitiesId: string[]
  property: Record<string, any>
}

export interface ICreatePropertyFacilityData {
  name: string
  file: File[]
}

type ErrorStatus = number | null

type LoadingState = boolean

export interface IFetchPropertyHasFacilitiesResponse {
  data: {
    data: IPropertyHasFacilitiesData
  }
}

export interface IMutateSearchPropertyFacilityResponse {
  data: IPropertyFacility[]
}

export interface IMutateCreatePropertyFacilityResponse {
  message: string
  data: IPropertyFacility
}

export interface IMutateUpdatePropertyHasFacilitiesResponse {
  message: string
  data: IPropertyHasFacilitiesData
}

export interface IUseFetchPropertyHasFacilitiesApiParams {
  params: Record<string, any>
  handleError: (err: {
    status: number
    response?: { data: { message: string } }
  }) => void
  handleSuccess: (res: IFetchPropertyHasFacilitiesResponse) => void
  handleFinally: () => void
}

export interface IUseMutateSearchPropertyFacilityApiParams {
  params: Record<string, any>
  onSuccess: (res: IMutateSearchPropertyFacilityResponse) => void
  onError: (err: { response: { data: { message: string } } }) => void
}

export interface IUseManagePropertyFacilitiesHook {
  setDataCreatePropertyFacility: React.Dispatch<
    React.SetStateAction<ICreatePropertyFacilityData>
  >
  isPendingCreatePropertyFacility: boolean
  setShowCreatePropertyFacilityForm: React.Dispatch<
    React.SetStateAction<boolean>
  >
  mutateCreatePropertyFacility: (data: ICreatePropertyFacilityData) => void
  dataCreatePropertyFacility: ICreatePropertyFacilityData
  setUploadFile: React.Dispatch<React.SetStateAction<boolean>>
  showCreatePropertyFacilityForm: boolean
  isLoadingFetch: LoadingState
  setIsLoadingFetch: React.Dispatch<React.SetStateAction<LoadingState>>
  dataPropertyHasFacilities: IPropertyHasFacilitiesData
  setDataPropertyHasFacilities: React.Dispatch<
    React.SetStateAction<IPropertyHasFacilitiesData>
  >
  showMorePropertyNotHasFacility: boolean
  setShowMorePropertyNotHasFacility: React.Dispatch<
    React.SetStateAction<boolean>
  >
  showMorePropertyHasFacility: boolean
  setShowMorePropertyHasFacility: React.Dispatch<React.SetStateAction<boolean>>
  fetchPropertyHasFacilities: () => void
  errorStatus: ErrorStatus
  setErrorStatus: React.Dispatch<React.SetStateAction<ErrorStatus>>
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  debounceSearchPropertyFacility: (value: string) => void
  mutateSearchPropertyFacility: (value: string) => void
  isPendingSearchPropertyFacility: boolean
  mutateUpdatePropertyHasFacilities: (data: IPropertyHasFacilitiesData) => void
  isPendingUpdatePropertyHasFacilities: boolean
}
