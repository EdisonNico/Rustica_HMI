import type { Metadata } from 'next'
import { HomeContent } from '@/components/HomeContent'

export const metadata: Metadata = { title: { absolute: 'Rústica Perú' } }

export default function HomePage() {
  return <HomeContent />
}
