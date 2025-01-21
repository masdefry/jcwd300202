export enum Role {
  USER = 'USER',
  TENANT = 'TENANT',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface IUserProfile {
  id: string
  email: string
  password?: string | null
  isVerified: boolean
  role: Role
  isGoogleRegistered: boolean
  token?: string | null
  username?: string | null
  phoneNumber?: string | null
  birthDate?: Date | null
  nationality?: string | null
  gender?: Gender | null
  address?: string | null
  directory?: string | null
  filename?: string | null
  fileExtension?: string | null
  profilePictureUrl: string
}

export interface IUseManageUserProfileHook {
  imagePreview: string
  setImagePreview: React.Dispatch<React.SetStateAction<string>>
  showChangeEmail: boolean
  setShowChangeEmail: React.Dispatch<React.SetStateAction<boolean>>
  newEmail: string
  setNewEmail: React.Dispatch<React.SetStateAction<string>>
  dataUserProfile: IUserProfile | null
  isPendingUserProfile: boolean
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  isPendingUpdateUserProfilePicture: boolean
  isPendingUpdateEmail: boolean
  isPendingUpdateUserProfile: boolean
}

export interface IUseMutateUpdateUserProfilePictureApi {
  mutateUpdateUserProfilePicture: (file: File) => void
  isPendingUpdateUserProfilePicture: boolean
}

export interface IUseMutateUpdateUserEmailApi {
  mutateUpdateEmail: (newEmail: string) => void
  isPendingUpdateEmail: boolean
}

export interface IUseMutateUpdateUserProfileApi {
  mutateUpdateUserProfile: (updatedProfileData: Partial<IUserProfile>) => void
  isPendingUpdateUserProfile: boolean
}
