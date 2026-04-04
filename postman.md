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

## 3. Endpoints de Auth

### POST `/auth/register` — Registrar usuario
**No requiere autenticacion**

**Body (JSON):**
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

> La password debe ser fuerte: minimo 8 caracteres, mayuscula, minuscula, numero y simbolo.

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

### POST `/auth/login` — Iniciar sesion
**No requiere autenticacion**

**Body (JSON):**
```json
{
  "email": "jimena@example.com",
  "password": "vaquita1A_"
}
```

**Respuesta exitosa (200):**
```json
{
  "data": {
    "user": {
      "id": 3,
      "name": "Jimena",
      "email": "jimena@example.com",
      "role": "owner"
    }
  }
}
```
> La cookie `access_token` se guarda automaticamente en Postman.

**Rate limit:** maximo 10 intentos por IP cada 15 minutos.

---

### GET `/auth/me` — Sesion actual
**Requiere estar logueado**

Sin body. La cookie se envia automaticamente.

**Respuesta exitosa (200):**
```json
{
  "data": {
    "user": {
      "id": 3,
      "name": "Jimena",
      "email": "jimena@example.com",
      "role": "owner"
    }
  }
}
```

---

### POST `/auth/logout` — Cerrar sesion
**Requiere estar logueado**

Sin body. Elimina la cookie `access_token`.

**Respuesta exitosa (200):**
```json
{
  "data": {
    "message": "Sesion cerrada correctamente"
  }
}
```

---

## 4. Endpoints de Projects

### GET `/projects` — Listar proyectos (publico)
**No requiere autenticacion**

**Query params:**

| Param | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `limit` | number | Si | Cantidad de resultados (ej: `10`) |
| `after` | string | No | Cursor para pagina siguiente |
| `before` | string | No | Cursor para pagina anterior |
| `sort` | string | No | `newest` \| `oldest` \| `title_asc` \| `title_desc` |
| `category_id` | number | No | Filtrar por categoria (1-7) |
| `status` | string | No | `active` \| `paused` \| `completed` \| `cancelled` |
| `search` | string | No | Buscar por titulo (busqueda parcial) |

**Ejemplo de URL:**
```
GET /api/v1/projects?limit=10&sort=newest&status=active
GET /api/v1/projects?limit=5&category_id=3&search=comedor
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
        "location": {
          "province": "Buenos Aires",
          "city": "La Plata"
        },
        "category": "Ecología",
        "owner": {
          "id": 3,
          "name": "Jimena"
        },
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

### GET `/projects/mine` — Mis proyectos
**Requiere estar logueado como `owner` o `admin`**

Acepta los mismos query params que `GET /projects`, excepto `category_id`.

**Ejemplo:**
```
GET /api/v1/projects/mine?limit=10&sort=newest
GET /api/v1/projects/mine?limit=10&status=paused
```

**Respuesta exitosa (200):** misma estructura que `GET /projects` pero con todos los campos del proyecto (incluye `description`, `goal_amount`, `current_amount`).

---

### GET `/projects/:slug` — Detalle de un proyecto (publico)
**No requiere autenticacion**

**Ejemplo:**
```
GET /api/v1/projects/huerta-comunitaria-sur-482
```

**Respuesta exitosa (200):**
```json
{
  "data": {
    "project": {
      "id": 1,
      "owner_id": 3,
      "category": "Ecología",
      "title": "Huerta Comunitaria Sur",
      "description": "Proyecto para crear una huerta comunitaria en el barrio sur de La Plata.",
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

### POST `/projects` — Crear proyecto
**Requiere estar logueado como `owner` con perfil verificado y aprobado, o `admin`**

**Body (JSON):**
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
      "owner_id": 3,
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

### PATCH `/projects/:id` — Editar proyecto
**Requiere estar logueado. Solo el owner del proyecto o un admin pueden editarlo.**

Todos los campos son opcionales — solo enviar lo que se quiere cambiar.

**Body (JSON):**
```json
{
  "title": "Huerta Comunitaria Sur — Temporada 2026",
  "description": "Nueva descripcion del proyecto actualizada.",
  "goal_amount": 200000,
  "category_id": 7,
  "image_url": "https://example.com/nueva-imagen.jpg",
  "location": {
    "province": "Buenos Aires",
    "city": "Berisso"
  }
}
```

**Ejemplo minimo (solo un campo):**
```json
{
  "description": "Descripcion actualizada."
}
```

**Respuesta exitosa (200):** mismo formato que `POST /projects`.

---

### PATCH `/projects/:id/status` — Cambiar estado del proyecto
**Requiere estar logueado. Solo el owner del proyecto o un admin.**

**Body (JSON):**
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

## 5. Respuestas de error comunes

| Codigo | Descripcion |
|--------|-------------|
| 400 | Datos invalidos (errores de validacion) |
| 401 | No autenticado (cookie ausente o expirada) |
| 403 | Sin permiso (rol incorrecto o no es el owner) |
| 404 | Recurso no encontrado |
| 409 | Conflicto (ej: email ya registrado) |
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

---

## 6. Flujo de prueba completo

```
1. POST /auth/register         → crear usuario owner
2. POST /auth/login            → iniciar sesion (guarda cookie)
3. GET  /auth/me               → verificar sesion activa
4. POST /projects              → crear proyecto (falla si no tiene perfil verificado)
5. GET  /projects?limit=10     → listar proyectos publicos
6. GET  /projects/:slug        → ver detalle del proyecto creado
7. GET  /projects/mine?limit=10 → ver mis proyectos
8. PATCH /projects/:id         → editar titulo o descripcion
9. PATCH /projects/:id/status  → pausar el proyecto
10. POST /auth/logout          → cerrar sesion
```
