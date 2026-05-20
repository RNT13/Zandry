import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Rotas que usuário logado não deve ver
const AUTH_ROUTES = ['/login', '/cadastro']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // O refresh_token é httponly e setado pelo Django — indica sessão ativa
  const hasSession = Boolean(req.cookies.get('refresh_token')?.value)

  // Usuário com sessão ativa não volta pra login/cadastro
  if (hasSession && AUTH_ROUTES.some(r => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/login/:path*', '/cadastro', '/cadastro/:path*']
}
