#!/bin/bash

# ========================================
# SELAIAH RADIO - DESARROLLO
# Script de inicio rápido
# iHostCast Ltd © 2025
# ========================================

echo "========================================="
echo "🎵 SELAIAH RADIO - INICIO DE DESARROLLO"
echo "========================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar MongoDB
echo -e "${YELLOW}📊 Verificando MongoDB...${NC}"
if mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ MongoDB está corriendo${NC}"
else
    echo -e "${YELLOW}⚠️  MongoDB no está corriendo. Iniciando...${NC}"
    mongod --dbpath /usr/local/var/mongodb --bind_ip 127.0.0.1 --port 27017 --nounixsocket --logpath /usr/local/var/log/mongodb/mongo-no-socket.log --fork
    sleep 2
    if mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ MongoDB iniciado correctamente${NC}"
    else
        echo -e "${RED}❌ Error al iniciar MongoDB${NC}"
        exit 1
    fi
fi

echo ""

# Verificar si el puerto 3001 está en uso
echo -e "${YELLOW}🔍 Verificando puerto 3001...${NC}"
if lsof -ti:3001 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Puerto 3001 en uso. Liberando...${NC}"
    lsof -ti:3001 | xargs kill -9
    sleep 1
fi

echo ""

# Iniciar Backend
echo -e "${YELLOW}🚀 Iniciando Backend (puerto 3001)...${NC}"
cd backend
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"

# Esperar a que el backend esté listo
echo -e "${YELLOW}⏳ Esperando a que el backend esté listo...${NC}"
sleep 5

# Verificar que el backend está corriendo
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend operacional${NC}"
else
    echo -e "${RED}❌ Error: Backend no responde${NC}"
    exit 1
fi

echo ""

# Preguntar si quiere iniciar el frontend
echo -e "${YELLOW}¿Deseas iniciar el Frontend Web? (s/n)${NC}"
read -r response
if [[ "$response" =~ ^([sS][iI]|[sS])$ ]]; then
    echo -e "${YELLOW}🌐 Iniciando Frontend Web (puerto 3000)...${NC}"
    cd ../frontend-web
    npm start > ../logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
    cd ..
fi

echo ""
echo "========================================="
echo -e "${GREEN}✅ SERVICIOS INICIADOS${NC}"
echo "========================================="
echo ""
echo "📊 MongoDB:  mongodb://localhost:27017/selaiah"
echo "🔧 Backend:  http://localhost:3001"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "📋 Logs disponibles en:"
echo "   - logs/backend.log"
echo "   - logs/frontend.log"
echo ""
echo "Para detener los servicios:"
echo "   kill $BACKEND_PID"
if [ ! -z "$FRONTEND_PID" ]; then
    echo "   kill $FRONTEND_PID"
fi
echo ""
echo "O ejecuta: ./stop-dev.sh"
echo ""
echo "========================================="
