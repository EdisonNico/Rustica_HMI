'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { ReservationDialog } from './ReservationDialog'

const ReservationContext = createContext<{ open: () => void } | null>(null)

/** Permite abrir la ventana de reserva desde cualquier parte de la web. */
export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const value = useMemo(() => ({ open }), [open])
  return (
    <ReservationContext.Provider value={value}>
      {children}
      <ReservationDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </ReservationContext.Provider>
  )
}

export function useReservation() {
  const ctx = useContext(ReservationContext)
  if (!ctx) throw new Error('useReservation debe usarse dentro de <ReservationProvider>')
  return ctx
}
