'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BrushEdge } from './BrushEdge'
import hero from '@/assets/hero.webp'
import { CarouselSection, HighlightCard } from '@/components/CarouselSection'
import { LiveNotice } from '@/components/LiveNotice'
import { StatusMessage } from '@/components/StatusMessage'
import { Poster } from '@/components/ui'
import { useHome } from '@/lib/useRemote'

const stats = [
  { value: '20+', label: 'Locales', spoken: 'Más de 20 locales' },
  { value: '28', label: 'Años de sabor', spoken: '28 años de sabor' },
  { value: '50+', label: 'Platos en carta', spoken: 'Más de 50 platos en carta' },
  { value: '5★', label: 'Calificación', spoken: 'Calificación de 5 estrellas' },
]

const cardText = (title: string, subtitle: string) => (
  <span className="block p-4">
    <span className="mb-1 block font-display text-base font-bold text-ink">{title}</span>
    <span className="block text-sm leading-relaxed text-muted">{subtitle}</span>
  </span>
)

export function HomeContent() {
  const { data: home, status, reload } = useHome()
  const promotions = home?.promotions ?? []
  const shows = home?.shows ?? []
  // Mientras llegan los datos no se muestra ninguna imagen (así no aparece una antigua y luego cambia)
  const heroFailed = status === 'error' || (home !== null && home.heroUrl === null)

  return (
    <>
      <div className="on-dark relative flex min-h-[560px] items-end md:h-[clamp(560px,42vw,860px)] justify-center overflow-hidden bg-charcoal text-center">
        {home?.heroUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={home.heroUrl} alt="" className="absolute inset-0 size-full object-cover object-top opacity-90" />
        ) : heroFailed ? (
          <Image src={hero} alt="" fill sizes="100vw" className="object-cover object-top opacity-90" />
        ) : null}
        <BrushEdge position="top" className="text-surface" />
        <BrushEdge position="bottom" className="text-red" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(10,5,5,0.82)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-14">
          <h1 className="sr-only">Rústica Shows. Con los mejores artistas en vivo</h1>
          <Link
            href="/menu/"
            className="hero-cta inline-flex min-h-12 items-center rounded-xl border-2 px-8 py-3.5 text-base font-bold transition-colors"
          >
            Ver Menú
          </Link>
        </div>
      </div>

      <div className="bg-red px-6 py-6">
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-4 text-center text-white md:grid-cols-4">
          {stats.map(stat => (
            <li key={stat.label}>
              <span className="sr-only">{stat.spoken}</span>
              <span aria-hidden="true">
                <span className="block font-display text-3xl font-bold">{stat.value}</span>
                <span className="block text-sm uppercase tracking-wider">{stat.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-6xl space-y-14">
          <LiveNotice status={status} hasData={home !== null} what="promociones y shows" onRetry={reload} />
          {promotions.length > 0 && (
            <CarouselSection title="Promociones" href="/promociones/" linkLabel="Ver todas" noun="promociones">
              {promotions.map(item => (
                <HighlightCard key={item.key} href="/promociones/">
                  <Poster src={item.image} />
                  {cardText(item.shortTitle, item.shortSubtitle)}
                </HighlightCard>
              ))}
            </CarouselSection>
          )}

          {shows.length > 0 && (
            <CarouselSection title="Shows" href="/shows/" linkLabel="Ver todos" noun="shows">
              {shows.map(show => (
                <HighlightCard key={show.key} href="/shows/">
                  <Poster src={show.image} />
                  {cardText(show.artist, `${show.dateLabel} · ${show.location}`)}
                </HighlightCard>
              ))}
            </CarouselSection>
          )}
          {home !== null && promotions.length === 0 && shows.length === 0 && (
            <StatusMessage kind="info">Pronto publicaremos nuevas promociones y shows.</StatusMessage>
          )}
        </div>
      </div>
    </>
  )
}
