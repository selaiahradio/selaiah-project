#!/bin/bash

# ========================================
# SELAIAH RADIO - SETUP MOBILE
# Script de instalación automática
# iHostCast Ltd © 2025
# ========================================

set -e  # Salir si hay error

echo "========================================="
echo "🚀 SELAIAH RADIO - SETUP MOBILE"
echo "========================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "README.md" ]; then
    echo -e "${RED}❌ Error: Ejecuta este script desde la raíz del proyecto${NC}"
    exit 1
fi

echo -e "${BLUE}📱 Paso 1: Crear proyecto React Native${NC}"
npx react-native init SelaiahRadioMobile --version 0.72.0

cd SelaiahRadioMobile

echo ""
echo -e "${BLUE}📦 Paso 2: Instalar dependencias de navegación${NC}"
npm install @react-navigation/native@^6.1.9
npm install @react-navigation/stack@^6.3.20
npm install @react-navigation/bottom-tabs@^6.5.11
npm install react-native-screens@^3.27.0
npm install react-native-safe-area-context@^4.7.4
npm install react-native-gesture-handler@^2.13.4
npm install @react-native-masked-view/masked-view@^0.3.0

echo ""
echo -e "${BLUE}🌐 Paso 3: Instalar dependencias de red${NC}"
npm install axios@^1.6.0
npm install socket.io-client@^4.5.4
npm install @react-native-async-storage/async-storage@^1.19.5
npm install react-native-vector-icons@^10.0.2

echo ""
echo -e "${BLUE}🎵 Paso 4: Instalar reproductor de audio${NC}"
npm install react-native-track-player@^4.0.1

echo ""
echo -e "${BLUE}🔥 Paso 5: Instalar Firebase${NC}"
npm install @react-native-firebase/app@^18.6.1
npm install @react-native-firebase/auth@^18.6.1
npm install @react-native-firebase/messaging@^18.6.1

echo ""
echo -e "${BLUE}🛠️  Paso 6: Instalar utilidades${NC}"
npm install react-native-dotenv@^3.4.9
npm install date-fns@^2.30.0
npm install react-native-toast-message@^2.1.7

echo ""
echo -e "${BLUE}⚙️  Paso 7: Configurar variables de entorno${NC}"
cat > .env << 'EOF'
API_URL=http://localhost:3001
SOCKET_URL=http://localhost:3001
STREAM_URL=https://c34.radioboss.fm:8888/stream
EOF

echo ""
echo -e "${BLUE}📝 Paso 8: Configurar babel${NC}"
cat > babel.config.js << 'EOF'
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
EOF

echo ""
echo -e "${BLUE}📁 Paso 9: Crear estructura de carpetas${NC}"
mkdir -p src/{components,screens,services,navigation,utils,assets}
mkdir -p src/components/{Player,Auth,Shows,Events,News}
mkdir -p src/screens/{Home,Shows,Events,News,Profile}

echo ""
echo -e "${BLUE}🎵 Paso 10: Configurar Track Player${NC}"
cat > service.js << 'EOF'
import TrackPlayer from 'react-native-track-player';

module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
};
EOF

echo ""
echo -e "${BLUE}🤖 Paso 11: Limpiar Android${NC}"
if [ -d "android" ]; then
    cd android
    ./gradlew clean
    cd ..
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ INSTALACIÓN COMPLETADA${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "📱 Proyecto creado en: SelaiahRadioMobile"
echo ""
echo "🚀 Para ejecutar:"
echo "   cd SelaiahRadioMobile"
echo "   npm start"
echo ""
echo "   En otra terminal:"
echo "   npx react-native run-android  (Android)"
echo "   npx react-native run-ios      (iOS - solo macOS)"
echo ""
echo -e "${BLUE}📚 Lee SETUP-MOBILE.md para más información${NC}"
echo ""
