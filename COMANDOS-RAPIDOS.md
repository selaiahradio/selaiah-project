# ⚡ COMANDOS RÁPIDOS
## Selaiah Radio - Referencia Rápida

---

## 🚀 INICIO RÁPIDO

### Iniciar Todo el Sistema

```bash
# Terminal 1: Backend
cd /Users/odgmusic/Selaiah-project/selaiah-radio/backend
npm run dev

# Terminal 2: Frontend (nueva terminal)
cd /Users/odgmusic/Selaiah-project/selaiah-radio/frontend-web
npm start
```

---

## 🔧 BACKEND

### Navegación
```bash
cd /Users/odgmusic/Selaiah-project/selaiah-radio/backend
```

### Comandos
```bash
# Instalar dependencias
npm install

# Verificar configuración
npm run verify

# Iniciar en desarrollo
npm run dev

# Iniciar en producción
npm start
```

### Probar API
```bash
# Health check
curl http://localhost:3001/api/health

# Info del servidor
curl http://localhost:3001/api/info

# Listar usuarios
curl http://localhost:3001/api/users

# Listar shows
curl http://localhost:3001/api/shows

# Listar eventos
curl http://localhost:3001/api/events

# Listar noticias
curl http://localhost:3001/api/news

# Info del stream
curl http://localhost:3001/api/stream
```

### Crear Datos de Prueba
```bash
# Crear usuario
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@radio.com","name":"Usuario Test","role":"user"}'

# Crear show
curl -X POST http://localhost:3001/api/shows \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Alabanza Matutina",
    "description":"Música cristiana para empezar el día",
    "host":"Pastor Juan",
    "schedule":{"dayOfWeek":1,"startTime":"06:00","endTime":"08:00"}
  }'

# Crear evento
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Concierto de Alabanza",
    "description":"Gran noche de adoración",
    "date":"2025-02-15T19:00:00Z",
    "location":"Iglesia Central"
  }'

# Crear noticia
curl -X POST http://localhost:3001/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Nueva Programación 2025",
    "content":"Estamos emocionados de anunciar nuestra nueva programación para este año.",
    "category":"general",
    "author":"Equipo Selaiah"
  }'
```

---

## 🌐 FRONTEND

### Navegación
```bash
cd /Users/odgmusic/Selaiah-project/selaiah-radio/frontend-web
```

### Comandos
```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test
```

### URLs
- **Desarrollo:** http://localhost:3000
- **API Backend:** http://localhost:3001

---

## 📱 MOBILE ANDROID

### Navegación
```bash
cd /Users/odgmusic/Selaiah-project/selaiah-radio/mobile-android
```

### Comandos
```bash
# Instalar dependencias
npm install

# Iniciar Expo
npm start

# Ejecutar en Android
npm run android

# Compilar APK
expo build:android
```

---

## 🛠️ UTILIDADES

### Limpiar Proyecto
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend-web
rm -rf node_modules package-lock.json
npm install
```

### Matar Procesos
```bash
# Matar proceso en puerto 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Matar proceso en puerto 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Matar todos los procesos de Node
pkill -f node
```

### Ver Logs
```bash
# Ver procesos de Node corriendo
ps aux | grep node

# Ver puertos en uso
lsof -i -P | grep LISTEN

# Ver uso de puerto específico
lsof -i:3001
```

---

## 🗄️ MONGODB

### Comandos Útiles
```bash
# Conectar a MongoDB local
mongosh

# Conectar a MongoDB Atlas
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/selaiah" --username usuario

# Ver bases de datos
show dbs

# Usar base de datos
use selaiah

# Ver colecciones
show collections

# Ver usuarios
db.users.find()

# Ver shows
db.shows.find()

# Limpiar colección
db.users.deleteMany({})
```

---

## 🔍 DEBUGGING

### Ver Variables de Entorno
```bash
# Backend
cat backend/.env

# Frontend
cat frontend-web/.env
```

### Verificar Instalaciones
```bash
# Node.js
node --version

# npm
npm --version

# Git
git --version

# MongoDB (local)
mongod --version
```

### Logs del Sistema
```bash
# Ver logs del backend (si está corriendo)
# Los logs aparecen en la terminal donde ejecutaste npm run dev

# Ver logs del navegador
# Abrir DevTools (F12) → Console
```

---

## 📦 GIT

### Comandos Básicos
```bash
# Ver estado
git status

# Ver cambios
git diff

# Agregar archivos
git add .

# Commit
git commit -m "Descripción del cambio"

# Push
git push origin main

# Pull
git pull origin main

# Ver historial
git log --oneline
```

### Ignorar Archivos
```bash
# Verificar .gitignore
cat .gitignore

# Debería incluir:
# node_modules/
# .env
# .DS_Store
# *.log
# dist/
# build/
```

---

## 🚀 DESPLIEGUE

### Backend (Railway)
```bash
# Instalar CLI
npm install -g @railway/cli

# Login
railway login

# Iniciar proyecto
railway init

# Deploy
railway up
```

### Frontend (Vercel)
```bash
# Instalar CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend-web
vercel
```

---

## 🧪 TESTING

### Probar Conexión Backend-Frontend
```bash
# 1. Iniciar backend
cd backend && npm run dev

# 2. En otra terminal, probar API
curl http://localhost:3001/api/health

# 3. Iniciar frontend
cd frontend-web && npm start

# 4. Abrir navegador en http://localhost:3000
# 5. Abrir DevTools (F12) → Network
# 6. Hacer clic en Play
# 7. Verificar que aparezcan requests a localhost:3001
```

---

## 📊 MONITOREO

### Ver Uso de Recursos
```bash
# CPU y Memoria
top

# Procesos de Node
ps aux | grep node

# Espacio en disco
df -h

# Uso de memoria
free -h  # Linux
vm_stat  # macOS
```

---

## 🔐 SEGURIDAD

### Generar SESSION_SECRET
```bash
# Generar secret aleatorio
openssl rand -base64 32

# Copiar el resultado a .env:
# SESSION_SECRET=resultado_aqui
```

### Verificar Permisos
```bash
# Ver permisos de .env
ls -la backend/.env

# Debería ser: -rw-------
# Si no, cambiar:
chmod 600 backend/.env
```

---

## 💾 BACKUP

### Backup de MongoDB
```bash
# Exportar base de datos
mongodump --uri="mongodb+srv://usuario:password@cluster.mongodb.net/selaiah" --out=backup

# Importar base de datos
mongorestore --uri="mongodb+srv://usuario:password@cluster.mongodb.net/selaiah" backup/selaiah
```

### Backup de Código
```bash
# Crear backup
tar -czf selaiah-backup-$(date +%Y%m%d).tar.gz selaiah-radio/

# Restaurar backup
tar -xzf selaiah-backup-20250121.tar.gz
```

---

## 📞 AYUDA RÁPIDA

### Problemas Comunes

**Error: Puerto en uso**
```bash
lsof -ti:3001 | xargs kill -9
```

**Error: MongoDB no conecta**
```bash
# Verificar .env
cat backend/.env | grep MONGODB_URI
```

**Error: Módulos no encontrados**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Error: CORS**
```bash
# Verificar que FRONTEND_URL en backend/.env sea:
# FRONTEND_URL=http://localhost:3000
```

---

## 🎯 ATAJOS

### Alias Útiles (Agregar a ~/.zshrc o ~/.bashrc)
```bash
# Agregar al archivo de configuración de tu shell
alias selaiah-backend="cd /Users/odgmusic/Selaiah-project/selaiah-radio/backend && npm run dev"
alias selaiah-frontend="cd /Users/odgmusic/Selaiah-project/selaiah-radio/frontend-web && npm start"
alias selaiah-test="curl http://localhost:3001/api/health"

# Recargar configuración
source ~/.zshrc  # o source ~/.bashrc
```

---

## 📚 REFERENCIAS RÁPIDAS

### URLs Importantes
- **Frontend Dev:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Health:** http://localhost:3001/api/health
- **API Info:** http://localhost:3001/api/info
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Vercel:** https://vercel.com
- **Railway:** https://railway.app

### Documentación
- **README.md** - Información general
- **INSTALACION.md** - Guía de instalación
- **ESTADO-PROYECTO.md** - Estado actual
- **Este archivo** - Comandos rápidos

---

**iHostCast Ltd © 2025**
