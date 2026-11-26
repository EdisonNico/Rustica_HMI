'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { Dialog, DialogHeader, DialogPanel, SheetHandle } from './Dialog'
import { PreferencesDialog } from './PreferencesDialog'
import { ThemeToggle } from './ThemeToggle'
import { useReservation } from './ReservationProvider'
import { navEntries } from '@/data/nav'

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/$/, '') : path)
const TITLE_ID = 'mas-titulo'

const icon = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)
const HomeI = () => icon(<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" />)
const MenuI = () => icon(<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2.5 1.5-3.5 4-3.5 7v3h3.5" />)
const CalendarI = () => icon(<path d="M5 5h14v15H5zM5 10h14M9 3v4M15 3v4" />)
const MoreI = () => icon(<path d="M5 12h.01M12 12h.01M19 12h.01" strokeWidth="3.2" />)

const tab = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 px-1 text-xs font-semibold'

/**
 * Barra inferior para celular y tablet vertical: las acciones principales quedan al alcance del pulgar.
 * La cabecera superior con su menú sigue existiendo como ruta alternativa.
 */
export function BottomNav() {
  const pathname = normalize(usePathname())
  const { open: openReservation } = useReservation()
  const [moreOpen, setMoreOpen] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)

  if (pathname.startsWith('/admin')) return null

  const link = (href: string, label: string, Icon: () => ReactNode) => {
    const active = normalize(href) === pathname
    return (
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={`${tab} ${active ? 'text-brand' : 'text-ink'}`}
      >
        <span className={`grid h-8 w-14 place-items-center rounded-full ${active ? 'bg-red-tint' : ''}`}>
          <Icon />
        </span>
        {label}
      </Link>
    )
  }
  const moreLinks = navEntries.filter(entry => entry.type === 'link' && !['/', '/menu/'].includes(entry.href))

  return (
    <>
      <nav aria-label="Navegación móvil" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="mx-auto flex max-w-xl items-stretch">
          {link('/', 'Inicio', HomeI)}
          {link('/menu/', 'Carta', MenuI)}
          <button type="button" onClick={openReservation} className={`${tab} cursor-pointer text-ink`}>
            <span className="grid h-10 w-16 place-items-center rounded-2xl bg-red text-white shadow-md">
              <CalendarI />
            </span>
            Reservar
          </button>
          <button type="button" onClick={() => setMoreOpen(true)} aria-haspopup="dialog" className={`${tab} cursor-pointer text-ink`}>
            <span className="grid h-8 w-14 place-items-center">
              <MoreI />
            </span>
            Más
          </button>
        </div>
      </nav>

      <Dialog sheet open={moreOpen} onClose={() => setMoreOpen(false)} labelledBy={TITLE_ID}>
        <DialogPanel size="sm">
          <SheetHandle />
          <DialogHeader eyebrow="Rústica Perú" title="Más opciones" titleId={TITLE_ID} onClose={() => setMoreOpen(false)} />
          <ul className="space-y-2 p-4">
            {moreLinks.map(entry =>
              entry.type === 'link' ? (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    onClick={() => setMoreOpen(false)}
                    aria-current={normalize(entry.href) === pathname ? 'page' : undefined}
                    className="flex min-h-14 items-center rounded-xl border border-line px-4 text-base font-semibold text-ink aria-[current=page]:border-red aria-[current=page]:bg-red-tint"
                  >
                    {entry.label}
                  </Link>
                </li>
              ) : null,
            )}
            <li>
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false)
                  setPrefsOpen(true)
                }}
                className="flex min-h-14 w-full cursor-pointer items-center rounded-xl border border-line px-4 text-left text-base font-semibold text-ink"
              >
                Accesibilidad
              </button>
            </li>
            <li>
              <ThemeToggle withLabel className="min-h-14 w-full justify-start gap-3 rounded-xl border border-line px-4 text-base font-semibold" />
            </li>
          </ul>
        </DialogPanel>
      </Dialog>
      <PreferencesDialog open={prefsOpen} onClose={() => setPrefsOpen(false)} />
    </>
  )
}
