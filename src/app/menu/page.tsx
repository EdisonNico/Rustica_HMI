import type { Metadata } from 'next'
import { MenuExplorer } from '@/components/MenuExplorer'

export const metadata: Metadata = { title: 'Menú Interactivo' }

export default function MenuPage() {
  return <MenuExplorer />
}
