'use client'

import AuthHGroup from '@/features/auth/components/AuthHGroup'
import AuthButton from '@/features/auth/components/AuthButton'
import TextInput from '@/features/auth/components/TextInput'
import { Formik, Form, ErrorMessage } from 'formik'
import React from 'react'
import { verifyEmailValidationSchema } from '@/features/auth/verify/schemas/verifyEmailValidationSchema'
import useResetPasswordTenantHook from '@/features/tenant/auth/reset-password/token/hooks/useResetPasswordTenantHook'
const SetResetPasswordTenantPage = ({
  params,
}: {
  params: { token: string }
}) => {
  const {
    mutateResetPassword,
    isPendingResetPassword,
    isSuccessResetPassword,
    handleClearSearchParams,
  } = useResetPasswordTenantHook({ params })

  return (
    <main className="flex justify-center items-center h-full w-full">
      <section className="md:w-[768px] w-full flex flex-col gap-8">
        <AuthHGroup
          header1="Reset Password"
          header6="Please enter new password to complete the password reset process, enjoy Roomify!"
        />
        <Formik
          initialValues={{
            setPassword: '',
            confirmPassword: '',
          }}
          validationSchema={verifyEmailValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleClearSearchParams()
            mutateResetPassword(values)
            resetForm()
          }}
        >
          {({ values }) => (
            <Form className="flex flex-col gap-5">
              <TextInput
                labelName="Set Password"
                name="setPassword"
                placeholder="example123"
                type="password"
              />
              <ErrorMessage
                name="setPassword"
                component={'div'}
                className="text-red-600 text-sm mt-[-10px] ml-4"
              />
              <TextInput
                labelName="Confirm Password"
                name="confirmPassword"
                placeholder="example123"
                type="password"
              />
              <ErrorMessage
                name="confirmPassword"
                component={'div'}
                className="text-red-600 text-sm mt-[-10px] ml-4"
              />
              <AuthButton
                isPending={Boolean(
                  isPendingResetPassword ||
                    isSuccessResetPassword ||
                    !values.setPassword ||
                    !values.confirmPassword,
                )}
                text="Continue"
              />
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default SetResetPasswordTenantPage
