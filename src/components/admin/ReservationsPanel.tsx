'use client'

import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { Dialog, DialogPanel } from '../Dialog'
import { StatusMessage } from '../StatusMessage'
import { adminRequest, ApiError } from '@/lib/api'
import { formatLongDate } from '@/lib/format'
import { formatTime } from '@/lib/content'
import type { AdminReservation, ReservationStatus } from './types'

const STATUS: Record<ReservationStatus, { label: string; icon: string }> = {
  pending: { label: 'Pendiente', icon: '◔' },
  confirmed: { label: 'Confirmada', icon: '✓' },
  cancelled: { label: 'Cancelada', icon: '✕' },
}
const FILTERS: Array<{ key: ReservationStatus | 'all'; label: string }> = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendientes' },
  { key: 'confirmed', label: 'Confirmadas' },
  { key: 'cancelled', label: 'Canceladas' },
]

const btn = 'min-h-11 cursor-pointer rounded-xl px-4 py-2 text-sm font-bold'

/** Reservas enviadas desde el sitio: se ven, se confirman, se cancelan o se borran. */
export function ReservationsPanel({ token, onUnauthorized }: { token: string; onUnauthorized: () => void }) {
  const [items, setItems] = useState<AdminReservation[] | null>(null)
  const [error, setError] = useState<string>()
  const [filter, setFilter] = useState<ReservationStatus | 'all'>('pending')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [deleting, setDeleting] = useState<AdminReservation | null>(null)
  const [busy, setBusy] = useState(false)
  const uid = useId()
  const confirmTitle = useId()

  const load = useCallback(async () => {
    setError(undefined)
    try {
      setItems(await adminRequest<AdminReservation[]>('GET', '/api/admin/reservations', token))
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) return onUnauthorized()
      setError(e instanceof ApiError ? e.message : 'No se pudieron cargar las reservas.')
    }
  }, [token, onUnauthorized])

  useEffect(() => {
    load()
  }, [load])

  const counts = useMemo(() => {
    const c = { all: 0, pending: 0, confirmed: 0, cancelled: 0 }
    for (const r of items ?? []) {
      c.all++
      c[r.status]++
    }
    return c
  }, [items])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (items ?? [])
      .filter(r => filter === 'all' || r.status === filter)
      .filter(r => !q || `${r.name} ${r.email} ${r.phone} ${r.branchLabel}`.toLowerCase().includes(q))
  }, [items, filter, query])

  async function setStatus(r: AdminReservation, status: ReservationStatus) {
    try {
      await adminRequest('PUT', `/api/admin/reservations/${r.id}/status`, token, { status })
      setMessage(`Reserva de ${r.name}: ${STATUS[status].label.toLowerCase()}.`)
      await load()
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) return onUnauthorized()
      setMessage(e instanceof ApiError ? e.message : 'No se pudo cambiar el estado.')
    }
  }

  async function remove(r: AdminReservation) {
    setBusy(true)
    try {
      await adminRequest('DELETE', `/api/admin/reservations/${r.id}`, token)
      setMessage(`Se eliminó la reserva de ${r.name}.`)
      setDeleting(null)
      await load()
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) return onUnauthorized()
      setMessage(e instanceof ApiError ? e.message : 'No se pudo eliminar.')
      setDeleting(null)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-60 flex-1">
          <label htmlFor={`${uid}-q`} className="mb-1 block font-bold text-ink">
            Buscar reservas
          </label>
          <input
            id={`${uid}-q`}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Nombre, correo, teléfono o local"
            className="min-h-11 w-full rounded-xl border-2 border-field bg-surface px-3 text-base text-ink placeholder:text-muted"
          />
        </div>
        <button type="button" onClick={load} className={`${btn} border-2 border-field text-ink`}>
          Actualizar
        </button>
      </div>

      <div role="group" aria-label="Filtrar por estado" className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`${btn} border-2 ${filter === f.key ? 'border-red bg-red text-white' : 'border-field bg-surface text-ink hover:border-red'}`}
          >
            {f.label} ({counts[f.key]})
          </button>
        ))}
      </div>

      <p role="status" className="mb-4 text-sm text-muted">
        {message || (items ? `${rows.length} ${rows.length === 1 ? 'reserva' : 'reservas'}` : 'Cargando…')}
      </p>

      {error && (
        <div className="mb-4">
          <StatusMessage kind="error">
            {error}{' '}
            <button type="button" onClick={load} className="min-h-11 cursor-pointer font-bold underline underline-offset-4">
              Reintentar
            </button>
          </StatusMessage>
        </div>
      )}

      {items && rows.length === 0 && !error && <StatusMessage kind="info">No hay reservas en esta lista.</StatusMessage>}

      <ul className="space-y-3">
        {rows.map(r => (
          <li key={r.id} className="rounded-xl border border-line bg-surface p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink">{r.name}</p>
                <p className="text-sm text-body">
                  {formatLongDate(r.date)} · {formatTime(r.time)} · {r.guests} {r.guests === '1' ? 'persona' : 'personas'}
                </p>
                <p className="text-sm text-muted">Rústica {r.branchLabel}</p>
                <p className="mt-1 text-sm">
                  <a href={`tel:+51${r.phone}`} className="font-semibold text-brand underline underline-offset-2">
                    {r.phone}
                  </a>
                  {' · '}
                  <a href={`mailto:${r.email}`} className="font-semibold text-brand underline underline-offset-2">
                    {r.email}
                  </a>
                </p>
                <p className="mt-1 text-xs text-muted">Enviada el {new Date(r.createdAt).toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
              </div>
              <span className="rounded-full border-2 border-field px-3 py-1 text-xs font-bold text-ink">
                <span aria-hidden="true">{STATUS[r.status].icon} </span>
                {STATUS[r.status].label}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {r.status !== 'confirmed' && (
                <button type="button" onClick={() => setStatus(r, 'confirmed')} aria-label={`Confirmar la reserva de ${r.name}`} className={`${btn} bg-red text-white hover:bg-red-dark`}>
                  Confirmar
                </button>
              )}
              {r.status !== 'cancelled' && (
                <button type="button" onClick={() => setStatus(r, 'cancelled')} aria-label={`Cancelar la reserva de ${r.name}`} className={`${btn} border-2 border-field text-ink`}>
                  Cancelar
                </button>
              )}
              {r.status !== 'pending' && (
                <button type="button" onClick={() => setStatus(r, 'pending')} aria-label={`Volver a pendiente la reserva de ${r.name}`} className={`${btn} border-2 border-field text-ink`}>
                  Pendiente
                </button>
              )}
              <button type="button" onClick={() => setDeleting(r)} aria-label={`Eliminar la reserva de ${r.name}`} className={`${btn} border-2 border-error text-error`}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={deleting !== null} onClose={() => setDeleting(null)} labelledBy={confirmTitle}>
        {deleting && (
          <DialogPanel size="sm">
            <div className="p-6">
              <h2 id={confirmTitle} className="mb-3 font-display text-xl font-bold text-ink">
                ¿Eliminar esta reserva?
              </h2>
              <p className="mb-6 text-body">La reserva de «{deleting.name}» se borrará para siempre.</p>
              <div className="flex flex-wrap justify-end gap-3">
                <button type="button" data-autofocus onClick={() => setDeleting(null)} className={`${btn} border-2 border-field text-ink`}>
                  Cancelar
                </button>
                <button type="button" disabled={busy} onClick={() => remove(deleting)} className={`${btn} bg-red text-white hover:bg-red-dark disabled:opacity-60`}>
                  {busy ? 'Eliminando…' : 'Sí, eliminar'}
                </button>
              </div>
            </div>
          </DialogPanel>
        )}
      </Dialog>
    </div>
  )
}
