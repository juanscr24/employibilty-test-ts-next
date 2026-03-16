# 01 Documento tecnico

## 1. Estructura del proyecto

El proyecto esta construido con Next.js 15 usando App Router, TypeScript y Tailwind CSS. La aplicacion combina una capa frontend para consumir la API publica de Rick and Morty con una capa backend interna en Next.js para autenticacion, administracion de usuarios y persistencia local con SQLite.

```text
employibilty-test-ts-next/
├─ database/
│  ├─ database.ts
│  └─ schema.sql
├─ data/
├─ doc/
│  ├─ analisis.md
│  ├─ Mejoras.md
│  └─ desarrollo_software/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  ├─ (auth)/
│  │  ├─ (main)/
│  │  ├─ global.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  ├─ contexts/
│  ├─ hooks/
│  ├─ libs/
│  ├─ types/
│  └─ validations/
├─ next.config.ts
├─ package.json
└─ tsconfig.json
```

## 2. Descripcion de carpetas y modulos

### `database/`

- `database.ts`: inicializa la conexion SQLite con `better-sqlite3`, crea tablas y ejecuta datos semilla.
- `schema.sql`: documento de referencia del esquema de base de datos.

### `src/app/`

- `layout.tsx`: layout raiz que envuelve toda la app con `AuthProvider`.
- `page.tsx`: redirige al dashboard al iniciar la aplicacion.
- `(auth)/`: agrupa las vistas de autenticacion.
- `(main)/dashboard/page.tsx`: pagina principal de personajes.
- `(main)/admin/page.tsx`: panel de administracion para usuarios.
- `api/`: backend interno con rutas REST para autenticacion, usuarios, favoritos y tipos de documento.

### `src/components/`

- `CharacterCard.tsx`: renderiza cada personaje y el boton de favoritos.
- `DashboardHeader.tsx`: encabezado con nombre de usuario, rol, logout y acceso admin.
- `FiltersPanel.tsx`: filtros para nombre, estado, especie y genero.
- `LoginModal.tsx`: modal que invita a iniciar sesion si se intenta marcar favorito sin autenticacion.
- `Toast.tsx`, `Loading.tsx`, `ErrorState.tsx`, `StatsCard.tsx`, `FormField.tsx`: piezas reutilizables de UI.

### `src/contexts/`

- `AuthContext.tsx`: mantiene usuario autenticado, token, login, registro y logout en todo el cliente.

### `src/hooks/`

- `useCharacters.ts`: obtiene personajes desde la API de Rick and Morty y calcula estadisticas.
- `useFavorites.ts`: administra favoritos del usuario autenticado mediante `/api/favorites`.
- `useAuth.ts`: reexporta el contexto de autenticacion para mantener imports consistentes.
- `useToast.ts`: gestiona notificaciones visuales.

### `src/libs/`

- `axios.ts`: define dos clientes Axios, uno para la API publica y otro para la API local autenticada.
- `jwt.ts`: firma y valida tokens JWT.
- `api.ts`, `constants.ts`, `helpers.ts`, `routes.ts`: utilidades y constantes de soporte.

### `src/types/`

- Modelos TypeScript para usuarios, autenticacion, personajes y respuestas comunes.

### `src/validations/`

- Esquemas Zod para login y registro, incluyendo tipo y numero de documento.

## 3. Explicacion del flujo del sistema

### Flujo general

1. El usuario entra a la aplicacion y es redirigido a `/dashboard`.
2. El dashboard consume la API publica de Rick and Morty y muestra personajes con filtros y estadisticas.
3. Si el usuario quiere agregar favoritos:
	 - Si no ha iniciado sesion, aparece un modal para ir a login o registro.
	 - Si ya inicio sesion, el favorito se guarda en SQLite mediante la API local.
4. En el registro, el sistema guarda nombre, email, hash de contrasena, rol por defecto `user`, tipo de documento y numero de documento.
5. En login, la API valida credenciales, genera un JWT y devuelve el perfil del usuario.
6. Si el usuario autenticado tiene rol `admin`, puede acceder a `/admin`.
7. El panel admin lista usuarios registrados y permite editar o eliminar cuentas, excepto la propia eliminacion.

### Flujo de autenticacion

1. La vista de login envia `email` y `password` a `/api/auth/login`.
2. El backend busca el usuario en SQLite.
3. La contrasena se valida con `bcryptjs`.
4. Si es correcta, se firma un token JWT con `userId`, `email` y `role`.
5. El frontend guarda `token` y `user` en `localStorage`.
6. `AuthContext` restaura esta sesion al recargar la pagina.

### Flujo de favoritos

1. `CharacterCard` detecta clic en el icono de corazon.
2. `useFavorites` consulta si el usuario esta autenticado.
3. Si no lo esta, devuelve `false` y la UI abre `LoginModal`.
4. Si esta autenticado, envia `POST /api/favorites` o `DELETE /api/favorites/:characterId`.
5. SQLite guarda la relacion entre `user_id` y `character_id`.

### Flujo de administracion

1. El admin entra a `/admin`.
2. La pagina valida que exista sesion y que el rol sea `admin`.
3. Se consultan usuarios y tipos de documento en paralelo.
4. El admin puede editar nombre, email, rol, tipo de documento y numero de documento.
5. Los cambios se persisten con `PUT /api/users/:id`.
6. La eliminacion usa `DELETE /api/users/:id`.

## 4. Fragmentos de codigo relevantes comentados

### Inicializacion de SQLite y seed

```ts
function getDb(): Database.Database {
	if (!db) {
		db = new Database(DB_PATH);
		db.pragma('journal_mode = WAL');
		db.pragma('foreign_keys = ON');
		initializeSchema(db);
		seedData(db);
	}
	return db;
}
```

Este bloque garantiza que la base de datos se inicialice una sola vez por proceso, habilita integridad referencial con claves foraneas y crea datos base como roles, tipos de documento y el admin inicial.

### Registro de usuario con rol por defecto

```ts
const result = db
	.prepare(
		`INSERT INTO users (name, email, password_hash, role_id, document_type_id, document_number)
		 VALUES (?, ?, ?, 2, ?, ?)`
	)
	.run(name, email, passwordHash, documentTypeId ?? null, documentNumber ?? null);
```

El registro asigna siempre el rol `user` con `role_id = 2`, evitando que un usuario comun se cree como administrador desde el frontend.

### Restauracion de sesion en cliente

```ts
useEffect(() => {
	const savedToken = localStorage.getItem('token');
	const savedUser = localStorage.getItem('user');
	if (savedToken && savedUser) {
		try {
			setUser(JSON.parse(savedUser));
		} catch {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		}
	}
	setIsLoading(false);
}, []);
```

El contexto restaura la sesion local al cargar la aplicacion y limpia datos corruptos para evitar estados inconsistentes.

### Bloqueo de favoritos para usuarios anonimos

```ts
const handleFavoriteClick = async () => {
	setIsPending(true);
	const ok = await toggleFavorite(character.id);
	if (!ok) {
		setShowLoginModal(true);
	}
	setIsPending(false);
};
```

El componente delega la logica al hook. Si la accion no puede realizarse por falta de autenticacion, se abre un modal con acceso directo a login o registro.

### Proteccion del panel admin

```ts
if (payload.role !== 'admin') {
	return NextResponse.json({ message: 'Acceso denegado' }, { status: 403 });
}
```

Las rutas administrativas no dependen solo de la UI; tambien validan el rol en backend usando el JWT recibido en el header `Authorization`.

## 5. Tecnologias usadas

### Frontend

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS 4
- Lucide React
- React Hook Form
- Zod

### Backend y persistencia

- Next.js App Router API Routes
- SQLite local con `better-sqlite3`
- `bcryptjs` para hash de contrasenas
- `jsonwebtoken` para autenticacion basada en JWT
- Axios para consumo HTTP

### Servicios externos

- Rick and Morty API como fuente publica de personajes

## 6. Consideraciones tecnicas

- La base de datos se crea automaticamente en `database/app.db`.
- El archivo `.env.local` define `JWT_SECRET` y puede ampliarse para ambientes reales.
- El proyecto compila correctamente con `next build`.
- Existe un usuario administrador semilla para las pruebas iniciales:
	- Email: `admin@example.com`
	- Contrasena: `Admin123`

## 7. Posibles mejoras futuras

- Implementar recuperacion de contrasena para la ruta `/forgot-password`.
- Mover el manejo de sesion a cookies seguras httpOnly.
- Agregar paginacion real en personajes y usuarios.
- Registrar favoritos completos con cache o sincronizacion offline.
- Incorporar pruebas unitarias e integracion para hooks, API y componentes.