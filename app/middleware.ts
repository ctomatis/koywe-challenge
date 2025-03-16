import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

const authRoutes = ['/auth/login','/auth/signup']

export default withAuth(
  async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const token = await getToken({ req })

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/quote/:path*'],
}
