'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'

const AuthPage = () => {
  return (
    <main className='flex justify-center'>
        <section className='md:w-[768px] w-full flex flex-col gap-5'>
            <hgroup className='flex flex-col gap-2 text-center'>
                <h1 className='text-2xl md:text-3xl font-bold'>Create an account</h1>
                <h6 className='text-base font-light'>You can create new Roomify account to access our services</h6>
            </hgroup>
            <Formik
            initialValues={{
                email: ''
            }}
        
            onSubmit={(values) => {

            }}
            >
                <Form className='flex flex-col gap-5'>
                <div className="grid items-center gap-1.5 w-full">
                    <Label htmlFor="email" className='text-base ml-4'>Email</Label>
                    <Field as={Input} name="email" type="email" id="email" placeholder="example@email.com" className="rounded-full w-full p-6 text-base"/>
                </div>
                <Button className='p-6 rounded-full text-base active:scale-95 transition duration-200' type='submit'>Continue with email</Button>
                </Form>
            </Formik>
            <div className='flex gap-2 items-center justify-between'>
                <div className='h-[1px] w-full bg-gray-300'></div>
                <p className='min-w-max text-center text-sm font-light'>or use of these option</p>
                <div className='h-[1px] w-full bg-gray-300'></div>
            </div>
            <section>
                <section className='flex flex-col gap-1'>
                    <button className='p-2 active:scale-95 transition duration-200 hover:bg-gray-300 rounded-full border border-gray-300 w-full text-base flex items-center justify-center font-bold gap-3'><FcGoogle size={23}/>Sign in with Google</button>
                </section>
            </section>
            <div className='h-[1px] w-full bg-gray-300'></div>
            <section className='text-sm font-light text-center'>
                <p className='md:flex justify-center md:gap-1 text-center'>By signing in or creating an account, you agree with our 
                    <span className='mx-1 md:mx-0 transition duration-200 font-semibold text-blue-600 hover:opacity-75 hover:cursor-pointer active:scale-90'>Terms and Conditions</span>
                    and 
                    <span className='mx-1 md:mx-0 transition duration-200 font-semibold text-blue-600 hover:opacity-75 hover:cursor-pointer active:scale-90'>Privacy Statement</span></p>
                <p className='mt-3'>All rights reserved</p>
                <p>Copyright 2024 - Roomify</p>
            </section>
        </section>
    </main>
  )
}

export default AuthPage
