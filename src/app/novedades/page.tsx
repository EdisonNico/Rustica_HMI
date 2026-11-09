import type { Metadata } from 'next'
import { NewsList } from '@/components/NewsList'
import { PageHeading, Section } from '@/components/ui'

export const metadata: Metadata = { title: 'Novedades' }

export default function NewsPage() {
  return (
    <Section width="5xl">
      <PageHeading eyebrow="Lo último" title="Novedades" />
      <NewsList />
    </Section>
  )
}
