'use client'

import React from 'react'

const PropertyDetailPage = () => {
  return (
    <main>
        <hgroup>
            <h1>Pan Pacific Jakarta</h1>
            <p>Jalan M.H. Thamrin, 10230 Jakarta, Indonesia</p>
        </hgroup>
        <section className='grid grid-cols-5 gap-5 grid-rows-8 w-full h-[400px]'>
            {
                Array.from({length: 8}).map((item, index) => {
                    let className = 'bg-slate-300 w-full h-full'
                    if(index === 0) {
                        className += 'col-span-3 row-span-6'
                    } else if(index === 1 || index === 2) {
                        className += 'col-span-2 row-span-3'
                    } else className += 'col-span-1 row-span-2'
                    return(
                        <figure className={className}></figure>
                    )
                })
            }
            
        </section>
    </main>
  )
}

export default PropertyDetailPage
