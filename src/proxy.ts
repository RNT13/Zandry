import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const AUTH_ROUTES = ['/login', '/cadastro', '/esqueci-senha']
const TENANT_PRIVATE_SECTIONS = new Set([
  'dashboard',
  'chat',
  'agendamentos',
  'clientes',
  'configuracoes',
  'empresa',
  'profissionais',
  'servicos',
  'assinatura'
])

function isTopLevelAuth(pathname: string) {
  return AUTH_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
}

function getPathParts(pathname: string) {
  const parts = pathname.split('/').filter(Boolean)
  return {
    slug: parts[0] ?? null,
    section: parts[1] ?? null
  }
}

function buildTenantDashboard(slug: string) {
  return `/${slug}/dashboard`
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  const refreshToken = req.cookies.get('refresh_token')?.value
  const companySlug = req.cookies.get('company_slug')?.value ?? null

  const hasSession = Boolean(refreshToken)
  const { slug, section } = getPathParts(pathname)

  const isTenantPrivateRoute = Boolean(slug && section && TENANT_PRIVATE_SECTIONS.has(section))

  if (hasSession && isTopLevelAuth(pathname)) {
    return NextResponse.redirect(new URL(companySlug ? buildTenantDashboard(companySlug) : '/', req.url))
  }

  if (!hasSession && isTenantPrivateRoute) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('returnTo', `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  if (hasSession && companySlug && isTenantPrivateRoute && slug !== companySlug) {
    return NextResponse.redirect(new URL(buildTenantDashboard(companySlug), req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/login/:path*',
    '/cadastro',
    '/cadastro/:path*',
    '/esqueci-senha',
    '/esqueci-senha/:path*',

    '/:slug/dashboard',
    '/:slug/dashboard/:path*',
    '/:slug/chat',
    '/:slug/chat/:path*',
    '/:slug/agendamentos',
    '/:slug/agendamentos/:path*',
    '/:slug/clientes',
    '/:slug/clientes/:path*',
    '/:slug/configuracoes',
    '/:slug/configuracoes/:path*',
    '/:slug/empresa',
    '/:slug/empresa/:path*',
    '/:slug/profissionais',
    '/:slug/profissionais/:path*',
    '/:slug/servicos',
    '/:slug/servicos/:path*',
    '/:slug/assinatura',
    '/:slug/assinatura/:path*'
  ]
}
