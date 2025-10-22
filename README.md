# 🎵 Selaiah Radio
## Tu Radio Cristiana 24/7 - Proyecto Completo

**Selaiah Radio Online LLC © 2025**

---

## 📋 Descripción

Selaiah Radio es una plataforma completa de radio cristiana que incluye:
- 📻 Streaming en vivo 24/7
- 🤖 Chat con IA para peticiones de canciones
- 📅 Calendario de shows y eventos
- 📰 Sistema de noticias (LocalNews y LastNews)
- 🔔 Notificaciones push
- 💳 Sistema de pagos (donaciones)
- 👥 Gestión de usuarios y autenticación

---

## 🏗️ Estructura del Proyecto

```
selaiah-radio/
├── backend/              # Servidor Node.js + Express + MongoDB
├── frontend-web/         # Aplicación Web React
├── mobile-android/       # App Android (React Native)
├── mobile-ios/          # App iOS (React Native) - En desarrollo
└── desktop-windows/     # App Windows (Electron) - En desarrollo
```

---

## 🚀 Inicio Rápido

### 1. Backend (Servidor)

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor
npm run dev
```

El servidor estará en: `http://localhost:3001`

### 2. Frontend Web

```bash
cd frontend-web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus URLs

# Iniciar aplicación
npm start
```

La app web estará en: `http://localhost:3000`

### 3. App Android

```bash
cd mobile-android

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm start

# Escanear QR con Expo Go en tu teléfono Android
```

---

## 📦 Requisitos Previos

### Software Necesario

- **Node.js** v18 o superior
- **npm** v9 o superior
- **MongoDB** (Atlas o local)
- **Git**

### Cuentas de Servicios Externos

- [ ] MongoDB Atlas - Base de datos
- [ ] OpenAI - Chat con IA
- [ ] Stripe - Pagos
- [ ] Firebase - Notificaciones push
- [ ] SendGrid - Emails
- [ ] Google Cloud - OAuth y Maps

---

## ⚙️ Configuración

### Backend (.env)

Variables mínimas requeridas:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/selaiah
SESSION_SECRET=tu_secret_key_muy_seguro
PORT=3001
FRONTEND_URL=http://localhost:3000
```

Variables opcionales (para funcionalidades completas):

```env
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
FIREBASE_PROJECT_ID=selaiah-radio
SENDGRID_API_KEY=SG...
GOOGLE_CLIENT_ID=...
```

### Frontend Web (.env)

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STREAM_URL=https://c34.radioboss.fm:8888/stream
```

---

## 🎯 Funcionalidades

### ✅ Implementadas

- [x] Servidor backend con Express
- [x] Conexión a MongoDB
- [x] API REST completa
- [x] Frontend web con React
- [x] Reproductor de streaming
- [x] Chat con IA (placeholder)
- [x] Sistema de shows
- [x] Sistema de eventos
- [x] Sistema de noticias
- [x] Diseño responsive
- [x] App Android base

### 🔄 En Desarrollo

- [ ] Autenticación completa (Google, Facebook, Apple)
- [ ] Integración OpenAI funcional
- [ ] Sistema de pagos Stripe
- [ ] Notificaciones push Firebase
- [ ] App iOS
- [ ] App Windows Desktop
- [ ] Panel de administración
- [ ] Sistema de usuarios completo

---

## 📚 API Endpoints

### Información del Servidor

```bash
GET /api/health          # Estado del servidor
GET /api/info            # Información del API
GET /api/stream          # URL del streaming
```

### Usuarios

```bash
GET  /api/users          # Listar usuarios
POST /api/users          # Crear usuario
```

### Shows

```bash
GET  /api/shows          # Listar shows
POST /api/shows          # Crear show
```

### Eventos

```bash
GET  /api/events         # Listar eventos
POST /api/events         # Crear evento
```

### Noticias

```bash
GET  /api/news           # Listar noticias
POST /api/news           # Crear noticia
```

### Chat IA

```bash
POST /api/ai/chat        # Enviar mensaje al chat
```

---

## 🧪 Pruebas

### Probar Backend

```bash
# Health check
curl http://localhost:3001/api/health

# Info del servidor
curl http://localhost:3001/api/info

# Crear usuario de prueba
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@radio.com","name":"Usuario Test","role":"user"}'
```

### Probar Frontend

1. Abrir `http://localhost:3000`
2. Hacer clic en Play para reproducir streaming
3. Abrir chat con IA (botón inferior derecho)
4. Navegar entre tabs: Shows, Eventos, Noticias

---

## 🔧 Scripts Disponibles

### Backend

```bash
npm start        # Iniciar en producción
npm run dev      # Iniciar en desarrollo (nodemon)
npm run verify   # Verificar configuración
```

### Frontend Web

```bash
npm start        # Iniciar desarrollo
npm run build    # Compilar para producción
npm test         # Ejecutar tests
```

### Mobile Android

```bash
npm start        # Iniciar Expo
npm run android  # Ejecutar en Android
npm run build    # Compilar APK
```

---

## 🐛 Solución de Problemas

### Error: EADDRINUSE (Puerto en uso)

```bash
# Matar proceso en puerto 3001
lsof -ti:3001 | xargs kill -9
```

### Error: MongoDB connection failed

1. Verificar string de conexión en `.env`
2. Verificar IP whitelist en MongoDB Atlas
3. Verificar firewall

### Error: CORS en API

Verificar que `FRONTEND_URL` en backend/.env coincida con la URL del frontend.

---

## 📱 Apps Móviles

### Android

La app Android está lista para desarrollo. Usa Expo Go para probar.

### iOS (En desarrollo)

Estructura preparada. Requiere:
- Mac con Xcode 14+
- Cuenta Apple Developer
- CocoaPods instalado

### Windows (En desarrollo)

Estructura preparada. Requiere:
- Windows 10/11
- Node.js
- Electron

---

## 🚀 Despliegue

### Backend

**Opciones recomendadas:**
- Railway (https://railway.app)
- Render (https://render.com)
- Heroku
- DigitalOcean

### Frontend Web

**Opciones recomendadas:**
- Vercel (https://vercel.com)
- Netlify (https://netlify.com)
- GitHub Pages

### Base de Datos

**Recomendado:**
- MongoDB Atlas (https://mongodb.com/cloud/atlas)

---

## 📖 Documentación Adicional

### Tecnologías Utilizadas

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Passport.js (autenticación)
- OpenAI API
- Stripe API
- Firebase Admin SDK

**Frontend Web:**
- React 19
- Axios
- Lucide React (iconos)
- TailwindCSS

**Mobile:**
- React Native
- Expo

---

## 🤝 Contribuir

Este es un proyecto privado de Selaiah Radio Online LLC.

---

## 📄 Licencia

Proprietary - © 2025 Selaiah Radio Online LLC. Todos los derechos reservados.

---

## 📞 Soporte

- **Email:** selaiahradio@gmail.com
- **Web:** https://selaiah.com (próximamente)
- **Proyecto:** Selaiah Radio

---

## 🎉 Estado del Proyecto

**Versión:** 1.0.0  
**Estado:** En Desarrollo Activo  
**Última Actualización:** Octubre 2025

---

**¡Gracias por usar Selaiah Radio!** 🎵📻
