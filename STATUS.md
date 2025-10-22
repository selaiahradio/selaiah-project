# 🎵 SELAIAH RADIO - STATUS DEL PROYECTO
**iHostCast Ltd © 2025**

---

## ✅ ESTADO ACTUAL: OPERACIONAL

**Fecha:** 21 de Octubre, 2025 - 10:24 PM (UTC-04:00)

---

## 🚀 SERVICIOS ACTIVOS

### 1. **MongoDB Database**
- ✅ **Estado:** RUNNING
- 📍 **Puerto:** 27017
- 🔗 **URI:** `mongodb://localhost:27017/selaiah`
- 📝 **Nota:** Ejecutándose sin Unix socket (--nounixsocket) para evitar conflictos de permisos

### 2. **Backend API Server**
- ✅ **Estado:** RUNNING
- 📍 **Puerto:** 3001
- 🔗 **URL:** http://localhost:3001
- 🎵 **Stream URL:** https://c34.radioboss.fm:8888/stream
- 🛠️ **Modo:** Development (nodemon)

### 3. **Frontend Web** (React)
- 📂 **Directorio:** `/frontend-web`
- 📍 **Puerto:** 3000 (por defecto)
- 🔗 **Proxy:** http://localhost:3001
- ⏸️ **Estado:** Listo para iniciar

---

## 📋 ENDPOINTS DISPONIBLES

### **Endpoints Básicos**
```
GET  /api/health          - Health check del servidor
GET  /api/info            - Información del servidor
GET  /api/stream          - Información del stream de radio
```

### **Autenticación**
```
POST /auth/register       - Registro de usuarios
POST /auth/login          - Login de usuarios
POST /auth/logout         - Logout
GET  /auth/me             - Obtener usuario actual
GET  /auth/google         - Login con Google OAuth
GET  /auth/facebook       - Login con Facebook OAuth
```

### **Gestión de Usuarios**
```
GET  /api/users           - Listar usuarios
POST /api/users           - Crear usuario
GET  /api/admin/users     - Panel admin de usuarios (requiere rol admin)
PUT  /api/admin/users/:id/role - Actualizar rol de usuario
```

### **Contenido**
```
GET  /api/shows           - Obtener shows de radio
POST /api/shows           - Crear show (requiere auth)
GET  /api/events          - Obtener eventos
POST /api/events          - Crear evento (requiere auth)
GET  /api/news            - Obtener noticias
POST /api/news            - Crear noticia (requiere auth)
```

### **IA Chat**
```
POST /api/ai/chat         - Chat con IA (requiere auth)
```

### **📱 Red Social (NUEVO)**
```
POST /api/posts                    - Crear publicación
GET  /api/posts/feed               - Feed de publicaciones
GET  /api/posts/:id                - Obtener publicación
PUT  /api/posts/:id                - Actualizar publicación
DELETE /api/posts/:id              - Eliminar publicación
POST /api/posts/:id/like           - Dar/quitar like
GET  /api/posts/:id/comments       - Obtener comentarios
POST /api/posts/:id/comments       - Crear comentario
DELETE /api/posts/:postId/comments/:commentId - Eliminar comentario
```

### **👥 Social (NUEVO)**
```
POST /api/social/follow/:userId    - Seguir/dejar de seguir usuario
GET  /api/social/followers/:userId - Obtener seguidores
GET  /api/social/following/:userId - Obtener siguiendo
GET  /api/social/profile/:userId   - Obtener perfil de usuario
GET  /api/social/profile/:userId/posts - Obtener posts de usuario
GET  /api/social/search            - Buscar usuarios
```

### **💬 Mensajería (NUEVO)**
```
GET  /api/messages/conversations   - Obtener conversaciones
POST /api/messages/conversations   - Crear/obtener conversación
GET  /api/messages/conversations/:conversationId - Obtener mensajes
POST /api/messages/send            - Enviar mensaje
POST /api/messages/send-media      - Enviar mensaje con media
POST /api/messages/send-voice      - Enviar nota de voz
POST /api/messages/video-call/start - Iniciar videollamada
PUT  /api/messages/video-call/:messageId/end - Finalizar videollamada
POST /api/messages/:messageId/react - Añadir reacción
DELETE /api/messages/:messageId    - Eliminar mensaje
POST /api/messages/typing          - Indicador de escritura
```

---

## 🗄️ MODELOS DE BASE DE DATOS

### **Modelos Principales**
1. ✅ **User** - Usuarios del sistema
2. ✅ **Config** - Configuraciones del sistema
3. ✅ **Role** - Roles y permisos
4. ✅ **Show** - Shows de radio
5. ✅ **Event** - Eventos
6. ✅ **News** - Noticias

### **Modelos de Red Social (NUEVO)**
7. ✅ **Post** - Publicaciones
8. ✅ **Comment** - Comentarios en publicaciones
9. ✅ **Follow** - Relaciones de seguimiento
10. ✅ **Conversation** - Conversaciones de mensajería
11. ✅ **Message** - Mensajes (texto, media, voz, video)

---

## 🔧 COMANDOS ÚTILES

### **Iniciar MongoDB**
```bash
# Con Unix socket (requiere permisos)
brew services start mongodb-community@4.4

# Sin Unix socket (recomendado si hay problemas de permisos)
mongod --dbpath /usr/local/var/mongodb --bind_ip 127.0.0.1 --port 27017 --nounixsocket --logpath /usr/local/var/log/mongodb/mongo-no-socket.log --fork
```

### **Backend**
```bash
cd backend
npm run dev          # Modo desarrollo con nodemon
npm start            # Modo producción
```

### **Frontend Web**
```bash
cd frontend-web
npm start            # Iniciar servidor de desarrollo (puerto 3000)
npm run build        # Build para producción
```

### **Mobile Android**
```bash
cd mobile-android
npm start            # Iniciar Expo
npm run android      # Ejecutar en Android
```

### **Desktop Windows**
```bash
cd desktop-windows
npm start            # Iniciar aplicación Electron
npm run build        # Build para Windows
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### **MongoDB no inicia**
**Problema:** Socket file con permisos incorrectos
```bash
# Solución 1: Remover socket file (requiere sudo)
sudo rm -f /tmp/mongodb-27017.sock
brew services restart mongodb-community@4.4

# Solución 2: Iniciar sin Unix socket
mongod --dbpath /usr/local/var/mongodb --bind_ip 127.0.0.1 --port 27017 --nounixsocket --logpath /usr/local/var/log/mongodb/mongo-no-socket.log --fork
```

### **Puerto 3001 en uso**
```bash
# Encontrar y matar proceso
lsof -ti:3001 | xargs kill -9
```

### **Verificar servicios**
```bash
# MongoDB
mongosh --eval "db.adminCommand('ping')"

# Backend
curl http://localhost:3001/api/health

# Ver procesos
ps aux | grep mongod
ps aux | grep node
```

---

## 📦 ESTRUCTURA DEL PROYECTO

```
selaiah-radio/
├── backend/                    # API Backend (Node.js + Express)
│   ├── controllers/           # Controladores (posts, social, messages)
│   ├── models/                # Modelos de Mongoose
│   ├── routes/                # Rutas de API
│   ├── middleware/            # Middleware de autenticación
│   ├── server.js              # Servidor principal
│   └── package.json
│
├── frontend-web/              # Frontend Web (React)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── mobile-android/            # App Móvil (React Native + Expo)
│   ├── src/
│   └── package.json
│
├── desktop-windows/           # App Desktop (Electron)
│   ├── src/
│   └── package.json
│
└── STATUS.md                  # Este archivo
```

---

## 🎯 PRÓXIMOS PASOS

### **Inmediatos**
1. ✅ Backend operacional con social features
2. ✅ MongoDB conectado
3. ⏳ Iniciar frontend web
4. ⏳ Probar integración completa

### **Desarrollo**
- [ ] Implementar Socket.IO para tiempo real
- [ ] Integrar OpenAI para chat de IA
- [ ] Configurar upload de archivos (multer)
- [ ] Implementar notificaciones push
- [ ] Configurar Firebase para móvil
- [ ] Integrar pasarelas de pago (Stripe/PayPal)

### **Testing**
- [ ] Crear tests unitarios
- [ ] Tests de integración
- [ ] Tests E2E

---

## 📞 SOPORTE

**Empresa:** iHostCast Ltd  
**Proyecto:** Selaiah Radio  
**Año:** 2025

---

## 🔐 SEGURIDAD

⚠️ **IMPORTANTE:** 
- Las claves API están en archivos `.env` (no versionados)
- Cambiar `SESSION_SECRET` en producción
- Configurar CORS apropiadamente para producción
- Habilitar HTTPS en producción
- Configurar rate limiting según necesidades

---

**Última actualización:** 21 de Octubre, 2025 - 10:24 PM
