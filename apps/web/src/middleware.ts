import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value
  const role = req.cookies.get('authRole')?.value
  const pathname = req.nextUrl.pathname

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
