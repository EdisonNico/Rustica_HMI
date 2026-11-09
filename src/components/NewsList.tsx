'use client'

import { LiveNotice } from './LiveNotice'
import { StatusMessage } from './StatusMessage'
import { useNews } from '@/lib/useRemote'
import { formatDate } from '@/lib/format'

export function NewsList() {
  const { data, status, reload } = useNews()
  const news = data ?? []
  return (
    <>
      <LiveNotice status={status} hasData={data !== null} what="las novedades" onRetry={reload} />
      {data !== null && news.length === 0 && (
        <div className="mx-auto max-w-2xl">
          <StatusMessage kind="info">Aún no hay novedades publicadas.</StatusMessage>
        </div>
      )}
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {news.map(item => (
          <li key={item.key}>
            <article className="h-full overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="h-[180px] overflow-hidden bg-cream">
                {/* Foto de ambientación: el título ya describe la noticia, por eso alt vacío */}
                {item.img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.img} alt="" loading="lazy" width={600} height={350} className="size-full object-cover" />
                )}
              </div>
              <div className="p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-red-tint px-2 py-0.5 text-xs font-semibold text-brand">{item.cat}</span>
                  {item.date && (
                    <time dateTime={item.date} className="text-xs text-muted">
                      {formatDate(item.date)}
                    </time>
                  )}
                </div>
                <h2 className="mb-2 font-display text-base font-bold text-ink">{item.title}</h2>
                <p className="text-sm leading-relaxed text-muted">{item.excerpt}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  )
}
