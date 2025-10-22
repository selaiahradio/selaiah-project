// ========================================
// SELAIAH RADIO - FOOTER COMPONENT
// Selaiah Radio Online LLC
// ========================================

import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        bgcolor: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" sx={{ fontWeight: 500 }}>
          Selaiah Radio Online LLC
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 0.5 }}>
          © 2025 Selaiah Radio Online - Todos los derechos reservados
        </Typography>
        <Typography variant="caption" align="center" display="block" sx={{ mt: 1 }}>
          Tu radio cristiana 24/7
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
