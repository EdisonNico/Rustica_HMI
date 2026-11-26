'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { loadRate, pause, resume, setRate, speak, speechSupported, stop, useSpeech } from '@/lib/speech'

const SpeakerIcon = () => (
  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
)

/** Texto de lo que se va a leer: la selección, la ventana abierta o el contenido principal de la página. */
function textToRead(): { text: string; label: string } {
  const selection = window.getSelection()?.toString().trim()
  if (selection) return { text: selection, label: 'el texto seleccionado' }
  const dialog = document.querySelector<HTMLElement>('dialog[open]')
  if (dialog) return { text: dialog.innerText, label: 'la ventana abierta' }
  const main = document.getElementById('contenido')
  return { text: main?.innerText ?? '', label: 'esta página' }
}

/**
 * Lector en voz alta flotante. Lee la página, la selección o la ventana abierta.
 * Controles: Pausar/Continuar, Detener y velocidad. Se puede usar con teclado y con lector de pantalla.
 */
export function VoiceReader() {
  const { state, rate, label } = useSpeech()
  const pathname = usePathname()
  const [supported, setSupported] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    setSupported(speechSupported())
    loadRate()
    // Algunos navegadores cargan las voces con retraso
    if (speechSupported()) window.speechSynthesis.getVoices()
    return () => stop()
  }, [])
  // Al cambiar de página se deja de leer
  useEffect(() => {
    stop()
  }, [pathname])

  if (!supported) return null

  const start = () => {
    const { text, label: what } = textToRead()
    setNotice(speak(text, what) ? '' : 'No hay texto para leer en esta página.')
  }

  return (
    <div role="region" aria-label="Lector en voz alta" className="fixed bottom-5 left-5 z-30 flex max-w-[calc(100vw-7rem)] flex-wrap items-center gap-2 sm:bottom-7 sm:left-7">
      {state === 'idle' ? (
        <button
          type="button"
          onClick={start}
          className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border-2 border-ink bg-surface px-4 text-sm font-bold text-ink shadow-[0_6px_20px_rgba(0,0,0,0.22)] hover:bg-cream"
        >
          <SpeakerIcon />
          Escuchar
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-ink bg-surface p-2 shadow-[0_6px_20px_rgba(0,0,0,0.22)]">
          <span role="status" className="px-2 text-sm font-semibold text-ink">
            {state === 'paused' ? 'En pausa' : 'Leyendo'}: {label}
          </span>
          <button
            type="button"
            onClick={state === 'paused' ? resume : pause}
            className="min-h-11 cursor-pointer rounded-xl bg-red px-4 text-sm font-bold text-white hover:bg-red-dark"
          >
            {state === 'paused' ? 'Continuar' : 'Pausar'}
          </button>
          <button type="button" onClick={stop} className="min-h-11 cursor-pointer rounded-xl border-2 border-field px-4 text-sm font-bold text-ink">
            Detener
          </button>
          <label className="flex items-center gap-1 text-sm font-semibold text-ink">
            Velocidad
            <select
              value={rate}
              onChange={e => {
                setRate(Number(e.target.value))
                start()
              }}
              className="min-h-11 cursor-pointer rounded-xl border-2 border-field bg-surface px-2 text-sm text-ink"
            >
              <option value={0.8}>Lenta</option>
              <option value={1}>Normal</option>
              <option value={1.25}>Rápida</option>
            </select>
          </label>
        </div>
      )}
      {notice && (
        <p role="status" className="rounded-xl bg-surface px-3 py-2 text-sm font-semibold text-ink shadow">
          {notice}
        </p>
      )}
    </div>
  )
}
