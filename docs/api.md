# Guía de Documentación de API - Swagger UI (Express)

## Instalación

### Instalación de Swagger UI para Express

```bash
# Instalación de dependencias
npm install swagger-ui-express

# Tipos para TypeScript (opcional)
npm install --save-dev @types/swagger-ui-express
```

## Configuración

### 1. Archivo de especificación OpenAPI

Ubicación: [`src/swagger/swagger.json`](../src/swagger/swagger.json)

Este archivo contiene:

- El documento OpenAPI 3.0.0 
- Definición de endpoints, parámetros, request bodies y respuestas
- Información de servidor (base URL)

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API Documentation",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:3000/api/v1"
    }
  ],
  "paths": {}
}
```

### 2. Middleware de Swagger UI

Ubicación: [`src/routes/swagger-ui.route.ts`](../src/routes/swagger-ui.route.ts)

Este archivo expone la documentación en una ruta accesible:

```typescript
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger.json";

const router = Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
```
### 3. Integración en Express

Ubicación: [`src/app.ts`](../src/app.ts)

```typescript
import swaggerUiRoute from "./routes/swagger-ui.route";

// Rutas de la API
app.use("/api/v1", routes);

// Swagger UI
app.use("/api/v1/docs", swaggerUiRoute);
```

## Comandos para ejecutar el proyecto

### Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

### Producción

```bash
# Construir el proyecto
npm run build

# Iniciar el servidor de producción
npm start
```

## Probar endpoints con Swagger UI

1. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

2. **Abrir documentación en el navegador:**

   ```
   http://localhost:3000/api/v1/docs
   ```

3. **Probar un endpoint:**
   - Selecciona un método (GET, POST, etc.)
   - Completar parámetros si aplica
   - Haz clic en el botón **"Try it out"**
   - Haz clic en **"Execute"** para enviar la solicitud
   - Observa la respuesta en la sección de respuesta

4. **Para endpoints que requieren autenticación:**
   - Hacer clic en el botón "Authorize" en la parte superior derecha.
   - Ingresar tu token: `Bearer TU_TOKEN_JWT`
   - Luego puedes probar los endpoints protegidos

## Agregar un nuevo endpoint

Para agregar más endpoints a la documentación, edita el objeto `swaggerDocument` en [`src/swagger/swagger.json`](../src/swagger/swagger.json):

### Ejemplo de endpoint GET

```typescript
"/tu-nuevo-endpoint": {
  get: {
    summary: "Descripción corta",
    description: "Descripción detallada del endpoint",
    operationId: "operationId",
    parameters: [
      {
        name: "parametro",
        in: "query",
        description: "Descripción del parámetro",
        required: false,
        schema: {
          type: "string",
          example: "valor-ejemplo",
        },
      },
    ],
    responses: {
      "200": { description: "Éxito" },
      "400": { description: "Solicitud inválida" },
      "500": { description: "Error del servidor" },
    },
  },
}
```

### Ejemplo de endpoint POST

```typescript
"/users/register": {
  post: {
    summary: "Registrar usuario",
    description: "Descripción detallada",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["full_name", "email", "password"],
            "properties": {
              "full_name": { "type": "string", "example": "Juan Perez" },
              "email": { "type": "string", "example": "juan@example.com" },
              "password": { "type": "string", "example": "StrongPass123!" }
            },
          },
        },
      },
    },
    responses: {
      "200": { description: "Usuario creado" },
      "400": { description: "Solicitud inválida" }
    },
  },
}
```

