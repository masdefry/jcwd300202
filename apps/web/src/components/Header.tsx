'use client'
import { IoIosSearch } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Header() {


  return (
  <header className="bg-slate-200 p-10 flex flex-col gap-10">
    <section className="flex justify-between">
      <figure className="bg-blue-600 rounded-xl h-10 w-10">

      </figure>
      <nav className="text-base font-medium">
        <ul className="flex gap-8 items-center">
          <li><IoNotificationsOutline size={23}/></li>
          <li className="border-b-2 border-transparent hover:border-black hover:cursor-pointer active:scale-90 transition duration-200">Add your property</li>
          <li className="rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200">Sign in or create account</li>
        </ul>
      </nav>
    </section>
    <section>
      <hgroup className="text-5xl font-bold">
        <h1>Where else do you want to go?</h1>
      </hgroup>
    </section>
    <section className="flex items-center rounded-full bg-white p-5 relative">
      <div className="box-border border-r border-gray-300 flex flex-col px-5 gap-3">
        <label htmlFor="searchLocation" className="min-w-max flex items-center gap-3 text-base font-semibold"><IoIosSearch size={23}/>Where are you going? <span className="text-red-600">(required)</span></label>
        <input id='searchLocation' className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" name='searchLocation' type="text" placeholder="Destination, Accomodation" />
      </div>
      <div className="box-border border-r border-gray-300 flex flex-col px-5 gap-3">
        <label htmlFor="checkInDate" className="flex items-center gap-3 text-base font-semibold"><CiCalendar size={23}/>Check-In</label>
        <input id='checkInDate' className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" name='checkInDate' type="text" placeholder="01/01/2000" />
      </div>
      <div className="box-border border-r border-gray-300 flex flex-col px-5 gap-3">
        <label htmlFor="checkOutDate" className="flex items-center gap-3 text-base font-semibold"><CiCalendar size={23}/>Check-Out</label>
        <input id='checkOutDate' className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" name='checkOutDate' type="text" placeholder="02/01/2000" />
      </div>
      <div className="box-border flex flex-col px-5 gap-3">
        <label htmlFor="guestRoom" className="flex items-center gap-3 text-base font-semibold"><GoPerson size={23}/>Guest Room</label>
        <input id='guestRoom' className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" name='guestRoom' type="text" placeholder="1 Room - 8 Guest" />
      </div>
      <div className="absolute right-7">
        <button className="py-5 px-12 hover:opacity-75 active:scale-90 transition duration-200 rounded-full bg-blue-600 font-semibold text-base text-white">Search</button>
      </div>
    </section>
  </header>
);
};