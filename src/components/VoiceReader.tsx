'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { describeFocus } from '@/lib/focusText'
import { loadFocusMode, loadRate, pause, resume, speakNow, speechSupported, stop, useSpeech } from '@/lib/speech'

/**
 * Motor del lector de voz (se activa desde el panel de Accesibilidad):
 * - Con «Leer lo que tiene el foco» activo, cada Tab dice en voz alta el elemento donde cae el foco.
 * - Esc detiene la voz.
 * - Mientras se lee la página aparece un control mínimo (Pausar / Detener), requisito de accesibilidad para audio que dura más de 3 s.
 */
export function VoiceReader() {
  const { state, label, focusMode } = useSpeech()
  const pathname = usePathname()
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    setSupported(speechSupported())
    loadRate()
    loadFocusMode()
    if (speechSupported()) window.speechSynthesis.getVoices()
    return () => stop()
  }, [])

  useEffect(() => {
    stop()
  }, [pathname])

  // Anuncia el elemento que recibe el foco
  useEffect(() => {
    if (!supported || !focusMode) return
    const onFocus = (e: FocusEvent) => {
      const el = e.target
      if (!(el instanceof HTMLElement) || el.closest('[data-no-speak]')) return
      speakNow(describeFocus(el))
    }
    document.addEventListener('focusin', onFocus, true)
    return () => document.removeEventListener('focusin', onFocus, true)
  }, [supported, focusMode])

  // Esc corta la lectura
  useEffect(() => {
    if (!supported) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') stop()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [supported])

  if (!supported || state === 'idle') return null

  return (
    <div
      role="region"
      aria-label="Control de lectura en voz alta"
      data-no-speak
      className="fixed bottom-5 left-5 z-30 flex max-w-[calc(100vw-7rem)] flex-wrap items-center gap-2 rounded-2xl border-2 border-ink bg-surface p-2 shadow-[0_6px_20px_rgba(0,0,0,0.22)] sm:bottom-7 sm:left-7"
    >
      <span role="status" className="px-2 text-sm font-semibold text-ink">
        {state === 'paused' ? 'En pausa' : 'Leyendo'}: {label}
      </span>
      <button type="button" onClick={state === 'paused' ? resume : pause} className="min-h-11 cursor-pointer rounded-xl bg-red px-4 text-sm font-bold text-white hover:bg-red-dark">
        {state === 'paused' ? 'Continuar' : 'Pausar'}
      </button>
      <button type="button" onClick={stop} className="min-h-11 cursor-pointer rounded-xl border-2 border-field px-4 text-sm font-bold text-ink">
        Detener
      </button>
    </div>
  )
}
