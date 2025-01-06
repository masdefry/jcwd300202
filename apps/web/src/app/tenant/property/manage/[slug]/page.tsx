'use client'

import React from 'react'
import Link from 'next/link'

const PropertyDetailPage = ({ params }: { params: { slug: string }}) => {
  return (
    <main className="flex flex-col">
            {/* <nav className='flex items-center bg-blue-800 text-white rounded-lg w-full overflow-hidden p-2'>
        <Link href={`/tenant/property/manage/${params.slug}/calendar`}>
          <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
              Price & Season
          </div>
        </Link>
        <Link href={`/tenant/property/manage/${params.slug}/descriptions`}>
        <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
            Descriptions
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${params.slug}/room-details`}>
        <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
            Room Details
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${params.slug}/facilities`}>
        <div className='text-sm font-bold p-2 hover:border-white border-b-4 border-transparent'>
            Facility & Service
        </div>
        </Link>
      </nav> */}
    </main>
  )
}

export default PropertyDetailPage
