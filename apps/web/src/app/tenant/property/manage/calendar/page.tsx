'use client'

import Separator from '@/features/auth/components/Separator'
import TextInput from '@/features/user/profile/components/TextInput'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'

const CalendarPage = () => {

  const [activeRoomSetter, setActiveRoomSetter] = useState(false)  
  return (
    <main className='flex flex-col gap-10 relative'>
        <section className='flex items-center gap-5'>
        <span className='w-fit flex gap-2 items-center'>
            <label htmlFor="sort" className='text-xs min-w-max font-bold text-gray-500'>View:</label>
            <select name='sort' defaultValue='list-view' id="sort" className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="list-view">List View</option>
                <option value="month-view">Month View</option>
            </select>
        </span>
        </section>
        {
            Array.from({length: 3}).map((_, index) => {
                return (
                <section className='flex flex-col gap-5'>
                    <hgroup className='text-xl font-bold text-gray-900 flex flex-col'>
                        <h1>Suite Cityview</h1>
                        <p className='text-sm font-medium text-gray-500'>Pan Pacific Jakarta</p>
                    </hgroup>
                    <div className='overflow-x-scroll shadow-md scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400'>
                        <div className='overflow-hidden flex items-center w-fit border border-slate-300 bg-slate-300'>
                            <div className='flex flex-col border-2 border-slate-300'>
                                <div className='border-[0.5px] bg-gray-900 text-white border-slate-300 box-border justify-center p-2 text-sm font-bold w-[200px] flex flex-col gap-2 h-[45px]'>
                                    Date
                                </div>
                                <div className='border-[0.5px] border-slate-300 bg-white box-border justify-center p-2 text-sm font-bold text-gray-800 w-[200px] flex flex-col gap-2 h-[45px]'>
                                    Rooms Status
                                </div>
                                <div className='border-[0.5px] border-slate-300 bg-white box-border justify-center p-2 text-sm font-bold text-gray-800 w-[200px] flex flex-col gap-2 h-[65px]'>
                                    Rooms to sell
                                    <div className='text-blue-600 hover:opacity-75 hover:cursor-pointer active:underline transition duration-100'>
                                        Bulk edit
                                    </div>
                                </div>
                                <div className='border-[0.5px] border-slate-300 bg-white box-border justify-center p-2 text-sm font-bold text-gray-800 w-[200px] flex flex-col gap-2 h-[45px]'>
                                    Rates
                                </div>
                            </div>
                            {
                                Array.from({length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}).map((_, index) => {
                                    return (
                                    <div key={index} onDoubleClick={() => setActiveRoomSetter(true)} className='flex flex-col border-2 border-slate-300 hover:border-blue-800 hover:cursor-pointer active:border-2 active:border-blue-400 transition duration-75'>
                                        <div className='border-[0.5px] bg-gray-900 text-white border-slate-300 box-border justify-center items-end p-2 text-sm font-bold w-[85px] flex flex-col gap-2 h-[45px]'>
                                        {index + 1}
                                        </div>
                                        <div className='border-[0.5px] border-slate-300 bg-white box-border justify-center p-2 text-sm font-bold text-gray-800 w-[85px] flex flex-col gap-2 h-[45px]'>
                                            <div className={`h-[70%] w-full ${index % 3 === 0 ? 'bg-red-600' : 'bg-green-600'} opacity-65 rounded-full text-xs flex items-center justify-center text-white text-opacity-45`}>
                                            {index % 3 === 0 ? 'Closed' : 'Ready'}
                                            </div>
                                        </div>
                                        <div className='border-[0.5px] border-slate-300 bg-white box-border justify-center items-end p-2 text-sm font-bold text-gray-800 w-[85px] flex flex-col gap-2 h-[65px]'>
                                            {
                                                index % 3 !== 0 && (
                                                    <p>50</p>
                                                )
                                            }
                                        </div>
                                        <div className='border-[0.5px] border-slate-300 bg-white box-border justify-center items-end p-2 text-xs font-semibold text-gray-950 w-[85px] flex flex-col gap-2 h-[45px]'>
                                            {
                                                index % 3 !== 0 && (
                                                    <p>Rp500000k</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
                )
            })
        }
        <div id='room-setter' className={`${activeRoomSetter ? 'flex' : 'hidden'} w-full h-full absolute items-center justify-center z-[51]`}>
            <Formik
                initialValues={{
                    roomPrices: 0,
                    roomsToSell: 0
                }}
                onSubmit={(values) => {
                    setActiveRoomSetter(false)
                }}
            >
                <Form className='shadow-md rounded-2xl bg-white p-5 flex flex-col gap-5 w-[400px]'>
                    <hgroup className='text-base font-bold text-gray-900 flex flex-col items-center'>
                        <h1>Suite Cityview</h1>
                        <p className='text-sm font-light text-gray-500'>Pan Pacific Jakarta</p>
                    </hgroup>
                    <Separator />
                    <section className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="available" className='text-sm font-bold text-black ml-5'>Room availability</label>
                            <div className='flex items-center gap-5 ml-5'>
                                <div className='flex items-center gap-1.5'>
                                    <input type="radio" name="available" id="close" className='hover:cursor-pointer scale-90 mt-[2px]'/>
                                    <label htmlFor="close" className='text-sm font-light text-gray-800'>Close</label>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <input type="radio" name="available" id="open" className='hover:cursor-pointer scale-90 mt-[2px]' defaultChecked={true}/>
                                    <label htmlFor="open" className='text-sm font-light text-gray-800'>Open</label>
                                </div>
                            </div>
                        </div>
                        <TextInput 
                        name='roomPrices'
                        title='Rates'
                        type='number'
                        placeholder='500000'
                        />    
                        <TextInput 
                        name='roomsToSell'
                        title='Rooms to sell'
                        type='number'
                        placeholder='30'
                        />
                    </section>
                    <div className='flex items-center gap-2 justify-end mt-4'>
                        <button onClick={() => setActiveRoomSetter(false)} 
                        className='text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-white text-gray-800 shadow-md' type='button'>Cancel</button>
                        <button className='text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-gray-800 text-white shadow-md' type='submit'>Save</button>
                    </div>    
                </Form>
            </Formik>
        </div>
    </main>
  )
}

export default CalendarPage
