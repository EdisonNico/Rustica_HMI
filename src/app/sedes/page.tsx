import type { Metadata } from 'next'
import { LocationsExplorer } from '@/components/LocationsExplorer'
import { PageHeading, Section } from '@/components/ui'

export const metadata: Metadata = { title: 'Encuentra tu local' }

export default function LocationsPage() {
  return (
    <Section tone="cream" width="5xl">
      <PageHeading eyebrow="¿Dónde estamos?" title="Encuentra tu local" />
      <LocationsExplorer />
    </Section>
  )
}
