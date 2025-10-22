// ========================================
// SELAIAH RADIO - ADMIN PAGE
// iHostCast Ltd © 2025
// ========================================

import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Admin() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Panel de Administración
        </Typography>

        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Próximamente
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Panel de administración en desarrollo...
            </Typography>
          </CardContent>
        </Card>
      </Container>

      <Footer />
    </Box>
  );
}

export default Admin;
