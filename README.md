# Rústica Perú — v3.0 (Next.js, accesible WCAG 2.1 AA)

## Propósito del proyecto

Esta página es un **caso de estudio de Interacción Hombre-Máquina (IHM)**. Está diseñada para **mostrar mejoras y resolver problemas de uso y accesibilidad de personas con discapacidades** en la plataforma web de Rústica Perú (carta, promociones, shows, sedes y reservas).

Parte de un prototipo (v2.0) con barreras de accesibilidad y llega a una versión (v3.0) que se puede usar con teclado, lector de pantalla, baja visión, daltonismo y otras necesidades. El trabajo sigue tres etapas:

1. **Auditoría:** se detectan las barreras con los criterios WCAG 2.1 AA.
2. **Rediseño inclusivo:** se corrigen contrastes, estructura, formularios y estados, y se agrega un panel de accesibilidad.
3. **Validación:** se prueba con teclado, lectores de pantalla, simulaciones de daltonismo y herramientas de contraste.

## Herramientas utilizadas

**Interfaz**  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

**Accesibilidad y pruebas**  
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG_2.1_AA-005A9C?style=flat) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white) ![Lighthouse](https://img.shields.io/badge/Lighthouse-F44B21?style=flat&logo=lighthouse&logoColor=white) ![axe](https://img.shields.io/badge/axe-6E3AAF?style=flat) ![Stark](https://img.shields.io/badge/Stark-111827?style=flat) ![NVDA](https://img.shields.io/badge/NVDA-4B5563?style=flat) ![VoiceOver](https://img.shields.io/badge/VoiceOver-000000?style=flat&logo=apple&logoColor=white) ![TalkBack](https://img.shields.io/badge/TalkBack-3DDC84?style=flat&logo=android&logoColor=black)

**Despliegue y control de versiones**  
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=black) ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)

**IA**  
![Claude Code](https://img.shields.io/badge/Claude_Code-D97757?style=flat&logo=claude&logoColor=white)

| Recurso | Para qué se usa |
| --- | --- |
| `next/font` | Fuentes Playfair Display (títulos) y Source Sans 3 (texto) |
| `<dialog>` nativo | Ventanas emergentes con foco atrapado, Esc para cerrar y retorno del foco |
| `localStorage` | Guarda las preferencias de accesibilidad entre visitas |
| Simulación de daltonismo | Comprobar protanopia, deuteranopia y tritanopia |

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
| Modo claro / Modo noche | Cambia entre fondo claro y oscuro. También hay un botón de sol y luna en la cabecera, siempre visible; sigue la preferencia del sistema si el visitante no eligió |
| Modo estándar / Alto contraste | Cambia a colores de mayor contraste (también responde a `prefers-contrast: more`) |
| Escala de grises | Muestra la página sin color para comprobar que nada depende de él |
| Colores para daltonismo | Paletas separadas para **protanopia**, **deuteranopia** y **tritanopia** |
| Tamaño del texto | Normal, 125 % o 150 % |
| Texto de mayor legibilidad | Fuente sencilla y más espacio entre letras, palabras y líneas |
| Reducir animaciones | Quita transiciones y animaciones (también responde a `prefers-reduced-motion`) |

## Navegación con teclado

Todo el sitio se puede usar sin ratón. El foco siempre es visible (anillo grueso) y nunca queda tapado por la cabecera fija.

### Teclas generales

| Tecla | Qué hace |
| --- | --- |
| **Tab** | Pasa al siguiente enlace, botón o campo |
| **Shift + Tab** | Vuelve al anterior |
| **Enter** | Abre un enlace, pulsa un botón o envía un formulario |
| **Espacio** | Pulsa un botón, marca una casilla o elige una opción |
| **Esc** | Cierra una ventana emergente o un desplegable |
| **↑ ↓** | Desplazan la página (si el foco no está en un campo) |
| **Re Pág / Av Pág**, **Espacio / Shift + Espacio** | Suben y bajan una pantalla |
| **Inicio / Fin** | Van al principio o al final de la página |
| **Ctrl + +** / **Ctrl + −** | Amplían y reducen el zoom del navegador |

### Teclas por componente

| Componente | Teclas | Qué hace |
| --- | --- | --- |
| **Saltar al contenido** | Tab (primer elemento), Enter | Salta la cabecera y va directo al contenido principal |
| **Cabecera** | Tab, Enter | Recorre logo, navegación, redes, botón de sol y luna y botón de accesibilidad |
| **Botón sol y luna** | Enter o Espacio | Cambia entre modo claro y modo noche |
| **Menú móvil** | Enter o Espacio en "Menú", Esc | Abre y cierra el menú |
| **Ventanas emergentes** (reserva, detalles, información, accesibilidad) | Tab, Shift + Tab, Esc | El foco queda dentro de la ventana; Esc la cierra y devuelve el foco al botón que la abrió |
| **Desplegables** (local y categorías del menú) | Enter o Espacio, Tab, Esc | Abren la lista, recorren y eligen una opción, y cierran sin elegir |
| **Zonas de Sedes** | ← → ↑ ↓ | Cambian de zona; Tab entra y sale del grupo |
| **Carruseles** | Tab, Enter o Espacio | Pasa por "Ver todas", las flechas y las tarjetas; las flechas desplazan el carrusel |
| **Formulario de reserva** | Tab, Enter | Pasa de campo en campo; Enter envía |
| **Listas de selección** (Hora, Personas, Local) | ↑ ↓, primera letra, Enter | Cambian la opción |
| **Campo de fecha** | ← →, ↑ ↓, números | Se mueve entre día, mes y año y cambia el valor |
| **Resumen de errores** | Tab, Enter | Cada enlace lleva el foco al campo con el problema |
| **Panel de accesibilidad** | ↑ ↓, Espacio | Cambian las opciones de un grupo y marcan o desmarcan casillas |

## Accesibilidad por tipo de discapacidad

| Perfil | Qué se hizo |
| --- | --- |
| **Visual: ceguera** | `lang="es"`, título por página, un `h1` por vista, jerarquía de títulos, landmarks, enlace "Saltar al contenido", etiquetas asociadas a cada campo, nombres accesibles en todos los botones, estados con `aria-current` / `aria-expanded`, avisos con `role="status"` y `role="alert"`, fotos decorativas con `alt=""`, aviso "(se abre en una pestaña nueva)". |
| **Visual: baja visión y sensibilidad a la luz** | Contrastes corregidos (texto ≥ 4.5:1, bordes de campos ≥ 3:1), foco visible grueso en todo el sitio, texto escalable (rem), alto contraste, texto 125 % / 150 % y **modo noche** con contrastes verificados (texto principal 14.3:1, texto rojo 6.5:1). |
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
- **Modo noche** con botón en la cabecera y en el panel, y paleta propia para cada tipo de daltonismo en oscuro.
- Colores semánticos (`surface`, `brand`, `error`, `success`) en lugar de `bg-white` y `text-red`, para que el tema y las paletas cambien todo de una vez.
- Ventanas emergentes centradas y más anchas (hasta 42 rem), con el mismo componente para Ver detalles, Hacer reserva, Ver más, Ver información y Accesibilidad.
- Se eliminó lo que no se usaba: carpeta `imports/`, fuente Dancing Script, `locations`/`Branch` sin uso, estado `hover` en JavaScript (ahora CSS), listas duplicadas de destacados.
- Se retiraron los botones del pie "Trabaja con Nosotros" y "Libro de Reclamaciones", que no tenían ninguna acción. Agrégalos de nuevo cuando tengas sus enlaces reales.
- "Encuentra local" en la cabecera es un enlace directo a `/sedes`.
- Fechas de noticias en español (antes "Nov 1, 2026").
- Las fotos de platos y noticias son decorativas (`alt=""`) porque el nombre ya está en el título.

## Pendiente de verificar

- Recorrer todo el sitio solo con teclado (tabla de arriba), con zoom 200 %, un lector de pantalla (NVDA / VoiceOver / TalkBack), Lighthouse o axe y Stark.
- Revisar que ningún componente use colores escritos a mano (`bg-[#...]`, `text-green-600`), porque no cambiarían con las paletas de daltonismo.
- La reserva es de demostración: no envía datos a ningún servidor.
- Los shows del código tienen fechas de octubre de 2026 (ya pasaron); actualízalos si vas a publicar.
