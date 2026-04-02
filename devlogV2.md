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