# 01 Documento

## 1. Introduccion del sistema

El sistema corresponde a una aplicacion web construida con Next.js para consultar personajes de Rick and Morty, administrar autenticacion de usuarios y gestionar favoritos persistidos en una base de datos SQLite local. Adicionalmente, incorpora un rol de administrador que permite visualizar, editar y eliminar usuarios registrados desde un panel interno.

La solucion integra frontend y backend en un mismo proyecto. El frontend ofrece la experiencia visual para login, registro, dashboard y panel admin. El backend se implementa mediante API Routes de Next.js, encargadas de autenticacion, autorizacion, lectura y escritura de datos. La informacion de usuarios, roles, tipos de documento y favoritos se almacena en SQLite.

## 2. Requisitos

### Requisitos funcionales

- El sistema debe permitir visualizar personajes de Rick and Morty.
- El sistema debe permitir filtrar personajes por criterios disponibles en la interfaz.
- El sistema debe permitir registrar usuarios con nombre, correo, contrasena, tipo de documento y numero de documento.
- El sistema debe permitir iniciar y cerrar sesion.
- El sistema debe impedir que un usuario sin sesion agregue favoritos.
- El sistema debe mostrar una opcion de autenticacion cuando un visitante intente usar favoritos.
- El sistema debe permitir guardar y eliminar favoritos por usuario autenticado.
- El sistema debe contemplar roles `admin` y `user`.
- El administrador debe poder listar todos los usuarios registrados.
- El administrador debe poder editar y eliminar usuarios.

### Requisitos no funcionales

- El sistema debe ejecutarse en entorno web moderno.
- El sistema debe usar TypeScript para mejorar mantenibilidad y tipado.
- La persistencia local debe resolverse con SQLite.
- La autenticacion debe implementarse con JWT.
- Las contrasenas deben almacenarse con hash seguro.
- La interfaz debe responder correctamente en escritorio y dispositivos moviles.

### Requisitos tecnicos

- Node.js 18 o superior.
- npm 9 o superior.
- Acceso a internet para consumir la API publica de Rick and Morty.
- Navegador actualizado.

## 3. Arquitectura del software

La arquitectura adoptada es una arquitectura web modular monorepo liviana dentro de un solo proyecto Next.js, dividida en tres capas principales:

### Capa de presentacion

Ubicada en `src/app` y `src/components`. Contiene paginas, layouts, formularios, modales, tarjetas de personajes, tablas administrativas y elementos de soporte visual.

### Capa de logica de cliente

Ubicada en `src/contexts` y `src/hooks`. Contiene el estado de autenticacion, obtencion de personajes, favoritos y toasts. Esta capa desacopla la logica de negocio de la UI.

### Capa de servicios y persistencia

Ubicada en `src/app/api`, `src/libs` y `database`. Implementa rutas backend, JWT, clientes HTTP y la base SQLite. Es responsable del acceso a datos y reglas de autorizacion.

### Vista general de arquitectura

```text
Usuario
  -> Interfaz Next.js
     -> Hooks / Contexto
        -> API Routes de Next.js
           -> SQLite local

Interfaz Next.js
  -> API publica Rick and Morty
```

## 4. Descripcion de modulos

### Modulo de autenticacion

- Registro de usuarios.
- Inicio de sesion.
- Persistencia de sesion en `localStorage`.
- Logout.
- Proteccion de funcionalidades segun rol.

### Modulo de personajes

- Consulta de personajes desde la API externa.
- Visualizacion en tarjetas.
- Filtros y estadisticas.

### Modulo de favoritos

- Agregar personaje a favoritos.
- Eliminar personaje de favoritos.
- Restriccion de acceso para usuarios anonimos.

### Modulo administrativo

- Listado de usuarios registrados.
- Edicion de nombre, correo, rol y documento.
- Eliminacion de usuarios.
- Restriccion de acceso solo para administradores.

### Modulo de base de datos

- Creacion automatica de tablas.
- Insercion de roles y tipos de documento.
- Insercion de usuario administrador inicial.

## 5. Justificacion tecnica

### Next.js

Se utiliza porque permite construir frontend y backend en un solo proyecto, reduciendo complejidad de despliegue y facilitando el manejo de rutas, componentes y API interna.

### TypeScript

Mejora la seguridad del codigo mediante tipado estatico, lo cual ayuda a prevenir errores en formularios, respuestas de la API y estructuras de datos.

### SQLite

Es adecuada para este proyecto por ser una base local, ligera, facil de distribuir y suficiente para un entorno de evaluacion o prototipo funcional.

### JWT

Permite autenticar solicitudes entre cliente y backend sin mantener sesiones en servidor, simplificando la arquitectura actual.

### React Hook Form + Zod

Ofrecen formularios eficientes con validacion estructurada, mensajes de error claros e integracion tipada.

### Axios

Se usa para centralizar llamadas HTTP tanto a la API publica como a la API interna, con soporte para interceptores de autenticacion.

## 6. Conclusion

La organizacion actual del proyecto permite separar responsabilidades, mantener el codigo escalable y resolver tanto la consulta de datos externos como la persistencia local de usuarios y favoritos. La arquitectura seleccionada es apropiada para una aplicacion de tamano pequeno o mediano con autenticacion, administracion y persistencia integrada.