'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'
import TenantSidebar from '@/features/tenant/components/TenantSidebar'

interface ITenantLayoutProps {
    children: ReactNode
}

const TenantLayout = ({ children }: ITenantLayoutProps) => {
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
