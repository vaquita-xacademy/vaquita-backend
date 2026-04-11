# Cambios

## 2026-04-02

### Bug fix: servidor arranca sin conexion a DB (`src/app.ts`)
- `initializeDatabase()` ahora re-lanza el error en lugar de suprimirlo.
- `startServer().catch()` llama `process.exit(1)` si la inicializacion falla.
- **Motivo:** el servidor quedaba vivo pero crasheaba en la primera query a la DB.

### Bug fix: handler de errores global (`src/app.ts`)
- Agregado handler 404 para rutas no definidas.
- Agregado middleware de error global `(err, req, res, next)` al final de la cadena de middlewares.
- Usa `HttpException` para respuestas tipadas; fallback a 500 para errores inesperados.
- **Motivo:** errores no capturados en controllers no devolvian respuesta HTTP al cliente.

### Eliminacion: modulo `donors` (`src/modules/donors/`)
- Eliminados `donor.service.ts` y `dto/create-donor.dto.ts`.
- **Motivo:** el modulo estaba incompleto (usuario nunca se creaba, codigo comentado). La logica de donantes quedo obsoleta al incorporar el campo `role` en el modelo `User` (`donor` | `owner` | `admin`).

### Fix modelo: `verified-profile.model.ts`
- `user_id` ahora tiene `unique: true` y `references: { model: "users", key: "id" }` explicito.
- **Motivo:** la relacion User → VerifiedProfile es 1:1; sin UNIQUE la DB permitia multiples perfiles por usuario.

### Fix modelo: `project.model.ts`
- `slug` cambiado de `STRING(100)` a `STRING(200)` para alinearse con la nueva migracion.

### Nueva migracion: `20260402000001-add-unique-user-id-verified-profiles.ts`
- Agrega constraint `UNIQUE` (`uq_verified_profiles_user_id`) en `verified_profiles.user_id`.
- **Motivo:** garantizar integridad de la relacion 1:1 a nivel de DB.

### Nueva migracion: `20260402000002-add-indexes-fk-and-status.ts`
- Agrega indices en:
  - `verified_profiles.user_id` → `idx_verified_profiles_user_id`
  - `projects.owner_id` → `idx_projects_owner_id`
  - `projects.category_id` → `idx_projects_category_id`
  - `projects.status` → `idx_projects_status`
- **Motivo:** PostgreSQL no crea indices automaticamente en FK; sin ellos cada join/filtro hace full table scan.

### Bug fix critico: `authorizeProfile` middleware (`src/middlewares/authorize-profile.middleware.ts`)
- Agregado `return` antes de `next()` en el bloque OWNER con perfil aprobado.
- **Motivo:** sin el `return`, la ejecucion continuaba hasta `errorResponse(403)` despues de llamar `next()`, causando "Cannot set headers after they are sent" en cada creacion de proyecto exitosa.

### Modulo projects: nuevos endpoints y correcciones
- `GET /projects/mine` — lista paginada de proyectos del owner autenticado (con filtros de status y search).
- `GET /projects/:slug` — detalle publico de un proyecto por slug.
- `PATCH /projects/:id` — edicion de proyecto (owner del proyecto o admin). DTO: `UpdateProjectDTO` (todos los campos opcionales).
- `PATCH /projects/:id/status` — cambio de estado (owner o admin). DTO: `UpdateProjectStatusDTO`.
- `ProjectResource.toCard()` — nueva vista reducida para listados con owner embebido; ahora `listProjects` aplica el resource correctamente.
- Fix en `matchSortOption`: eliminados `break` inalcanzables despues de `return`, reemplazado por `default`.
- Fix en controller: `error.statusCode` → `error.status` para alinearse con `HttpException`.
- Orden de rutas corregido: `/mine` declarado antes de `/:slug` para evitar que Express capture "mine" como parametro de slug.

### Seguridad: helmet + rate limiting en auth
- Agregado `helmet` en `app.ts` como primer middleware — activa headers HTTP de seguridad (CSP, X-Frame-Options, HSTS, etc.).
- Nuevo middleware `src/middlewares/rate-limit.middleware.ts` con `authRateLimit`: max 10 requests por IP cada 15 minutos, responde 429 con mensaje en español.
- Aplicado en `POST /auth/register` y `POST /auth/login`.
- **Motivo:** sin rate limiting ambos endpoints son vulnerables a ataques de fuerza bruta y enumeracion de usuarios.

### Validacion de variables de entorno al arranque (`src/config/env.validation.ts`)
- Nuevo modulo `validateEnv()` que verifica al inicio que existan: `DB_HOST`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `COOKIE_SECRET`.
- Si falta alguna, imprime cuales son y llama `process.exit(1)` antes de levantar Express.
- Se llama en `app.ts` inmediatamente despues de `dotenv/config` para que ningun modulo se inicialice con valores vacios.
- **Motivo:** sin esto el servidor arranca silenciosamente con secrets vacios y falla de forma críptica en el primer request.

### Nueva migracion: `20260402000003-alter-projects-slug-length.ts`
- Amplia `projects.slug` de `VARCHAR(100)` a `VARCHAR(200)`.
- **Motivo:** el helper genera slugs con sufijo numerico aleatorio; titulos largos podrian truncarse silenciosamente.

### Bug fix: TypeScript en `project.controller.ts`
- `request.params.slug` y `request.params.id` casteados a `string` explicitamente en `getBySlug`, `update` y `updateStatus`.
- **Motivo:** Express tipifica `params` como `string | string[]`; TypeScript rechazaba pasar ese valor directamente a funciones que esperan `string`.
