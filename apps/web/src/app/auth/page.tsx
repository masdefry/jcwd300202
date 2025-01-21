'use client'

import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import Footer from '@/features/auth/components/Footer'
import AuthButton from '@/features/auth/components/AuthButton'
import TextInput from '@/features/auth/components/TextInput'
import GoogleSignInButton from '@/features/auth/components/GoogleSignInButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import Separator from '@/features/auth/components/Separator'
import { loginValidationSchema } from '@/features/auth/schemas/loginValidationSchema'
import useLoginHook from '@/features/auth/hooks/useLoginHook'
import useLoginWithGoogleHook from '@/features/auth/hooks/useLoginWithGoogleHook'
import toast from 'react-hot-toast'
import Link from 'next/link'

const AuthPage = () => {

  const handleClearSearchParams = () => {
    const url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({}, "", url)
  }

  const { isPendingOAuth, isPendingReqOAuth, mutateOAuth } =
    useLoginWithGoogleHook()

  const { mutateLogin, isPendingLogin } = useLoginHook({
    endPoint: '/auth',
    role: 'user',
  })

  return (
    <main className="flex justify-center">
      <section className="md:w-[768px] w-full flex flex-col gap-8">
        <AuthHGroup
          header1="Sign in"
          header6="You can sign in using your Roomify account to access  our services"
        />
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleClearSearchParams()
            mutateLogin(values)
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
            <TextInput
              labelName="Password"
              name="password"
              placeholder="example123"
              type="password"
            />
            <AuthButton
              isPending={Boolean(isPendingLogin || isPendingReqOAuth || !values.email || !values.password)}
              text="Continue"
            />
            <span className="text-sm font-light mt-[-15px] ml-5">
              <span>Don't have an account?</span>
              <Link href="/auth/register">
                <span className="ml-1 text-sm font-semibold text-blue-600 border-b-2 border-transparent hover:border-blue-600 active:scale-90 transition duration-200 hover:cursor-pointer w-fit">
                  Register now
                </span>
              </Link>
            </span>
          </Form>
          )
        }
        </Formik>
        <div className="flex gap-2 items-center justify-between">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <p className="min-w-max text-center rounded text-sm font-light">
            or use of these option
          </p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
        <GoogleSignInButton
          isPending={Boolean(isPendingLogin || isPendingReqOAuth)}
          mutateOAuth={mutateOAuth}
        />
        <Separator />
        <Footer />
      </section>
    </main>
  )
}

export default AuthPage
