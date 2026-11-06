# Rústica Perú — v3.0 (Next.js, accesible WCAG 2.1 AA)

Migración del prototipo v2.0 (Vite + una sola página) a **Next.js (App Router) + TypeScript + Tailwind CSS 4**, con foco en accesibilidad universal.
El sitio se exporta como **HTML estático**: no necesita servidor.

## Comandos

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # genera la carpeta out/
npm run lint     # revisa tipos (ejecuta antes un "npm run dev" o "build" para que Next genere next-env.d.ts)
```

Requiere Node.js 20.9 o superior.

## Despliegue en Render

Crea (o edita) un **Static Site**:

| Campo | Valor |
| --- | --- |
| Build Command | `npm install && npm run build` |
| Publish Directory | `out` |

(La v2.0 publicaba `dist`; ahora es `out`.)

## Configuración opcional

`NEXT_PUBLIC_WHATSAPP_NUMBER` (ver `.env.example`): número en formato internacional sin `+`. Si no se define, el botón flotante de WhatsApp no se muestra (en la v2.0 enlazaba a `https://wa.me/` sin número).

## Estructura

```
src/app          rutas: / · /menu · /promociones · /shows · /novedades · /sedes · /terminos-y-condiciones · /politica-de-privacidad
src/components   Header, Footer, Dialog (<dialog> nativo), Dropdown, formulario de reserva, panel de accesibilidad…
src/data         menú, sedes, promociones, shows, noticias y textos legales (datos copiados de la v2.0, sin cambios de contenido)
src/lib          utilidades (reservas, fechas, hojas de afiches, cierre de desplegables)
```

## Accesibilidad por tipo de discapacidad

| Perfil | Qué se hizo |
| --- | --- |
| **Visual: ceguera** | `lang="es"`, título por página, un `h1` por vista, jerarquía de títulos, landmarks, enlace "Saltar al contenido", etiquetas asociadas a cada campo, nombres accesibles en todos los botones, estados con `aria-current` / `aria-expanded`, avisos con `role="status"`, fotos decorativas con `alt=""`, aviso "(se abre en una pestaña nueva)". |
| **Visual: baja visión** | Contrastes corregidos (texto ≥ 4.5:1, bordes de campos ≥ 3:1), foco visible grueso en todo el sitio, texto escalable (rem, sin tamaños fijos de 10 px), panel **Accesibilidad** con alto contraste y texto 125 % / 150 %; también responde a `prefers-contrast: more`. |
| **Visual: daltonismo** | El estado activo, los errores y las selecciones no dependen solo del color (ícono ✓ / ⚠ + texto). |
| **Auditiva** | El sitio no usa audio ni video; toda la información está en texto. |
| **Motora** | Todo operable con teclado, `<dialog>` nativo (foco atrapado, Esc, retorno del foco), desplegables que cierran con Esc, objetivos táctiles ≥ 44 px, formulario real (Enter envía), sin gestos complejos ni límites de tiempo. |
| **Cognitiva / aprendizaje** | Errores con causa y cómo corregirlos, resumen de errores con enlaces a cada campo, ayuda visible en el teléfono, nombres consistentes ("Hacer reserva", "Cerrar"), confirmación con fecha completa y hora en 12 h, sin movimiento automático. |
| **Vestibular / epilepsia** | `prefers-reduced-motion` y opción "Reducir animaciones"; nada parpadea. |

> Los números de contraste se calcularon con la fórmula de WCAG 2.1 a partir de los códigos de color. Confírmalos con Stark o Lighthouse y completa la matriz del APF3 con tus propias capturas.

## Cambios respecto a la v2.0 (limpieza)

- De un `App.tsx` de 1 561 líneas a componentes pequeños por responsabilidad; datos separados de la interfaz.
- Navegación con rutas reales (botón "Atrás", enlaces compartibles, título por página) en lugar de estado interno.
- Colores en tokens de diseño (`@theme`) en vez de estilos en línea repetidos.
- Se eliminó lo que no se usaba: carpeta `imports/` (4 imágenes), fuente Dancing Script, `locations`/`Branch` sin uso, estado `hover` en JavaScript (ahora CSS), listas duplicadas de destacados.
- Se retiraron los botones del pie "Trabaja con Nosotros" y "Libro de Reclamaciones", que no tenían ninguna acción. Agrégalos de nuevo cuando tengas sus enlaces reales.
- "Encuentra local" en la cabecera ahora es un enlace directo a `/sedes` (antes era un desplegable que repetía las pestañas de esa página).
- Fechas de noticias en español (antes "Nov 1, 2026").
- Las fotos de platos y noticias son imágenes de stock; ahora son decorativas (`alt=""`) porque el nombre ya está en el título.

## Pendiente de verificar (no se pudo hacer sin red ni navegador)

- `npm install` y `npm run build` no se ejecutaron en este entorno. Los tipos se revisaron con `tsc` (modo estricto, sin errores) y las páginas se renderizaron en servidor sin errores, pero falta probar en navegador.
- Probar con teclado, zoom 200 %, un lector de pantalla (NVDA / VoiceOver / TalkBack), Lighthouse o axe y Stark.
- La reserva es de demostración: no envía datos a ningún servidor.
- Los shows del código tienen fechas de octubre de 2026 (ya pasaron); actualízalos si vas a publicar.
