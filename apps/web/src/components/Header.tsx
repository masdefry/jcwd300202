'use client'
import { IoIosSearch } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaLessThanEqual } from "react-icons/fa6";

export default function Header() {
  const [ hamburgerMenuActive, setHamburgerMenuActive ] = useState('')
  const [ showHamburgerNav, setShowHamburgerNav ] = useState('scale-y-0')
  const [ loadingPromotion, setLoadingPromotion ] = useState(true)

  const pathname = usePathname()

  if(pathname.includes('/auth')) {
    return <></>
  }

  useEffect(() => {
    setTimeout(() => {
      setLoadingPromotion(false)
    }, 1000)
  }, [])

  const toggleHamburger = () => {
    if(hamburgerMenuActive) {
      setHamburgerMenuActive(state => {
        state = ''
        return state
      })
      setShowHamburgerNav(state => {
        state = 'scale-y-0'
        return state
      })
    } else {
      setHamburgerMenuActive(state => {
        state = 'hamburger-active'
        return state
      })
      setShowHamburgerNav(state => {
        state = 'scale-y-100'
        return state
      })
    }
  }

  const headerNavMenu = [
    {
      title:'Accomodation Type',
      navlist: [
        {
          title:`Hotel`,
          url:`#`
        },
        {
          title:`Apartment`,
          url:`#`
        },
        {
          title:`Villa`,
          url:`#`
        },
        {
          title:`Guesthouse`,
          url:`#`
        }
      ]
    }
  ]
  
  const searchNavInputs = [
          {
            cssClass: 'border-r',
            title: 'Where are you going? (required)',
            name: 'searchLocation',
            icon:  <IoIosSearch size={23}/>,
            placeholder:"Jakarta / Pan Pacific"
          },
          {
            cssClass: 'border-r',
            title: 'Check-In',
            name: 'checkInDate', 
            icon: <CiCalendar size={23}/>,
            placeholder:"01/01/2000"
          },
          {
            cssClass: 'border-r',
            title: 'Check-Out',
            name: 'checkOutDate', 
            icon: <CiCalendar size={23}/>,
            placeholder:"02/01/2000"
          },
          {
            cssClass: '',
            title: 'Guest Room',
            name: 'guestRoom', 
            icon: <GoPerson size={23}/>,
            placeholder:"1 Room - 8 Guest"
          },
  ]

  return (
  <header className="flex flex-col">
    <section className="bg-slate-200 py-10 lg:px-16 md:px-12 sm:px-8 px-4 flex flex-col gap-10 relative">
      <section className="lg:hidden border-b border-slate-400">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center pl-0">
            <div onClick={toggleHamburger} className={`flex p-5 pl-0 flex-col gap-4 ${hamburgerMenuActive}`}>
              <div className='h-[2px] bg-black w-[50px] origin-top-left transition duration-300 ease-in-out'></div>
              <div className='h-[2px] bg-black w-[50px] transition duration-300 ease-in-out'></div>
              <div className='h-[2px] bg-black w-[50px] origin-top-left transition duration-300 ease-in-out'></div>
            </div>
            <figure className="bg-blue-600 rounded-xl h-10 w-10">

            </figure>
          </div>
          <figure>
            <Link href='/auth'>
              <IoPersonCircleOutline size={50} className="text-gray-600"/>
            </Link>
          </figure>
        </div>
        <nav className={`origin-top ${showHamburgerNav} transition duration-300 ease-in absolute left-0 py-5 lg:px-16 md:px-12 sm:px-8 px-4 top-[119px] bg-white border-y border-slate-400 w-full h-fit z-50`}>
        {
          headerNavMenu.map((item, index) => {
            return(
            <div key={index} className="collapse collapse-arrow">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title text-xl shadow-sm font-medium">{item.title}</div>
              <div className="collapse-content">
                <ul className="flex flex-col">
                  {
                    item.navlist.map((itm, idx) => {
                      return (
                        <Link key={idx} href={itm.url}>
                          <li className='transition duration-150 py-2 w-full origin-left hover:scale-110 active:text-blue-600 active:scale-100 hover:cursor-pointer font-light text-base'>{itm.title}</li>
                        </Link>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            )
          })
        }
        </nav>
      </section>
      <section className="hidden lg:flex justify-between">
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
        <hgroup className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
          <h1>Where else do you want to go?</h1>
        </hgroup>
      </section>
      <section className="hidden 2xl:flex items-center rounded-full bg-white p-5 relative">
        {
          searchNavInputs.map((item, index) => {
            return(
              <div key={index} className={`box-border ${item.cssClass} border-gray-300 flex flex-col px-5 gap-3`}>
                <label htmlFor={item.name} className="min-w-max flex items-center gap-3 text-base font-semibold">{item.icon}{item.title}</label>
                <input id={item.name} className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" name={item.name} type="text" placeholder={item.placeholder} />
              </div>
            )
          })
        }
        <div className="absolute right-7">
          <button className="py-5 px-12 hover:opacity-75 active:scale-90 transition duration-200 rounded-full bg-blue-600 font-semibold text-base text-white">Search</button>
        </div>
      </section>
      <section className='2xl:hidden flex flex-col gap-3'>
        <div className="flex flex-col w-full items-start gap-1.5">
          <Label htmlFor="searchLocation" className="text-base font-semibold text-gray-600"><IoIosSearch size={23} className="inline mr-4 mb-1"/>Where are you going? <span className="text-red-600">*</span></Label>
          <Input type="text" id="searchLocation" name='searchLocation' placeholder="Jakarta / Pan Pacific" className='placeholder-shown:text-base rounded-full h-[3em] px-8 border border-slate-400 bg-white'/>
        </div>
        <div className='flex flex-col md:flex-row md:gap-5 gap-3'>
          <div className="flex flex-col w-full items-start gap-1.5">
            <Label htmlFor="checkInDate" className="text-base font-semibold text-gray-600"><CiCalendar size={23} className="inline mr-4 mb-1"/>Check-In</Label>
            <Input type="text" id="checkInDate" name='checkInDate' placeholder="01/01/2000" className='placeholder-shown:text-base rounded-full h-[3em] px-8 border border-slate-400 bg-white'/>
          </div>
          <div className="flex flex-col w-full items-start gap-1.5">
            <Label htmlFor="checkOutDate" className="text-base font-semibold text-gray-600"><CiCalendar size={23} className="inline mr-4 mb-1"/>Check-Out</Label>
            <Input type="text" id="checkOutDate" name='checkOutDate' placeholder="02/01/2000" className='placeholder-shown:text-base rounded-full h-[3em] px-8 border border-slate-400 bg-white'/>
          </div>
        </div>
        <div className="flex flex-col w-full items-start gap-1.5">
          <Label htmlFor="guestRoom" className="text-base font-semibold text-gray-600"><GoPerson size={23} className="inline mr-4 mb-1"/>Guest Room</Label>
          <Input type="text" id="guestRoom" name='guestRoom' placeholder="1 Room - 8 Guest" className='placeholder-shown:text-base rounded-full h-[3em] px-8 border border-slate-400 bg-white'/>
        </div>
      </section>
    </section>
    {
      (loadingPromotion === true) ? (
        <section className='skeleton p-4 rounded-none sm:px-8 md:px-12 lg:px-16 justify-center flex flex-col gap-5 h-[250px] w-full overflow-hidden relative'></section>
      ):
      (
        <section className='p-4 sm:px-8 md:px-12 lg:px-16 justify-center flex flex-col gap-5 h-[250px] w-full overflow-hidden relative'>
            <figure className='absolute top-0 left-0 w-full h-full'>
              <Image
              src='https://cache.marriott.com/marriottassets/marriott/LASJW/lasjw-guestroom-0111-hor-clsc.jpg?interpolation=progressive-bilinear&'
              width={1500}
              height={1500}
              alt='promotion'
              className='object-cover w-full h-full'
              />
            </figure>
            <div className="bg-black bg-opacity-50 absolute top-0 left-0 z-10 w-full h-full"></div> 
            <hgroup className="flex flex-col gap-1 z-20 text-white">
              <p className="text-2xl lg:text-4xl font-bold">Discounts up to 10% at 100+ hotels</p>
              <h1 className="text-sm md:text-base lg:text-xl font-light">Min. 2 nights. Book before 15 Jan 25.</h1>
            </hgroup>
            <button className="text-white active:scale-90 z-20 rounded-full transition duration-200 px-9 py-5 border border-white hover:bg-white hover:text-black w-fit">Book now</button>
        </section>
      )
    }
  </header>
);
};