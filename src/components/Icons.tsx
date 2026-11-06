export function SocialIcon({ network }: { network: 'instagram' | 'facebook' | 'tiktok' }) {
  if (network === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (network === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M13.7 21v-8h2.8l.42-3.2H13.7V7.75c0-.93.26-1.56 1.62-1.56H17V3.33c-.29-.04-1.28-.13-2.43-.13-2.4 0-4.05 1.47-4.05 4.16V9.8H7.8V13h2.72v8h3.18Z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M15.5 3c.3 2.35 1.62 3.75 3.9 3.9v2.75a8.1 8.1 0 0 1-3.86-.95v5.67a6.02 6.02 0 1 1-5.2-5.97v2.8a3.25 3.25 0 1 0 2.38 3.13V3h2.78Z" />
    </svg>
  )
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-9" fill="none" aria-hidden="true">
      <path d="M16 4.25A11.5 11.5 0 0 0 6.1 21.6L4.5 27.5l6.05-1.58A11.5 11.5 0 1 0 16 4.25Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M12.1 10.35c.22-.5.45-.51.76-.52h.65c.2 0 .43.08.55.38.14.34.72 1.76.78 1.9.07.13.11.29.02.46-.08.18-.13.29-.27.44-.13.16-.28.35-.4.47-.14.13-.28.27-.12.54.16.27.72 1.17 1.54 1.9 1.06.94 1.95 1.23 2.23 1.37.27.14.43.12.59-.07.16-.2.68-.8.86-1.07.18-.27.36-.23.61-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.67-.16 1.31-.22.64-1.32 1.23-1.82 1.31-.47.08-1.08.12-1.74-.09-.4-.13-.92-.3-1.59-.59-.7-.3-3.05-1.13-5.17-3.94-.59-.78-.97-1.65-1.08-1.92-.11-.27-.01-.42.08-.54.08-.1.2-.25.3-.38.1-.13.13-.22.2-.37.07-.13.03-.27-.02-.38-.05-.12-.57-1.4-.8-1.9Z" fill="currentColor" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function AccessibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="4.5" r="1.8" />
      <path d="M5 8.5c4.5 1.4 9.5 1.4 14 0M12 8.5v5M12 13.5l-3 6M12 13.5l3 6" />
    </svg>
  )
}

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
