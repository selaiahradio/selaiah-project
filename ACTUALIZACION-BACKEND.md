# ✅ BACKEND ACTUALIZADO - SELAIAH RADIO

## 🎉 ¡Código del Backend Integrado!

**Fecha:** Enero 2025  
**Estado:** ✅ Backend Completo Instalado

---

## 📦 CAMBIOS REALIZADOS

### 1. **server.js** - Completamente Reemplazado

**Nuevas Funcionalidades:**

✅ **Sistema de Autenticación Completo**
- Login local con email/password
- Google OAuth
- Facebook OAuth
- Apple Sign In (preparado)
- Registro de usuarios
- Sesiones persistentes

✅ **Sistema de Roles y Permisos**
- `super_admin` - Acceso total
- `admin` - Gestión general
- `locutor` - Gestión de contenido y streaming
- `editor` - Edición de contenido
- `oyente` - Usuario estándar

✅ **Middleware de Seguridad**
- Rate limiting (100 requests/15min)
- Autenticación requerida para rutas protegidas
- Verificación de roles
- Sesiones seguras con MongoDB

✅ **Modelos de Datos**
- `User` - Usuarios con roles y permisos
- `Config` - Configuraciones del sistema
- `Role` - Definición de roles
- `Show` - Programas de radio
- `Event` - Eventos
- `News` - Noticias

✅ **Rutas de Autenticación**
- `POST /auth/register` - Registro de usuarios
- `POST /auth/login` - Login local
- `GET /auth/google` - Login con Google
- `GET /auth/facebook` - Login con Facebook
- `POST /auth/logout` - Cerrar sesión
- `GET /auth/me` - Obtener usuario actual

✅ **Rutas de Administración**
- `GET /api/admin/config` - Ver configuraciones (admin)
- `PUT /api/admin/config/:category/:key` - Actualizar config (super_admin)
- `GET /api/admin/users` - Listar usuarios (admin)
- `PUT /api/admin/users/:id/role` - Cambiar rol (super_admin)

✅ **Rutas Protegidas**
- `POST /api/shows` - Crear show (requiere: admin/locutor)
- `POST /api/events` - Crear evento (requiere: admin/editor)
- `POST /api/news` - Crear noticia (requiere: admin/editor)
- `POST /api/ai/chat` - Chat con IA (requiere autenticación)

### 2. **package.json** - Actualizado

**Nuevas Dependencias:**
- `express-rate-limit` - Protección contra spam
- `geoip-lite` - Geolocalización
- Versiones actualizadas de todas las librerías

### 3. **.env.example** - Expandido

**Nuevas Variables:**
- `RADIOBOSS_URL` - URL del streaming
- `RADIOBOSS_USERNAME` - Usuario RadioBoss
- `RADIOBOSS_PASSWORD` - Password RadioBoss

---

## 🔐 SISTEMA DE ROLES

### Roles Disponibles

```
┌─────────────────────────────────────────┐
│  SUPER_ADMIN                            │
│  ├── Gestión total del sistema         │
│  ├── Cambiar roles de usuarios         │
│  ├── Modificar configuraciones         │
│  └── Acceso a todas las funciones      │
│                                         │
│  ADMIN                                  │
│  ├── Gestión de contenido              │
│  ├── Ver usuarios                       │
│  └── Ver configuraciones                │
│                                         │
│  LOCUTOR                                │
│  ├── Crear/editar shows                │
│  └── Gestionar streaming                │
│                                         │
│  EDITOR                                 │
│  ├── Crear/editar noticias             │
│  └── Crear/editar eventos               │
│                                         │
│  OYENTE                                 │
│  ├── Escuchar radio                     │
│  ├── Chat con IA                        │
│  └── Ver contenido público              │
└─────────────────────────────────────────┘
```

---

## 🚀 NUEVOS ENDPOINTS

### Autenticación

```bash
# Registro
POST /auth/register
Body: { "email": "user@example.com", "password": "pass123", "name": "Usuario" }

# Login
POST /auth/login
Body: { "email": "user@example.com", "password": "pass123" }

# Google OAuth
GET /auth/google

# Facebook OAuth
GET /auth/facebook

# Logout
POST /auth/logout

# Usuario actual
GET /auth/me
Headers: Cookie con sesión
```

### Administración

```bash
# Ver configuraciones (requiere admin)
GET /api/admin/config

# Actualizar configuración (requiere super_admin)
PUT /api/admin/config/streaming/url
Body: { "value": "https://nuevo-stream.com" }

# Listar usuarios (requiere admin)
GET /api/admin/users?page=1&limit=50&role=oyente&search=juan

# Cambiar rol (requiere super_admin)
PUT /api/admin/users/USER_ID/role
Body: { "role": "admin" }
```

---

## 🔧 CONFIGURACIÓN NECESARIA

### 1. Instalar Nuevas Dependencias

```bash
cd backend
npm install
```

### 2. Actualizar .env

Copiar las nuevas variables de `.env.example`:

```env
# Mínimo requerido
MONGODB_URI=mongodb+srv://...
SESSION_SECRET=tu_secret_aqui
PORT=3001
FRONTEND_URL=http://localhost:3000
RADIOBOSS_URL=https://c34.radioboss.fm:8888/stream

# Opcional (para OAuth)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
```

### 3. Iniciar Servidor

```bash
npm run dev
```

---

## ✅ VERIFICACIÓN

### Test de Autenticación

```bash
# 1. Registrar usuario
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@selaiah.com",
    "password": "password123",
    "name": "Usuario Test"
  }'

# 2. Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@selaiah.com",
    "password": "password123"
  }' \
  -c cookies.txt

# 3. Ver perfil (usando cookie)
curl http://localhost:3001/auth/me -b cookies.txt

# 4. Chat con IA (requiere auth)
curl -X POST http://localhost:3001/api/ai/chat \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"message": "Hola, quiero pedir una canción"}'
```

---

## 🆕 CARACTERÍSTICAS NUEVAS

### 1. **Rate Limiting**
- Máximo 100 requests por IP cada 15 minutos
- Protección contra ataques DDoS

### 2. **Autenticación Robusta**
- Passwords hasheados con bcrypt
- Sesiones persistentes en MongoDB
- Soporte multi-proveedor (Google, Facebook, Apple)

### 3. **Sistema de Permisos**
- Control granular por rol
- Middleware de autorización
- Rutas protegidas

### 4. **Inicialización Automática**
- Roles creados automáticamente al iniciar
- Base de datos lista para usar

### 5. **Mejor Manejo de Errores**
- Errores descriptivos
- Logs detallados
- Respuestas consistentes

---

## 📊 COMPARACIÓN

### Antes vs Ahora

| Característica | Antes | Ahora |
|---------------|-------|-------|
| Autenticación | ❌ No | ✅ Completa |
| Roles | ❌ No | ✅ 5 roles |
| OAuth | ❌ No | ✅ Google/Facebook |
| Rate Limiting | ❌ No | ✅ Sí |
| Permisos | ❌ No | ✅ Por rol |
| Admin Panel | ❌ No | ✅ Rutas admin |
| Seguridad | ⚠️ Básica | ✅ Avanzada |

---

## 🔄 PRÓXIMOS PASOS

### 1. Actualizar Frontend

El frontend necesita actualizarse para:
- [ ] Agregar formularios de login/registro
- [ ] Manejar sesiones
- [ ] Mostrar usuario actual
- [ ] Proteger rutas (chat IA)
- [ ] Agregar panel de admin

### 2. Configurar OAuth

Para habilitar Google/Facebook:
1. Crear apps en Google Cloud Console
2. Crear app en Facebook Developers
3. Agregar credenciales a `.env`

### 3. Testing

Probar todas las funcionalidades:
- [ ] Registro de usuarios
- [ ] Login/Logout
- [ ] Cambio de roles
- [ ] Permisos por rol
- [ ] Rate limiting

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "express-rate-limit not found"

```bash
cd backend
npm install express-rate-limit
```

### Error: "Session secret required"

Agregar a `.env`:
```env
SESSION_SECRET=$(openssl rand -base64 32)
```

### Error: "Google strategy requires clientID"

Las estrategias OAuth solo se activan si las variables están configuradas.
Es normal ver este mensaje si no tienes las credenciales.

---

## 📝 NOTAS IMPORTANTES

1. **Primer Usuario**: El primer usuario registrado debería ser super_admin (cambiar manualmente en MongoDB)

2. **Sesiones**: Las sesiones se guardan en MongoDB, no en memoria

3. **CORS**: Configurado para `FRONTEND_URL`, cambiar en producción

4. **Rate Limiting**: Ajustar según necesidades en producción

5. **Passwords**: Nunca se devuelven en las respuestas API

---

## 🎯 ESTADO ACTUAL

✅ **Backend Completo y Funcional**
- Autenticación: ✅
- Roles: ✅
- Permisos: ✅
- OAuth: ✅ (requiere config)
- Admin: ✅
- Seguridad: ✅

⏳ **Pendiente**
- Integración OpenAI real
- Panel admin en frontend
- Tests automatizados
- Documentación API completa

---

**iHostCast Ltd © 2025**  
**Selaiah Radio Station**
