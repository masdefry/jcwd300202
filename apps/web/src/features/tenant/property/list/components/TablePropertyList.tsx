'use client'

import Link from 'next/link'
import React from 'react'

const TablePropertyList = ({ dataProperties, handleMutateRefreshPage, isPending }: any) => {
    if(isPending) {
        return (
          <section>
              <div className="flex flex-col gap-4">
                <table className="table table-xs min-w-[1080px]">
                  <thead className="text-gray-800">
                    <tr>
                      <th></th>
                      <th ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton '>Name</p> </th>
                      <th ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton '>Location</p> </th>
                      <th ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton '>Status (Today)</p> </th>
                      <th ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton '>Booked</p> </th>
                      <th ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton '>Ratings (Accumulation)</p> </th>
                      <th ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton '>Cancellation</p> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({length: 10}).map((_, index: number) => {
                      return (
                        <tr>
                          <th ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton'>10</p> </th>
                          <td ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton'>Pan Pacific Jakarta</p></td>
                          <td ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates </p></td>
                          <td ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton'>Close</p> </td>
                          <td ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton'>10000</p> </td>
                          <td ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton'>10</p> </td>
                          <td ><p className='text-transparent bg-gray-200 rounded-none w-fit skeleton'>10000</p> </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="flex items-center justify-center w-full">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 3 }).map(
                      (_, index) => {
                        return (
                          <button
                            className={`rounded-full flex items-center justify-center h-8 w-8 btn btn-sm scale:90 text-xs skeleton bg-slate-200 text-transparent cursor-default`}
                          >
                          </button>
                        )
                      },
                    )}
                  </div>
                </div>
              </div>
            </section>
        )
    }

  return (
    <section>
        <div className="flex flex-col gap-4">
          <table className="table table-xs min-w-[1080px]">
            <thead className="text-gray-800">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Location</th>
                <th>Status (Today)</th>
                <th>Booked</th>
                <th>Ratings (Accumulation)</th>
                <th>Cancellation</th>
              </tr>
            </thead>
            <tbody>
              {dataProperties?.properties?.map((item: any, index: number) => {
                return (
                  <tr>
                    <th>{Number(dataProperties?.offset) + index + 1}</th>
                    <td className="hover:text-blue-800 transition duration-100 underline active:text-blue-500">
                      <Link href={`/tenant/property/manage/${item?.slug}`}>
                        {item?.name}
                      </Link>
                    </td>
                    <td>{item?.address}</td>
                    <td className={`${item?.availability ? 'text-green-700' : 'text-red-600'}`}>{item?.availability ? 'Open' : 'Close'}</td>
                    <td>{item?.totalBooked}</td>
                    <td>{item?.avgRating.toFixed(1)}</td>
                    <td>{item?.totalCancelled}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: dataProperties?.totalPage }).map(
                (_, index) => {
                  return (
                    <button
                      disabled={dataProperties?.pageInUse === index + 1}
                      onClick={() =>
                        handleMutateRefreshPage({ limit: 10, offset: 10 * index })
                      }
                      className={`rounded-full flex items-center justify-center h-8 w-8 btn btn-sm scale:90 text-xs disabled:bg-gray-400 disabled:cursor-default ${dataProperties?.pageInUse === index + 1 && 'btn-active'}`}
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
  )
}

export default TablePropertyList