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
import FooterNav from '@/features/order/FooterNav';
import FooterSocialMediaList from './FooterSocialMediaList';

const Footer = () => {

  const footerNavMenu = [
    {
      title:'Company',
      navlist: [
        {
          title:'Roomify Group',
          url:''
        },
        {
          title:'Management',
          url:''
        },
        {
          title:'Career',
          url:''
        },
        {
          title:`SDG's`,
          url:''
        },
      ]
    },
    {
      title:'Terms & Conditions',
      navlist: [
        {
          title:'Terms & Conditions',
          url:''
        },
        {
          title:'Privacy & Cookies',
          url:''
        },
        {
          title:'Tenant Issues',
          url:''
        },
        {
          title:'Modern Slavery Statement',
          url:''
        },
        {
          title:'Declaration of Human Rights',
          url:''
        },
      ]
    },
    {
      title:'Professional Solutions',
      navlist: [
        {
          title:'Bussiness Travel',
          url:''
        },
        {
          title:'Meetings & Events',
          url:''
        },
        {
          title:'Travel Professional',
          url:''
        },

      ]
    },
    {
      title:'Tenants',
      navlist: [
        {
          title:'Login as Tenant',
          url:''
        },
        {
          title:'Tenant Assistance',
          url:''
        },
        {
          title:'Register Your Property',
          url:''
        },
        {
          title:'Be Our Affiliate Partner',
          url:''
        },

      ]
    },
    {
      title:'Explore',
      navlist: [
        {
          title:'Jakarta',
          url:''
        },
        {
          title:'Surabaya',
          url:''
        },
        {
          title:'Bandung',
          url:''
        },
        {
          title:'Tangerang',
          url:''
        },
        {
          title:'South Tangerang',
          url:''
        },

      ]
    }
  ]

  return (
    <footer className='bg-slate-200 lg:px-16 md:px-12 sm:px-8 px-4 py-5 flex flex-col gap-10'>
      <FooterNav footerNavMenu={footerNavMenu}/>
      <div className='flex items-center'>
        <div className='h-[0.5px] lg:hidden w-full bg-slate-400 bg-opacity-60'></div>
        <h1 className='lg:text-2xl font-bold min-w-max text-slate-400 lg:pr-6 px-3'>Our Social Media</h1>
        <div className='h-[0.5px] w-full bg-slate-400 bg-opacity-60'></div>
      </div>
      <FooterSocialMediaList />
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

