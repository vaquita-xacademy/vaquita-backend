### ⚙️ Configuración inicial

#### Clonar el repositorio
```bash
git clone https://github.com/vaquita-xacademy/vaquita-backend.git
```

#### Instalar dependencias
```bash
npm install
```

### 🔐 Variables de entorno

El proyecto utiliza un archivo `.env` a nivel raíz para la configuración global.

#### Crear archivo `.env` (Obligatorio)
```bash
cp .env.example .env
```

#### Configurar las variables necesarias
```bash
# App config
APP_PORT= # e.g. 3000
ENV= # e.g. development | production
...
```
> Ver `.env.example` para la lista completa de variables

---
### Migraciones (tablas)

Crear archivos manualmente dentro de la carpeta ```db/migrations```. Utilizar plantilla ```template-migration.ts```.

Luego ejecutar el siguiente comando para crear las tablas en base de datos:
```bash
npm run migrate
```

Deshacer todas las migraciones:

```bash
npm run migrate:undo:all
```

### Seeders (registros iniciales)

Crear archivos manualmente dentro de la carpeta ```db/seeders```. Utilizar plantilla ```template-seeder.ts```.

Luego ejecutar el siguiente comando para crear los registros:

```bash
npm run seed:all
```

Eliminar los registros:

```bash
npm run seed:undo:all
```

---
### ▶️ Ejecutar el servidor en modo desarrollo
```bash
npm run dev
```
> Se utiliza nodemon + ts-node para recarga automática.