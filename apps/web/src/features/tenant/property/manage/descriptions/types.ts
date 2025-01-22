export interface IParams {
  slug: string
}

export interface IPropertyDescription {
  id: string
  description: string
}

export interface IErrorResponse {
  response?: {
    data: {
      message: string
    }
  }
}

export interface IUseManageDescriptionsHook {
  dataPropertyDescriptions: IPropertyDescription[] | null
  isPendingPropertyDescriptions: boolean
  error: IErrorResponse | null
  isError: boolean
  mutateUpdatePropertyDescriptions: (variables: any) => void 
  isPendingUpdatePropertyDescriptions: boolean
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}
