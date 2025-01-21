'use client'

import {ReactNode, useEffect, useState} from 'react';
import instance from '@/utils/axiosInstance'
import authStore from '@/zustand/authStore'
import { usePathname, useRouter } from 'next/navigation'
import { IAuthProviderProps } from './types'
import { useQuery } from '@tanstack/react-query';
import LoadingMain from '@/app/loading';
import Cookies from 'js-cookie';
import ButtonGoToTop from '@/components/ButtonGoToTop';

export default function AuthProvider({children}: IAuthProviderProps){
    const router = useRouter()
    const pathname = usePathname()
    const [isKeepAuth, setIsKeepAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const token = authStore((state) => state.token)
    const role = authStore((state) => state.role)
    const setKeepAuth = authStore((state) => state.setKeepAuth)


    useQuery({
        queryKey: ['keepAuth'],
        queryFn: async() => {
            let res = await instance.get('/auth/keep-auth')
            setKeepAuth({
                username: res?.data?.data?.username,
                isVerified: res?.data?.data?.isVerified,
                profilePictureUrl: res?.data?.data?.profilePictureUrl,
                role: res?.data?.data?.role,
                country: res?.data?.data?.country,
                companyName: res?.data?.data?.companyName
            })
            return res?.data?.data
        }
    })

    // if(loading) {
    //     return (
    //         <>
    //         <LoadingMain/>
    //         </>
    //     )
    // }
    // useEffect(() => {
    // }, [])
    // // const fetchKeepAuth = async() => {
    // //     try {
    // //         const auth = await instance.get('/auth')
    // //         setKeepAuth({email: auth?.data?.data?.email, role: auth?.data?.data?.role})
    // //     } catch (err) {
    // //         console.log(err)
    // //     } finally {
    // //         setIsKeepAuth(true)
    // //     }
    // // }

    // // useEffect(() => {
    // //     if(token){
    // //         fetchKeepAuth();
    // //     } else {
    // //         setIsKeepAuth(true)
    // //     }
    // // }, [token])

    // useEffect(() => {
    //     if(pathname.includes('/auth') && token){
    //         setTimeout(() => {
    //             setLoading(false)
    //             router.push('/')
    //         }, 1000)
    //     }

    //     if(isKeepAuth === true){
    //         if(!token && pathname.split('/')[1] !== 'reset-password'){
    //             router.push('/')
    //         }
    //     }
    // }, [loading])
    
    // if(loading) {
    //     return (
    //         <main className='flex items-center justify-center w-full h-screen'>
    //             Loading...
    //         </main>
    //     )
    // } 
    // // if(isKeepAuth == false) return (
    // //     <main className='flex items-center justify-center'>
    // //         <span>loading ...</span>
    // //     </main>
    // // )

    return(
        <main className='relative w-full h-full'>
            {children}
            <div className='absolute bottom-10 right-10'>
            <ButtonGoToTop />
            </div>
        </main>
    )
}