'use client'

import AuthHGroup from '@/features/auth/components/AuthHGroup'
import AuthButton from '@/features/auth/components/AuthButton'
import TextInput from '@/features/auth/components/TextInput'
import { Formik, Form, ErrorMessage } from 'formik'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import { verifyEmailValidationSchema } from '@/features/auth/verify/schemas/verifyEmailValidationSchema'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const SetResetPasswordTenantPage = ({ params }: { params: { token: string } }) => {
    const router = useRouter()
    interface IValuesMutateResetPassword {
        setPassword: string
    }
    const { 
        mutate: mutateResetPassword,
        isPending: isPendingResetPassword,
        isSuccess: isSuccessResetPassword
     } = useMutation({
        mutationFn: async(values: IValuesMutateResetPassword) => {
            return await instance.patch('/auth/tenant/reset-password', {
                password: values?.setPassword
            }, {
                headers: {
                    authorization: `Bearer ${params.token}`
                }
            })
        },
        onSuccess: (res) => {
            toast.success('Reset password success!')
            setTimeout(() => {
                router.push('/tenant/auth')
            })
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Connection error!')
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
                setPassword: '',
                confirmPassword: ''
            }}
            validationSchema={verifyEmailValidationSchema}
            onSubmit={(values, {resetForm}) => {
                mutateResetPassword(values)
                resetForm()
            }}
            >
                <Form className='flex flex-col gap-5'>
                    <TextInput labelName='Set Password' name='setPassword' placeholder='example123' type='password'/>
                    <ErrorMessage name='setPassword' component={'div'} className='text-red-600 text-sm mt-[-10px] ml-4'/>
                    <TextInput labelName='Confirm Password' name='confirmPassword' placeholder='example123' type='password'/>
                    <ErrorMessage name='confirmPassword' component={'div'} className='text-red-600 text-sm mt-[-10px] ml-4'/>
                    <AuthButton isPending={Boolean(isPendingResetPassword || isSuccessResetPassword)} text='Continue'/>
                </Form>
            </Formik>
        </section>
    </main>
  )
}

export default SetResetPasswordTenantPage
