import Link from 'next/link'
import type { Metadata } from 'next'
import { primaryButton } from '@/components/ui'

export const metadata: Metadata = { title: 'Página no encontrada' }

export default function NotFound() {
  return (
    <div className="bg-cream px-6 py-24 text-center">
      <h1 className="mb-3 font-display text-3xl font-bold text-ink">Página no encontrada</h1>
      <p className="mb-8 text-body">La dirección que buscas no existe o fue movida.</p>
      <Link href="/" className={primaryButton}>
        Volver al inicio
      </Link>
    </div>
  )
}
