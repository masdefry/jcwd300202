'use client'

import Separator from '@/features/auth/components/Separator'
import { differenceInDays } from 'date-fns'
import { difference } from 'next/dist/build/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsBuildings } from 'react-icons/bs'
import { CgUnavailable } from 'react-icons/cg'
import { CiBookmarkPlus, CiLocationOn } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa6'
import { RiBuilding3Line } from 'react-icons/ri'

const CardForExplore = ({ item, searchParams, isPending }: any) => {
    if(isPending) {
        return (
          <div className="bg-white w-full h-fit 2xl:h-[15rem] rounded-lg flex 2xl:flex-row flex-col items-start gap-3 shadow-md border border-slate-200">
            <figure className=" 2xl:w-[55rem] w-full 2xl:h-full h-[15rem] rounded-t-md overflow-hidden  2xl:p-3">
                <div className='w-full h-full skeleton bg-slate-200 rounded-md' ></div>
            </figure>
            <div className="2xl:w-[100rem] w-full h-fit flex flex-col gap-2 2xl:justify-between 2xl:h-full p-3">
              <div className="flex justify-between">
                <hgroup className="flex flex-col w-full">
                  <h1 className="2xl:text-2xl lg:text-xl md:text-lg text-base font-bold skeleton w-fit rounded-none text-transparent bg-slate-300">
                    Pan Pacific Jakarta
                  </h1>
                  <p className="mt-1 lg:text-base text-sm font-light skeleton w-fit rounded-none text-transparent bg-slate-300 flex items-center gap-1">
                    Jakarta, Indonesia
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    <p className="skeleton w-fit  text-transparent bg-gray-200 rounded-md px-1 py-1 font-bold text-xs flex items-center gap-1.5">
                      Hotel O O O O O
                    </p>
                  </div>
      
                  <div className="flex flex-wrap items-center gap-1 mt-2">
                    {Array.from({length: 4})
                      .map(
                        (
                          _,
                          index: number,
                        ) => {
                          return (
                            <p
                              key={index}
                              className="skeleton w-fit text-transparent bg-slate-300 rounded-badge p-1 text-[10.4px] font-semibold"
                            >
                              My Facility
                            </p>
                          )
                        },
                      )}
                  </div>
                </hgroup>
              </div>
              <div className="2xl:hidden">
                <Separator />
              </div>
              <div className="flex justify-end  w-full">
                <div className="2xl:hidden flex flex-col items-start gap-1 h-full w-full">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-xs skeleton w-fit rounded-none text-transparent bg-slate-300">
                        Starts from{' '}
                        <span className="font-bold text-lg pr-1 w-fit rounded-none text-transparent bg-transparent">
                          Rp50000000
                        </span>
                      </p>
                      <p className="text-xs skeleton mt-1 w-fit rounded-none text-transparent bg-slate-300 font-bold">
                        Includes tax & price
                      </p>
                    </div>
                    <p className="text-xs pr-1 font-semibold skeleton w-fit rounded-none text-transparent bg-slate-300 text-right sm:flex 2xl:hidden justify-end hidden">
                      1 Nights | 1 Adults | 1 children
                    </p>
                  </div>
                    <div
                      className="rounded-md skeleton w-full text-transparent bg-slate-300 text-sm font-bold  px-6 py-3  mt-3 flex items-center justify-center gap-2"
                    >
                      Book this room
                    </div>
                </div>
                <p className=" text-xs pr-1 font-semibold skeleton w-fit rounded-none text-transparent bg-slate-300 text-right 2xl:flex justify-end items-end hidden">
                  1 Nights | 1 Adults | 1 children
                </p>
              </div>
            </div>
            <div className="w-full border-l border-slate-300 hidden 2xl:flex flex-col h-full items-end justify-between p-3">
              <div
                className={`hidden 2xl:flex flex-col gap-1 items-end`}
              >
                <span className="flex items-center gap-1 leading-3">
                  <p className="text-sm font-bold skeleton w-fit rounded-none text-transparent bg-slate-300 flex items-center gap-1">

                    9.8
                  </p>
                  <p className="text-xs font-medium skeleton w-fit rounded-none text-transparent bg-slate-300">
                    (1000 reviews)
                  </p>
                </span>
                <p className="text-xs font-bold rounded-full skeleton w-fit text-transparent bg-slate-300 p-1 px-2">
                 Sensational
                </p>
              </div>
              <div className="flex flex-col items-end justify-end gap-1 h-full w-full">
                <div className="flex flex-col items-end">
                  <p className="text-xs skeleton w-fit rounded-none text-transparent bg-slate-300">
                    Starts from{' '}
                    <span className="font-bold text-xl pr-1 w-fit rounded-none text-transparent bg-transparent">
                      Rp5000000
                    </span>
                  </p>
                  <p className="text-xs skeleton w-fit rounded-none mt-1 text-transparent bg-slate-300 font-bold">
                    Includes tax & price
                  </p>
                </div>
                  <div
                    
                    className="w-fit min-w-max rounded-full skeleton  text-transparent bg-slate-300 text-base font-bold px-6 py-3  mt-3 flex items-center gap-2"
                  >
                    Book this room
                  </div>
              </div>
            </div>
          </div>
        )
    }
  return (
    <div className="bg-white w-full h-fit 2xl:h-[15rem] rounded-lg flex 2xl:flex-row flex-col items-start gap-3 shadow-md border border-slate-200">
      <figure className=" 2xl:w-[55rem] w-full 2xl:h-full h-[15rem] rounded-t-md overflow-hidden 2xl:p-3">
        <Image
          src={`http://localhost:5000/api/${item?.propertyDetail?.propertyImage[0]?.directory}/${item?.propertyDetail?.propertyImage[0]?.filename}.${item?.propertyDetail?.propertyImage[0]?.fileExtension}`}
          width={500}
          height={500}
          alt=""
          className="w-full h-full object-cover rounded-sm"
        />
      </figure>
      <div className="2xl:w-[100rem] w-full h-fit flex flex-col gap-2 2xl:justify-between 2xl:h-full p-3">
        <div className="flex justify-between">
          <hgroup className="flex flex-col w-full">
            <h1 className="2xl:text-2xl lg:text-xl md:text-lg text-base font-bold text-gray-900">
              {item?.name}
            </h1>
            <p className="lg:text-base text-sm font-light text-gray-600 flex items-center gap-1">
              <CiLocationOn className="text-red-600 lg:text-lg text-base" />
              {item?.city?.name}, {item?.country?.name}
            </p>
            <div className="flex items-center gap-1 mt-3">
              <p className="bg-blue-200 rounded-md px-1 py-1 text-blue-700 font-bold text-xs flex items-center gap-1.5">
                <BsBuildings />
                {item?.propertyType?.name}
              </p>
              {item?.propertyType?.name.toLowerCase() === 'hotel' && (
                <div className="flex items-center">
                  {Array.from({ length: Number(item?.star) }).map(
                    (_, index) => {
                      return (
                        <FaStar
                          key={index}
                          className="text-yellow-400 md:text-base text-sm"
                        />
                      )
                    },
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1 mt-2">
              {item?.propertyHasFacility
                .slice(0, 3)
                .map(
                  (
                    propertyHasFacility: any,
                    propertyHasFacilityIndex: number,
                  ) => {
                    return (
                      <p
                        key={propertyHasFacilityIndex}
                        className="text-gray-800 bg-gray-100 rounded-badge p-1 text-[10.4px] font-semibold"
                      >
                        {propertyHasFacility?.propertyFacility?.name}
                      </p>
                    )
                  },
                )}
              {item?.propertyHasFacility.length > 3 && (
                <p className="text-gray-500 bg-gray-100 rounded-full p-1 text-[10.4px] font-semibold">
                  {item?.propertyHasFacility.length - 3}+
                </p>
              )}
            </div>
          </hgroup>
        </div>
        <div className="2xl:hidden">
          <Separator />
        </div>
        <div className="flex justify-end  w-full">
          <div className="2xl:hidden flex flex-col items-start gap-1 h-full w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-gray-600">
                  Starts from{' '}
                  <span className="font-bold text-lg pr-1 text-orange-600">
                    Rp{item?.propertyRoomType[0]?.price}
                  </span>
                </p>
                <p className="text-xs text-gray-600 font-bold">
                  Includes tax & price
                </p>
              </div>
              <p className="w-full text-xs pr-1 font-semibold text-gray-400 text-right sm:flex 2xl:hidden justify-end hidden">
                {Math.abs(differenceInDays(searchParams['check-in-date'], searchParams['check-out-date']))} Nights | {searchParams?.adult} Adults | {searchParams?.children} children
              </p>
            </div>
            {item?.availability ? (
              <Link
                href={`/property/${item?.slug}/details?check-in-date=${searchParams['check-in-date']}&check-out-date=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}`}
                className="rounded-md bg-black text-sm font-bold text-white px-6 w-full py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3 flex items-center justify-center gap-2"
              >
                <CiBookmarkPlus size={23} />
                Book this room
              </Link>
            ) : (
              <Link
                href={`/property/${item?.slug}/details?check-in-date=${searchParams['check-in-date']}&check-out-date=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}`}
                className="rounded-md bg-black teslate-300-sm font-bold text-white px-6 w-full py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3 flex items-center justify-center gap-2"
              >
                <CgUnavailable size={23} />
                Not Available
              </Link>
            )}
          </div>
          <p className="w-full text-xs pr-1 font-semibold text-gray-400 text-right 2xl:flex justify-end items-end hidden">
            {differenceInDays(searchParams['check-out-date'], searchParams['check-in-date']) || 1} Nights | 1 Adults | 1 children
          </p>
        </div>
      </div>
      <div className="w-full border-l border-slate-300 hidden 2xl:flex flex-col h-full items-end justify-between p-3">
        <div
          className={`${item?.avgRating >= 5 ? 'hidden 2xl:flex' : 'hidden'} flex-col gap-1 items-end`}
        >
          <span className="flex items-center gap-1 leading-3">
            <p className="text-sm font-bold text-gray-800 flex items-center gap-1">
              <RiBuilding3Line className="text-blue-800 text-base" />{' '}
              {item?.avgRating}
            </p>
            <p className="text-xs font-medium text-gray-800">
              ({item?.review?.length} reviews)
            </p>
          </span>
          <p className="text-xs font-bold rounded-full text-green-800 bg-green-200 p-1 px-2">
            {item?.avgRating >= 9
              ? 'Sensational'
              : item?.avgRating >= 7.5
                ? 'Awesome'
                : item?.avgRating >= 6
                  ? 'Nice'
                  : 'Good'}
          </p>
        </div>
        <div className="flex flex-col items-end justify-end gap-1 h-full w-full">
          <div className="flex flex-col items-end">
            <p className="text-xs text-gray-600">
              Starts from{' '}
              <span className="font-bold text-xl pr-1 text-orange-500">
                Rp{item?.propertyRoomType[0]?.price}
              </span>
            </p>
            <p className="text-xs text-gray-600 font-bold">
              Includes tax & price
            </p>
          </div>
          {item?.availability ? (
            <Link
              href={`/property/${item?.slug}/details${ (searchParams['check-in-date'] && searchParams['check-out-date']) ? `?check-in-date=${searchParams['check-in-date']}&check-out-date=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}` : ''}`}
              className="min-w-max rounded-full bg-black text-base font-bold text-white px-6 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3 flex items-center gap-2"
            >
              <CiBookmarkPlus size={23} />
              Book this room
            </Link>
          ) : (
            <Link
              href={`/property/${item?.slug}/details${ (searchParams['check-in-date'] && searchParams['check-out-date']) ? `?check-in-date=${searchParams['check-in-date']}&check-out-date=${searchParams['check-out-date']}&adult=${searchParams.adult}&children=${searchParams.children}` : ''}`}
              className="min-w-max rounded-full bg-slate-300 text-base font-bold text-white px-6 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3 flex items-center gap-2"
            >
              <CgUnavailable size={23} />
              Not Available
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardForExplore
