const dateFormatter = new Intl.DateTimeFormat('es-PE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})
const longDateFormatter = new Intl.DateTimeFormat('es-PE', { dateStyle: 'full', timeZone: 'UTC' })

/** "2026-11-01" → "1 de noviembre de 2026" */
export const formatDate = (iso: string) => dateFormatter.format(new Date(`${iso}T00:00:00Z`))

/** "2026-10-10" → "sábado, 10 de octubre de 2026" */
export const formatLongDate = (iso: string) => longDateFormatter.format(new Date(`${iso}T00:00:00Z`))

/** Enlace de búsqueda en Google Maps para un local. */
export const mapsUrl = (label: string, address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Rústica ${label}, ${address}`)}`
