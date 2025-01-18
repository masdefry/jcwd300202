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

const SetResetPasswordUserPage = ({ params }: { params: { token: string } }) => {
    const router = useRouter()

    const handleClearSearchParams = () => {
        const url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({}, "", url)
      }
    interface IValuesMutateResetPassword {
        setPassword: string
    }
    const { 
        mutate: mutateResetPassword,
        isPending: isPendingResetPassword,
        isSuccess: isSuccessResetPassword
     } = useMutation({
        mutationFn: async(values: IValuesMutateResetPassword) => {
            return await instance.patch('/auth/reset-password', {
                password: values?.setPassword
            }, {
                headers: {
                    authorization: `Bearer ${params.token}`
                }
            })
        },
        onSuccess: (res) => {
            toast((t) => (
                <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
                  Reset password success
                </span>
            ))
            setTimeout(() => {
                router.push('/auth')
            })
        },
        onError: (err: any) => {
            toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs text-red-600'>
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
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
                handleClearSearchParams()
                mutateResetPassword(values)
                resetForm()
            }}
            >
                {
                    ({values}) => (
                    <Form className='flex flex-col gap-5'>
                        <TextInput labelName='Set Password' name='setPassword' placeholder='example123' type='password'/>
                        <ErrorMessage name='setPassword' component={'div'} className='text-red-600 text-sm mt-[-10px] ml-4'/>
                        <TextInput labelName='Confirm Password' name='confirmPassword' placeholder='example123' type='password'/>
                        <ErrorMessage name='confirmPassword' component={'div'} className='text-red-600 text-sm mt-[-10px] ml-4'/>
                        <AuthButton isPending={Boolean(isPendingResetPassword || isSuccessResetPassword || !values.setPassword || !values.confirmPassword)} text='Continue'/>
                    </Form>

                    )
                }
            </Formik>
        </section>
    </main>
  )
}

export default SetResetPasswordUserPage
