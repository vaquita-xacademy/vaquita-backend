# Cambios

## 2026-04-02

### Implementación: módulo Organizations

#### Migraciones
- `20260402000004` — Crea tabla `organizations` (`id`, `owner_id`, `name`, `description`, `logo_url`). Índice en `owner_id`.
- `20260402000005` — Crea tabla `organization_verified_profiles` (`organization_id` UNIQUE, `legal_name`, `tax_id` UNIQUE, `document_url`, `entity_type`, `status`). Índice en `organization_id`.
- `20260402000006` — Agrega columna `organization_id` (nullable, FK a organizations con `ON DELETE SET NULL`) a `projects`. Índice en `organization_id`.

#### Modelos
- Nuevo `organization.model.ts` — relación con `User` (belongsTo) y con `OrganizationVerifiedProfile` (hasOne).
- Nuevo `organization-verified-profile.model.ts` — espeja estructura de `verified_profiles` pero apunta a `organization_id`.
- `project.model.ts` — campo `organization_id` (nullable) agregado.
- `db/models/index.ts` — asociaciones de `Organization` y `OrganizationVerifiedProfile` registradas.

#### Módulo organizations
- `POST /organizations` — owner crea organización.
- `GET /organizations/mine` — owner lista sus organizaciones con estado de verificación embebido.
- `GET /organizations` — admin lista todas.
- `GET /organizations/:id` — público, detalle de org.
- `PATCH /organizations/:id` — owner edita su org.
- `POST /organizations/:id/verification` — owner envía verificación de la org.
- `GET /organizations/:id/verification` — owner o admin ven la verificación.
- `PATCH /organizations/:id/verification/status` — admin aprueba o rechaza.

#### Middleware authorizeProfile actualizado
- Si `organization_id` viene en el body de `POST /projects`, verifica además: que la org exista, que el user sea su owner, y que tenga `organization_verified_profile` aprobado.
- Sin `organization_id`, comportamiento anterior (solo verifica perfil de usuario).

#### CreateProjectDTO y ProjectService actualizados
- `organization_id` agregado como campo opcional al DTO.
- `ProjectService.create` persiste `organization_id` (null si no se provee).
- `ProjectResource.toResponse` incluye `organization_id` en la respuesta.

### Swagger: documentación completa de todos los módulos
- **Verified Profiles** — schemas, examples, responses y paths para los 4 endpoints (`POST /`, `GET /mine`, `GET /`, `PATCH /:id/status`).
- **Organizations** — schemas, examples, responses y paths para los 8 endpoints (CRUD de org + flujo de verificación).
- **Projects** — completados los 4 endpoints faltantes (`GET /mine`, `GET /:slug`, `PATCH /:id`, `PATCH /:id/status`). Actualizado `CreateProjectRequestSchema` con campo `organization_id` opcional. Actualizado `CreateProjectSuccessExample` con `organization_id`.
- Tags agregados: `Verified Profiles`, `Organizations`. Renombrado tag `Projects` description.
- Actualizados todos los índices: `schemas/index.ts`, `responses/index.ts`, `examples/index.ts`, `paths/index.ts`, `tags/index.ts`.
- **Disponible en:** `http://localhost:3000/api/v1/docs`

### Implementación: módulo Donations

#### Migración
- `20260402000007` — Crea tabla `donations` (`donor_id` FK, `project_id` FK, `amount` DECIMAL(15,2), `message` TEXT nullable). Índices en `donor_id` y `project_id`.

#### Modelo
- Nuevo `donation.model.ts` con relaciones `belongsTo User (donor)` y `belongsTo Project`.
- `db/models/index.ts` — asociaciones `User hasMany Donation` y `Project hasMany Donation`.

#### Módulo donations
- `POST /donations` — cualquier usuario autenticado dona a un proyecto activo. Incrementa `current_amount` en transacción atómica.
- `GET /donations/mine` — donor ve su historial con info del proyecto (sin ver otros donors).
- `GET /projects/:id/donations` — owner del proyecto o admin ven quiénes donaron y cuánto.

#### Reglas de negocio
- Solo proyectos con `status = active` aceptan donaciones.
- Las donaciones son permanentes (no se pueden cancelar).
- Visibilidad privada: donors no ven otros donors; solo el owner/admin ve la lista completa.

#### Swagger
- Schemas: `CreateDonationRequestSchema`.
- 3 nuevas responses, 3 nuevos examples, 3 nuevos paths.
- Tag `Donations` agregado.

### Relevamiento: módulo Donations (pendiente de implementación)
- Donors pueden donar a proyectos activos. Simulado por ahora, con intención de integrar Mercado Pago en el futuro.
- Tabla `donations`: `donor_id`, `project_id`, `amount`, `message` (nullable). Permanentes, sin cancelación.
- `projects.current_amount` se incrementa en transacción atómica con cada donación.
- Privacidad: owner ve quiénes donaron; donor solo ve su propio historial.
- Detalle completo en `devlogV2.md` (sección "Relevamiento — Módulo Donations 2026-04-02").
- **Pendiente:** implementar modelo, migración, módulo donations y swagger.

### Relevamiento: módulo Organizations (pendiente de implementación)
- Nuevo requerimiento: owners pueden crear organizaciones; los proyectos pueden (opcionalmente) asociarse a una organización.
- Decisiones clave: `organization_id` nullable en `projects`; `owner_id` se mantiene siempre; verificación separada para usuario y para organización.
- Detalle completo del diseño en `devlogV2.md` (sección "Relevamiento — Módulo Organizations 2026-04-02").
- **Pendiente:** implementar modelos, migraciones, módulo organizations, verificación de orgs y adaptar `authorizeProfile` middleware.

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

### Nuevo módulo: `verified-profiles`
- `POST /verified-profiles` — owner envía su perfil de verificación (status queda `pending`). Campos: `legal_name`, `tax_id`, `document_url`, `entity_type`.
- `GET /verified-profiles/mine` — owner consulta su propio perfil.
- `GET /verified-profiles` — admin lista todos los perfiles (requiere rol `admin`).
- `PATCH /verified-profiles/:id/status` — admin aprueba o rechaza un perfil (`approved` | `rejected` | `pending`).
- Nuevo middleware `authorize-admin.middleware.ts` para restringir endpoints a rol `admin`.
- **Motivo:** sin este módulo los owners no podían completar el flujo para crear proyectos; el middleware `authorizeProfile` requiere un perfil con status `approved`.

### Bug fix: TypeScript en `project.controller.ts`
- `request.params.slug` y `request.params.id` casteados a `string` explicitamente en `getBySlug`, `update` y `updateStatus`.
- **Motivo:** Express tipifica `params` como `string | string[]`; TypeScript rechazaba pasar ese valor directamente a funciones que esperan `string`.
