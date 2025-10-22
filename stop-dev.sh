#!/bin/bash

# ========================================
# SELAIAH RADIO - DETENER SERVICIOS
# iHostCast Ltd © 2025
# ========================================

echo "========================================="
echo "🛑 DETENIENDO SERVICIOS DE DESARROLLO"
echo "========================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Detener Backend (puerto 3001)
echo -e "${YELLOW}🔧 Deteniendo Backend...${NC}"
if lsof -ti:3001 > /dev/null 2>&1; then
    lsof -ti:3001 | xargs kill -9
    echo -e "${GREEN}✅ Backend detenido${NC}"
else
    echo -e "${YELLOW}⚠️  Backend no estaba corriendo${NC}"
fi

# Detener Frontend (puerto 3000)
echo -e "${YELLOW}🌐 Deteniendo Frontend...${NC}"
if lsof -ti:3000 > /dev/null 2>&1; then
    lsof -ti:3000 | xargs kill -9
    echo -e "${GREEN}✅ Frontend detenido${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend no estaba corriendo${NC}"
fi

# Detener nodemon
echo -e "${YELLOW}📦 Deteniendo procesos nodemon...${NC}"
pkill -f "nodemon server.js" 2>/dev/null && echo -e "${GREEN}✅ Nodemon detenido${NC}" || echo -e "${YELLOW}⚠️  Nodemon no estaba corriendo${NC}"

# Preguntar si quiere detener MongoDB
echo ""
echo -e "${YELLOW}¿Deseas detener MongoDB también? (s/n)${NC}"
read -r response
if [[ "$response" =~ ^([sS][iI]|[sS])$ ]]; then
    echo -e "${YELLOW}📊 Deteniendo MongoDB...${NC}"
    pkill -f "mongod" 2>/dev/null
    sleep 2
    if mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
        echo -e "${RED}❌ MongoDB aún está corriendo${NC}"
    else
        echo -e "${GREEN}✅ MongoDB detenido${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  MongoDB sigue corriendo${NC}"
fi

echo ""
echo "========================================="
echo -e "${GREEN}✅ SERVICIOS DETENIDOS${NC}"
echo "========================================="
echo ""
