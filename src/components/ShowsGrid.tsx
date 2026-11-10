'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, CloseButton } from './Dialog'
import { Poster } from './ui'
import { LiveNotice } from './LiveNotice'
import { StatusMessage } from './StatusMessage'
import { useShows } from '@/lib/useRemote'
import type { ShowView } from '@/lib/content'

const TITLE_ID = 'show-titulo'

export function ShowsGrid() {
  const [selected, setSelected] = useState<ShowView | null>(null)
  const { data, status, reload } = useShows()
  const shows = data ?? []

  return (
    <>
      <LiveNotice status={status} hasData={data !== null} what="los shows" onRetry={reload} />
      {data !== null && shows.length === 0 && (
        <div className="mx-auto max-w-2xl">
          <StatusMessage kind="info">Pronto anunciaremos nuevos shows.</StatusMessage>
        </div>
      )}
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {shows.map(show => (
          <li key={show.key}>
            <article className="group h-full overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(196,30,58,0.14)]">
              <Poster src={show.image} />
              <div className="p-4">
                <h2 className="mb-3 font-display text-lg font-bold text-ink">{show.artist}</h2>
                <dl className="mb-4 space-y-2">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-brand">Fecha</dt>
                    <dd className="text-sm text-muted">{show.dateLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-brand">Local</dt>
                    <dd className="text-sm text-muted">{show.location}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={() => setSelected(show)}
                  aria-label={`Ver detalles del show de ${show.artist}, ${show.dateLabel}`}
                  className="min-h-11 w-full cursor-pointer rounded-xl bg-red py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-red-dark"
                >
                  Ver detalles
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Dialog open={selected !== null} onClose={() => setSelected(null)} labelledBy={TITLE_ID}>
        {selected && (
          <DialogPanel size="2xl">
            <div className="relative grid max-h-[85vh] overflow-y-auto md:grid-cols-[240px_1fr]">
              <div className="mx-auto w-40 pt-6 md:w-full md:pt-0">
                <Poster src={selected.image} />
              </div>
              <div className="relative p-6">
                <div className="absolute right-3 top-3 rounded-full bg-sand text-ink [&_button]:text-ink">
                  <CloseButton onClose={() => setSelected(null)} label="Cerrar detalles" />
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand">Show en vivo</p>
                <h2 id={TITLE_ID} className="mb-3 pr-12 font-display text-2xl font-bold text-ink">
                  {selected.artist}
                </h2>
                <p className="font-semibold text-body">
                  {selected.dateLabel}
                  {selected.timeLabel && ` · ${selected.timeLabel}`}
                </p>
                <p className="mb-4 text-sm text-muted">{selected.location}</p>
                <div className="space-y-3 border-t border-line pt-4">
                  {selected.description.map(paragraph => (
                    <p key={paragraph} className="text-sm leading-6 text-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        )}
      </Dialog>
    </>
  )
}
