import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import hero from '@/assets/hero.jpg'
import { CarouselSection, HighlightCard } from '@/components/CarouselSection'
import { Poster } from '@/components/ui'
import { promotionHighlights } from '@/data/highlights'
import { shows } from '@/data/shows'
import { PROMOTIONS_BOARD, SHOW_BOARDS } from '@/lib/boards'

export const metadata: Metadata = { title: { absolute: 'Rústica Perú' } }

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

export default function HomePage() {
  return (
    <>
      <div className="on-dark relative flex min-h-[580px] items-end justify-center overflow-hidden bg-charcoal text-center">
        <Image src={hero} alt="" priority fill sizes="100vw" className="object-cover object-top opacity-90" />
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
          <CarouselSection title="Promociones" href="/promociones/" linkLabel="Ver todas" noun="promociones">
            {promotionHighlights.map(item => (
              <HighlightCard key={item.title} href="/promociones/">
                <Poster src={PROMOTIONS_BOARD.src} size={PROMOTIONS_BOARD.size} position={item.position} />
                {cardText(item.title, item.subtitle)}
              </HighlightCard>
            ))}
          </CarouselSection>

          <CarouselSection title="Shows" href="/shows/" linkLabel="Ver todos" noun="shows">
            {shows.slice(0, 6).map(show => (
              <HighlightCard key={`${show.artist}-${show.date}`} href="/shows/">
                <Poster src={SHOW_BOARDS[show.sheet]} size={show.size} position={show.position} />
                {cardText(show.artist, `${show.date} · ${show.location}`)}
              </HighlightCard>
            ))}
          </CarouselSection>
        </div>
      </div>
    </>
  )
}
