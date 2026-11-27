'use client'

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { Dialog, DialogHeader, DialogPanel, SheetHandle } from './Dialog'
import { primaryButton } from './ui'
import { branchGroups, locationGroups } from '@/data/locations'
import { reservationTimesFor } from '@/lib/reservation'
import { formatLongDate } from '@/lib/format'
import { apiEnabled, ApiError, createReservation } from '@/lib/api'
import { useSwipe } from '@/lib/useSwipe'

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
  'w-full rounded-lg border-2 bg-surface px-4 py-2.5 text-base text-ink min-h-11'

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
        <p id={`${fieldId}-error`} className="mt-1 flex gap-1.5 text-sm font-semibold text-error">
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

export function ReservationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog sheet open={open} onClose={onClose} labelledBy={TITLE_ID}>
      <ReservationForm onClose={onClose} />
    </Dialog>
  )
}

const STEPS = ['Local y fecha', 'Tus datos', 'Confirmar'] as const
const STEP_FIELDS: FieldName[][] = [['date', 'time'], ['name', 'email', 'phone'], []]

/** Reserva en 3 pasos pensada para una mano: botones grandes abajo, progreso visible y gesto de deslizar como atajo. */
function ReservationForm({ onClose }: { onClose: () => void }) {
  const uid = useId()
  const minDate = useMemo(todayIso, [])
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', branch: 'barranco' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [serverError, setServerError] = useState('')
  const [website, setWebsite] = useState('') // campo trampa: las personas no lo ven ni lo llenan
  const summaryRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLHeadingElement>(null)
  const stepRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  const location = allLocations.find(item => item.value === values.branch)
  const slots = useMemo(() => reservationTimesFor(location?.attention ?? 'No indicado'), [location])

  const set = (key: keyof typeof values, value: string) => setValues(current => ({ ...current, [key]: value }))
  const id = (key: string) => `${uid}-${key}`
  const errorList = (Object.entries(errors) as [FieldName, string][]).filter(([, message]) => message)

  useEffect(() => {
    if (submitted) confirmRef.current?.focus()
  }, [submitted])
  useEffect(() => {
    if (errorList.length) summaryRef.current?.focus()
    // solo cuando se genera un nuevo resumen de errores
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])
  // Al cambiar de paso el foco pasa al título del paso (lo anuncia el lector de pantalla)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    stepRef.current?.focus()
  }, [step])

  /** Errores de los campos de un paso (la hora que ya pasó hoy también cuenta). */
  function errorsFor(index: number): Errors {
    const all = validate(values, minDate)
    if (!all.time && values.date === minDate && values.time) {
      const now = new Date()
      const current = `${pad(now.getHours())}:${pad(now.getMinutes())}`
      if (values.time < current && values.time >= '06:00') all.time = 'Esa hora ya pasó. Elige una hora posterior.'
    }
    const found: Errors = {}
    for (const key of STEP_FIELDS[index]) if (all[key]) found[key] = all[key]
    return found
  }

  function next() {
    const found = errorsFor(step)
    setErrors(found)
    if (Object.keys(found).length === 0) setStep(current => Math.min(current + 1, STEPS.length - 1))
  }
  const back = () => {
    setErrors({})
    setStep(current => Math.max(current - 1, 0))
  }
  const swipe = useSwipe(() => step < STEPS.length - 1 && next(), () => step > 0 && back())

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step < STEPS.length - 1) return next()
    if (sending) return
    const found = { ...errorsFor(0), ...errorsFor(1) }
    setErrors(found)
    setServerError('')
    if (Object.keys(found).length > 0) {
      setStep(errorsFor(0) && Object.keys(errorsFor(0)).length ? 0 : 1)
      return
    }
    if (!apiEnabled) {
      setServerError('Por ahora no podemos recibir reservas en línea. Escríbenos por WhatsApp o llama al local.')
      return
    }
    setSending(true)
    try {
      await createReservation({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone,
        date: values.date,
        time: values.time,
        guests: values.guests,
        branch: values.branch,
        branchLabel: location?.label ?? values.branch,
        website,
      })
      setSubmitted(true)
    } catch (err) {
      setServerError(
        err instanceof ApiError && err.status !== 0
          ? err.message
          : 'No pudimos enviar tu reserva. Si el servidor estaba dormido, espera un minuto e inténtalo otra vez.',
      )
    } finally {
      setSending(false)
    }
  }

  // Si cambia el local, la hora elegida se conserva solo si sigue disponible.
  function changeBranch(branch: string) {
    const nextLocation = allLocations.find(item => item.value === branch)
    const nextSlots = reservationTimesFor(nextLocation?.attention ?? 'No indicado')
    setValues(current => ({
      ...current,
      branch,
      time: nextSlots.some(slot => slot.value === current.time) ? current.time : '',
    }))
  }

  const timeLabel = slots.find(slot => slot.value === values.time)?.label ?? values.time

  if (submitted) {
    return (
      <DialogPanel size="sm">
        <SheetHandle />
        <div className="p-10 text-center">
          <p className="mb-4 text-5xl" aria-hidden="true">
            🎉
          </p>
          <h2 id={TITLE_ID} ref={confirmRef} tabIndex={-1} className="mb-3 font-display text-2xl font-bold text-brand">
            ¡Reserva recibida!
          </h2>
          <div role="status" className="mb-6 space-y-1 text-body">
            <p>
              Gracias, <strong>{values.name.trim()}</strong>.
            </p>
            <p>
              Te esperamos en <strong>Rústica {location?.label}</strong> el <strong>{formatLongDate(values.date)}</strong> a las{' '}
              <strong>{timeLabel}</strong>.
            </p>
            <p className="pt-2 text-sm text-muted">El local la revisará y te contactará al teléfono o correo que indicaste para confirmarla.</p>
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
  const border = (key: FieldName) => (errors[key] ? 'border-error' : 'border-field')
  const last = step === STEPS.length - 1

  return (
    <DialogPanel size="md">
      <SheetHandle />
      <DialogHeader eyebrow="Rústica Perú" title="Hacer reserva" titleId={TITLE_ID} onClose={onClose} />
      <form noValidate onSubmit={onSubmit} {...swipe} className="flex flex-col">
        {/* Progreso: texto + barra (la barra es solo refuerzo visual) */}
        <div className="px-6 pt-5 sm:px-8">
          <p className="mb-2 text-sm font-semibold text-muted">
            Paso {step + 1} de {STEPS.length}
          </p>
          <ol className="flex gap-2" aria-label="Pasos de la reserva">
            {STEPS.map((label, index) => (
              <li key={label} aria-current={index === step ? 'step' : undefined} className="flex-1">
                <span aria-hidden="true" className={`block h-2 rounded-full ${index <= step ? 'bg-red' : 'bg-line'}`} />
                <span className={`mt-1 block text-xs ${index === step ? 'font-bold text-ink' : 'text-muted'}`}>
                  <span className="sr-only">{index < step ? 'Completado: ' : index === step ? 'Actual: ' : 'Pendiente: '}</span>
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5 sm:px-8">
          <h3 ref={stepRef} tabIndex={-1} className="font-display text-xl font-bold text-ink outline-none">
            {step === 0 && '¿Dónde y cuándo?'}
            {step === 1 && '¿A nombre de quién?'}
            {step === 2 && 'Revisa y confirma'}
          </h3>

          {errorList.length > 0 && (
            <div ref={summaryRef} tabIndex={-1} className="rounded-xl border-2 border-error bg-error-tint p-4">
              <h4 className="mb-2 font-bold text-error">Revisa {errorList.length === 1 ? 'este campo' : `estos ${errorList.length} campos`}</h4>
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

          {step === 0 && (
            <>
              <div>
                <label htmlFor={id('branch')} className="mb-1 block text-sm font-semibold text-ink">
                  Local
                </label>
                <select
                  id={id('branch')}
                  name="branch"
                  data-autofocus
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
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
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
                    className={`${inputBase} ${border('date')} min-w-0 max-w-full`}
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
                    <option value="">Selecciona</option>
                    {slots.map(slot => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <div>
                <label htmlFor={id('guests')} className="mb-1 block text-sm font-semibold text-ink">
                  Personas
                </label>
                <select id={id('guests')} name="guests" value={values.guests} onChange={e => set('guests', e.target.value)} className={`${inputBase} cursor-pointer border-field`}>
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <Field fieldId={id('name')} label="Nombre completo" error={errors.name}>
                <input
                  id={id('name')}
                  data-autofocus
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
            </>
          )}

          {step === 2 && (
            <dl className="divide-y divide-line rounded-xl border border-line">
              {[
                ['Local', `Rústica ${location?.label}`, 0],
                ['Fecha', formatLongDate(values.date), 0],
                ['Hora', timeLabel, 0],
                ['Personas', values.guests, 0],
                ['Nombre', values.name.trim(), 1],
                ['Correo', values.email.trim(), 1],
                ['Teléfono', values.phone, 1],
              ].map(([term, value, target]) => (
                <div key={term as string} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <dt className="text-xs font-bold uppercase tracking-wider text-brand">{term}</dt>
                    <dd className="break-words text-sm text-ink">{value}</dd>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(target as number)}
                    aria-label={`Cambiar ${(term as string).toLowerCase()}`}
                    className="min-h-11 shrink-0 cursor-pointer rounded-lg px-3 text-sm font-bold text-brand underline underline-offset-4"
                  >
                    Cambiar
                  </button>
                </div>
              ))}
            </dl>
          )}

          {/* Campo trampa contra robots: oculto para personas y lectores de pantalla */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              No llenar este campo
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
            </label>
          </div>

          {serverError && (
            <div role="alert" className="rounded-xl border-2 border-l-8 border-error bg-error-tint p-4 text-sm font-semibold text-ink">
              <span aria-hidden="true">✕ </span>
              <span className="sr-only">Error: </span>
              {serverError}
            </div>
          )}
        </div>

        {/* Botones fijos abajo: zona del pulgar. El gesto de deslizar es solo un atajo de estos botones. */}
        <div className="sticky bottom-0 flex gap-3 border-t border-line bg-surface px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
          {step > 0 && (
            <button type="button" onClick={back} className="min-h-12 flex-1 cursor-pointer rounded-xl border-2 border-field px-4 text-base font-bold text-ink hover:bg-cream">
              Atrás
            </button>
          )}
          <button type="submit" disabled={sending} className={`${primaryButton} min-h-12 flex-[2] justify-center text-base disabled:opacity-60`}>
            {last ? (sending ? 'Enviando…' : 'Enviar reserva') : 'Siguiente'}
          </button>
        </div>
      </form>
    </DialogPanel>
  )
}
