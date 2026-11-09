/**
 * Cliente de la API de Rústica (Spring Boot).
 * La dirección se define con NEXT_PUBLIC_API_URL (por ejemplo https://rustica-api.onrender.com).
 * Si la variable no existe, el sitio funciona solo con los datos de src/data.
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').trim().replace(/\/+$/, '')

const isLocal = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(API_URL)
/** Solo se acepta HTTPS (o localhost al desarrollar): el token del administrador nunca viaja sin cifrar. */
export const apiEnabled = API_URL.startsWith('https://') || isLocal

/** Imágenes: solo https (o localhost). Evita esquemas como "javascript:" o "data:" venidos de datos externos. */
export function safeImageUrl(value: string | null | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || (url.protocol === 'http:' && url.hostname === 'localhost') ? url.href : null
  } catch {
    return null
  }
}

/** El plan gratuito de Render tarda hasta ~60 s en despertar. */
const TIMEOUT_MS = 60_000

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields: Record<string, string> = {},
  ) {
    super(message)
  }
}

async function request<T>(path: string, init: RequestInit = {}, timeout = TIMEOUT_MS): Promise<T> {
  if (!apiEnabled) throw new ApiError('La API no está configurada.', 0)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(`${API_URL}${path}`, { ...init, signal: init.signal ?? controller.signal })
    if (response.status === 204) return undefined as T
    const body = await response.json().catch(() => null)
    if (!response.ok) {
      throw new ApiError(body?.message ?? 'No se pudo completar la solicitud.', response.status, body?.fields ?? {})
    }
    return body as T
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('No se pudo conectar con el servidor.', 0)
  } finally {
    clearTimeout(timer)
  }
}

/** Lectura pública (sin credenciales). */
export const apiGet = <T>(path: string, signal?: AbortSignal) => request<T>(path, { signal })

/** Peticiones del panel: llevan el token del administrador. */
export function adminRequest<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, token: string, body?: unknown) {
  return request<T>(path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}

export function login(email: string, password: string) {
  return request<{ token: string; expiresInMinutes: number }>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

/** Sube una imagen (JPG, PNG o WebP, máx. 5 MB) y devuelve su ruta y URL pública. */
export function uploadImage(token: string, file: File, folder: 'dishes' | 'shows' | 'promotions' | 'news' | 'hero') {
  const form = new FormData()
  form.append('file', file)
  form.append('folder', folder)
  return request<{ path: string; url: string }>(`/api/admin/uploads`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })
}
