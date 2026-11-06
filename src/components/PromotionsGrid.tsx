'use client'

import { useState } from 'react'
import { Dialog, DialogHeader, DialogPanel } from './Dialog'
import { Poster } from './ui'
import { promotions, type Promotion } from '@/data/promotions'
import { PROMOTIONS_BOARD } from '@/lib/boards'

const TITLE_ID = 'promocion-titulo'

export function PromotionsGrid() {
  const [selected, setSelected] = useState<Promotion | null>(null)

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {promotions.map(promotion => (
          <li key={promotion.title}>
            <article className="group h-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_3px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(196,30,58,0.14)]">
              <Poster src={PROMOTIONS_BOARD.src} size={PROMOTIONS_BOARD.size} position={promotion.position} />
              <div className="p-4">
                <h2 className="mb-1 font-bold leading-snug text-ink">{promotion.title}</h2>
                {promotion.price && <p className="mb-3 text-sm font-bold text-red">{promotion.price}</p>}
                <button
                  type="button"
                  onClick={() => setSelected(promotion)}
                  aria-label={`Ver más sobre ${promotion.title}`}
                  className="min-h-11 w-full cursor-pointer rounded-xl bg-cream py-2.5 text-sm font-bold text-red transition-colors hover:bg-red hover:text-white"
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
          <DialogPanel size="2xl">
            <DialogHeader
              eyebrow="Promoción Rústica"
              title={selected.title}
              titleId={TITLE_ID}
              extra={selected.price && <p className="mt-1 font-bold text-gold-light">{selected.price}</p>}
              onClose={() => setSelected(null)}
            />
            <div className="p-6">
              <p className="mb-5 font-semibold text-muted">{selected.subtitle}</p>
              <div className="space-y-3">
                {selected.details.map(detail => (
                  <p key={detail} className="text-sm leading-6 text-body">
                    {detail}
                  </p>
                ))}
              </div>
              {selected.terms && (
                <div className="mt-7 border-t border-line pt-6">
                  <h3 className="mb-3 font-bold text-ink">Términos y condiciones</h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-body">
                    {selected.terms.map(term => (
                      <li key={term}>{term}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DialogPanel>
        )}
      </Dialog>
    </>
  )
}
