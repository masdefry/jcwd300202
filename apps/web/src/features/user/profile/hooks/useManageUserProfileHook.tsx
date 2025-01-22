'use client'

import React, { useState } from 'react'
import useQueryUserProfileApi from '../api/useQueryUserProfileApi'
import useMutateUpdateUserPictureApi from '../api/useMutateUpdateUserPictureApi'
import toast from 'react-hot-toast'
import useMutateUpdateUserEmailApi from '../api/useMutateUpdateUserEmailApi'
import useMutateUpdateUserProfileApi from '../api/useMutateUpdateUserProfileApi'

const useManageUserProfileHook = () => {
  const [imagePreview, setImagePreview] = useState('')
  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const { dataUserProfile, isPendingUserProfile } = useQueryUserProfileApi()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutateUpdateUserProfilePicture, isPendingUpdateUserProfilePicture } =
    useMutateUpdateUserPictureApi({
      onSuccess: (res: any) => {},
      onError: (err: any) => {},
    })

  const { mutateUpdateEmail, isPendingUpdateEmail } =
    useMutateUpdateUserEmailApi({
      newEmail,
      onSuccess: (res) => {
        setShowChangeEmail(false)
        setNewEmail('')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const { mutateUpdateUserProfile, isPendingUpdateUserProfile } =
    useMutateUpdateUserProfileApi({
      onSuccess: (res: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  return {
    imagePreview,
    setImagePreview,
    showChangeEmail,
    setShowChangeEmail,
    newEmail,
    setNewEmail,
    dataUserProfile,
    isPendingUserProfile,
    isSubmitting,
    setIsSubmitting,
    isPendingUpdateUserProfilePicture,
    isPendingUpdateEmail,
    isPendingUpdateUserProfile,
    mutateUpdateEmail,
    mutateUpdateUserProfile,
    mutateUpdateUserProfilePicture,
  }
}

export default useManageUserProfileHook
