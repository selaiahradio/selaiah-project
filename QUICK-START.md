# 🚀 SELAIAH RADIO - GUÍA DE INICIO RÁPIDO

**iHostCast Ltd © 2025**

---

## ⚡ INICIO RÁPIDO (1 Comando)

```bash
./start-dev.sh
```

Este script automáticamente:
- ✅ Verifica y inicia MongoDB
- ✅ Inicia el backend en puerto 3001
- ✅ Opcionalmente inicia el frontend en puerto 3000

Para detener todo:
```bash
./stop-dev.sh
```

---

## 🎯 INICIO MANUAL

### 1. **Iniciar MongoDB**

```bash
# Opción recomendada (sin Unix socket)
mongod --dbpath /usr/local/var/mongodb --bind_ip 127.0.0.1 --port 27017 --nounixsocket --logpath /usr/local/var/log/mongodb/mongo-no-socket.log --fork

# Verificar conexión
mongosh --eval "db.adminCommand('ping')"
```

### 2. **Iniciar Backend**

```bash
cd backend
npm run dev
```

El backend estará disponible en: **http://localhost:3001**

### 3. **Iniciar Frontend Web** (Opcional)

```bash
cd frontend-web
npm start
```

El frontend estará disponible en: **http://localhost:3000**

---

## 🧪 VERIFICAR QUE TODO FUNCIONA

### **Test rápido del Backend:**

```bash
# Health check
curl http://localhost:3001/api/health

# Info del servidor
curl http://localhost:3001/api/info

# Info del stream
curl http://localhost:3001/api/stream
```

**Respuesta esperada del health check:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-22T02:24:37.475Z",
  "database": "connected"
}
```

---

## 📱 APLICACIONES DISPONIBLES

### **1. Web Frontend** (React)
```bash
cd frontend-web
npm start
# Abre: http://localhost:3000
```

### **2. Mobile Android** (React Native + Expo)
```bash
cd mobile-android
npm start
# Escanea el QR con Expo Go
```

### **3. Desktop Windows** (Electron)
```bash
cd desktop-windows
npm start
# Se abre la aplicación de escritorio
```

---

## 🔑 FUNCIONALIDADES PRINCIPALES

### **✅ Sistema de Autenticación**
- Registro/Login local
- OAuth con Google
- OAuth con Facebook
- Gestión de sesiones

### **✅ Gestión de Contenido**
- Shows de radio
- Eventos
- Noticias (LocalNews y LastNews)
- Calendario

### **✅ Red Social** (NUEVO)
- Publicaciones (texto, imagen, audio, video)
- Likes y comentarios
- Sistema de seguimiento (follow/unfollow)
- Perfiles de usuario
- Búsqueda de usuarios

### **✅ Sistema de Mensajería** (NUEVO)
- Mensajes de texto
- Mensajes multimedia (imágenes, audio, video)
- Notas de voz
- Videollamadas
- Reacciones a mensajes
- Indicadores de escritura
- Estado de lectura

### **✅ Chat con IA**
- Pedir canciones
- Interacción con la radio
- (Requiere autenticación)

### **✅ Streaming de Radio**
- Stream URL: https://c34.radioboss.fm:8888/stream
- Formato: MP3 128kbps

---

## 📚 DOCUMENTACIÓN COMPLETA

Para más detalles, consulta:

- **[STATUS.md](./STATUS.md)** - Estado actual del proyecto y todos los endpoints
- **[RED-SOCIAL-COMPLETA.md](./RED-SOCIAL-COMPLETA.md)** - Documentación de la red social
- **[INTEGRACION-DESKTOP-WINDOWS.md](./INTEGRACION-DESKTOP-WINDOWS.md)** - Integración desktop
- **[PROYECTO-FINAL-COMPLETO.md](./PROYECTO-FINAL-COMPLETO.md)** - Resumen completo del proyecto

---

## 🐛 SOLUCIÓN DE PROBLEMAS COMUNES

### **MongoDB no inicia**
```bash
# Remover socket file problemático (requiere sudo)
sudo rm -f /tmp/mongodb-27017.sock

# O iniciar sin Unix socket
mongod --dbpath /usr/local/var/mongodb --bind_ip 127.0.0.1 --port 27017 --nounixsocket --logpath /usr/local/var/log/mongodb/mongo-no-socket.log --fork
```

### **Puerto ocupado**
```bash
# Backend (puerto 3001)
lsof -ti:3001 | xargs kill -9

# Frontend (puerto 3000)
lsof -ti:3000 | xargs kill -9
```

### **Dependencias faltantes**
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend-web && npm install

# Mobile
cd mobile-android && npm install

# Desktop
cd desktop-windows && npm install
```

---

## 🎨 ESTRUCTURA DE CARPETAS

```
selaiah-radio/
├── backend/              # API Backend (Node.js + Express)
├── frontend-web/         # Frontend Web (React)
├── mobile-android/       # App Móvil (React Native)
├── desktop-windows/      # App Desktop (Electron)
├── logs/                 # Logs de desarrollo
├── start-dev.sh          # Script de inicio
├── stop-dev.sh           # Script de detención
├── STATUS.md             # Estado del proyecto
└── QUICK-START.md        # Esta guía
```

---

## 🔐 VARIABLES DE ENTORNO

### **Backend (.env)**
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/selaiah
SESSION_SECRET=tu-secreto-aqui
RADIOBOSS_URL=https://c34.radioboss.fm:8888/stream
FRONTEND_URL=http://localhost:3000

# OAuth (opcional)
GOOGLE_CLIENT_ID=tu-client-id
GOOGLE_CLIENT_SECRET=tu-client-secret
FACEBOOK_APP_ID=tu-app-id
FACEBOOK_APP_SECRET=tu-app-secret
```

### **Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STREAM_URL=https://c34.radioboss.fm:8888/stream
```

---

## 📞 SOPORTE

**Empresa:** iHostCast Ltd  
**Proyecto:** Selaiah Radio  
**Año:** 2025

---

## ✨ PRÓXIMOS PASOS

1. ✅ Backend con social features - **COMPLETADO**
2. ✅ MongoDB operacional - **COMPLETADO**
3. ⏳ Iniciar frontend y probar integración
4. ⏳ Implementar Socket.IO para tiempo real
5. ⏳ Configurar upload de archivos
6. ⏳ Integrar OpenAI para chat de IA
7. ⏳ Configurar notificaciones push
8. ⏳ Integrar pasarelas de pago

---

**¡Listo para desarrollar! 🚀**
