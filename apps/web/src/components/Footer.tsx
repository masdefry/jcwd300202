'use client'

import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';

const Footer = () => {

  const [ toggleNav, setToggleNav ] = useState([false])
  // const switchToggleFooterNav = (index: number) => {
  //   setToggleNav(state => {
  //     if(state[index]) {
  //       state[index] = 'rotate-180'
  //     } else {
  //       state[index] = 'rotate-0'
  //     }
  //     return state
  //   })
  //   console.log(toggleNav[index])
  // }

  return (
    <footer className='bg-slate-200 lg:px-16 md:px-12 sm:px-8 px-4 py-5 flex flex-col gap-10'>
      <section className='hidden md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-10 justify-between'>
        <div className='w-full flex flex-col items-start'>
          <h1 className='text-xl font-bold mb-5'>Company</h1>
          <ul className="md:flex flex-col hidden">
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Roomify Group</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Management</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Career</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>SDG's</li>
          </ul>
        </div>
        <div className='w-full flex flex-col items-start'>
          <h1 className='text-xl font-bold mb-5'>Terms & Conditions</h1>
          <ul className="md:flex flex-col hidden">
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Terms & Conditions</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Privacy & Cookies</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Tenant Issues</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Modern Slavery Statement</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Declaration of Human Rights</li>
          </ul>
        </div>
        <div className='w-full flex flex-col items-start'>
          <h1 className='text-xl font-bold mb-5'>Professional Solutions</h1>
          <ul className="md:flex flex-col hidden">
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Bussiness Travel</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Meetings & Events</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Travel Professional</li>
          </ul>
        </div>
        <div className='w-full flex flex-col items-start'>
          <h1 className='text-xl font-bold mb-5'>Tenants</h1>
          <ul className="md:flex flex-col hidden">
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Login as Tenant</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Tenant Assistance</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Register Your Property</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Be Our Affiliate Partner</li>
          </ul>
        </div>
        <div className='w-full flex flex-col items-start'>
          <h1 className='text-xl font-bold mb-5'>Explore</h1>
          <ul className="md:flex flex-col hidden">
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Jakarta</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Surabaya</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Bandung</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>Tangerang</li>
            <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>South Tangerang</li>
          </ul>
        </div>
      </section>
      <div className='flex items-center'>
        <div className='h-[0.5px] lg:hidden w-full bg-slate-400 bg-opacity-60'></div>
        <h1 className='lg:text-2xl font-bold min-w-max text-slate-400 lg:pr-6 px-3'>Our Social Media</h1>
        <div className='h-[0.5px] w-full bg-slate-400 bg-opacity-60'></div>
      </div>
      <section className='flex justify-center items-center mt-[-30px]'>
        <ul className='flex flex-wrap justify-center gap-2'>
          <li className='p-7 text-black transition duration-150 active:scale-110 hover:scale-150 hover:text-blue-600'><FaFacebookF size={26}/></li>
          <li className='p-7 text-black transition duration-150 active:scale-110 hover:scale-150 hover:text-red-400'><FaInstagram size={26}/></li>
          <li className='p-7 text-black transition duration-150 active:scale-110 hover:scale-150 hover:text-gray-900'><FaXTwitter size={26}/></li>
          <li className='p-7 text-black transition duration-150 active:scale-110 hover:scale-150 hover:text-red-600'><FaPinterestP size={26}/></li>
          <li className='p-7 text-black transition duration-150 active:scale-110 hover:scale-150 hover:text-red-600'><AiOutlineYoutube size={26}/></li>
          <li className='p-7 text-black transition duration-150 active:scale-110 hover:scale-150 hover:text-blue-600'><FaLinkedinIn size={26}/></li>
        </ul>
      </section>
      <div className='flex items-center'>
        <div className='h-[0.5px] w-full bg-slate-400 bg-opacity-60'></div>
      </div>
      <section className='text-center text-sm sm:text-base font-light flex flex-col justify-center items-center gap-1'>
        <p>Roomify is part of Roomify Inc., Indonesian's leading provider of online travel and related services.</p>
        <p>Copyright © 2024 Roomify™. All rights reserved.</p>
      </section>
    </footer>
  )
}

export default Footer

