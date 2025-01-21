'use client'

import React, { useState } from 'react'
import useMutateDeletePropertyApi from '../api/useMutateDeletePropertyApi'
import toast from 'react-hot-toast'
import useQueryPropertyApi from '../api/useQueryPropertyApi'

const useManagePropertySettingsHook = ({
  params,
}: {
  params: { slug: string }
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [change, setChange] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)
  const [dataForDelete, setDataForDelete] = useState({
    password: '',
    id: '',
    name: '',
  })
  const { dataProperty, isPendingProperty } = useQueryPropertyApi({ params })

  const { mutateDeleteProperty, isPendingDeleteProperty } =
    useMutateDeletePropertyApi({
      params,
      onSuccess: (res) => {
        setDataForDelete({ password: '', id: '', name: '' })
        setIsSubmitting(false)
        setIsDeleted(true)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.href = '/tenant/property/list'
        }, 1500)
      },
      onError: (err: any) => {
        setDataForDelete({ password: '', id: '', name: '' })
        setIsSubmitting(false)
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
      dataForDelete,
    })

  return {
    isSubmitting,
    setIsSubmitting,
    change,
    setChange,
    isDeleted,
    setIsDeleted,
    dataForDelete,
    setDataForDelete,
    dataProperty,
    isPendingProperty,
    mutateDeleteProperty,
    isPendingDeleteProperty,
  }
}

export default useManagePropertySettingsHook
