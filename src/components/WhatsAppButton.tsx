import { WhatsAppIcon } from './Icons'
import { NewTab } from './ui'

/**
 * Botón flotante de WhatsApp. Solo se muestra si se configura el número en
 * NEXT_PUBLIC_WHATSAPP_NUMBER (la versión 2.0 enlazaba a https://wa.me/ sin número).
 */
export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return null
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar a Rústica por WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid size-16 place-items-center rounded-full bg-wa text-white shadow-[0_10px_28px_rgba(14,124,70,0.38)] transition-transform hover:-translate-y-1 sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon />
      <NewTab />
    </a>
  )
}
