'use client'

import {ReactNode, useEffect, useState} from 'react';
import instance from '@/utils/axiosInstance'
import authStore from '@/zustand/authStore'
import { usePathname, useRouter } from 'next/navigation'
import { IAuthProviderProps } from './types'
import { useQuery } from '@tanstack/react-query';

export default function AuthProvider({children}: IAuthProviderProps){
    const router = useRouter()
    const pathname = usePathname()
    const [isKeepAuth, setIsKeepAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const token = authStore((state) => state.token)
    const setKeepAuth = authStore((state) => state.setKeepAuth)

    useQuery({
        queryKey: ["token"],
        queryFn: () => {
            if(pathname.split('/').includes('auth') && Boolean(token)) return setTimeout(() => router.push('/') , 1000)
            return ""
        }
    })

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
            console.log(res)
            return res?.data?.data
        }
    })
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
        <>
            {children}
        </>
    )
}