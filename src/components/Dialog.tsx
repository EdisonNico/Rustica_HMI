'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { CloseIcon } from './Icons'

interface DialogProps {
  open: boolean
  onClose: () => void
  /** id del título (h2) de la ventana */
  labelledBy: string
  children: ReactNode
}

/**
 * Ventana emergente basada en el elemento <dialog> nativo con showModal():
 * el navegador atrapa el foco, inertiza el fondo, cierra con Esc y devuelve
 * el foco al botón que la abrió (WCAG 2.1.1, 2.4.3, 4.1.2).
 * El contenido solo se monta mientras está abierta, así el estado se reinicia.
 */
export function Dialog({ open, onClose, labelledBy, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={e => {
        // Un clic sobre el fondo oscuro llega al propio <dialog>
        if (e.target === e.currentTarget) onClose()
      }}
      className="modal"
    >
      {open ? children : null}
    </dialog>
  )
}

/** Panel blanco con esquinas redondeadas y desplazamiento interno. */
export function DialogPanel({ size = 'md', children }: { size?: 'sm' | 'md' | 'lg' | '2xl'; children: ReactNode }) {
  const width = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', '2xl': 'max-w-2xl' }[size]
  return (
    <div className={`w-[calc(100vw-2rem)] ${width} max-h-[90dvh] overflow-y-auto rounded-2xl bg-surface`}>{children}</div>
  )
}

export function CloseButton({ onClose, label = 'Cerrar' }: { onClose: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={label}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-gray-300 hover:text-white"
    >
      <CloseIcon />
    </button>
  )
}

/** Cabecera oscura común a las ventanas. */
export function DialogHeader({
  eyebrow,
  title,
  titleId,
  extra,
  onClose,
}: {
  eyebrow: string
  title: string
  titleId: string
  extra?: ReactNode
  onClose: () => void
}) {
  return (
    <div className="on-dark flex items-start justify-between gap-4 bg-charcoal px-6 py-5">
      <div>
        <p className="mb-1 text-xs uppercase tracking-widest text-gold">{eyebrow}</p>
        <h2 id={titleId} className="font-display text-2xl font-bold text-white">
          {title}
        </h2>
        {extra}
      </div>
      <CloseButton onClose={onClose} />
    </div>
  )
}
