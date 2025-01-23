'use client'

import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import TextInput from '@/features/auth/components/TextInput'
import AuthButton from '@/features/auth/components/AuthButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import { verifyEmailValidationSchema } from '@/features/auth/verify/schemas/verifyEmailValidationSchema'
import useVerifyUserHook from '../../../../features/auth/verify/token/hooks/useVerifyUserHook'

const VerifyEmailUserPage = ({ params }: { params: { token: string } }) => {
  const { mutateVerifyEmail, isPendingVerifyEmail, isSuccessVerifyEmail } =
    useVerifyUserHook({ params })

  return (
    <main className="flex justify-center items-center h-full w-full">
      <section className="md:w-[768px] w-full flex flex-col gap-8">
        <AuthHGroup
          header1="Verify Email"
          header6="Please input new password for completing email verification, enjoy Roomify!"
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

export default VerifyEmailUserPage
