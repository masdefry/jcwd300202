'use client'

import React, { useState } from 'react'
import useMutateCreateRoomApi from '@/features/tenant/property/manage/room-details/add-room/api/useMutateCreateRoomApi'
import toast from 'react-hot-toast'
import useQueryDataRoomFacilitiesApi from '@/features/tenant/property/manage/room-details/add-room/api/useQueryDataRoomFacilitiesApi'
import useMutateCreatePropertyRoomFacilityApi from '@/features/tenant/property/manage/room-details/add-room/api/useMutateCreatePropertyRoomFacilityApi'

const useManageAddRoomHook = ({ params }: { params: { slug: string } }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutateCreateRoom, isPendingCreateRoom } = useMutateCreateRoomApi({
    params,
    onSuccess: (res) => {
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

  const { dataRoomFacilities, isPendingRoomFacilities } =
    useQueryDataRoomFacilitiesApi()
  const [
    showCreatePropertyRoomFacilityForm,
    setShowCreatePropertyRoomFacilityForm,
  ] = useState(false)
  const [dataCreatePropertyRoomFacility, setDataCreatePropertyRoomFacility] =
    useState({
      name: '',
      file: [] as File[],
    })
  const [changedCheckbox, setChangedCheckbox] = useState(false)
  const [uploadFile, setUploadFile] = useState(false)

  const {
    mutateCreatePropertyRoomFacility,
    isPendingCreatePropertyRoomFacility,
  } = useMutateCreatePropertyRoomFacilityApi({
    dataCreatePropertyRoomFacility,
    onSuccess: (res) => {
      setShowCreatePropertyRoomFacilityForm(false)
      setDataCreatePropertyRoomFacility({
        name: '',
        file: [],
      })
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
    isSubmitting,
    setIsSubmitting,
    mutateCreateRoom,
    isPendingCreateRoom,
    dataRoomFacilities,
    isPendingRoomFacilities,
    showCreatePropertyRoomFacilityForm,
    setShowCreatePropertyRoomFacilityForm,
    dataCreatePropertyRoomFacility,
    setDataCreatePropertyRoomFacility,
    changedCheckbox,
    setChangedCheckbox,
    uploadFile,
    setUploadFile,
    mutateCreatePropertyRoomFacility,
    isPendingCreatePropertyRoomFacility,
  }
}

export default useManageAddRoomHook
