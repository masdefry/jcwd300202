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

const AuthPage = () => {

  const { 
    mutateLogin, 
    isPendingLogin 
    } = useLoginHook({
    endPoint: '/auth',
    role: 'user'
  })

  return (
    <main className='flex justify-center'>
        <section className='md:w-[768px] w-full flex flex-col gap-8'>
            <AuthHGroup 
            header1='Sign in' 
            header6='You can sign in using your Roomify account to access  our services'
            />
            <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values, { resetForm }) => {
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
                </Form>
            </Formik>
            <div className='flex gap-2 items-center justify-between'>
                <div className='h-[1px] w-full bg-gray-300'></div>
                <p className='min-w-max text-center rounded text-sm font-light'>or use of these option</p>
                <div className='h-[1px] w-full bg-gray-300'></div>
            </div>
            <GoogleSignInButton />
            <Separator />
            <Footer />
        </section>
    </main>
  )
}

export default AuthPage
