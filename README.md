### ⚙️ Configuración inicial

#### Clonar el repositorio
```bash
git clone https://github.com/vaquita-xacademy/vaquita-backend.git
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

### ▶️ Ejecutar el servidor en modo desarrollo
```bash
npm install
npm run dev
```
> Usa nodemon + ts-node para recarga automática.
