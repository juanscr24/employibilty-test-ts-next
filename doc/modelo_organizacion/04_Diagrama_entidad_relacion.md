# 04 Diagrama entidad relacion o modelo relacional

## 1. Tablas

La base de datos del sistema se compone de las siguientes tablas:

- `roles`
- `document_types`
- `users`
- `favorites`

## 2. Campos

### Tabla `roles`

- `id`: identificador unico.
- `name`: nombre del rol.
- `description`: descripcion del rol.

### Tabla `document_types`

- `id`: identificador unico.
- `name`: nombre del tipo de documento.
- `abbreviation`: abreviatura del documento.

### Tabla `users`

- `id`: identificador unico del usuario.
- `name`: nombre completo.
- `email`: correo unico.
- `password_hash`: hash de contrasena.
- `role_id`: referencia al rol.
- `document_type_id`: referencia al tipo de documento.
- `document_number`: numero de documento.
- `created_at`: fecha de creacion.
- `updated_at`: fecha de actualizacion.

### Tabla `favorites`

- `id`: identificador unico.
- `user_id`: referencia al usuario.
- `character_id`: identificador del personaje en la API externa.
- `created_at`: fecha de creacion.

## 3. Llaves primarias y foraneas

### Llaves primarias

- `roles.id`
- `document_types.id`
- `users.id`
- `favorites.id`

### Llaves foraneas

- `users.role_id` -> `roles.id`
- `users.document_type_id` -> `document_types.id`
- `favorites.user_id` -> `users.id`

## 4. Relaciones entre entidades

- Un rol puede estar asociado a muchos usuarios.
- Un tipo de documento puede estar asociado a muchos usuarios.
- Un usuario puede tener muchos favoritos.
- Cada favorito pertenece a un unico usuario.
- El personaje favorito no se almacena como tabla local; se referencia por `character_id` desde la API externa.

## 5. Representacion relacional textual

```text
roles (1) -------- (N) users
document_types (1) - (N) users
users (1) -------- (N) favorites

favorites.character_id -> referencia logica a personaje externo
```

## 6. Modelo entidad relacion sugerido

```text
+-------------+       +------------------+
| roles       |       | document_types   |
+-------------+       +------------------+
| PK id       |       | PK id            |
| name        |       | name             |
| description |       | abbreviation     |
+-------------+       +------------------+
       \                  /
        \                /
         \              /
          \            /
           \          /
            v        v
            +------------------------------+
            | users                        |
            +------------------------------+
            | PK id                        |
            | name                         |
            | email                        |
            | password_hash                |
            | FK role_id                   |
            | FK document_type_id          |
            | document_number              |
            | created_at                   |
            | updated_at                   |
            +------------------------------+
                          |
                          | 1:N
                          v
                 +-------------------+
                 | favorites         |
                 +-------------------+
                 | PK id             |
                 | FK user_id        |
                 | character_id      |
                 | created_at        |
                 +-------------------+
```

## 7. Justificacion del modelo

El modelo relacional es pequeno y suficiente para el alcance del sistema. Separa correctamente roles, tipos de documento, usuarios y favoritos, evitando redundancia. Tambien permite extender la solucion en el futuro, por ejemplo agregando auditoria, permisos detallados o una tabla local de personajes favoritos sincronizados.