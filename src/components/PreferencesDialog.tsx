'use client'

import { useState } from 'react'
import { Dialog, DialogHeader, DialogPanel } from './Dialog'
import { readPage, setFocusMode, setRate, speak, speakNow, speechSupported, stop, useSpeech } from '@/lib/speech'

const KEY = 'rustica-prefs'
const TITLE_ID = 'preferencias-titulo'

type Prefs = {
  contrast: 'normal' | 'high'
  grayscale: 'off' | 'on'
  text: 'normal' | 'large' | 'xlarge'
  legible: 'off' | 'on'
  motion: 'normal' | 'reduce'
  palette: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  theme: 'light' | 'dark'
}

const DEFAULTS: Prefs = { contrast: 'normal', grayscale: 'off', text: 'normal', legible: 'off', motion: 'normal', palette: 'normal', theme: 'light' }
const KEYS = Object.keys(DEFAULTS) as (keyof Prefs)[]

/** Lee el estado actual desde los atributos data-* de <html>. */
const read = (): Prefs => {
  const d = document.documentElement.dataset
  return {
    contrast: d.contrast === 'high' ? 'high' : 'normal',
    grayscale: d.grayscale === 'on' ? 'on' : 'off',
    text: d.text === 'large' || d.text === 'xlarge' ? d.text : 'normal',
    legible: d.legible === 'on' ? 'on' : 'off',
    motion: d.motion === 'reduce' ? 'reduce' : 'normal',
    theme: d.theme === 'dark' ? 'dark' : 'light',
    palette: d.palette === 'protanopia' || d.palette === 'deuteranopia' || d.palette === 'tritanopia' ? d.palette : 'normal',
  }
}

/** Aplica las preferencias a <html> y las recuerda en este navegador. */
function apply(prefs: Prefs) {
  const d = document.documentElement.dataset
  for (const key of KEYS) {
    if (prefs[key] === DEFAULTS[key]) delete d[key]
    else d[key] = prefs[key]
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs))
  } catch {
    /* sin almacenamiento: la preferencia vale solo para esta visita */
  }
}

export function PreferencesDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} labelledBy={TITLE_ID}>
      <PreferencesForm onClose={onClose} />
    </Dialog>
  )
}

const rowClass = 'flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 text-base text-ink hover:bg-cream'

function Radio({ name, value, checked, label, onChange }: { name: string; value: string; checked: boolean; label: string; onChange: () => void }) {
  return (
    <label className={rowClass}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="size-5 accent-red" />
      {label}
    </label>
  )
}

function Check({ checked, label, hint, onChange }: { checked: boolean; label: string; hint?: string; onChange: (v: boolean) => void }) {
  return (
    <>
      <label className={rowClass}>
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="size-5 accent-red" />
        {label}
      </label>
      {hint && <p className="px-2 text-sm text-muted">{hint}</p>}
    </>
  )
}

function PreferencesForm({ onClose }: { onClose: () => void }) {
  const [prefs, setPrefs] = useState<Prefs>(read)
  const update = (next: Partial<Prefs>) => {
    const merged = { ...prefs, ...next }
    setPrefs(merged)
    apply(merged)
  }
  const voice = useSpeech()
  const canSpeak = typeof window !== 'undefined' && speechSupported()

  return (
    <DialogPanel size="sm">
      <DialogHeader eyebrow="Rústica Perú" title="Accesibilidad" titleId={TITLE_ID} onClose={onClose} />
      <div className="space-y-6 px-6 py-6">
        <p className="text-sm text-muted">Los cambios se aplican al instante y se recuerdan en este navegador.</p>

        <fieldset>
          <legend className="mb-1 font-bold text-ink">Lector de voz</legend>
          {canSpeak ? (
            <>
              <Check
                checked={voice.focusMode}
                label="Leer en voz alta lo que tiene el foco"
                hint="Con el teclado, cada vez que pulses Tab se dice el nombre del enlace, botón o campo donde estás. Esc detiene la voz."
                onChange={on => {
                  setFocusMode(on)
                  if (on) speakNow('Lector de voz activado. Usa Tab para recorrer la página.')
                  else stop()
                }}
              />
              <div className="mt-2 flex flex-wrap items-center gap-2 px-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    window.setTimeout(readPage, 450)
                  }}
                  className="min-h-11 cursor-pointer rounded-xl bg-red px-4 text-sm font-bold text-white hover:bg-red-dark"
                >
                  Leer esta página
                </button>
                {voice.state !== 'idle' && (
                  <button type="button" onClick={stop} className="min-h-11 cursor-pointer rounded-xl border-2 border-field px-4 text-sm font-bold text-ink">
                    Detener lectura
                  </button>
                )}
              </div>
              <label className="mt-2 flex items-center gap-2 px-2 text-base text-ink">
                Velocidad
                <select
                  value={voice.rate}
                  onChange={e => {
                    setRate(Number(e.target.value))
                    speak('Así sonará la voz.', 'una prueba de velocidad')
                  }}
                  className="min-h-11 cursor-pointer rounded-xl border-2 border-field bg-surface px-2 text-sm text-ink"
                >
                  <option value={0.8}>Lenta</option>
                  <option value={1}>Normal</option>
                  <option value={1.25}>Rápida</option>
                </select>
              </label>
            </>
          ) : (
            <p className="px-2 text-sm text-muted">Este navegador no tiene lector de voz. Prueba con Chrome, Edge o Safari.</p>
          )}
        </fieldset>

        <fieldset>
          <legend className="mb-1 font-bold text-ink">Visualización</legend>
          <Radio name="contrast" value="normal" label="Modo estándar" checked={prefs.contrast === 'normal'} onChange={() => update({ contrast: 'normal' })} />
          <Radio name="contrast" value="high" label="Alto contraste" checked={prefs.contrast === 'high'} onChange={() => update({ contrast: 'high' })} />
          <Check
            checked={prefs.grayscale === 'on'}
            label="Escala de grises"
            hint="Muestra la página sin color. Todo el contenido sigue siendo comprensible porque usa iconos, textos y formas."
            onChange={v => update({ grayscale: v ? 'on' : 'off' })}
          />
        </fieldset>

        <fieldset>
          <legend className="mb-1 font-bold text-ink">Apariencia</legend>
          <Radio name="theme" value="light" label="Modo claro" checked={prefs.theme === 'light'} onChange={() => update({ theme: 'light' })} />
          <Radio name="theme" value="dark" label="Modo noche" checked={prefs.theme === 'dark'} onChange={() => update({ theme: 'dark' })} />
        </fieldset>

        <fieldset>
          <legend className="mb-1 font-bold text-ink">Colores para daltonismo</legend>
          <Radio name="palette" value="normal" label="Colores originales" checked={prefs.palette === 'normal'} onChange={() => update({ palette: 'normal' })} />
          <Radio name="palette" value="protanopia" label="Protanopia (dificultad con el rojo)" checked={prefs.palette === 'protanopia'} onChange={() => update({ palette: 'protanopia' })} />
          <Radio name="palette" value="deuteranopia" label="Deuteranopia (dificultad con el verde)" checked={prefs.palette === 'deuteranopia'} onChange={() => update({ palette: 'deuteranopia' })} />
          <Radio name="palette" value="tritanopia" label="Tritanopia (dificultad con azul y amarillo)" checked={prefs.palette === 'tritanopia'} onChange={() => update({ palette: 'tritanopia' })} />
          <p className="px-2 text-sm text-muted">
            Ajusta los colores de la marca para evitar los que cada tipo confunde. Los estados siempre llevan icono y texto.
          </p>
        </fieldset>

        <fieldset>
          <legend className="mb-1 font-bold text-ink">Texto</legend>
          <Radio name="text" value="normal" label="Tamaño normal" checked={prefs.text === 'normal'} onChange={() => update({ text: 'normal' })} />
          <Radio name="text" value="large" label="Grande (125 %)" checked={prefs.text === 'large'} onChange={() => update({ text: 'large' })} />
          <Radio name="text" value="xlarge" label="Muy grande (150 %)" checked={prefs.text === 'xlarge'} onChange={() => update({ text: 'xlarge' })} />
          <Check
            checked={prefs.legible === 'on'}
            label="Texto de mayor legibilidad"
            hint="Fuente sencilla y más espacio entre letras, palabras y líneas."
            onChange={v => update({ legible: v ? 'on' : 'off' })}
          />
        </fieldset>

        <fieldset>
          <legend className="mb-1 font-bold text-ink">Movimiento</legend>
          <Check checked={prefs.motion === 'reduce'} label="Reducir animaciones" onChange={v => update({ motion: v ? 'reduce' : 'normal' })} />
        </fieldset>

        <button
          type="button"
          onClick={() => update(DEFAULTS)}
          className="min-h-11 w-full cursor-pointer rounded-xl border-2 border-field px-4 py-2.5 text-sm font-bold text-ink hover:bg-cream"
        >
          Restablecer valores
        </button>
      </div>
    </DialogPanel>
  )
}
