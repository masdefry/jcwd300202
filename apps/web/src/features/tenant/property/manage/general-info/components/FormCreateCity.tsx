'use client'

import React from 'react'
import { ICountry, IDataCreateCity } from '../types'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'
import Image from 'next/image'
import { FaRegTrashCan } from 'react-icons/fa6'

const FormCreateCity = ({
  countryList,
  isPendingCreateCity,
  mutateCreateCity,
  setUploadFile,
  dataCreateCity,
  showCreateCity,
  setDataCreateCity,
  setShowCreateCity,
}: {
  countryList: ICountry[]
  isPendingCreateCity: boolean
  mutateCreateCity: any
  setUploadFile: any
  dataCreateCity: IDataCreateCity
  showCreateCity: boolean
  setDataCreateCity: any
  setShowCreateCity: any
}) => {
  return (
    <section
      className={`z-[54] p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${showCreateCity ? 'flex' : 'hidden'} flex-col gap-1 items-center justify-center`}
    >
      <div className=" flex flex-col gap-1 items-center justify-center w-full">
        <div className="max-w-[400px] w-full flex justify-end">
          <div
            onClick={() => {
              setDataCreateCity({
                file: [],
                name: '',
                countryId: null,
              })
              setShowCreateCity(false)
            }}
            className="bg-white rounded-full flex items-center text-lg text-gray-800 justify-center h-7 w-7 hover:bg-slate-100 hover:cursor-pointer transition duration-100 active:scale-90"
          >
            <IoClose />
          </div>
        </div>
        <div className="bg-white  flex flex-col gap-3 shadow-md p-5 max-w-[400px] w-full rounded-md h-fit">
          <div className="grid items-center gap-1.5 w-full relative">
            <label
              htmlFor="createCityName"
              className="text-sm font-bold text-gray-900"
            >
              City Name
            </label>
            <input
              name="createCityName"
              onChange={(e) => {
                setDataCreateCity((state: IDataCreateCity) => {
                  state.name = e.target.value
                  return state
                })
                setUploadFile((state: boolean) => !state)
              }}
              value={dataCreateCity?.name}
              type="text"
              id="createCityName"
              placeholder="Jakarta / New York"
              className="w-full py-1.5 border-b-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-none focus:outline-none focus:border-blue-600"
            />
          </div>
          <div className="grid items-center gap-1.5 w-full relative">
            <label
              htmlFor="country"
              className="text-sm font-bold text-gray-900"
            >
              Country
            </label>
            <div className="z-[54]">
              <select
                onChange={(e) => {
                  setDataCreateCity((state: IDataCreateCity) => {
                    state.countryId = Number(e.target.value)
                    return state
                  })
                  setUploadFile((state: boolean) => !state)
                }}
                className="select select-bordered select-sm w-full z-[50]"
                value={dataCreateCity?.countryId || ''}
              >
                <option disabled selected value="">
                  Choose a country
                </option>
                {countryList?.map((item: any, index: number) => {
                  return (
                    <option className="w-full" key={index} value={item?.value}>
                      {item?.label}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          {dataCreateCity?.file[0]?.name ? (
            <figure className="w-full h-[200px] relative rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(dataCreateCity?.file[0])}
                width={400}
                height={400}
                alt=""
                className="object-cover w-full h-full"
              />
              <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                <FaRegTrashCan
                  onClick={() => {
                    setDataCreateCity((state: IDataCreateCity) => {
                      state.file = []
                      return state
                    })
                    setUploadFile((state: boolean) => !state)
                  }}
                />
              </div>
            </figure>
          ) : (
            <label className="border-2 border-gray-300 border-dashed flex flex-col items-center justify-center w-full h-[200px] overflow-hidden rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IoCloudUploadOutline size={24} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  JPG, PNG or JPEG (MAX. 1MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                name="createCityFile"
                onChange={(e: any) => {
                  if (e.target.files[0]) {
                    setDataCreateCity((state: IDataCreateCity) => {
                      state.file[0] = e.target.files[0]
                      return state
                    })
                    setUploadFile((state: boolean) => !state)
                  }
                }}
              />
            </label>
          )}
          <div className="flex items-center justify-between w-full gap-1.5">
            <button
              onClick={() => {
                setShowCreateCity(false)
                setDataCreateCity({
                  file: [],
                  name: '',
                  countryId: null,
                })
              }}
              type="button"
              className="text-sm flex items-center justify-center font-bold rounded-md p-2 w-full shadow-md text-gray-800 bg-white border border-slate-100 hover:opacity-75 active:scale-95 transition duration-100"
            >
              Cancel
            </button>
            <button
              disabled={
                !dataCreateCity?.name ||
                !dataCreateCity?.countryId ||
                !dataCreateCity?.file[0]?.name ||
                isPendingCreateCity
              }
              onClick={() => {
                mutateCreateCity()
              }}
              type="button"
              className="disabled:text-white  justify-center disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-sm font-bold flex items-center gap-1.5 rounded-md p-2 w-full shadow-md text-white bg-gray-800 hover:opacity-75 active:scale-95 transition duration-100"
            >
              Add City
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormCreateCity
