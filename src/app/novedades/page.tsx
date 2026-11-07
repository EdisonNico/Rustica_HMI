import type { Metadata } from 'next'
import { PageHeading, Section } from '@/components/ui'
import { news } from '@/data/news'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = { title: 'Novedades' }

export default function NewsPage() {
  return (
    <Section width="5xl">
      <PageHeading eyebrow="Lo último" title="Novedades" />
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {news.map(item => (
          <li key={item.title}>
            <article className="h-full overflow-hidden rounded-2xl border border-line shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="h-[180px] overflow-hidden bg-cream">
                {/* Foto de ambientación: el título ya describe la noticia, por eso alt vacío */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt="" loading="lazy" width={600} height={350} className="size-full object-cover" />
              </div>
              <div className="p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-red-tint px-2 py-0.5 text-xs font-semibold text-brand">{item.cat}</span>
                  <time dateTime={item.date} className="text-xs text-muted">
                    {formatDate(item.date)}
                  </time>
                </div>
                <h2 className="mb-2 font-display text-base font-bold text-ink">{item.title}</h2>
                <p className="text-sm leading-relaxed text-muted">{item.excerpt}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
