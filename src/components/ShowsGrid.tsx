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
      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-2">
        {shows.map(show => (
          <li key={show.key}>
            <article className="flex h-full overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="w-28 shrink-0 sm:w-36">
                <Poster src={show.image} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-4">
                <h2 className="font-display text-lg font-bold leading-tight text-ink">{show.artist}</h2>
                <p className="mt-1 text-sm font-semibold text-body">
                  {show.dateLabel}
                  {show.timeLabel && ` · ${show.timeLabel}`}
                </p>
                <p className="text-sm text-muted">{show.location}</p>
                {show.description.length > 0 && <p className="mt-2 line-clamp-3 text-sm leading-6 text-body">{show.description.join(' ')}</p>}
                <button
                  type="button"
                  onClick={() => setSelected(show)}
                  aria-label={`Ver más del show de ${show.artist}, ${show.dateLabel}`}
                  className="mt-auto min-h-11 cursor-pointer self-end pt-2 text-sm font-bold text-brand underline-offset-4 hover:underline"
                >
                  Ver más
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Dialog open={selected !== null} onClose={() => setSelected(null)} labelledBy={TITLE_ID}>
        {selected && (
          <DialogPanel size="md">
            <Poster src={selected.image} />
            <div className="relative p-6">
              <div className="absolute right-3 top-3 rounded-full bg-sand text-ink [&_button]:text-ink">
                <CloseButton onClose={() => setSelected(null)} label="Cerrar detalles" />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand">Show en vivo</p>
              <h2 id={TITLE_ID} className="mb-5 pr-12 font-display text-2xl font-bold text-ink">
                {selected.artist}
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-muted">Fecha</dt>
                  <dd className="mt-1 font-semibold text-body">{selected.dateLabel}
                    {selected.timeLabel && ` · ${selected.timeLabel}`}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-muted">Local</dt>
                  <dd className="mt-1 font-semibold text-body">{selected.location}</dd>
                </div>
              </dl>
              <div className="mt-6 space-y-3 border-t border-line pt-5">
                {selected.description.map(paragraph => (
                  <p key={paragraph} className="text-sm leading-6 text-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </DialogPanel>
        )}
      </Dialog>
    </>
  )
}
