'use client'

import { useRef, type TouchEvent } from 'react'

/**
 * Gesto de deslizar horizontal (táctil). Siempre debe existir un botón visible que haga lo mismo:
 * el gesto es un atajo, nunca la única forma de hacerlo (consigna PROY, ruta alternativa).
 */
export function useSwipe(onLeft: () => void, onRight: () => void, min = 70) {
  const start = useRef<{ x: number; y: number } | null>(null)
  return {
    onTouchStart(e: TouchEvent) {
      const target = e.target as HTMLElement
      // No interferir con campos, listas ni zonas que se desplazan
      start.current = target.closest('input, select, textarea, [data-no-swipe]') ? null : { x: e.touches[0].clientX, y: e.touches[0].clientY }
    },
    onTouchEnd(e: TouchEvent) {
      const s = start.current
      start.current = null
      if (!s) return
      const dx = e.changedTouches[0].clientX - s.x
      const dy = e.changedTouches[0].clientY - s.y
      if (Math.abs(dx) < min || Math.abs(dx) < Math.abs(dy) * 1.5) return
      if (dx < 0) onLeft()
      else onRight()
    },
  }
}
