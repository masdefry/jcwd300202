'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Footer from '@/features/auth/components/Footer'
import TextInput from '@/features/auth/components/TextInput'
import AuthButton from '@/features/auth/components/AuthButton'
import Separator from '@/features/auth/components/Separator'
import GoogleSignInButton from '@/features/auth/components/GoogleSignInButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'

const TenantRegisterPage = () => {
  return (
    <main className='flex justify-center'>
        <section className='md:w-[768px] w-full flex flex-col gap-8'>
            <AuthHGroup 
            header1='Create an account'
            header6='You can create new Roomify account to access our services'
            />
            <Formik
            initialValues={{
                email: ''
            }}
        
            onSubmit={(values) => {

            }}
            >
                <Form className='flex flex-col gap-5'>
                    <TextInput labelName='Enail' name='email' placeholder='example@email.com' type='email'/>
                    <AuthButton text='Continue with email'/>
                </Form>
            </Formik>
            <div className='flex gap-2 items-center justify-between'>
                <div className='h-[1px] w-full bg-gray-300'></div>
                <p className='min-w-max text-center text-sm font-light'>or use of these option</p>
                <div className='h-[1px] w-full bg-gray-300'></div>
            </div>
            <GoogleSignInButton />
            <Separator />
            <Footer />
        </section>
    </main>
  )
}

export default TenantRegisterPage
