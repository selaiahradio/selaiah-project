# 📱 Selaiah Radio - iOS App

## Estructura para App iOS (React Native)

### 🚧 Estado: En Desarrollo

Esta carpeta contendrá la aplicación iOS de Selaiah Radio.

---

## 📋 Requisitos

- **Mac** con macOS 12 o superior
- **Xcode** 14 o superior
- **Node.js** v18+
- **CocoaPods** instalado
- **Cuenta Apple Developer** ($99/año)

---

## 🚀 Instalación

### 1. Instalar CocoaPods (si no está instalado)

```bash
sudo gem install cocoapods
```

### 2. Crear proyecto React Native

```bash
# Opción 1: Con Expo
npx create-expo-app@latest . --template blank

# Opción 2: React Native CLI
npx react-native init SelaiahRadio
```

### 3. Instalar dependencias

```bash
npm install

# Instalar pods (solo iOS)
cd ios
pod install
cd ..
```

### 4. Dependencias necesarias

```bash
# Navegación
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# Audio
npm install expo-av

# Storage
npm install @react-native-async-storage/async-storage

# HTTP
npm install axios

# Icons
npm install react-native-vector-icons
```

---

## 🎯 Funcionalidades Planeadas

- [ ] Reproductor de streaming con controles en background
- [ ] Chat con IA para peticiones
- [ ] Calendario de shows y eventos
- [ ] Noticias locales y generales
- [ ] Notificaciones push
- [ ] Autenticación (Google, Facebook, Apple)
- [ ] Modo oscuro
- [ ] Compartir en redes sociales

---

## 📱 Configuración de app.json

```json
{
  "expo": {
    "name": "Selaiah Radio",
    "slug": "selaiah-radio",
    "version": "1.0.0",
    "owner": "ihostcast",
    "ios": {
      "bundleIdentifier": "com.ihostcast.selaiah.radio",
      "buildNumber": "1.0.0",
      "supportsTablet": true,
      "infoPlist": {
        "UIBackgroundModes": ["audio"],
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true
        }
      }
    },
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1E40AF"
    }
  }
}
```

---

## 🏃 Ejecutar la App

### En Simulador

```bash
# Con Expo
npm start
# Presionar 'i' para iOS

# Con React Native CLI
npx react-native run-ios
```

### En Dispositivo Físico

```bash
# Con Expo
npm start
# Escanear QR con Expo Go

# Con React Native CLI (requiere certificados)
npx react-native run-ios --device "iPhone de [Tu Nombre]"
```

---

## 📦 Compilar para App Store

### Con Expo (EAS Build)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar
eas build:configure

# Compilar
eas build --platform ios
```

### Con Xcode

1. Abrir `ios/SelaiahRadio.xcworkspace` en Xcode
2. Seleccionar equipo de desarrollo
3. Product → Archive
4. Distribuir a App Store Connect

---

## 🎨 Diseño

La app iOS mantendrá el diseño actual de la app móvil con:
- Colores: Azul (#1E40AF), Púrpura (#7C3AED)
- Tipografía: SF Pro (nativa de iOS)
- Componentes nativos de iOS cuando sea posible

---

## 🔐 Permisos Requeridos

- **Audio en Background**: Para reproducir streaming
- **Notificaciones Push**: Para alertas de eventos
- **Internet**: Para streaming y API

---

## 📝 Próximos Pasos

1. Crear proyecto React Native
2. Implementar reproductor de audio
3. Integrar con API backend
4. Diseñar UI/UX específica para iOS
5. Implementar notificaciones push
6. Configurar autenticación con Sign in with Apple
7. Testing en dispositivos reales
8. Enviar a App Store Review

---

## 🆘 Soporte

Para ayuda con la app iOS:
- Email: support@ihostcast.com
- Documentación React Native: https://reactnative.dev
- Documentación Expo: https://docs.expo.dev

---

**iHostCast Ltd © 2025**
