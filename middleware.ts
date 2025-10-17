import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
const res = NextResponse.next()
const supabase = createMiddlewareClient({ req, res })

const { data: { user } } = await supabase.auth.getUser()
const pathname = req.nextUrl.pathname

// allow login page
if (pathname.startsWith('/admin/login')) return res

// protect /admin (root + nested)
if (pathname === '/admin' || pathname.startsWith('/admin/')) {
if (!user) {
const redirectUrl = new URL('/admin/login', req.url)
redirectUrl.searchParams.set('redirectTo', pathname)
return NextResponse.redirect(redirectUrl)
}


// whitelist emails
const allowed = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
const email = (user.email || '').toLowerCase()
if (allowed.length && !allowed.includes(email)) {
  const redirectUrl = new URL('/admin/login', req.url)
  redirectUrl.searchParams.set('err', 'forbidden')
  return NextResponse.redirect(redirectUrl)
}
}

return res
}

export const config = {
matcher: ['/admin', '/admin/:path*'], // IMPORTANT
}