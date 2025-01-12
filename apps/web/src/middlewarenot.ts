import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value
  const pathname = req.nextUrl.pathname

  const key: string | undefined = process.env.JWT_PASSWORD
  if (pathname.includes('/auth')) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url)) // Redirect to login page
  }

  try {
    const verifiedToken = jwt.verify(token, key as string)
    console.log('verifiedToken', verifiedToken)
    console.log('key', key)
    const decoded = jwt.decode(token)
    console.log('decoded', decoded)
    if (verifiedToken) {
      return NextResponse.next()
    }
  } catch (err) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  //   return NextResponse.redirect(new URL('/auth', req.url));
  return NextResponse.next()
}

// Define which paths to protect (e.g., all paths except the login page)
// export const config = {
//   matcher: ['/protected/*', '/dashboard/*'], // Define the paths you want to protect
// };
