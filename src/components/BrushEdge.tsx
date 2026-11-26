import { useId } from 'react'

/**
 * Borde de pincelada decorativo (arriba y abajo de la portada).
 * Un filtro SVG de ruido deforma una banda recta para darle el aspecto de trazo de pincel seco.
 * Solo es adorno: está oculto para los lectores de pantalla. El color lo da `className` (text-*).
 */
export function BrushEdge({ position, className }: { position: 'top' | 'bottom'; className: string }) {
  const filterId = 'brush-' + useId().replace(/:/g, '')
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 z-[5] h-10 w-full fill-current md:h-16 ${className} ${
        position === 'top' ? 'top-0' : 'bottom-0 rotate-180'
      }`}
    >
      <defs>
        <filter id={filterId} x="0" y="-50%" width="100%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.35" numOctaves="3" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <rect x="-20" y="-20" width="1240" height="44" filter={`url(#${filterId})`} />
    </svg>
  )
}
