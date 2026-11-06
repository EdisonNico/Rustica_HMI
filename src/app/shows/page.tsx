import type { Metadata } from 'next'
import { ShowsGrid } from '@/components/ShowsGrid'
import { PageHeading, Section } from '@/components/ui'

export const metadata: Metadata = { title: 'Shows' }

export default function ShowsPage() {
  return (
    <Section tone="cream">
      <PageHeading eyebrow="Entretenimiento en vivo" title="Shows" subtitle="Cena, música y artistas en vivo en nuestros locales" />
      <ShowsGrid />
    </Section>
  )
}
