'use client'

import React, { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import authStore from '@/zustand/authStore'
import useHamburgerMenuHook from '@/hooks/useHamburgerMenuHook'
import LogoutUserConfirmationPopup from '../../features/user/components/LogoutUserConfirmationPopup'
import NavbarUserContent from '../../features/user/components/NavbarUserContent'

const ProfileUserLayout = ({ children }: { children: ReactNode }) => {
  const {
    toggleHamburger,
    showHamburgerNav,
    hamburgerMenuActive,
    setHamburgerMenuActive,
  } = useHamburgerMenuHook()
  const pathname = usePathname()
  const [showConfirmationToLogout, setShowConfirmationToLogout] =
    useState(false)

  if (
    pathname.includes('/auth') ||
    pathname.includes('/tenant/property/create')
  ) {
    return (
      <main className="w-full min-h-screen py-5">
        <section className="m-auto max-w-screen-xl w-full h-full">
          {children}
        </section>
      </main>
    )
  }

  return (
    <main className="w-full min-h-screen pb-5">
      <section className=" flex flex-col gap-5 w-full h-full">
        <NavbarUserContent
          toggleHamburger={toggleHamburger}
          hamburgerMenuActive={hamburgerMenuActive}
          setShowConfirmationToLogout={setShowConfirmationToLogout}
          showHamburgerNav={showHamburgerNav}
        />
        <LogoutUserConfirmationPopup
          showConfirmationToLogout={showConfirmationToLogout}
          setShowConfirmationToLogout={setShowConfirmationToLogout}
        />
        <section className="w-screen max-w-screen-xl px-5 m-auto rounded-md overflow-hidden bg-white">
          {children}
        </section>
      </section>
    </main>
  )
}
export default ProfileUserLayout
