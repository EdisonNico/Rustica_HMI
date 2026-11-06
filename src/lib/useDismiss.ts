import { useEffect, type RefObject } from 'react'

/**
 * Comportamiento estándar de un panel desplegable:
 * Esc lo cierra y devuelve el foco al botón; un clic fuera o sacar el foco
 * del panel (Tab) también lo cierran.
 */
export function useDismiss(
  open: boolean,
  close: () => void,
  wrapper: RefObject<HTMLElement | null>,
  trigger: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        trigger.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) close()
    }
    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as Node | null
      if (next && !wrapper.current?.contains(next)) close()
    }
    const node = wrapper.current
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    node?.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      node?.removeEventListener('focusout', onFocusOut)
    }
  }, [open, close, wrapper, trigger])
}
