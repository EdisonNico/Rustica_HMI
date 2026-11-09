/** Modelos que usa la interfaz y su conversión desde las respuestas de la API. */
import { safeImageUrl } from '@/lib/api'
import { formatDate } from '@/lib/format'

export interface BranchGroup {
  label: string
  branches: Array<{ value: string; label: string }>
}
export interface CategoryView {
  value: string
  label: string
  description: string
}
export interface DishView {
  id: number
  name: string
  description: string
  price: string
  image: string | null
  category: string
  badge?: string
  featured?: boolean
}
export interface ShowView {
  key: string
  artist: string
  dateLabel: string
  timeLabel?: string
  location: string
  description: string[]
  image: string | null
}
export interface PromotionView {
  key: string
  title: string
  subtitle: string
  price?: string
  details: string[]
  terms: string[]
  shortTitle: string
  shortSubtitle: string
  image: string | null
}
export interface NewsView {
  key: string
  date: string
  cat: string
  title: string
  excerpt: string
  img: string | null
}
export interface MenuView {
  categories: CategoryView[]
  dishes: DishView[]
}
export interface HomeView {
  /** null = no hay imagen subida: se usa la imagen local */
  heroUrl: string | null
  heroAlt: string
  promotions: PromotionView[]
  shows: ShowView[]
}

/* ───────── Respuestas de la API ───────── */
export interface ApiBranch { slug: string; name: string; zone: string | null }
export interface ApiCategory { slug: string; name: string; description: string | null }
export interface ApiDish {
  id: number; name: string; description: string | null; priceLabel: string; imageUrl: string | null
  category: string; badge: string | null; featured: boolean
}
export interface ApiMenu { categories: ApiCategory[]; dishes: ApiDish[] }
export interface ApiShow {
  id: number; artist: string; date: string; time: string | null; location: string
  imageUrl: string | null; description: string[] | null
}
export interface ApiPromotion {
  id: number; title: string; subtitle: string | null; priceLabel: string | null; imageUrl: string | null
  details: string[] | null; terms: string[] | null; shortTitle: string | null; shortSubtitle: string | null
}
export interface ApiNews { id: number; date: string | null; category: string; title: string; excerpt: string; imageUrl: string | null }
export interface ApiHome {
  hero: { imageUrl: string | null; alt: string | null }
  promotions: ApiPromotion[]
  shows: ApiShow[]
}

/** "21:00:00" → "9:00 p. m." */
export function formatTime(value: string | null | undefined) {
  if (!value) return undefined
  const [h, m] = value.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return undefined
  const suffix = h >= 12 ? 'p. m.' : 'a. m.'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
}

export function groupBranches(list: ApiBranch[]): BranchGroup[] {
  const groups = new Map<string, BranchGroup>()
  for (const item of list) {
    const label = item.zone ?? 'Otras sedes'
    if (!groups.has(label)) groups.set(label, { label, branches: [] })
    groups.get(label)!.branches.push({ value: item.slug, label: item.name })
  }
  return [...groups.values()]
}

export const toMenu = (raw: ApiMenu): MenuView => ({
  categories: raw.categories.map(c => ({ value: c.slug, label: c.name, description: c.description ?? '' })),
  dishes: raw.dishes.map(d => ({
    id: d.id,
    name: d.name,
    description: d.description ?? '',
    price: d.priceLabel,
    image: safeImageUrl(d.imageUrl),
    category: d.category,
    badge: d.badge ?? undefined,
    featured: d.featured,
  })),
})

export const toShow = (s: ApiShow): ShowView => ({
  key: String(s.id),
  artist: s.artist,
  dateLabel: formatDate(s.date),
  timeLabel: formatTime(s.time),
  location: s.location,
  description: s.description ?? [],
  image: safeImageUrl(s.imageUrl),
})

export const toPromotion = (p: ApiPromotion): PromotionView => ({
  key: String(p.id),
  title: p.title,
  subtitle: p.subtitle ?? '',
  price: p.priceLabel ?? undefined,
  details: p.details ?? [],
  terms: p.terms ?? [],
  shortTitle: p.shortTitle || p.title,
  shortSubtitle: p.shortSubtitle || p.subtitle || '',
  image: safeImageUrl(p.imageUrl),
})

export const toNews = (n: ApiNews): NewsView => ({
  key: String(n.id),
  date: n.date ?? '',
  cat: n.category,
  title: n.title,
  excerpt: n.excerpt,
  img: safeImageUrl(n.imageUrl),
})

export const toHome = (raw: ApiHome): HomeView => ({
  heroUrl: safeImageUrl(raw.hero?.imageUrl),
  heroAlt: raw.hero?.alt ?? '',
  promotions: raw.promotions.map(toPromotion),
  shows: raw.shows.map(toShow),
})
