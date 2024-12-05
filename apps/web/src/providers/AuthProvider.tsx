'use client'
import {ReactNode, useEffect, useState} from 'react';
import instance from '@/utils/axiosInstance'
import authStore from '@/zustand/authStore'
import { usePathname, useRouter } from 'next/navigation'
import { IAuthProviderProps } from './types'

export default function AuthProvider({children}: IAuthProviderProps){
    const router = useRouter()
    const pathname = usePathname()
    const [isKeepAuth, setIsKeepAuth] = useState(false)

    const token = authStore((state) => state.token)
    const setKeepAuth = authStore((state) => state.setKeepAuth)

    const fetchKeepAuth = async() => {
        try {
            const auth = await instance.get('/auth')
            setKeepAuth({email: auth?.data?.data?.email, role: auth?.data?.data?.role})
        } catch (err) {
            console.log(err)
        } finally {
            setIsKeepAuth(true)
        }
    }

    useEffect(() => {
        if(token){
            fetchKeepAuth();
        } else {
            setIsKeepAuth(true)
        }
    }, [token])

    useEffect(() => {
        if(pathname === '/' && token){
            router.push('/')
        }

        if(isKeepAuth === true){
            if(!token && pathname.split('/')[1] !== 'reset-password'){
                router.push('/')
            }
        }
    }, [])
    
    if(isKeepAuth == false) return (
        <main className='flex items-center justify-center'>
            <span>loading ...</span>
        </main>
    )

    return(
        <>
            {children}
        </>
    )
}