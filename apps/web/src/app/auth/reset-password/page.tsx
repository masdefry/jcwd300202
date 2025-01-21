'use client'

import AuthButton from '@/features/auth/components/AuthButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import Footer from '@/features/auth/components/Footer'
import TextInput from '@/features/auth/components/TextInput'
import { emailValidationSchema } from '@/features/auth/schemas/emailValidationSchema'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { Formik, Form, ErrorMessage } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'

const ResetPasswordUserPage = () => {
  interface IValuesRequestEmailResetPassword {
    email: string
  }

  const {
    mutate: mutateRequestEmailResetPassword,
    isPending: isPendingRequestEmailResetPassword,
  } = useMutation({
    mutationFn: async (values: IValuesRequestEmailResetPassword) => {
      return await instance.post('/auth/send-email-reset-password', {
        email: values?.email,
      })
    },
    onSuccess: (res) => {
      toast((t) => (
        <span className="flex gap-2 items-center text-sm">
          Check your email to reset password
          <button
            className="bg-gray-900 hover:opacity-75 active:scale-90 text-white rounded-full px-4 py-1"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </span>
      ))
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  return (
    <main className="flex justify-center">
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

export default ResetPasswordUserPage
