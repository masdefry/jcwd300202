'use client'

import { Input } from '@/components/ui/input'
import Separator from '@/features/auth/components/Separator'
import React from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { FaRegSave } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'

const ProfileUserPage = () => {
  return (
    <main className='flex flex-col gap-5'>
      <hgroup className='flex flex-col pb-5 border-b-4 border-slate-700'>
        <h1 className='text-2xl font-bold text-gray-800'>Account</h1>
        <p className='text-sm font-medium text-gray-500'>Change your profile</p>
      </hgroup>
      <section className='flex items-center gap-10 rounded-md p-5 px-10 border border-slate-300'>
        <figure className='rounded-full h-[150px] w-[150px] bg-blue-300 border-2 border-slate-300'>

        </figure>
        <hgroup className='flex flex-col'>
          <h1 className='text-base font-bold text-gray-700 flex items-center gap-1.5'>Picture Profile<AiOutlinePicture size={23}/></h1>
          <p className='text-sm font-medium text-gray-400'>This picture will be displayed on your Roomify account</p>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <label htmlFor="username" className='text-sm font-bold text-gray-800'>Change picture</label>
          <Input id="picture" type="file" />
          </div>
        </hgroup>
      </section>
      <section className='flex flex-col gap-5'>
        <div className='flex flex-col gap-1 '>
          <label htmlFor="email" className='text-sm font-bold text-black ml-5 flex items-center gap-1'>
            Email
            <MdVerified className='text-blue-600' size={13}/>
          </label>
          <input id='email' name='email' type="email" disabled placeholder='mfauzi@gmail.com' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
        </div>
        <div className='flex flex-col gap-1 '>
          <label htmlFor="username" className='text-sm font-bold text-black ml-5'>Name</label>
          <input id='username' name='username' type="text" placeholder='Roomify' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
        </div>
        <div className='flex flex-col gap-1 '>
          <label htmlFor="phoneNumber" className='text-sm font-bold text-black ml-5'>Phone Number</label>
          <input id='phoneNumber' name='phoneNumber' type="text" placeholder='08128192xxxxxx ' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
        </div>
        <div className='flex flex-col gap-1 '>
          <label htmlFor="gender" className='text-sm font-bold text-black ml-5'>Gender</label>
          <input id='gender' name='gender' type="text" placeholder='Male' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
        </div>
        <div className='flex flex-col gap-1 '>
          <label htmlFor="city" className='text-sm font-bold text-black ml-5'>City</label>
          <input id='city' name='city' type="text" placeholder='Jakarta' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
        </div>
        <div className='flex flex-col gap-1 '>
          <label htmlFor="country" className='text-sm font-bold text-black ml-5'>Country</label>
          <input id='country' name='country' type="text" placeholder='Indonesia' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
        </div>
        <div className='flex flex-col gap-1 '>
          <label htmlFor="country" className='text-sm font-bold text-black ml-5'>Birthdate</label>
          <div id='birthdate-section' className='flex items-center gap-2'>
            <select defaultValue='select-date' className="bg-white border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value='select-date'>Date</option>
              {
                Array.from({length: 31}).map((_, index) => {
                  return(
                    <option key={index} value={index + 1}>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</option>
                  )
                })
              }      
            </select>
            <select defaultValue='select-month' className="bg-white border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value='select-month'>Month</option>
              {
                Array.from({length: 12}).map((_, index) => {
                  return(
                    <option key={index} value={index + 1}>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</option>
                  )
                })
              }      
            </select>
            <select defaultValue='select-year' className="bg-white border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value='select-year'>Year</option>
              {
                Array.from({length: 100}).map((_, index) => {
                  return(
                    <option key={index} value={index + 1}>{( (new Date().getFullYear() - length) - index ) - 1}</option>
                  )
                })
              }      
            </select>
          </div>
        </div>
        <button className='flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-blue-600 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center'>
        <FaRegSave size={23}/>Save Profile
        </button>
      </section>
    </main>
  )
}

export default ProfileUserPage
