'use client'

import React, { useState } from 'react'
import useQueryPropertyRoomTypesApi from '../api/useQueryPropertyRoomTypesApi'
import useMutateDeleteRoomTypeApi from '../api/useMutateDeleteRoomTypeApi'
import toast from 'react-hot-toast'

const useManageRoomDetailsHook = ({ params }: { params: { slug: string } }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [change, setChange] = useState(true)
  const [dataForDelete, setDataForDelete] = useState({
    password: '',
    id: '',
    name: '',
  })
  const { dataPropertyRoomTypes, isPendingPropertyRoomTypes, isError, error } =
    useQueryPropertyRoomTypesApi({ params })

  const { mutateDeletePropertyRoomType, isPendingDeletePropertyRoomType } =
    useMutateDeleteRoomTypeApi({
      params,
      dataForDelete,
      onSuccess: (res) => {
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
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    change,
    setChange,
    dataForDelete,
    setDataForDelete,
    dataPropertyRoomTypes,
    isPendingPropertyRoomTypes,
    isError,
    error,
    mutateDeletePropertyRoomType,
    isPendingDeletePropertyRoomType,
  }
}

export default useManageRoomDetailsHook
