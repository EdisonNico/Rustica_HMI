'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { adminRequest, apiGet } from '@/lib/api'
import { AreaField, ErrorSummary, ImageField } from './fields'
import { collect, required, useForm } from './useForm'
import { StatusMessage } from '../StatusMessage'
import { clearCache } from '@/lib/useRemote'

/** Cambia la imagen principal de la página de Inicio. */
export function HeroPanel({ token, onUnauthorized }: { token: string; onUnauthorized: () => void }) {
  const [saved, setSaved] = useState(false)
  const { errors, general, saving, summaryRef, submit } = useForm(onUnauthorized, () => {
    clearCache()
    setSaved(true)
  })
  const [v, setV] = useState({ image: '', imageUrl: '', alt: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet<{ imageUrl: string | null; alt: string | null }>('/api/hero')
      .then(h => setV(prev => ({ ...prev, imageUrl: h.imageUrl ?? '', alt: h.alt ?? '' })))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSaved(false)
    submit(collect({ image: required(v.image, 'Sube una imagen nueva para cambiarla.') }), () =>
      adminRequest('PUT', '/api/admin/hero', token, { image: v.image, alt: v.alt.trim() || null }),
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-2xl">
      <p className="mb-5 text-body">Es la foto grande que se ve al entrar al sitio. Usa una imagen horizontal y de buena calidad; la parte de abajo queda cubierta por el botón «Ver Menú».</p>
      <ErrorSummary errors={errors} general={general} summaryRef={summaryRef} labels={{ image: 'Imagen' }} />
      {saved && (
        <div className="mb-5">
          <StatusMessage kind="success">La imagen principal se actualizó. Ya se ve en el Inicio.</StatusMessage>
        </div>
      )}
      <ImageField
        name="image"
        label="Imagen principal"
        hint={loading ? 'Cargando la imagen actual…' : 'JPG, PNG o WebP de hasta 5 MB. Recomendado: 1920 × 1080 px.'}
        token={token}
        folder="hero"
        value={v.image}
        preview={v.imageUrl}
        onChange={(path, url) => setV(prev => ({ ...prev, image: path, imageUrl: url }))}
        onUnauthorized={onUnauthorized}
        error={errors.image}
      />
      <AreaField name="alt" label="Descripción de la imagen" hint="Opcional. La leen los lectores de pantalla si la imagen transmite información." value={v.alt} onChange={alt => setV(prev => ({ ...prev, alt }))} rows={2} maxLength={300} />
      <button type="submit" disabled={saving} className="min-h-11 cursor-pointer rounded-xl bg-red px-5 py-2.5 text-sm font-bold text-white hover:bg-red-dark disabled:opacity-60">
        {saving ? 'Guardando…' : 'Guardar imagen principal'}
      </button>
    </form>
  )
}
