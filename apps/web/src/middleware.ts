import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import instance from './utils/axiosInstance'
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value
  const role = req.cookies.get('authRole')?.value
  const pathname = req.nextUrl.pathname

  if(pathname.includes('/tenant/property/manage')) {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/property/${pathname.split('/')[4]}`, {
        method: 'GET',
        headers: {
          'authorization': `bearer ${token}`
        }
      })
      const data = await res.json()
      if(data.error) {
        if(data.message === 'Tenant unauthorized!') {
          return NextResponse.redirect(new URL('/403', req.url))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const key: string | undefined = process.env.JWT_PASSWORD
  if (pathname.includes('/reset-password')) {
    return NextResponse.next()
  }

  if (pathname.includes('/auth/verify')) {
    return NextResponse.next()
  }

  if (token) {
    if (role === 'USER') {
      if (pathname.startsWith('/tenant')){
        return NextResponse.redirect(new URL('/403', req.url))}
    } else if (role === 'TENANT') {
      if (pathname.startsWith('/user')){
        return NextResponse.redirect(new URL('/403', req.url))}
    }
    
    if (pathname.includes('/auth')){
      return NextResponse.redirect(new URL('/', req.url))}
  } else {
    if (pathname.startsWith('/tenant') && !pathname.includes('/auth')){
      return NextResponse.redirect(new URL('/tenant/auth', req.url))}
    if (pathname.startsWith('/user')){
      return NextResponse.redirect(new URL('/auth', req.url))}
    if (pathname.startsWith('/booking')){
      return NextResponse.redirect(new URL('/auth', req.url))}
  }

  return NextResponse.next()
}
