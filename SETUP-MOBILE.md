# 📱 SETUP MOBILE - SELAIAH RADIO
## Guía Completa para App React Native

**iHostCast Ltd © 2025**

---

## 📋 REQUISITOS PREVIOS

### macOS (para iOS y Android)

```bash
# Node.js (ya instalado)
node --version  # Debe ser v18+

# Watchman (recomendado)
brew install watchman

# CocoaPods (para iOS)
sudo gem install cocoapods

# Xcode (para iOS)
# Descargar desde App Store

# Android Studio (para Android)
# Descargar desde: https://developer.android.com/studio
```

### Verificar Instalación

```bash
# React Native CLI
npx react-native --version

# Java (para Android)
java -version

# Android SDK
echo $ANDROID_HOME
```

---

## 🚀 INSTALACIÓN PASO A PASO

### 1. Crear Proyecto React Native

```bash
# Navegar al directorio del proyecto
cd /Users/odgmusic/Selaiah-project/selaiah-radio

# Crear proyecto React Native
npx react-native init SelaiahRadioMobile --version 0.72.0

# Entrar al proyecto
cd SelaiahRadioMobile
```

### 2. Instalar Dependencias de Navegación

```bash
# React Navigation
npm install @react-navigation/native@^6.1.9
npm install @react-navigation/stack@^6.3.20
npm install @react-navigation/bottom-tabs@^6.5.11

# Dependencias requeridas
npm install react-native-screens@^3.27.0
npm install react-native-safe-area-context@^4.7.4
npm install react-native-gesture-handler@^2.13.4
npm install @react-native-masked-view/masked-view@^0.3.0
```

### 3. Instalar Dependencias de Red y Estado

```bash
# HTTP y WebSocket
npm install axios@^1.6.0
npm install socket.io-client@^4.5.4

# Storage
npm install @react-native-async-storage/async-storage@^1.19.5

# Iconos
npm install react-native-vector-icons@^10.0.2
```

### 4. Instalar Dependencias de Audio

```bash
# Reproductor de audio
npm install react-native-track-player@^4.0.1

# Alternativa (si track-player da problemas)
# npm install react-native-sound@^0.11.2
```

### 5. Instalar Dependencias de Firebase

```bash
# Firebase Core
npm install @react-native-firebase/app@^18.6.1

# Firebase Auth
npm install @react-native-firebase/auth@^18.6.1

# Firebase Messaging (Push Notifications)
npm install @react-native-firebase/messaging@^18.6.1
```

### 6. Instalar Utilidades

```bash
# Variables de entorno
npm install react-native-dotenv@^3.4.9

# Date utilities
npm install date-fns@^2.30.0

# Toast notifications
npm install react-native-toast-message@^2.1.7
```

---

## ⚙️ CONFIGURACIÓN

### 1. Configurar iOS (macOS solamente)

```bash
# Instalar pods
cd ios
pod install
cd ..
```

### 2. Configurar Android

**Editar `android/build.gradle`:**

```gradle
buildscript {
    ext {
        buildToolsVersion = "33.0.0"
        minSdkVersion = 21
        compileSdkVersion = 33
        targetSdkVersion = 33
        ndkVersion = "23.1.7779620"
        
        // Agregar estas versiones
        kotlinVersion = "1.8.0"
        googlePlayServicesVersion = "20.6.0"
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.4.2")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("com.google.gms:google-services:4.3.15")
    }
}
```

**Editar `android/app/build.gradle`:**

```gradle
apply plugin: "com.android.application"
apply plugin: "com.google.gms.google-services"  // Agregar esta línea

android {
    defaultConfig {
        applicationId "com.selaiahradiomobile"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        multiDexEnabled true  // Agregar esta línea
    }
}

dependencies {
    implementation "androidx.multidex:multidex:2.0.1"  // Agregar esta línea
}
```

**Limpiar y reconstruir:**

```bash
cd android
./gradlew clean
cd ..
```

### 3. Configurar Variables de Entorno

**Crear `.env`:**

```bash
cat > .env << 'EOF'
API_URL=http://localhost:3001
SOCKET_URL=http://localhost:3001
STREAM_URL=https://c34.radioboss.fm:8888/stream
EOF
```

**Configurar babel.config.js:**

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
```

### 4. Configurar React Native Track Player

**Crear `index.js` en raíz:**

```javascript
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));
```

**Crear `service.js` en raíz:**

```javascript
import TrackPlayer from 'react-native-track-player';

module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
};
```

---

## 📁 ESTRUCTURA DEL PROYECTO

```bash
# Crear estructura de carpetas
mkdir -p src/{components,screens,services,navigation,utils,assets}
mkdir -p src/components/{Player,Auth,Shows,Events,News}
mkdir -p src/screens/{Home,Shows,Events,News,Profile}
```

---

## 🏃 EJECUTAR LA APP

### Android

```bash
# Iniciar Metro Bundler
npm start

# En otra terminal, ejecutar en Android
npx react-native run-android

# O si tienes un dispositivo conectado
adb devices
npx react-native run-android --deviceId=DEVICE_ID
```

### iOS (macOS solamente)

```bash
# Iniciar Metro Bundler
npm start

# En otra terminal, ejecutar en iOS
npx react-native run-ios

# O especificar simulador
npx react-native run-ios --simulator="iPhone 14 Pro"
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Unable to resolve module"

```bash
# Limpiar cache
npm start -- --reset-cache

# Reinstalar node_modules
rm -rf node_modules
npm install
```

### Error: "Could not connect to development server"

```bash
# Verificar que Metro está corriendo
npm start

# Verificar IP en Android
# Settings → Developer Options → Debug server host
# Poner: TU_IP:8081
```

### Error en Android Build

```bash
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
```

### Error en iOS Build

```bash
cd ios
pod deintegrate
pod install
cd ..
```

---

## 📦 DEPENDENCIAS INSTALADAS

```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "react-native-screens": "^3.27.0",
    "react-native-safe-area-context": "^4.7.4",
    "react-native-gesture-handler": "^2.13.4",
    "@react-native-masked-view/masked-view": "^0.3.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.5.4",
    "@react-native-async-storage/async-storage": "^1.19.5",
    "react-native-vector-icons": "^10.0.2",
    "react-native-track-player": "^4.0.1",
    "react-native-dotenv": "^3.4.9",
    "@react-native-firebase/app": "^18.6.1",
    "@react-native-firebase/auth": "^18.6.1",
    "@react-native-firebase/messaging": "^18.6.1",
    "date-fns": "^2.30.0",
    "react-native-toast-message": "^2.1.7"
  }
}
```

---

## ✅ CHECKLIST

- [ ] Node.js instalado (v18+)
- [ ] Watchman instalado
- [ ] Android Studio instalado (para Android)
- [ ] Xcode instalado (para iOS, solo macOS)
- [ ] Proyecto React Native creado
- [ ] Dependencias instaladas
- [ ] Android configurado
- [ ] iOS configurado (si macOS)
- [ ] Variables de entorno configuradas
- [ ] App ejecutándose en emulador/dispositivo

---

## 🎯 PRÓXIMOS PASOS

1. Crear componentes de la app
2. Implementar navegación
3. Integrar reproductor de audio
4. Conectar con backend
5. Implementar autenticación
6. Agregar notificaciones push

---

**iHostCast Ltd © 2025**  
**Selaiah Radio Mobile**
