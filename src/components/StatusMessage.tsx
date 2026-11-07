import type { ReactNode } from 'react'

/**
 * Mensaje de estado reutilizable (éxito, error, aviso, info).
 * No depende del color: cada tipo tiene su propia FORMA de icono, su
 * etiqueta de texto y su estilo de borde. El color solo refuerza.
 * Úsalo en formularios, notificaciones, reservas y estados de carga.
 */
type Kind = 'success' | 'error' | 'warning' | 'info'

const CONFIG: Record<Kind, { label: string; role: 'status' | 'alert'; box: string; icon: ReactNode }> = {
  success: {
    label: 'Éxito',
    role: 'status',
    box: 'border-success bg-white border-solid',
    icon: <path d="M5 13l4 4L19 7" />, // check
  },
  error: {
    label: 'Error',
    role: 'alert',
    box: 'border-error bg-error-tint border-solid border-l-8',
    icon: <path d="M6 6l12 12M18 6L6 18" />, // cruz
  },
  warning: {
    label: 'Atención',
    role: 'alert',
    box: 'border-ink bg-cream border-dashed',
    icon: <path d="M12 8v5M12 16.5v.5" />, // admiración
  },
  info: {
    label: 'Información',
    role: 'status',
    box: 'border-field bg-white border-dotted',
    icon: <path d="M12 11v6M12 7.5v.5" />, // "i"
  },
}

export function StatusMessage({ kind, children }: { kind: Kind; children: ReactNode }) {
  const c = CONFIG[kind]
  return (
    <div role={c.role} className={`flex items-start gap-3 rounded-xl border-2 p-4 text-ink ${c.box}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'warning' ? <path d="M12 3l10 18H2L12 3z" /> : kind === 'info' ? <rect x="3" y="3" width="18" height="18" rx="2" /> : <circle cx="12" cy="12" r="10" />}
        {c.icon}
      </svg>
      <p className="text-base">
        <strong>{c.label}: </strong>
        {children}
      </p>
    </div>
  )
}
