'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import { adminRequest } from '@/lib/api'
import { AreaField, CheckField, ErrorSummary, ImageField, SelectField, TextField, id } from './fields'
import { collect, required, useForm } from './useForm'
import type { AdminDish, AdminNews, AdminPromotion, AdminShow, FormProps } from './types'

function Shell({ titleId, title, onCancel, saving, onSubmit, summary, children }: {
  titleId: string
  title: string
  onCancel: () => void
  saving: boolean
  onSubmit: (e: FormEvent) => void
  summary: ReactNode
  children: ReactNode
}) {
  return (
    <form onSubmit={onSubmit} noValidate className="p-6">
      <h2 id={titleId} className="mb-5 font-display text-2xl font-bold text-ink">
        {title}
      </h2>
      {summary}
      {children}
      <div className="sticky bottom-0 -mx-6 -mb-6 flex flex-wrap justify-end gap-3 border-t border-line bg-surface px-6 py-4">
        <button type="button" onClick={onCancel} className="min-h-11 cursor-pointer rounded-xl border-2 border-field px-5 py-2.5 text-sm font-bold text-ink">
          Cancelar
        </button>
        <button type="submit" disabled={saving} className="min-h-11 cursor-pointer rounded-xl bg-red px-5 py-2.5 text-sm font-bold text-white hover:bg-red-dark disabled:opacity-60">
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

const orNull = (v: string) => (v.trim() ? v.trim() : null)

/* ───────── Platos ───────── */

export function DishForm({ item, token, refs, onUnauthorized, onSaved, onCancel, titleId }: FormProps<AdminDish>) {
  const { errors, general, saving, summaryRef, submit } = useForm(onUnauthorized, onSaved)
  const [v, setV] = useState({
    name: item?.name ?? '',
    description: item?.description ?? '',
    priceLabel: item?.priceLabel ?? '',
    image: item?.image ?? '',
    imageUrl: item?.imageUrl ?? '',
    categorySlug: item?.categorySlug ?? '',
    badge: item?.badge ?? '',
    featured: item?.featured ?? false,
    active: item?.active ?? true,
  })
  // sede → texto del precio propio ('' = usa el precio general). Estar en el objeto = el plato se vende ahí.
  const [sedes, setSedes] = useState<Record<string, string>>(() =>
    item ? Object.fromEntries(item.branches.map(b => [b.branchSlug, b.priceLabelOverride ?? ''])) : Object.fromEntries(refs.branches.map(b => [b.slug, ''])),
  )
  const set = <K extends keyof typeof v>(key: K) => (value: (typeof v)[K]) => setV(prev => ({ ...prev, [key]: value }))

  const zones = [...new Set(refs.branches.map(b => b.zone ?? 'Otras sedes'))]

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit(
      collect({
        name: required(v.name),
        priceLabel: required(v.priceLabel, 'Escribe el precio, por ejemplo S/ 59.90.'),
        categorySlug: required(v.categorySlug, 'Elige una categoría.'),
        branches: Object.keys(sedes).length ? undefined : 'Elige al menos una sede.',
      }),
      () => {
        const body = {
          name: v.name.trim(),
          description: orNull(v.description),
          priceLabel: v.priceLabel.trim(),
          image: orNull(v.image),
          categorySlug: v.categorySlug,
          badge: orNull(v.badge),
          featured: v.featured,
          active: v.active,
          allBranches: false,
          branches: Object.entries(sedes).map(([branchSlug, price]) => ({ branchSlug, priceLabelOverride: orNull(price) })),
        }
        return item ? adminRequest('PUT', `/api/admin/dishes/${item.id}`, token, body) : adminRequest('POST', '/api/admin/dishes', token, body)
      },
    )
  }

  const toggle = (slug: string, on: boolean) =>
    setSedes(prev => {
      const next = { ...prev }
      if (on) next[slug] = next[slug] ?? ''
      else delete next[slug]
      return next
    })

  return (
    <Shell
      titleId={titleId}
      title={item ? 'Editar plato' : 'Nuevo plato'}
      onCancel={onCancel}
      saving={saving}
      onSubmit={onSubmit}
      summary={<ErrorSummary errors={errors} general={general} summaryRef={summaryRef} labels={{ name: 'Nombre', priceLabel: 'Precio', categorySlug: 'Categoría', branches: 'Sedes', image: 'Imagen' }} />}
    >
      <TextField name="name" label="Nombre" required value={v.name} onChange={set('name')} error={errors.name} maxLength={160} />
      <AreaField name="description" label="Descripción" value={v.description} onChange={set('description')} rows={3} maxLength={600} error={errors.description} />
      <TextField name="priceLabel" label="Precio" required hint="Tal como se verá en la carta, por ejemplo S/ 59.90." value={v.priceLabel} onChange={set('priceLabel')} error={errors.priceLabel} maxLength={80} />
      <SelectField
        name="categorySlug"
        label="Categoría"
        required
        placeholder="Elige una categoría"
        value={v.categorySlug}
        onChange={set('categorySlug')}
        error={errors.categorySlug}
        options={refs.categories.map(c => ({ value: c.slug, label: c.name }))}
      />
      <TextField name="badge" label="Etiqueta" hint="Opcional, por ejemplo «Nuevo» o «Más pedido»." value={v.badge} onChange={set('badge')} maxLength={60} error={errors.badge} />
      <ImageField
        name="image"
        label="Imagen"
        token={token}
        folder="dishes"
        value={v.image}
        preview={v.imageUrl}
        onChange={(path, url) => setV(prev => ({ ...prev, image: path, imageUrl: url }))}
        onUnauthorized={onUnauthorized}
        error={errors.image}
      />
      <CheckField name="featured" label="Plato destacado" hint="Muestra una estrella en la tarjeta." checked={v.featured} onChange={set('featured')} />
      <CheckField name="active" label="Visible en la carta" hint="Si lo desmarcas, el plato se oculta sin borrarse." checked={v.active} onChange={set('active')} />

      <fieldset id={id('branches')} tabIndex={-1} className="mt-6 rounded-xl border-2 border-line p-4" aria-describedby={errors.branches ? id('branches-error') : undefined}>
        <legend className="px-2 font-bold text-ink">Sedes donde se vende</legend>
        <p className="mb-3 text-sm text-muted">Marca las sedes. Si una sede tiene otro precio, escríbelo en su campo; si lo dejas vacío se usa el precio general.</p>
        <div className="mb-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => setSedes(Object.fromEntries(refs.branches.map(b => [b.slug, sedes[b.slug] ?? ''])))} className="min-h-11 cursor-pointer rounded-xl border-2 border-field px-4 text-sm font-bold text-ink">
            Marcar todas
          </button>
          <button type="button" onClick={() => setSedes({})} className="min-h-11 cursor-pointer rounded-xl border-2 border-field px-4 text-sm font-bold text-ink">
            Quitar todas
          </button>
          <span role="status" className="self-center text-sm text-muted">
            {Object.keys(sedes).length} de {refs.branches.length} sedes
          </span>
        </div>
        {errors.branches && (
          <p id={id('branches-error')} className="mb-3 text-sm font-semibold text-error">
            <span aria-hidden="true">✕ </span>
            <span className="sr-only">Error: </span>
            {errors.branches}
          </p>
        )}
        {zones.map(zone => (
          <fieldset key={zone} className="mb-4">
            <legend className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">{zone}</legend>
            <ul className="space-y-2">
              {refs.branches
                .filter(b => (b.zone ?? 'Otras sedes') === zone)
                .map(b => {
                  const on = b.slug in sedes
                  return (
                    <li key={b.slug} className="flex flex-wrap items-center gap-3">
                      <div className="flex min-h-11 min-w-48 items-center gap-3">
                        <input id={`sede-${b.slug}`} type="checkbox" checked={on} onChange={e => toggle(b.slug, e.target.checked)} className="size-6 cursor-pointer accent-[var(--color-brand)]" />
                        <label htmlFor={`sede-${b.slug}`} className="cursor-pointer text-ink">
                          {b.name}
                        </label>
                      </div>
                      {on && (
                        <div>
                          <label htmlFor={`precio-${b.slug}`} className="sr-only">
                            Precio propio en {b.name} (opcional)
                          </label>
                          <input
                            id={`precio-${b.slug}`}
                            value={sedes[b.slug]}
                            maxLength={80}
                            placeholder="Precio propio (opcional)"
                            onChange={e => setSedes(prev => ({ ...prev, [b.slug]: e.target.value }))}
                            className="min-h-11 w-56 rounded-xl border-2 border-field bg-surface px-3 text-sm text-ink placeholder:text-muted"
                          />
                        </div>
                      )}
                    </li>
                  )
                })}
            </ul>
          </fieldset>
        ))}
      </fieldset>
    </Shell>
  )
}

/* ───────── Shows ───────── */

/** Fecha (AAAA-MM-DD) y hora (HH:MM) actuales en Lima. */
function nowInLima() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t: string) => parts.find(x => x.type === t)?.value ?? '00'
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time: `${get('hour')}:${get('minute')}` }
}

export function ShowForm({ item, token, refs, onUnauthorized, onSaved, onCancel, titleId }: FormProps<AdminShow>) {
  const { errors, general, saving, summaryRef, submit } = useForm(onUnauthorized, onSaved)
  const [v, setV] = useState({
    artist: item?.artist ?? '',
    date: item?.date ?? '',
    time: item?.time?.slice(0, 5) ?? '21:00',
    branchSlug: item?.branchSlug ?? '',
    location: item?.location ?? '',
    image: item?.image ?? '',
    imageUrl: item?.imageUrl ?? '',
    description: item?.description ?? '',
    active: item?.active ?? true,
  })
  const set = <K extends keyof typeof v>(key: K) => (value: (typeof v)[K]) => setV(prev => ({ ...prev, [key]: value }))

  const onBranch = (slug: string) => {
    const branch = refs.branches.find(b => b.slug === slug)
    setV(prev => ({ ...prev, branchSlug: slug, location: !prev.location.trim() && branch ? `Rústica ${branch.name}` : prev.location }))
  }

  const now = nowInLima()
  // Solo se exige fecha futura si es un show nuevo o se cambió la fecha u hora
  const changed = !item || v.date !== item.date || v.time !== (item.time?.slice(0, 5) ?? '')
  const minDate = now.date
  const minTime = v.date === now.date && changed ? now.time : undefined

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit(
      collect({
        artist: required(v.artist),
        date: required(v.date, 'Elige la fecha.') ?? (changed && v.date < now.date ? 'La fecha no puede estar en el pasado.' : undefined),
        time: minTime && v.time && v.time < minTime ? 'Esa hora ya pasó. Elige una hora posterior.' : undefined,
        location: required(v.location, 'Escribe el local, por ejemplo Rústica Costa Verde.'),
      }),
      () => {
        const body = {
          artist: v.artist.trim(),
          date: v.date,
          time: orNull(v.time),
          branchSlug: orNull(v.branchSlug),
          location: v.location.trim(),
          image: orNull(v.image),
          description: orNull(v.description),
          active: v.active,
        }
        return item ? adminRequest('PUT', `/api/admin/shows/${item.id}`, token, body) : adminRequest('POST', '/api/admin/shows', token, body)
      },
    )
  }

  return (
    <Shell
      titleId={titleId}
      title={item ? 'Editar show' : 'Nuevo show'}
      onCancel={onCancel}
      saving={saving}
      onSubmit={onSubmit}
      summary={<ErrorSummary errors={errors} general={general} summaryRef={summaryRef} labels={{ artist: 'Artista', date: 'Fecha', location: 'Local', time: 'Hora', image: 'Afiche', description: 'Descripción' }} />}
    >
      <TextField name="artist" label="Artista" required value={v.artist} onChange={set('artist')} error={errors.artist} maxLength={160} />
      <TextField name="date" type="date" label="Fecha" required min={minDate} hint="Solo fechas de hoy en adelante." value={v.date} onChange={set('date')} error={errors.date} />
      <TextField name="time" type="time" label="Hora" min={minTime} value={v.time} onChange={set('time')} error={errors.time} />
      <SelectField
        name="branchSlug"
        label="Sede"
        placeholder="Sin sede específica"
        value={v.branchSlug}
        onChange={onBranch}
        error={errors.branchSlug}
        options={refs.branches.map(b => ({ value: b.slug, label: b.name }))}
      />
      <TextField name="location" label="Local (texto que se muestra)" required value={v.location} onChange={set('location')} error={errors.location} maxLength={160} />
      <ImageField
        name="image"
        label="Afiche"
        hint="Vertical 4:5, por ejemplo 1080 × 1350 px. JPG, PNG o WebP de hasta 5 MB."
        token={token}
        folder="shows"
        value={v.image}
        preview={v.imageUrl}
        onChange={(path, url) => setV(prev => ({ ...prev, image: path, imageUrl: url }))}
        onUnauthorized={onUnauthorized}
        error={errors.image}
      />
      <AreaField name="description" label="Descripción" hint="Separa los párrafos con una línea en blanco." value={v.description} onChange={set('description')} rows={5} maxLength={4000} error={errors.description} />
      <CheckField name="active" label="Visible en el sitio" checked={v.active} onChange={set('active')} />
    </Shell>
  )
}

/* ───────── Promociones ───────── */

export function PromotionForm({ item, token, onUnauthorized, onSaved, onCancel, titleId }: FormProps<AdminPromotion>) {
  const { errors, general, saving, summaryRef, submit } = useForm(onUnauthorized, onSaved)
  const [v, setV] = useState({
    title: item?.title ?? '',
    subtitle: item?.subtitle ?? '',
    priceLabel: item?.priceLabel ?? '',
    image: item?.image ?? '',
    imageUrl: item?.imageUrl ?? '',
    details: item?.details ?? '',
    terms: item?.terms ?? '',
    featured: item?.featured ?? false,
    shortTitle: item?.shortTitle ?? '',
    shortSubtitle: item?.shortSubtitle ?? '',
    validUntil: item?.validUntil ?? '',
    sortOrder: String(item?.sortOrder ?? 0),
    active: item?.active ?? true,
  })
  const set = <K extends keyof typeof v>(key: K) => (value: (typeof v)[K]) => setV(prev => ({ ...prev, [key]: value }))

  const today = nowInLima().date
  const validChanged = !item || v.validUntil !== (item.validUntil ?? '')
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit(
      collect({
        title: required(v.title),
        validUntil: v.validUntil && validChanged && v.validUntil < today ? 'La fecha no puede estar en el pasado.' : undefined,
        sortOrder: Number.isInteger(Number(v.sortOrder)) ? undefined : 'Escribe un número entero.',
      }),
      () => {
        const body = {
          title: v.title.trim(),
          subtitle: orNull(v.subtitle),
          priceLabel: orNull(v.priceLabel),
          image: orNull(v.image),
          details: orNull(v.details),
          terms: orNull(v.terms),
          featured: v.featured,
          shortTitle: orNull(v.shortTitle),
          shortSubtitle: orNull(v.shortSubtitle),
          validUntil: orNull(v.validUntil),
          sortOrder: Number(v.sortOrder) || 0,
          active: v.active,
        }
        return item ? adminRequest('PUT', `/api/admin/promotions/${item.id}`, token, body) : adminRequest('POST', '/api/admin/promotions', token, body)
      },
    )
  }

  return (
    <Shell
      titleId={titleId}
      title={item ? 'Editar promoción' : 'Nueva promoción'}
      onCancel={onCancel}
      saving={saving}
      onSubmit={onSubmit}
      summary={<ErrorSummary errors={errors} general={general} summaryRef={summaryRef} labels={{ title: 'Título', validUntil: 'Vigente hasta', sortOrder: 'Orden', image: 'Imagen' }} />}
    >
      <TextField name="title" label="Título" required value={v.title} onChange={set('title')} error={errors.title} maxLength={200} />
      <AreaField name="subtitle" label="Resumen" value={v.subtitle} onChange={set('subtitle')} rows={2} maxLength={500} error={errors.subtitle} />
      <TextField name="priceLabel" label="Precio" hint="Opcional, por ejemplo 2 x S/ 28." value={v.priceLabel} onChange={set('priceLabel')} maxLength={80} error={errors.priceLabel} />
      <ImageField
        name="image"
        label="Afiche"
        token={token}
        folder="promotions"
        value={v.image}
        preview={v.imageUrl}
        onChange={(path, url) => setV(prev => ({ ...prev, image: path, imageUrl: url }))}
        onUnauthorized={onUnauthorized}
        error={errors.image}
      />
      <AreaField name="details" label="Detalles" hint="Un párrafo por línea." value={v.details} onChange={set('details')} rows={3} maxLength={4000} error={errors.details} />
      <AreaField name="terms" label="Términos y condiciones" hint="Uno por línea." value={v.terms} onChange={set('terms')} rows={5} maxLength={4000} error={errors.terms} />
      <CheckField name="featured" label="Mostrar en el Inicio" hint="Aparece en el carrusel de promociones de la página principal." checked={v.featured} onChange={set('featured')} />
      <TextField name="shortTitle" label="Título corto (Inicio)" hint="Opcional. Si lo dejas vacío se usa el título." value={v.shortTitle} onChange={set('shortTitle')} maxLength={160} error={errors.shortTitle} />
      <TextField name="shortSubtitle" label="Texto corto (Inicio)" hint="Opcional." value={v.shortSubtitle} onChange={set('shortSubtitle')} maxLength={200} error={errors.shortSubtitle} />
      <TextField name="validUntil" type="date" label="Vigente hasta" min={today} hint="Opcional. Solo fechas de hoy en adelante; después de esa fecha deja de mostrarse." value={v.validUntil} onChange={set('validUntil')} error={errors.validUntil} />
      <TextField name="sortOrder" type="number" label="Orden" hint="Los números menores aparecen primero." value={v.sortOrder} onChange={set('sortOrder')} error={errors.sortOrder} />
      <CheckField name="active" label="Visible en el sitio" checked={v.active} onChange={set('active')} />
    </Shell>
  )
}

/* ───────── Novedades ───────── */

export function NewsForm({ item, token, onUnauthorized, onSaved, onCancel, titleId }: FormProps<AdminNews>) {
  const { errors, general, saving, summaryRef, submit } = useForm(onUnauthorized, onSaved)
  const [v, setV] = useState({
    date: item?.date ?? new Date().toISOString().slice(0, 10),
    category: item?.category ?? '',
    title: item?.title ?? '',
    excerpt: item?.excerpt ?? '',
    image: item?.image ?? '',
    imageUrl: item?.imageUrl ?? '',
    active: item?.active ?? true,
  })
  const set = <K extends keyof typeof v>(key: K) => (value: (typeof v)[K]) => setV(prev => ({ ...prev, [key]: value }))

  const today = nowInLima().date
  const dateChanged = !item || v.date !== (item.date ?? '')
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit(
      collect({
        date: v.date && dateChanged && v.date < today ? 'La fecha no puede estar en el pasado.' : undefined,
        category: required(v.category, 'Escribe una categoría, por ejemplo Eventos.'),
        title: required(v.title),
        excerpt: required(v.excerpt, 'Escribe un resumen de la noticia.'),
      }),
      () => {
        const body = { date: orNull(v.date), category: v.category.trim(), title: v.title.trim(), excerpt: v.excerpt.trim(), image: orNull(v.image), active: v.active }
        return item ? adminRequest('PUT', `/api/admin/news/${item.id}`, token, body) : adminRequest('POST', '/api/admin/news', token, body)
      },
    )
  }

  return (
    <Shell
      titleId={titleId}
      title={item ? 'Editar novedad' : 'Nueva novedad'}
      onCancel={onCancel}
      saving={saving}
      onSubmit={onSubmit}
      summary={<ErrorSummary errors={errors} general={general} summaryRef={summaryRef} labels={{ category: 'Categoría', title: 'Título', excerpt: 'Resumen', image: 'Imagen', date: 'Fecha' }} />}
    >
      <TextField name="title" label="Título" required value={v.title} onChange={set('title')} error={errors.title} maxLength={200} />
      <TextField name="category" label="Categoría" required hint="Por ejemplo Eventos, Menú o Nuevos locales." value={v.category} onChange={set('category')} error={errors.category} maxLength={60} />
      <TextField name="date" type="date" label="Fecha" min={today} hint="Solo fechas de hoy en adelante." value={v.date} onChange={set('date')} error={errors.date} />
      <AreaField name="excerpt" label="Resumen" required value={v.excerpt} onChange={set('excerpt')} rows={4} maxLength={800} error={errors.excerpt} />
      <ImageField
        name="image"
        label="Imagen"
        token={token}
        folder="news"
        value={v.image}
        preview={v.imageUrl}
        onChange={(path, url) => setV(prev => ({ ...prev, image: path, imageUrl: url }))}
        onUnauthorized={onUnauthorized}
        error={errors.image}
      />
      <CheckField name="active" label="Visible en el sitio" checked={v.active} onChange={set('active')} />
    </Shell>
  )
}
