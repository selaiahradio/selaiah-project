// ========================================
// SELAIAH RADIO - HOME PAGE
// © 2025 Selaiah Radio
// ========================================

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid, 
  TextField,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Favorite, 
  CheckCircle, 
  RadioButtonChecked, 
  Smartphone, 
  Computer, 
  Cloud,
  Notifications,
  Chat,
  Event,
  Article
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import RadioPlayer from '../components/RadioPlayer';
import SalmosCarousel from '../components/SalmosCarousel';
import DonationModal from '../components/DonationModal';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulación de suscripción (aquí conectarías con tu backend)
    setTimeout(() => {
      toast.success('¡Gracias por suscribirte! Te mantendremos informado.');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  const handleDonate = () => {
    setDonationModalOpen(true);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Navbar />
      
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {/* Reproductor de Radio */}
        <Box sx={{ mb: 4 }}>
          <RadioPlayer />
        </Box>

        {/* Salmos del Día */}
        <Box sx={{ mb: 4 }}>
          <SalmosCarousel />
        </Box>

        {/* Alerta de Próximo Lanzamiento */}
        <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
              🚀 ¡Muy Pronto Estaremos Completamente en el Aire!
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
              Estamos trabajando para traerte la mejor experiencia de radio cristiana 24/7
            </Typography>
            <Chip 
              label="En Desarrollo" 
              color="warning" 
              size="large"
              sx={{ fontSize: '1.1rem', py: 3 }}
            />
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* Arquitectura y Funcionalidades */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle color="primary" />
                  Lo Que Viene
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <RadioButtonChecked color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Streaming de Radio 24/7"
                      secondary="Música cristiana, predicaciones y programas en vivo"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Chat color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Chat con IA para Pedir Canciones"
                      secondary="Interactúa con nuestra IA y solicita tus canciones favoritas"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Event color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Calendario de Shows y Eventos"
                      secondary="No te pierdas ningún programa o evento especial"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Article color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Noticias Cristianas con IA"
                      secondary="LocalNews y LastNews actualizadas constantemente"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Notifications color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Sistema de Notificaciones"
                      secondary="Recibe alertas de nuevas canciones y noticias importantes"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Smartphone color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Aplicación Móvil (Android)"
                      secondary="Escucha Selaiah Radio desde tu teléfono"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Computer color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Aplicación de Escritorio (Windows)"
                      secondary="Cliente nativo para tu computadora"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Cloud color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Red Social Integrada"
                      secondary="Comparte, comenta y conecta con otros oyentes"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Suscripción y Donación */}
          <Grid item xs={12} md={4}>
            {/* Botón de Donación */}
            <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Favorite sx={{ fontSize: 60, color: 'white', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Apoya Nuestro Ministerio
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', mb: 3 }}>
                  Tu donación nos ayuda a mantener la radio en el aire y alcanzar más vidas con el mensaje de Cristo
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth
                  onClick={handleDonate}
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#f5576c',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                  }}
                >
                  Donar Ahora
                </Button>
              </CardContent>
            </Card>

            {/* Formulario de Suscripción */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Notifications color="primary" />
                  Mantente Informado
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Suscríbete para recibir noticias sobre el lanzamiento oficial y nuevas funcionalidades
                </Typography>
                
                <form onSubmit={handleSubscribe}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Tu Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    margin="normal"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{ mt: 2 }}
                  >
                    {loading ? 'Suscribiendo...' : 'Suscribirme'}
                  </Button>
                </form>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  No spam. Solo actualizaciones importantes.
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />

      {/* Modal de Donación */}
      <DonationModal 
        open={donationModalOpen} 
        onClose={() => setDonationModalOpen(false)} 
      />
    </Box>
  );
}

export default Home;
