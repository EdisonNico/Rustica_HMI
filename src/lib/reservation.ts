export interface TimeSlot {
  value: string
  label: string
}

/**
 * Genera las horas reservables (cada 30 min) a partir del horario de atención
 * publicado del local. Lógica tomada tal cual de la versión 2.0.
 */
export function reservationTimesFor(attention: string) {
  const timePattern = /(\d{1,2})(?::(\d{2}))?\s*([ap])\.\s*m\./gi
  const parsedTimes = [...attention.matchAll(timePattern)].map(match => {
    let hour = Number(match[1])
    const minutes = Number(match[2] ?? 0)
    const meridiem = match[3].toLowerCase()

    if (meridiem === 'p' && hour !== 12) hour += 12
    if (meridiem === 'a' && hour === 12) hour = 0
    if (meridiem === 'a' && hour < 8) hour += 24

    return hour + minutes / 60
  })

  const daytimeTimes = parsedTimes.filter(time => time >= 10 && time < 24)
  const opening = daytimeTimes.length ? Math.min(...daytimeTimes) : 12
  const publishedClose = parsedTimes.length ? Math.max(...parsedTimes) : 24
  const closing = publishedClose > opening ? publishedClose : 24
  const slots: TimeSlot[] = []

  for (let time = Math.ceil(opening * 2) / 2; time < closing; time += 0.5) {
    const normalizedHour = Math.floor(time) % 24
    const minutes = time % 1 === 0 ? '00' : '30'
    const value = `${String(normalizedHour).padStart(2, '0')}:${minutes}`
    const displayHour = normalizedHour % 12 || 12
    const meridiem = normalizedHour < 12 ? 'a. m.' : 'p. m.'
    const nextDay = time >= 24 ? ' · día siguiente' : ''
    slots.push({ value, label: `${displayHour}:${minutes} ${meridiem}${nextDay}` })
  }

  return slots
}
