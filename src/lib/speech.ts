'use client'

import { useSyncExternalStore } from 'react'

/**
 * Lector en voz alta con la voz del navegador (Web Speech API): gratis, sin enviar texto a ningún servidor.
 * El texto se parte en trozos cortos porque Chrome corta las lecturas largas.
 */
export type SpeechState = 'idle' | 'speaking' | 'paused'
interface Snapshot { state: SpeechState; rate: number; label: string; focusMode: boolean }

const RATE_KEY = 'rustica-voice-rate'
const FOCUS_KEY = 'rustica-voice-focus'
let snapshot: Snapshot = { state: 'idle', rate: 1, label: '', focusMode: false }
const listeners = new Set<() => void>()
let session = 0 // cada lectura nueva invalida los eventos de la anterior

function emit(next: Partial<Snapshot>) {
  snapshot = { ...snapshot, ...next }
  listeners.forEach(l => l())
}

export const speechSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

/** Quita emojis, enlaces y símbolos que el lector pronunciaría mal, y parte el texto en trozos. */
export function toChunks(raw: string, max = 220): string[] {
  const clean = raw
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[\p{Extended_Pictographic}‍️]/gu, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
  const chunks: string[] = []
  for (const line of clean.split('\n')) {
    const text = line.trim()
    if (!text) continue
    // Primero por frases, y las muy largas por comas o por espacios
    // Se parte solo donde termina una frase real (no en «p. m.» ni en «59.90»)
    for (const sentence of text.split(/(?<=[.!?…])\s+(?=[A-ZÁÉÍÓÚÑ¡¿])/)) {
      let rest = sentence.trim()
      while (rest.length > max) {
        const cut = Math.max(rest.lastIndexOf(',', max), rest.lastIndexOf(' ', max))
        const at = cut > 40 ? cut : max
        chunks.push(rest.slice(0, at).trim())
        rest = rest.slice(at).replace(/^[,\s]+/, '')
      }
      if (rest) chunks.push(rest)
    }
  }
  return chunks.filter(c => /[\p{L}\p{N}]/u.test(c))
}

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  for (const lang of ['es-PE', 'es-MX', 'es-US', 'es-419', 'es-ES']) {
    const match = voices.find(v => v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase())
    if (match) return match
  }
  return voices.find(v => v.lang.toLowerCase().startsWith('es')) ?? null
}

export function stop() {
  if (!speechSupported()) return
  session++
  window.speechSynthesis.cancel()
  emit({ state: 'idle', label: '' })
}

export function speak(text: string, label = 'el contenido') {
  if (!speechSupported()) return false
  const chunks = toChunks(text)
  if (!chunks.length) return false
  session++
  const mine = session
  window.speechSynthesis.cancel()
  const voice = pickVoice()
  emit({ state: 'speaking', label })
  chunks.forEach((chunk, i) => {
    const u = new SpeechSynthesisUtterance(chunk)
    u.lang = voice?.lang ?? 'es-ES'
    if (voice) u.voice = voice
    u.rate = snapshot.rate
    if (i === chunks.length - 1) u.onend = () => session === mine && emit({ state: 'idle', label: '' })
    u.onerror = e => {
      if (session !== mine || e.error === 'interrupted' || e.error === 'canceled') return
      emit({ state: 'idle', label: '' })
    }
    window.speechSynthesis.speak(u)
  })
  return true
}

/** Dice una frase corta al instante (interrumpe lo que se esté leyendo). Se usa para anunciar el elemento con foco. */
export function speakNow(text: string) {
  if (!speechSupported() || !text.trim()) return
  session++
  window.speechSynthesis.cancel()
  if (snapshot.state !== 'idle') emit({ state: 'idle', label: '' })
  const voice = pickVoice()
  const u = new SpeechSynthesisUtterance(text.replace(/[\p{Extended_Pictographic}\u200d\ufe0f]/gu, ''))
  u.lang = voice?.lang ?? 'es-ES'
  if (voice) u.voice = voice
  u.rate = snapshot.rate
  window.speechSynthesis.speak(u)
}

/** Lee la selección o, si no hay, el contenido principal de la página. */
export function readPage() {
  const selection = window.getSelection()?.toString().trim()
  if (selection) return speak(selection, 'el texto seleccionado')
  const main = document.getElementById('contenido')
  return speak(main?.innerText ?? '', 'esta página')
}

export function setFocusMode(on: boolean) {
  emit({ focusMode: on })
  try {
    localStorage.setItem(FOCUS_KEY, on ? '1' : '0')
  } catch {
    /* sin almacenamiento */
  }
}

export function loadFocusMode() {
  try {
    if (localStorage.getItem(FOCUS_KEY) === '1') emit({ focusMode: true })
  } catch {
    /* sin almacenamiento */
  }
}

export function pause() {
  if (snapshot.state !== 'speaking') return
  window.speechSynthesis.pause()
  emit({ state: 'paused' })
}

export function resume() {
  if (snapshot.state !== 'paused') return
  window.speechSynthesis.resume()
  emit({ state: 'speaking' })
}

export function setRate(rate: number) {
  emit({ rate })
  try {
    localStorage.setItem(RATE_KEY, String(rate))
  } catch {
    /* sin almacenamiento */
  }
}

export function loadRate() {
  try {
    const saved = Number(localStorage.getItem(RATE_KEY))
    if (saved >= 0.6 && saved <= 1.6) emit({ rate: saved })
  } catch {
    /* sin almacenamiento */
  }
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
const serverSnapshot: Snapshot = { state: 'idle', rate: 1, label: '', focusMode: false }
export const useSpeech = () => useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot)
