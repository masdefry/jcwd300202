'use client'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ITanstackProviderProps }  from './types'

const queryClient = new QueryClient()

function TanstackProvider({ children }: ITanstackProviderProps) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default TanstackProvider;