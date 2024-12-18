'use client'

import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import Footer from '@/features/auth/components/Footer'
import AuthButton from '@/features/auth/components/AuthButton'
import TextInput from '@/features/auth/components/TextInput'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import { loginValidationSchema } from '@/features/auth/schemas/loginValidationSchema'
import useLoginHook from '@/features/auth/hooks/useLoginHook'
import Separator from '@/features/auth/components/Separator'
import Link from 'next/link'

const TenantAuthPage = () => {
  const { 
    mutateLogin,
    isPendingLogin
   } = useLoginHook({
    role: 'tenant',
    endPoint: '/auth/tenant'
  })

  return (
    <main className='flex justify-center'>
        <section className='md:w-[768px] w-full flex flex-col gap-8'>
            <AuthHGroup 
            header1='Tenant Sign in' 
            header6='You can sign in using your Roomify account to access our services'
            />
            <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values, {resetForm }) => {
                mutateLogin(values)
                resetForm()
            }}
            >
                <Form className='flex flex-col gap-5'>
                    <TextInput labelName='Email' name='email' placeholder='example@email.com' type='email'/>
                    <ErrorMessage name='email' component={'div'} className='text-red-600 text-sm mt-[-10px] ml-4'/>
                    <TextInput labelName='Password' name='password' placeholder='example123' type='password'/>
                    <ErrorMessage name='password' component={'div'} className='text-red-600 text-sm mt-[-10px] ml-4'/>
                    <AuthButton isPending={isPendingLogin} text='Continue'/>
                    <span className='text-sm font-light mt-[-15px] ml-4'>
                        <span>Don't have an account?</span>
                        <Link href='/tenant/auth/register'>
                            <span className='ml-1 text-sm font-semibold text-blue-600 border-b-2 border-transparent hover:border-blue-600 active:scale-90 transition duration-200 hover:cursor-pointer w-fit'>Register now</span>
                        </Link>
                    </span>
                </Form>
            </Formik>
            <Separator />
            <Footer />
        </section>
    </main>
  )
}

export default TenantAuthPage
