'use client'

import { useEffect, useState } from 'react'
import { speak, speechSupported, stop, useSpeech } from '@/lib/speech'

/** Botón «Escuchar» para ventanas (el lector flotante queda detrás de una ventana modal). */
export function ListenButton({ text, what }: { text: string; what: string }) {
  const { state, label } = useSpeech()
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    setSupported(speechSupported())
    return () => stop()
  }, [])
  if (!supported) return null
  const active = state !== 'idle' && label === what
  return (
    <button
      type="button"
      onClick={() => (active ? stop() : speak(text, what))}
      aria-pressed={active}
      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border-2 border-field px-4 py-2 text-sm font-bold text-ink hover:border-red"
    >
      <span aria-hidden="true">{active ? '■' : '🔊'}</span>
      {active ? 'Detener lectura' : 'Escuchar'}
    </button>
  )
}
