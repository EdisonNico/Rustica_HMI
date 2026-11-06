import type { Metadata } from 'next'
import { LegalDocument } from '@/components/LegalDocument'

export const metadata: Metadata = { title: 'Términos y condiciones' }

export default function TermsPage() {
  return <LegalDocument title="Términos y condiciones" />
}
