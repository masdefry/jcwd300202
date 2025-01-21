'use client'

import React, { useState } from 'react'
import useMutateCreatePropertyImageApi from '../api/useMutateCreatePropertyImageApi'
import toast from 'react-hot-toast'
import useQueryPropertyImagesApi from '../api/useQueryPropertyImagesApi'
import useMutateDeletePropertyImageApi from '../api/useMutateDeletePropertyImageApi'

const useManagePhotosHook = ({ params }: { params: { slug: string } }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPhoto, setShowPhoto] = useState({
    id: 0,
    directory: '',
    filename: '',
    fileExtension: '',
  })
  const [showAddPhoto, setShowAddPhoto] = useState(false)
  const { dataPropertyImages, isPendingPropertyImages, isError, error } = useQueryPropertyImagesApi({
    params,
  })

  const { mutateDeletePropertyImage, isPendingDeletePropertyImage } =
    useMutateDeletePropertyImageApi({
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

  const { mutateCreatePropertyImage, isPendingCreatePropertyImage } =
    useMutateCreatePropertyImageApi({
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
    dataPropertyImages,
    isError,
    error,
    mutateDeletePropertyImage,
    isPendingDeletePropertyImage,
    mutateCreatePropertyImage,
    isPendingCreatePropertyImage,
    isPendingPropertyImages
  }
}

export default useManagePhotosHook
