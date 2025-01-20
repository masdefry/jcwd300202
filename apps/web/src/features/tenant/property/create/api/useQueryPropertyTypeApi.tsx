'use client'

import instance from '@/utils/axiosInstance';
import React from 'react'
import { IUseStateCreatePropertyHook } from '../types';
import { useQuery } from '@tanstack/react-query';

const useQueryPropertyTypeApi = ({ setPropertyTypes }: Pick<IUseStateCreatePropertyHook, 'setPropertyTypes'>) => {
    const { isPending: isPendingPropertyTypes } = useQuery({
        queryKey: ['getPropertyTypes'],
        queryFn: async () => {
          const res = await instance.get('/property-type/search');
          const dataForPropertyTypes = res?.data?.data?.map((item: any) => {
            return {
              label: item?.name,
              value: item?.id,
            };
          });
          setPropertyTypes(dataForPropertyTypes);
          return res;
        },
      });
  
    return {
        isPendingPropertyTypes
    }
}

export default useQueryPropertyTypeApi
