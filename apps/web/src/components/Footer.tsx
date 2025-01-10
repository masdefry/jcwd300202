'use client'

import React from 'react'
import FooterNav from './FooterNav';
import FooterSocialMediaSeparator from './FooterSocialMediaSeparator';
import FooterSocialMediaList from './FooterSocialMediaList';
import { usePathname } from 'next/navigation';



const footerNavMenu = [
  {
    title:'Company',
    navlist: [
      {
        title:`Roomify Group`,
        url:`Roomify Group`
      },
      {
        title:`Management`,
        url:`Management`
      },
      {
        title:`Career`,
        url:`Career`
      },
      {
        title:`SDG's`,
        url:`SDG's`
      }
    ]
  },
  {
    title:'Terms & Conditions',
    navlist: [
      {
      title:`Terms & Conditions`,
      url:`Terms & Conditions`
      },
      {
        title:`Privacy & Cookies`,
        url:`Privacy & Cookies`
      },
      {
        title:`Tenant Issues`,
        url:`Tenant Issues`
      },
      {
        title:`Modern Slavery Statement`,
        url:`Modern Slavery Statement`
      },
      {
        title:`Declaration of Human Rights`,
        url:`Declaration of Human Rights`
      }
    ]
  },
  {
    title:'Professional Solutions',
    navlist: [
      {
        title:`Bussiness Travel`,
        url:`Bussiness Travel`
      } ,
      {
        title:`Meetings & Events`,
        url:`Meetings & Events`
      },
      {
        title:`Travel Professional`,
        url:`Travel Professional`
      }
    
    ]
  },
  {
    title:'Tenants',
    navlist: [
      {
        title:`Login as Tenant`,
        url:`/tenant/auth`
      },  
      {
        title:`Tenant Assistance`,
        url:`Tenant Assistance`
      },
      {
        title:`Register Your Property`,
        url:`Register Your Property`
      },
      {
        title:`Be Our Affiliate Partner`,
        url:`Be Our Affiliate Partner`
      },
    
    ]
  },
  {
    title:'Explore',
    navlist: [
      {
        title:`Jakarta`,
        url:`Jakarta`
      },
      {
        title:`Surabaya`,
        url:`Surabaya`
      },
      {
        title:`Bandung`,
        url:`Bandung`
      },
      {
        title:`Tangerang`,
        url:`Tangerang`
      },
      {
        title:`South Tangerang`,
        url:`South Tangerang`
      }
    ]
  }
]

const Footer = () => {
  const pathname = usePathname()

  if(pathname.includes('/auth')) {
    return <></>
  }
  return (
    <footer className='bg-slate-200 lg:px-16 md:px-12 sm:px-8 px-4 py-5 flex flex-col gap-10'>
      <FooterNav footerNavMenu={footerNavMenu}/>
      <FooterSocialMediaSeparator />
      <FooterSocialMediaList />
      <div className='flex items-center'>
        <div className='h-[0.5px] w-full bg-slate-400 bg-opacity-60'></div>
      </div>

      <section className='text-center text-xs sm:text-sm md:text-base font-light flex flex-col justify-center items-center gap-1'>
        <p>Roomify is part of Roomify Inc., Indonesian's leading provider of online travel and related services.</p>
        <p>Copyright © 2024 Roomify™. All rights reserved.</p>
      </section>
    </footer>
  )
}

export default Footer