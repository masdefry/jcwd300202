'use client'

import React from 'react'
import { Formik } from 'formik'
import { createPropertyValidationSchema } from '@/features/tenant/property/create/schemas/createPropertyValidationSchema'

import useCreatePropertyFunctionalityHook from '@/features/tenant/property/create/hooks/useCreatePropertyFunctionalityHook'
import useHandleCreatePropertyHook from '@/features/tenant/property/create/hooks/useHandleCreatePropertyHook'
import FormCreateProperty from '@/features/tenant/property/create/components/FormCreateProperty'

const CreatePropertyPage = () => {
  const { mutateCreateProperty, setIsSubmitting, isSubmitting } =
    useCreatePropertyFunctionalityHook()

  return (
    <main className={`w-full md:px-5`}>
      <section className="mx-auto max-w-screen-2xl w-full h-full flex items-start gap-5 px-5 py-5">
        <div className="w-full">
          <Formik
            initialValues={{
              cityId: 0,
              countryId: 0,
              name: '',
              zipCode: '',
              address: '',
              location: '',
              star: 0,
              checkInStartTime: '14:00',
              checkInEndTime: '',
              checkOutStartTime: '',
              checkOutEndTime: '10:00',
              propertyTypeId: 0,
              propertyTypeName: '',
              propertyFacilitiesId: [],
              propertyFacilitiesName: [],
              propertyImages: [] as File[],
              propertyDescription: '',
              neighborhoodDescription: '',
              phoneNumber: '',
              url: '',
              totalRooms: 30,
              propertyRoomTypes: [
                {
                  name: '',
                  capacity: 2,
                  totalRooms: 1,
                  price: 500000,
                  rooms: 1,
                  bathrooms: 1,
                  description: '',
                  roomFacilities: [],
                  roomImages: [] as File[],
                },
              ],
            }}
            validationSchema={createPropertyValidationSchema}
            onSubmit={(values) => {
              setIsSubmitting(true)
            }}
          >
            {({ values, setFieldValue }) => {
              return (
                <FormCreateProperty
                  setFieldValue={setFieldValue}
                  values={values}
                  isFormFilled={true}
                  mutateCreateProperty={mutateCreateProperty}
                  setIsSubmitting={setIsSubmitting} 
                  isSubmitting={isSubmitting}
                />
              )
            }}
          </Formik>
        </div>
      </section>
    </main>
  )
}

export default CreatePropertyPage
