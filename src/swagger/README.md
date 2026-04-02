### 📝 Guía de documentación de Swagger
---

#### 🔧 Instalación y ejecución
1. **Instalar dependencias**

```bash
npm install swagger-ui-express swagger-jsdoc
npm install -D @types/swagger-jsdoc @types/swagger-ui-express
```

2. **Acceder a la url de la documentación**
```text
http://localhost:3000/api/docs
```

### 📝 Documentar endpoints

#### 📐 Estructura

Cada endpoint se documenta mediante comentarios JSDoc usando la anotación @swagger.

En un archivo dentro de `src/docs/paths` definir las estructuras requeridas para una ruta:

#### 📌 Ejemplo
```typescript
export default {
  "/api/auth/login": {
    post: {
      summary: "Login de usuario",
      description: "Ingreso de credenciales para acceder a la aplicación",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequestSchema"
            }
          }
        }
      },
      responses: {
        "200": {
          $ref: "#/components/responses/LoginSuccessResponse"
        },
        "400": {
          $ref: "#/components/responses/BadRequestResponse"
        },
        "401": {
          $ref: "#/components/responses/InvalidCredentialsResponse"
        },
        "500": {
          $ref: "#/components/responses/InternalServerErrorResponse"
        },
      }
    }
  }
}
```

#### 📖 Explicación
> **/api/auth/login:**

Define la URL del endpoint.
Debe coincidir exactamente con la ruta real de Express.

> **post:**

Indica si el endpoint es `get`, `post`, `put`, `delete`, etc.

> **summary:**

Una frase corta que explica qué hace el endpoint.
Debe ser conciso y visible en Swagger UI.

> **description:**

Explicación más detallada.
Podés incluir reglas, notas, o comportamientos importantes.

> **tags**

Clasifica el endpoint por dominio funcional. Se definen dentro de `src/docs/tags/index.ts`.

```typescript
export default [
    {
        name: "Authentication",
        description: "Endpoints para autenticación y gestión de usuarios"
    }
]
```

> **security:**

Indica qué tipo de autenticación requiere el endpoint.
Usos comunes:
- **bearerAuth → JWT por header**
- **cookieAuth → JWT en cookies**
- **apiKeyAuth → API Key por header**

> **requestBody:**

Describe qué espera recibir el endpoint.
- `required`: si el body es obligatorio
- `content`: tipo de contenido `(application/json)`
- `schema`: referencia a un schema reutilizable

> **responses:**

Describe todas las respuestas posibles del endpoint mediante referencias.

---
>⚠️ **Nota sobre cookies**
>
>Swagger UI **no puede setear cookies HttpOnly**.
>Para probar endpoints protegidos es necesario:
>
>- **autenticarse previamente**
>- **o desactivar `HttpOnly` en entorno de desarrollo**


### 📝 Schemas

Se definen en un archivo dentro de `src/docs/components/schemas`.
#### ➕ Crear schema
#### 📌 Ejemplo
```typescript
export default {
  LoginRequestSchema: {
    type: "object",
    properties: {
      email: {
        type: "string",
        example: "example@example.com",
        format: "email",
        description: "Email del usuario"
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 60,
        example: "fifa1Ab_",
        description: "Contraseña del usuario"
      },
    },
    required: ["email", "password"],
 },
}
```

#### 📖 Explicación

> **LoginRequestSchema**

Es el identificador del schema, para utilizarlo hay que hacer referencia:
```typescript
$ref: '#/components/schemas/LoginRequestSchema'
```

> **type: "object"**

Indica que el schema representa un objeto JSON.
Posibles tipos de dato: **string, number, boolean, array, object**.

> **properties**

Cada campo del request se define dentro de properties.

Dentro de cada campo se puede especificar:

| Propiedad |	Descripción |
|-----------|-----------|
|**type**	|Tipo de dato (string, number, boolean, array, object)|
|**example**	|Ejemplo que Swagger UI mostrará|
|**description**	|Explica qué representa el campo|
|**format**	| Validaciones semánticas (email, uuid, date, etc.)|
|**minLength / maxLength**	|Validación estándar|
|**enum**	|Lista de valores permitidos|

> **required**

Esto le indica a Swagger que esos campos no pueden faltar en el request.

#### 📦 Registrar Schema
Dentro del archivo `src/docs/components/schemas/index.ts`, importar y exportar los schemas creados.

```typescript
import authSchemas from "./auth";
export default {
    ...authSchemas,
};
```

> ⚠️ Un schema NO representa una respuesta HTTP completa.
Las respuestas siempre se definen en `components/responses`.

### 🧪 Examples

Los **examples** representan respuestas reales que la API puede devolver.
Swagger los utiliza para mostrar **casos concretos** y facilitar las pruebas desde la UI.

📌 Los examples **no definen estructura**, solo muestran valores de ejemplo.

Se definen en archivos dentro de `src/docs/components/examples`

---
### ➕ Crear example

#### 📌 Ejemplo
```typescript
export default {
  LoginSuccessExample: {
    summary: "Login exitoso",
    value: {
      status: true,
      message: "Login exitoso",
      data: {
        user: {
          id: 1,
          full_name: "Juan Perez",
          email: "juan@example.com",
          created_at: "2025-12-17T17:00:00Z",
          updated_at: "2025-12-17T17:00:00Z",
        }
      }
    },
  },
}
```

#### 📖 Explicación
> LoginSuccessExample

Es el identificador del example.
Para utilizarlo se hace referencia desde un response:

```typescript
$ref: "#/components/examples/LoginSuccessExample"
```


> summary

Descripción breve del ejemplo que Swagger UI mostrará en la documentación.

> value

Descripción breve del ejemplo que Swagger UI mostrará en la documentación.
Consejos:
- No usar type, properties ni required
- No usar $ref dentro de value
- Debe coincidir con la estructura definida en el schema asociado

---

#### 📦 Registrar Example

Dentro del archivo `src/docs/components/examples/index.ts`, importar y exportar los examples creados.

```typescript
import authExamples from "./auth";

export default {
  ...authExamples,
};
```

---

### 📦 Responses
Los responses representan respuestas HTTP completas y se encargan de unir:

- Código de estado HTTP
- Tipo de contenido (application/json)
- Schema de la respuesta
- Uno o varios examples

Se definen en archivos dentro de: `src/docs/components/responses`

#### ➕ Crear response
##### 📌 Ejemplo
```typescript
export default {
  LoginSuccessResponse: {
    description: "Login exitoso",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/SuccessSchema"
        },
        examples: {
          success: {
            $ref: "#/components/examples/LoginSuccessExample"
          },
        },
      },
    }
  },
}
```

##### 📖 Explicación
> LoginSuccessResponse

Es el identificador del response.
Se utiliza desde un path, asociado a un código HTTP:

```typescript
$ref: "#/components/responses/LoginSuccessResponse"
```

> description

Describe el significado de la respuesta HTTP (éxito, error, validación, etc).

> content

Define el tipo de contenido devuelto por la API.
En una API REST normalmente es:
```typescript
"application/json"
```

> schema

Define la estructura completa de la respuesta.

> examples

Permite asociar uno o varios ejemplos a la respuesta.
Se usa para:
- Mostrar distintos casos con el mismo status code
- Facilitar pruebas desde Swagger UI

#### 📦 Registrar Response
Dentro del archivo `src/docs/components/responses/index.ts`, importar y exportar los responses creados.
```typescript
import authResponses from "./auth";

export default {
  ...authResponses,
};
```

#### 📌 Regla mental rápida:
- **Schema** → define estructura (contrato)
- **Example** → muestra valores reales
- **Response** → une status + schema + examples
- **Path** → consume responses
