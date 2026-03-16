# 02 Manual de usuario

## 1. Requisitos del sistema

Para ejecutar el proyecto localmente se recomienda contar con lo siguiente:

- Node.js 18 o superior
- npm 9 o superior
- Sistema operativo Windows, Linux o macOS
- Navegador moderno como Chrome, Edge o Firefox
- Conexion a internet para consultar la API de Rick and Morty

## 2. Pasos de instalacion o ejecucion

### Instalacion

1. Abrir una terminal en la raiz del proyecto.
2. Instalar dependencias:

```bash
npm install
```

3. Verificar que exista el archivo `.env.local` con una clave JWT. Ejemplo:

```env
JWT_SECRET=rick_morty_super_secret_jwt_key_2024_change_in_production
NEXT_PUBLIC_API_URL=https://rickandmortyapi.com/api
```

### Ejecucion en desarrollo

```bash
npm run dev
```

Luego abrir en el navegador:

```text
http://localhost:3000
```

### Compilacion de produccion

```bash
npm run build
npm start
```

### Base de datos local

No es necesario crear la base manualmente. Al iniciar la aplicacion, el sistema genera automaticamente el archivo SQLite `database/app.db` y crea las tablas necesarias.

## 3. Descripcion de las funcionalidades

### 3.1 Inicio de la aplicacion

- La ruta principal redirige automaticamente al dashboard.
- El dashboard carga personajes de Rick and Morty con estadisticas generales.

### 3.2 Dashboard de personajes

El usuario puede:

- Ver tarjetas de personajes con imagen, estado, especie, tipo y genero.
- Consultar resumenes de personajes vivos, muertos, desconocidos y total.
- Filtrar por nombre.
- Filtrar por estado.
- Filtrar por especie y genero si el panel lo permite.

### 3.3 Registro de usuario

Desde la vista de registro se puede crear una cuenta con los siguientes datos:

- Nombre completo
- Correo electronico
- Contrasena
- Confirmacion de contrasena
- Tipo de documento
- Numero de documento

Al registrarse correctamente:

- El sistema crea el usuario con rol `user`.
- Se inicia sesion automaticamente.
- El usuario es redirigido al dashboard.

### 3.4 Inicio de sesion

El login solicita:

- Correo electronico
- Contrasena

Si las credenciales son correctas:

- Se guarda la sesion en el navegador.
- El usuario puede usar favoritos.
- Si es administrador, tambien vera acceso al panel admin.

### 3.5 Favoritos

Cuando el usuario autenticado pulsa el icono de corazon en una tarjeta:

- Si el personaje no estaba guardado, se agrega a favoritos.
- Si ya estaba guardado, se elimina de favoritos.

Si el usuario no ha iniciado sesion:

- No puede agregar favoritos.
- Se abre una ventana modal con opcion de ir a iniciar sesion o registrarse.

### 3.6 Panel de administracion

Solo disponible para usuarios con rol `admin`.

Funciones del panel:

- Ver todos los usuarios registrados.
- Consultar nombre, email, rol, documento y fecha de registro.
- Editar nombre, email, rol, tipo de documento y numero de documento.
- Eliminar usuarios.

Restricciones:

- Un usuario no administrador no puede entrar al panel.
- El administrador no puede eliminar su propia cuenta desde la tabla.

### 3.7 Usuario administrador de prueba

Para pruebas iniciales del sistema existe un usuario administrador semilla:

- Email: `admin@example.com`
- Contrasena: `Admin123`

## 4. Capturas de pantalla del sistema

En este repositorio no se incluyen imagenes de capturas todavia. Para completar esta seccion en la entrega, se recomienda agregar capturas de las siguientes vistas:

1. Pantalla de login.
2. Pantalla de registro.
3. Dashboard de personajes.
4. Modal al intentar agregar favorito sin sesion.
5. Dashboard con usuario autenticado.
6. Panel de administracion con listado de usuarios.
7. Modal de edicion de usuario en el panel admin.

### Nombre sugerido de archivos

- `login.png`
- `registro.png`
- `dashboard.png`
- `modal_favoritos.png`
- `dashboard_autenticado.png`
- `panel_admin.png`
- `editar_usuario.png`

### Ubicacion sugerida

Puedes guardar las capturas en una carpeta como:

```text
doc/desarrollo_software/capturas/
```

## 5. Solucion de problemas comunes

### No inicia el proyecto

- Verificar que `node -v` sea 18 o superior.
- Ejecutar nuevamente `npm install`.

### No funciona el login

- Confirmar que la base local se haya creado.
- Verificar que exista el usuario admin semilla o registrar un nuevo usuario.

### No aparecen personajes

- Revisar la conexion a internet.
- Confirmar disponibilidad de la API publica de Rick and Morty.

### No carga el panel admin

- Verificar que la sesion actual tenga rol `admin`.
- Confirmar que el token no haya expirado o sido borrado del navegador.