'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'

const TenantManagePropertyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col">
      <nav className='flex items-center bg-blue-800 text-white rounded-lg w-full overflow-hidden p-2'>
        {/* <Link href={`/tenant/property/manage/${params.slug}/calendar`}>
          <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
              Price & Season
          </div>
        </Link> */}
        <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
            Descriptions
        </div>
        <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
            Room Details
        </div>
        <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
            Facility & Service
        </div>
      </nav>
      {children}
    </main>
  )
}

export default TenantManagePropertyLayout
