export type NavEntry = { type: 'link'; href: string; label: string } | { type: 'reserve' }

/** Orden de la navegación principal (igual que la versión 2.0). */
export const navEntries: NavEntry[] = [
  { type: 'link', href: '/', label: 'Inicio' },
  { type: 'link', href: '/menu/', label: 'Menú Interactivo' },
  { type: 'link', href: '/promociones/', label: 'Promociones' },
  { type: 'link', href: '/shows/', label: 'Shows' },
  { type: 'link', href: '/novedades/', label: 'Novedades' },
  { type: 'reserve' },
  { type: 'link', href: '/sedes/', label: 'Encuentra local' },
]

export const socialLinks = [
  { network: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/rusticaperu/' },
  { network: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/rusticaperu/' },
  { network: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@rusticaperu' },
] as const
