'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { StatusMessage } from '../StatusMessage'
import { CrudPanel } from './CrudPanel'
import { HeroPanel } from './HeroPanel'
import { DishForm, NewsForm, PromotionForm, ShowForm } from './forms'
import { TextField } from './fields'
import type { AdminDish, AdminNews, AdminPromotion, AdminShow, Refs } from './types'
import { apiEnabled, apiGet, ApiError, login } from '@/lib/api'
import type { ApiBranch, ApiCategory } from '@/lib/content'

/** El token vive solo en sessionStorage: se borra al cerrar la pestaña. */
const TOKEN_KEY = 'rustica-admin-token'
const readToken = () => {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? ''
  } catch {
    return ''
  }
}
const writeToken = (value: string) => {
  try {
    if (value) sessionStorage.setItem(TOKEN_KEY, value)
    else sessionStorage.removeItem(TOKEN_KEY)
  } catch {
    /* sin almacenamiento: la sesión dura mientras no se recargue */
  }
}

const SECTIONS = [
  { key: 'dishes', label: 'Platos' },
  { key: 'shows', label: 'Shows' },
  { key: 'promotions', label: 'Promociones' },
  { key: 'news', label: 'Novedades' },
  { key: 'hero', label: 'Imagen principal' },
] as const
type SectionKey = (typeof SECTIONS)[number]['key']

const describeDish = (d: AdminDish) => ({
  title: d.name,
  meta: `${d.categorySlug} · ${d.priceLabel} · ${d.branches.length} ${d.branches.length === 1 ? 'sede' : 'sedes'}`,
  badges: [d.featured && 'Destacado', !d.active && 'Oculto'].filter(Boolean) as string[],
})
const describeShow = (s: AdminShow) => ({
  title: s.artist,
  meta: `${s.date}${s.time ? ` ${s.time.slice(0, 5)}` : ''} · ${s.location}`,
  badges: s.active ? [] : ['Oculto'],
})
const describePromotion = (p: AdminPromotion) => ({
  title: p.title,
  meta: [p.priceLabel, p.validUntil && `hasta ${p.validUntil}`].filter(Boolean).join(' · ') || 'Sin precio',
  badges: [p.featured && 'En el Inicio', !p.active && 'Oculto'].filter(Boolean) as string[],
})
const describeNews = (n: AdminNews) => ({
  title: n.title,
  meta: `${n.date ?? 'Sin fecha'} · ${n.category}`,
  badges: n.active ? [] : ['Oculto'],
})

function LoginForm({ onLogin, notice }: { onLogin: (token: string) => void; notice?: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const alert = useRef<HTMLDivElement>(null)

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError('Escribe tu correo y tu contraseña.')
      setTimeout(() => alert.current?.focus(), 0)
      return
    }
    setBusy(true)
    setError('')
    try {
      const { token } = await login(email.trim(), password)
      onLogin(token)
    } catch (err) {
      setError(err instanceof ApiError && err.status !== 0 ? err.message : 'No pudimos conectar con el servidor. Si acaba de despertar, espera un minuto e inténtalo otra vez.')
      setTimeout(() => alert.current?.focus(), 0)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-6">
      <h2 className="mb-4 font-display text-2xl font-bold text-ink">Iniciar sesión</h2>
      {notice && (
        <div className="mb-4">
          <StatusMessage kind="warning">{notice}</StatusMessage>
        </div>
      )}
      <div ref={alert} tabIndex={-1} role={error ? 'alert' : undefined} className="outline-none">
        {error && (
          <div className="mb-4 rounded-xl border-2 border-l-8 border-error bg-error-tint p-4 font-semibold text-ink">
            <span aria-hidden="true">✕ </span>
            <span className="sr-only">Error: </span>
            {error}
          </div>
        )}
      </div>
      <TextField name="email" label="Correo" value={email} onChange={setEmail} maxLength={160} />
      <div className="mb-4">
        <label htmlFor="f-password" className="mb-1 block font-bold text-ink">
          Contraseña
        </label>
        <input
          id="f-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="min-h-11 w-full rounded-xl border-2 border-field bg-surface px-3 py-2 text-base text-ink"
        />
      </div>
      <button type="submit" disabled={busy} className="min-h-11 w-full cursor-pointer rounded-xl bg-red px-5 py-2.5 text-sm font-bold text-white hover:bg-red-dark disabled:opacity-60">
        {busy ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}

export function AdminApp() {
  const [token, setToken] = useState<string | null>(null) // null = todavía leyendo sessionStorage
  const [notice, setNotice] = useState<string>()
  const [section, setSection] = useState<SectionKey>('dishes')
  const [refs, setRefs] = useState<Refs | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const first = useRef(true)

  useEffect(() => setToken(readToken()), [])

  const logout = useCallback((message?: string) => {
    writeToken('')
    setToken('')
    setRefs(null)
    setNotice(message)
  }, [])
  const unauthorized = useCallback(() => logout('Tu sesión terminó. Inicia sesión de nuevo.'), [logout])

  useEffect(() => {
    if (!token) return
    Promise.all([apiGet<ApiBranch[]>('/api/branches'), apiGet<ApiCategory[]>('/api/categories')])
      .then(([branches, categories]) => setRefs({ branches, categories }))
      .catch(() => setNotice('No se pudieron cargar las sedes y categorías. Recarga la página.'))
  }, [token])

  // Al cambiar de sección el foco pasa al título, para que el lector de pantalla lo anuncie
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    heading.current?.focus()
  }, [section])

  if (!apiEnabled) {
    return (
      <StatusMessage kind="warning">
        Falta configurar la dirección de la API. Define la variable <code>NEXT_PUBLIC_API_URL</code> y vuelve a publicar el sitio.
      </StatusMessage>
    )
  }
  if (token === null) return <p role="status" className="text-center text-muted">Cargando…</p>
  if (!token) {
    return (
      <LoginForm
        notice={notice}
        onLogin={t => {
          writeToken(t)
          setNotice(undefined)
          setToken(t)
        }}
      />
    )
  }

  const label = SECTIONS.find(s => s.key === section)!.label
  const common = { token, onUnauthorized: unauthorized }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <nav aria-label="Secciones del panel">
          <ul className="flex flex-wrap gap-2">
            {SECTIONS.map(s => (
              <li key={s.key}>
                <button
                  type="button"
                  aria-current={s.key === section ? 'page' : undefined}
                  onClick={() => setSection(s.key)}
                  className={`min-h-11 cursor-pointer rounded-xl border-2 px-4 py-2 text-sm font-bold ${
                    s.key === section ? 'border-red bg-red text-white' : 'border-field bg-surface text-ink hover:border-red'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" onClick={() => logout()} className="min-h-11 cursor-pointer rounded-xl border-2 border-field px-4 py-2 text-sm font-bold text-ink">
          Cerrar sesión
        </button>
      </div>

      {notice && (
        <div className="mb-4">
          <StatusMessage kind="warning">{notice}</StatusMessage>
        </div>
      )}

      <h2 ref={heading} tabIndex={-1} className="mb-5 font-display text-2xl font-bold text-ink outline-none">
        {label}
      </h2>

      {!refs ? (
        <p role="status" className="text-muted">Cargando sedes y categorías…</p>
      ) : (
        <>
          {section === 'dishes' && <CrudPanel<AdminDish> key="dishes" noun="plato" nounPlural="platos" path="/api/admin/dishes" refs={refs} describe={describeDish} Form={DishForm} {...common} />}
          {section === 'shows' && <CrudPanel<AdminShow> key="shows" noun="show" nounPlural="shows" path="/api/admin/shows" refs={refs} describe={describeShow} Form={ShowForm} {...common} />}
          {section === 'promotions' && <CrudPanel<AdminPromotion> key="promotions" noun="promoción" nounPlural="promociones" path="/api/admin/promotions" refs={refs} describe={describePromotion} Form={PromotionForm} {...common} />}
          {section === 'news' && <CrudPanel<AdminNews> key="news" noun="novedad" nounPlural="novedades" path="/api/admin/news" refs={refs} describe={describeNews} Form={NewsForm} {...common} />}
          {section === 'hero' && <HeroPanel {...common} />}
        </>
      )}
    </div>
  )
}
