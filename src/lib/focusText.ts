/** Frase que se dice cuando un elemento recibe el foco con Tab: nombre, tipo y estado. */

const clean = (t: string | null | undefined, max = 160) => (t ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

function nameOf(el: HTMLElement): string {
  const label = el.getAttribute('aria-label')
  if (label) return clean(label)
  const ids = el.getAttribute('aria-labelledby')
  if (ids) {
    const text = ids
      .split(/\s+/)
      .map(id => document.getElementById(id)?.textContent ?? '')
      .join(' ')
    if (clean(text)) return clean(text)
  }
  if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
    const fromLabels = Array.from(el.labels ?? [])
      .map(l => l.textContent ?? '')
      .join(' ')
    if (clean(fromLabels)) return clean(fromLabels)
    if (el instanceof HTMLInputElement && el.placeholder) return clean(el.placeholder)
  }
  const img = el.querySelector('img[alt]:not([alt=""])')
  const text = clean(el.innerText || el.textContent)
  return text || clean(img?.getAttribute('alt')) || clean(el.getAttribute('title'))
}

function kindOf(el: HTMLElement): string {
  const role = el.getAttribute('role')
  // Enlaces y botones no se anuncian como tal: se dice solo su nombre, para no repetir la palabra en cada Tab
  if (el instanceof HTMLAnchorElement || role === 'link' || el instanceof HTMLButtonElement || role === 'button') return ''
  if (el instanceof HTMLSelectElement) return 'lista desplegable'
  if (el instanceof HTMLTextAreaElement) return 'área de texto'
  if (el instanceof HTMLInputElement) {
    switch (el.type) {
      case 'checkbox': return 'casilla'
      case 'radio': return 'opción'
      case 'date': return 'campo de fecha'
      case 'time': return 'campo de hora'
      case 'search': return 'campo de búsqueda'
      case 'password': return 'campo de contraseña'
      case 'file': return 'selector de archivo'
      case 'submit': case 'button': return ''
      default: return 'campo de texto'
    }
  }
  if (el.tagName === 'MAIN') return 'contenido principal'
  if (el.tagName === 'SUMMARY') return 'resumen desplegable'
  if (el instanceof HTMLDialogElement) return 'ventana'
  return ''
}

export function describeFocus(el: HTMLElement): string {
  if (el === document.body) return ''
  const parts: string[] = []
  const name = nameOf(el)
  const kind = kindOf(el)
  if (name && kind !== 'contenido principal') parts.push(name)
  if (kind) parts.push(kind)
  if (el instanceof HTMLInputElement) {
    if (el.type === 'checkbox' || el.type === 'radio') parts.push(el.checked ? 'marcada' : 'sin marcar')
    else if (el.type !== 'password' && el.type !== 'file' && el.value) parts.push(`valor ${el.value}`)
  }
  if (el instanceof HTMLSelectElement) parts.push(`valor ${clean(el.selectedOptions[0]?.textContent)}`)
  if (el instanceof HTMLTextAreaElement && el.value) parts.push(`texto ${clean(el.value, 80)}`)
  const expanded = el.getAttribute('aria-expanded')
  if (expanded) parts.push(expanded === 'true' ? 'desplegado' : 'plegado')
  if (el.getAttribute('aria-pressed') === 'true') parts.push('activado')
  if (el.getAttribute('aria-current') === 'page') parts.push('página actual')
  if (el.getAttribute('aria-invalid') === 'true') parts.push('con error')
  if ((el as HTMLInputElement).required || el.getAttribute('aria-required') === 'true') parts.push('obligatorio')
  if ((el as HTMLButtonElement).disabled) parts.push('no disponible')
  return parts.join(', ')
}
