import { StatusMessage } from './StatusMessage'
import type { RemoteStatus } from '@/lib/useRemote'

/**
 * Estado de la conexión con la API. El aviso de carga es role="status" (se anuncia sin mover el foco);
 * los errores llevan texto + icono + botón para reintentar, el color no es lo único que informa.
 */
export function LiveNotice({ status, hasData, what, onRetry }: { status: RemoteStatus; hasData: boolean; what: string; onRetry: () => void }) {
  const retry = (
    <button type="button" onClick={onRetry} className="min-h-11 cursor-pointer font-bold text-brand underline underline-offset-4">
      Reintentar
    </button>
  )
  return (
    <>
      <div role="status" className="py-6 text-center text-muted empty:hidden">
        {status === 'loading' && !hasData ? `Cargando ${what}… Si el servidor estaba inactivo puede tardar hasta un minuto.` : null}
      </div>
      {status === 'error' && (
        <div className="mx-auto mb-6 max-w-2xl">
          {hasData ? (
            <StatusMessage kind="info">No pudimos actualizar {what}; te mostramos la última información guardada. {retry}</StatusMessage>
          ) : (
            <StatusMessage kind="error">No pudimos cargar {what}. {retry}</StatusMessage>
          )}
        </div>
      )}
    </>
  )
}
