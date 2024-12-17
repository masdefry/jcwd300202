'use client'

import React from 'react'
import Link from 'next/link'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const socialMediaList = [
  {
    icon:<FaFacebookF size={26}/>,
    url: '#'
  },
  {
    icon:<FaInstagram size={26}/>,
    url: '#'
  },
  {
    icon:<FaXTwitter size={26}/>,
    url: '#'
  },
  {
    icon:<FaPinterestP size={26}/>,
    url: '#'
  },
  {
    icon:<AiOutlineYoutube size={26}/>,
    url: '#'
  },
  {
    icon:<FaLinkedinIn size={26}/>,
    url: '#'
  }
]


const FooterSocialMediaList = () => {
  return (
    <section className='flex justify-center items-center mt-[-30px]'>
        <ul className='flex flex-wrap justify-center gap-2'>
          {
            socialMediaList.map((item, index) => {
              return (
                <Link key={index} href={item.url}>
                  <li className='p-7 text-slate-400 transition duration-150 active:scale-110 hover:scale-150 hover:text-black'>{item.icon}</li>
                </Link>
              )
            })
          }
        </ul>
    </section>
  )
}

export default FooterSocialMediaList
