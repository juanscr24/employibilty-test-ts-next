# 03 Wireframes o mockups

## 1. Pantalla principal

La pantalla principal del sistema corresponde al dashboard de personajes. Su estructura visual puede describirse asi:

- Encabezado con titulo del sistema.
- Informacion de usuario autenticado o boton de inicio de sesion.
- Tarjetas de estadisticas.
- Panel de filtros.
- Grilla de personajes.

### Wireframe textual sugerido

```text
+-----------------------------------------------------------+
| Dashboard de Personajes                     [Login/Admin] |
+-----------------------------------------------------------+
| [Total] [Vivos] [Muertos] [Desconocidos]                 |
+-----------------------------------------------------------+
| [Buscar nombre] [Estado] [Otros filtros]                |
+-----------------------------------------------------------+
| [Card personaje] [Card personaje] [Card personaje]      |
| [Card personaje] [Card personaje] [Card personaje]      |
+-----------------------------------------------------------+
```

## 2. Gestion de proyectos

El proyecto actual no corresponde a una aplicacion de gestion de proyectos. Para mantener coherencia con este repositorio, esta seccion se adapta como gestion administrativa del sistema.

En este contexto, la vista equivalente es el panel de administracion:

- Tabla de usuarios.
- Controles de edicion y eliminacion.
- Modal de actualizacion.

### Wireframe textual sugerido

```text
+------------------------------------------------------------------+
| Panel de Administracion                                          |
+------------------------------------------------------------------+
| ID | Nombre | Email | Rol | Documento | Fecha | Acciones         |
| 1  | Admin  | ...   | ... | ...       | ...   | [Editar][Borrar] |
| 2  | User   | ...   | ... | ...       | ...   | [Editar][Borrar] |
+------------------------------------------------------------------+
```

## 3. Gestion de tareas

El sistema no implementa un modulo de tareas. Para no falsear el alcance, esta seccion se reinterpreta como gestion de acciones del usuario dentro del sistema.

Acciones principales que el usuario realiza:

- Registrarse.
- Iniciar sesion.
- Consultar personajes.
- Filtrar informacion.
- Marcar o desmarcar favoritos.
- Administrar usuarios si posee rol admin.

Si la institucion exige estrictamente una vista de tareas, se puede aclarar que el dominio del proyecto no maneja tareas sino personajes, usuarios y favoritos.

## 4. Formularios de creacion y edicion

### Formulario de registro

Campos presentes:

- Nombre completo
- Correo electronico
- Contrasena
- Confirmar contrasena
- Tipo de documento
- Numero de documento

### Wireframe textual

```text
+--------------------------------------+
| Crear cuenta                         |
+--------------------------------------+
| Nombre completo      [____________]  |
| Correo electronico   [____________]  |
| Contrasena           [____________]  |
| Confirmar contrasena [____________]  |
| Tipo de documento    [___________v]  |
| Numero documento     [____________]  |
|                [ Registrarse ]       |
+--------------------------------------+
```

### Formulario de login

Campos presentes:

- Correo electronico
- Contrasena

### Formulario de edicion de usuario

Campos presentes en el panel admin:

- Nombre
- Email
- Rol
- Tipo de documento
- Numero de documento

## 5. Recomendacion de elaboracion visual

Para la entrega visual formal se recomienda diseñar mockups en:

- Figma
- Draw.io
- Adobe XD
- Penpot

## 6. Archivos sugeridos para anexar

- `wireframe_dashboard.png`
- `wireframe_login.png`
- `wireframe_registro.png`
- `wireframe_panel_admin.png`
- `wireframe_editar_usuario.png`