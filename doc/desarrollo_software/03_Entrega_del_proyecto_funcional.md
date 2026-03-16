# 03 Entrega del proyecto funcional

## 1. Repositorio en GitHub o GitLab

El proyecto se encuentra preparado para ser entregado desde este repositorio local. En esta version del documento no se incluye una URL remota publicada, por lo que esta seccion debe completarse con el enlace final cuando el repositorio sea subido a GitHub o GitLab.

### Datos a completar en la entrega final

- URL del repositorio
- Rama principal entregada
- Hash del ultimo commit estable

### Formato sugerido

```text
Repositorio: https://github.com/usuario/nombre-del-repo
Rama: main
Commit: xxxxxxxxxxxxxxxx
```

## 2. Codigo fuente completo

El codigo fuente entregado incluye:

- Frontend en Next.js 15 con App Router.
- Backend interno usando API Routes de Next.js.
- Persistencia local con SQLite.
- Validaciones con Zod.
- Formularios con React Hook Form.
- Autenticacion con JWT.
- Roles de usuario (`admin`, `user`).
- Gestion de favoritos por usuario autenticado.

### Modulos funcionales incluidos

- Dashboard de personajes
- Login
- Registro
- Favoritos
- Panel administrador
- API de autenticacion
- API de usuarios
- API de favoritos
- API de tipos de documento

## 3. Base de datos o scripts SQL

La entrega incluye dos elementos relacionados con base de datos:

### Esquema SQL de referencia

- Archivo: `database/schema.sql`

### Inicializacion automatica

- Archivo: `database/database.ts`
- Crea automaticamente las tablas:
	- `roles`
	- `document_types`
	- `users`
	- `favorites`
- Inserta datos semilla:
	- Roles base
	- Tipos de documento
	- Usuario administrador inicial

### Credenciales iniciales de prueba

- Email: `admin@example.com`
- Contrasena: `Admin123`

## 4. Aplicacion ejecutable o API funcionando

### Comandos de ejecucion

```bash
npm install
npm run dev
```

### URL local esperada

```text
http://localhost:3000
```

### Endpoints funcionales incluidos

#### Autenticacion

- `POST /api/auth/login`
- `POST /api/auth/register`

#### Datos auxiliares

- `GET /api/document-types`

#### Usuarios

- `GET /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

#### Favoritos

- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites/:characterId`

### Verificacion realizada

Durante el trabajo sobre este repositorio se ejecuto correctamente la compilacion con:

```bash
npx next build
```

Esto confirma que:

- La aplicacion compila.
- Las rutas de App Router son validas.
- Las API Routes estan integradas correctamente.
- Los tipos TypeScript estan consistentes para la version actual del proyecto.

## 5. Alcance funcional entregado

La entrega deja operativas las siguientes historias de uso:

1. Un visitante puede explorar personajes de Rick and Morty.
2. Un visitante puede registrarse con tipo y numero de documento.
3. Un usuario autenticado puede iniciar sesion y mantener sesion local.
4. Un usuario autenticado puede agregar y quitar personajes favoritos.
5. Un visitante sin sesion recibe una invitacion a autenticarse al intentar usar favoritos.
6. Un administrador puede ver todos los usuarios registrados.
7. Un administrador puede editar usuarios.
8. Un administrador puede eliminar usuarios, excepto su propia cuenta desde la interfaz actual.

## 6. Recomendaciones para la entrega final

Antes de presentar el proyecto se recomienda completar:

1. Subir el repositorio a GitHub o GitLab y pegar la URL en este documento.
2. Adjuntar capturas reales del sistema en funcionamiento.
3. Si la entrega exige despliegue, publicar la aplicacion en Vercel u otra plataforma.
4. Cambiar la clave JWT de ejemplo por una clave privada segura.