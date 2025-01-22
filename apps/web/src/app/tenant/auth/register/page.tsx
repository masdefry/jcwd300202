'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Footer from '@/features/auth/components/Footer'
import TextInput from '@/features/auth/components/TextInput'
import AuthButton from '@/features/auth/components/AuthButton'
import Separator from '@/features/auth/components/Separator'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import useRegisterHook from '@/features/auth/hooks/useRegisterHook'
import Link from 'next/link'
import { emailValidationSchema } from '@/features/auth/schemas/emailValidationSchema'

const TenantRegisterPage = () => {
  const { mutateRegister, isPendingRegister } = useRegisterHook({
    endPoint: '/auth/tenant/register',
    role: 'tenant',
  })
  return (
    <main className="flex justify-center">
      <section className="md:w-[768px] w-full flex flex-col gap-8">
        <AuthHGroup
          header1="Create a Tenant Account"
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
                isPending={isPendingRegister || !values.email}
                text="Continue with email"
              />
              <span className="text-sm font-light mt-[-15px] ml-4">
                <span>Have an account?</span>
                <Link href="/tenant/auth">
                  <span className="ml-1 te xt-sm font-semibold text-blue-600 border-b-2 border-transparent hover:border-blue-600 active:scale-90 transition duration-200 hover:cursor-pointer w-fit">
                    Login now
                  </span>
                </Link>
              </span>
            </Form>
             
            )
          }
        </Formik>
        <Separator />
        <Footer />
      </section>
    </main>
  )
}

export default TenantRegisterPage
