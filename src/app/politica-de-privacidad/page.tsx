import type { Metadata } from 'next'
import { LegalDocument } from '@/components/LegalDocument'

export const metadata: Metadata = { title: 'Políticas de privacidad' }

export default function PrivacyPage() {
  return <LegalDocument title="Políticas de privacidad y tratamiento de datos personales" />
}
