'use client'

import Image from 'next/image'
import React from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'
import { IDataCreateCountry } from '../types'

const FormCreateCountry = ({
  mutateCreateCountry,
  setUploadFile,
  dataCreateCountry,
  showCreateCountry,
  setDataCreateCountry,
  setShowCreateCountry,
}: {
  mutateCreateCountry: any
  setUploadFile: any
  dataCreateCountry: IDataCreateCountry | undefined
  showCreateCountry: boolean | undefined
  setDataCreateCountry: any
  setShowCreateCountry: any
}) => {
  return (
    <section
      className={`z-[52] p-5 fixed w-full h-full top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${showCreateCountry ? 'flex' : 'hidden'} flex-col gap-1 items-center justify-center`}
    >
      <div className=" flex flex-col gap-1 items-center justify-center w-full">
        <div className="w-[400px] flex justify-end">
          <div
            onClick={() => {
              setDataCreateCountry({
                file: [],
                name: '',
                description: '',
              })
              setShowCreateCountry(false)
            }}
            className="bg-white rounded-full flex items-center text-lg text-gray-800 justify-center h-7 w-7 hover:bg-slate-100 hover:cursor-pointer transition duration-100 active:scale-90"
          >
            <IoClose />
          </div>
        </div>
        <div className="bg-white  flex flex-col gap-3 shadow-md p-5 w-[400px] rounded-md h-fit">
          <div className="grid items-center gap-1.5 w-full relative">
            <label
              htmlFor="createCountryName"
              className="text-sm font-bold text-gray-900"
            >
              Country Name
            </label>
            <input
              name="createCountryName"
              onChange={(e) => {
                setDataCreateCountry((state: IDataCreateCountry) => {
                  state.name = e.target.value
                  return state
                })
                setUploadFile((state: boolean) => !state)
              }}
              type="text"
              id="createCountryName"
              placeholder="Indonesia"
              className="w-full py-1.5 border-b-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-none focus:outline-none focus:border-blue-600"
            />
          </div>
          <div className="grid items-center gap-1.5 w-full relative">
            <label
              htmlFor="createCountryDescription"
              className="text-sm font-bold text-gray-900"
            >
              Description
            </label>
            <textarea
              name="createCountryDescription"
              onChange={(e) => {
                setDataCreateCountry((state: IDataCreateCountry) => {
                  state.description = e.target.value
                  return state
                })
                setUploadFile((state: boolean) => !state)
              }}
              placeholder="Provide a brief description of the country where your property is located. Include details like the region, culture, or notable landmarks"
              className="w-full px-2 h-[100px] py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-md focus:outline-none focus:border-blue-600"
            ></textarea>
          </div>
          {dataCreateCountry?.file[0]?.name ? (
            <figure className="w-full h-[200px] relative rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(dataCreateCountry?.file[0])}
                width={400}
                height={400}
                alt=""
                className="object-cover w-full h-full"
              />
              <div className="hover:cursor-pointer text-lg absolute right-4 bottom-4 bg-white shadow-md text-red-600 hover:text-opacity-75 active:scale-90 transition duration-100 h-10 w-10 flex items-center justify-center rounded-2xl">
                <FaRegTrashCan
                  onClick={() => {
                    setDataCreateCountry((state: IDataCreateCountry) => {
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
                name="createCountryFile"
                onChange={(e: any) => {
                  if (e.target.files[0]) {
                    setDataCreateCountry((state: IDataCreateCountry) => {
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
                setShowCreateCountry(false)
                setDataCreateCountry({
                  file: [],
                  name: '',
                  description: '',
                })
              }}
              type="button"
              className="text-sm font-bold rounded-md p-2 w-full shadow-md text-gray-800 bg-white border border-slate-100 hover:opacity-75 active:scale-95 transition duration-100"
            >
              Cancel
            </button>
            <button
              disabled={
                !dataCreateCountry?.name || !dataCreateCountry?.file[0]?.name
              }
              onClick={() => mutateCreateCountry()}
              type="button"
              className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-sm font-bold rounded-md p-2 w-full shadow-md text-white bg-gray-800 hover:opacity-75 active:scale-95 transition duration-100"
            >
              Add Country
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormCreateCountry
