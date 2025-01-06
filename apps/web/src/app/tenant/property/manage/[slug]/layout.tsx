'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TenantManagePropertyLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <main className="flex flex-col">
      <nav className='flex items-center bg-gray-900 text-white rounded-lg w-full overflow-hidden justify-evenly p-2'>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/calendar`}>
          <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
              Price & Season
          </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/descriptions`}>
          <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
              Descriptions
          </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/room-details`}>
        <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
            Room Details
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/facilities`}>
        <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
            Facility & Service
        </div>
        </Link>
      </nav>
      {children}
    </main>
  )
}

export default TenantManagePropertyLayout
