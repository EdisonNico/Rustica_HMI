'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, CloseButton } from './Dialog'
import { LiveNotice } from './LiveNotice'
import { StatusMessage } from './StatusMessage'
import { useNews } from '@/lib/useRemote'
import { formatDate } from '@/lib/format'
import type { NewsView } from '@/lib/content'

const TITLE_ID = 'novedad-titulo'

export function NewsList() {
  const [selected, setSelected] = useState<NewsView | null>(null)
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
      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map(item => (
          <li key={item.key}>
            <article className="on-dark group relative aspect-[4/3] overflow-hidden rounded-xl bg-charcoal">
              {item.img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.img} alt="" loading="lazy" width={600} height={450} className="absolute inset-0 size-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
              <span className="absolute left-3 top-3 rounded-full bg-charcoal/90 px-2.5 py-0.5 text-xs font-semibold text-white">{item.cat}</span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                {item.date && (
                  <time dateTime={item.date} className="block text-xs font-bold">
                    {formatDate(item.date)}
                  </time>
                )}
                <h2 className="mt-1 line-clamp-2 text-sm font-medium leading-snug">{item.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(item)}
                aria-label={`Leer la novedad: ${item.title}`}
                aria-haspopup="dialog"
                className="absolute inset-0 cursor-pointer rounded-xl transition-colors group-hover:bg-black/10"
              />
            </article>
          </li>
        ))}
      </ul>

      <Dialog open={selected !== null} onClose={() => setSelected(null)} labelledBy={TITLE_ID}>
        {selected && (
          <DialogPanel size="lg">
            {selected.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selected.img} alt="" className="max-h-64 w-full object-cover" />
            )}
            <div className="relative p-6">
              <div className="absolute right-3 top-3 rounded-full bg-sand text-ink [&_button]:text-ink">
                <CloseButton onClose={() => setSelected(null)} label="Cerrar novedad" />
              </div>
              <p className="mb-2 pr-12 text-xs font-bold uppercase tracking-widest text-brand">
                {selected.cat}
                {selected.date && (
                  <>
                    {' · '}
                    <time dateTime={selected.date}>{formatDate(selected.date)}</time>
                  </>
                )}
              </p>
              <h2 id={TITLE_ID} className="mb-4 pr-12 font-display text-xl font-bold text-ink">
                {selected.title}
              </h2>
              <p className="whitespace-pre-line text-sm leading-6 text-body">{selected.excerpt}</p>
            </div>
          </DialogPanel>
        )}
      </Dialog>
    </>
  )
}
