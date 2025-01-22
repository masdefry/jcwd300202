export interface IPasswordForDelete {
  password: string
}

export interface IUseManageTenantSettingsHook {
  isDeleted: boolean
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
  change: boolean
  setChange: React.Dispatch<React.SetStateAction<boolean>>
  passwordForDelete: IPasswordForDelete
  setPasswordForDelete: React.Dispatch<React.SetStateAction<IPasswordForDelete>>
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  mutateDeleteAccount: () => void
  isPendingDeleteAccount: boolean
  mutateRequestVerifyEmail: () => void
  isPendingRequestVerifyEmail: boolean
}
