# Rústica Perú — v3.0 (Next.js, accesible WCAG 2.1 AA)

## Propósito del proyecto

Esta página es un **caso de estudio de Interacción Hombre-Máquina (IHM)**. Está diseñada para **mostrar mejoras y resolver problemas de uso y accesibilidad de personas con discapacidades** en la plataforma web de Rústica Perú (carta, promociones, shows, sedes y reservas).

Parte de un prototipo (v2.0) con barreras de accesibilidad y llega a una versión (v3.0) que se puede usar con teclado, lector de pantalla, baja visión, daltonismo y otras necesidades. El trabajo sigue tres etapas:

1. **Auditoría:** se detectan las barreras con los criterios WCAG 2.1 AA.
2. **Rediseño inclusivo:** se corrigen contrastes, estructura, formularios y estados, y se agrega un panel de accesibilidad.
3. **Validación:** se prueba con teclado, lectores de pantalla, simulaciones de daltonismo y herramientas de contraste.

## Herramientas utilizadas

| Herramienta | Para qué se usa |
| --- | --- |
| **Next.js (App Router)** | Rutas reales (`/menu`, `/sedes`…), título por página, exportación a HTML estático |
| **React + TypeScript** | Componentes reutilizables y tipado estricto |
| **Tailwind CSS 4** | Estilos con tokens de diseño (`@theme`) en lugar de estilos repetidos |
| **next/font** | Fuentes Playfair Display (títulos) y Source Sans 3 (texto) |
| **`<dialog>` nativo del navegador** | Ventanas emergentes con foco atrapado, Esc para cerrar y retorno del foco |
| **`localStorage`** | Guarda las preferencias de accesibilidad entre visitas |
| **Render** | Publicación del sitio |
| **Figma** | Rediseño inclusivo (v3.0) |
| **Stark, Lighthouse, axe** | Pruebas de contraste y accesibilidad |
| **NVDA / VoiceOver / TalkBack** | Pruebas con lectores de pantalla |
| **Simuladores de daltonismo** | Comprobar protanopia, deuteranopia y tritanopia |

## Comandos

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # genera la carpeta out/
npm run lint     # revisa tipos (ejecuta antes un "npm run dev" o "build" para que Next genere next-env.d.ts)
```

Requiere Node.js 20.9 o superior.

## Despliegue en Render

El sitio se exporta como **HTML estático**, por lo que debe publicarse como **Static Site**:

| Campo | Valor |
| --- | --- |
| Build Command | `npm install && npm run build` |
| Publish Directory | `out` |

(La v2.0 publicaba `dist`; ahora es `out`.)

> Si Render muestra una pantalla de "el servicio se está activando…", el proyecto está creado como **Web Service** del plan gratuito, que se duerme tras unos 15 minutos sin visitas. Un Static Site no se duerme. Para evitarlo, crea el proyecto como Static Site con los valores de arriba.

## Configuración opcional

`NEXT_PUBLIC_WHATSAPP_NUMBER` (ver `.env.example`): número en formato internacional sin `+`. Si no se define, el botón flotante de WhatsApp no se muestra.

## Estructura

```
src/app          rutas: / · /menu · /promociones · /shows · /novedades · /sedes · /terminos-y-condiciones · /politica-de-privacidad
src/components   Header, Footer, Dialog (<dialog> nativo), Dropdown, formulario de reserva, panel de accesibilidad, StatusMessage…
src/data         menú, sedes, promociones, shows, noticias y textos legales
src/lib          utilidades (reservas, fechas, hojas de afiches, cierre de desplegables)
```

## Panel de accesibilidad

Disponible desde cualquier página. Los cambios se aplican al instante y se recuerdan entre visitas.

| Opción | Qué hace |
| --- | --- |
| Modo estándar / Alto contraste | Cambia a colores de mayor contraste (también responde a `prefers-contrast: more`) |
| Escala de grises | Muestra la página sin color para comprobar que nada depende de él |
| Colores para daltonismo | Paletas separadas para **protanopia**, **deuteranopia** y **tritanopia** |
| Tamaño del texto | Normal, 125 % o 150 % |
| Texto de mayor legibilidad | Fuente sencilla y más espacio entre letras, palabras y líneas |
| Reducir animaciones | Quita transiciones y animaciones (también responde a `prefers-reduced-motion`) |

## Accesibilidad por tipo de discapacidad

| Perfil | Qué se hizo |
| --- | --- |
| **Visual: ceguera** | `lang="es"`, título por página, un `h1` por vista, jerarquía de títulos, landmarks, enlace "Saltar al contenido", etiquetas asociadas a cada campo, nombres accesibles en todos los botones, estados con `aria-current` / `aria-expanded`, avisos con `role="status"` y `role="alert"`, fotos decorativas con `alt=""`, aviso "(se abre en una pestaña nueva)". |
| **Visual: baja visión** | Contrastes corregidos (texto ≥ 4.5:1, bordes de campos ≥ 3:1), foco visible grueso en todo el sitio, texto escalable (rem), alto contraste y texto 125 % / 150 %. |
| **Visual: daltonismo** | Paleta base (#FFFFFF, #202124, #595959, #D9D9D9, #F5F1E9) y tres paletas por tipo: en protanopia y deuteranopia la marca pasa a azul y el error a naranja oscuro; en tritanopia se conserva el rojo y se evitan el azul y el amarillo. Éxito, error, aviso e información (`StatusMessage`) usan **icono + texto + forma de borde**, así que no dependen del color. |
| **Auditiva** | El sitio no usa audio ni video; toda la información está en texto. |
| **Motora** | Todo operable con teclado, `<dialog>` nativo (foco atrapado, Esc, retorno del foco), desplegables que cierran con Esc, objetivos táctiles ≥ 44 px, formulario real (Enter envía), sin gestos complejos ni límites de tiempo. |
| **Cognitiva / aprendizaje** | Errores con causa y cómo corregirlos, resumen de errores con enlaces a cada campo, ayuda visible en el teléfono, nombres consistentes ("Hacer reserva", "Cerrar"), confirmación con fecha completa y hora en 12 h, texto de mayor legibilidad, sin movimiento automático. |
| **Vestibular / epilepsia** | `prefers-reduced-motion` y opción "Reducir animaciones"; nada parpadea. |

> Los contrastes se calcularon con la fórmula de WCAG a partir de los códigos de color. Las paletas de daltonismo se compararon con una simulación (matrices de Machado 2009): rojo y verde originales casi no se distinguen en protanopia y deuteranopia, y con las paletas nuevas la diferencia entre éxito y error es mucho mayor. Confírmalos con Stark o Lighthouse y completa la matriz del APF3 con tus propias capturas.

## Cambios respecto a la v2.0

- De un `App.tsx` de 1 561 líneas a componentes pequeños por responsabilidad; datos separados de la interfaz.
- Navegación con rutas reales (botón "Atrás", enlaces compartibles, título por página) en lugar de estado interno.
- Colores en tokens de diseño (`@theme`) en vez de estilos en línea repetidos.
- Ventanas emergentes centradas y más anchas (hasta 42 rem), con el mismo componente para Ver detalles, Hacer reserva, Ver más, Ver información y Accesibilidad.
- Se eliminó lo que no se usaba: carpeta `imports/`, fuente Dancing Script, `locations`/`Branch` sin uso, estado `hover` en JavaScript (ahora CSS), listas duplicadas de destacados.
- Se retiraron los botones del pie "Trabaja con Nosotros" y "Libro de Reclamaciones", que no tenían ninguna acción. Agrégalos de nuevo cuando tengas sus enlaces reales.
- "Encuentra local" en la cabecera es un enlace directo a `/sedes`.
- Fechas de noticias en español (antes "Nov 1, 2026").
- Las fotos de platos y noticias son decorativas (`alt=""`) porque el nombre ya está en el título.

## Pendiente de verificar

- Probar en navegador con teclado, zoom 200 %, un lector de pantalla (NVDA / VoiceOver / TalkBack), Lighthouse o axe y Stark.
- Revisar que ningún componente use colores escritos a mano (`bg-[#...]`, `text-green-600`), porque no cambiarían con las paletas de daltonismo.
- La reserva es de demostración: no envía datos a ningún servidor.
- Los shows del código tienen fechas de octubre de 2026 (ya pasaron); actualízalos si vas a publicar.
