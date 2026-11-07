'use client'

import { useState } from 'react'
import { Dialog, DialogHeader, DialogPanel } from './Dialog'
import { NewTab, primaryButton } from './ui'
import { locationGroups, type LocationInfo } from '@/data/locations'
import { mapsUrl } from '@/lib/format'

const TITLE_ID = 'local-titulo'

export function LocationsExplorer() {
  const [zone, setZone] = useState(locationGroups[0].label)
  const [selected, setSelected] = useState<LocationInfo | null>(null)
  const group = locationGroups.find(item => item.label === zone)!

  return (
    <>
      {/* Grupo de opciones nativo (radio): flechas del teclado y estado anunciado sin ARIA extra */}
      <fieldset className="mb-8 flex flex-wrap justify-center gap-3">
        <legend className="sr-only">Zona</legend>
        {locationGroups.map(item => (
          <label key={item.label} className="relative">
            <input
              type="radio"
              name="zona"
              value={item.label}
              checked={zone === item.label}
              onChange={() => setZone(item.label)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border-[1.5px] border-field bg-surface px-5 py-2 text-sm font-semibold text-muted transition-colors peer-checked:border-red peer-checked:bg-red peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink peer-checked:before:mr-1.5 peer-checked:before:content-['✓']">
              {item.label}
            </span>
          </label>
        ))}
      </fieldset>

      <p role="status" className="sr-only">
        {group.locations.length} locales en {zone}
      </p>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {group.locations.map(location => (
          <li
            key={location.value}
            className="flex items-center gap-4 rounded-xl border-[1.5px] border-line bg-surface p-4 transition-colors hover:border-red hover:bg-red-tint"
          >
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-red text-lg text-white">
              📍
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-ink">Rústica {location.label}</h2>
              <p className="mt-0.5 text-sm text-muted">{location.address}</p>
            </div>
            <div className="ml-auto flex shrink-0 flex-col items-end">
              <button
                type="button"
                onClick={() => setSelected(location)}
                aria-label={`Ver información de Rústica ${location.label}`}
                className="inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-brand underline-offset-4 hover:underline"
              >
                Ver información
              </button>
              <a
                href={mapsUrl(location.label, location.address)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-muted underline-offset-4 hover:underline"
              >
                <span aria-hidden="true">Ver mapa →</span>
                <span className="sr-only">Ver mapa de Rústica {location.label}</span>
                <NewTab />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={selected !== null} onClose={() => setSelected(null)} labelledBy={TITLE_ID}>
        {selected && (
          <DialogPanel size="lg">
            <DialogHeader eyebrow="Información del local" title={`Rústica ${selected.label}`} titleId={TITLE_ID} onClose={() => setSelected(null)} />
            <dl className="space-y-5 p-6">
              {[
                ['Dirección', selected.address],
                ['Atención', selected.attention],
                ['Karaoke', selected.karaoke],
                ['Discoteca', selected.disco],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-brand">{term}</dt>
                  <dd className="text-sm leading-relaxed text-body">{value}</dd>
                </div>
              ))}
              <a href={mapsUrl(selected.label, selected.address)} target="_blank" rel="noreferrer" className={`${primaryButton} w-full py-3`}>
                Abrir en Google Maps
                <NewTab />
              </a>
            </dl>
          </DialogPanel>
        )}
      </Dialog>
    </>
  )
}
