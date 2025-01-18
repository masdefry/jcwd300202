'use client'

import AuthButton from '@/features/auth/components/AuthButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import Footer from '@/features/auth/components/Footer'
import TextInput from '@/features/auth/components/TextInput'
import { emailValidationSchema } from '@/features/auth/schemas/emailValidationSchema'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { Formik, Form, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const RequestVerifyEmailPage = () => {
  const router = useRouter()
  interface IValuesRequestEmailResetPassword {
    email: string
  }

  const {
    mutate: mutateRequestEmailResetPassword,
    isPending: isPendingRequestEmailResetPassword,
  } = useMutation({
    mutationFn: async (values: IValuesRequestEmailResetPassword) => {
      return await instance.post('/auth/verify-email-request', {
        email: values?.email,
      })
    },
    onSuccess: (res) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          Request email verify success
        </span>
      ))
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
      if (err?.response?.data?.message === 'Email already verified!') {
        setTimeout(() => {
          router.push('/auth')
        }, 1500)
      }
    },
  })

  return (
    <main className="flex justify-center">
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
        {
          ({values}) => (
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
          )
        }
        </Formik>
      </section>
    </main>
  )
}

export default RequestVerifyEmailPage
