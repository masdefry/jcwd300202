'use client'

import useHamburgerMenuHook from '@/hooks/useHamburgerMenuHook'
import React from 'react'
import Link from 'next/link'
import { IoPersonCircleOutline } from 'react-icons/io5'

const HamburgerMenu = () => {
    const {
        toggleHamburger,
        showHamburgerNav,
        hamburgerMenuActive,
        setHamburgerMenuActive
    } = useHamburgerMenuHook()

    const headerNavMenu = [
        {
          title:'Accomodation Type',
          navlist: [
            {
              title:`Hotel`,
              url:`#`
            },
            {
              title:`Apartment`,
              url:`#`
            },
            {
              title:`Villa`,
              url:`#`
            },
            {
              title:`Guesthouse`,
              url:`#`
            }
          ]
        }
      ]

  return (
    <section className="lg:hidden border-b border-slate-400">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center pl-0">
            <div onClick={toggleHamburger} className={`flex p-5 pl-0 flex-col gap-4 ${hamburgerMenuActive}`}>
              <div className='h-[2px] bg-black w-[50px] origin-top-left transition duration-300 ease-in-out'></div>
              <div className='h-[2px] bg-black w-[50px] transition duration-300 ease-in-out'></div>
              <div className='h-[2px] bg-black w-[50px] origin-top-left transition duration-300 ease-in-out'></div>
            </div>
            <figure className="bg-blue-600 rounded-xl h-10 w-10">

            </figure>
          </div>
          <figure>
            <Link href='/auth'>
              <IoPersonCircleOutline size={50} className="text-gray-600"/>
            </Link>
          </figure>
        </div>
        <nav className={`origin-top ${showHamburgerNav} transition duration-300 ease-in absolute left-0 py-5 lg:px-16 md:px-12 sm:px-8 px-4 top-[119px] bg-white border-y border-slate-400 w-full h-fit z-50`}>
        {
          headerNavMenu.map((item, index) => {
            return(
            <div key={index} className="collapse collapse-arrow">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title text-xl shadow-sm font-medium">{item.title}</div>
              <div className="collapse-content">
                <ul className="flex flex-col">
                  {
                    item.navlist.map((itm, idx) => {
                      return (
                        <Link key={idx} href={itm.url}>
                          <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>{itm.title}</li>
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
