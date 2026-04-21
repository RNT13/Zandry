import { Providers } from '@/components/providers'
import StyledComponentsRegistry from '@/lib/styled-components-registry'
import { GlobalStyles } from '@/styles/globalStyles'
import type { Metadata } from 'next'
import { Jersey_10, Pixelify_Sans, Roboto } from 'next/font/google'

// Fonts
const jersey_10 = Jersey_10({
  weight: '400',
  subsets: ['latin'],
  variable: '--secondary-font',
})

// Fonts
const pixelify_sans = Pixelify_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--primary-font',
})

// Fonts
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--roboto-font',
})

// Metadata
export const metadata: Metadata = {
  title: 'Zandry',
  description: 'Seu app de agendamento',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${jersey_10.variable} ${pixelify_sans.variable} ${roboto.variable}`} data-scroll-behavior="smooth">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />

          <Providers >
            <div className='container'>
              {children}
            </div>
          </Providers>

        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

