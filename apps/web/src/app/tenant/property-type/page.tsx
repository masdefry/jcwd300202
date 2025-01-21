'use client'

import React, { useEffect } from 'react'
import HGroupPropertyType from '@/features/tenant/property-type/components/HGroupPropertyType'
import PropertyTypeList from '@/features/tenant/property-type/components/PropertyTypeList'
import FilterAndSortPropertyType from '@/features/tenant/property-type/components/FilterAndSortPropertyType'
import ButtonPropertyTypePagination from '@/features/tenant/property-type/components/ButtonPropertyTypePagination'
import { ISearchParamsTenantPropertyType } from '@/features/tenant/property-type/types'
import useManagePropertyTypeHook from '@/features/tenant/property-type/hooks/useManagePropertyTypeHook'

const TenantPropertyTypePage = ({
  searchParams,
}: {
  searchParams: ISearchParamsTenantPropertyType
}) => {
  const {
    isLoading,
    dataPropertyTypes,
    isPendingCreatePropertyType,
    isPendingDeletePropertyType,
    isPendingUpdatePropertyType,
    isPendingRefreshPage,
    handleCreatePropertyType,
    handleDeletePropertyType,
    handleUpdatePropertyType,
    handlePagination,
    handleSort,
    handleFilter,
    fetchDataPropertyTypes,
  } = useManagePropertyTypeHook({ searchParams })

  useEffect(() => {
    fetchDataPropertyTypes()
  }, [])
  return (
    <main className="overflow-x-auto">
      <section className="flex flex-col gap-5">
        <HGroupPropertyType isPending={isLoading} />
        <FilterAndSortPropertyType
          isPending={isLoading}
          handleCreatePropertyType={handleCreatePropertyType}
          searchParams={searchParams}
          handleSort={handleSort}
          handleFilter={handleFilter}
        />
        <div className="w-[1200px] mx-auto">
          <PropertyTypeList
            isPending={
              isLoading ||
              isPendingCreatePropertyType ||
              isPendingDeletePropertyType ||
              isPendingRefreshPage ||
              isPendingUpdatePropertyType
            }
            offset={dataPropertyTypes?.offset}
            handleCreatePropertyType={handleCreatePropertyType}
            handleDeletePropertyType={handleDeletePropertyType}
            dataPropertyTypes={dataPropertyTypes?.propertyTypes}
            handleUpdatePropertyType={handleUpdatePropertyType}
          />
        </div>
        <div className="w-[1080px]">
          <ButtonPropertyTypePagination
            isPending={
              isLoading ||
              isPendingCreatePropertyType ||
              isPendingDeletePropertyType ||
              isPendingRefreshPage ||
              isPendingUpdatePropertyType
            }
            dataPropertyTypes={dataPropertyTypes}
            handlePagination={handlePagination}
          />
        </div>
      </section>
    </main>
  )
}

export default TenantPropertyTypePage
