'use client'

import React from 'react'
import Link from 'next/link'

interface IFooterNavMenu {
    title: string,
    navlist: { 
        title: string,
        url: string
    }[]
}

interface IFooterNavProps {
    footerNavMenu: IFooterNavMenu[]
}

const FooterNav = ({ footerNavMenu }: IFooterNavProps) => {
  return (
    <nav id='footer-nav'>
        <section className='hidden md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-10 justify-between'>
          {
          footerNavMenu.map((item, index) => {
            return(
            <div key={index} className='w-full flex flex-col items-start'>
              <h1 className='text-xl font-bold mb-5'>{item.title}</h1>
              <ul className="md:flex flex-col hidden">
                {
                  item.navlist.map((itm, idx) => {
                    return(
                      <Link key={idx} href={itm.url}>
                        <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>{itm.title}</li>
                      </Link>
                    )
                  })
                }
              </ul>
            </div>
            )
          })
        }
        </section>
        <section className='md:hidden'>
          {
          footerNavMenu.map((item, index) => {
            return(
            <div key={index} className="collapse collapse-arrow">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">{item.title}</div>
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
        </section>
      </nav>
  )
}

export default FooterNav
