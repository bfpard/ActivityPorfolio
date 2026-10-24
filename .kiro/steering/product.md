# Producto

## Qué es

Portafolio académico de **Kimberly Daza Contreras**, docente de primera infancia y
estudiante de Licenciatura en Educación Infantil en la UNAD (Universidad Nacional
Abierta y a Distancia), zona ZCBC – CEAD Fusagasugá, Cundinamarca.

Es un **sitio estático** que reúne:

- La presentación personal de Kimberly (página de inicio).
- Un espacio de equipo, **LabInnova**, con los perfiles de las integrantes y un
  conjunto de juegos y actividades educativas interactivas enfocadas en el
  aprendizaje de las vocales y la lectura en primera infancia.
- Material de cursos (por ejemplo, "Maestros, infancias y contextos"), organizado
  por fases. Cada fase es un informe de resultados de actividad con evidencias
  (cartografías, análisis de la problemática y un video resumen).

## Público objetivo

- Docentes y tutores que revisan el trabajo académico y las prácticas educativas.
- Niñas y niños de primera infancia que usan los juegos (vocales, memoria,
  exploración), por lo que la **accesibilidad y la claridad visual** importan.

## Idioma

Todo el contenido visible está **en español**. Redacta textos, títulos y mensajes
de interfaz en español. El código (nombres de variables, componentes) puede estar
en inglés siguiendo la convención existente.

## Principios de producto

- **No romper las URLs públicas.** El sitio se publica en GitHub Pages bajo un
  base path fijo; conservar los slugs y rutas actuales es un requisito.
- **No es una app:** es un sitio estático. No introducir SSR, adaptadores de
  servidor ni frameworks de UI (React/Vue/Svelte) salvo petición explícita.
- **Accesibilidad primero**, porque parte del público son menores: navegación por
  teclado, foco visible, contraste adecuado y respeto por `prefers-reduced-motion`.
- Las mejoras de arquitectura y rendimiento **no deben cambiar el diseño visual**
  (colores, tipografías, composición) salvo que se pida explícitamente.
- **Contenido dirigido por datos.** Las fases de los cursos se construyen pasando
  datos (JSON en `src/data/json/Maestros/`) a componentes reutilizables; evita
  duplicar markup entre fases.

## Contexto de trabajo

Existe un plan de refactor vivo en `docs/opencode/plan-refactor-astro.md` que
describe el estado actual, la deuda técnica priorizada (P0/P1/P2) y la arquitectura
objetivo. Consúltalo antes de refactorizar.
