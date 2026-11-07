'use client'

import Link from 'next/link'
import { useRef, type ReactNode } from 'react'

interface Props {
  title: string
  /** Enlace a la página completa */
  href: string
  linkLabel: string
  /** Plural para los botones, p. ej. "promociones" */
  noun: string
  children: ReactNode
}

/**
 * Carrusel desplazable. Cada tarjeta es un <li>; las flechas son botones con
 * nombre accesible y no hay movimiento automático (WCAG 2.2.2, 2.5.1).
 */
export function CarouselSection({ title, href, linkLabel, noun, children }: Props) {
  const track = useRef<HTMLUListElement>(null)

  const move = (direction: -1 | 1) => {
    const reduce =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduce'
    track.current?.scrollBy({ left: direction * 300, behavior: reduce ? 'auto' : 'smooth' })
  }

  const arrow = 'grid size-11 cursor-pointer place-items-center rounded-full text-lg font-bold transition-colors'

  return (
    <section aria-label={title}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="border-l-2 border-gold pl-3 font-display text-xl font-bold text-ink sm:text-2xl">{title}</h2>
        <div className="flex items-center gap-3">
          <Link href={href} className="inline-flex min-h-11 items-center text-sm font-bold text-brand underline-offset-4 hover:underline">
            {linkLabel}
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={`Ver ${noun} anteriores`}
              className={`${arrow} border border-line bg-surface text-brand hover:bg-red hover:text-white`}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={`Ver ${noun} siguientes`}
              className={`${arrow} bg-red text-white hover:bg-red-dark`}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
      <ul ref={track} className="no-scrollbar -m-1 flex snap-x snap-mandatory gap-5 overflow-x-auto p-1 pb-3">
        {children}
      </ul>
    </section>
  )
}

/** Tarjeta del carrusel: enlace a la página completa con el afiche y su texto. */
export function HighlightCard({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li className="w-[78vw] flex-none snap-start sm:w-[260px]">
      <Link
        href={href}
        className="group block h-full overflow-hidden rounded-2xl border border-line bg-surface text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(196,30,58,0.14)]"
      >
        {children}
      </Link>
    </li>
  )
}
