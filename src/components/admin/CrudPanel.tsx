'use client'

import { useCallback, useEffect, useId, useMemo, useState, type ComponentType } from 'react'
import { Dialog, DialogPanel } from '../Dialog'
import { StatusMessage } from '../StatusMessage'
import { adminRequest, ApiError } from '@/lib/api'
import { clearCache } from '@/lib/useRemote'
import type { FormProps, Refs } from './types'

interface Row {
  title: string
  meta: string
  badges: string[]
}

interface Props<T extends { id: number }> {
  noun: string
  nounPlural: string
  path: string
  token: string
  refs: Refs
  onUnauthorized: () => void
  describe: (item: T) => Row
  Form: ComponentType<FormProps<T>>
}

const btn = 'min-h-11 cursor-pointer rounded-xl px-4 py-2 text-sm font-bold'

/** Lista con búsqueda + ventana de alta/edición + confirmación de borrado. */
export function CrudPanel<T extends { id: number }>({ noun, nounPlural, path, token, refs, onUnauthorized, describe, Form }: Props<T>) {
  const [items, setItems] = useState<T[] | null>(null)
  const [error, setError] = useState<string>()
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<T | 'new' | null>(null)
  const [deleting, setDeleting] = useState<T | null>(null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const formTitle = useId()
  const confirmTitle = useId()

  const load = useCallback(async () => {
    setError(undefined)
    try {
      setItems(await adminRequest<T[]>('GET', path, token))
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) return onUnauthorized()
      setError(e instanceof ApiError ? e.message : 'No se pudo cargar la lista.')
    }
  }, [path, token, onUnauthorized])

  useEffect(() => {
    setItems(null)
    setQuery('')
    load()
  }, [load])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (items ?? [])
      .map(item => ({ item, row: describe(item) }))
      .filter(({ row }) => !q || `${row.title} ${row.meta}`.toLowerCase().includes(q))
  }, [items, query, describe])

  async function remove(item: T) {
    setBusy(true)
    try {
      await adminRequest('DELETE', `${path}/${item.id}`, token)
      clearCache()
      setMessage(`Se eliminó: ${describe(item).title}.`)
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
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-60 flex-1">
          <label htmlFor={`${formTitle}-q`} className="mb-1 block font-bold text-ink">
            Buscar {nounPlural}
          </label>
          <input
            id={`${formTitle}-q`}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="min-h-11 w-full rounded-xl border-2 border-field bg-surface px-3 text-base text-ink"
          />
        </div>
        <button type="button" onClick={() => setEditing('new')} className={`${btn} bg-red text-white hover:bg-red-dark`}>
          Nuevo {noun}
        </button>
      </div>

      <p role="status" className="mb-4 text-sm text-muted">
        {message || (items ? `${rows.length} de ${items.length} ${nounPlural}` : 'Cargando…')}
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

      <ul className="space-y-3">
        {rows.map(({ item, row }) => (
          <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4">
            <div className="min-w-0 flex-1">
              <p className="font-bold text-ink">{row.title}</p>
              <p className="text-sm text-muted">{row.meta}</p>
              {row.badges.length > 0 && (
                <ul className="mt-1 flex flex-wrap gap-2">
                  {row.badges.map(b => (
                    <li key={b} className="rounded-full border border-field px-2 py-0.5 text-xs font-semibold text-ink">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditing(item)} aria-label={`Editar ${row.title}`} className={`${btn} border-2 border-field text-ink`}>
                Editar
              </button>
              <button type="button" onClick={() => setDeleting(item)} aria-label={`Eliminar ${row.title}`} className={`${btn} border-2 border-error text-error`}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={editing !== null} onClose={() => setEditing(null)} labelledBy={formTitle}>
        {editing !== null && (
          <DialogPanel size="2xl">
            <Form
              item={editing === 'new' ? null : editing}
              token={token}
              refs={refs}
              titleId={formTitle}
              onUnauthorized={onUnauthorized}
              onCancel={() => setEditing(null)}
              onSaved={() => {
                clearCache()
                setMessage(editing === 'new' ? `Se creó el ${noun}.` : `Se guardaron los cambios del ${noun}.`)
                setEditing(null)
                load()
              }}
            />
          </DialogPanel>
        )}
      </Dialog>

      <Dialog open={deleting !== null} onClose={() => setDeleting(null)} labelledBy={confirmTitle}>
        {deleting && (
          <DialogPanel size="sm">
            <div className="p-6">
              <h2 id={confirmTitle} className="mb-3 font-display text-xl font-bold text-ink">
                ¿Eliminar este {noun}?
              </h2>
              <p className="mb-6 text-body">
                «{describe(deleting).title}» se borrará para siempre. Si solo quieres ocultarlo, edítalo y desmarca «Visible».
              </p>
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
