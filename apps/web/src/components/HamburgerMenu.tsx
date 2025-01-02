'use client'

import useHamburgerMenuHook from '@/hooks/useHamburgerMenuHook'
import React from 'react'
import Link from 'next/link'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { RiBuilding3Fill } from 'react-icons/ri'

const HamburgerMenu = () => {
    const {
        toggleHamburger,
        showHamburgerNav,
        hamburgerMenuActive,
        setHamburgerMenuActive
    } = useHamburgerMenuHook()

    const headerNavMenu = [
        {
          title:'Explore',
          navlist: [
            {
              title:`All Properties`,
              url:`/explore/search?`
            }
          ]
        },
        {
          title:'Our Tenants',
          navlist: [
            {
              title:`Our Tenants`,
              url:`#`
            },
            {
              title:`Join us`,
              url:`/tenant/auth/register`
            },
            {
              title:`Sign in as Tenant`,
              url:`/tenant/auth`
            },
          ]
        },
      ]

  return (
    <section className="lg:hidden border-b border-slate-200 bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-5 md:px-8">
          <div className="flex gap-2 items-center pl-0">
            <div onClick={toggleHamburger} className={`flex p-2 flex-col gap-[5.5px] ${hamburgerMenuActive}`}>
              <div className='h-[1.5px] bg-gray-900 w-[20px] origin-top-left transition duration-300 ease-in-out rounded-full'></div>
              <div className='h-[1.5px] bg-gray-900 w-[20px] transition duration-300 ease-in-out rounded-full'></div>
              <div className='h-[1.5px] bg-gray-900 w-[20px] origin-top-left transition duration-300 ease-in-out rounded-full'></div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 rounded-full py-2 px-2 text-gray-800">
                <RiBuilding3Fill className="text-gray-800" size={20}/>
                <p className="text-xs font-bold text-gray-800">Roomify Inc.</p>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-1.5'>
            <div>
              <Link href='/auth'>
                <div className='text-xs font-bold text-white bg-slate-900 rounded-full px-4 py-2 hover:opacity-75 active:scale-90 transition duration-100'>Sign in</div>
              </Link>
            </div>
            <div className='hidden sm:flex'>
              <Link href='/auth/register'>
                <div className='text-xs font-bold text-white bg-slate-900 rounded-full px-4 py-2 hover:opacity-75 active:scale-90 transition duration-100'>Sign up</div>
              </Link>
            </div>
          </div>
        </div>
        <nav className={`origin-top ${showHamburgerNav} transition duration-300 ease-in absolute left-0  top-[77px] bg-white border-b border-slate-200 shadow-md w-full h-fit z-50`}>
        {
          headerNavMenu.map((item, index) => {
            return(
            <div key={index} className="collapse collapse-arrow">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title md:text-base text-sm shadow-sm font-bold">{item.title}</div>
              <div className="collapse-content">
                <ul className="flex flex-col">
                  {
                    item.navlist.map((itm, idx) => {
                      return (
                        <Link key={idx} href={itm.url}>
                          <li onClick={toggleHamburger} className='transition duration-150 py-2 w-full origin-left hover:bg-slate-200 px-3 active:opacity-75 rounded-md hover:cursor-pointer font-medium text-xs md:text-sm'>{itm.title}</li>
                        </Link>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            )
          })
        }
        </nav>
      </section>
  )
}

export default HamburgerMenu
