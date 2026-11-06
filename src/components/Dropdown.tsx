'use client'

import { useCallback, useId, useRef, useState, type ReactNode } from 'react'
import { useDismiss } from '@/lib/useDismiss'

interface DropdownProps {
  /** Contenido del botón; recibe si el panel está abierto */
  trigger: (open: boolean) => ReactNode
  triggerClassName: string | ((open: boolean) => string)
  panelClassName: string
  wrapperClassName?: string
  /** El panel recibe una función para cerrarse y devolver el foco al botón */
  children: (close: () => void) => ReactNode
  /** id del panel (para aria-controls); se genera uno si no se indica */
  panelId?: string
}

/**
 * Patrón "disclosure": botón con aria-expanded/aria-controls que muestra un panel.
 * Cierra con Esc, clic fuera o al salir con Tab (WCAG 2.1.1, 4.1.2).
 */
export function Dropdown({ trigger, triggerClassName, panelClassName, wrapperClassName, children, panelId }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const autoId = useId()
  const id = panelId ?? `panel-${autoId}`
  const close = useCallback(() => setOpen(false), [])
  useDismiss(open, close, wrapper, button)

  return (
    <div ref={wrapper} className={wrapperClassName}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(o => !o)}
        className={typeof triggerClassName === 'function' ? triggerClassName(open) : triggerClassName}
      >
        {trigger(open)}
      </button>
      {open && (
        <div id={id} className={panelClassName}>
          {children(() => {
            setOpen(false)
            button.current?.focus()
          })}
        </div>
      )}
    </div>
  )
}
