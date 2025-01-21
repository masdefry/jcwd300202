'use client'

import React, { useState } from 'react'
import useQueryPropertyRoomImagesApi from '../api/useQueryPropertyRoomImagesApi'
import useMutateDeleteRoomImagesApi from '../api/useMutateDeleteRoomImagesApi'
import toast from 'react-hot-toast'
import useMutateCreateRoomImageApi from '../api/useMutateCreateRoomImageApi'

const useManageRoomImagesHook = ({
  params,
}: {
  params: { slug: string; id: string }
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPhoto, setShowPhoto] = useState({
    id: 0,
    directory: '',
    filename: '',
    fileExtension: '',
  })
  const [showAddPhoto, setShowAddPhoto] = useState(false)
  const {
    dataPropertyRoomImages,
    isPendingPropertyRoomImages,
    isError,
    error,
  } = useQueryPropertyRoomImagesApi({ params })

  const { mutateDeletePropertyImage, isPendingDeletePropertyImage } =
    useMutateDeleteRoomImagesApi({
      showPhoto,
      onSuccess: (res) => {
        setIsSubmitting(false)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const { mutateCreatePropertyRoomImage, isPendingCreatePropertyRoomImage } =
    useMutateCreateRoomImageApi({
      params,
      onSuccess: (res) => {
        setShowAddPhoto(false)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.reload()
        }, 1500)
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
    isSubmitting,
    setIsSubmitting,
    showPhoto,
    setShowPhoto,
    showAddPhoto,
    setShowAddPhoto,
    dataPropertyRoomImages,
    isPendingPropertyRoomImages,
    isError,
    error,
    mutateDeletePropertyImage,
    isPendingDeletePropertyImage,
    mutateCreatePropertyRoomImage,
    isPendingCreatePropertyRoomImage,
  }
}

export default useManageRoomImagesHook
