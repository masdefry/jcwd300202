'use client'

import { useQuery } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import useMutateCreatePropertyRoomFacilityApi from '../api/useMutateCreatePropertyRoomFacilityApi';
import useQueryPropertyRoomFacilitiesApi from '../api/useQueryPropertyRoomFacilitiesApi';
import { IUseStateCreatePropertyHook } from '../types';

const useCreatePropertyRoomFacilityHook = ({ dataCreatePropertyRoomFacility, setShowCreatePropertyRoomFacilityForm, setDataCreatePropertyRoomFacility}: Pick<IUseStateCreatePropertyHook, 'setShowCreatePropertyRoomFacilityForm' | 'setDataCreatePropertyRoomFacility' | 'dataCreatePropertyRoomFacility' >) => {
    const { dataRoomFacilities, isPendingRoomFacilities } = useQueryPropertyRoomFacilitiesApi()
      
      const { mutateCreatePropertyRoomFacility, isPendingCreatePropertyRoomFacility } = useMutateCreatePropertyRoomFacilityApi({
        dataCreatePropertyRoomFacility,
        onSuccess: (res) => {
            setShowCreatePropertyRoomFacilityForm(false);
            setDataCreatePropertyRoomFacility({
              name: '',
              file: [],
            });
            toast((t) => (
              <span className="flex gap-2 items-center font-semibold justify-center text-xs">
                {res?.message}
              </span>
            ));
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          onError: (err: any) => {
            toast((t) => (
              <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
                {err?.response?.data?.message || 'Connection error!'}
              </span>
            ));
          },
      })
      


  
    return {
        mutateCreatePropertyRoomFacility,
        isPendingCreatePropertyRoomFacility,
        dataRoomFacilities,
        isPendingRoomFacilities
    }
}

export default useCreatePropertyRoomFacilityHook
