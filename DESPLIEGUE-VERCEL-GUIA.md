# 🚀 GUÍA COMPLETA DE DESPLIEGUE EN VERCEL

**Selaiah Radio Online LLC**  
**Fecha:** 22 de Octubre, 2025 - 3:24 AM

---

## ✅ ESTADO ACTUAL DEL PROYECTO

### **Frontend Listo:**
- ✅ Logo personalizado con "S" de Selaiah
- ✅ Sistema de autenticación (Login/Registro)
- ✅ Reproductor de radio funcional
- ✅ Salmos del día con carrusel automático
- ✅ Sistema de donaciones con PayPal
- ✅ Formulario de suscripción
- ✅ Banner de próximo lanzamiento
- ✅ Lista de funcionalidades futuras
- ✅ Footer con copyright completo
- ✅ Meta tags SEO optimizados
- ✅ PWA ready

### **Archivos de Configuración:**
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `.vercelignore` - Archivos a ignorar
- ✅ `.env.example` - Variables de entorno de ejemplo
- ✅ `package.json` - Scripts de build configurados

---

## 📋 PASOS PARA DESPLEGAR

### **OPCIÓN 1: Despliegue desde la Web (Recomendado)**

#### **Paso 1: Preparar el Repositorio**

1. **Asegúrate de que todo esté commiteado:**
   ```bash
   cd /Users/odgmusic/Selaiah-project/selaiah-radio
   git status
   git add .
   git commit -m "feat: Preparar para despliegue en Vercel - Frontend completo"
   git push origin main
   ```

#### **Paso 2: Crear Cuenta en Vercel**

1. Ve a https://vercel.com
2. Click en "Sign Up"
3. Conecta con tu cuenta de GitHub
4. Autoriza Vercel para acceder a tus repositorios

#### **Paso 3: Importar Proyecto**

1. En el dashboard de Vercel, click en "Add New Project"
2. Busca y selecciona el repositorio `selaiah-radio`
3. Click en "Import"

#### **Paso 4: Configurar el Proyecto**

```
Framework Preset: Create React App
Root Directory: frontend-web
Build Command: npm run build
Output Directory: build
Install Command: npm install
Node.js Version: 18.x
```

#### **Paso 5: Configurar Variables de Entorno**

En la sección "Environment Variables", agrega:

```env
# IMPORTANTE: Estas son las variables MÍNIMAS necesarias
REACT_APP_API_URL=https://tu-backend-api.com
REACT_APP_SOCKET_URL=https://tu-backend-api.com
REACT_APP_STREAM_URL=https://c34.radioboss.fm:8888/stream
REACT_APP_ENV=production
```

**Nota:** Por ahora, puedes usar valores temporales para el backend:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SOCKET_URL=http://localhost:3001
```

#### **Paso 6: Deploy**

1. Click en "Deploy"
2. Espera 2-3 minutos mientras Vercel construye tu proyecto
3. ¡Listo! Tu sitio estará en: `https://tu-proyecto.vercel.app`

---

### **OPCIÓN 2: Despliegue desde CLI**

#### **Paso 1: Instalar Vercel CLI**

```bash
npm install -g vercel
```

#### **Paso 2: Login**

```bash
vercel login
```

#### **Paso 3: Navegar al Directorio**

```bash
cd /Users/odgmusic/Selaiah-project/selaiah-radio/frontend-web
```

#### **Paso 4: Deploy**

```bash
# Deploy de prueba
vercel

# Deploy a producción
vercel --prod
```

#### **Paso 5: Configurar Variables de Entorno**

```bash
# Agregar variables una por una
vercel env add REACT_APP_API_URL production
vercel env add REACT_APP_SOCKET_URL production
vercel env add REACT_APP_STREAM_URL production
vercel env add REACT_APP_ENV production
```

---

## 🔧 CONFIGURACIÓN DETALLADA

### **Variables de Entorno Necesarias:**

#### **Mínimas (Para que funcione básicamente):**
```env
REACT_APP_API_URL=https://tu-backend.com
REACT_APP_SOCKET_URL=https://tu-backend.com
REACT_APP_STREAM_URL=https://c34.radioboss.fm:8888/stream
REACT_APP_ENV=production
```

#### **Opcionales (Para funcionalidades futuras):**
```env
# Stripe (Donaciones futuras)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# Google Maps (Eventos/Ubicación)
REACT_APP_GOOGLE_MAPS_KEY=AIzaSyxxxxx

# Firebase (Notificaciones Push)
REACT_APP_FIREBASE_API_KEY=AIzaSyxxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=selaiah-radio.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=selaiah-radio
REACT_APP_FIREBASE_STORAGE_BUCKET=selaiah-radio.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxx
```

---

## 🗄️ BACKEND EN PRODUCCIÓN

### **Opciones para el Backend:**

#### **Opción 1: Railway (Recomendado)**

1. **Crear cuenta en Railway:**
   - Ve a https://railway.app
   - Conecta con GitHub

2. **Crear nuevo proyecto:**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Elige `selaiah-radio`

3. **Configurar:**
   ```
   Root Directory: backend
   Start Command: npm start
   ```

4. **Variables de entorno:**
   ```env
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/selaiah
   SESSION_SECRET=tu-secreto-super-seguro-aqui
   JWT_SECRET=otro-secreto-diferente-aqui
   FRONTEND_URL=https://tu-proyecto.vercel.app
   ```

5. **Obtener URL:**
   - Railway te dará una URL como: `https://tu-proyecto.up.railway.app`
   - Usa esta URL en las variables de entorno del frontend

#### **Opción 2: Render**

1. Ve a https://render.com
2. Conecta GitHub
3. Crea "Web Service"
4. Configura:
   ```
   Build Command: npm install
   Start Command: npm start
   ```

#### **Opción 3: Heroku**

```bash
# Instalar Heroku CLI
brew install heroku

# Login
heroku login

# Crear app
cd backend
heroku create selaiah-radio-api

# Configurar variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://...

# Deploy
git push heroku main
```

---

## 🗄️ BASE DE DATOS (MongoDB Atlas)

### **Configurar MongoDB en la Nube:**

#### **Paso 1: Crear Cuenta**
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea cuenta gratuita
3. Crea un cluster (Free Tier)

#### **Paso 2: Configurar Acceso**
1. **Database Access:**
   - Crea usuario: `selaiah_admin`
   - Password: (genera uno seguro)
   - Rol: `readWrite`

2. **Network Access:**
   - Click "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
   - (En producción, limita a IPs específicas)

#### **Paso 3: Obtener Connection String**
1. Click en "Connect"
2. Selecciona "Connect your application"
3. Copia la URL:
   ```
   mongodb+srv://selaiah_admin:<password>@cluster0.xxxxx.mongodb.net/selaiah?retryWrites=true&w=majority
   ```
4. Reemplaza `<password>` con tu password
5. Usa esta URL en `MONGODB_URI`

---

## 🔐 SEGURIDAD EN PRODUCCIÓN

### **Secretos a Generar:**

```bash
# Generar SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generar JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### **CORS en Backend:**

Actualiza `server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://tu-proyecto.vercel.app',
    'https://selaiah-radio.com' // Si tienes dominio custom
  ],
  credentials: true
}));
```

---

## 🌐 DOMINIO PERSONALIZADO (Opcional)

### **Configurar Dominio Custom:**

#### **En Vercel:**
1. Ve a "Settings" > "Domains"
2. Click "Add Domain"
3. Ingresa tu dominio: `selaiah.com`

#### **En tu Proveedor de DNS:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### **SSL:**
- Vercel configura SSL automáticamente
- Tu sitio será accesible en `https://selaiah.com`

---

## 📊 CHECKLIST PRE-DEPLOY

### **Frontend:**
- [x] Código compilando sin errores
- [x] Logo personalizado
- [x] Meta tags configurados
- [x] PWA manifest actualizado
- [x] Variables de entorno configuradas
- [x] vercel.json creado
- [x] .vercelignore creado
- [x] Build local exitoso

### **Backend (Pendiente):**
- [ ] Backend desplegado en Railway/Render/Heroku
- [ ] MongoDB Atlas configurado
- [ ] Variables de entorno en producción
- [ ] CORS configurado para Vercel
- [ ] URL del backend obtenida

### **Integración:**
- [ ] Variables de entorno del frontend actualizadas con URL del backend
- [ ] Probar login/registro en producción
- [ ] Probar reproductor de radio
- [ ] Probar donaciones con PayPal
- [ ] Probar suscripción

---

## 🧪 TESTING POST-DEPLOY

### **Verificaciones Básicas:**

1. **Página carga correctamente:**
   ```
   https://tu-proyecto.vercel.app
   ```

2. **Logo visible:**
   - Pestaña del navegador
   - Reproductor de radio

3. **Funcionalidades públicas:**
   - Reproductor de radio (puede no funcionar sin backend)
   - Salmos del día
   - Banner de lanzamiento
   - Formulario de suscripción
   - Botón de donación

4. **Navegación:**
   - Login (/login)
   - Registro (/register)
   - Home (/)

5. **Meta tags:**
   - Compartir en Facebook/Twitter
   - Verificar que aparezca logo y descripción

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### **Build Falla:**

```bash
# Limpiar cache local
cd frontend-web
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### **Variables de Entorno no Funcionan:**

- Asegúrate de que empiecen con `REACT_APP_`
- Redeploy después de agregar variables
- Verifica que estén en el ambiente correcto (Production)

### **CORS Errors:**

- Verifica que el backend permita el dominio de Vercel
- Actualiza `FRONTEND_URL` en backend
- Reinicia el backend después de cambios

### **Página en Blanco:**

- Abre DevTools (F12)
- Ve a Console
- Busca errores
- Verifica que las rutas estén correctas en vercel.json

---

## 📝 COMANDOS ÚTILES

### **Build Local:**
```bash
cd frontend-web
npm run build
```

### **Servir Build Localmente:**
```bash
npx serve -s build
```

### **Ver Logs de Vercel:**
```bash
vercel logs
```

### **Ver Deployments:**
```bash
vercel ls
```

### **Rollback:**
```bash
vercel rollback
```

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DEL DEPLOY

1. **Desplegar Backend:**
   - Railway/Render/Heroku
   - Configurar MongoDB Atlas
   - Obtener URL del backend

2. **Actualizar Frontend:**
   - Agregar URL del backend en variables de entorno
   - Redeploy

3. **Testing Completo:**
   - Probar todas las funcionalidades
   - Verificar login/registro
   - Probar donaciones

4. **Configurar Dominio:**
   - Comprar dominio (opcional)
   - Configurar DNS
   - SSL automático

5. **Analytics:**
   - Google Analytics
   - Vercel Analytics
   - Facebook Pixel (opcional)

6. **Monitoreo:**
   - Configurar alertas
   - Monitorear errores
   - Revisar logs

---

## 📞 RECURSOS

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas
- **Render Docs:** https://render.com/docs

---

## ✅ RESUMEN RÁPIDO

### **Para Deploy Inmediato:**

```bash
# 1. Commit y push
git add .
git commit -m "feat: Preparar para producción"
git push origin main

# 2. Ve a Vercel
# https://vercel.com

# 3. Import Project
# Selecciona: selaiah-radio

# 4. Configurar
# Root: frontend-web
# Framework: Create React App

# 5. Variables de Entorno (mínimas)
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SOCKET_URL=http://localhost:3001
REACT_APP_STREAM_URL=https://c34.radioboss.fm:8888/stream
REACT_APP_ENV=production

# 6. Deploy!
# Click en "Deploy"

# 7. ¡Listo!
# Tu sitio estará en: https://tu-proyecto.vercel.app
```

---

**🚀 ¡Listo para Desplegar en Vercel!** ✨

**Última actualización:** 22 de Octubre, 2025 - 3:24 AM
