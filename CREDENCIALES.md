# 🔑 CREDENCIALES DE ACCESO - SELAIAH RADIO

**iHostCast Ltd © 2025**

---

## 👤 USUARIOS DE PRUEBA

### **ADMINISTRADOR (Super Admin)**
```
📧 Email:    admin@selaiah.com
🔑 Password: admin123
👤 Rol:      super_admin
🛠️ Permisos: TODOS (gestión completa del sistema)
```

**Acceso a:**
- ✅ Panel de administración completo
- ✅ Gestión de usuarios
- ✅ Gestión de contenido
- ✅ Configuraciones del sistema
- ✅ Todas las funcionalidades

---

### **USUARIO NORMAL (Oyente)**
```
📧 Email:    user@selaiah.com
🔑 Password: user123
👤 Rol:      oyente
🎵 Permisos: Usuario estándar
```

**Acceso a:**
- ✅ Reproductor de radio
- ✅ Chat con IA
- ✅ Ver shows y eventos
- ✅ Ver noticias
- ✅ Red social (cuando esté implementada en UI)
- ❌ Panel de administración

---

## 🌐 CÓMO ACCEDER

### **1. Abre la Aplicación Web**
```
http://localhost:3000
```

### **2. Inicia Sesión**
1. Haz clic en "Iniciar Sesión" o ve a `/auth`
2. Ingresa el email y password
3. Haz clic en "Entrar"

### **3. Explora**
- Como **admin**: Tendrás acceso al panel de administración
- Como **user**: Podrás usar todas las funcionalidades de usuario

---

## 🔐 SEGURIDAD

⚠️ **IMPORTANTE:**
- Estas son credenciales de **DESARROLLO/PRUEBA**
- Cambia las contraseñas en **PRODUCCIÓN**
- No compartas estas credenciales públicamente
- El admin tiene acceso total al sistema

---

## 🛠️ CREAR MÁS USUARIOS

### **Opción 1: Desde la Aplicación**
- Usa el formulario de registro en `/auth`
- Los nuevos usuarios tendrán rol "oyente" por defecto

### **Opción 2: Desde el Backend**
```bash
cd backend
node scripts/create-admin.js
```

### **Opción 3: Desde MongoDB**
```bash
mongosh selaiah
db.users.find()  # Ver usuarios existentes
```

---

## 📊 ROLES DISPONIBLES

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **super_admin** | Administrador total | Todos los permisos |
| **admin** | Administrador | Gestión general |
| **locutor** | Locutor/DJ | Gestión de contenido y streaming |
| **editor** | Editor | Edición de contenido |
| **oyente** | Usuario estándar | Funcionalidades básicas |

---

## 🔄 CAMBIAR ROL DE USUARIO

### **Desde el Panel de Admin:**
1. Login como admin
2. Ve a "Gestión de Usuarios"
3. Selecciona el usuario
4. Cambia el rol

### **Desde la API:**
```bash
curl -X PUT http://localhost:3001/api/admin/users/{userId}/role \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}'
```

---

## 🧪 TEST DE LOGIN

### **Probar Login con cURL:**
```bash
# Login como admin
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@selaiah.com","password":"admin123"}' \
  --cookie-jar cookies.txt

# Login como user
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@selaiah.com","password":"user123"}' \
  --cookie-jar cookies.txt
```

---

## 📝 NOTAS

- Los usuarios se crean con `isActive: true` y `isVerified: true`
- Las contraseñas están hasheadas con bcrypt (10 rounds)
- Las sesiones se almacenan en MongoDB
- El token de sesión dura 24 horas por defecto

---

## 🆘 PROBLEMAS DE LOGIN

### **"Email o contraseña incorrectos"**
- Verifica que estés usando el email correcto
- La contraseña es case-sensitive
- Asegúrate de que el backend esté corriendo

### **"No autenticado"**
- Verifica que las cookies estén habilitadas
- Revisa que CORS esté configurado correctamente
- Comprueba que `withCredentials: true` esté en el frontend

### **Recrear Usuarios**
```bash
cd backend
# Eliminar usuarios existentes
mongosh selaiah --eval "db.users.deleteMany({email: {$in: ['admin@selaiah.com', 'user@selaiah.com']}})"

# Crear nuevamente
node scripts/create-admin.js
```

---

## 🎯 ACCESO RÁPIDO

### **Para Desarrollo:**
```
URL: http://localhost:3000/auth
Admin: admin@selaiah.com / admin123
User: user@selaiah.com / user123
```

### **Backend API:**
```
URL: http://localhost:3001
Health: http://localhost:3001/api/health
```

---

**¡Listo para usar! 🚀**

**Última actualización:** 21 de Octubre, 2025 - 11:13 PM
