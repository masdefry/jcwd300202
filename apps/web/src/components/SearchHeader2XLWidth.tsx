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

const SearchHeader2XLWidth = ({
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
        router.push(`/explore/search${slug}`)
      },
      onError: (error) => {
        console.log(error)
      }
    })


  return (
    <section className="h-[5rem] hidden 2xl:grid grid-cols-4 items-center justify-evenly rounded-full bg-white p-3 relative shadow-sm border-2 border-amber-400">
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
            <Form className='w-full flex items-center justify-start absolute'>
              <div className='w-1/4 box-border border-r border-gray-300 relative flex flex-col px-7 gap-1'>
                <label htmlFor='searchLocation' className="min-w-max flex items-center gap-3 text-gray-600 text-sm font-semibold"><IoIosSearch size={18}/>Where are you going? (required)</label>
                <input value={handleSearch} onChange={(e) => {
                  e.target.value.length >= 3 ? mutateShowDropdownDebounce(e.target.value) : setDataDropdown([])
                  handleSearchInput(e)
                  }}  
                  id='searchLocation' 
                  className="pt-2 p-1 placeholder-shown:text-sm focus:bg-white active:bg-white box-border transition duration-200 text-sm font-normal border-b-2 border-white bg-white focus:border-blue-600 focus:outline-none focus-visible:bg-white" 
                  name='country' 
                  type="text" 
                  placeholder={searchValues.countryName ? '' : `Jakarta / Indonesia`} 
                  disabled={searchValues.countryName ? true : false}/>
                <ErrorMessage name="country" className='text-xs text-red-600 bg-red-200 font-bold rounded-full px-5 p-1 absolute top-[4rem]' component={'div'} />
                <div className="absolute top-[80px] left-0 z-20 w-full"> 
                  <DropdownCitiesAndCountries setFieldValue={setFieldValue} handleClearSearchInput={handleClearSearchInput} setSearchLocation={setSearchLocation} searchLocation={searchLocation} dataDropdown={dataDropdown} handleSearchInput={handleSearchInput} setDataDropdown={setDataDropdown} setSearchValues={setSearchValues}/>
                </div>
                {
                  searchValues.countryName && (
                    <div className="absolute shadow-sm top-[28px] left-[25px] flex items-center gap-3 px-3 py-1 text-xs rounded-full bg-white-600 font-bold text-gray-900 border-2 border-gray-800">
                      <p className='flex items-center gap-1.5'><FaMapLocationDot />{searchValues.cityName && searchValues.cityName + ', '}{searchValues.countryName}</p>
                      <IoMdClose className='hover:cursor-pointer' size={17} onClick={() => {setSearchValues({countryId: '', cityId: '', countryName: '', cityName: ''})}}/>
                    </div>
                  )
                }
              </div>

              <div className='w-1/4 box-border border-r border-gray-300 relative flex flex-col px-5 gap-1'>
                <label htmlFor='checkInDate' className="min-w-max flex items-center gap-3 text-gray-600 text-sm font-semibold"><CiCalendar size={19}/>Check-In</label>
                <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start border-none text-sm font-normal text-left h-[3em] focus-within:border-none hover:bg-white shadow-none !p-0",
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
              <div className='w-1/4 box-border border-r border-gray-300 relative flex flex-col px-5 gap-1'>
                <label htmlFor='checkOutDate' className="min-w-max flex items-center gap-3 text-gray-600 text-sm font-semibold"><CiCalendar size={19}/>Check-Out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start border-none font-normal text-sm text-left h-[3em] focus-within:border-none hover:bg-white shadow-none !p-0",
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
              <div className='w-1/4 box-border border-gray-300 relative flex flex-col px-5 gap-1'>
                <label htmlFor='guestRoom' className="min-w-max flex items-center gap-3 text-gray-600 text-sm font-semibold"><GoPerson size={19}/>Guest Room</label>
                <button onClick={() => setShowGuestAndRoomCounter(state => !state)} id='guestRoom' className="text-left text-black pt-2 p-1 box-border transition duration-200 text-sm font-normal border-b-2 border-white" name='guestRoom' type="button">
                1 Room - {allGuest.totalGuest} Guest
                </button>
                {
                  showGuestAndRoomCounter && (
                  <div className="absolute top-20 left-0 z-30 ">
                    <GuestAndRoomCounter setFieldValue={setFieldValue} allGuest={allGuest} setAllGuest={setAllGuest} setShowGuestAndRoomCounter={setShowGuestAndRoomCounter} />
                  </div>
                  )
                }
                <ErrorMessage name="adult" component="div" />
              </div>
              <div className="w-[10%] flex justify-end absolute right-2">
                <button className={`${isPendingSearch ? 'opacity-75' : 'hover:opacity-75 active:scale-90 transition duration-200'} py-5 px-12 rounded-full bg-black font-semibold text-base text-white`} type='submit' disabled={isPendingSearch}>Search</button>
              </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default SearchHeader2XLWidth
