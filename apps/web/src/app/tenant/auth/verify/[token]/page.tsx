'use client'

import React from 'react'
import { Formik, Form } from 'formik'
import TextInput from '@/features/auth/components/TextInput'
import AuthButton from '@/features/auth/components/AuthButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import { verifyEmailValidationSchema } from '@/features/auth/verify/schemas/verifyEmailValidationSchema'
import useVerifyEmailTenantHook from '../../../../../features/tenant/auth/verify/token/hooks/useVerifyEmailTenantHook'

const VerifyEmailTenantPage = ({ params }: { params: { token: string } }) => {
  const { mutateVerifyEmail, isPendingVerifyEmail, isSuccessVerifyEmail } =
    useVerifyEmailTenantHook({ params })

  return (
    <main className="flex justify-center items-center h-full w-full">
      <section className="md:w-[768px] w-full flex flex-col gap-8">
        <AuthHGroup
          header1="Verify Email"
          header6="Please input new password for completing email verification and upscale your properties value!"
        />
        <Formik
          initialValues={{
            setPassword: '',
            confirmPassword: '',
          }}
          validationSchema={verifyEmailValidationSchema}
          onSubmit={(values) => {
            mutateVerifyEmail(values)
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
              <TextInput
                labelName="Confirm Password"
                name="confirmPassword"
                placeholder="example123"
                type="password"
              />
              <AuthButton
                isPending={Boolean(
                  isPendingVerifyEmail ||
                    isSuccessVerifyEmail ||
                    !values.confirmPassword ||
                    !values.setPassword,
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

export default VerifyEmailTenantPage
