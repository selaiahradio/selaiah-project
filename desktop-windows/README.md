# 💻 Selaiah Radio - Windows Desktop App

## Aplicación de Escritorio para Windows (Electron)

### 🚧 Estado: En Desarrollo

Esta carpeta contendrá la aplicación de escritorio para Windows.

---

## 📋 Requisitos

- **Windows** 10 o superior
- **Node.js** v18+
- **npm** v9+

---

## 🚀 Instalación

### 1. Inicializar proyecto

```bash
npm init -y
```

### 2. Instalar Electron

```bash
npm install electron --save-dev
npm install electron-builder --save-dev
```

### 3. Dependencias adicionales

```bash
npm install electron-store
npm install axios
```

---

## 📦 Configuración package.json

```json
{
  "name": "selaiah-radio-windows",
  "version": "1.0.0",
  "description": "Selaiah Radio - Aplicación de Escritorio",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder",
    "build:win": "electron-builder --win"
  },
  "build": {
    "appId": "com.ihostcast.selaiah.radio",
    "productName": "Selaiah Radio",
    "win": {
      "target": ["nsis", "portable"],
      "icon": "assets/icon.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  },
  "author": "iHostCast Ltd",
  "license": "Proprietary"
}
```

---

## 📁 Estructura de Archivos

```
desktop-windows/
├── main.js              # Proceso principal de Electron
├── index.html           # Interfaz de usuario
├── renderer.js          # Lógica del frontend
├── preload.js           # Script de precarga
├── assets/
│   ├── icon.ico        # Icono de la app
│   └── logo.png        # Logo
└── package.json
```

---

## 🎯 Funcionalidades Planeadas

- [ ] Reproductor de streaming integrado
- [ ] Controles multimedia en la barra de tareas
- [ ] Notificaciones de Windows
- [ ] Inicio automático con Windows (opcional)
- [ ] Minimizar a bandeja del sistema
- [ ] Atajos de teclado
- [ ] Tema oscuro/claro
- [ ] Actualizaciones automáticas

---

## 🔧 Archivo main.js (Ejemplo)

```javascript
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'assets/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
  
  // Minimizar a bandeja en lugar de cerrar
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'assets/icon.ico'));
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Mostrar', click: () => mainWindow.show() },
    { label: 'Play/Pause', click: () => togglePlayback() },
    { type: 'separator' },
    { label: 'Salir', click: () => {
      app.isQuitting = true;
      app.quit();
    }}
  ]);
  
  tray.setContextMenu(contextMenu);
  tray.setToolTip('Selaiah Radio');
  
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```

---

## 🎨 Diseño

La aplicación de Windows tendrá:
- Interfaz moderna estilo Windows 11
- Controles nativos de Windows
- Soporte para tema oscuro/claro
- Integración con barra de tareas
- Notificaciones de Windows 10/11

---

## 🏃 Ejecutar la App

### Modo Desarrollo

```bash
npm start
```

### Compilar Instalador

```bash
# Compilar para Windows
npm run build:win

# El instalador se generará en dist/
```

---

## 📦 Distribución

### Opciones de Distribución

1. **Instalador NSIS** (.exe)
   - Instalación tradicional de Windows
   - Crea accesos directos
   - Registro en "Programas y características"

2. **Versión Portable** (.exe)
   - No requiere instalación
   - Ejecutar desde USB
   - Sin registro en el sistema

3. **Microsoft Store** (opcional)
   - Requiere cuenta de desarrollador ($19)
   - Actualizaciones automáticas
   - Mayor visibilidad

---

## 🔐 Firma de Código

Para distribución pública, se recomienda firmar el instalador:

```bash
# Requiere certificado de firma de código
# Aproximadamente $200-$400/año
```

---

## 🆙 Actualizaciones Automáticas

Usar `electron-updater`:

```bash
npm install electron-updater
```

Configurar en `main.js`:

```javascript
const { autoUpdater } = require('electron-updater');

autoUpdater.checkForUpdatesAndNotify();
```

---

## 🧪 Testing

```bash
# Instalar dependencias de testing
npm install --save-dev spectron
npm install --save-dev mocha
```

---

## 📝 Próximos Pasos

1. Crear estructura básica de Electron
2. Implementar reproductor de audio
3. Diseñar interfaz de usuario
4. Integrar con API backend
5. Implementar bandeja del sistema
6. Configurar notificaciones
7. Crear instalador
8. Firmar código (opcional)
9. Distribuir

---

## 🆘 Soporte

Para ayuda con la app Windows:
- Email: support@ihostcast.com
- Documentación Electron: https://www.electronjs.org/docs
- Electron Builder: https://www.electron.build

---

**iHostCast Ltd © 2025**
