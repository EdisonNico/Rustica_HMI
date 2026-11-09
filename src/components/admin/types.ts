import type { ApiBranch, ApiCategory } from '@/lib/content'

export interface Refs {
  branches: ApiBranch[]
  categories: ApiCategory[]
}

export interface AdminDish {
  id: number; name: string; description: string | null; priceLabel: string; image: string | null; imageUrl: string | null
  categorySlug: string; badge: string | null; featured: boolean; active: boolean
  branches: Array<{ branchSlug: string; priceLabelOverride: string | null }>
}
export interface AdminShow {
  id: number; artist: string; date: string; time: string | null; branchSlug: string | null; location: string
  image: string | null; imageUrl: string | null; description: string | null; active: boolean
}
export interface AdminPromotion {
  id: number; title: string; subtitle: string | null; priceLabel: string | null; image: string | null; imageUrl: string | null
  details: string | null; terms: string | null; featured: boolean; shortTitle: string | null; shortSubtitle: string | null
  validUntil: string | null; sortOrder: number; active: boolean
}
export interface AdminNews {
  id: number; date: string | null; category: string; title: string; excerpt: string
  image: string | null; imageUrl: string | null; active: boolean
}

export interface FormProps<T> {
  item: T | null
  token: string
  refs: Refs
  onUnauthorized: () => void
  onSaved: () => void
  onCancel: () => void
  titleId: string
}
