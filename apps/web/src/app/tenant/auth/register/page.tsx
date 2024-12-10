'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Footer from '@/features/auth/components/Footer'
import TextInput from '@/features/auth/components/TextInput'
import AuthButton from '@/features/auth/components/AuthButton'
import Separator from '@/features/auth/components/Separator'
import GoogleSignInButton from '@/features/auth/components/GoogleSignInButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import useRegisterHook from '@/features/auth/hooks/useRegisterHook'

const TenantRegisterPage = () => {
  const { 
    mutateRegister,
    isPendingRegister
 } = useRegisterHook({
    endPoint: '/auth/tenant/register',
    role: 'tenant'
  })
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
        
            onSubmit={(values, { resetForm }) => {
                mutateRegister(values)
                resetForm()
            }}
            >
                <Form className='flex flex-col gap-5'>
                    <TextInput labelName='Email' name='email' placeholder='example@email.com' type='email'/>
                    <AuthButton isPending={isPendingRegister} text='Continue with email'/>
                </Form>
            </Formik>
            <Separator />
            <Footer />
        </section>
    </main>
  )
}

export default TenantRegisterPage
