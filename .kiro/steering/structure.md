# Estructura del proyecto

## Árbol de alto nivel

```text
academic-porfolio/
├── astro.config.mjs          # site + base (/ActivityPorfolio), plugin Tailwind
├── package.json              # scripts dev/build/preview, Node >= 22.12
├── .github/workflows/
│   └── deploy.yml            # despliegue a GitHub Pages (push a master)
├── docs/opencode/
│   └── plan-refactor-astro.md  # plan de refactor y diagnóstico vivo
├── public/                   # servido tal cual bajo el base path
│   ├── favicon.ico / favicon.svg
│   ├── audio/cuento.mpeg
│   └── images/*.webp         # fotos y evidencias (referidas con /ActivityPorfolio/images/...)
└── src/
    ├── assets/               # svg (astro, background) — algunos sin uso
    ├── components/           # componentes .astro
    ├── data/json/            # contenido en JSON (perfiles, navegación, fases)
    ├── layouts/Layout.astro  # shell HTML: head, Header, <main>, Footer, fondo
    ├── pages/                # rutas (routing basado en archivos)
    ├── styles/global.css     # @import tailwindcss + base
    └── types/                # tipos TS compartidos (Profile, vocalGame)
```

## Componentes (`src/components`)

- `Layout.astro` (en `src/layouts`): envoltorio de todas las páginas. Renderiza
  `<head>`, `Header`, un único `<main>` con `<slot />`, `Footer` y el fondo decorativo.
  **Recibe `headerNavigation` por props.**
- `Header.astro` / `Footer.astro`: cabecera con navegación y pie.
- `AboutMe.astro`: sección de presentación; recibe `profile` (tipo `Profile`).
- `ActivityContent.astro`: informe de resultados de una fase de curso. **Totalmente
  dirigido por props** (ver abajo).
- `Dashboard.astro`: tablero de dibujo con canvas.
- `VocalGame.astro`: juego de vocales (markup + lógica + estilos en un solo archivo).

### Contrato de `ActivityContent.astro`

Recibe dos props y no tiene datos hardcodeados:

- `activity` (obligatorio): objeto con `title`, `description` y `evidence`:
  - `socialCartography` / `groupCartography`: tarjetas de imagen.
    `groupCartography` usa `images: { src, alt }[]` para maquetar **N imágenes**.
  - `problematic`: `title`, `description` y `steps?: string[]` opcional, que se
    renderiza como lista `<ul>/<li>` cuando existe.
  - `video`: soporta **dos escenarios**: `youtubeUrl` (YouTube) o `iframe.embedUrl`
    (iframe genérico, p. ej. SharePoint/Stream). El componente resuelve
    `videoSrc = youtubeUrl ?? iframe?.embedUrl`.
- `tableData` (opcional): tabla (p. ej. "Diario de campo"). Si no se pasa o no
  tiene filas, la tabla no se renderiza.

> Patrón: para añadir una fase nueva, crea su JSON en `src/data/json/Maestros/` y
> una página en `src/pages/cursos/...` que importe el JSON y lo pase a
> `ActivityContent`. No dupliques el markup.

## Datos (`src/data/json`)

- Perfiles: `kimberly.json`, `kimberlyInnova.json`, `anaInnova.json`,
  `adrianaInnova.json`, `alejaInnova.json` (estructura = tipo `Profile`).
- Navegación: `headerDefault.json`, `headerinnova.json`.
- Fases de curso: `Maestros/fase2.json`, `Maestros/fase3.json` (estructura
  consumida por `ActivityContent`: `activityInfo` + `tableData` opcional).

> Hay duplicación conocida (p. ej. `kimberly.json` vs `kimberlyInnova.json`) y
> rutas con el base path escritas a mano. Ver el plan de refactor antes de tocar.

## Rutas (`src/pages`) — routing por archivos

El base path `/ActivityPorfolio` se antepone a todas estas rutas en producción.

```text
src/pages/
├── index.astro                               -> /
├── cursos/maestros-infancias-contextos/
│   ├── fase2.astro                           -> /cursos/maestros-infancias-contextos/fase2
│   └── fase3.astro                           -> /cursos/maestros-infancias-contextos/fase3
├── labinnova/
│   ├── index.astro                           -> /labinnova
│   ├── integrantes/
│   │   ├── kimberly-daza-contreras.astro     # 1 página por integrante (slugs fijos)
│   │   ├── ana-matilde-lozano-reyes.astro
│   │   ├── adriana-hernandez-barbosa.astro
│   │   └── alejandra-galeano.astro
│   └── games/
│       ├── cuestionario/index.astro
│       ├── explora-vocales/index.astro
│       ├── exploradores/index.astro
│       ├── juego-vocal-ana/index.astro
│       ├── memoria/index.astro
│       ├── sonido-y-vocales/index.astro
│       ├── vocales/index.astro
│       └── vocales-viajeras/index.astro
└── labinnova/juegos/                         # directorio de juegos (en evolución)
```

**Los slugs de `integrantes/`, las carpetas de `games/` y las rutas de `fase*` son
contrato público: no renombrarlos.** Al enlazar una fase nueva desde el header,
actualiza su `href` en `headerDefault.json`.

## Tipos (`src/types`)

- `profiles.ts`: `Profile` y `ProfileCard`.
- `vocalGame.ts`: tipos del juego de vocales.

## Convenciones

- **Idioma del contenido:** español. Nombres de código: inglés (como el existente).
- **Estilos:** Tailwind 4 vía utilidades; CSS scoped dentro de `.astro` cuando hace
  falta. Los tokens de color del sitio son `#6278FF`, `#D4E5F8`, `#F1E4D5`,
  `#A64B2A`, `#0C2340`.
- **Imágenes:** hoy en `public/images` y referidas con ruta absoluta que incluye el
  base path. Usa el mismo patrón salvo que exista ya un helper de rutas.
- **Nuevas páginas:** colócalas bajo `src/pages` respetando la jerarquía y el base
  path; no dupliques bloques que puedan extraerse a un componente o a datos.
- Al tocar contenido duplicado o rutas, revisa primero
  `docs/opencode/plan-refactor-astro.md`.
