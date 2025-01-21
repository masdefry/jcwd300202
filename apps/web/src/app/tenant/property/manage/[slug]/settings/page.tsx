'use client'

import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import DeletePropertyConfirmation from '@/features/tenant/property/manage/settings/components/DeletePropertyConfirmation'
import useManagePropertySettingsHook from '@/features/tenant/property/manage/settings/hooks/useManagePropertySettingsHook'
import LoadingPropertySettings from '@/features/tenant/property/manage/settings/components/LoadingPropertySettings'

const PropertySettingsPage = ({ params }: { params: { slug: string } }) => {
  const {
    isSubmitting,
    setIsSubmitting,
    setChange,
    isDeleted,
    setIsDeleted,
    dataForDelete,
    setDataForDelete,
    dataProperty,
    isPendingProperty,
    mutateDeleteProperty,
    isPendingDeleteProperty,
  } = useManagePropertySettingsHook({ params })
  if (isPendingProperty) {
    return (
      <LoadingPropertySettings
        isPendingDeleteProperty={isPendingDeleteProperty}
        isPendingProperty={isPendingProperty}
      />
    )
  }
  return (
    <main className="flex flex-col gap-5 2xl:p-5">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-gray-800">Property Settings</h1>
        <p className="text-sm font-medium text-slate-600">
          Manage your {dataProperty?.property?.name} property
        </p>
      </div>
      <section className="flex flex-col gap-4 py-4">
        <div className="bg-white px-5 pb-4 border-b border-slate-300 flex items-center justify-between">
          <hgroup className="flex flex-col">
            <h1 className="text-gray-800 text-medium font-bold">
              Delete Property
            </h1>
            <p className="text-gray-400 text-xs font-semibold">
              Your Property, Your Control – Delete Anytime, No Questions Asked!
            </p>
          </hgroup>
          <button
            disabled={isPendingProperty || isPendingDeleteProperty || isDeleted}
            onClick={() => {
              setDataForDelete({
                password: '',
                id: dataProperty?.property?.id,
                name: dataProperty?.property?.name,
              })
              setIsSubmitting(true)
            }}
            className="disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-white transition duration-100 flex items-center gap-1.5 text-sm font-bold text-white bg-red-600 rounded-full px-5 py-3 shadow-sm hover:opacity-75 active:scale-90"
          >
            <RiDeleteBin6Line size={18} />
            Delete
          </button>
          {isSubmitting && (
            <DeletePropertyConfirmation
              isPendingDeleteProperty={isPendingDeleteProperty}
              isDeleted={isDeleted}
              setDataForDelete={setDataForDelete}
              setIsSubmitting={setIsSubmitting}
              dataForDelete={dataForDelete}
              setChange={setChange}
              mutateDeleteProperty={mutateDeleteProperty}
            />
          )}
        </div>
      </section>
    </main>
  )
}

export default PropertySettingsPage
