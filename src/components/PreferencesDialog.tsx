'use client'

import { useState } from 'react'
import { Dialog, DialogHeader, DialogPanel } from './Dialog'

const KEY = 'rustica-prefs'
const TITLE_ID = 'preferencias-titulo'

type Prefs = { contrast: 'normal' | 'high'; text: 'normal' | 'large' | 'xlarge'; motion: 'normal' | 'reduce' }

const read = (): Prefs => {
  const d = document.documentElement.dataset
  return {
    contrast: d.contrast === 'high' ? 'high' : 'normal',
    text: d.text === 'large' || d.text === 'xlarge' ? d.text : 'normal',
    motion: d.motion === 'reduce' ? 'reduce' : 'normal',
  }
}

/** Aplica las preferencias a <html> y las recuerda en este navegador. */
function apply(prefs: Prefs) {
  const d = document.documentElement.dataset
  for (const key of ['contrast', 'text', 'motion'] as const) {
    if (prefs[key] === 'normal') delete d[key]
    else d[key] = prefs[key]
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs))
  } catch {
    /* sin almacenamiento disponible: la preferencia vale solo para esta visita */
  }
}

export function PreferencesDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} labelledBy={TITLE_ID}>
      <PreferencesForm onClose={onClose} />
    </Dialog>
  )
}

function Radio({ name, value, checked, label, onChange }: { name: string; value: string; checked: boolean; label: string; onChange: () => void }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 text-base text-ink hover:bg-cream">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="size-5 accent-red" />
      {label}
    </label>
  )
}

function PreferencesForm({ onClose }: { onClose: () => void }) {
  const [prefs, setPrefs] = useState<Prefs>(read)
  const update = (next: Partial<Prefs>) => {
    const merged = { ...prefs, ...next }
    setPrefs(merged)
    apply(merged)
  }

  return (
    <DialogPanel size="sm">
      <DialogHeader eyebrow="Rústica Perú" title="Accesibilidad" titleId={TITLE_ID} onClose={onClose} />
      <div className="space-y-6 px-6 py-6">
        <p className="text-sm text-muted">Los cambios se aplican al instante y se recuerdan en este navegador.</p>

        <fieldset>
          <legend className="mb-1 font-bold text-ink">Contraste</legend>
          <Radio name="contrast" value="normal" label="Normal" checked={prefs.contrast === 'normal'} onChange={() => update({ contrast: 'normal' })} />
          <Radio name="contrast" value="high" label="Alto contraste" checked={prefs.contrast === 'high'} onChange={() => update({ contrast: 'high' })} />
        </fieldset>

        <fieldset>
          <legend className="mb-1 font-bold text-ink">Tamaño del texto</legend>
          <Radio name="text" value="normal" label="Normal" checked={prefs.text === 'normal'} onChange={() => update({ text: 'normal' })} />
          <Radio name="text" value="large" label="Grande (125 %)" checked={prefs.text === 'large'} onChange={() => update({ text: 'large' })} />
          <Radio name="text" value="xlarge" label="Muy grande (150 %)" checked={prefs.text === 'xlarge'} onChange={() => update({ text: 'xlarge' })} />
        </fieldset>

        <fieldset>
          <legend className="mb-1 font-bold text-ink">Movimiento</legend>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 text-base text-ink hover:bg-cream">
            <input
              type="checkbox"
              checked={prefs.motion === 'reduce'}
              onChange={e => update({ motion: e.target.checked ? 'reduce' : 'normal' })}
              className="size-5 accent-red"
            />
            Reducir animaciones
          </label>
        </fieldset>

        <button
          type="button"
          onClick={() => update({ contrast: 'normal', text: 'normal', motion: 'normal' })}
          className="min-h-11 w-full cursor-pointer rounded-xl border-2 border-field px-4 py-2.5 text-sm font-bold text-ink hover:bg-cream"
        >
          Restablecer valores
        </button>
      </div>
    </DialogPanel>
  )
}
