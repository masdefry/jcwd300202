'use client'

import AuthButton from '@/features/auth/components/AuthButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import TextInput from '@/features/auth/components/TextInput'
import { emailValidationSchema } from '@/features/auth/schemas/emailValidationSchema'
import { Formik, Form, ErrorMessage } from 'formik'
import React from 'react'
import useRequestEmailResetPasswordUserHook from '../../../../features/auth/reset-password/hooks/useRequestResetPasswordUserHook'
import useRequestEmailResetPasswordTenantHook from '@/features/tenant/auth/reset-password/hooks/useRequestResetPasswordUserHook'

const ResetPasswordTenantPage = () => {
  const {
    mutateRequestEmailResetPassword,
    isPendingRequestEmailResetPassword,
  } = useRequestEmailResetPasswordTenantHook()

  return (
    <main className="flex justify-center items-center h-full w-full">
      <section className="md:w-[768px] w-full flex flex-col gap-8">
        <AuthHGroup
          header1="Reset Password"
          header6="Please enter your email to continue the password reset process"
        />
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={emailValidationSchema}
          onSubmit={(values) => {
            mutateRequestEmailResetPassword(values)
          }}
        >
          {({ values }) => (
            <Form className="flex flex-col gap-5">
              <TextInput
                labelName="Email"
                name="email"
                placeholder="example123"
                type="text"
              />
              <AuthButton
                isPending={isPendingRequestEmailResetPassword || !values.email}
                text="Continue"
              />
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default ResetPasswordTenantPage
