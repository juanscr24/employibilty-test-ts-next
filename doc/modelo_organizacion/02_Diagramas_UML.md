# 02 Diagramas UML

## 1. Diagrama de casos de uso

El sistema identifica dos actores principales:

- Visitante
- Administrador

### Casos de uso del visitante

- Ver personajes
- Filtrar personajes
- Registrarse
- Iniciar sesion
- Agregar favorito
- Quitar favorito

### Casos de uso del administrador

- Ver personajes
- Gestionar favoritos propios
- Listar usuarios
- Editar usuario
- Eliminar usuario

### Representacion textual sugerida

```text
Actor: Visitante
  - Consultar personajes
  - Filtrar personajes
  - Registrarse
  - Iniciar sesion
  - Intentar agregar favoritos

Actor: Usuario autenticado
  - Agregar favoritos
  - Eliminar favoritos
  - Cerrar sesion

Actor: Administrador
  - Ver listado de usuarios
  - Editar usuarios
  - Eliminar usuarios
```

## 2. Diagrama de clases

Las clases o entidades logicas mas importantes del sistema son:

- `User`
- `DocumentType`
- `Role`
- `Favorite`
- `Character`
- `AuthContext`
- `useCharacters`
- `useFavorites`

### Representacion conceptual

```text
User
- id: number
- name: string
- email: string
- role: admin | user
- documentTypeId: number
- documentNumber: string

DocumentType
- id: number
- name: string
- abbreviation: string

Favorite
- id: number
- userId: number
- characterId: number

Character
- id: number
- name: string
- status: string
- species: string
- type: string
- gender: string
```

### Relaciones principales

- Un `User` pertenece a un `Role`.
- Un `User` puede tener un `DocumentType`.
- Un `User` puede tener muchos `Favorite`.
- Un `Favorite` referencia un personaje por `characterId`.

## 3. Diagrama de secuencia o actividad

### Caso sugerido: inicio de sesion

```text
Usuario -> Pantalla Login: ingresa email y contrasena
Pantalla Login -> AuthContext: login(email, password)
AuthContext -> API /auth/login: POST credenciales
API /auth/login -> SQLite: consultar usuario
SQLite -> API /auth/login: datos usuario
API /auth/login -> AuthContext: token + user
AuthContext -> LocalStorage: guardar token y user
AuthContext -> Dashboard: redirigir
```

### Caso sugerido: agregar favorito sin sesion

```text
Usuario -> CharacterCard: clic en corazon
CharacterCard -> useFavorites: toggleFavorite(characterId)
useFavorites -> AuthContext: verificar autenticacion
AuthContext -> useFavorites: no autenticado
useFavorites -> CharacterCard: false
CharacterCard -> LoginModal: abrir modal
```

### Caso sugerido: edicion de usuario por admin

```text
Administrador -> Panel Admin: clic en editar
Panel Admin -> Modal Edicion: cargar datos
Administrador -> Modal Edicion: guardar cambios
Modal Edicion -> API /users/:id: PUT datos actualizados
API /users/:id -> SQLite: update users
SQLite -> API /users/:id: confirmacion
API /users/:id -> Panel Admin: usuario actualizado
```

## 4. Herramientas recomendadas para dibujarlos

Los diagramas formales pueden construirse en cualquiera de estas herramientas:

- Draw.io
- Lucidchart
- StarUML
- PlantUML

## 5. Recomendacion para la entrega

Para complementar este documento se recomienda exportar los diagramas en PNG o PDF y guardarlos en una carpeta como:

```text
doc/modelo_organizacion/diagramas/
```

Archivos sugeridos:

- `casos_de_uso.png`
- `diagrama_de_clases.png`
- `diagrama_de_secuencia_login.png`
- `diagrama_de_actividad_favoritos.png`