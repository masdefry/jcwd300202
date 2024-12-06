'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Footer from '@/features/auth/components/Footer'
import AuthButton from '@/features/auth/components/AuthButton'
import TextInput from '@/features/auth/components/TextInput'
import GoogleSignInButton from '@/features/auth/components/GoogleSignInButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import Separator from '@/features/auth/components/Separator'

const AuthPage = () => {
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
        
            onSubmit={(values) => {

            }}
            >
                <Form className='flex flex-col gap-5'>
                    <TextInput labelName='Email' name='email' placeholder='example@email.com' type='email'/>
                    <TextInput labelName='Password' name='password' placeholder='example123' type='password'/>
                    <AuthButton text='Continue'/>
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
