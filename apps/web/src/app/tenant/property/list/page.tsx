'use client'

import React, { useEffect } from 'react'
import TablePropertyList from '@/features/tenant/property/list/components/TablePropertyList'
import TenantPropertiesGeneralInfo from '@/features/tenant/property/list/components/TenantPropertiesGeneralInfo'
import HGroupPropertyList from '@/features/tenant/property/list/components/HGroupPropertyList'
import FilterAndSortPropertyList from '@/features/tenant/property/list/components/FilterAndSortPropertyList'
import useFilterAndSortPropertyListHook from '@/features/tenant/property/list/hooks/useFilterAndSortPropertyListHook'
import { ISearchParamsPropertyList } from '@/features/tenant/property/list/types'


const PropertyListPage = ({
  searchParams,
}: {
  searchParams: ISearchParamsPropertyList
}) => {
  const {
    searchProperty,
    setSearchProperty,
    handleFilterByName,
    handleFilterByStatus,
    handlePagination,
    handlePeriod,
    handleSortedDataProperties,
    fetchDataProperties,
    dataProperties,
    isPendingProperties,
    isPendingFilterAndSortPropertyList,
  } = useFilterAndSortPropertyListHook({ searchParams })
  useEffect(() => {
    fetchDataProperties()
  }, [])

  return (
    <main className="overflow-x-auto">
      <section className="flex flex-col gap-5">
        <HGroupPropertyList isPending={isPendingProperties} />
        <TenantPropertiesGeneralInfo
          dataProperties={dataProperties}
          isPending={isPendingFilterAndSortPropertyList || isPendingProperties}
        />
        <FilterAndSortPropertyList
          isPending={isPendingProperties}
          setSearchProperty={setSearchProperty}
          searchProperty={searchProperty}
          handleSortedDataProperties={handleSortedDataProperties}
          handleFilterByStatus={handleFilterByStatus}
          handleFilterByName={handleFilterByName}
          handlePeriod={handlePeriod}
          searchParams={searchParams}
        />
        <TablePropertyList
          dataProperties={dataProperties}
          handlePagination={handlePagination}
          isPending={isPendingFilterAndSortPropertyList || isPendingProperties}
        />
      </section>
    </main>
  )
}

export default PropertyListPage
