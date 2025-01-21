'use client'

import instance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import React from 'react'

interface IUseMutateGetPropertyTypeApi { 
    onSuccess: (res: any) => void,
    onError: (err: any) => void,
}
const useMutateGetPropertyTypeApi = ({ onSuccess, onError }: IUseMutateGetPropertyTypeApi) => {

    const { mutate: mutateGetPropertyTypes } = useMutation({
        mutationFn: async (value: string) => {
          const res = await instance.get(`/property-type/search?name=${value}`);
          return res;
        },
        onSuccess,
        onError,
      });
  return {
    mutateGetPropertyTypes
  }
}

export default useMutateGetPropertyTypeApi
