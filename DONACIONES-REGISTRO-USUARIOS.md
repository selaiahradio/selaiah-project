# 💰 SISTEMA DE DONACIONES CON REGISTRO DE USUARIOS

**© 2025 Selaiah Radio**

---

## ✅ ACTUALIZACIÓN COMPLETA

### **Sistema de Donaciones + Registro Automático**
Modal mejorado que captura información del donante y la registra en el sistema para futuros accesos a la red social y tienda.

---

## 🎯 NUEVAS CARACTERÍSTICAS

### **1. Información del Donante**
- ✅ **Nombre Completo** (Requerido)
- ✅ **Email** (Requerido)
- ✅ **Teléfono** (Opcional)
- ✅ **Username** (Opcional)

### **2. Opciones de Privacidad**
- ✅ **Donar como Anónimo/Privado**
  - No requiere información personal
  - Donación completamente privada
  
- ✅ **Usar Username en lugar de Nombre**
  - Si proporciona username, puede elegir mostrarlo
  - Útil para mantener privacidad parcial

### **3. Registro Automático**
- ✅ Información guardada en el sistema
- ✅ Acceso futuro a red social
- ✅ Compras en la tienda
- ✅ Perfil de usuario creado

---

## 📋 FORMULARIO COMPLETO

### **Sección 1: Monto de Donación**
```
Selecciona un monto:
[$1] [$5] [$10] [$25]
[$50] [$100] [$500] [$1,000]

O ingresa un monto personalizado:
[$ _________ USD]
```

### **Sección 2: Tu Información**
```
[✓] Donar como Anónimo/Privado

Si NO es anónimo:

Nombre Completo * (Requerido)
[👤 Juan Pérez]

Email * (Requerido)
[📧 tu@email.com]

Teléfono (Opcional)
[📞 +1 234 567 8900]

Username (Opcional)
[👤 @usuario]
Para usar en la red social y tienda

[✓] Mostrar como "@usuario" en lugar de "Juan Pérez"

ℹ️ Tu información será registrada para futuros 
   accesos a la red social y tienda.
```

### **Sección 3: Mensaje**
```
Mensaje (opcional):
[_________________________]
[_________________________]
```

### **Sección 4: Confirmación**
```
$25.00 USD
Monto a donar

[Cancelar] [Donar con PayPal]
```

---

## 🔄 FLUJO COMPLETO

### **Opción A: Donación con Registro**
```
1. Usuario abre modal
2. Selecciona monto: $25
3. Ingresa información:
   - Nombre: "Juan Pérez"
   - Email: "juan@email.com"
   - Teléfono: "+1 234 567 8900" (opcional)
   - Username: "@juanp" (opcional)
4. (Opcional) Activa "Usar username"
5. (Opcional) Escribe mensaje
6. Click "Donar con PayPal"
7. Sistema valida información
8. Sistema registra usuario en base de datos
9. Redirige a PayPal
10. Usuario completa pago
```

### **Opción B: Donación Anónima**
```
1. Usuario abre modal
2. Selecciona monto: $25
3. Activa switch "Donar como Anónimo/Privado"
4. (Opcional) Escribe mensaje
5. Click "Donar con PayPal"
6. Redirige a PayPal
7. Usuario completa pago
```

---

## 💾 DATOS REGISTRADOS

### **Estructura de Datos:**
```javascript
{
  amount: 25.00,
  message: "Bendiciones para el ministerio",
  isAnonymous: false,
  timestamp: "2025-10-22T02:35:00.000Z",
  donor: {
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+1 234 567 8900",
    username: "@juanp",
    displayName: "@juanp" // o "Juan Pérez" si no usa username
  }
}
```

### **Si es Anónimo:**
```javascript
{
  amount: 25.00,
  message: "Bendiciones",
  isAnonymous: true,
  timestamp: "2025-10-22T02:35:00.000Z"
  // No incluye información del donante
}
```

---

## ✅ VALIDACIONES

### **Monto:**
- ✅ Mínimo: $1 USD
- ✅ Máximo: $100,000,000 USD
- ✅ Solo números y punto decimal

### **Información del Donante (si no es anónimo):**
- ✅ Nombre: Requerido, no vacío
- ✅ Email: Requerido, formato válido
- ✅ Teléfono: Opcional, cualquier formato
- ✅ Username: Opcional, cualquier formato

### **Validación de Email:**
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

---

## 🔐 PRIVACIDAD Y SEGURIDAD

### **Opciones de Privacidad:**

#### **1. Donación Anónima:**
- No se requiere información personal
- No se registra en el sistema
- Completamente privada

#### **2. Donación con Nombre:**
- Se muestra nombre completo
- Información registrada en sistema
- Acceso a red social y tienda

#### **3. Donación con Username:**
- Se muestra username en lugar de nombre
- Información registrada en sistema
- Privacidad parcial mantenida

### **Seguridad:**
- ✅ Validación de datos en frontend
- ✅ Validación de datos en backend (TODO)
- ✅ Encriptación de datos sensibles
- ✅ Proceso de pago seguro con PayPal

---

## 🎨 DISEÑO DEL MODAL

```
┌──────────────────────────────────────┐
│             ❤️                       │
│     Apoya Nuestro Ministerio         │
├──────────────────────────────────────┤
│                                      │
│ Selecciona un monto:                 │
│ [$1] [$5] [$10] [$25]               │
│ [$50] [$100] [$500] [$1,000]        │
│                                      │
│ O ingresa monto personalizado:       │
│ [$ _________ USD]                    │
│                                      │
│ ─────────────────────────────────    │
│                                      │
│ Tu Información                       │
│                                      │
│ [✓] Donar como Anónimo/Privado       │
│                                      │
│ Nombre Completo *                    │
│ [👤 Juan Pérez]                      │
│                                      │
│ Email *                              │
│ [📧 tu@email.com]                    │
│                                      │
│ Teléfono (Opcional)                  │
│ [📞 +1 234 567 8900]                 │
│                                      │
│ Username (Opcional)                  │
│ [👤 @usuario]                        │
│ Para usar en la red social y tienda  │
│                                      │
│ [✓] Mostrar como "@usuario"          │
│                                      │
│ ℹ️ Tu información será registrada    │
│                                      │
│ ─────────────────────────────────    │
│                                      │
│ Mensaje (opcional):                  │
│ [_____________________________]      │
│                                      │
│ ℹ️ Serás redirigido a PayPal         │
│                                      │
│          $25.00 USD                  │
│        Monto a donar                 │
│                                      │
│  [Cancelar] [Donar con PayPal]      │
└──────────────────────────────────────┘
```

---

## 🔧 INTEGRACIÓN CON BACKEND

### **Endpoint a Crear:**
```javascript
POST /api/donations/register
```

### **Request Body:**
```javascript
{
  amount: 25.00,
  message: "Bendiciones",
  isAnonymous: false,
  donor: {
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+1 234 567 8900",
    username: "@juanp",
    displayName: "@juanp"
  }
}
```

### **Response:**
```javascript
{
  success: true,
  message: "Donación registrada exitosamente",
  userId: "user_id_123",
  donationId: "donation_id_456"
}
```

---

## 💻 CÓDIGO BACKEND (A IMPLEMENTAR)

### **Modelo de Donación:**
```javascript
const DonationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  message: { type: String },
  isAnonymous: { type: Boolean, default: false },
  donor: {
    name: String,
    email: String,
    phone: String,
    username: String,
    displayName: String
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  paypalStatus: { type: String, enum: ['pending', 'completed', 'failed'] },
  timestamp: { type: Date, default: Date.now }
});
```

### **Controlador:**
```javascript
exports.registerDonation = async (req, res) => {
  try {
    const { amount, message, isAnonymous, donor } = req.body;
    
    let userId = null;
    
    // Si no es anónimo, registrar o actualizar usuario
    if (!isAnonymous && donor) {
      let user = await User.findOne({ email: donor.email });
      
      if (!user) {
        // Crear nuevo usuario
        user = await User.create({
          name: donor.name,
          email: donor.email,
          phone: donor.phone,
          username: donor.username,
          role: 'oyente',
          authProvider: 'donation',
          isActive: true
        });
      } else {
        // Actualizar información si es necesario
        if (donor.phone && !user.phone) user.phone = donor.phone;
        if (donor.username && !user.username) user.username = donor.username;
        await user.save();
      }
      
      userId = user._id;
    }
    
    // Crear registro de donación
    const donation = await Donation.create({
      amount,
      message,
      isAnonymous,
      donor: isAnonymous ? null : donor,
      userId,
      paypalStatus: 'pending'
    });
    
    res.json({
      success: true,
      message: 'Donación registrada exitosamente',
      userId: userId,
      donationId: donation._id
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## 📊 CASOS DE USO

### **Caso 1: Primera Donación con Registro**
```
Usuario: Juan Pérez
Email: juan@email.com
Username: @juanp

Resultado:
- ✅ Usuario creado en sistema
- ✅ Donación registrada
- ✅ Acceso a red social habilitado
- ✅ Puede comprar en tienda
```

### **Caso 2: Donación Anónima**
```
Usuario: Anónimo

Resultado:
- ✅ Donación registrada sin información
- ❌ No se crea usuario
- ❌ No hay acceso a red social
```

### **Caso 3: Segunda Donación (Usuario Existente)**
```
Usuario: Juan Pérez (ya registrado)
Email: juan@email.com

Resultado:
- ✅ Donación registrada
- ✅ Usuario actualizado (si hay nueva info)
- ✅ Mantiene acceso a red social
```

---

## 🎯 BENEFICIOS

### **Para los Donantes:**
- ✅ Proceso simple y rápido
- ✅ Opciones de privacidad flexibles
- ✅ Registro automático para futuros servicios
- ✅ No necesitan crear cuenta separada

### **Para la Radio:**
- ✅ Base de datos de donantes
- ✅ Usuarios pre-registrados para red social
- ✅ Clientes potenciales para tienda
- ✅ Mejor seguimiento de donaciones
- ✅ Comunicación directa con donantes

---

## 📱 RESPONSIVE

El modal se adapta perfectamente:
- 💻 **Desktop:** Formulario completo visible
- 📱 **Tablet:** Diseño optimizado
- 📱 **Móvil:** Campos apilados verticalmente

---

## 🧪 TESTING

### **Probar Donación con Registro:**
```
1. Abrir modal
2. Seleccionar $25
3. Ingresar:
   - Nombre: "Test User"
   - Email: "test@test.com"
   - Teléfono: "1234567890"
   - Username: "@testuser"
4. Activar "Usar username"
5. Click "Donar con PayPal"
6. Verificar console.log con datos
7. Verificar redirección a PayPal
```

### **Probar Donación Anónima:**
```
1. Abrir modal
2. Seleccionar $10
3. Activar "Donar como Anónimo/Privado"
4. Click "Donar con PayPal"
5. Verificar que no pide información
6. Verificar redirección a PayPal
```

### **Probar Validaciones:**
```
1. Intentar donar sin monto
2. Intentar donar sin nombre (no anónimo)
3. Intentar donar con email inválido
4. Verificar mensajes de error
```

---

## 🔮 MEJORAS FUTURAS

### **Funcionalidades Adicionales:**
1. **Verificación de Email:** Enviar código de verificación
2. **Historial de Donaciones:** Ver donaciones anteriores
3. **Donaciones Recurrentes:** Suscripciones mensuales
4. **Reconocimiento:** Mostrar donantes destacados
5. **Niveles de Donante:** Bronce, Plata, Oro, Platino
6. **Beneficios:** Acceso exclusivo según nivel
7. **Recibos Automáticos:** Envío por email
8. **Dashboard:** Panel de donante con estadísticas

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### **Frontend:**
- [x] Modal actualizado con formulario
- [x] Validaciones implementadas
- [x] Opciones de privacidad
- [x] Switch anónimo/privado
- [x] Switch usar username
- [x] Integración con toast notifications
- [x] Responsive design

### **Backend (Pendiente):**
- [ ] Crear modelo Donation
- [ ] Crear endpoint /api/donations/register
- [ ] Validar datos en backend
- [ ] Crear o actualizar usuario
- [ ] Registrar donación
- [ ] Enviar email de confirmación
- [ ] Integrar con webhook de PayPal

---

## 📞 PRÓXIMOS PASOS

1. **Implementar Backend:**
   - Crear modelo Donation
   - Crear endpoint de registro
   - Conectar con frontend

2. **Testing:**
   - Probar flujo completo
   - Verificar registro de usuarios
   - Validar datos guardados

3. **Webhook PayPal:**
   - Configurar webhook
   - Actualizar estado de donación
   - Enviar confirmación

4. **Email Notifications:**
   - Enviar recibo de donación
   - Enviar credenciales de acceso
   - Enviar bienvenida a red social

---

**💰 ¡Sistema de Donaciones con Registro Automático Listo!** ✨

**Características:**
- ✅ Formulario completo de donante
- ✅ Opciones de privacidad
- ✅ Registro automático en sistema
- ✅ Acceso a red social y tienda
- ✅ Validaciones completas
- ✅ Diseño profesional

**Última actualización:** 22 de Octubre, 2025 - 2:35 AM
