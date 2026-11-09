import type { Metadata } from 'next'
import { AdminApp } from '@/components/admin/AdminApp'
import { PageHeading, Section } from '@/components/ui'

// El panel no debe aparecer en buscadores
export const metadata: Metadata = { title: 'Panel de administración', robots: { index: false, follow: false } }

export default function AdminPage() {
  return (
    <Section width="5xl">
      <PageHeading eyebrow="Solo personal autorizado" title="Panel de administración" subtitle="Platos, shows, promociones, novedades e imagen principal" />
      <AdminApp />
    </Section>
  )
}
