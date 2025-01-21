'use client'

import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import TextInput from '@/features/auth/components/TextInput'
import AuthButton from '@/features/auth/components/AuthButton'
import AuthHGroup from '@/features/auth/components/AuthHGroup'
import Footer from '@/features/auth/components/Footer'
import { useMutation } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import { verifyEmailValidationSchema } from '@/features/auth/verify/schemas/verifyEmailValidationSchema'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const VerifyEmailTenantPage = ({params} : {params: { token: string }}) => {
    
   const router = useRouter() 

  interface IValuesVerifyEmailTenant {
    setPassword: string
  }  

  const { mutate: mutateVerifyEmail, isPending: isPendingVerifyEmail, isSuccess: isSuccessVerifyEmail } = useMutation({
    mutationFn: async(values: IValuesVerifyEmailTenant) => {
        return await instance.patch('/auth/tenant/verify-email', {
            password: values?.setPassword
        },{
            headers: {
                authorization: `Bearer ${params.token}`
            }
        })
    },
    onSuccess: (res) => {
        toast((t) => (
            <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
              Verify account success
            </span>
          ))
        setTimeout(() => {
            router.push('/tenant/auth')
        }, 1500)
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
            header1='Verify Email'
            header6='Please input new password for completing email verification and upscale your properties value!'
            />
            <Formik
            initialValues={{
                setPassword: '',
                confirmPassword: ''
            }}
            validationSchema={verifyEmailValidationSchema}
            onSubmit={(values) => {
                mutateVerifyEmail(values)
            }}
            >
              {
                ({values}) => (
                <Form className='flex flex-col gap-5'>
                    <TextInput labelName='Set Password' name='setPassword' placeholder='example123' type='password'/>
                    <TextInput labelName='Confirm Password' name='confirmPassword' placeholder='example123' type='password'/>
                    <AuthButton isPending={Boolean(isPendingVerifyEmail || isSuccessVerifyEmail || !values.confirmPassword || !values.setPassword)} text='Continue'/>
                </Form>

                )
              }
            </Formik>
        </section>
    </main>
  )
}

export default VerifyEmailTenantPage
