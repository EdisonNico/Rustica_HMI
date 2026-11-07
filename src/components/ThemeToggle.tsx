'use client'

import { useEffect, useState } from 'react'

const KEY = 'rustica-prefs'

/**
 * Botón sol/luna para cambiar entre modo claro y modo noche desde cualquier
 * página. Comparte la clave 'rustica-prefs' con el panel de Accesibilidad y
 * se mantiene sincronizado con él (observa data-theme en <html>).
 * - Sin `withLabel`: solo icono (cabecera de escritorio).
 * - Con `withLabel`: icono + texto visible (menú móvil).
 */
export function ThemeToggle({ className = '', withLabel = false }: { className?: string; withLabel?: boolean }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const sync = () => setDark(html.dataset.theme === 'dark')
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const next = dark ? 'light' : 'dark'
    const html = document.documentElement
    if (next === 'dark') html.dataset.theme = 'dark'
    else delete html.dataset.theme
    try {
      const prefs = JSON.parse(localStorage.getItem(KEY) || '{}')
      localStorage.setItem(KEY, JSON.stringify({ ...prefs, theme: next }))
    } catch {
      /* sin almacenamiento: vale solo para esta visita */
    }
  }

  const label = dark ? 'Activar modo claro' : 'Activar modo noche'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`flex min-h-11 cursor-pointer items-center justify-center text-ink hover:bg-cream hover:text-brand ${withLabel ? '' : 'size-11 rounded-lg'} ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
      {withLabel && <span>{dark ? 'Modo claro' : 'Modo noche'}</span>}
    </button>
  )
}
