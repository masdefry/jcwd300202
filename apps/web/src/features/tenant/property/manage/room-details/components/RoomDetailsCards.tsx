'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsDoorOpen } from 'react-icons/bs'
import { CiCirclePlus } from 'react-icons/ci'
import { FaMoneyBillWave } from 'react-icons/fa6'
import { IoCameraOutline, IoClose } from 'react-icons/io5'
import { MdOutlinePeople } from 'react-icons/md'
import { IUseManageRoomDetailsHook } from '../types'

const RoomDetailsCards = ({
  params,
  setChange,
  mutateDeletePropertyRoomType,
  dataForDelete,
  dataPropertyRoomTypes,
  setDataForDelete,
  setShowDeleteConfirmation,
  showDeleteConfirmation,
  isPendingDeletePropertyRoomType,
}: Pick<
  IUseManageRoomDetailsHook,
  | 'setChange'
  | 'mutateDeletePropertyRoomType'
  | 'dataForDelete'
  | 'dataPropertyRoomTypes'
  | 'setDataForDelete'
  | 'setShowDeleteConfirmation'
  | 'showDeleteConfirmation'
  | 'isPendingDeletePropertyRoomType'
> & {
  params: { slug: string }
}) => {
  return (
    <section className="flex flex-wrap gap-3 p-5 justify-center">
      {dataPropertyRoomTypes?.propertyRoomType.map(
        (item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col h-[350px] w-[250px] rounded-2xl overflow-hidden shadow-md border border-slate-200"
            >
              <figure className="w-full h-[50%] bg-blue-200 relative">
                <Image
                  src={`http://localhost:5000/api/${item?.propertyRoomImage[0]?.directory}/${item?.propertyRoomImage[0]?.filename}.${item?.propertyRoomImage[0]?.fileExtension}`}
                  width={500}
                  height={500}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <p className="absolute w-full bottom-0 left-0 p-3 bg-black bg-opacity-20 backdrop-blur-sm text-white font-bold">
                  {item?.name}
                </p>
              </figure>
              <section className="p-2 flex flex-col justify-between h-[50%] w-full text-sm font-bold text-gray-600">
                <article className="flex flex-col">
                  <p className="flex items-center gap-1.5">
                    <MdOutlinePeople className="text-base text-violet-800" />
                    Capacity:{' '}
                    <span className="font-medium">{item?.capacity} guest</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <BsDoorOpen className="text-base text-amber-500" />
                    Total number this room:{' '}
                    <span className="font-medium">{item?.totalRooms}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FaMoneyBillWave className="text-base text-emerald-500" />
                    Base price:{' '}
                    <span className="font-medium">Rp{item?.price}</span>
                  </p>
                </article>
                <section className="flex gap-1.5">
                  <Link
                    href={`/tenant/property/manage/${params.slug}/room-details/edit/${item?.id}`}
                    className="bg-gray-900 rounded-full text-white text-sm font-bold px-4 py-1.5 hover:opacity-65 transition duration-100 active:scale-90 hover:cursor-pointer"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/tenant/property/manage/${params.slug}/room-details/edit/${item?.id}/photos`}
                    className="bg-gray-900 rounded-full text-white text-base font-bold px-4 py-1.5 hover:opacity-65 transition duration-100 active:scale-90 hover:cursor-pointer flex items-center justify-center"
                  >
                    <IoCameraOutline />
                  </Link>
                  <button
                    disabled={isPendingDeletePropertyRoomType}
                    onClick={() => {
                      setDataForDelete((state: any) => {
                        state.name = item?.name
                        state.id = item?.id
                        return state
                      })
                      setShowDeleteConfirmation(true)
                    }}
                    className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 bg-red-700 rounded-full text-white text-sm font-bold px-4 py-1.5 hover:opacity-65 transition duration-100 active:scale-90 hover:cursor-pointer"
                  >
                    Delete
                  </button>
                </section>
              </section>
            </div>
          )
        },
      )}
      {showDeleteConfirmation && (
        <div className="fixed bg-black bg-opacity-25 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center p-5">
          <div className="bg-white shadow-md p-5 rounded-md flex flex-col gap-7 w-[400px]">
            <div className="flex items-center justify-end">
              <IoClose
                className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                onClick={() => {
                  setDataForDelete({
                    password: '',
                    id: '',
                    name: '',
                  })
                  setShowDeleteConfirmation(false)
                }}
              />
            </div>
            <hgroup className="flex flex-col mt-[-10px]">
              <h1 className="text-lg font-bold text-slate-800">
                Delete Room Type
              </h1>
              <p className="text-sm font-light text-gray-500">
                Are you sure you want to delete{' '}
                <b className="text-gray-800 font-bold">{dataForDelete?.name}</b>{' '}
                type? This action is irreversible and will permanently remove
                the room details from your property.
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
                    setChange((state: boolean) => !state)
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
                  setDataForDelete({
                    password: '',
                    id: '',
                    name: '',
                  })
                  setShowDeleteConfirmation(false)
                }}
                className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  dataForDelete.password.length < 8 ||
                  isPendingDeletePropertyRoomType
                }
                onClick={() => mutateDeletePropertyRoomType(dataForDelete?.id)}
                className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
              >
                Delete Room
              </button>
            </div>
          </div>
        </div>
      )}
      <Link
        href={`/tenant/property/manage/${params.slug}/room-details/add-room`}
        className="flex flex-col gap-1 items-center justify-center text-lg font-bold text-gray-900 h-[350px] w-[250px] rounded-2xl overflow-hidden shadow-md border-2 border-slate-800 hover:bg-slate-800 hover:text-white transition duration-100 hover:cursor-pointer active:scale-95"
      >
        <CiCirclePlus className="text-2xl" />
        <p>Add a new room</p>
      </Link>
    </section>
  )
}

export default RoomDetailsCards
