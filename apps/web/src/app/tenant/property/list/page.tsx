'use client'

import React from 'react'
import { CiBoxList } from 'react-icons/ci'
import { FaArrowUpShortWide, FaRegStar } from 'react-icons/fa6'
import { RiLoginBoxLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { TbHomeCancel } from 'react-icons/tb'
import { CgArrowsScrollV } from "react-icons/cg";
import { IoSearchSharp } from 'react-icons/io5'

const PropertyListPage = () => {
  return (
    <main className='flex flex-col gap-5'>
      <hgroup className='flex flex-col pb-5 border-b-4 border-slate-700'>
        <h1 className='text-2xl font-bold text-gray-800'>Property List</h1>
        <p className='text-sm font-medium text-gray-500'>Effortlessly Manage and Monitor Your Active Properties</p>
      </hgroup>
      <section>
        <div className='grid grid-cols-5 rounded-md py-5 shadow-md bg-white border border-slate-100'>
            <div className='flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5'>
                <CiBoxList size={23} className='text-gray-600 ml-[-4px] mb-2' />
                <p className='text-xl font-bold text-gray-800'>0</p>
                <p className='text-sm font-medium text-blue-700'>Reservation</p>
            </div>
            <div className='flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5'>
                <RiLoginBoxLine size={23} className='text-gray-600 ml-[-4px] mb-2' />
                <p className='text-xl font-bold text-gray-800'>0</p>
                <p className='text-sm font-medium text-blue-700'>Arrival</p>
            </div>
            <div className='flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5'>
                <RiLogoutBoxRLine size={23} className='text-gray-600 ml-[-4px] mb-2' />
                <p className='text-xl font-bold text-gray-800'>0</p>
                <p className='text-sm font-medium text-blue-700'>Departure</p>
            </div>
            <div className='flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5'>
                <FaRegStar size={23} className='text-gray-600 ml-[-4px] mb-2' />
                <p className='text-xl font-bold text-gray-800'>0</p>
                <p className='text-sm font-medium text-blue-700'>Review</p>
            </div>
            <div className='flex flex-col gap-2 items-start justify-start px-5'>
                <TbHomeCancel size={23} className='text-gray-600 ml-[-4px] mb-2' />
                <p className='text-xl font-bold text-gray-800'>0</p>
                <p className='text-sm font-medium text-blue-700'>Cancellation</p>
            </div>
        </div>
      </section>
      <section className='grid grid-cols-3 gap-3'>
        <div className='flex flex-col gap-1.5'>
            <label htmlFor="sort" className='text-xs min-w-max font-bold text-gray-900 flex items-center gap-1.5'><FaArrowUpShortWide />Sort by:</label>
            <select defaultValue="asc-name" id="sort" className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="asc-name">Ascending by Name</option>
                <option value="desc-name">Descending by Name</option>
                <option value="asc-reservation">Lowest to Highest Reservation</option>
                <option value="desc-reservation">Highest to Lowest Reservation</option>
                <option value="asc-arrival">Lowest to Highest Arrival</option>
                <option value="desc-arrival">Highest to Lowest Arrival</option>
                <option value="asc-departure">Lowest to Highest Departure</option>
                <option value="desc-departure">Highest to Lowest Departure</option>
                <option value="asc-rating">Lowest to Highest Rating</option>
                <option value="desc-rating">Highest to Lowest Rating</option>
            </select>
        </div>
        <div className='flex flex-col gap-1.5'>
            <label htmlFor="filter-select" className='text-xs min-w-max font-bold text-gray-900 flex items-center gap-1.5'><CgArrowsScrollV />Filter by:</label>
            <select defaultValue="allProperties" id="filter-select" className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="allProperties">All Properties</option>
                <option value="open">Bookable/Open</option>
                <option value="close">Unable to Order/Close</option>
            </select>
        </div>
        <div className='flex flex-col gap-1.5'>
            <label htmlFor="filter-input" className='text-xs min-w-max font-bold text-gray-900 flex items-center gap-1.5'><IoSearchSharp />Filter by:</label>
            <input type="text" name='filterInput' placeholder='Filter by name, city, or country' className='border border-slate-300 bg-gray-50 placeholder-shown:text-xs font-semibold text-xs text-gray-800 rounded-md h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600'/>
        </div>
      </section>
      <section>
      <div className="overflow-x-auto">
        <table className="table table-xs">
            <thead className='text-gray-800'>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>company</th>
                <th>location</th>
                <th>Last Login</th>
                <th>Favorite Color</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>Blue</td>
            </tr>
            </tbody>
        </table>
      </div>
      </section>
    </main>
  )
}

export default PropertyListPage
