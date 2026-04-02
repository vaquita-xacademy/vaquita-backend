Qué cambió desde el devlog (18 de marzo)
1. Rediseñaron el dominio de la base de datos
El plan original tenía user_types como tabla separada. Ahora el rol está directo en users como ENUM (admin, donor, owner). Más simple y suficiente para este caso.

Introdujeron dos entidades nuevas que no estaban en el plan:

verified_profiles — Es la pieza clave del nuevo diseño. Un usuario con rol owner (quien crea proyectos) necesita un perfil verificado con legal_name, tax_id, document_url y un status (pending / approved / rejected). Sin esto aprobado, no puede crear proyectos.

categories — Clasifica los proyectos. Hay un seeder con 7 categorías: Ecología, Arte, Salud, Animales, Educación, Deportes, Comunidad.

projects también tiene cambios respecto al plan:

Tiene slug único (generado con slugify + número random)
location es un campo JSONB { province, city } con índice GIN (búsqueda eficiente por ubicación)
Referencia a category_id
2. Implementaron modelos Sequelize reales en TypeScript
En src/db/models/ ahora hay modelos reales: User, Project, Category, VerifiedProfile. Las asociaciones están centralizadas en index.ts y se llaman al arrancar el servidor con setupAssociations().

3. Auth completamente funcional
Las 4 rutas que faltaban están implementadas en src/modules/auth/:

Endpoint	Descripción
POST /api/v1/auth/register	Crea usuario con bcrypt, emite JWT en cookie
POST /api/v1/auth/login	Passport local (email+password), emite JWT
POST /api/v1/auth/logout	Limpia la cookie
GET /api/v1/auth/me	Devuelve el usuario autenticado vía JWT
Nótá que cambió la ruta: antes era /api/v1/users/register/donor, ahora es /api/v1/auth/register.

4. Primer endpoint de proyectos con autorización por perfil
POST /api/v1/projects — para crear un proyecto el request debe pasar 3 middlewares en cadena:

authenticateJwt — verifica la cookie JWT
authorizeProfile — verifica que el usuario sea ADMIN o OWNER con verified_profile aprobado
validateDto(CreateProjectDTO) — valida el payload
5. Validators asíncronos personalizados
Crearon validators que consultan la DB durante la validación del DTO:

EmailExistsConstraint — email ya registrado
CategoryExistsConstraint — category_id existe
TitleUniqueConstraint — título único entre proyectos activos
6. Infraestructura de respuestas y excepciones
Resources (UserResource, ProjectResource) — filtran qué campos devuelve la API (nunca devuelven password_hash)
Excepciones HTTP custom en src/exceptions/ — ConflictException, ForbiddenException, NotFoundException, etc.
Helpers de respuesta estandarizados: success(), errorResponse(), validationErrorResponse()
7. Swagger UI
Hay documentación generada en /api/v1/docs con schemas para auth y proyectos.

8. Frontend Angular (básico)
Rutas configuradas: /, /login, /register, /marketplace. Existe un LoginFormComponent reutilizable. El marketplace está vacío y sin conexión al backend por ahora.

Bug que vale la pena mencionar
En authorize-profile.middleware.ts:44 hay un problema: si el usuario tiene rol DONOR, no entra al if (ADMIN) ni al if (OWNER), y cae directo al return errorResponse 403 del final. Un donor no puede crear proyectos (que tiene sentido), pero el mensaje de error es genérico. Si en algún momento quieren que un DONOR llegue a otra ruta protegida por este middleware, va a fallar.

Qué queda pendiente
Donaciones — ningún endpoint ni modelo
Actualizaciones de proyectos — ídem
Endpoints para gestionar verified_profiles (crear, aprobar, rechazar)
GET de proyectos (listado, detalle)
Frontend sin lógica real (no consume el backend)
Tests


--------------------------

Analisis Senior — Vaquita Backend
Sintesis General
Proyecto Node.js/Express con TypeScript bien estructurado para un MVP de crowdfunding. La arquitectura modular (routes → controller → service → model) es solida y demuestra buenas intenciones de diseño. Sin embargo, hay problemas criticos que deben resolverse antes de cualquier despliegue a produccion.

Stack
Capa	Tecnologia
Runtime	Node.js + TypeScript 5.8
Framework	Express 5.1
ORM	Sequelize 6 + PostgreSQL
Auth	Passport.js (JWT + Local) + bcrypt
Validacion	class-validator + express-validator
Docs	Swagger/OpenAPI
Bugs Criticos
1. Columna password_hash demasiado corta
src/db/migrations/ — El hash de bcrypt tiene 60+ caracteres, pero la columna esta definida como STRING(100). Si la contrasena + salt excede eso, se trunca silenciosamente y ningun usuario podra loguearse.


-- Bug: STRING(100) puede truncar el hash
password_hash VARCHAR(100)  -- ❌

-- Fix
password_hash TEXT           -- ✅
2. Servidor arranca aunque la DB falle
src/app.ts — initializeDatabase() captura el error y loguea, pero no detiene el proceso. El servidor queda en pie pero crashea en la primera query.


// Bug: server sigue vivo sin DB
await initializeDatabase(); // falla silenciosamente
await startServer();         // arranca igual ❌

// Fix: exit si falla la conexion
try {
  await initializeDatabase();
} catch (err) {
  console.error('DB connection failed', err);
  process.exit(1); // ✅
}
3. Modulo Donor incompleto con codigo muerto
src/modules/donors/ — DonorService.create() tiene codigo comentado. El DTO existe, hay hashing de contrasena pero el usuario nunca se crea. Probablemente una regresion de un merge.

4. Sin handler de errores global
Cada controller tiene su propio try/catch, pero no existe un middleware (err, req, res, next) en app.ts. Los errores no capturados crashean el proceso sin respuesta HTTP al cliente.

5. Sin validacion de variables de entorno al arranque
Si JWT_SECRET, DB_PASSWORD o COOKIE_SECRET estan vacias, el servidor arranca sin avisar hasta que el primer request falla de forma críptica.

Problemas de Seguridad
Severidad	Problema	Fix
Alta	Sin rate limiting en /auth/login — vulnerable a brute force	express-rate-limit
Alta	Sin helmet — faltan headers HTTP de seguridad	helmet() como primer middleware
Media	Sin sanitizacion de inputs (solo validacion)	express-mongo-sanitize o similar
Media	No se verifica Content-Type en requests	Middleware de content-type
Baja	Sin request ID — imposible trazar logs en produccion	uuid + header X-Request-Id
Code Smells / Anti-patrones
Casting inseguro de tipos — req.body as CreateUserDto y req.user as User sin verificacion. Deberia extenderse la interfaz de Express con el tipo correcto.

Instanciacion manual de servicios — Los controllers hacen new UserService() en el constructor. Dificulta el testing y viola IoC. Considerar un contenedor liviano como awilix.

Mensajes de error dispersos — Algunos en helpers/messages.ts, otros hardcodeados en controllers. Falta consistencia.

Sin logging estructurado — No hay winston ni pino. En produccion es imposible correlacionar eventos.

Sin tests — El script test solo lanza un error. Zero coverage.

Siguientes Pasos (priorizados)

Inmediato (antes de cualquier deploy)
    Corregir columna password_hash → TEXT en migracion nueva
    Agregar process.exit(1) si la DB no conecta
    Agregar middleware de errores global en app.ts
    Agregar helmet y express-rate-limit en auth routes
    Validar variables de entorno al arranque (puede ser con zod o envalid)
Corto plazo
    Completar o eliminar el modulo Donor — es codigo muerto peligroso
    Agregar logging con pino (mas rapido que winston en produccion)
    Extender tipos de Express para req.user y evitar castings
    Agregar endpoint /health para Docker/Kubernetes
Mediano plazo
    Setup de tests con Jest — empezar por servicios (unit) y rutas (integration)
    Documentar endpoints en Swagger — la infraestructura ya existe, solo faltan los decoradores
    Revisar indices de DB — las foreign keys probablemente no tienen indices explícitos
    Agregar Request ID para trazabilidad de logs

Verdict
El proyecto tiene una base arquitectonica correcta para un MVP. El equipo sabe lo que hace. Los problemas no son de diseño sino de hardening: el bug de password_hash puede impedir logins en produccion hoy mismo, y la ausencia de rate limiting deja la autenticacion expuesta. Con una semana de trabajo focalizado en los puntos criticos, el proyecto estaria en condiciones de produccion.




-------------------------
## Relevamiento — Módulo Donations (2026-04-02)

### Requerimiento

Los donors pueden donar dinero a proyectos. El sistema es **simulado** por ahora (sin pasarela de pago real), con intención futura de integrar Mercado Pago.

### Decisiones de diseño confirmadas

| Pregunta | Decisión |
|----------|----------|
| ¿Pago real o simulado? | **Simulado** por ahora. Futuro: Mercado Pago (webhooks, estados) |
| ¿Un donor puede donar múltiples veces al mismo proyecto? | **Sí**, sin límite |
| ¿Se guarda mensaje? | **Sí**, campo `message` opcional en la donación |
| ¿Donor puede ver su historial? | **Sí** — `GET /donations/mine` |
| ¿Owner puede ver donaciones de su proyecto? | **Sí** — puede ver todas las donaciones de sus proyectos |
| ¿Las donaciones son públicas? | **No** — privadas. Owner ve quiénes donaron; donor ve cuánto donó (sin ver otros donors) |
| ¿Se puede cancelar? | **No** — permanentes |

---

### Diseño de base de datos

#### Nueva tabla: `donations`
```
id            — PK
donor_id      — FK users (NOT NULL)
project_id    — FK projects (NOT NULL)
amount        — DECIMAL(15,2), NOT NULL, MIN 1
message       — TEXT, nullable
created_at / updated_at
```

Índices:
- `idx_donations_donor_id` — para `GET /donations/mine`
- `idx_donations_project_id` — para que el owner liste donaciones de su proyecto

#### Cambios en `projects`
- `current_amount` se incrementa con cada donación (lógica en service, dentro de una transacción).

---

### Lógica de negocio

- Solo usuarios con `role = donor` pueden donar (o cualquier autenticado — a definir).
- El proyecto debe existir y estar en estado `active` para recibir donaciones.
- La donación y el incremento de `current_amount` ocurren en una **transacción atómica**.
- No se puede donar a un proyecto `paused`, `completed` o `cancelled`.

---

### Endpoints necesarios

| Método | Ruta | Quién | Descripción |
|--------|------|-------|-------------|
| POST | `/donations` | Donor autenticado | Crear una donación |
| GET | `/donations/mine` | Donor autenticado | Historial de donaciones propias |
| GET | `/projects/:id/donations` | Owner del proyecto o admin | Ver donaciones de un proyecto |

### Reglas de visibilidad

**`GET /donations/mine`** (donor):
- Ve: `id`, `project_id`, `project title`, `amount`, `message`, `created_at`
- No ve: información de otros donors

**`GET /projects/:id/donations`** (owner/admin):
- Ve: `id`, `donor_id`, `donor name`, `amount`, `message`, `created_at`
- Requiere ser owner del proyecto o admin

---

### Notas para integración futura con Mercado Pago
- Agregar columnas `payment_id` (string, nullable) y `payment_status` (enum: `simulated` | `pending` | `approved` | `rejected`) a `donations`.
- Hoy todas las donaciones se crean con `payment_status = simulated`.
- Cuando se integre MP: el flow será crear la preferencia → webhook confirma → se ejecuta la lógica de negocio.

---

### Pendiente de implementación
- [ ] Migración: tabla `donations`
- [ ] Modelo `Donation`
- [ ] Asociaciones en `index.ts`
- [ ] Módulo `donations` (DTO, service, controller, routes, resource)
- [ ] Swagger: schemas, examples, responses, paths
- [ ] Actualizar `postman.md`

---

-------------------------
## Relevamiento — Módulo Organizations (2026-04-02)

### Requerimiento

Surgió la necesidad de que un owner pueda agrupar sus proyectos bajo **organizaciones**. Una organización representa una entidad (fundación, club, grupo) que puede tener múltiples proyectos asociados.

### Decisiones de diseño confirmadas

| Pregunta | Decisión |
|----------|----------|
| ¿Un owner puede tener múltiples organizaciones? | **Sí** |
| ¿La organización es obligatoria para crear un proyecto? | **No** — `organization_id` es nullable en projects |
| ¿La verificación es por usuario o por organización? | **Ambas** — verificación de usuario (ya existe) + verificación de organización (nueva) |
| ¿Project mantiene relación con el usuario creador? | **Sí** — `owner_id` se mantiene siempre; `organization_id` es opcional |

---

### Diseño de base de datos

#### Nueva tabla: `organizations`
```
id            — PK
owner_id      — FK users (NOT NULL) — quien crea/posee la org
name          — STRING(100), NOT NULL
description   — TEXT, nullable
logo_url      — TEXT, nullable
created_at / updated_at
```
Relaciones:
- `User` hasMany `Organization` (via `owner_id`)
- `Organization` hasMany `Project` (via `organization_id`)

#### Nueva tabla: `organization_verified_profiles`
Espeja la estructura de `verified_profiles` pero apunta a una organización, no a un usuario.
```
id                — PK
organization_id   — FK organizations (UNIQUE, NOT NULL) — relación 1:1 con la org
legal_name        — STRING(100), NOT NULL
tax_id            — STRING(100), UNIQUE, NOT NULL
document_url      — TEXT, NOT NULL
entity_type       — ENUM(individual, legal), NOT NULL
status            — ENUM(pending, approved, rejected), default pending
created_at / updated_at
```
Relaciones:
- `Organization` hasOne `OrganizationVerifiedProfile`

#### Cambios en `projects`
- Se mantiene `owner_id` (FK users, NOT NULL) — siempre apunta al usuario creador
- Se agrega `organization_id` (FK organizations, **nullable**) — opcional

---

### Lógica de autorización actualizada

El middleware `authorizeProfile` necesita adaptarse a dos escenarios:

**Proyecto sin organización** (comportamiento actual, sin cambios):
```
owner con verified_profile.status = approved → puede crear proyecto
```

**Proyecto con organización** (nuevo):
```
owner con verified_profile.status = approved
  AND organization existe
  AND user es owner de esa organization
  AND organization_verified_profile.status = approved
→ puede crear proyecto bajo esa organización
```

---

### Nuevos endpoints necesarios

#### Organizations
| Método | Ruta | Quién | Descripción |
|--------|------|-------|-------------|
| POST | `/organizations` | Owner autenticado | Crear organización |
| GET | `/organizations/mine` | Owner autenticado | Listar mis organizaciones |
| GET | `/organizations/:id` | Público | Ver detalle de una organización |
| PATCH | `/organizations/:id` | Owner de la org o admin | Editar organización |

#### Verificación de organización
| Método | Ruta | Quién | Descripción |
|--------|------|-------|-------------|
| POST | `/organizations/:id/verification` | Owner de la org | Enviar verificación |
| GET | `/organizations/:id/verification` | Owner de la org o admin | Ver estado de verificación |
| PATCH | `/organizations/:id/verification/status` | Admin | Aprobar o rechazar |

#### Cambios en projects
- `POST /projects` — agregar campo opcional `organization_id` en el DTO
- `GET /projects` — agregar filtro opcional `organization_id`
- `GET /organizations/:id/projects` — listar proyectos de una org (alternativa o adicional)

---

### Impacto en código existente

| Archivo | Tipo de cambio |
|---------|----------------|
| `src/db/models/project.model.ts` | Agregar `organization_id` (nullable) |
| `src/db/models/index.ts` | Agregar asociaciones de Organization |
| `src/modules/projects/dto/create-project.dto.ts` | Agregar `organization_id` opcional |
| `src/middlewares/authorize-profile.middleware.ts` | Extender lógica para verificar org si se provee `organization_id` |
| `src/routes/index.ts` | Registrar rutas de organizations |
| Migraciones | Nueva migración para `organizations` + `organization_verified_profiles` + columna en `projects` |

---

### Pendiente de implementación
- [ ] Migración: tabla `organizations`
- [ ] Migración: tabla `organization_verified_profiles`
- [ ] Migración: agregar `organization_id` a `projects`
- [ ] Modelo `Organization`
- [ ] Modelo `OrganizationVerifiedProfile`
- [ ] Módulo `organizations` (controller + service + routes + DTOs + resource)
- [ ] Módulo `organization-verifications` (o dentro del mismo módulo de orgs)
- [ ] Actualizar `authorizeProfile` middleware
- [ ] Actualizar `CreateProjectDTO` y `ProjectService`
- [ ] Actualizar `postman.md` con nuevos flujos

---

-------------------------
Diagnostico de la DB actual
1. Desincronias modelo ↔ migracion (bugs activos)
Tabla	Campo	Migracion	Modelo	Problema
users	password_hash	TEXT ✅	STRING(100) ❌	El modelo truncaria el hash
verified_profiles	document_url	TEXT ✅	STRING(200) ❌	URLs largas se cortarian
2. Constraint faltante — verified_profiles.user_id
La relacion User → VerifiedProfile es 1:1, pero user_id no tiene UNIQUE. Hoy la DB permite que un usuario tenga multiples perfiles verificados.

3. FK sin key: "id" explicito
En verified_profiles y projects, las referencias son { model: "users" } sin key: "id". Sequelize lo infiere pero es implicito y propenso a errores.

4. Indices faltantes en FK (performance)
Ningun campo FK tiene indice explicito. PostgreSQL no los crea automaticamente con Sequelize:

Tabla	Campo	Impacto
verified_profiles	user_id	Cada lookup de perfil hace full scan
projects	owner_id	Listar proyectos de un owner es lento
projects	category_id	Filtrar por categoria es lento
projects	status	El endpoint publico filtra por status siempre
5. slug demasiado corto
STRING(100) para el slug de un proyecto. El helper genera ${slug}-${randomNumber} — un titulo largo ya ocupa casi todo el espacio.

6. categories.id sin allowNull: false
Los demas IDs lo tienen, categories no.

Lo que propongo hacer
A. Nuevas migraciones (no tocar las existentes — ya corrieron en dev):

Agregar UNIQUE a verified_profiles.user_id
Agregar indices en todas las FK y projects.status
Ampliar projects.slug a STRING(200)
B. Corregir modelos (solo TypeScript, sin tocar DB):

user.model.ts: password_hash → TEXT
verified-profile.model.ts: document_url → TEXT
C. Agregar key: "id" en todas las referencias FK

¿La DB de desarrollo ya tiene datos o esta limpia? Eso determina si conviene hacer db:migrate:undo:all y pisar las migraciones, o crear nuevas migraciones de alteracion.