import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ReservationProvider } from '@/components/ReservationProvider'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const source = Source_Sans_3({ subsets: ['latin'], variable: '--font-source', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Rústica Perú', template: '%s | Rústica Perú' },
  description: 'Carta, promociones, shows en vivo y locales de Rústica Perú.',
}

/** Aplica las preferencias guardadas antes de pintar la página (evita el parpadeo). */
const prefsScript = `try{var p=JSON.parse(localStorage.getItem('rustica-prefs')||'{}'),d=document.documentElement;['contrast','text','motion'].forEach(function(k){if(p[k]&&p[k]!=='normal')d.dataset[k]=p[k]})}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body className={`${playfair.variable} ${source.variable}`}>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <ReservationProvider>
          <Header />
          <main id="contenido" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ReservationProvider>
      </body>
    </html>
  )
}
