'use client'

import AuthHGroup from '@/features/auth/components/AuthHGroup'
import AuthButton from '@/features/auth/components/AuthButton'
import TextInput from '@/features/auth/components/TextInput'
import { Formik, Form } from 'formik'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'

const SetResetPasswordUserPage = ({ params }) => {
    useMutation({
        mutationFn: async(values) => {
            return await instance.patch('/auth/reset-password', {
                password: values.password,
                token: params.token,
                role: "USER"
            })
        }
    })

  return (
    <main className='flex justify-center'>
        <section className='md:w-[768px] w-full flex flex-col gap-8'>
            <AuthHGroup 
            header1='Reset Password'
            header6='Please enter new password to complete the password reset process, enjoy Roomify!'
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

export default SetResetPasswordUserPage
