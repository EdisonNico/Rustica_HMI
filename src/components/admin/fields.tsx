'use client'

import { useRef, useState, type ReactNode } from 'react'
import { ApiError, safeImageUrl, uploadImage } from '@/lib/api'

export type FieldErrors = Record<string, string>

const control =
  'min-h-11 w-full rounded-xl border-2 border-field bg-surface px-3 py-2 text-base text-ink placeholder:text-muted aria-[invalid=true]:border-error'

export const id = (name: string) => `f-${name}`

interface BaseProps {
  name: string
  label: string
  error?: string
  hint?: string
  required?: boolean
}

function Wrapper({ name, label, error, hint, required, children }: BaseProps & { children: ReactNode }) {
  return (
    <div className="mb-4">
      <label htmlFor={id(name)} className="mb-1 block font-bold text-ink">
        {label}
        {required && <span className="font-normal text-muted"> (obligatorio)</span>}
      </label>
      {hint && (
        <p id={`${id(name)}-hint`} className="mb-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id(name)}-error`} className="mt-1 text-sm font-semibold text-error">
          <span aria-hidden="true">✕ </span>
          <span className="sr-only">Error: </span>
          {error}
        </p>
      )}
    </div>
  )
}

const aria = (p: BaseProps) => ({
  id: id(p.name),
  'aria-invalid': p.error ? (true as const) : undefined,
  'aria-describedby': [p.hint ? `${id(p.name)}-hint` : '', p.error ? `${id(p.name)}-error` : ''].filter(Boolean).join(' ') || undefined,
  'aria-required': p.required || undefined,
})

export function TextField({ type = 'text', value, onChange, maxLength, min, ...p }: BaseProps & {
  type?: 'text' | 'date' | 'time' | 'number'
  value: string
  onChange: (v: string) => void
  maxLength?: number
  min?: string
}) {
  return (
    <Wrapper {...p}>
      <input {...aria(p)} type={type} value={value} maxLength={maxLength} min={min} onChange={e => onChange(e.target.value)} className={control} />
    </Wrapper>
  )
}

export function AreaField({ value, onChange, rows = 4, maxLength, ...p }: BaseProps & {
  value: string
  onChange: (v: string) => void
  rows?: number
  maxLength?: number
}) {
  return (
    <Wrapper {...p}>
      <textarea {...aria(p)} rows={rows} value={value} maxLength={maxLength} onChange={e => onChange(e.target.value)} className={control} />
    </Wrapper>
  )
}

export function SelectField({ value, onChange, options, placeholder, ...p }: BaseProps & {
  value: string
  onChange: (v: string) => void
  options: Array<{ value: string; label: string }>
  placeholder?: string
}) {
  return (
    <Wrapper {...p}>
      <select {...aria(p)} value={value} onChange={e => onChange(e.target.value)} className={control}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Wrapper>
  )
}

export function CheckField({ name, label, hint, checked, onChange }: {
  name: string
  label: string
  hint?: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="mb-3 flex items-start gap-3">
      <input
        id={id(name)}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        aria-describedby={hint ? `${id(name)}-hint` : undefined}
        className="mt-1 size-6 shrink-0 cursor-pointer accent-[var(--color-brand)]"
      />
      <div>
        <label htmlFor={id(name)} className="cursor-pointer font-semibold text-ink">
          {label}
        </label>
        {hint && (
          <p id={`${id(name)}-hint`} className="text-sm text-muted">
            {hint}
          </p>
        )}
      </div>
    </div>
  )
}

/** Resumen de errores al enviar: lleva el foco y cada error enlaza a su campo. */
export function ErrorSummary({ errors, labels, general, summaryRef }: {
  errors: FieldErrors
  labels: Record<string, string>
  general?: string
  summaryRef: React.RefObject<HTMLDivElement | null>
}) {
  const entries = Object.entries(errors)
  if (entries.length === 0 && !general) return <div ref={summaryRef} tabIndex={-1} className="sr-only" />
  return (
    <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-5 rounded-xl border-2 border-l-8 border-error bg-error-tint p-4 text-ink">
      <p className="font-bold">
        <span aria-hidden="true">✕ </span>
        {general ?? 'Revisa estos campos antes de guardar:'}
      </p>
      {entries.length > 0 && (
        <ul className="mt-2 list-disc pl-5">
          {entries.map(([name, message]) => (
            <li key={name}>
              <a
                href={`#${id(name)}`}
                className="font-semibold underline underline-offset-2"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(id(name))?.focus()
                }}
              >
                {labels[name] ?? name}
              </a>
              : {message}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const MAX_BYTES = 5 * 1024 * 1024
const TYPES = ['image/jpeg', 'image/png', 'image/webp']

/** Subida de imagen con vista previa. `value` es la ruta guardada; `preview`, la URL para mostrarla. */
export function ImageField({ name, label, hint, token, folder, value, preview, onChange, onUnauthorized, error }: {
  name: string
  label: string
  hint?: string
  token: string
  folder: 'dishes' | 'shows' | 'promotions' | 'news' | 'hero'
  value: string
  preview: string
  onChange: (path: string, url: string) => void
  onUnauthorized: () => void
  error?: string
}) {
  const input = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<{ kind: 'idle' | 'busy' | 'ok' | 'fail'; message: string }>({ kind: 'idle', message: '' })

  async function pick(file: File | undefined) {
    if (!file) return
    if (!TYPES.includes(file.type)) return setState({ kind: 'fail', message: 'Usa una imagen JPG, PNG o WebP.' })
    if (file.size > MAX_BYTES) return setState({ kind: 'fail', message: 'La imagen supera los 5 MB.' })
    setState({ kind: 'busy', message: 'Subiendo imagen…' })
    try {
      const result = await uploadImage(token, file, folder)
      onChange(result.path, result.url)
      setState({ kind: 'ok', message: 'Imagen subida. Se guardará con el formulario.' })
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) return onUnauthorized()
      setState({ kind: 'fail', message: e instanceof ApiError ? e.message : 'No se pudo subir la imagen.' })
    } finally {
      if (input.current) input.current.value = ''
    }
  }

  return (
    <Wrapper name={name} label={label} hint={hint ?? 'JPG, PNG o WebP de hasta 5 MB.'} error={error}>
      <div className="flex flex-wrap items-start gap-4">
        {safeImageUrl(preview) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={safeImageUrl(preview) ?? undefined} alt="Vista previa de la imagen elegida" className="h-28 w-28 rounded-xl border border-line object-cover" />
        ) : (
          <p className="grid h-28 w-28 place-items-center rounded-xl border-2 border-dashed border-field p-2 text-center text-sm text-muted">Sin imagen</p>
        )}
        <div className="space-y-2">
          <input
            {...aria({ name, label, error, hint: hint ?? 'x' })}
            ref={input}
            type="file"
            accept={TYPES.join(',')}
            onChange={e => pick(e.target.files?.[0])}
            className="block max-w-full text-sm text-ink file:mr-3 file:min-h-11 file:cursor-pointer file:rounded-xl file:border-0 file:bg-red file:px-4 file:py-2 file:font-bold file:text-white"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('', '')
                setState({ kind: 'idle', message: '' })
              }}
              className="min-h-11 cursor-pointer text-sm font-bold text-brand underline underline-offset-4"
            >
              Quitar imagen
            </button>
          )}
        </div>
      </div>
      <p role="status" className={`mt-2 text-sm ${state.kind === 'fail' ? 'font-semibold text-error' : 'text-muted'}`}>
        {state.kind === 'fail' && <span aria-hidden="true">✕ </span>}
        {state.message}
      </p>
    </Wrapper>
  )
}
