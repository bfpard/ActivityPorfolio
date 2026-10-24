# Stack técnico

## Tecnologías

- **Astro 7** en modo estático (sin SSR ni adaptador).
- **Tailwind CSS 4**, integrado vía el plugin de Vite `@tailwindcss/vite`
  (no hay `tailwind.config.js`; la configuración vive en CSS con `@import "tailwindcss"`).
- **TypeScript** en modo `strict`.
- **Node.js >= 22.12.0** (ver `engines` en `package.json`).
- Componentes `.astro` con `<script>` y `<style>` scoped. No se usan frameworks de UI.

## Comandos

Todos se ejecutan desde la raíz del proyecto:

| Comando            | Acción                                             |
| ------------------ | -------------------------------------------------- |
| `npm install`      | Instala dependencias                               |
| `npm run dev`      | Servidor local (`astro dev --host`)                |
| `npm run build`    | Construye el sitio a `./dist/`                     |
| `npm run preview`  | Previsualiza el build local                        |
| `npm run astro`    | CLI de Astro (`astro add`, `astro check`, etc.)    |

### Servidor de desarrollo

En este entorno Windows/PowerShell, **no lances `npm run dev` como comando
bloqueante**. Si necesitas un servidor en marcha, usa un proceso en segundo plano
o pide al usuario que lo ejecute en su terminal. Para validar cambios prefiere
`npm run build` (y `npm run preview` para revisar el resultado con el `base` real).

> Nota: `AGENTS.md`/`CLAUDE.md` mencionan `astro dev --background`; ese flag no
> forma parte de los scripts actuales de `package.json`.

## Despliegue

- Se publica en **GitHub Pages** mediante `.github/workflows/deploy.yml`
  (`withastro/action` + `actions/deploy-pages`), disparado por push a la rama
  `master` o manualmente.
- Repositorio: `https://github.com/bfpard/ActivityPorfolio`.

## Configuración de Astro (`astro.config.mjs`)

- `site: 'https://bfpard.github.io'`
- `base: '/ActivityPorfolio'` — **toda ruta pública cuelga de este base path.**
- `devToolbar` deshabilitado.

### Base path — regla importante

Hoy el base path `/ActivityPorfolio` está **escrito a mano** en muchos JSON,
componentes y clases CSS (imágenes, favicon, enlaces de navegación). Al crear o
mover enlaces y recursos, ten en cuenta este prefijo. El plan de refactor propone
un helper `withBase()` basado en `import.meta.env.BASE_URL`; si ya existe, úsalo en
lugar de escribir `/ActivityPorfolio` a mano.

## Verificación

- Tras cambios, ejecuta `npm run build` antes de dar algo por terminado.
- Si `astro check` está disponible, úsalo para validar tipos y plantillas.
- El build emite warnings de `vite` del tipo "`/ActivityPorfolio/images/...`
  didn't resolve at build time": son **preexistentes** (rutas absolutas con base
  path que se resuelven en runtime) y no indican un fallo del cambio.
- No añadas tests automáticamente salvo que se pidan.

## Restricciones

- No introducir React, Vue, Svelte ni otros frameworks de UI.
- No pasar a SSR ni añadir adaptadores de servidor.
- No cambiar las URLs públicas ni los slugs existentes.
- No modificar la configuración de git.
