'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Footer from '@/features/auth/components/Footer'
import TextInput from '@/features/auth/components/TextInput'
import AuthButton from '@/features/auth/components/AuthButton'
import Separator from '@/features/auth/components/Separator'
import GoogleSignInButton from '@/features/auth/components/GoogleSignInButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import { emailValidationSchema } from '@/features/auth/schemas/emailValidationSchema'
import useRegisterHook from '@/features/auth/hooks/useRegisterHook'
import useLoginWithGoogleHook from '@/features/auth/hooks/useLoginWithGoogleHook'
import Link from 'next/link'

const RegisterPage = () => {
  const { isPendingOAuth, isPendingReqOAuth, mutateOAuth } =
    useLoginWithGoogleHook()

  const { mutateRegister, isPendingRegister } = useRegisterHook({
    endPoint: '/auth/register',
    role: 'user',
  })
  return (
    <main className="flex justify-center">
      <section className="md:w-[768px] w-full flex flex-col gap-8">
        <AuthHGroup
          header1="Create an account"
          header6="You can create new Roomify account to access our services"
        />
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={emailValidationSchema}
          onSubmit={(values, { resetForm }) => {
            mutateRegister(values)
            resetForm()
          }}
        >
          {
            ({values}) => (
            <Form className="flex flex-col gap-5">
              <TextInput
                labelName="Email"
                name="email"
                placeholder="example@email.com"
                type="text"
              />
              <AuthButton
                isPending={Boolean(
                  isPendingOAuth || isPendingRegister || isPendingReqOAuth || !values.email,
                )}
                text="Continue with email"
              />
              <span className="text-sm font-light mt-[-15px] ml-4">
                <span>Have an account?</span>
                <Link href="/auth">
                  <span className="ml-1 text-sm font-semibold text-blue-600 border-b-2 border-transparent hover:border-blue-600 active:scale-90 transition duration-200 hover:cursor-pointer w-fit">
                    Login now
                  </span>
                </Link>
              </span>
            </Form>
            )
          }
        </Formik>
        <div className="flex gap-2 items-center justify-between">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <p className="min-w-max text-center text-sm font-light">
            or use of these option
          </p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
        <GoogleSignInButton
          mutateOAuth={mutateOAuth}
          isPending={Boolean(
            isPendingOAuth || isPendingRegister || isPendingReqOAuth,
          )}
        />
        <Separator />
        <Footer />
      </section>
    </main>
  )
}

export default RegisterPage
