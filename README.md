# Rústica Perú · Sitio web accesible (Next.js)

## Introducción

Este es el **sitio web de Rústica Perú**: carta por sedes, promociones, shows en vivo, novedades, locales y reservas. Se desarrolló como **caso de estudio de Interacción Hombre-Máquina (IHM)** (UTP, APF3): su objetivo es **mostrar mejoras y resolver problemas de uso y accesibilidad de personas con discapacidades** en la plataforma web de Rústica.

Parte de un prototipo (v2.0) con barreras de accesibilidad y llega a una versión (v3.x) que se puede usar con teclado, lector de pantalla, baja visión, daltonismo y otras necesidades. El trabajo sigue tres etapas:

1. **Auditoría:** se detectan las barreras con los criterios WCAG 2.1 AA.
2. **Rediseño inclusivo:** se corrigen contrastes, estructura, formularios y estados, y se agrega un panel de accesibilidad con modo noche y paletas para daltonismo.
3. **Validación:** se prueba con teclado, lectores de pantalla, simulaciones de daltonismo y herramientas de contraste.

Desde la v3.1 el contenido ya **no está escrito en el código**: el sitio lo lee de una **API propia** (repositorio `rustica-api`, Spring Boot + Supabase) y se administra desde un **panel `/admin`** dentro del mismo sitio. Así el equipo de Rústica puede subir platos, shows, promociones, novedades y cambiar la imagen principal sin tocar código.

## Herramientas utilizadas

**Interfaz**  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

**Datos y servicios (a través de la API)**  
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

**Accesibilidad y pruebas**  
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG_2.1_AA-005A9C?style=flat) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white) ![Lighthouse](https://img.shields.io/badge/Lighthouse-F44B21?style=flat&logo=lighthouse&logoColor=white) ![axe](https://img.shields.io/badge/axe-6E3AAF?style=flat) ![Stark](https://img.shields.io/badge/Stark-111827?style=flat) ![NVDA](https://img.shields.io/badge/NVDA-4B5563?style=flat) ![VoiceOver](https://img.shields.io/badge/VoiceOver-000000?style=flat&logo=apple&logoColor=white) ![TalkBack](https://img.shields.io/badge/TalkBack-3DDC84?style=flat&logo=android&logoColor=black)

**Despliegue y control de versiones**  
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=black) ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)

**IA**  
![Claude Code](https://img.shields.io/badge/Claude_Code-D97757?style=flat&logo=claude&logoColor=white)

| Recurso | Para qué se usa |
| --- | --- |
| Next.js (App Router, `output: 'export'`) | Rutas reales y exportación a HTML estático |
| React + TypeScript | Componentes y tipos para todos los datos de la API |
| Tailwind CSS 4 (`@theme`) | Colores, tipografía y espaciado como tokens de diseño; temas y paletas |
| `next/font` | Fuentes Playfair Display (títulos) y Source Sans 3 (texto) |
| `<dialog>` nativo | Ventanas emergentes con foco atrapado, Esc para cerrar y retorno del foco |
| `fetch` + hooks propios (`useRemote`) | Lectura de la API con estados de carga y error, y caché de la última respuesta |
| `localStorage` | Preferencias de accesibilidad y copia temporal (30 min) de la última respuesta de la API |
| `sessionStorage` | Token del administrador (se borra al cerrar la pestaña) |
| Simulación de daltonismo (Machado 2009) | Comprobar protanopia, deuteranopia y tritanopia |
| Lighthouse / axe / Stark | Auditorías de accesibilidad y contraste |

## Cómo funciona

```
Navegador ──► Sitio estático (Render Static Site, HTML generado por Next.js)
                 │
                 │  fetch (HTTPS, solo lectura)           /admin: fetch con token
                 ▼
        API Spring Boot (Render Web Service) ──► Supabase PostgreSQL (datos)
                                             └─► Supabase Storage (imágenes)
```

- El sitio se **exporta como HTML estático**. El contenido se pide a la API desde el navegador cuando se abre la página.
- Mientras llegan los datos se muestra «Cargando…». **No hay contenido de relleno:** si la API no responde, aparece un mensaje de error con botón «Reintentar», no información antigua.
- En el plan gratuito de Render la API se duerme tras ~15 minutos sin visitas; la primera carga puede tardar hasta un minuto, y el sitio lo avisa.
- Al refrescar, la última respuesta (guardada hasta 30 minutos) se pinta al instante y se actualiza en segundo plano. Cada cambio hecho en `/admin` borra esa copia.

## Comandos

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # genera la carpeta out/
npm run lint     # revisa tipos (ejecuta antes "npm run dev" o "build" para que Next genere next-env.d.ts)
```

Requiere Node.js 20.9 o superior.

## Variables de entorno

Se definen en `.env.local` (desarrollo, **no se sube a git**) y en Render → *Environment* (producción). Las variables `NEXT_PUBLIC_*` quedan **incluidas en el sitio publicado**: nunca pongas claves ni contraseñas en ellas.

| Variable | Obligatoria | Qué es |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Sí | URL de la API sin «/» final. En desarrollo: `http://localhost:8080`; en producción debe ser `https://…` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Número para el botón flotante de WhatsApp (solo dígitos, con código de país). Sin él, el botón no se muestra |

El sitio solo acepta una API con `https://` (o `http://localhost`), para que el token del administrador nunca viaje sin cifrar. Después de cambiar una variable hay que reiniciar `npm run dev` o volver a publicar.

## Despliegue en Render

El sitio es **HTML estático**, por lo que se publica como **Static Site**:

| Campo | Valor |
| --- | --- |
| Build Command | `npm install && npm run build` |
| Publish Directory | `out` |
| Environment | `NEXT_PUBLIC_API_URL` (y opcionalmente `NEXT_PUBLIC_WHATSAPP_NUMBER`) |

Las cabeceras de seguridad (CSP, HSTS, etc.) se agregan en *Static Site → Settings → Headers*; los valores exactos están en `SEGURIDAD.md`. Un Static Site no se duerme; la API (Web Service) sí, en el plan gratuito.

## Estructura

```
src/
├─ app/                       rutas
│  ├─ page.tsx                Inicio
│  ├─ menu/                   Menú interactivo por sede
│  ├─ promociones/ shows/ novedades/
│  ├─ sedes/                  locales, horarios y mapas
│  ├─ terminos-y-condiciones/ politica-de-privacidad/
│  ├─ admin/                  panel de administración (noindex)
│  ├─ layout.tsx              estructura común, fuentes, enlace «Saltar al contenido»
│  └─ globals.css             tokens de diseño, temas, paletas y estilos de accesibilidad
├─ components/
│  ├─ Header, Footer, Dialog, Dropdown, ThemeToggle, StatusMessage, LiveNotice, Icons, ui
│  ├─ HomeContent, CarouselSection, MenuExplorer, DishCard, ShowsGrid, PromotionsGrid, NewsList
│  ├─ LocationsExplorer, ReservationDialog / ReservationProvider, WhatsAppButton, LegalDocument
│  ├─ PreferencesDialog       panel de accesibilidad
│  └─ admin/                  AdminApp, CrudPanel, forms, fields, HeroPanel, useForm, types
├─ data/                      textos que no cambian: sedes (horarios y direcciones), navegación y textos legales
├─ lib/
│  ├─ api.ts                  cliente de la API (HTTPS, tiempo máximo, validación de imágenes)
│  ├─ content.ts              tipos de la interfaz y conversión desde las respuestas de la API
│  ├─ useRemote.ts            hooks useMenu, useHome, useShows, usePromotions, useNews (carga, error, caché)
│  └─ format, reservation, useDismiss
└─ assets/                    logos y hero.webp (imagen local por si la API no tiene imagen principal)
```

## Panel de administración (`/admin/`)

Solo para personal autorizado. No aparece en el menú ni en buscadores (`noindex`) y exige iniciar sesión.

| Sección | Qué permite |
| --- | --- |
| **Platos** | Crear, editar, ocultar o borrar. Un plato se crea una vez y se marca en qué **sedes** se vende, con **precio propio opcional por sede**. Foto, categoría, etiqueta y «destacado» |
| **Shows** | Artista, fecha, hora, sede, afiche y descripción |
| **Promociones** | Título, precio, afiche, detalles, términos, vigencia, orden y si sale en el carrusel de Inicio |
| **Novedades** | Título, categoría, fecha, resumen e imagen |
| **Imagen principal** | Cambia la foto grande del Inicio |

Las imágenes (JPG, PNG o WebP, hasta 5 MB) se suben desde el propio formulario y la API las valida. Ocultar un elemento («Visible» desmarcado) es una alternativa a borrarlo.

**Accesibilidad del panel:** formularios con etiqueta en cada campo, errores con texto e icono, resumen de errores con enlaces a cada campo, el foco pasa al título al cambiar de sección, ventanas nativas, confirmación antes de borrar, avisos `role="status"` / `role="alert"`, objetivos táctiles ≥ 44 px, modo noche y paletas de daltonismo.

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

Todo el sitio, incluido el panel `/admin/`, se puede usar sin ratón. El foco siempre es visible (anillo grueso) y nunca queda tapado por la cabecera fija.

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
| **Menú móvil** | Enter o Espacio en «Menú», Esc | Abre y cierra el menú |
| **Ventanas emergentes** (reserva, detalles, información, accesibilidad, formularios del panel) | Tab, Shift + Tab, Esc | El foco queda dentro de la ventana; Esc la cierra y devuelve el foco al botón que la abrió |
| **Desplegables** (local y categorías del menú) | Enter o Espacio, Tab, Esc | Abren la lista, recorren y eligen una opción, y cierran sin elegir |
| **Zonas de Sedes** | ← → ↑ ↓ | Cambian de zona; Tab entra y sale del grupo |
| **Carruseles** | Tab, Enter o Espacio | Pasa por «Ver todas», las flechas y las tarjetas; las flechas desplazan el carrusel |
| **Formulario de reserva** | Tab, Enter | Pasa de campo en campo; Enter envía |
| **Listas de selección** (Hora, Personas, Local) | ↑ ↓, primera letra, Enter | Cambian la opción |
| **Campo de fecha** | ← →, ↑ ↓, números | Se mueve entre día, mes y año y cambia el valor |
| **Resumen de errores** | Tab, Enter | Cada enlace lleva el foco al campo con el problema |
| **Panel de accesibilidad** | ↑ ↓, Espacio | Cambian las opciones de un grupo y marcan o desmarcan casillas |
| **Panel `/admin/`** | Tab, Enter, Espacio, Esc | Secciones, listas, formularios, subida de imagen y confirmación de borrado |

## Accesibilidad por tipo de discapacidad

| Perfil | Qué se hizo |
| --- | --- |
| **Visual: ceguera** | `lang="es"`, título por página, un `h1` por vista, jerarquía de títulos, landmarks, enlace «Saltar al contenido», etiquetas asociadas a cada campo, nombres accesibles en todos los botones, estados con `aria-current` / `aria-expanded`, avisos con `role="status"` y `role="alert"` (también para «Cargando…» y errores de conexión), fotos decorativas con `alt=""`, aviso «(se abre en una pestaña nueva)». |
| **Visual: baja visión y sensibilidad a la luz** | Contrastes corregidos (texto ≥ 4.5:1, bordes de campos ≥ 3:1), foco visible grueso en todo el sitio, texto escalable (rem), alto contraste, texto 125 % / 150 % y **modo noche** con contrastes verificados (texto principal 14.3:1, texto rojo 6.5:1). |
| **Visual: daltonismo** | Paleta base (#FFFFFF, #202124, #595959, #D9D9D9, #F5F1E9) y tres paletas por tipo: en protanopia y deuteranopia la marca pasa a azul y el error a naranja oscuro; en tritanopia se conserva el rojo y se evitan el azul y el amarillo. Éxito, error, aviso e información (`StatusMessage`) usan **icono + texto + forma de borde**, así que no dependen del color. |
| **Auditiva** | El sitio no usa audio ni video; toda la información está en texto. |
| **Motora** | Todo operable con teclado, `<dialog>` nativo (foco atrapado, Esc, retorno del foco), desplegables que cierran con Esc, objetivos táctiles ≥ 44 px, formularios reales (Enter envía), sin gestos complejos ni límites de tiempo. |
| **Cognitiva / aprendizaje** | Errores con causa y cómo corregirlos, resumen de errores con enlaces a cada campo, nombres consistentes («Hacer reserva», «Cerrar»), confirmación con fecha completa y hora en 12 h, mensajes claros cuando el servidor tarda («puede tardar hasta un minuto»), texto de mayor legibilidad, sin movimiento automático. |
| **Vestibular / epilepsia** | `prefers-reduced-motion` y opción «Reducir animaciones»; nada parpadea. |

> Los contrastes se calcularon con la fórmula de WCAG a partir de los códigos de color. Las paletas de daltonismo se compararon con una simulación (matrices de Machado 2009): rojo y verde originales casi no se distinguen en protanopia y deuteranopia, y con las paletas nuevas la diferencia entre éxito y error es mucho mayor. Confírmalos con Stark o Lighthouse y completa la matriz del APF3 con tus propias capturas.

## Seguridad

- **Sin secretos en el código:** el frontend solo contiene variables públicas; las claves viven en el servidor de la API y en Render.
- **Sin inyección de código:** React escapa el texto; no se usa `innerHTML`. El único script en línea es una constante propia que restaura las preferencias de accesibilidad.
- **Imágenes:** solo se muestran direcciones `https://` (se descartan `javascript:`, `data:` u otros esquemas).
- **Sesión del administrador:** token JWT en `sessionStorage` (se borra al cerrar la pestaña), nunca en `localStorage` ni en cookies; si el servidor responde 401 se cierra la sesión.
- **HTTPS:** Render entrega el certificado; el sitio rechaza una API que no use `https://` (salvo `localhost`).
- **Cabeceras:** Content-Security-Policy, HSTS, `X-Content-Type-Options`, `X-Frame-Options` y `Referrer-Policy` configurables en Render (ver `SEGURIDAD.md`).
- **Dependencias:** `.github/dependabot.yml` avisa de paquetes con versión nueva o fallos de seguridad. Ejecuta además `npm audit` y `npm outdated` antes de publicar.
- **Archivos que no deben subirse a git:** `.env.local`, `log.txt`, `*.zip`.

## Cambios respecto a la v2.0

- De un `App.tsx` de 1 561 líneas a componentes pequeños por responsabilidad; datos separados de la interfaz.
- Navegación con rutas reales (botón «Atrás», enlaces compartibles, título por página) en lugar de estado interno.
- Colores en tokens de diseño (`@theme`) en vez de estilos en línea repetidos; colores semánticos (`surface`, `brand`, `error`, `success`) para que el tema y las paletas cambien todo de una vez.
- **Modo noche** con botón en la cabecera y en el panel, y paleta propia para cada tipo de daltonismo en oscuro.
- Ventanas emergentes centradas y más anchas (hasta 42 rem), con el mismo componente para todas.
- **Contenido administrable:** menú por sedes, shows, promociones, novedades e imagen principal salen de la API y se editan desde `/admin`. Se eliminaron los datos y afiches fijos del código (`shows`, `promotions`, `news`, `menu` y las hojas de afiches), y la imagen local pasó de 5.9 MB a 319 KB.
- Se eliminó lo que no se usaba: carpeta `imports/`, fuente Dancing Script, `locations`/`Branch` sin uso, estado `hover` en JavaScript (ahora CSS), listas duplicadas de destacados.
- Se retiraron los botones del pie «Trabaja con Nosotros» y «Libro de Reclamaciones», que no tenían ninguna acción. Agrégalos de nuevo cuando tengas sus enlaces reales.
- «Encuentra local» en la cabecera es un enlace directo a `/sedes`.
- Fechas en español (antes «Nov 1, 2026»).
- Las fotos de platos y noticias son decorativas (`alt=""`) porque el nombre ya está en el título.

## Pendiente de verificar

- Recorrer todo el sitio solo con teclado (tabla de arriba), con zoom 200 %, un lector de pantalla (NVDA / VoiceOver / TalkBack), Lighthouse o axe y Stark, **incluido el panel `/admin/`**.
- Revisar que ningún componente use colores escritos a mano (`bg-[#...]`, `text-green-600`), porque no cambiarían con las paletas de daltonismo.
- **La reserva es de demostración:** muestra «Reserva confirmada» pero no envía datos a ningún servidor. Hay que conectarla (WhatsApp o un endpoint de la API con límite de envíos y campo anti-spam) o aclarar el texto.
- Los horarios y direcciones de **Sedes** siguen en `src/data/locations.ts`; falta moverlos a la API para editarlos desde el panel.
- Agregar las cabeceras de seguridad en Render y revisar `npm audit`.
