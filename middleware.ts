import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedPaths = ['/repository', '/upload', '/admin']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!protectedPaths.some(p => pathname.startsWith(p))) return NextResponse.next()
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/welcome'
    return NextResponse.redirect(url)
  }
  // admin only routes
  if (pathname.startsWith('/upload') || pathname.startsWith('/admin')) {
    if ((token as any).role !== 'admin') {
      const url = req.nextUrl.clone()
      url.pathname = '/welcome'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/repository/:path*', '/upload/:path*', '/admin/:path*'] }
