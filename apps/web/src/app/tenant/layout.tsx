'use client'

import React, { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import authStore from '@/zustand/authStore'
import useHamburgerMenuHook from '@/hooks/useHamburgerMenuHook'
import NavbarContentTenant from '../../features/tenant/components/NavbarContentTenant'
import LogoutConfirmationPopup from '../../features/tenant/components/LogoutConfirmationPopup'

const ProfileTenantLayout = ({ children }: { children: ReactNode }) => {
  const {
    toggleHamburger,
    showHamburgerNav,
    hamburgerMenuActive,
    setHamburgerMenuActive,
  } = useHamburgerMenuHook()
  const pathname = usePathname()
  const profilePictureUrl = authStore((state) => state.profilePictureUrl)
  const role = authStore((state) => state.role)
  const token = authStore((state) => state.token)
  const setLogout = authStore((state) => state.setLogout)
  const [showConfirmationToLogout, setShowConfirmationToLogout] =
    useState(false)

  if (pathname.includes('/auth')) {
    return (
      <main className="w-full min-h-min py-5">
        <section className="m-auto max-w-screen-xl w-full h-full">
          {children}
        </section>
      </main>
    )
  }

  return (
    <main className="w-full min-h-min pb-5">
      <section className=" flex flex-col gap-5 w-full h-full">
        <NavbarContentTenant
          toggleHamburger={toggleHamburger}
          hamburgerMenuActive={hamburgerMenuActive}
          setShowConfirmationToLogout={setShowConfirmationToLogout}
          showHamburgerNav={showHamburgerNav}
        />
        <LogoutConfirmationPopup
          showConfirmationToLogout={showConfirmationToLogout}
          setShowConfirmationToLogout={setShowConfirmationToLogout}
        />
        <section className="w-screen max-w-screen-xl m-auto rounded-md overflow-hidden px-5 bg-white">
          {children}
        </section>
      </section>
    </main>
  )
}

export default ProfileTenantLayout
