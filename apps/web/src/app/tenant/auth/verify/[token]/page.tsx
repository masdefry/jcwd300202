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

  interface IValuesVerifyEmailUser {
    setPassword: string
  }  

  const { mutate: mutateVerifyEmail, isPending: isPendingVerifyEmail, isSuccess: isSuccessVerifyEmail } = useMutation({
    mutationFn: async(values: IValuesVerifyEmailUser) => {
        return await instance.patch('/auth/tenant/verify-email', {
            password: values?.setPassword
        },{
            headers: {
                authorization: `Bearer ${params.token}`
            }
        })
    },
    onSuccess: (res) => {
        toast.success('Verify account success')
        setTimeout(() => {
            router.push('/tenant/auth')
        }, 1500)
    },
    onError: (err: any) => {
        toast.error(err?.response?.data?.message)
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
                <Form className='flex flex-col gap-5'>
                    <TextInput labelName='Set Password' name='password' placeholder='example123' type='password'/>
                    <ErrorMessage name='setPpassword' component={'div'} className='text-red-600 text-sm mt-[-10px] ml-4'/>
                    <TextInput labelName='Confirm Password' name='confirmPassword' placeholder='example123' type='password'/>
                    <ErrorMessage name='confirmPassword' component={'div'} className='text-red-600 text-sm mt-[-10px] ml-4'/>
                    <AuthButton isPending={Boolean(isPendingVerifyEmail || isSuccessVerifyEmail)} text='Continue'/>
                </Form>
            </Formik>
        </section>
    </main>
  )
}

export default VerifyEmailTenantPage
