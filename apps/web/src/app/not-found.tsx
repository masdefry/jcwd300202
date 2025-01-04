import React from 'react'
import Link from 'next/link'

const NotFoundMain = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-900 p-5">
        <div className="text-center">
          <div className="flex justify-center items-center mb-8">
            <div className="text-6xl font-bold">404</div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Oops! Page not found</h1>
          <p className="text-sm font-medium text-gray-600 mb-8 opacity-75">
            We couldn't find the page you're looking for. It may have been moved or deleted.
          </p>
          <Link href='/' className='flex items-center justify-center w-full'>
            <div className="w-fit px-6 py-2 bg-slate-900 text-white rounded-full hover:cursor-pointer hover:opacity-75 transition duration-100 active:scale-90 text-sm font-bold">
              Go Back Home
            </div>
          </Link>
        </div>
      </div>
  )
}

export default NotFoundMain
