import React from 'react'

const Footer = () => {
  return (
    <footer>
        <section className='text-sm font-light text-center'>
                <p className='md:flex justify-center md:gap-1 text-center'>By signing in or creating an account, you agree with our 
                    <span className='mx-1 md:mx-0 transition duration-200 font-semibold text-blue-600 hover:opacity-75 hover:cursor-pointer active:scale-90'>Terms and Conditions</span>
                    and 
                    <span className='mx-1 md:mx-0 transition duration-200 font-semibold text-blue-600 hover:opacity-75 hover:cursor-pointer active:scale-90'>Privacy Statement</span></p>
                <p className='mt-3'>All rights reserved</p>
                <p>Copyright 2024 - Roomify</p>
        </section>
    </footer>
  )
}

export default Footer
