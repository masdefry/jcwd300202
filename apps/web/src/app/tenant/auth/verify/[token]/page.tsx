'use client'

import React from 'react'
import { Formik, Form } from 'formik'
import TextInput from '@/features/auth/components/TextInput'
import AuthButton from '@/features/auth/components/AuthButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import Footer from '@/features/auth/components/Footer'

const VerifyEmailTenantPage = () => {
  return (
    <main className='flex justify-center'>
        <section className='md:w-[768px] w-full flex flex-col gap-8'>
            <AuthHGroup 
            header1='Verify Email'
            header6='Please input new password for completing email verification and upscale your properties value!'
            />
            <Formik
            initialValues={{
                createPassword: '',
                createPasswordConfirmation: ''
            }}
            onSubmit={(values) => {
                
            }}
            >
                <Form className='flex flex-col gap-5'>
                    <TextInput labelName='Set Password' name='createPassword' placeholder='example123' type='password'/>
                    <TextInput labelName='Confirm Password' name='createPasswordConfirmation' placeholder='example123' type='password'/>
                    <AuthButton text='Continue'/>
                </Form>
            </Formik>
        </section>
    </main>
  )
}

export default VerifyEmailTenantPage
