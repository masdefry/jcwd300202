export interface IPasswordForDelete {
  password: string
}

export interface IApiResponse {
  message: string
}

export interface IApiErrorResponse {
  response?: {
    data?: {
      message: string
    }
  }
}

export interface IUseManageUserSettingsHook{
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  change: boolean
  setChange: React.Dispatch<React.SetStateAction<boolean>>
  isDeleted: boolean
  passwordForDelete: IPasswordForDelete
  setPasswordForDelete: React.Dispatch<React.SetStateAction<IPasswordForDelete>>
  mutateRequestVerifyEmail: (variables: any) => void 
  isPendingRequestVerifyEmail: boolean
  mutateDeleteAccount: () => void
  isPendingDeleteAccount: boolean
}
