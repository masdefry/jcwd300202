'use client'

import React, { useState } from 'react'
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import DropdownCitiesAndCountries from './DropdownCitiesAndCountries';
import GuestAndRoomCounter from './GuestAndRoomCounter';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import instance from '@/utils/axiosInstance'
import  useSearchHook from '@/hooks/useSearchHook'
import { Formik, Form, ErrorMessage } from 'formik'
import { searchValidationSchema } from '@/features/home/schemas/searchValidationSchema'
import { FaMapLocationDot } from 'react-icons/fa6';

interface ISearchHeaderDefaultProps {
  mutateShowDropdownDebounce: any,
  handleClearSearchInput: any,
  handleSearchInput: any,
  handleSearch: any,
  searchValues: any,
  setSearchValues: any,
  dataDropdown: any,
  setDataDropdown: any,
  setSearchResults: (results: any) => void
}

const SearchHeader = ({
  mutateShowDropdownDebounce,
  handleClearSearchInput,
  handleSearchInput,
  handleSearch,
  searchValues,
  setSearchValues,
  dataDropdown,
  setDataDropdown,
  setSearchResults
  }: ISearchHeaderDefaultProps) => {

    const {
      searchLocation,
      setSearchLocation,
      bookingDays,
      setBookingDays,
      totalGuest,
      allGuest,
      setAllGuest,
      setTotalGuest,
      searchResults
    } = useSearchHook()

    const [ showGuestAndRoomCounter, setShowGuestAndRoomCounter ] = useState(false)
    const [ slug, setSlug ] = useState('')
    const router = useRouter()
    
    const {
      mutate: mutateSearch,
      isPending: isPendingSearch
    } = useMutation({
      mutationFn: async(values: any) => {
        setSlug(`?country=${values.country}&city=${values.city}&check-in-date=${values.checkInDate}&check-out-date=${values.checkOutDate }&adult=${values.adult}&children=${values.children}`)
        return await instance.get(
          `/property?countryId=${values.country}&cityId=${values.city}&checkInDate=${values.checkInDate}&checkOutDate=${values.checkOutDate}&adult=${values.adult}&children=${values.children}`, {
          })
        },
        onSuccess: (res: any) => {
          window.location.href = `/explore/search${slug}`
      },
      onError: (error) => {
        console.log(error)
      }
    })


  return (
    <section className="h-full 2xl:h-[5rem] flex flex-col 2xl:grid grid-cols-4 items-center justify-evenly 2xl:rounded-full 2xl:bg-white p-3 relative 2xl:shadow-sm 2xl:border-2 border-amber-400">
      <Formik
        initialValues={{
          country: searchLocation.countryId,
          city: searchLocation.cityId,
          checkInDate: bookingDays.checkInDate,
          checkOutDate: bookingDays.checkOutDate,
          adult: totalGuest.adult,
          children: totalGuest.children
        }}
        validationSchema={searchValidationSchema}
        onSubmit={(values) => {
          values.country = searchLocation.countryId
          values.city = searchLocation.cityId
          values.checkInDate = bookingDays.checkInDate
          values.checkOutDate = bookingDays.checkOutDate
          values.adult = totalGuest.adult
          values.children = totalGuest.children
          mutateSearch(values)
        }}
      >
        {({
          setFieldValue
        }) => (
            <Form className='w-full flex 2xl:flex-row flex-col items-center justify-start 2xl:absolute 2xl:rounded-none rounded-lg 2xl:bg-transparent bg-amber-400 2xl:border-0 border-4 border-amber-400'>
              <div className='w-full 2xl:w-1/4 border-b-4 border-amber-400 2xl:border-b-0 2xl:rounded-l-full rounded-md box-border 2xl:border-r bg-white p-1.5 2xl:py-0 2xl:border-gray-300 relative flex flex-col 2xl:px-7 gap-1'>
                <label htmlFor='searchLocation' className="min-w-max flex items-center 2xl:gap-3 gap-1.5 text-gray-600 text-xs md:text-sm font-semibold"><IoIosSearch size={18}/>Where are you going? (required)</label>
                <input value={handleSearch} onChange={(e) => {
                  e.target.value.length >= 3 ? mutateShowDropdownDebounce(e.target.value) : setDataDropdown([])
                  handleSearchInput(e)
                  }}  
                  id='searchLocation' 
                  className="pt-2 p-1 md:placeholder-shown:text-sm placeholder-shown:text-xs focus:bg-white active:bg-white box-border transition duration-200 text-xs md:text-sm font-normal border-b-2 border-white bg-white focus:border-blue-600 focus:outline-none focus-visible:bg-white" 
                  name='country' 
                  type="text" 
                  placeholder={searchValues.countryName ? '' : `Jakarta / Indonesia`} 
                  disabled={searchValues.countryName ? true : false}/>
                <ErrorMessage name="country" className='text-xs text-red-600 bg-red-200 opacity-25 2xl:opacity-100 font-bold rounded-full px-5 p-1 absolute bottom-[10px] 2xl:top-[4rem] z-10' component={'div'} />
                <div className="absolute top-[65px] 2xl:top-[75px] left-0 z-50 w-full"> 
                  <DropdownCitiesAndCountries setFieldValue={setFieldValue} handleClearSearchInput={handleClearSearchInput} setSearchLocation={setSearchLocation} searchLocation={searchLocation} dataDropdown={dataDropdown} handleSearchInput={handleSearchInput} setDataDropdown={setDataDropdown} setSearchValues={setSearchValues}/>
                </div>
                {
                  searchValues.countryName && (
                    <div className="absolute shadow-sm top-[28px] left-[15px] 2xl:left-[25px] flex items-center gap-3 px-3 py-1 text-xs rounded-full bg-white-600 font-bold text-gray-900 border-2 border-gray-800">
                      <p className='flex items-center gap-1.5'><FaMapLocationDot />{searchValues.cityName && searchValues.cityName + ', '}{searchValues.countryName}</p>
                      <IoMdClose className='hover:cursor-pointer' size={17} onClick={() => {
                        setSearchValues({countryId: '', cityId: '', countryName: '', cityName: ''})
                        setSearchLocation({countryId: '', cityId: '', countryName: '', cityName: ''})
                        }}/>
                    </div>
                  )
                }
              </div>
              <div className='w-full 2xl:w-1/4 border-b-4 border-amber-400 2xl:border-b-0 2xl:rounded-none rounded-md box-border 2xl:border-r bg-white p-1.5 2xl:py-0 2xl:border-gray-300 relative flex flex-col 2xl:px-5 gap-1'>
                <label htmlFor='checkInDate' className="min-w-max flex items-center 2xl:gap-3 gap-1.5 text-gray-600 text-xs md:text-sm font-semibold"><CiCalendar size={19}/>Check-In</label>
                <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start border-none text-xs md:text-sm font-normal text-left h-[3em] focus-within:border-none hover:bg-white shadow-none !p-0",
                          !bookingDays.checkInDate && "text-muted-foreground"
                        )}
                      >
                        {bookingDays.checkInDate ? bookingDays.checkInDate.toDateString() : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent side="bottom" align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={bookingDays.checkInDate}
                        disabled={{ before: new Date() }}
                        onSelect={(date) => {
                          if (date) {
                            setBookingDays((prev) => ({
                              checkInDate: date,
                              checkOutDate: addDays(date, 1),
                            }));
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                </Popover>
                <ErrorMessage name="checkInDate" component="div" />
              </div>
              <div className='w-full 2xl:w-1/4 border-b-4 border-amber-400 2xl:border-b-0 2xl:rounded-none rounded-md box-border 2xl:border-r bg-white p-1.5 2xl:py-0 2xl:border-gray-300 relative flex flex-col 2xl:px-5 gap-1'>
                <label htmlFor='checkOutDate' className="min-w-max flex items-center 2xl:gap-3 gap-1.5 text-gray-600 text-xs md:text-sm font-semibold"><CiCalendar size={19}/>Check-Out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start border-none font-normal text-xs md:text-sm text-left h-[3em] focus-within:border-none hover:bg-white shadow-none !p-0",
                        !bookingDays.checkOutDate && "text-muted-foreground"
                      )}
                    >
                    
                      {bookingDays.checkOutDate ? bookingDays.checkOutDate.toDateString() : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start" className="w-full p-0">
                    <Calendar
                      mode="single"
                      selected={bookingDays.checkOutDate}
                      disabled={(date) =>
                        !!bookingDays.checkInDate
                          ? date < new Date() || date <= bookingDays.checkInDate
                          : date < new Date()
                      }
                      onSelect={(date) => {
                        if (date && bookingDays.checkInDate) {
                          setBookingDays({checkOutDate: date, checkInDate: bookingDays.checkInDate})
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <ErrorMessage name="checkOutDate" component="div" />
              </div>
              <div className='w-full 2xl:w-1/4 border-b-4 border-amber-400 2xl:border-b-0 2xl:rounded-r-full rounded-md box-border bg-white p-1.5 2xl:py-0 2xl:border-gray-300 relative flex flex-col 2xl:px-5 gap-1'>
                <label htmlFor='guestRoom' className="min-w-max flex items-center 2xl:gap-3 gap-1.5 text-gray-600 text-xs md:text-sm font-semibold"><GoPerson size={19}/>Guest Room</label>
                <button onClick={() => setShowGuestAndRoomCounter(state => !state)} id='guestRoom' className="text-left text-black pt-2 p-1 box-border transition duration-200 text-xs md:text-sm font-normal border-b-2 border-white" name='guestRoom' type="button">
                1 Room - {allGuest.totalGuest} Guest
                </button>
                {
                  showGuestAndRoomCounter && (
                  <div className="absolute top-[75px] left-0 z-[50] w-full">
                    <GuestAndRoomCounter setTotalGuest={setTotalGuest} totalGuest={totalGuest} setFieldValue={setFieldValue} allGuest={allGuest} setAllGuest={setAllGuest} setShowGuestAndRoomCounter={setShowGuestAndRoomCounter} />
                  </div>
                  )
                }
                <ErrorMessage name="adult" component="div" />
              </div>
              <div className="2xl:w-[10%] w-full flex 2xl:justify-end 2xl:absolute right-2">
                <button className={`disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 hover:bg-gray-600 active:scale-90 transition duration-200 py-3 md:py-5 px-12 rounded-md 2xl:rounded-full bg-black font-semibold text-sm md:text-base text-white w-full`} type='submit' disabled={isPendingSearch || !searchLocation?.countryId}>Search</button>
              </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default SearchHeader
