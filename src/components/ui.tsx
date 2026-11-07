import type { ReactNode } from 'react'

/** Afiche recortado de una hoja de afiches. Decorativo: el texto está en la tarjeta. */
export function Poster({ src, size, position }: { src: string; size: string; position: string }) {
  return (
    <span
      aria-hidden="true"
      className="block aspect-[269/336] w-full bg-no-repeat"
      style={{ backgroundImage: `url(${src})`, backgroundSize: size, backgroundPosition: position }}
    />
  )
}

/** Encabezado de página: etiqueta superior + título (h1) + subtítulo opcional. */
export function PageHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <header className="mb-10 text-center">
      <p className="mb-2 text-xs uppercase tracking-widest text-brand">{eyebrow}</p>
      <h1 className="mb-2 font-display text-3xl font-bold text-ink">{title}</h1>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </header>
  )
}

/** Fondo de sección con el ancho máximo del diseño original. */
export function Section({
  tone = 'white',
  width = '6xl',
  children,
}: {
  tone?: 'white' | 'cream'
  width?: '5xl' | '6xl'
  children: ReactNode
}) {
  return (
    <div className={`px-6 py-16 ${tone === 'cream' ? 'bg-cream' : 'bg-surface'}`}>
      <div className={`mx-auto ${width === '5xl' ? 'max-w-5xl' : 'max-w-6xl'}`}>{children}</div>
    </div>
  )
}

/** Aviso para lectores de pantalla en enlaces que abren otra pestaña. */
export const NewTab = () => <span className="sr-only"> (se abre en una pestaña nueva)</span>

/** Clases del botón principal rojo (objetivo táctil ≥ 44 px). */
export const primaryButton =
  'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl bg-red px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-dark'
