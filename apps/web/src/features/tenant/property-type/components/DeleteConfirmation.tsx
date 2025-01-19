'use client'

import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const DeleteConfirmation = ({dataForDelete, setDataForDelete, setShowDeletePropertyType, handleDeletePropertyType}: {setShowDeletePropertyType: any,  handleDeletePropertyType: ({id, password} : {id: number, password: string}) => void, dataForDelete: {id: number, password: string}, setDataForDelete: any,}) => {
  const [ change, setChange ] = useState(true)
  
  return (
    <div className="fixed bg-black bg-opacity-25 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center p-5">
      <div className="bg-white shadow-md p-5 rounded-md flex flex-col gap-7 w-[400px]">
        <div className="flex items-center justify-end">
          <IoClose
            className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
            onClick={() => {
              setDataForDelete({ password: '', id: 0})
              setShowDeletePropertyType(false)
            }}
          />
        </div>
        <hgroup className="flex flex-col mt-[-10px]">
          <h1 className="text-lg font-bold text-slate-800">
            Confirm Property Deletion
          </h1>
          <p className="text-sm font-light text-gray-500">
            Are you sure you want to delete{' '}
            <b className="text-gray-800 font-bold"></b>{' '}
            property? This action is permanent and cannot be undone. To proceed,
            please enter your password for confirmation.
          </p>
        </hgroup>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 ">
            <label className="text-sm font-bold text-black">
              Please confirm by password below:
            </label>
            <input
              id="password"
              onChange={(e: any) => {
                setDataForDelete((state: any) => {
                  state.password = e.target.value
                  return state
                })
                setChange((state) => !state)
              }}
              name="password"
              type="password"
              placeholder="secure123"
              className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:border-blue-800 border-b-2 border-slate-300 rounded-none py-1.5"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={() => {
              setDataForDelete({ password: '', id: 0})
              setShowDeletePropertyType(false)
            }}
            className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={
              dataForDelete.password.length < 8
            }
            onClick={() => {
              setShowDeletePropertyType(false)
              handleDeletePropertyType(dataForDelete)
            }}
            className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
          >
            Delete Type
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation
