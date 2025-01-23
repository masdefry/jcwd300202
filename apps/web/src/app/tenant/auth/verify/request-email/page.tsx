'use client'

import AuthButton from '@/features/auth/components/AuthButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import Footer from '@/features/auth/components/Footer'
import TextInput from '@/features/auth/components/TextInput'
import { emailValidationSchema } from '@/features/auth/schemas/emailValidationSchema'
import { Formik, Form, ErrorMessage } from 'formik'
import React from 'react'
import useRequestVerifyEmailUserHook from '../../../../../features/tenant/auth/verify/request-email/hooks/useRequestVerifyEmailUserHook'

const RequestVerifyEmailPage = () => {

 const {
  mutateRequestEmailResetPassword,
  isPendingRequestEmailResetPassword
 } = useRequestVerifyEmailUserHook()

  return (
    <main className="flex justify-center items-center h-full w-full">
      <section className="md:w-[768px] w-full flex flex-col gap-8">
        <AuthHGroup
          header1="Request Email Verify"
          header6="Please enter your email address to continue the email verification process"
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
          <Form className="flex flex-col gap-5">
            <TextInput
              labelName="Email"
              name="email"
              placeholder="example123"
              type="text"
            />
            <AuthButton
              isPending={isPendingRequestEmailResetPassword}
              text="Continue"
            />
          </Form>
        </Formik>
      </section>
    </main>
  )
}

export default RequestVerifyEmailPage
