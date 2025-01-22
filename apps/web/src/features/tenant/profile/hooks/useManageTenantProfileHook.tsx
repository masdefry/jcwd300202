'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useQueryTenantProfileApi from '../api/useQueryTenantProfileApi'
import useMutateUpdateTenantProfilePictureApi from '../api/useMutateUpdateTenantProfilePictureApi'
import useMutateUpdateEmailTenantApi from '../api/useMutateUpdateEmailTenantApi'
import useMutateUpdateTenantProfileApi from '../api/useMutateUpdateTenantProfileApi'

const useManageTenantProfileHook = () => {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState('')
  const { dataTenantProfile, isPendingTenantProfile } =
    useQueryTenantProfileApi()
  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    mutateUpdateTenantProfilePicture,
    isPendingUpdateTenantProfilePicture,
  } = useMutateUpdateTenantProfilePictureApi({
    onSuccess: (res: any) => {},
    onError: (err: any) => {},
  })

  const { mutateUpdateEmail, isPendingUpdateEmail } =
    useMutateUpdateEmailTenantApi({
      newEmail,
      onSuccess: (res) => {
        setShowChangeEmail(false)
        setNewEmail('')
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

  const { mutateUpdateTenantProfile, isPendingUpdateTenantProfile } =
    useMutateUpdateTenantProfileApi({
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
    dataTenantProfile,
    isPendingTenantProfile,
    showChangeEmail,
    setShowChangeEmail,
    newEmail,
    setNewEmail,
    isSubmitting,
    setIsSubmitting,
    mutateUpdateTenantProfilePicture,
    isPendingUpdateTenantProfilePicture,
    mutateUpdateEmail,
    isPendingUpdateEmail,
    mutateUpdateTenantProfile,
    isPendingUpdateTenantProfile,
  }
}

export default useManageTenantProfileHook
