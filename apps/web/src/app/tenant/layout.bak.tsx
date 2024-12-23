'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'
import TenantSidebar from '@/features/tenant/components/TenantSidebar'
import { usePathname } from 'next/navigation'

interface ITenantLayoutProps {
    children: ReactNode
}

const TenantLayout = ({ children }: ITenantLayoutProps) => {
  const pathname = usePathname()
  
  if(pathname.includes('/auth')) {
    return (
      <>{children}</>
    )
  }
  
  return (
    <SidebarProvider>
      <TenantSidebar />
      <main className='w-full'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default TenantLayout
