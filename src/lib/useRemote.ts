'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { apiEnabled, apiGet } from './api'
import {
  groupBranches,
  toHome,
  toMenu,
  toNews,
  toPromotion,
  toShow,
  type ApiBranch,
  type ApiHome,
  type ApiMenu,
  type ApiNews,
  type ApiPromotion,
  type ApiShow,
} from './content'

/**
 * loading → pidiendo datos y todavía no hay nada que mostrar
 * live    → hay datos de la API (recién llegados o de la última visita)
 * error   → la API no respondió (si había datos de la última visita se siguen mostrando)
 *
 * No hay datos "de relleno": si no llegó nada de la API, no se muestra contenido inventado.
 */
export type RemoteStatus = 'loading' | 'live' | 'error'

const FRESH_MS = 60_000 // dentro de la misma visita, sin volver a pedir
const STORE_MS = 30 * 60_000 // última respuesta guardada para pintar al instante al refrescar
const PREFIX = 'rustica-cache:'
const memory = new Map<string, { at: number; raw: unknown }>()

function readStore(path: string): { at: number; raw: unknown } | null {
  try {
    const value = JSON.parse(localStorage.getItem(PREFIX + path) ?? 'null')
    return value && typeof value.at === 'number' && Date.now() - value.at < STORE_MS ? value : null
  } catch {
    return null
  }
}

/** Se llama al guardar o borrar desde el panel: así el navegador no muestra lo anterior. */
export function clearCache() {
  memory.clear()
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key))
  } catch {
    /* sin almacenamiento */
  }
}

interface Remote<T> {
  data: T | null
  status: RemoteStatus
  reload: () => void
}

/** `path` = null espera (por ejemplo hasta conocer la sede). */
function useRemote<T, R>(path: string | null, map: (raw: R) => T): Remote<T> {
  const mapRef = useRef(map)
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<{ data: T | null; status: RemoteStatus }>({ data: null, status: 'loading' })

  useEffect(() => {
    if (!path) return
    if (!apiEnabled) {
      setState({ data: null, status: 'error' })
      return
    }
    const cached = attempt === 0 ? (memory.get(path) ?? readStore(path)) : null
    if (cached) {
      setState({ data: mapRef.current(cached.raw as R), status: 'live' })
      if (Date.now() - cached.at < FRESH_MS) return
    } else {
      setState(prev => ({ data: prev.data, status: 'loading' }))
    }
    const controller = new AbortController()
    apiGet<R>(path, controller.signal)
      .then(raw => {
        const entry = { at: Date.now(), raw }
        memory.set(path, entry)
        try {
          localStorage.setItem(PREFIX + path, JSON.stringify(entry))
        } catch {
          /* sin almacenamiento */
        }
        setState({ data: mapRef.current(raw), status: 'live' })
      })
      .catch(() => {
        if (!controller.signal.aborted) setState(prev => ({ data: prev.data, status: 'error' }))
      })
    return () => controller.abort()
  }, [path, attempt])

  const reload = useCallback(() => setAttempt(n => n + 1), [])
  return { ...state, reload }
}

export const useBranches = () => useRemote('/api/branches', (raw: ApiBranch[]) => groupBranches(raw))

/** Carta de una sede; con `branch` = null espera a conocerla. */
export const useMenu = (branch: string | null) =>
  useRemote(branch ? '/api/menu?branch=' + encodeURIComponent(branch) : null, (raw: ApiMenu) => toMenu(raw))

export const useHome = () => useRemote('/api/home', (raw: ApiHome) => toHome(raw))
export const useShows = () => useRemote('/api/shows?upcoming=true', (raw: ApiShow[]) => raw.map(toShow))
export const usePromotions = () => useRemote('/api/promotions', (raw: ApiPromotion[]) => raw.map(toPromotion))
export const useNews = () => useRemote('/api/news', (raw: ApiNews[]) => raw.map(toNews))
