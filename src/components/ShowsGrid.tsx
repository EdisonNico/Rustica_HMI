'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, CloseButton } from './Dialog'
import { Poster } from './ui'
import { showDescriptions, shows, type Show } from '@/data/shows'
import { SHOW_BOARDS } from '@/lib/boards'

const TITLE_ID = 'show-titulo'

export function ShowsGrid() {
  const [selected, setSelected] = useState<Show | null>(null)

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {shows.map(show => (
          <li key={`${show.artist}-${show.date}`}>
            <article className="group h-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(196,30,58,0.14)]">
              <Poster src={SHOW_BOARDS[show.sheet]} size={show.size} position={show.position} />
              <div className="p-4">
                <h2 className="mb-3 font-display text-lg font-bold text-ink">{show.artist}</h2>
                <dl className="mb-4 space-y-2">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-red">Fecha</dt>
                    <dd className="text-sm text-muted">{show.date}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-red">Local</dt>
                    <dd className="text-sm text-muted">{show.location}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={() => setSelected(show)}
                  aria-label={`Ver detalles del show de ${show.artist}, ${show.date}`}
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
          <DialogPanel size="md">
            <Poster src={SHOW_BOARDS[selected.sheet]} size={selected.size} position={selected.position} />
            <div className="relative p-6">
              <div className="absolute right-3 top-3 rounded-full bg-sand text-ink [&_button]:text-ink">
                <CloseButton onClose={() => setSelected(null)} label="Cerrar detalles" />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-red">Show en vivo</p>
              <h2 id={TITLE_ID} className="mb-5 pr-12 font-display text-2xl font-bold text-ink">
                {selected.artist}
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-muted">Fecha</dt>
                  <dd className="mt-1 font-semibold text-body">{selected.date} · 09:00 p. m.</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-muted">Local</dt>
                  <dd className="mt-1 font-semibold text-body">{selected.location}</dd>
                </div>
              </dl>
              <div className="mt-6 space-y-3 border-t border-line pt-5">
                {showDescriptions[`${selected.artist}|${selected.date}`]?.map(paragraph => (
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
