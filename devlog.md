# DevLog Backend - Vaquita

Fecha de analisis: 2026-03-18

## 1. Contexto del proyecto

`vaquita-backend` es un backend en Node.js con Express y TypeScript orientado a una plataforma de recaudacion/donaciones. La base de datos definida para el proyecto debe ser PostgreSQL.

La intencion funcional que se desprende del codigo y de los nombres de migraciones es:

- gestion de usuarios por tipo o rol
- registro/autenticacion de donantes
- gestion de proyectos de recaudacion
- registro de donaciones
- publicacion de actualizaciones de proyectos

## 2. Stack tecnico actual

- Node.js
- Express 5
- TypeScript
- Sequelize ORM
- `pg` como driver de PostgreSQL
- `class-validator` y `class-transformer` para validacion de DTOs
- `bcrypt` para hash de contrasenas
- `jsonwebtoken` para autenticacion basada en JWT
- `passport`, `passport-local` y `passport-jwt` para estrategias de auth
- `cors` y cookies HTTP-only para integracion con frontend

## 3. Estado actual del backend

### Lo que ya existe

- Punto de entrada en `src/app.ts`
- Prefijo global de rutas: `/api/v1`
- Ruta implementada para registro de donante:
  - `POST /api/v1/users/register/donor`
- Validacion del payload con `CreateDonorDto`
- Servicio base para donantes con hash de password
- Generacion de JWT
- Helper para setear cookie `access_token`
- Configuracion inicial de Sequelize para PostgreSQL

### Lo que esta incompleto o en construccion

- El flujo real de persistencia del donante esta comentado
- El controlador hoy devuelve un objeto vacio como usuario/donante
- Las estrategias de Passport usan placeholders y no consultan modelos reales
- No hay modelos Sequelize de dominio implementados para usuarios, proyectos, donaciones y actualizaciones
- Las migraciones generadas existen, pero su contenido esta vacio
- No hay endpoints para login, logout, perfil, proyectos, donaciones ni actualizaciones
- No hay tests

## 4. Requerimientos funcionales sugeridos

### 4.1 Usuarios y autenticacion

- Registrar donantes con nombre completo, email, password, confirmacion, DNI y fecha de nacimiento
- Validar email unico
- Validar DNI unico
- Guardar password hasheado
- Iniciar sesion con email y password
- Emitir JWT y almacenarlo en cookie segura/HTTP-only
- Permitir cerrar sesion invalidando la cookie
- Obtener perfil del usuario autenticado
- Manejar roles o tipos de usuario

### 4.2 Proyectos

- Crear proyecto de recaudacion
- Editar proyecto
- Listar proyectos
- Consultar detalle de proyecto
- Cambiar estado del proyecto
- Definir meta economica y fechas de vigencia

### 4.3 Donaciones

- Registrar una donacion a un proyecto
- Asociar la donacion con un donante y un proyecto
- Consultar historial de donaciones de un usuario
- Consultar total recaudado por proyecto
- Manejar estado de pago o confirmacion

### 4.4 Actualizaciones

- Crear actualizaciones para un proyecto
- Listar actualizaciones por proyecto
- Permitir que un responsable del proyecto publique novedades para donantes

## 5. Requerimientos no funcionales

- Arquitectura modular por dominio: `auth`, `donors`, `projects`, `donations`, `updates`
- Validacion estricta de entrada mediante DTOs
- Configuracion por variables de entorno
- Migrations versionadas en Sequelize
- Logs de arranque y errores de base de datos
- CORS controlado por `FRONTEND_URL`
- Cookies seguras en produccion
- Convencion `snake_case` en base de datos
- Soporte para soft delete si se decide usar `deleted_at`

## 6. Endpoints detectados y esperados

### Implementado

- `POST /api/v1/users/register/donor`

Payload validado actualmente:

```json
{
  "full_name": "Nombre Apellido",
  "email": "mail@dominio.com",
  "password": "Password123!",
  "password_confirmation": "Password123!",
  "dni": "12345678",
  "birth_date": "1990-01-15"
}
```

### Recomendados a corto plazo

- `POST /api/v1/users/login`
- `POST /api/v1/users/logout`
- `GET /api/v1/users/me`
- `POST /api/v1/projects`
- `GET /api/v1/projects`
- `GET /api/v1/projects/:id`
- `PATCH /api/v1/projects/:id`
- `POST /api/v1/projects/:id/donations`
- `GET /api/v1/projects/:id/updates`
- `POST /api/v1/projects/:id/updates`

## 7. Diseno de base de datos objetivo en PostgreSQL

PostgreSQL debe ser la unica base objetivo del proyecto. La configuracion TypeScript ya apunta a `dialect: "postgres"` y el paquete `pg` esta instalado, por lo que la decision tecnologica correcta es consolidar todo el flujo de migraciones, modelos y runtime sobre PostgreSQL.

### 7.1 Entidades principales

#### `user_types`

Catalogo de tipos de usuario.

Campos sugeridos:

- `id` UUID o BIGSERIAL
- `name` VARCHAR unico
- `description` TEXT nullable
- `created_at`
- `updated_at`

Valores iniciales sugeridos:

- `donor`
- `admin`
- `beneficiary` o `owner` si el dominio lo necesita

#### `users`

Tabla principal de usuarios.

Campos sugeridos:

- `id` UUID o BIGSERIAL
- `user_type_id` FK a `user_types`
- `full_name` VARCHAR(150)
- `email` VARCHAR(150) UNIQUE NOT NULL
- `password` o `password_hash` VARCHAR NOT NULL
- `dni` VARCHAR(20) UNIQUE NOT NULL
- `birth_date` DATE NOT NULL
- `status` VARCHAR(30) DEFAULT `'active'`
- `created_at`
- `updated_at`
- `deleted_at` nullable

Restricciones:

- indice unico en `email`
- indice unico en `dni`
- FK obligatoria a `user_types`

#### `projects`

Representa una causa o proyecto de recaudacion.

Campos sugeridos:

- `id` UUID o BIGSERIAL
- `owner_user_id` FK a `users`
- `title` VARCHAR(180)
- `summary` VARCHAR(300)
- `description` TEXT
- `goal_amount` NUMERIC(12,2)
- `current_amount` NUMERIC(12,2) DEFAULT 0
- `status` VARCHAR(30) DEFAULT `'draft'`
- `start_date` DATE nullable
- `end_date` DATE nullable
- `cover_image_url` TEXT nullable
- `created_at`
- `updated_at`
- `deleted_at` nullable

Restricciones:

- FK a usuario creador o responsable
- check para `goal_amount > 0`

#### `donations`

Registra los aportes economicos.

Campos sugeridos:

- `id` UUID o BIGSERIAL
- `project_id` FK a `projects`
- `donor_user_id` FK a `users`
- `amount` NUMERIC(12,2) NOT NULL
- `currency` VARCHAR(10) DEFAULT `'ARS'`
- `payment_status` VARCHAR(30) DEFAULT `'pending'`
- `payment_reference` VARCHAR(120) nullable
- `donated_at` TIMESTAMP DEFAULT NOW()
- `created_at`
- `updated_at`

Restricciones:

- FK a `projects`
- FK a `users`
- check para `amount > 0`

#### `updates`

Novedades publicadas sobre un proyecto.

Campos sugeridos:

- `id` UUID o BIGSERIAL
- `project_id` FK a `projects`
- `author_user_id` FK a `users`
- `title` VARCHAR(180)
- `content` TEXT
- `published_at` TIMESTAMP DEFAULT NOW()
- `created_at`
- `updated_at`

## 8. Relaciones recomendadas

- `user_types` 1:N `users`
- `users` 1:N `projects`
- `users` 1:N `donations`
- `projects` 1:N `donations`
- `projects` 1:N `updates`
- `users` 1:N `updates`

## 9. Observaciones tecnicas importantes

### Inconsistencias detectadas

1. `src/db/sequelize.config.ts` esta correctamente preparado para PostgreSQL.
2. `src/db/sequelize_db.config.js` tambien esta alineado con PostgreSQL para `sequelize-cli`.
3. Pero `src/config/database.js` sigue con el scaffold por defecto de MySQL.
4. `.sequelizerc` apunta a `src/db/migrations`, mientras que las migraciones reales estan en `src/migrations`.

Esto genera un riesgo claro: el runtime y `sequelize-cli` no necesariamente estan mirando los mismos archivos/configuraciones.

### Recomendacion senior

Unificar una sola estrategia:

- PostgreSQL como unica base soportada
- una sola carpeta oficial de migraciones
- modelos Sequelize reales por entidad
- uso consistente de nombres (`users`, `projects`, `donations`, `updates`)

## 10. Riesgos actuales

- El endpoint de registro responde exitosamente aunque no crea un usuario real
- Se puede emitir un JWT con un usuario vacio si no se corrige el flujo
- No hay validacion explicita de que `password` y `password_confirmation` coincidan
- No existe control de unicidad de email o DNI en persistencia
- No hay manejo transaccional para operaciones importantes
- No hay pruebas automatizadas

## 11. Prioridades recomendadas

### Prioridad alta

- Implementar modelos Sequelize para PostgreSQL
- Completar migraciones reales
- Corregir el registro de donante para persistir datos
- Validar coincidencia de password y password confirmation
- Crear login real con Passport/JWT

### Prioridad media

- CRUD de proyectos
- Registro de donaciones
- Actualizaciones de proyectos
- Middleware de autenticacion/autorizacion

### Prioridad baja

- Seeds iniciales para tipos de usuario
- auditoria/logs mas completos
- tests unitarios e integracion

## 12. Variables de entorno minimas

```env
APP_PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=vaquita_db
DB_USERNAME=postgres
DB_PASSWORD=postgres

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=8h
COOKIE_SECRET=super_cookie_secret
```




--------------------------

4.3 Donaciones

POST /api/v1/projects/:id/donations
Registrar una donacion sobre un proyecto

GET /api/v1/users/me/donations
Listar donaciones del usuario autenticado

GET /api/v1/projects/:id/donations
Listar donaciones de un proyecto


4.4 Actualizaciones

POST /api/v1/projects/:id/updates
Crear una actualizacion del proyecto

GET /api/v1/projects/:id/updates
Listar actualizaciones del proyecto

GET /api/v1/updates/:id
Ver detalle de una actualizacion


5. Orden recomendado de implementacion

Paso 1:
terminar auth
- login
- logout
- me

Paso 2:
crear CRUD basico de proyectos

Paso 3:
registrar donaciones

Paso 4:
crear actualizaciones


6. Notas tecnicas utiles

- La API hoy usa DTO en ingles para el request de registro, pero persiste en campos en espanol.
- La base de datos esta en PostgreSQL.
- Sequelize ya esta configurado para usar migraciones y modelos reales.
- Passport y cookie-parser ya quedaron preparados para continuar con login protegido.