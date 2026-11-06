import Link from 'next/link'
import Image from 'next/image'
import footerLogo from '@/assets/footer-logo.png'
import { NewTab } from './ui'

const linkClass = 'inline-flex min-h-11 items-center text-sm hover:text-gold-light hover:underline sm:text-base'

export function Footer() {
  return (
    <footer className="on-dark bg-footer px-6 py-10 text-white sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[180px_1fr_1fr] md:gap-16">
          <Link href="/" className="justify-self-start" aria-label="Rústica, ir al inicio">
            <Image src={footerLogo} alt="" className="h-[72px] w-auto" />
          </Link>

          <nav aria-label="Enlaces corporativos" className="flex flex-col items-start">
            <Link href="/sedes/" className={linkClass}>
              Locales
            </Link>
            <Link href="/novedades/" className={linkClass}>
              Novedades
            </Link>
          </nav>

          <nav aria-label="Enlaces legales" className="flex flex-col items-start md:justify-self-center">
            <Link href="/terminos-y-condiciones/" className={linkClass}>
              Términos y condiciones
            </Link>
            <Link href="/politica-de-privacidad/" className={linkClass}>
              Políticas de privacidad
            </Link>
          </nav>
        </div>

        <div className="mt-14 text-center sm:mt-16">
          <a href="https://rusticahoteles.com/" target="_blank" rel="noreferrer" className={linkClass}>
            Rústica Hoteles
            <NewTab />
          </a>
          <p className="mt-4 text-sm sm:text-base">Todos los derechos reservados a Corporación Rústica</p>
        </div>
      </div>
    </footer>
  )
}
