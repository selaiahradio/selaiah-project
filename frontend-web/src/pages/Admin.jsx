// ========================================
// SELAIAH RADIO - ADMIN DASHBOARD
// Selaiah Radio Online LLC © 2025
// ========================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import {
  People,
  Radio,
  Event,
  Article,
  Settings,
  Dashboard as DashboardIcon,
  Delete,
  Edit,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Admin() {
  const [tab, setTab] = useState(0);
  const [stats, setStats] = useState({
    users: 0,
    shows: 0,
    events: 0,
    news: 0,
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar que el usuario sea admin
    if (!user || user.role !== 'admin') {
      toast.error('Acceso denegado. Solo administradores.');
      navigate('/');
      return;
    }

    // Cargar estadísticas
    loadStats();
  }, [user, navigate]);

  const loadStats = async () => {
    // Aquí cargarías las estadísticas reales desde el backend
    setStats({
      users: 150,
      shows: 12,
      events: 8,
      news: 45,
    });
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          🎛️ Panel de Administración
        </Typography>

        {/* Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {stats.users}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Usuarios
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 50, color: 'rgba(255,255,255,0.5)' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {stats.shows}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Shows
                    </Typography>
                  </Box>
                  <Radio sx={{ fontSize: 50, color: 'rgba(255,255,255,0.5)' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {stats.events}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Eventos
                    </Typography>
                  </Box>
                  <Event sx={{ fontSize: 50, color: 'rgba(255,255,255,0.5)' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {stats.news}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Noticias
                    </Typography>
                  </Box>
                  <Article sx={{ fontSize: 50, color: 'rgba(255,255,255,0.5)' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Card>
          <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab icon={<DashboardIcon />} label="Dashboard" />
            <Tab icon={<People />} label="Usuarios" />
            <Tab icon={<Radio />} label="Shows" />
            <Tab icon={<Event />} label="Eventos" />
            <Tab icon={<Article />} label="Noticias" />
            <Tab icon={<Settings />} label="Configuración" />
          </Tabs>

          <CardContent sx={{ minHeight: 400 }}>
            {/* Dashboard */}
            {tab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Resumen General
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Bienvenido al panel de administración de Selaiah Radio.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Desde aquí puedes gestionar usuarios, shows, eventos, noticias y toda la configuración de la plataforma.
                </Typography>
              </Box>
            )}

            {/* Usuarios */}
            {tab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Gestión de Usuarios</Typography>
                  <Button variant="contained" size="small">Agregar Usuario</Button>
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Administrador Selaiah</TableCell>
                        <TableCell>admin@selaiah.com</TableCell>
                        <TableCell><Chip label="Admin" color="error" size="small" /></TableCell>
                        <TableCell><Chip label="Activo" color="success" size="small" /></TableCell>
                        <TableCell>
                          <IconButton size="small"><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Shows */}
            {tab === 2 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Gestión de Shows</Typography>
                  <Button variant="contained" size="small">Crear Show</Button>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Aquí podrás gestionar todos los shows de la radio.
                </Typography>
              </Box>
            )}

            {/* Eventos */}
            {tab === 3 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Gestión de Eventos</Typography>
                  <Button variant="contained" size="small">Crear Evento</Button>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Aquí podrás gestionar todos los eventos de la radio.
                </Typography>
              </Box>
            )}

            {/* Noticias */}
            {tab === 4 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Gestión de Noticias</Typography>
                  <Button variant="contained" size="small">Crear Noticia</Button>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Aquí podrás gestionar todas las noticias de la radio.
                </Typography>
              </Box>
            )}

            {/* Configuración */}
            {tab === 5 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Configuración General
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Configuración de la plataforma:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Stream URL
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          https://c34.radioboss.fm:8888/stream
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          API Backend
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          https://selaiah-backend.onrender.com
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      <Footer />
    </Box>
  );
}

export default Admin;
