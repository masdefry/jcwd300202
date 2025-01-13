'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import searchStore  from '@/zustand/searchStore'
// import { headerStore } from '@/zustand/headerStore'
import { differenceInDays } from 'date-fns'
import { useMutation, useQuery } from '@tanstack/react-query'
import useSearchHook from '@/hooks/useSearchHook'
import instance from '@/utils/axiosInstance'
import useSearchParams from 'next/navigation'
import { RiBuilding3Line } from 'react-icons/ri'
import { FaSortAmountDownAlt, FaStar } from 'react-icons/fa'
import { CiBookmarkPlus, CiLocationOn } from 'react-icons/ci'
import { indexOf } from 'cypress/types/lodash'
import useFilteringPropertyHook from '@/features/property/hooks/useFilteringPropertyHook'
import Image from 'next/image'
import { TbConfetti } from 'react-icons/tb'
import { CgSearchFound, CgUnavailable } from 'react-icons/cg'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Separator from '@/features/auth/components/Separator'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { BsBuildings } from 'react-icons/bs'
import { IoFilter } from 'react-icons/io5'
import RangeSlider from 'rsuite/RangeSlider'
import 'rsuite/RangeSlider/styles/index.css'
import CardForExplore from '@/features/explore/components/CardForExplore'

const ExplorePage = ({ searchParams }: { searchParams: any }) => {
  const [priceRange, setPriceRange] = useState([300000, 1000000])
  const pathname = usePathname()
  const router = useRouter()
  const [totalDays, setTotalDays] = useState(0)
  const [dataProperties, setDataProperties] = useState<any>()
  const [propertyFacilityIdArr, setPropertyFacilityIdArr] = useState<any[]>([])
  const [propertyRoomFacilityIdArr, setPropertyRoomFacilityIdArr] = useState<
    any[]
  >([])
  const [propertyTypeIdArr, setPropertyTypeIdArr] = useState<any[]>([])
  const [propertyStarArr, setPropertyStarArr] = useState<any[]>([])
  const [filterMobileMode, setFilterMobileMode] = useState(false)
  const [sortMobileMode, setSortMobileMode] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  // const [ priceRange, setPriceRange ] = useState({ minPrice: 0, maxPrice: 3000000 })
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000000)
  const urlParams = new URLSearchParams({})
  const handleSearchParams = (orderBy: string, value: string) => {
    const currParams = window.location.href.includes('/search?')
      ? window.location.href.split('?')[1].split('&')
      : null

    currParams &&
      currParams.forEach((item: any) => {
        urlParams.set(item.split('=')[0], decodeURIComponent(item.split('=')[1]))
      })
    urlParams.set(orderBy, value)
    window.history.pushState({}, '', '?' + urlParams.toString())
  }
  const handlePrice = (
    priceType: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (priceType === 'minPrice') {
      if (
        Number(event.target.value) < maxPrice &&
        Number(event.target.value) >= 0
      ) {
        setMinPrice(Number(event.target.value))
      } else {
        setMinPrice(minPrice)
      }
      handleSearchParams('min-price', event.target.value)
    } else if (priceType === 'maxPrice') {
        if (
            Number(event.target.value) > minPrice &&
            Number(event.target.value) > 0
        ) {
            setMaxPrice(Number(event.target.value))
        } else {
            setMaxPrice(maxPrice)
        }
        handleSearchParams('max-price', event.target.value)
    }
  }
  
  const handlePropertyFacilityFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyFacilityIdArr([...propertyFacilityIdArr, value])
    } else {
      setPropertyFacilityIdArr((state) =>
        state.filter((item) => item !== value),
      )
    }
    mutateExplorePagination({})
  }
  const handlePropertyRoomFacilityFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyRoomFacilityIdArr([...propertyRoomFacilityIdArr, value])
    } else {
      setPropertyRoomFacilityIdArr((state) =>
        state.filter((item) => item !== value),
      )
    }
    mutateExplorePagination({})
  }
  const handlePropertyTypeIdFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyTypeIdArr([...propertyTypeIdArr, value])
    } else {
      setPropertyTypeIdArr((state) => state.filter((item) => item !== value))
    }
    mutateExplorePagination({})
  }
  const handlePropertyStarFilter = (
    isChecked: boolean,
    value: string | number,
  ) => {
    if (isChecked) {
      setPropertyStarArr([...propertyStarArr, value])
    } else {
      setPropertyStarArr((state) => state.filter((item) => item !== value))
    }
    mutateExplorePagination({})
  }
  const [showFilterPropertyFacility, setShowFilterPropertyFacility] =
    useState(false)
  const [showFilterPropertyRoomFacility, setShowFilterPropertyRoomFacility] =
    useState(false)
  const [showPropertyType, setShowPropertyType] = useState(false)
  const {
    searchLocation,
    setSearchLocation,
    bookingDays,
    setBookingDays,
    totalGuest,
    setTotalGuest,
    searchResults,
    setSearchResults,
    allGuest,
    setAllGuest,
  } = useSearchHook()
  const { dataForFilteringProperty, setDataForFilteringProperty } =
    useFilteringPropertyHook()

    const fetchDataProperties = async() => {
      try {
        const res = await instance.get(
            `/property?countryId=${searchParams.country}&cityId=${searchParams.city}&checkInDate=${searchParams['check-in-date']}&checkOutDate=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}&offset=0&limit=5&order=asc&sortBy=price`,
            {
              headers: {
                propertyFacilityIdArr: [],
                propertyRoomFacilityIdArr: [],
                propertyTypeIdArr: [],
              },
            },
        )
        if(res.status === 200) {
            setIsLoading(false)
            setDataProperties(res?.data?.data)
            setDataForFilteringProperty(res?.data?.data?.dataForFilteringProperty)
        }
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
        fetchDataProperties()
    }, [])
//   const { isPending: isPendingProperties } = useQuery({
//     queryKey: ['getProperties'],
//     queryFn: async () => {
//       const res = await instance.get(
//         `/property?countryId=${searchParams.country}&cityId=${searchParams.city}&checkInDate=${searchParams['check-in-date']}&checkOutDate=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}&offset=0&limit=5&order=asc&sortBy=price`,
//         {
//           headers: {
//             propertyFacilityIdArr: [],
//             propertyRoomFacilityIdArr: [],
//             propertyTypeIdArr: [],
//           },
//         },
//       )

//       setDataProperties(res?.data?.data)
//       setDataForFilteringProperty(res?.data?.data?.dataForFilteringProperty)
//       console.log(res)
//       return res?.data?.data
//     },
//   })

  const {
    mutate: mutateExplorePagination,
    isPending: isPendingExplorePagination,
  } = useMutation({
    mutationFn: async ({
      limit = 5,
      offset = 0,
      sortBy,
      order,
    }: {
      limit?: number
      offset?: number
      sortBy?: string
      order?: string
    }) => {
        handleSearchParams('limit', limit.toString() || searchParams.limit || '5')
        handleSearchParams('offset', offset.toString() || searchParams.offset || '0')
        handleSearchParams('sort', sortBy || searchParams.sort || '')
        handleSearchParams('order', order || searchParams.order || '')
      const res = await instance.get(
        `/property?countryId=${searchParams.country}&cityId=${searchParams.city}&checkInDate=${searchParams['check-in-date']}&checkOutDate=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}&offset=${offset || searchParams.offset || 0}&limit=${limit || searchParams.limit || 5}&order=${order || searchParams.order || 'asc'}&sortBy=${sortBy || searchParams.sort|| 'price'}&minPrice=${searchParams.minPrice || searchParams['min-price'] || 0}&maxPrice=${searchParams.maxPrice || searchParams['max-price'] || null}`,
        {
          headers: {
            propertyFacilityIdArr,
            propertyRoomFacilityIdArr,
            propertyTypeIdArr,
            propertyStarArr,
          },
        },
      )

      console.log(res)
      setDataProperties(res?.data?.data)
      return res?.data
    },
    onSuccess: (res) => {
        setSortMobileMode(false)
    },
    onError: (err) => {
      console.log(err)
    },
  })
  // const { data: dataProperties, isPending, isError, error} = useQuery({
  //     queryKey: ['results'],
  //     queryFn: async() => {
  //         console.log(searchParams, '>>>>>>>>')
  //         const res = await instance.get(
  //             `/search?country=${searchParams.country}&city=${searchParams.city}&checkInDate=${searchParams["check-in-date"]}&checkOutDate=${searchParams["check-out-date"]}&adult=${searchParams.adult}&children=${searchParams.children}`, {
  //         })
  //         console.log("USE QUERY EXPLORE:", res)
  //         setTotalDays(differenceInDays(bookingDays.checkOutDate, bookingDays.checkInDate))
  //         return res
  //     }
  // })

  // if(isError){
  //     console.log(error.message)
  //     return <span>Error: {error.message}</span>
  // }

  //   useEffect(() => {
  //   }, [bookingDays.checkInDate, bookingDays.checkOutDate])

  let nights = totalDays === 1 ? 'night' : 'nights'
  let adults = totalGuest.adult === 1 ? 'adult' : 'adults'

  return (
    <main className="w-full min-h-min py-5">
      <section className="m-auto max-w-screen-xl flex flex-col 2xl:grid grid-cols-4  gap-5 w-full h-full">
        <div className="2xl:hidden text-sm rounded-md w-full flex items-center gap-2 p-3">
          <div
            onClick={() => setFilterMobileMode(true)}
            className="hover:bg-slate-200 active:scale-90 transition duration-100 flex items-center border border-slate-100 flex-col rounded-md bg-white text-gray-800 shadow-md h-12 min-w-12 justify-center w-12"
          >
            <IoFilter />
            <span className="text-xs font-bold">Filter</span>
          </div>
          <div
            onClick={() => setSortMobileMode(true)}
            className="hover:bg-slate-200 active:scale-90 transition duration-100 flex items-center border border-slate-100 flex-col rounded-md bg-white text-gray-800 shadow-md h-12 min-w-12 justify-center w-12"
          >
            <FaSortAmountDownAlt />
            <span className="text-xs font-bold">Sort</span>
          </div>
          <section
            className={`${sortMobileMode ? 'fixed' : 'hidden'} top-0 left-0 bg-black w-full h-full bg-opacity-30 backdrop-blur-sm  z-[90]`}
          >
            <div
              id="sort-mobile"
              className={`${sortMobileMode ? 'scale-y-100' : 'scale-y-0'} absolute bottom-0 flex flex-col bg-white shadow-md w-full left-0 rounded-t-md transition duration-300`}
            >
              <div className="flex justify-center w-full p-2">
                <span
                  className="bg-slate-500 rounded-full h-1.5 w-[90px]"
                  onClick={() => setSortMobileMode(false)}
                ></span>
              </div>
              <div className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-bold">
                Sort by:
              </div>
              <div onClick={() => mutateExplorePagination({ sortBy: 'name', order: 'asc' })} className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-medium border-t border-slate-500">
                Ascending by Name
              </div>
              <div onClick={() => mutateExplorePagination({ sortBy: 'name', order: 'desc' })} className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-medium border-t border-slate-300">
                Descending by Name
              </div>
              <div onClick={() => mutateExplorePagination({ sortBy: 'price', order: 'asc' })} className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-medium border-t border-slate-300">
                Ascending by Price
              </div>
              <div onClick={() => mutateExplorePagination({ sortBy: 'price', order: 'desc' })} className="p-5 hover:bg-slate-300 text-gray-800 text-sm font-medium border-t border-slate-300">
                Ascending by Price
              </div>
            </div>
          </section>
          <div className="min-w-max text-sm font-bold overflow-x-auto">
            {dataProperties?.country?.name ? (
              <p className="text-gray-800">
                {dataProperties?.city?.name && dataProperties?.city?.name + ','}{' '}
                {dataProperties?.country?.name}
              </p>
            ) : (
              <p className="text-gray-800">All properties</p>
            )}
            <p className="text-gray-800 font-normal mt-[-3px] flex items-center">
              {dataProperties?.countProperties} property found
              <CgSearchFound className="ml-2 text-green-600" />
            </p>
          </div>
          <div className="carousel w-fit gap-3">
            <div className="carousel-item flex items-center gap-1.5 p-1 rounded-md">
              <span className="col-span-2 bg-slate-800 flex  min-w-max items-center gap-2 p-2 text-white text-sm font-bold rounded-md">
                <div className="text-green-900 bg-green-200 p-1 rounded-full">
                  <TbConfetti size={19} />
                </div>
                <p className="text-white min-w-max">
                  40% off for accomodation in Medan City region
                </p>
              </span>
            </div>
            <div className="carousel-item flex items-center gap-2">
              <span className="col-span-2 bg-slate-200 flex  min-w-max items-center gap-2 p-2 text-white text-sm font-bold rounded-md">
                <div className="text-red-800 bg-red-200 p-1 rounded-full">
                  <TbConfetti size={19} />
                </div>
                <p className="text-gray-900 min-w-max">
                  Up to 10% off for the first booking
                </p>
              </span>
            </div>
          </div>
        </div>
        <section
          className={`${filterMobileMode ? 'flex' : 'hidden'} 2xl:relative fixed bottom-0 col-span-1 w-full 2xl:flex flex-col 2xl:gap-5 bg-white rounded-t-md z-[54]`}
        >
          <div className="2xl:hidden bg-gray-800 text-white p-2 flex items-center justify-center w-full rounded-t-md">
            <span
              className="bg-slate-300 rounded-full h-1.5 w-[90px]"
              onClick={() => setFilterMobileMode(false)}
            ></span>
          </div>
          <div
            className="2xl:rounded-md w-full 2xl:shadow-md flex flex-col overflow-hidden bg-white"
            id="price-filter"
          >
            <hgroup className="flex flex-col gap-1.5 text-sm font-bold py-3 px-5 bg-gray-800 text-white">
              <h1>Price</h1>
              <p className="font-light text-gray-300">Get the best deal</p>
            </hgroup>
            <div className="flex flex-col gap-1 p-5">
              <RangeSlider
                value={[minPrice / 100000, maxPrice / 100000]}
                onChange={(value) => {
                  setMinPrice(value[0] * 100000)
                  setMaxPrice(value[1] * 100000)
                }}
                renderTooltip={(value) => (
                  <div className="font-bold text-xs">
                    {value && value * 100000}
                  </div>
                )}
              />
              <div className="flex items-center gap-1">
                <div className="text-sm font-semibold flex flex-col gap-1">
                  <label className="ml-3" htmlFor="minPrice">
                    Starts from
                  </label>
                  <input
                    type="number"
                    onChange={(e: any) => handlePrice('minPrice', e)}
                    value={minPrice}
                    name="minPrice"
                    id="minPrice"
                    className="w-full rounded-full border border-slate-300 bg-white text-xs placeholder-shown:text-xs text-gray-800 focus:outline-1 px-3 py-1"
                    placeholder="300.000"
                  />
                </div>
                <div className="text-sm font-semibold flex flex-col gap-1">
                  <label className="ml-3" htmlFor="maxPrice">
                    to
                  </label>
                  <input
                    type="number"
                    onChange={(e: any) => handlePrice('maxPrice', e)}
                    value={maxPrice}
                    name="maxPrice"
                    id="maxPrice"
                    className="w-full rounded-full border border-slate-300 bg-white text-xs placeholder-shown:text-xs text-gray-800 focus:outline-1 px-3 py-1"
                    placeholder="3.000.000"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <button
                  onClick={() => {
                    searchParams.minPrice = minPrice
                    searchParams.maxPrice = maxPrice
                    mutateExplorePagination({})
                  }}
                  className="w-full text-xs font-bold hover:opacity-75 transition duration-100 active:scale-90 text-white bg-gray-900 rounded-full py-2 px-3 shadow-md"
                  type="button"
                >
                  Set price
                </button>
              </div>
            </div>
          </div>
          <div
            tabIndex={0}
            className="2xl:rounded-md rounded-none collapse collapse-arrow 2xl:shadow-md 2xl:border-t-0 border-t border-slate-300"
          >
            <input type="checkbox" />
            <div className="collapse-title text-sm font-bold text-gray-800 bg-white flex items-center gap-1">
              Accomodation Type
              <span className="rounded-full bg-slate-200 text-slate-700 text-xs h-[1.5em] w-[1.5em] flex items-center justify-center">
                {dataForFilteringProperty?.propertyTypeCounter}
              </span>
            </div>
            <div className="collapse-content pt-3">
              <div className="overflow-y-auto scrollbar-thin max-h-[250px]">
                <ul className="flex flex-col gap-4 text-sm font-semibold 2xl:overflow-y-visible overflow-y-scroll">
                  {dataForFilteringProperty?.propertyType
                    .slice(0, 4)
                    .map((item: any, index: number) => {
                      return (
                        <li key={index} className="form-control">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              value={item?.id}
                              onChange={(e) =>
                                handlePropertyTypeIdFilter(
                                  e.target.checked,
                                  e.target.value,
                                )
                              }
                              type="checkbox"
                              className="checkbox"
                            />
                            <span className="text-gray-600 label-text">
                              {item?.name}
                            </span>
                          </label>
                        </li>
                      )
                    })}
                  {!showPropertyType ? (
                    <li
                      onClick={() => setShowPropertyType(true)}
                      className={`${dataForFilteringProperty?.propertyType.length <= 4 && 'hidden'} hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100`}
                    >
                      Show more...
                    </li>
                  ) : (
                    <ul className="flex flex-col gap-4 text-sm font-semibold">
                      {dataForFilteringProperty?.propertyType
                        .slice(4)
                        .map((item: any, index: number) => {
                          return (
                            <li key={index} className="form-control">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  value={item?.id}
                                  onChange={(e) =>
                                    handlePropertyTypeIdFilter(
                                      e.target.checked,
                                      e.target.value,
                                    )
                                  }
                                  type="checkbox"
                                  className="checkbox"
                                />
                                <span className="text-gray-600 label-text">
                                  {item?.name}
                                </span>
                              </label>
                            </li>
                          )
                        })}
                      <li
                        onClick={() => setShowPropertyType(false)}
                        className={`${dataForFilteringProperty?.propertyType.length <= 4 && 'hidden'} hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100`}
                      >
                        Show less
                      </li>
                    </ul>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div
            tabIndex={0}
            className="2xl:rounded-md rounded-none collapse collapse-arrow 2xl:shadow-md 2xl:border-t-0 border-t border-slate-300"
          >
            <input type="checkbox" />
            <div className="collapse-title text-sm font-bold text-gray-800 flex items-center gap-1 bg-white">
              Public Facility
              <span className="rounded-full bg-slate-200 text-slate-700 text-xs h-[1.5em] w-[1.5em] flex items-center justify-center">
                {dataForFilteringProperty?.propertyFacilityCounter}
              </span>
            </div>
            <div className="collapse-content pt-3">
              <div className="overflow-y-auto scrollbar-thin max-h-[250px]">
                <ul className="flex flex-col gap-4 text-sm font-semibold">
                  {dataForFilteringProperty?.propertyFacility
                    .slice(0, 5)
                    .map((item: any, index: number) => {
                      return (
                        <li key={index} className="form-control">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              value={item?.id}
                              onChange={(e) =>
                                handlePropertyFacilityFilter(
                                  e.target.checked,
                                  e.target.value,
                                )
                              }
                              type="checkbox"
                              className="checkbox"
                            />
                            <span className="text-gray-600 label-text">
                              {item?.name}
                            </span>
                          </label>
                        </li>
                      )
                    })}
                  {!showFilterPropertyFacility ? (
                    <li
                      onClick={() => setShowFilterPropertyFacility(true)}
                      className={`${dataForFilteringProperty?.propertyFacility.length <= 5 && 'hidden'} hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100`}
                    >
                      Show more...
                    </li>
                  ) : (
                    <ul className="flex flex-col gap-4 text-sm font-semibold">
                      {dataForFilteringProperty?.propertyFacility
                        .slice(5)
                        .map((item: any, index: number) => {
                          return (
                            <li key={index} className="form-control">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  onChange={(e) =>
                                    handlePropertyFacilityFilter(
                                      e.target.checked,
                                      e.target.value,
                                    )
                                  }
                                  value={item?.id}
                                  type="checkbox"
                                  className="checkbox"
                                />
                                <span className="text-gray-600 label-text">
                                  {item?.name}
                                </span>
                              </label>
                            </li>
                          )
                        })}
                      <li
                        onClick={() => setShowFilterPropertyFacility(false)}
                        className={`${dataForFilteringProperty?.propertyFacility.length <= 5 && 'hidden'} hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100`}
                      >
                        Show less
                      </li>
                    </ul>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div
            tabIndex={0}
            className="2xl:rounded-md rounded-none collapse collapse-arrow 2xl:shadow-md 2xl:border-t-0 border-t border-slate-300"
          >
            <input type="checkbox" />
            <div className="collapse-title text-sm font-bold text-gray-800 flex items-center gap-1 bg-white">
              Room Facility
              <span className="rounded-full bg-slate-200 text-slate-700 text-xs h-[1.5em] w-[1.5em] flex items-center justify-center">
                {dataForFilteringProperty?.propertyRoomFacilityCounter}
              </span>
            </div>
            <div className="collapse-content pt-3">
              <div className="overflow-y-auto scrollbar-thin max-h-[250px]">
                <ul className="flex flex-col gap-4 text-sm font-semibold">
                  {dataForFilteringProperty?.propertyRoomFacility
                    .slice(0, 5)
                    .map((item: any, index: number) => {
                      return (
                        <li key={index} className="form-control">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              onChange={(e) =>
                                handlePropertyRoomFacilityFilter(
                                  e.target.checked,
                                  e.target.value,
                                )
                              }
                              value={item?.id}
                              type="checkbox"
                              className="checkbox"
                            />
                            <span className="text-gray-600 label-text">
                              {item?.name}
                            </span>
                          </label>
                        </li>
                      )
                    })}
                  {!showFilterPropertyRoomFacility ? (
                    <li
                      onClick={() => setShowFilterPropertyRoomFacility(true)}
                      className={`${dataForFilteringProperty?.propertyRoomFacility.length <= 5 && 'hidden'} hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100`}
                    >
                      Show more...
                    </li>
                  ) : (
                    <ul className="flex flex-col gap-4 text-sm font-semibold">
                      {dataForFilteringProperty?.propertyRoomFacility
                        .slice(5)
                        .map((item: any, index: number) => {
                          return (
                            <li key={index} className="form-control">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  value={item?.id}
                                  onChange={(e) =>
                                    handlePropertyRoomFacilityFilter(
                                      e.target.checked,
                                      e.target.value,
                                    )
                                  }
                                  type="checkbox"
                                  className="checkbox"
                                />
                                <span className="text-gray-600 label-text">
                                  {item?.name}
                                </span>
                              </label>
                            </li>
                          )
                        })}
                      <li
                        onClick={() => setShowFilterPropertyRoomFacility(false)}
                        className={`${dataForFilteringProperty?.propertyRoomFacility.length <= 5 && 'hidden'} hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100`}
                      >
                        Show less
                      </li>
                    </ul>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div
            tabIndex={0}
            className="2xl:rounded-md rounded-none collapse collapse-arrow 2xl:shadow-md 2xl:border-t-0 border-t border-slate-300"
          >
            <input type="checkbox" />
            <div className="collapse-title text-sm font-bold text-gray-800 bg-white">
              Stars
            </div>
            <div className="collapse-content pt-3">
              <ul className="flex flex-col gap-4 text-sm font-semibold">
                {Array.from({ length: 4 }).map((item, index: number) => {
                  return (
                    <li key={index} className="form-control">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          value={5 - index}
                          onChange={(e) =>
                            handlePropertyStarFilter(
                              e.target.checked,
                              e.target.value,
                            )
                          }
                          type="checkbox"
                          className="checkbox"
                        />
                        <span className="text-gray-600 label-text flex items-center gap-1.5">
                          <p>{5 - index}</p>
                          <FaStar
                            key={index}
                            size={18}
                            className="text-yellow-400"
                          />
                          <p>
                            {dataForFilteringProperty?.countPropertyWithStar
                              ?.toString()
                              .split(',')
                              .join('')[index] || 0}
                          </p>
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div
            tabIndex={0}
            className="2xl:rounded-md rounded-none collapse collapse-arrow 2xl:shadow-md 2xl:border-t-0 border-t border-slate-300"
          >
            <input type="checkbox" />
            <div className="collapse-title text-sm font-bold text-gray-800 bg-white">
              Ratings from Guest
            </div>
            <div className="collapse-content pt-3">
              <ul className="flex flex-col gap-4 text-sm font-semibold">
                {Array.from({ length: 4 }).map((item, index) => {
                  return (
                    <li key={index} className="form-control">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="checkbox" />
                        <span className="text-gray-600 label-text flex items-center gap-1.5">
                          <p>{9 - index}+</p>
                          <RiBuilding3Line
                            key={index}
                            size={18}
                            className="text-gray-800"
                          />
                          <p>(1200)</p>
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </section>
        <div className="2xl:col-span-3 w-full min-h-min flex flex-col gap-3 px-3">
          <div className="hidden grid-cols-4 gap-4 2xl:grid">
            <span className="flex items-center gap-5 col-span-2">
              <div className="w-1/3 text-sm font-bold">
                {dataProperties?.country?.name ? (
                  <p className="text-gray-800">
                    {dataProperties?.city?.name &&
                      dataProperties?.city?.name + ','}{' '}
                    {dataProperties?.country?.name}
                  </p>
                ) : (
                  <p className="text-gray-800">All properties</p>
                )}
                <p className="text-gray-800 font-normal mt-[-3px] flex items-center">
                  {dataProperties?.countProperties} property found
                  <CgSearchFound className="ml-2 text-green-600" />
                </p>
              </div>
              <span className="w-2/3 flex gap-2 items-center">
                <label
                  htmlFor="sort"
                  className="text-xs min-w-max font-bold text-gray-500"
                >
                  Sort by:
                </label>
                <select
                  name="sort"
                  onChange={(e) => {
                    searchParams['sort'] = e.target.value.split('-')[1]
                    searchParams.order = e.target.value.split('-')[0]
                    // router.push(`?sort-by=${e.target.value.split('-')[1]}&order=${e.target.value.split('-')[0]}`)
                    mutateExplorePagination({
                      sortBy: e.target.value.split('-')[1],
                      order: e.target.value.split('-')[0],
                    })
                  }}
                  defaultValue={`${searchParams?.order || 'asc'}-${searchParams['sort'] || 'price'}`}
                  id="sort"
                  className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="asc-price">Lowest to Highest Price</option>
                  <option value="desc-price">Highest to Lowest Price</option>
                  <option value="asc-name">Ascending by Name</option>
                  <option value="desc-name">Descending by Name</option>
                </select>
              </span>
            </span>
            <span className="col-span-2 bg-blue-900 flex items-center gap-2 p-3 px-5 text-white text-sm font-bold rounded-md">
              <div className="text-green-900 bg-green-200 p-1 rounded-full">
                <TbConfetti size={19} />
              </div>
              <p>40% off for accomodation in Medan City region</p>
            </span>
          </div>
          {/* {dataProperties?.data?.data?.map((item: any, index: any) => {
                    return(
                        <div key={index} className='bg-white !w-[50rem] h-[17rem] border rounded-lg flex items-start gap-3 p-3 shadow'>
                            <div className='bg-blue-200 w-[25rem] h-full rounded'>

                            </div>
                            <div className='w-[45rem] h-full flex flex-col'>
                                <div className='flex flex-col'>
                                    <p className='text-xl font-bold'>{item.name}</p>
                                </div>
                                <div className='flex flex-col items-end justify-end gap-1 h-full'>
                                    <p className='text-xs'>from <span className='font-bold text-xl pr-1'>{item.propertyRoomType[0].price}</span></p>
                                    <p className='text-sm pr-1'>{totalDays} {nights} | {totalGuest.adult} {adults} {totalGuest.children > 0 && ` | ${totalGuest.children} children`}</p>
                                    <Link href={`/property/${item.name}`} className='rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3'>Book this room</Link>
                                </div>
                            </div>
                        </div>
                    )
                })} */}

          {
            dataProperties?.properties && Array.isArray(dataProperties?.properties) ? (
              dataProperties?.properties.map((item: any, index: number) => {
                return (
                  <CardForExplore item={item} searchParams={searchParams} isPending={isPendingExplorePagination || isLoading}/>
                )
              })
            ) : (
              Array.from({length: 5}).map((item: any, index: number) => {
                return (
                  <CardForExplore item={item} searchParams={searchParams} isPending={isPendingExplorePagination || isLoading}/>
                )
              })
            )
          }
          <div id="pagination-button" className="w-full flex justify-center">
            <div className="join">
              {Array.from({ length: dataProperties?.totalPage }).map(
                (_, index) => {
                  if (index + 1 === dataProperties?.pageInUse) {
                    return (
                      <button
                        key={index}
                        disabled
                        className="join-item btn btn-sm"
                      >
                        {index + 1}
                      </button>
                    )
                  }
                  return (
                    <button
                      key={index}
                      onClick={() =>
                        mutateExplorePagination({ limit: 5, offset: index * 5 })
                      }
                      className="join-item btn btn-sm"
                    >
                      {index + 1}
                    </button>
                  )
                },
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ExplorePage
