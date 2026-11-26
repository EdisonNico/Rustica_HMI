'use client'

import { useRef, useState } from 'react'
import { ApiError } from '@/lib/api'
import type { FieldErrors } from './fields'

/** Envío de formularios: valida en el cliente, muestra los errores del servidor y devuelve el foco al resumen. */
export function useForm(onUnauthorized: () => void, onSaved: () => void) {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [general, setGeneral] = useState<string>()
  const [saving, setSaving] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  const fail = (fields: FieldErrors, message?: string) => {
    setErrors(fields)
    setGeneral(message)
    setTimeout(() => summaryRef.current?.focus(), 0)
  }

  async function submit(local: FieldErrors, send: () => Promise<unknown>) {
    if (Object.keys(local).length > 0) return fail(local)
    setErrors({})
    setGeneral(undefined)
    setSaving(true)
    try {
      await send()
      onSaved()
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) return onUnauthorized()
      if (e instanceof ApiError) fail(e.fields, Object.keys(e.fields).length ? undefined : e.message)
      else fail({}, 'No se pudo guardar.')
    } finally {
      setSaving(false)
    }
  }

  return { errors, general, saving, summaryRef, submit }
}

export const required = (value: string, message = 'Este campo es obligatorio.') => (value.trim() ? undefined : message)

export const collect = (checks: Record<string, string | undefined>): FieldErrors =>
  Object.fromEntries(Object.entries(checks).filter(([, message]) => message)) as FieldErrors
