import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateCreatePropertyRoomFacilityApi = ({
  dataCreatePropertyRoomFacility,
  onError,
  onSuccess
}: {
  dataCreatePropertyRoomFacility: any
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateCreatePropertyRoomFacility,
    isPending: isPendingCreatePropertyRoomFacility,
  } = useMutation({
    mutationFn: async () => {
      const fd = new FormData()
      fd.append('name', dataCreatePropertyRoomFacility?.name)
      fd.append('images', dataCreatePropertyRoomFacility?.file[0])
      const res = await instance.post('/room-facility', fd)

      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateCreatePropertyRoomFacility,
    isPendingCreatePropertyRoomFacility
  }
}

export default useMutateCreatePropertyRoomFacilityApi
