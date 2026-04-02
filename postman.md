# Guia Postman — Vaquita Backend

## 1. Inicializar el proyecto

### Requisitos previos
- Node.js 18+
- PostgreSQL corriendo localmente
- Archivo `.env` configurado (ver `.env.example`)

### Variables de entorno minimas (`.env`)
```
APP_PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=vaquita_db
DB_USERNAME=postgres
DB_PASSWORD=tu_password

JWT_SECRET=un_secreto_largo_y_seguro
JWT_EXPIRES_IN=8h
COOKIE_SECRET=otro_secreto_para_cookies
```

### Pasos
```bash
# 1. Instalar dependencias
npm install

# 2. Crear la base de datos
npx sequelize-cli db:create

# 3. Correr migraciones (crea todas las tablas)
npm run migrate

# 4. Cargar datos de prueba (usuarios + categorias)
npm run seed:all

# 5. Levantar el servidor
npm run dev
```

El servidor queda en: `http://localhost:3000`
Documentacion Swagger: `http://localhost:3000/api/v1/docs`

---

### Usuarios de prueba (seeders)
| Nombre | Email | Password | Rol |
|--------|-------|----------|-----|
| Juan | juan@example.com | `vaquita1A_` | donor |
| Nahuel | nahuel@example.com | `vaquita1A_` | admin |
| Jimena | jimena@example.com | `vaquita1A_` | owner |

> Jimena (owner) **no tiene** perfil verificado en los seeders. Para que pueda crear proyectos hay que completar el flujo de verificacion (ver seccion 6).

### Categorias disponibles (IDs 1-7)
| ID | Nombre |
|----|--------|
| 1 | Ecología |
| 2 | Arte |
| 3 | Salud |
| 4 | Animales |
| 5 | Educación |
| 6 | Deportes |
| 7 | Comunidad |

---

## 2. Configuracion de Postman

### Base URL
```
http://localhost:3000/api/v1
```

### Cookies
Las rutas protegidas usan cookies firmadas. Postman las maneja automaticamente si activas:
- `Settings > General > Automatically follow redirects` ✅
- En la coleccion: `Cookies` se guardan por dominio automaticamente al hacer login

> No hace falta agregar headers de Authorization manualmente — el token viaja en la cookie `access_token`.

---

## 3. Flujos completos paso a paso

Hay dos flujos según si el proyecto se crea con o sin organización.

---

### Flujo A — Proyecto sin organización (owner individual verificado)

---

### PASO 1 — Registrar un owner

**POST `/auth/register`** — No requiere autenticacion

**Body:**
```json
{
  "name": "Maria Lopez",
  "email": "maria@example.com",
  "password": "Maria1234_",
  "password_confirmation": "Maria1234_",
  "role": "owner"
}
```
> `role` acepta: `"donor"` | `"owner"` | `"admin"`  
> La password requiere minimo 8 caracteres, mayuscula, minuscula, numero y simbolo.

**Respuesta exitosa (201):**
```json
{
  "data": {
    "user": {
      "id": 4,
      "name": "Maria Lopez",
      "email": "maria@example.com",
      "role": "owner"
    }
  }
}
```

---

### PASO 2 — Hacer login con el owner

**POST `/auth/login`** — No requiere autenticacion

**Body:**
```json
{
  "email": "maria@example.com",
  "password": "Maria1234_"
}
```

**Respuesta exitosa (200):**
```json
{
  "data": {
    "user": {
      "id": 4,
      "name": "Maria Lopez",
      "email": "maria@example.com",
      "role": "owner"
    }
  }
}
```
> La cookie `access_token` se guarda automaticamente en Postman. Todos los requests siguientes la envian solos.

**Rate limit:** maximo 10 intentos por IP cada 15 minutos.

---

### PASO 3 — Enviar perfil de verificacion

**POST `/verified-profiles`** — Requiere estar logueado como owner

**Body:**
```json
{
  "legal_name": "Maria Lopez",
  "tax_id": "20-12345678-9",
  "document_url": "https://example.com/documentos/dni-maria.pdf",
  "entity_type": "individual"
}
```
> `entity_type` acepta: `"individual"` | `"legal"`  
> `tax_id` debe ser unico en el sistema.  
> El perfil queda con `status: "pending"` hasta que un admin lo apruebe.

**Respuesta exitosa (201):**
```json
{
  "data": {
    "verified_profile": {
      "id": 1,
      "user_id": 4,
      "legal_name": "Maria Lopez",
      "tax_id": "20-12345678-9",
      "document_url": "https://example.com/documentos/dni-maria.pdf",
      "entity_type": "individual",
      "status": "pending",
      "created_at": "2026-04-02T00:00:00.000Z",
      "updated_at": "2026-04-02T00:00:00.000Z"
    }
  }
}
```

---

### PASO 4 — Consultar el perfil propio

**GET `/verified-profiles/mine`** — Requiere estar logueado

Sin body. Devuelve el perfil de verificacion del usuario autenticado.

**Respuesta exitosa (200):** mismo formato que el paso anterior.

---

### PASO 5 — Login como admin y aprobar el perfil

Primero cerrar sesion del owner (o abrir Postman en otra pestaña sin cookie):

**POST `/auth/logout`** — Requiere estar logueado
Sin body.

Luego hacer login con el admin:

**POST `/auth/login`**
```json
{
  "email": "nahuel@example.com",
  "password": "vaquita1A_"
}
```

Ahora aprobar el perfil del owner (usar el `id` que devolvio el paso 3):

**PATCH `/verified-profiles/:id/status`** — Requiere rol `admin`

```
PATCH /api/v1/verified-profiles/1/status
```

**Body:**
```json
{
  "status": "approved"
}
```
> `status` acepta: `"pending"` | `"approved"` | `"rejected"`

**Respuesta exitosa (200):**
```json
{
  "data": {
    "verified_profile": {
      "id": 1,
      "user_id": 4,
      "legal_name": "Maria Lopez",
      "tax_id": "20-12345678-9",
      "document_url": "https://example.com/documentos/dni-maria.pdf",
      "entity_type": "individual",
      "status": "approved",
      "created_at": "2026-04-02T00:00:00.000Z",
      "updated_at": "2026-04-02T00:00:00.000Z"
    }
  }
}
```

---

### PASO 6 — Volver a loguear como owner y crear un proyecto

**POST `/auth/logout`** (cerrar sesion del admin)

**POST `/auth/login`** con el owner:
```json
{
  "email": "maria@example.com",
  "password": "Maria1234_"
}
```

**POST `/projects`** — Requiere owner con perfil aprobado

**Body:**
```json
{
  "title": "Huerta Comunitaria Sur",
  "description": "Proyecto para crear una huerta comunitaria en el barrio sur de La Plata. Los fondos se usaran para comprar semillas, herramientas y materiales de construccion.",
  "goal_amount": 150000,
  "category_id": 1,
  "image_url": "https://example.com/imagen.jpg",
  "location": {
    "province": "Buenos Aires",
    "city": "La Plata"
  }
}
```

**Respuesta exitosa (201):**
```json
{
  "data": {
    "project": {
      "id": 1,
      "owner_id": 4,
      "category": "Ecología",
      "title": "Huerta Comunitaria Sur",
      "description": "Proyecto para crear una huerta comunitaria...",
      "goal_amount": 150000,
      "current_amount": 0,
      "image_url": "https://example.com/imagen.jpg",
      "status": "active",
      "slug": "huerta-comunitaria-sur-482",
      "location": {
        "province": "Buenos Aires",
        "city": "La Plata"
      },
      "created_at": "2026-04-02T00:00:00.000Z",
      "updated_at": "2026-04-02T00:00:00.000Z"
    }
  }
}
```

---

---

### Flujo B — Proyecto bajo una organización

Requiere haber completado los pasos 1-5 del Flujo A (owner registrado, logueado y con perfil de usuario aprobado).

---

### PASO B1 — Crear una organización

**POST `/organizations`** — Requiere owner logueado

**Body:**
```json
{
  "name": "Fundación Verde",
  "description": "Organización dedicada a proyectos ecológicos en la región.",
  "logo_url": "https://example.com/logos/fundacion-verde.png"
}
```
> `description` y `logo_url` son opcionales.

**Respuesta exitosa (201):**
```json
{
  "data": {
    "organization": {
      "id": 1,
      "owner_id": 4,
      "name": "Fundación Verde",
      "description": "Organización dedicada a proyectos ecológicos en la región.",
      "logo_url": "https://example.com/logos/fundacion-verde.png",
      "created_at": "2026-04-02T00:00:00.000Z",
      "updated_at": "2026-04-02T00:00:00.000Z"
    }
  }
}
```

---

### PASO B2 — Enviar verificación de la organización

**POST `/organizations/:id/verification`** — Requiere owner logueado (debe ser owner de la org)

```
POST /api/v1/organizations/1/verification
```

**Body:**
```json
{
  "legal_name": "Fundación Verde ONG",
  "tax_id": "30-99887766-5",
  "document_url": "https://example.com/documentos/estatuto-fundacion.pdf",
  "entity_type": "legal"
}
```
> `entity_type` acepta: `"individual"` | `"legal"`

**Respuesta exitosa (201):**
```json
{
  "data": {
    "verification": {
      "id": 1,
      "organization_id": 1,
      "legal_name": "Fundación Verde ONG",
      "tax_id": "30-99887766-5",
      "document_url": "https://example.com/documentos/estatuto-fundacion.pdf",
      "entity_type": "legal",
      "status": "pending",
      "created_at": "2026-04-02T00:00:00.000Z",
      "updated_at": "2026-04-02T00:00:00.000Z"
    }
  }
}
```

---

### PASO B3 — Admin aprueba la verificación de la organización

Login como admin, luego:

**PATCH `/organizations/:id/verification/status`** — Requiere rol `admin`

```
PATCH /api/v1/organizations/1/verification/status
```

**Body:**
```json
{
  "status": "approved"
}
```

**Respuesta exitosa (200):** mismo formato que el paso B2 con `status: "approved"`.

---

### PASO B4 — Crear proyecto bajo la organización

Volver a loguear como owner, luego:

**POST `/projects`** — Requiere owner con perfil de usuario aprobado + org aprobada

**Body:**
```json
{
  "title": "Huerta Comunitaria Sur",
  "description": "Proyecto para crear una huerta comunitaria en el barrio sur de La Plata.",
  "goal_amount": 150000,
  "category_id": 1,
  "image_url": "https://example.com/imagen.jpg",
  "location": {
    "province": "Buenos Aires",
    "city": "La Plata"
  },
  "organization_id": 1
}
```
> `organization_id` es opcional. Si se omite, el proyecto queda solo bajo el owner (Flujo A).

**Respuesta exitosa (201):**
```json
{
  "data": {
    "project": {
      "id": 2,
      "owner_id": 4,
      "organization_id": 1,
      "category": "Ecología",
      "title": "Huerta Comunitaria Sur",
      "description": "...",
      "goal_amount": 150000,
      "current_amount": 0,
      "image_url": "https://example.com/imagen.jpg",
      "status": "active",
      "slug": "huerta-comunitaria-sur-317",
      "location": { "province": "Buenos Aires", "city": "La Plata" },
      "created_at": "2026-04-02T00:00:00.000Z",
      "updated_at": "2026-04-02T00:00:00.000Z"
    }
  }
}
```

---

### PASO 7 — Consultar proyectos

**GET `/projects`** — Publico, no requiere autenticacion

**Query params disponibles:**

| Param | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `limit` | number | Si | Cantidad de resultados (ej: `10`) |
| `after` | string | No | Cursor para pagina siguiente |
| `before` | string | No | Cursor para pagina anterior |
| `sort` | string | No | `newest` \| `oldest` \| `title_asc` \| `title_desc` |
| `category_id` | number | No | Filtrar por categoria (1-7) |
| `status` | string | No | `active` \| `paused` \| `completed` \| `cancelled` |
| `search` | string | No | Buscar por titulo (busqueda parcial) |

**Ejemplos:**
```
GET /api/v1/projects?limit=10&sort=newest
GET /api/v1/projects?limit=5&category_id=1&status=active
GET /api/v1/projects?limit=5&search=huerta
```

**Respuesta exitosa (200):**
```json
{
  "data": {
    "items": [
      {
        "id": 1,
        "title": "Huerta Comunitaria Sur",
        "image_url": "https://example.com/imagen.jpg",
        "status": "active",
        "slug": "huerta-comunitaria-sur-482",
        "location": { "province": "Buenos Aires", "city": "La Plata" },
        "category": "Ecología",
        "owner": { "id": 4, "name": "Maria Lopez" },
        "created_at": "2026-04-02T00:00:00.000Z",
        "updated_at": "2026-04-02T00:00:00.000Z"
      }
    ],
    "total_count": 1,
    "paginate_info": {
      "has_next": false,
      "has_previous": false,
      "next_cursor": null,
      "prev_cursor": null
    }
  }
}
```

**Paginacion con cursor:**
```
# Primera pagina
GET /api/v1/projects?limit=5&sort=newest

# Siguiente pagina (usar next_cursor de la respuesta anterior)
GET /api/v1/projects?limit=5&sort=newest&after=eyJpZCI6NX0=
```

---

### PASO 8 — Ver detalle de un proyecto

**GET `/projects/:slug`** — Publico

```
GET /api/v1/projects/huerta-comunitaria-sur-482
```

**Respuesta exitosa (200):**
```json
{
  "data": {
    "project": {
      "id": 1,
      "owner_id": 4,
      "category": "Ecología",
      "title": "Huerta Comunitaria Sur",
      "description": "Proyecto para crear una huerta comunitaria en el barrio sur de La Plata.",
      "goal_amount": 150000,
      "current_amount": 0,
      "image_url": "https://example.com/imagen.jpg",
      "status": "active",
      "slug": "huerta-comunitaria-sur-482",
      "location": { "province": "Buenos Aires", "city": "La Plata" },
      "created_at": "2026-04-02T00:00:00.000Z",
      "updated_at": "2026-04-02T00:00:00.000Z"
    }
  }
}
```

---

### PASO 9 — Ver mis proyectos

**GET `/projects/mine`** — Requiere estar logueado (owner o admin)

Acepta los mismos query params que `GET /projects`, excepto `category_id`.

```
GET /api/v1/projects/mine?limit=10&sort=newest
GET /api/v1/projects/mine?limit=10&status=active
```

**Respuesta exitosa (200):** misma estructura paginada que `GET /projects`, con todos los campos del proyecto (incluye `description`, `goal_amount`, `current_amount`).

---

### PASO 10 — Editar un proyecto

**PATCH `/projects/:id`** — Requiere estar logueado. Solo el owner del proyecto o un admin.

Todos los campos son opcionales — solo enviar lo que se quiere cambiar.

```
PATCH /api/v1/projects/1
```

**Body (ejemplo parcial):**
```json
{
  "title": "Huerta Comunitaria Sur — Temporada 2026",
  "description": "Nueva descripcion actualizada.",
  "goal_amount": 200000,
  "category_id": 7,
  "image_url": "https://example.com/nueva-imagen.jpg",
  "location": {
    "province": "Buenos Aires",
    "city": "Berisso"
  }
}
```

**Respuesta exitosa (200):** mismo formato que `POST /projects`.

---

### PASO 11 — Cambiar estado de un proyecto

**PATCH `/projects/:id/status`** — Requiere estar logueado. Solo el owner o un admin.

```
PATCH /api/v1/projects/1/status
```

**Body:**
```json
{
  "status": "paused"
}
```
> `status` acepta: `"active"` | `"paused"` | `"completed"` | `"cancelled"`

**Respuesta exitosa (200):**
```json
{
  "data": {
    "project": {
      "id": 1,
      "status": "paused"
    }
  }
}
```

---

---

### PASO 12 — Donar a un proyecto

**POST `/donations`** — Requiere estar logueado

**Body:**
```json
{
  "project_id": 1,
  "amount": 5000,
  "message": "Mucho éxito con el proyecto, los apoyamos!"
}
```
> `message` es opcional.  
> Solo se puede donar a proyectos con `status: "active"`.  
> La donación incrementa `current_amount` del proyecto de forma atómica.

**Respuesta exitosa (201):**
```json
{
  "data": {
    "donation": {
      "id": 1,
      "project_id": 1,
      "amount": 5000,
      "message": "Mucho éxito con el proyecto, los apoyamos!",
      "created_at": "2026-04-02T00:00:00.000Z"
    }
  }
}
```

---

### PASO 13 — Ver mi historial de donaciones

**GET `/donations/mine`** — Requiere estar logueado como donor

Sin body. Devuelve todas las donaciones propias con info del proyecto.

**Respuesta exitosa (200):**
```json
{
  "data": {
    "donations": [
      {
        "id": 1,
        "project": { "id": 1, "title": "Huerta Comunitaria Sur", "slug": "huerta-comunitaria-sur-482" },
        "amount": 5000,
        "message": "Mucho éxito!",
        "created_at": "2026-04-02T00:00:00.000Z"
      }
    ]
  }
}
```

---

### PASO 14 — Ver donaciones de un proyecto (owner/admin)

**GET `/projects/:id/donations`** — Requiere ser owner del proyecto o admin

```
GET /api/v1/projects/1/donations
```

**Respuesta exitosa (200):**
```json
{
  "data": {
    "donations": [
      {
        "id": 1,
        "donor": { "id": 2, "name": "Juan" },
        "amount": 5000,
        "message": "Mucho éxito!",
        "created_at": "2026-04-02T00:00:00.000Z"
      }
    ]
  }
}
```

---

## 4. Endpoints de donations (referencia rapida)

| Metodo | Ruta | Requiere | Descripcion |
|--------|------|----------|-------------|
| POST | `/donations` | Logueado | Crear donación a un proyecto activo |
| GET | `/donations/mine` | Logueado | Ver historial de donaciones propias |
| GET | `/projects/:id/donations` | Owner del proyecto o admin | Ver donantes de un proyecto |

---

## 5. Endpoints de organizations (referencia rapida)

| Metodo | Ruta | Requiere | Descripcion |
|--------|------|----------|-------------|
| POST | `/organizations` | Owner logueado | Crear organización |
| GET | `/organizations/mine` | Owner logueado | Mis organizaciones (con estado de verificación) |
| GET | `/organizations` | Admin | Todas las organizaciones |
| GET | `/organizations/:id` | Público | Detalle de una organización |
| PATCH | `/organizations/:id` | Owner de la org | Editar organización |
| POST | `/organizations/:id/verification` | Owner de la org | Enviar verificación |
| GET | `/organizations/:id/verification` | Owner de la org o admin | Ver verificación |
| PATCH | `/organizations/:id/verification/status` | Admin | Aprobar o rechazar verificación |

### GET `/organizations/mine`

**Respuesta exitosa (200):**
```json
{
  "data": {
    "organizations": [
      {
        "id": 1,
        "owner_id": 4,
        "name": "Fundación Verde",
        "description": "...",
        "logo_url": "...",
        "created_at": "2026-04-02T00:00:00.000Z",
        "updated_at": "2026-04-02T00:00:00.000Z",
        "verification": {
          "id": 1,
          "status": "approved",
          "entity_type": "legal",
          "legal_name": "Fundación Verde ONG",
          "tax_id": "30-99887766-5"
        }
      }
    ]
  }
}
```
> `verification` es `null` si la organización aún no envió su perfil de verificación.

---

## 6. Endpoints de verified-profiles (referencia rapida)

| Metodo | Ruta | Requiere | Descripcion |
|--------|------|----------|-------------|
| POST | `/verified-profiles` | Owner logueado | Enviar perfil de verificacion |
| GET | `/verified-profiles/mine` | Logueado | Ver mi propio perfil |
| GET | `/verified-profiles` | Admin | Listar todos los perfiles |
| PATCH | `/verified-profiles/:id/status` | Admin | Aprobar o rechazar un perfil |

### GET `/verified-profiles` — Listar todos (admin)

**Respuesta exitosa (200):**
```json
{
  "data": {
    "verified_profiles": [
      {
        "id": 1,
        "user_id": 4,
        "legal_name": "Maria Lopez",
        "tax_id": "20-12345678-9",
        "document_url": "https://example.com/documentos/dni-maria.pdf",
        "entity_type": "individual",
        "status": "pending",
        "created_at": "2026-04-02T00:00:00.000Z",
        "updated_at": "2026-04-02T00:00:00.000Z"
      }
    ]
  }
}
```

---

## 7. Endpoints de auth (referencia rapida)

| Metodo | Ruta | Requiere | Descripcion |
|--------|------|----------|-------------|
| POST | `/auth/register` | — | Registrar usuario |
| POST | `/auth/login` | — | Iniciar sesion |
| GET | `/auth/me` | Logueado | Ver sesion actual |
| POST | `/auth/logout` | Logueado | Cerrar sesion |

### GET `/auth/me`

Sin body. La cookie se envia automaticamente.

**Respuesta exitosa (200):**
```json
{
  "data": {
    "user": {
      "id": 4,
      "name": "Maria Lopez",
      "email": "maria@example.com",
      "role": "owner"
    }
  }
}
```

---

## 8. Respuestas de error comunes

| Codigo | Descripcion |
|--------|-------------|
| 400 | Datos invalidos (errores de validacion) |
| 401 | No autenticado (cookie ausente o expirada) |
| 403 | Sin permiso (rol incorrecto o no es el owner del recurso) |
| 404 | Recurso no encontrado |
| 409 | Conflicto (ej: email ya registrado, tax_id duplicado) |
| 429 | Demasiados intentos (rate limit en login/register) |
| 500 | Error interno del servidor |

**Formato de error de validacion (400):**
```json
{
  "message": "Error en la solicitud",
  "errors": [
    { "field": "email", "message": "El email no es valido" },
    { "field": "password", "message": "La contrasena es muy debil" }
  ]
}
```

**Formato de error generico:**
```json
{
  "message": "Descripcion del error"
}
```
