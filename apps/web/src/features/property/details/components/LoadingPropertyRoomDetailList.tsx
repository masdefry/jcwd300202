import React from 'react'

const LoadingPropertyRoomDetailList = () => {
  return (
    <section className='flex flex-col gap-5 2xl:p-0 px-5'>
    { 
        Array.from({length: 2}).map((item: any, index: number) => {
            return (
            <section key={index} className='w-full grid grid-cols-3 gap-5 2xl:gap-10 items-center rounded-md bg-white shadow-md p-3'>
                <div className='w-full rounded-md flex flex-col gap-2 2xl:col-span-1 col-span-3'>
                    <h1 className='text-base sm:text-lg text-transparent skeleton bg-slate-300 rounded-none font-bold w-fit'>Penthouse Oceanview</h1>
                    <figure className='bg-gray-200 skeleton rounded-lg 2xl:rounded-3xl w-full h-[150px] overflow-hidden 2xl:shadow-none shadow-md'>

                    </figure>
                    <div className='ml-5 text-left skeleton text-transparent w-fit bg-slate-300 rounded-none text-xs md:text-sm font-bold  '>Room details</div>
                </div>
                <div className='2xl:col-span-2 col-span-3'>
                    <div className="overflow-x-auto 2xl:border-none border-2 border-slate-200 rounded-md">
                    <table className="table min-w-max">
                            <thead>
                            <tr className='text-base font-bold text-transparent'>
                                <th className='text-transparent bg-slate-300 rounded-none w-fit'>Room Choice</th>
                                <th className='text-transparent bg-slate-300 rounded-none w-fit'>Guest</th>
                                <th className='text-transparent bg-slate-300 rounded-none w-fit'>Price/Room</th>
                                <th className='text-transparent bg-slate-300 rounded-none text-center w-[200px] '></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className='flex flex-col gap-2 w-[300px]'>
                                    <p className='sm:flex hidden text-sm font-light skeleton text-transparent bg-slate-300 rounded-none w-fit'>Deluxe Room</p>
                                    <p className='lg:text-base text-sm font-semibold skeleton text-transparent bg-slate-300 rounded-none w-fit'>With breakfast for 2 people</p>
                                    <section className='grid grid-cols-2 gap-1 justify-between' >
                                        {
                                            Array.from({length: 4}).map((itm: any, idx: number) => {
                                                return(
                                                    <div key={idx} className='flex sm:text-sm font-medium text-transparent text-xs tracking-wide items-center gap-2'>
                                                        <figure className='h-4 w-4 rounded-full bg-slate-300 skeleton'>
                                                        </figure>
                                                        <p className='skeleton  bg-slate-300 rounded-none w-fit'>My Room</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </section>
                                </td>
                                <td>
                                    <div className='mx-auto flex flex-wrap gap-2 items-center w-[100px] justify-center'>
                                        {
                                            Array.from({length:2}).map((item, index) => {
                                                return(
                                                  <figure key={index} className='h-5 w-5 rounded-full bg-slate-300 skeleton'>
                                                        </figure>
                                                )
                                            })
                                        }
                                    </div>
                                </td>
                                <td className='text-right'>
                                    <p className='text-lg mb-1 font-bold text-transparent skeleton rounded-none w-fit bg-slate-300'>Rp5000000</p>
                                    <p className='text-xs font-semibold text-transparent skeleton rounded-none w-fit bg-slate-300'>Include taxes and price</p>
                                </td>
                                <td className='w-[200px]'>
                                  <div className=' my-auto italic text-sm font-bold min-w-max px-8 py-3 rounded-full bg-gray-200 text-transparent skeleton ' >Book Now</div>
                                   
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            )
        })
    }
    <div id='pagination-button' className='w-full flex justify-center'>
        <div className="join">
            {
                Array.from({ length: 3 }).map((_, index) => {
                    return(
                        <button key={index} disabled={true} className="disabled:text-transparent disabled:border-none join-item btn btn-sm bg-gray-200 text-transparent">{index + 1}</button>
                    )
                })
            }
        </div>
    </div>
  </section>
  )
}

export default LoadingPropertyRoomDetailList
