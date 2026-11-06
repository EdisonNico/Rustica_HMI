'use client'

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { Dialog, DialogHeader, DialogPanel } from './Dialog'
import { primaryButton } from './ui'
import { branchGroups, locationGroups } from '@/data/locations'
import { reservationTimesFor } from '@/lib/reservation'
import { formatLongDate } from '@/lib/format'

type FieldName = 'name' | 'email' | 'phone' | 'date' | 'time'
type Errors = Partial<Record<FieldName, string>>

const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/
const TITLE_ID = 'reserva-titulo'
const allLocations = locationGroups.flatMap(group => group.locations)

const pad = (n: number) => String(n).padStart(2, '0')
const todayIso = () => {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Mensajes con la causa y cómo corregirlos (WCAG 3.3.1 y 3.3.3). */
function validate(v: { name: string; email: string; phone: string; date: string; time: string }, minDate: string): Errors {
  const errors: Errors = {}
  if (!NAME_RE.test(v.name.trim())) errors.name = 'Escribe tu nombre completo usando solo letras. Ejemplo: María García.'
  if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Escribe un correo válido, por ejemplo: nombre@gmail.com.'
  if (!/^\d{9}$/.test(v.phone)) errors.phone = 'Escribe un teléfono de 9 dígitos, sin espacios ni prefijo. Ejemplo: 912345678.'
  if (!v.date) errors.date = 'Elige la fecha de tu reserva.'
  else if (v.date < minDate) errors.date = 'La fecha ya pasó. Elige hoy o un día posterior.'
  if (!v.time) errors.time = 'Elige una hora de la lista.'
  return errors
}

const inputBase =
  'w-full rounded-lg border-2 bg-white px-4 py-2.5 text-base text-ink min-h-11'

/** Campo con etiqueta asociada, ayuda opcional y mensaje de error (texto + ícono). */
function Field({
  fieldId,
  label,
  hint,
  error,
  children,
}: {
  fieldId: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1 block text-sm font-semibold text-ink">
        {label}
      </label>
      {hint && (
        <p id={`${fieldId}-hint`} className="mb-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${fieldId}-error`} className="mt-1 flex gap-1.5 text-sm font-semibold text-red">
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

export function ReservationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} labelledBy={TITLE_ID}>
      <ReservationForm onClose={onClose} />
    </Dialog>
  )
}

function ReservationForm({ onClose }: { onClose: () => void }) {
  const uid = useId()
  const minDate = useMemo(todayIso, [])
  const [values, setValues] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', branch: 'barranco' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const location = allLocations.find(item => item.value === values.branch)
  const slots = useMemo(() => reservationTimesFor(location?.attention ?? 'No indicado'), [location])

  const set = (key: keyof typeof values, value: string) => setValues(current => ({ ...current, [key]: value }))
  const id = (key: string) => `${uid}-${key}`
  const errorList = (Object.entries(errors) as [FieldName, string][]).filter(([, message]) => message)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])
  useEffect(() => {
    if (submitted) confirmRef.current?.focus()
  }, [submitted])
  useEffect(() => {
    if (errorList.length) summaryRef.current?.focus()
    // solo cuando se genera un nuevo resumen de errores
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate(values, minDate)
    setErrors(found)
    if (Object.keys(found).length === 0) setSubmitted(true)
  }

  // Si cambia el local, la hora elegida se conserva solo si sigue disponible.
  function changeBranch(branch: string) {
    const next = allLocations.find(item => item.value === branch)
    const nextSlots = reservationTimesFor(next?.attention ?? 'No indicado')
    setValues(current => ({
      ...current,
      branch,
      time: nextSlots.some(slot => slot.value === current.time) ? current.time : '',
    }))
  }

  if (submitted) {
    const time = slots.find(slot => slot.value === values.time)?.label ?? values.time
    return (
      <DialogPanel size="sm">
        <div className="p-10 text-center">
          <p className="mb-4 text-5xl" aria-hidden="true">
            🎉
          </p>
          <h2 id={TITLE_ID} ref={confirmRef} tabIndex={-1} className="mb-3 font-display text-2xl font-bold text-red">
            ¡Reserva confirmada!
          </h2>
          <div role="status" className="mb-6 space-y-1 text-body">
            <p>
              Gracias, <strong>{values.name.trim()}</strong>.
            </p>
            <p>
              Te esperamos en <strong>Rústica {location?.label}</strong> el <strong>{formatLongDate(values.date)}</strong> a las{' '}
              <strong>{time}</strong>.
            </p>
          </div>
          <button type="button" onClick={onClose} className={`${primaryButton} w-full py-3`}>
            Cerrar
          </button>
        </div>
      </DialogPanel>
    )
  }

  const describedBy = (key: FieldName, hint?: boolean) =>
    [hint ? `${id(key)}-hint` : '', errors[key] ? `${id(key)}-error` : ''].filter(Boolean).join(' ') || undefined

  const border = (key: FieldName) => (errors[key] ? 'border-red' : 'border-field')

  return (
    <DialogPanel size="md">
      <DialogHeader eyebrow="Rústica Perú" title="Hacer reserva" titleId={TITLE_ID} onClose={onClose} />
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4 px-8 py-6">
        <p className="text-sm text-muted">Todos los campos son obligatorios.</p>

        {errorList.length > 0 && (
          <div ref={summaryRef} tabIndex={-1} className="rounded-xl border-2 border-red bg-red-tint p-4">
            <h3 className="mb-2 font-bold text-red-dark">
              Revisa {errorList.length === 1 ? 'este campo' : `estos ${errorList.length} campos`}
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-ink">
              {errorList.map(([key, message]) => (
                <li key={key}>
                  <a href={`#${id(key)}`} className="underline" onClick={e => { e.preventDefault(); document.getElementById(id(key))?.focus() }}>
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Field fieldId={id('name')} label="Nombre completo" error={errors.name}>
          <input
            ref={nameRef}
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ej. María García"
            value={values.name}
            onChange={e => set('name', e.target.value)}
            required
            aria-invalid={!!errors.name}
            aria-describedby={describedBy('name')}
            className={`${inputBase} ${border('name')}`}
          />
        </Field>

        <Field fieldId={id('email')} label="Correo electrónico" error={errors.email}>
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={values.email}
            onChange={e => set('email', e.target.value)}
            required
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            className={`${inputBase} ${border('email')}`}
          />
        </Field>

        <Field fieldId={id('phone')} label="Teléfono" hint="9 dígitos, solo números." error={errors.phone}>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={9}
            placeholder="Ej. 912345678"
            value={values.phone}
            onChange={e => set('phone', e.target.value.replace(/\D/g, '').slice(0, 9))}
            required
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy('phone', true)}
            className={`${inputBase} ${border('phone')}`}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field fieldId={id('date')} label="Fecha" error={errors.date}>
            <input
              id={id('date')}
              name="date"
              type="date"
              min={minDate}
              value={values.date}
              onChange={e => set('date', e.target.value)}
              required
              aria-invalid={!!errors.date}
              aria-describedby={describedBy('date')}
              className={`${inputBase} ${border('date')}`}
            />
          </Field>
          <Field fieldId={id('time')} label="Hora" error={errors.time}>
            <select
              id={id('time')}
              name="time"
              value={values.time}
              onChange={e => set('time', e.target.value)}
              required
              aria-invalid={!!errors.time}
              aria-describedby={describedBy('time')}
              className={`${inputBase} ${border('time')} cursor-pointer`}
            >
              <option value="">Selecciona una hora</option>
              {slots.map(slot => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={id('guests')} className="mb-1 block text-sm font-semibold text-ink">
              Personas
            </label>
            <select
              id={id('guests')}
              name="guests"
              value={values.guests}
              onChange={e => set('guests', e.target.value)}
              className={`${inputBase} cursor-pointer border-field`}
            >
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map(n => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={id('branch')} className="mb-1 block text-sm font-semibold text-ink">
              Local
            </label>
            <select
              id={id('branch')}
              name="branch"
              value={values.branch}
              onChange={e => changeBranch(e.target.value)}
              className={`${inputBase} cursor-pointer border-field`}
            >
              {branchGroups.map(group => (
                <optgroup key={group.label} label={group.label}>
                  {group.branches.map(branch => (
                    <option key={branch.value} value={branch.value}>
                      {branch.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className={`${primaryButton} mt-2 w-full py-3 text-base`}>
          Confirmar reserva
        </button>
      </form>
    </DialogPanel>
  )
}
