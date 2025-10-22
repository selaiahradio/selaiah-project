# 🚀 GUÍA DE DESPLIEGUE EN VERCEL

**© 2025 Selaiah Radio**

---

## 📋 PREPARACIÓN

### **Archivos Creados para Vercel:**
- ✅ `/frontend-web/vercel.json` - Configuración de Vercel
- ✅ `/frontend-web/.vercelignore` - Archivos a ignorar
- ✅ Package.json ya tiene script de build

---

## 🎯 PASOS PARA DESPLEGAR

### **1. Instalar Vercel CLI (Opcional)**
```bash
npm install -g vercel
```

### **2. Opción A: Deploy desde la Web (Recomendado)**

#### **Paso 1: Crear cuenta en Vercel**
1. Ve a https://vercel.com
2. Haz clic en "Sign Up"
3. Conecta con GitHub, GitLab o Bitbucket

#### **Paso 2: Importar Proyecto**
1. Click en "Add New Project"
2. Importa tu repositorio de GitHub
3. Selecciona el proyecto `selaiah-radio`

#### **Paso 3: Configurar el Proyecto**
```
Framework Preset: Create React App
Root Directory: frontend-web
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

#### **Paso 4: Variables de Entorno**
Agrega estas variables en Vercel:
```
REACT_APP_API_URL=https://tu-backend.com
REACT_APP_STREAM_URL=https://c34.radioboss.fm:8888/stream
```

#### **Paso 5: Deploy**
1. Click en "Deploy"
2. Espera a que termine el build
3. ¡Listo! Tu sitio estará en: `https://tu-proyecto.vercel.app`

---

### **3. Opción B: Deploy desde CLI**

```bash
# Navegar al directorio del frontend
cd frontend-web

# Login en Vercel
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

---

## ⚙️ CONFIGURACIÓN DE VARIABLES DE ENTORNO

### **En Vercel Dashboard:**
1. Ve a tu proyecto en Vercel
2. Click en "Settings"
3. Click en "Environment Variables"
4. Agrega:

```
REACT_APP_API_URL=https://tu-backend-api.com
REACT_APP_STREAM_URL=https://c34.radioboss.fm:8888/stream
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_xxx (cuando lo tengas)
REACT_APP_GOOGLE_MAPS_KEY=AIzaSyXXX (cuando lo tengas)
```

---

## 🔧 BACKEND EN PRODUCCIÓN

### **Opciones para el Backend:**

#### **Opción 1: Railway**
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway init
railway up
```

#### **Opción 2: Render**
1. Ve a https://render.com
2. Conecta tu repositorio
3. Crea un "Web Service"
4. Configura:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: Agrega las del .env

#### **Opción 3: Heroku**
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Crear app
cd backend
heroku create selaiah-radio-api

# Deploy
git push heroku main
```

---

## 📝 CHECKLIST PRE-DEPLOY

### **Frontend:**
- ✅ Código compilando sin errores
- ✅ Variables de entorno configuradas
- ✅ API URL apuntando al backend correcto
- ✅ vercel.json creado
- ✅ .vercelignore creado

### **Backend:**
- ⏳ Desplegar backend primero
- ⏳ Obtener URL del backend
- ⏳ Configurar CORS para permitir dominio de Vercel
- ⏳ Configurar variables de entorno en producción
- ⏳ Base de datos en la nube (MongoDB Atlas)

---

## 🗄️ BASE DE DATOS EN LA NUBE

### **MongoDB Atlas (Recomendado):**

1. **Crear cuenta:**
   - Ve a https://www.mongodb.com/cloud/atlas
   - Crea una cuenta gratuita

2. **Crear Cluster:**
   - Click en "Build a Database"
   - Selecciona "Free Tier"
   - Elige región más cercana

3. **Configurar Acceso:**
   - Crea un usuario de base de datos
   - Whitelist IP: `0.0.0.0/0` (permitir todas)

4. **Obtener Connection String:**
   ```
   mongodb+srv://usuario:password@cluster.mongodb.net/selaiah
   ```

5. **Actualizar Backend:**
   - Agrega la URL en variables de entorno
   - `MONGODB_URI=mongodb+srv://...`

---

## 🔐 SEGURIDAD EN PRODUCCIÓN

### **Variables de Entorno Críticas:**
```bash
# Backend
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
SESSION_SECRET=genera-un-secreto-fuerte-aqui
JWT_SECRET=otro-secreto-diferente
FRONTEND_URL=https://selaiah-radio.vercel.app

# Opcional (cuando los tengas)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
STRIPE_SECRET_KEY=sk_live_...
OPENAI_API_KEY=sk-...
```

### **CORS en Backend:**
```javascript
// En server.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://selaiah-radio.vercel.app',
    'https://tu-dominio-custom.com'
  ],
  credentials: true
}));
```

---

## 🌐 DOMINIO PERSONALIZADO

### **En Vercel:**
1. Ve a "Settings" > "Domains"
2. Click en "Add Domain"
3. Ingresa tu dominio (ej: `selaiah.com`)
4. Sigue las instrucciones para configurar DNS

### **Configuración DNS:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📊 MONITOREO

### **Vercel Analytics:**
- Automáticamente incluido
- Ve a "Analytics" en tu proyecto

### **Logs:**
- Ve a "Deployments" > Click en deployment > "View Function Logs"

---

## 🔄 ACTUALIZACIONES AUTOMÁTICAS

### **Con GitHub:**
1. Conecta tu repositorio a Vercel
2. Cada push a `main` desplegará automáticamente
3. Pull requests crean preview deployments

---

## 🚀 COMANDOS RÁPIDOS

```bash
# Build local para probar
cd frontend-web
npm run build

# Servir build localmente
npx serve -s build

# Deploy a Vercel
vercel

# Deploy a producción
vercel --prod

# Ver logs
vercel logs
```

---

## 📱 DESPUÉS DEL DEPLOY

### **1. Probar Funcionalidades:**
- ✅ Página principal carga
- ✅ Reproductor de radio funciona
- ✅ Login/Registro funcionan
- ✅ Suscripción funciona
- ✅ Botón de donación responde

### **2. SEO y Meta Tags:**
Actualiza `/frontend-web/public/index.html`:
```html
<title>Selaiah Radio - Tu Radio Cristiana 24/7</title>
<meta name="description" content="Radio cristiana en línea 24/7. Música, predicaciones y programas cristianos.">
<meta property="og:title" content="Selaiah Radio">
<meta property="og:description" content="Tu radio cristiana 24/7">
<meta property="og:image" content="https://tu-dominio.com/og-image.jpg">
```

### **3. Analytics:**
- Agrega Google Analytics
- Configura Facebook Pixel (opcional)

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### **Build Falla:**
```bash
# Limpiar cache
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### **Variables de Entorno no Funcionan:**
- Asegúrate de que empiecen con `REACT_APP_`
- Redeploy después de agregar variables

### **CORS Errors:**
- Verifica que el backend permita el dominio de Vercel
- Actualiza `FRONTEND_URL` en backend

---

## 📞 RECURSOS

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas
- **Render Docs:** https://render.com/docs

---

## ✅ CHECKLIST FINAL

- [ ] Frontend desplegado en Vercel
- [ ] Backend desplegado (Railway/Render/Heroku)
- [ ] MongoDB Atlas configurado
- [ ] Variables de entorno configuradas
- [ ] CORS configurado correctamente
- [ ] Dominio personalizado (opcional)
- [ ] SSL/HTTPS funcionando
- [ ] Todas las funcionalidades probadas

---

**🎵 ¡Listo para lanzar Selaiah Radio al mundo!** ✨

**Última actualización:** 21 de Octubre, 2025 - 11:26 PM
