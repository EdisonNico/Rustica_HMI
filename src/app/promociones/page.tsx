import type { Metadata } from 'next'
import { PromotionsGrid } from '@/components/PromotionsGrid'
import { PageHeading, Section } from '@/components/ui'

export const metadata: Metadata = { title: 'Promociones' }

export default function PromotionsPage() {
  return (
    <Section>
      <PageHeading eyebrow="Ofertas vigentes" title="Promociones" subtitle="Descubre los mejores precios en tu local favorito" />
      <PromotionsGrid />
    </Section>
  )
}
