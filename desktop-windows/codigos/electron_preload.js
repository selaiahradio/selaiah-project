const { contextBridge, ipcRenderer } = require('electron');

// Exponer APIs al renderer de forma segura
contextBridge.exposeInMainWorld('electronAPI', {
  // Store (almacenamiento local)
  store: {
    get: (key) => ipcRenderer.invoke('get-store', key),
    set: (key, value) => ipcRenderer.invoke('set-store', key, value),
    delete: (key) => ipcRenderer.invoke('delete-store', key),
    clear: () => ipcRenderer.invoke('clear-store'),
  },

  // Eventos del sistema
  onTogglePlay: (callback) => {
    ipcRenderer.on('toggle-play', callback);
  },

  // Info del sistema
  platform: process.platform,
  version: process.versions.electron,
});

// Variables de entorno
contextBridge.exposeInMainWorld('env', {
  API_URL: process.env.API_URL || 'http://localhost:5000/api',
  SOCKET_URL: process.env.SOCKET_URL || 'http://localhost:5000',
  STREAM_URL: process.env.STREAM_URL || 'https://stream.selaiahradio.com/live',
});
