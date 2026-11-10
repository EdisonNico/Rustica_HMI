'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import { navEntries, socialLinks } from '@/data/nav'
import { useReservation } from './ReservationProvider'
import { PreferencesDialog } from './PreferencesDialog'
import { ThemeToggle } from './ThemeToggle'
import { AccessibilityIcon, CloseIcon, MenuIcon, SocialIcon } from './Icons'
import { NewTab, primaryButton } from './ui'
import { useDismiss } from '@/lib/useDismiss'

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/$/, '') : path)

export function Header() {
  const pathname = normalize(usePathname())
  const { open: openReservation } = useReservation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const wrapper = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  // En Inicio la cabecera se funde con la portada (sin sombra) hasta que se baja la página
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  const blended = pathname === '/' && !scrolled
  useDismiss(menuOpen, closeMenu, wrapper, menuButton)

  const isActive = (href: string) => normalize(href) === pathname
  const linkClass = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-lg border-b-2 px-3 text-sm transition-colors hover:bg-cream hover:text-brand ${
      active ? 'border-red bg-cream font-bold text-ink' : 'border-transparent text-ink'
    }`

  return (
    <header ref={wrapper} className={`sticky top-0 z-40 bg-surface transition-shadow ${blended ? '' : 'shadow-[0_2px_16px_rgba(0,0,0,0.1)]'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="shrink-0 rounded-lg" aria-label="Rústica, ir al inicio">
          <Image src={logo} alt="" className="logo-header block h-11 w-auto" priority />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navEntries.map(entry =>
            entry.type === 'reserve' ? (
              <button key="reserve" type="button" onClick={openReservation} className={`${primaryButton} px-4`}>
                Hacer reserva
              </button>
            ) : (
              <Link key={entry.href} href={entry.href} aria-current={isActive(entry.href) ? 'page' : undefined} className={linkClass(isActive(entry.href))}>
                {entry.label}
              </Link>
            ),
          )}
          <div className="ml-2 flex items-center gap-1 border-l border-line pl-3">
            {socialLinks.map(social => (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${social.label} de Rústica`}
                className="grid size-11 place-items-center rounded-lg text-ink hover:bg-cream hover:text-brand"
              >
                <SocialIcon network={social.network} />
                <NewTab />
              </a>
            ))}
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setPrefsOpen(true)}
              aria-label="Preferencias de accesibilidad"
              className="grid size-11 cursor-pointer place-items-center rounded-lg text-ink hover:bg-cream hover:text-brand"
            >
              <AccessibilityIcon />
            </button>
          </div>
        </nav>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          onClick={() => setMenuOpen(o => !o)}
          className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-semibold text-ink lg:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
          Menú
        </button>
      </div>

      {menuOpen && (
        <nav id="menu-movil" aria-label="Principal" className="flex flex-col gap-2 border-t border-line bg-surface px-6 py-4 lg:hidden">
          {navEntries.map(entry =>
            entry.type === 'reserve' ? (
              <button
                key="reserve"
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  openReservation()
                }}
                className={`${primaryButton} justify-start px-4 py-3`}
              >
                Hacer reserva
              </button>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(entry.href) ? 'page' : undefined}
                className={`min-h-11 rounded-xl px-4 py-3 text-sm font-medium text-ink ${isActive(entry.href) ? 'bg-cream font-bold underline decoration-red decoration-2 underline-offset-4' : ''}`}
              >
                {entry.label}
              </Link>
            ),
          )}
          <ThemeToggle withLabel className="w-full justify-start gap-3 rounded-xl px-4 py-3 text-sm font-medium" />
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false)
              setPrefsOpen(true)
            }}
            className="min-h-11 cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-medium text-ink"
          >
            Accesibilidad
          </button>
        </nav>
      )}

      <PreferencesDialog open={prefsOpen} onClose={() => setPrefsOpen(false)} />
    </header>
  )
}
