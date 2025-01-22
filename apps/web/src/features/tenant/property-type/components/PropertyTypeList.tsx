'use client'

import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import CreatePropertyType from './CreatePropertyType'
import { ISearchParamsTenantPropertyType } from '../types'
import DeleteConfirmation from './DeleteConfirmation'

type PropertyType = {
  id: number
  name: string
  description: string
}

const PropertyTypeList = ({
  isPending,
  offset,
  handleDeletePropertyType,
  handleCreatePropertyType,
  dataPropertyTypes,
  handleUpdatePropertyType,
}: {
  handleCreatePropertyType: any
  dataPropertyTypes: any
  handleUpdatePropertyType: any
  offset: number
  handleDeletePropertyType: ({
    id,
    password,
  }: {
    id: number
    password: string
  }) => void
  isPending: boolean
}) => {
  const [dataEditPropertyType, setDataEditPropertyType] = useState({
    id: 0,
    name: '',
    description: '',
  })
  const [showEditPropertyType, setShowEditPropertyType] = useState(false)
  const [showDeletePropertyType, setShowDeletePropertyType] = useState(false)
  const [dataForDelete, setDataForDelete] = useState({ password: '', id: 0 })
  if (isPending) {
    return (
      <div className="w-full">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-slate-400 text-white">
              <th className="px-4 py-2 border-b text-left text-sm font-bold"></th>
              <th className="px-4 py-2 border-b text-left text-sm font-bold">
                <p className="skeleton bg-slate-200 rounded-none text-transparent w-fit">
                  Name
                </p>
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-bold">
                <p className="skeleton bg-slate-200 rounded-none text-transparent w-fit">
                  Description
                </p>
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-bold">
                <p className="skeleton bg-slate-200 rounded-none text-transparent w-fit">
                  Actions
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index: number) => (
              <tr key={index} className="hover:bg-gray-50 text-sm">
                <th className="px-4 py-2  border-b">
                  <p className="skeleton bg-slate-300 text-transparent rounded-none  w-fit h-fit">
                    12
                  </p>
                </th>
                <td className="px-4 py-2  border-b">
                  <p className="skeleton bg-slate-300 text-transparent rounded-none  w-fit h-fit">
                    Pacific
                  </p>
                </td>
                <td className="px-4 py-2  border-b">
                  <p className="skeleton bg-slate-300 text-transparent rounded-none  w-fit h-fit">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                  </p>
                </td>
                <td className="px-4 py-2 border-b gap-2 flex items-center">
                  <button
                    disabled={true}
                    className="bg-gray-200 skeleton text-transparent px-4 flex items-center gap-1.5 text-xs font-bold py-1.5 rounded-full"
                  >
                    oo Edit
                  </button>
                  <button
                    disabled={true}
                    className="bg-gray-200 skeleton text-transparent px-4 text-xs flex items-center gap-1.5 font-bold py-1.5 rounded-full"
                  >
                    oo Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEditPropertyType && (
          <CreatePropertyType
            isEdit={true}
            dataPropertyType={dataEditPropertyType}
            setShowCreatePropertyType={setShowEditPropertyType}
            handleUpdatePropertyType={handleUpdatePropertyType}
          />
        )}
        {showDeletePropertyType && (
          <DeleteConfirmation
            dataForDelete={dataForDelete}
            setDataForDelete={setDataForDelete}
            handleDeletePropertyType={handleDeletePropertyType}
            setShowDeletePropertyType={setShowDeletePropertyType}
          />
        )}
      </div>
    )
  }
  return (
    <div className="w-[1080p]">
      <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="px-4 py-2 border-b text-left text-sm font-bold"></th>
            <th className="px-4 py-2 border-b text-left text-sm font-bold">
              Name
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-bold">
              Description
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {dataPropertyTypes?.length > 0 ? (
            dataPropertyTypes?.map((item: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50 text-sm">
                <th className="px-4 py-2 border-b">
                  {offset ? offset + index + 1 : index + 1}
                </th>
                <td className="px-4 py-2 border-b">{item?.name}</td>
                <td className="px-4 py-2 border-b">{item?.description}</td>
                <td className="px-4 py-2 border-b gap-2 flex items-center">
                  <button
                    className="bg-blue-800 text-white px-4 flex items-center gap-1.5 text-xs font-bold hover:opacity-75 active:scale-90 transition duration-100 py-1.5 rounded-full"
                    onClick={() => {
                      setShowEditPropertyType(true)
                      setDataEditPropertyType({
                        id: item?.id,
                        name: item?.name,
                        description: item?.description,
                      })
                    }}
                  >
                    <CiEdit size={22} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDataForDelete({ id: item?.id, password: '' })
                      setShowDeletePropertyType(true)
                    }}
                    className="bg-red-700 text-white px-4 text-xs flex items-center gap-1.5 font-bold hover:opacity-75 active:scale-90 transition duration-100 py-1.5 rounded-full"
                  >
                    <MdDeleteOutline size={22} />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="hover:bg-gray-50 text-sm">
              <td
                className="px-4 py-4 border-b text-center text-slate-300 font-bold"
                colSpan={5}
              >
                No property types found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showEditPropertyType && (
        <CreatePropertyType
          isEdit={true}
          dataPropertyType={dataEditPropertyType}
          setShowCreatePropertyType={setShowEditPropertyType}
          handleUpdatePropertyType={handleUpdatePropertyType}
        />
      )}
      {showDeletePropertyType && (
        <DeleteConfirmation
          dataForDelete={dataForDelete}
          setDataForDelete={setDataForDelete}
          handleDeletePropertyType={handleDeletePropertyType}
          setShowDeletePropertyType={setShowDeletePropertyType}
        />
      )}
    </div>
  )
}

export default PropertyTypeList
