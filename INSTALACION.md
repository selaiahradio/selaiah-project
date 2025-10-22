# 🚀 GUÍA DE INSTALACIÓN PASO A PASO
## Selaiah Radio - Proyecto Completo

**iHostCast Ltd © 2025**

---

## 📋 ÍNDICE

1. [Verificar Requisitos](#1-verificar-requisitos)
2. [Configurar MongoDB](#2-configurar-mongodb)
3. [Instalar Backend](#3-instalar-backend)
4. [Instalar Frontend Web](#4-instalar-frontend-web)
5. [Probar el Sistema](#5-probar-el-sistema)
6. [Configurar Servicios Opcionales](#6-configurar-servicios-opcionales)
7. [Solución de Problemas](#7-solución-de-problemas)

---

## 1. VERIFICAR REQUISITOS

### Verificar instalaciones

```bash
# Node.js (debe ser v18 o superior)
node --version

# npm
npm --version

# Git
git --version
```

### Si falta algo, instalar:

**macOS:**
```bash
# Instalar Homebrew (si no está instalado)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node

# Instalar Git
brew install git
```

**Windows:**
- Descargar Node.js: https://nodejs.org
- Descargar Git: https://git-scm.com

---

## 2. CONFIGURAR MONGODB

### Opción A: MongoDB Atlas (Recomendado - Gratis)

1. **Crear cuenta:**
   - Ir a: https://www.mongodb.com/cloud/atlas
   - Hacer clic en "Try Free"
   - Registrarse con email

2. **Crear cluster:**
   - Seleccionar plan "M0 Free"
   - Elegir región más cercana
   - Hacer clic en "Create Cluster"

3. **Configurar acceso:**
   - Database Access → Add New Database User
   - Username: `selaiah_admin`
   - Password: (generar uno seguro)
   - Database User Privileges: "Atlas admin"
   - Add User

4. **Configurar red:**
   - Network Access → Add IP Address
   - Seleccionar "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Obtener connection string:**
   - Clusters → Connect
   - Connect your application
   - Copiar el string (se ve así):
   ```
   mongodb+srv://selaiah_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Reemplazar `<password>` con tu contraseña

### Opción B: MongoDB Local

```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Ubuntu/Debian
sudo apt install mongodb

# Connection string será:
mongodb://localhost:27017/selaiah
```

---

## 3. INSTALAR BACKEND

### Paso 1: Navegar a la carpeta

```bash
cd /Users/odgmusic/Selaiah-project/selaiah-radio/backend
```

### Paso 2: Verificar dependencias

```bash
# Ver si package.json existe
cat package.json

# Si ya están instaladas las dependencias
ls node_modules
```

### Paso 3: Instalar (si es necesario)

```bash
npm install
```

### Paso 4: Configurar variables de entorno

```bash
# Copiar ejemplo
cp .env.example .env

# Editar archivo .env
nano .env
# o usar tu editor favorito
```

**Configuración MÍNIMA en .env:**

```env
# MongoDB (usar tu connection string de Atlas)
MONGODB_URI=mongodb+srv://selaiah_admin:TU_PASSWORD@cluster0.xxxxx.mongodb.net/selaiah?retryWrites=true&w=majority

# Seguridad (generar uno aleatorio)
SESSION_SECRET=mi_secreto_super_seguro_cambiar_en_produccion

# Puerto
PORT=3001

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Entorno
NODE_ENV=development

# Stream URL (ya configurado)
STREAM_URL=https://c34.radioboss.fm:8888/stream
```

### Paso 5: Iniciar servidor

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Deberías ver:
# ✅ Conectado a MongoDB
# 📊 Base de datos: selaiah
# 🚀 SELAIAH RADIO - SERVIDOR INICIADO
# 📡 Servidor: http://localhost:3001
```

**¡Dejar esta terminal abierta!**

---

## 4. INSTALAR FRONTEND WEB

### Paso 1: Abrir NUEVA terminal

```bash
# Navegar a frontend
cd /Users/odgmusic/Selaiah-project/selaiah-radio/frontend-web
```

### Paso 2: Verificar dependencias

```bash
# Ver package.json
cat package.json

# Verificar si están instaladas
ls node_modules
```

### Paso 3: Instalar (si es necesario)

```bash
npm install
```

### Paso 4: Configurar variables de entorno

```bash
# Copiar ejemplo
cp .env.example .env

# Editar
nano .env
```

**Contenido de .env:**

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STREAM_URL=https://c34.radioboss.fm:8888/stream
```

### Paso 5: Iniciar aplicación

```bash
npm start

# Deberías ver:
# Compiled successfully!
# You can now view selaiah-frontend in the browser.
# Local: http://localhost:3000
```

**Se abrirá automáticamente en tu navegador**

---

## 5. PROBAR EL SISTEMA

### ✅ Checklist de Pruebas

1. **Backend funcionando:**
   ```bash
   curl http://localhost:3001/api/health
   
   # Debería responder:
   # {"status":"ok","message":"Selaiah Radio API está funcionando",...}
   ```

2. **Frontend cargando:**
   - Abrir: http://localhost:3000
   - Deberías ver "Selaiah Radio" con diseño azul/púrpura

3. **Streaming funcionando:**
   - Hacer clic en el botón PLAY (▶️)
   - Debería reproducir audio

4. **Chat con IA:**
   - Hacer clic en el botón de chat (esquina inferior derecha)
   - Escribir un mensaje
   - Debería responder (aunque sea placeholder)

5. **Navegación:**
   - Hacer clic en "Shows" → debería mostrar "No hay shows disponibles"
   - Hacer clic en "Eventos" → debería mostrar "No hay eventos próximos"
   - Hacer clic en "Noticias" → debería mostrar "No hay noticias disponibles"

### 🎉 Si todo funciona:

**¡FELICIDADES! El sistema básico está funcionando.**

---

## 6. CONFIGURAR SERVICIOS OPCIONALES

Estos servicios son opcionales pero necesarios para funcionalidades completas:

### OpenAI (Chat con IA)

1. Ir a: https://platform.openai.com/signup
2. Crear cuenta
3. API Keys → Create new secret key
4. Copiar la key (empieza con `sk-...`)
5. Agregar a `backend/.env`:
   ```env
   OPENAI_API_KEY=sk-tu-key-aqui
   OPENAI_MODEL=gpt-4-turbo-preview
   ```
6. Reiniciar backend

### Stripe (Pagos/Donaciones)

1. Ir a: https://dashboard.stripe.com/register
2. Crear cuenta
3. Developers → API Keys
4. Copiar "Secret key" y "Publishable key"
5. Agregar a `backend/.env`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
6. Agregar a `frontend-web/.env`:
   ```env
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

### Firebase (Notificaciones Push)

1. Ir a: https://console.firebase.google.com
2. Crear proyecto "Selaiah Radio"
3. Project Settings → Service Accounts
4. Generate new private key (descarga JSON)
5. Copiar valores al `backend/.env`:
   ```env
   FIREBASE_PROJECT_ID=selaiah-radio
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@selaiah-radio.iam.gserviceaccount.com
   ```

### SendGrid (Emails)

1. Ir a: https://signup.sendgrid.com
2. Crear cuenta
3. Settings → API Keys → Create API Key
4. Copiar key
5. Agregar a `backend/.env`:
   ```env
   SENDGRID_API_KEY=SG.xxxxx
   SENDGRID_FROM_EMAIL=noreply@tudominio.com
   SENDGRID_FROM_NAME=Selaiah Radio
   ```

---

## 7. SOLUCIÓN DE PROBLEMAS

### ❌ Error: "EADDRINUSE: address already in use"

**Problema:** El puerto 3001 o 3000 ya está en uso.

**Solución:**
```bash
# Matar proceso en puerto 3001
lsof -ti:3001 | xargs kill -9

# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9
```

### ❌ Error: "MongoDB connection failed"

**Problema:** No puede conectar a MongoDB.

**Soluciones:**
1. Verificar que `MONGODB_URI` en `.env` es correcto
2. Verificar que reemplazaste `<password>` con tu contraseña real
3. En MongoDB Atlas: Network Access → verificar que 0.0.0.0/0 está permitido
4. Verificar conexión a internet

### ❌ Error: "Cannot find module 'express'"

**Problema:** Dependencias no instaladas.

**Solución:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### ❌ Error: CORS en el navegador

**Problema:** Frontend no puede conectar con backend.

**Solución:**
1. Verificar que backend está corriendo en puerto 3001
2. Verificar que `FRONTEND_URL` en `backend/.env` es `http://localhost:3000`
3. Reiniciar ambos servidores

### ❌ El streaming no reproduce

**Problema:** URL del stream incorrecta o bloqueada.

**Soluciones:**
1. Verificar que `STREAM_URL` es correcto
2. Probar la URL directamente en el navegador
3. Verificar que no hay bloqueador de anuncios activo
4. Probar con otro navegador

### ❌ Chat con IA no responde

**Problema:** OpenAI no configurado.

**Solución:**
- El chat funcionará con respuestas placeholder sin OpenAI
- Para respuestas reales, configurar `OPENAI_API_KEY` en `.env`

---

## 📞 OBTENER AYUDA

Si sigues teniendo problemas:

1. **Revisar logs:**
   - Terminal del backend: errores en rojo
   - Terminal del frontend: errores de compilación
   - Consola del navegador (F12): errores de JavaScript

2. **Verificar archivos:**
   ```bash
   # Backend
   cat backend/.env
   cat backend/package.json
   
   # Frontend
   cat frontend-web/.env
   cat frontend-web/package.json
   ```

3. **Contactar soporte:**
   - Email: support@ihostcast.com
   - Incluir: logs de error, sistema operativo, versiones de Node/npm

---

## 🎯 PRÓXIMOS PASOS

Una vez que todo funciona:

1. **Agregar datos de prueba:**
   ```bash
   # Crear show de prueba
   curl -X POST http://localhost:3001/api/shows \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Alabanza Matutina",
       "description": "Música cristiana para empezar el día",
       "host": "Pastor Juan",
       "schedule": {
         "dayOfWeek": 1,
         "startTime": "06:00",
         "endTime": "08:00"
       }
     }'
   ```

2. **Configurar servicios externos** (ver sección 6)

3. **Personalizar diseño** (colores, logos, etc.)

4. **Preparar para producción** (ver README.md sección Despliegue)

---

## ✅ RESUMEN

**Para iniciar el proyecto cada vez:**

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend-web
npm start
```

**URLs importantes:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/api/health

---

**¡Listo! Tu radio está funcionando.** 🎵📻

**iHostCast Ltd © 2025**
