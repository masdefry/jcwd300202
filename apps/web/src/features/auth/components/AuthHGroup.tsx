import React from 'react'

interface IAuthHGroup {
    header1: string,
    header6: string,
}

const AuthHGroup = ({ header1, header6 }: IAuthHGroup) => {
  return (
    <hgroup className='flex flex-col gap-2 text-center'>
        <h1 className='text-2xl font-bold text-gray-800'>{header1}</h1>
        <h6 className='text-sm font-semibold text-gray-600'>{header6}</h6>
    </hgroup>
  )
}

export default AuthHGroup
