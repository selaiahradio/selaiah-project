// ========================================
// SELAIAH RADIO - AUTH PAGE
// © 2025 Selaiah Radio
// ========================================

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Auth({ mode = 'login' }) {
  const [tab, setTab] = useState(mode === 'login' ? 0 : 1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'oyente',
  });

  useEffect(() => {
    setTab(mode === 'login' ? 0 : 1);
  }, [mode]);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const { user } = response.data;
        login(null, user, '¡Bienvenido de vuelta!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error en login:', error);
      toast.error(error.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
      });

      if (response.data.success) {
        const { user } = response.data;
        login(null, user, '¡Registro exitoso! Bienvenido');
        navigate('/');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      toast.error(error.response?.data?.error || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 2 }}>
          <IconButton component={Link} to="/" sx={{ color: 'white' }}>
            <ArrowBack />
          </IconButton>
        </Box>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
              🎵 Selaiah Radio
            </Typography>

            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered sx={{ mb: 3 }}>
              <Tab label="Iniciar Sesión" />
              <Tab label="Registrarse" />
            </Tabs>

            {tab === 0 ? (
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3 }}
                >
                  {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Tipo de Usuario</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Tipo de Usuario"
                  >
                    <MenuItem value="oyente">Oyente (Usuario Normal)</MenuItem>
                    <MenuItem value="locutor">Locutor / DJ</MenuItem>
                    <MenuItem value="editor">Editor de Contenido</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3 }}
                >
                  {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Auth;
