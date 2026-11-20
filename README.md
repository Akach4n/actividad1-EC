**Nombre completo:** Izan Fernández Martín\
**Curso:** 2ºDAW\
**Asignatura:** Desarrollo web en entorno cliente\
**Centro:** U-tad

# Películas Manolo

Aplicación web hecha con **Angular** y **Tailwind CSS** para explorar películas y series usando la API de [The Movie Database (TMDB)](https://developer.themoviedb.org/docs).

## Puesta en marcha

Requiere Node 20.12 o superior.

```bash
pnpm install
cp .env.example .env   # rellenar API_KEY con tu clave de TMDB
pnpm start             # desarrollo en http://localhost:4200
pnpm build             # compilación de producción
```

Al arrancar o compilar se genera `src/environments/environment.ts` con las variables del `.env` (script `scripts/set-env.mjs`). Ese archivo no se sube al repositorio.

## Estructura

```
src/app/
├── components/   # componentes reutilizables
├── pages/        # vistas asociadas a rutas
├── services/     # servicios (llamadas a la API, estado...)
└── models/       # interfaces y tipos
```
