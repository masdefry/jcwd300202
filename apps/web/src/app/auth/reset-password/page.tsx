'use client'

import AuthButton from '@/features/auth/components/AuthButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import Footer from '@/features/auth/components/Footer'
import TextInput from '@/features/auth/components/TextInput'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { Formik, Form } from 'formik'
import React from 'react'

const ResetPasswordUserPage = () => {

    useMutation({
        mutationFn: async(values) => {
            return await instance.post('/auth/')
        }
    })

  return (
    <main className='flex justify-center'>
        <section className='md:w-[768px] w-full flex flex-col gap-8'>
            <AuthHGroup 
            header1='Reset Password'
            header6='Please enter your email to continue the password reset process'
            />
            <Formik
            initialValues={{
                email: ''
            }}
            onSubmit={(values) => {
                
            }}
            >
                <Form className='flex flex-col gap-5'>
                    <TextInput labelName='Email' name='email' placeholder='example123' type='email'/>
                    <AuthButton text='Continue'/>
                </Form>
            </Formik>
        </section>
    </main>
  )
}

export default ResetPasswordUserPage
