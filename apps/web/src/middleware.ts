import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value
  const role = req.cookies.get('authRole')?.value
  const pathname = req.nextUrl.pathname

  const key: string | undefined = process.env.JWT_PASSWORD
  if (pathname.includes('/auth')) {
    return NextResponse.next()
  }

  if (!token) {
    if(pathname.startsWith('/tenant') && !pathname.includes('/auth')) return NextResponse.redirect(new URL('/tenant/auth', req.url)) 
      if(pathname.startsWith('/user')) return NextResponse.redirect(new URL('/auth', req.url)) 
        if(pathname.startsWith('/booking')) return NextResponse.redirect(new URL('/auth', req.url)) 
        }
      
      if(role === 'USER') {
    if(pathname.startsWith('/tenant')) return NextResponse.redirect(new URL('/403', req.url)) 
    }
  
  if(role === 'TENANT') {
    if(pathname.startsWith('/user')) return NextResponse.redirect(new URL('/403', req.url)) 
    }
  
  if(token) {
    if(pathname.includes('/auth')) return NextResponse.redirect(new URL('/', req.url)) 
  }

  // try {
  //   const verifiedToken = jwt.verify(token as string, key as string)
  //   console.log('verifiedToken', verifiedToken)
  //   console.log('key', key)
  //   const decoded = jwt.decode(token as string)
  //   console.log('decoded', decoded)
  //   if (verifiedToken) {
  //     return NextResponse.next()
  //   }
  // } catch (err) {
  //   return NextResponse.redirect(new URL('/auth', req.url))
  // }

  //   return NextResponse.redirect(new URL('/auth', req.url));
  return NextResponse.next()
}

// export const config = {
//   matcher: ['/tenant/:path*', '/user/:path*', '/booking/:path*'] // Define the paths you want to protect
// };
