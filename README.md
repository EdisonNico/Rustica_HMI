# Rústica Perú · Sitio web accesible (Next.js)

Sitio web de **Rústica Perú**: carta por sedes, promociones, shows, novedades, locales y **reservas reales con correo**. Es un caso de estudio de **Interacción Hombre-Máquina (UTP, APF3)**: parte de un prototipo con barreras de accesibilidad y llega a una versión usable con teclado, lector de pantalla, baja visión, daltonismo y uso móvil con una mano. El contenido lo entrega una API propia y se administra desde `/admin`.

## Enlaces

| Qué | Dirección |
| --- | --- |
| Sitio público | https://rustica-ihm.onrender.com |
| Panel de administración | https://rustica-ihm.onrender.com/admin/ |
| API (comprobar que vive) | https://rustica-api.onrender.com/actuator/health |
| Repositorio del sitio | https://github.com/EdisonNico/Rustica_HMI |
| Repositorio de la API | https://github.com/EdisonNico/rustica-api |
| Local (desarrollo) | http://localhost:3000 · admin: http://localhost:3000/admin/ |

> En el plan gratuito de Render la API se duerme tras ~15 min sin visitas; la primera carga puede tardar hasta ~50 s.

## Características

- **Carta interactiva por sede**, con categorías; en móvil se cambia de categoría **deslizando** o con los botones visibles «Anterior / Siguiente».
- **Promociones, Shows (solo próximos, del más cercano al más lejano), Novedades y Locales**, con ventanas de detalle.
- **Reservas reales** en 3 pasos (local y fecha · datos · confirmar). Se guardan en la base de datos, el cliente y el local reciben un correo, y el admin las gestiona (confirmar, cancelar, eliminar). Al cambiar el estado, el cliente recibe otro correo.
- **Navegación móvil para el pulgar:** barra inferior (Inicio, Carta, Reservar, Más) y ventanas que se abren como **hoja desde abajo** y se cierran deslizando hacia abajo. En tablet y escritorio se usa la cabecera normal.
- **Panel de accesibilidad:** modo noche, alto contraste, escala de grises, paletas para protanopia, deuteranopia y tritanopia, texto 125 % / 150 %, texto más legible y reducir animaciones.
- **Lector de voz** (Web Speech API, dentro del panel de accesibilidad): lee en voz alta lo que tiene el foco al usar Tab, lee la página entera, tiene control de velocidad y botones **Escuchar** en las ventanas (los botones solo aparecen con el lector activado). Esc detiene la lectura.
- **Panel `/admin`:** platos (con sedes y precio por sede), shows, promociones, novedades, imagen principal y reservas. No permite fechas ni horas pasadas.
- Sitio rápido: portada con carga prioritaria y compresión de imágenes al subirlas desde el admin.

## Herramientas

**Interfaz**  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

**API, datos y correo**  
![Java](https://img.shields.io/badge/Java_21-ED8B00?style=flat&logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) ![Brevo](https://img.shields.io/badge/Brevo-0B996E?style=flat&logo=brevo&logoColor=white)

**Accesibilidad y pruebas**  
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG_2.1_AA-005A9C?style=flat) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white) ![Lighthouse](https://img.shields.io/badge/Lighthouse-F44B21?style=flat&logo=lighthouse&logoColor=white) ![axe](https://img.shields.io/badge/axe-6E3AAF?style=flat) ![Stark](https://img.shields.io/badge/Stark-111827?style=flat) ![NVDA](https://img.shields.io/badge/NVDA-4B5563?style=flat) ![VoiceOver](https://img.shields.io/badge/VoiceOver-000000?style=flat&logo=apple&logoColor=white) ![TalkBack](https://img.shields.io/badge/TalkBack-3DDC84?style=flat&logo=android&logoColor=black)

**Despliegue y control de versiones**  
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=black) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)

**IA**  
![Claude Code](https://img.shields.io/badge/Claude_Code-D97757?style=flat&logo=claude&logoColor=white)

| Capa | Tecnología |
| --- | --- |
| Sitio | Next.js (App Router, exportación estática), React, TypeScript, Tailwind CSS 4 |
| API | Spring Boot 3.5, Java 21, Spring Security (JWT), JPA |
| Datos | Supabase (PostgreSQL + Storage) |
| Correo | Brevo (API HTTP, plan gratuito: 300 correos/día) |
| Despliegue | Render (Static Site para el sitio, Web Service Docker para la API) |
| Pruebas de accesibilidad | Lighthouse, axe, Stark, NVDA, VoiceOver, TalkBack |

## Cómo funciona

```
Navegador ──► Sitio estático (Render Static Site)
                 │  fetch HTTPS            /admin: fetch con token
                 ▼
        API Spring Boot (Render Web Service) ──► Supabase PostgreSQL (datos)
                 │                           └─► Supabase Storage (imágenes)
                 └─► Brevo (correos de reservas)
```

- El sitio es HTML estático; el contenido se pide a la API desde el navegador.
- Mientras llega se muestra «Cargando…»; si falla, un error con botón «Reintentar». La última respuesta se guarda 30 minutos en `localStorage` para pintar al instante.

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera la carpeta out/
npm run lint     # revisa tipos
```

Requiere Node.js 20.9 o superior. Para probar con la API local: `.env.local` con `NEXT_PUBLIC_API_URL=http://localhost:8080` (y reiniciar `npm run dev`).

## Variables de entorno

### Sitio (Render → rustica-ihm → Environment, o `.env.local`)

| Variable | Obligatoria | Qué es |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Sí | URL de la API sin «/» final: `https://rustica-api.onrender.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Número del botón de WhatsApp (solo dígitos, con código de país). Sin él, no se muestra |

Las variables `NEXT_PUBLIC_*` quedan dentro del sitio publicado: nunca pongas claves en ellas. Tras cambiarlas hay que volver a desplegar.

### API (Render → rustica-api → Environment)

| Variable | Qué es |
| --- | --- |
| `DB_URL` | `jdbc:postgresql://HOST-DEL-SESSION-POOLER:5432/postgres?sslmode=require` |
| `DB_USER` / `DB_PASSWORD` | Usuario (`postgres.xxxx`) y contraseña de la base |
| `JWT_SECRET` | Clave aleatoria de 32 caracteres o más |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Crean el primer administrador (la contraseña, 12 caracteres o más). Bórrala de Render una vez creado |
| `SUPABASE_URL` | Solo la base: `https://xxxx.supabase.co` (sin `/rest/v1`) |
| `SUPABASE_SERVICE_KEY` | Clave secreta de Supabase (`sb_secret_…`) |
| `SUPABASE_BUCKET` | `rustica` |
| `CORS_ORIGINS` | `https://rustica-ihm.onrender.com` (separa varios con coma; sin «/» final) |
| `BREVO_API_KEY` | Clave de Brevo con permiso solo de «Transactional email». Vacía = no se envían correos |
| `MAIL_FROM` / `MAIL_FROM_NAME` | Remitente verificado en Brevo y su nombre |
| `MAIL_ADMIN_TO` | Correo del local que recibe el aviso de cada reserva |

Antes de la primera ejecución, corre `db/schema.sql` y `db/reservations.sql` en el SQL Editor de Supabase.

## Despliegue en Render

| Servicio | Tipo | Configuración |
| --- | --- | --- |
| Sitio | Static Site | Build `npm install && npm run build` · Publish Directory `out` |
| API | Web Service (Docker) | Se despliega solo con cada `git push` a `main` |

## Tamaños de imágenes

Peso objetivo: **menos de 200 KB, formato WebP**. El admin acepta JPG, PNG o WebP de hasta 5 MB y, al subir, reduce la imagen a un máximo de 1600 px y la convierte a WebP.

| Imagen | Tamaño recomendado | Peso máximo |
| --- | --- | --- |
| Imagen principal (portada) | 1600 px de ancho | ~250 KB |
| Shows y promociones (afiche vertical) | 800 × 1000 px | ~150 KB |
| Novedades | 800 × 600 px | ~120 KB |
| Platos de la carta | 600 × 600 px | ~80 KB |

## Estructura

```
src/
├─ app/                        rutas: Inicio, menu, promociones, shows, novedades, sedes,
│                              terminos-y-condiciones, politica-de-privacidad, admin (noindex)
│  ├─ layout.tsx               estructura común, fuentes, «Saltar al contenido»
│  └─ globals.css              tokens de diseño, temas, paletas, hoja inferior móvil
├─ components/
│  ├─ Header, Footer, BottomNav, Dialog, Dropdown, ThemeToggle, StatusMessage, LiveNotice, Icons, ui
│  ├─ HomeContent, BrushEdge, CarouselSection, MenuExplorer, DishCard
│  ├─ ShowsGrid, PromotionsGrid, NewsList, LocationsExplorer, LegalDocument
│  ├─ ReservationDialog / ReservationProvider, WhatsAppButton
│  ├─ PreferencesDialog        panel de accesibilidad
│  ├─ VoiceReader, ListenButton  lector de voz
│  └─ admin/                   AdminApp, CrudPanel, ReservationsPanel, HeroPanel, forms, fields, useForm, types
├─ data/                       sedes (horarios y direcciones), navegación y textos legales
├─ lib/
│  ├─ api.ts                   cliente de la API (HTTPS, compresión de imágenes, reservas)
│  ├─ content.ts, useRemote.ts tipos y hooks de carga con caché
│  ├─ speech.ts, focusText.ts  voz y descripción de lo que tiene el foco
│  ├─ useSwipe.ts              gestos de deslizar (siempre con botón equivalente)
│  └─ format, reservation, useDismiss
└─ assets/                     logos y hero.webp (imagen local de respaldo)
```

API (`rustica-api`): `config/` (seguridad, CORS, administrador inicial) · `web/` (controladores) · `service/` (lógica, correo, imágenes) · `repo/` · `domain/` · `dto/` · `security/` (JWT, límite de intentos, cabeceras) · `db/` (SQL).

## Panel de administración

| Sección | Qué permite |
| --- | --- |
| **Reservas** | Ver, buscar y filtrar; confirmar, cancelar, volver a pendiente o eliminar; llamar o escribir al cliente |
| **Platos** | Crear, editar, ocultar o borrar; sedes donde se vende y precio propio por sede |
| **Shows** | Artista, fecha, hora, sede, afiche y descripción (sin fechas pasadas) |
| **Promociones** | Título, precio, afiche, detalles, términos, vigencia y orden |
| **Novedades** | Título, categoría, fecha, resumen e imagen |
| **Imagen principal** | Cambia la foto grande del Inicio |

## Accesibilidad

| Perfil | Qué se hizo |
| --- | --- |
| Ceguera | `lang="es"`, un `h1` por vista, landmarks, «Saltar al contenido», etiquetas en cada campo, estados con `aria-*`, avisos `role="status"` / `role="alert"`, lector de voz propio |
| Baja visión | Contraste de texto ≥ 4.5:1 y de bordes ≥ 3:1, foco visible grueso, texto escalable, alto contraste y modo noche |
| Daltonismo | Paletas para protanopia, deuteranopia y tritanopia; los estados usan icono + texto + forma, no solo color |
| Auditiva | No hay audio ni video; todo está en texto |
| Motora | Todo con teclado, ventanas `<dialog>` con foco atrapado, objetivos táctiles ≥ 44 px, gestos siempre con botón visible, navegación al alcance del pulgar |
| Cognitiva | Errores con causa y solución, reserva en pasos con resumen antes de enviar, nombres consistentes, texto más legible |
| Vestibular | `prefers-reduced-motion` y opción «Reducir animaciones»; nada parpadea |

### Teclas principales

| Tecla | Qué hace |
| --- | --- |
| Tab / Shift + Tab | Siguiente / anterior elemento |
| Enter / Espacio | Activa un botón o enlace, marca una casilla |
| Esc | Cierra una ventana o desplegable; detiene la voz |
| ← → ↑ ↓ | Cambian opciones en grupos, listas y fechas |

## Seguridad

- Sin secretos en el código: el sitio solo tiene variables públicas; las claves viven en Render.
- Todo lo que modifica datos exige sesión de administrador (JWT); lo demás se rechaza por defecto.
- Contraseñas con BCrypt, límite de intentos de inicio de sesión y CORS limitado al sitio.
- Reservas públicas: campo trampa para robots, límite por IP y límite global; el local se valida contra la base de datos.
- Imágenes validadas por su contenido real (JPG, PNG o WebP), con nombre aleatorio.
- El token del administrador vive en `sessionStorage`; el sitio no usa `innerHTML` y solo acepta APIs `https://`.
- No subas a git: `.env`, `.env.local`, `*.zip`, `log.txt`. Rota cualquier clave que se haya compartido por chat.

## Limitaciones conocidas

- Con un remitente Gmail, algunos correos pueden llegar a **Spam** (para evitarlo se necesita un dominio propio).
- No hay notificaciones push; los avisos son por correo.
- Los horarios y direcciones de **Sedes** siguen en `src/data/locations.ts`.
- La API gratuita de Render se duerme; la primera carga puede tardar.

## Pendiente de verificar

- Recorrer el sitio con teclado, zoom 200 %, lector de pantalla (NVDA / VoiceOver / TalkBack), Lighthouse, axe y Stark, incluido `/admin/`.
- Probar en un **celular real**: barra inferior, hoja de reserva, gestos y lector de voz.
- Añadir en Render las cabeceras de seguridad y revisar `npm audit`.
