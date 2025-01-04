import React from 'react'

const LoadingMain = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-8 border-t-8 border-transparent border-t-gray-900 rounded-full animate-spin"></div>
        <h2 className="text-gray-800 text-lg font-bold">Loading</h2>
        <p className="text-gray-600 text-sm font-medium opacity-75 mt-[-30px]">Please wait while we load your content</p>
      </div>
    </div>
  )
}

export default LoadingMain
