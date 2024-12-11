'use client'

import React, { useState }from 'react'
                                               

const OrderPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="w-full min-h-min">
      <section className="m-auto max-w-screen-2xl w-full h-full flex items-start gap-5 px-5 py-5">
        <div className="flex flex-col gap-3">
          <div className="collapse bg-white border w-[60rem] min-h-min rounded">
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title">
              <div className="w-full min-h-min flex items-start gap-3">
                <div className="bg-[#e2e8f0] w-[20rem] h-[14rem] rounded-md">
                  {/* INSERT IMAGE */}
                </div>
                <div className="min-h-min flex flex-col gap-3">
                  <p className="text-[25px] font-bold">Premiere Room</p>
                  <p>2 King sized bed</p>
                  <button className="text-sm underline w-[5rem] flex justify-start">See details</button>
                </div>
              </div>

    <main className="w-full h-screen">
      <section className="m-auto max-w-screen-2xl w-full h-full px-5 py-5">
        <div className="bg-white border w-[60rem] min-h-min rounded">
          <div className="w-full min-h-min flex items-start gap-3 p-5">
            <div className="bg-[#e2e8f0] w-[20rem] h-[14rem] rounded-md">
              {/* INSERT IMAGE */}

            </div>
            <div className="min-h-min flex flex-col gap-3">
              <p className="text-[25px] font-bold">Premiere Room</p>
              <p>2 King sized bed</p>
              <button className="text-sm underline w-[5rem] flex justify-start">See details</button>
            </div>
          </div>
          <div className="w-full min-h-min flex flex-col items-end justify-end gap-3 p-5">
            <p className='text-sm'>Rp<span className="text-[25px] font-bold">3200000</span></p>
            <button className="rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200">Book this room</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default OrderPage
