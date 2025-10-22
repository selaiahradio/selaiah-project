// ========================================
// SELAIAH RADIO - DONATION MODAL
// © 2025 Selaiah Radio
// ========================================

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Chip,
  InputAdornment,
  Alert,
  FormControlLabel,
  Switch,
  Divider
} from '@mui/material';
import { Favorite, AttachMoney, Person, Email, Phone, AccountCircle, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

const PAYPAL_EMAIL = 'selaiahradio@gmail.com';

const PRESET_AMOUNTS = [
  { value: 1, label: '$1' },
  { value: 5, label: '$5' },
  { value: 10, label: '$10' },
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
  { value: 100, label: '$100' },
  { value: 500, label: '$500' },
  { value: 1000, label: '$1,000' }
];

function DonationModal({ open, onClose }) {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  
  // Información del donante
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    username: ''
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [useUsername, setUseUsername] = useState(false);

  const handlePresetClick = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Solo permitir números y punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setAmount(value);
    }
  };

  const handleDonorInfoChange = (field, value) => {
    setDonorInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDonate = async () => {
    const donationAmount = amount || customAmount;
    
    // Validar monto
    if (!donationAmount || parseFloat(donationAmount) < 1) {
      toast.error('Por favor ingresa un monto válido (mínimo $1)');
      return;
    }

    if (parseFloat(donationAmount) > 100000000) {
      toast.warning('¡Wow! Ese es un monto muy generoso. Por favor contacta directamente con nosotros para donaciones mayores a $100,000,000');
      return;
    }

    // Validar información del donante (si no es anónimo)
    if (!isAnonymous) {
      if (!donorInfo.name.trim()) {
        toast.error('Por favor ingresa tu nombre');
        return;
      }
      if (!donorInfo.email.trim()) {
        toast.error('Por favor ingresa tu email');
        return;
      }
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(donorInfo.email)) {
        toast.error('Por favor ingresa un email válido');
        return;
      }
    }

    // Preparar datos de la donación
    const donationData = {
      amount: parseFloat(donationAmount),
      message: message,
      isAnonymous: isAnonymous,
      timestamp: new Date().toISOString()
    };

    // Si no es anónimo, agregar información del donante
    if (!isAnonymous) {
      donationData.donor = {
        name: donorInfo.name,
        email: donorInfo.email,
        phone: donorInfo.phone || null,
        username: donorInfo.username || null,
        displayName: useUsername && donorInfo.username ? donorInfo.username : donorInfo.name
      };
    }

    try {
      // Aquí enviarías los datos al backend para registrar al usuario
      // Por ahora, solo mostramos un mensaje
      console.log('Datos de donación:', donationData);
      
      // TODO: Enviar al backend
      // const response = await axios.post('/api/donations/register', donationData);
      
      toast.success('¡Gracias por tu generosidad! Redirigiendo a PayPal...');
      
      // Crear URL de PayPal
      const paypalUrl = `https://www.paypal.com/paypalme/${PAYPAL_EMAIL.split('@')[0]}/${donationAmount}USD`;
      
      // Abrir PayPal en nueva ventana después de un breve delay
      setTimeout(() => {
        window.open(paypalUrl, '_blank');
      }, 1000);
      
      // Cerrar modal
      setTimeout(() => {
        onClose();
        resetForm();
      }, 1500);
      
    } catch (error) {
      console.error('Error al procesar donación:', error);
      toast.error('Hubo un error. Por favor intenta nuevamente.');
    }
  };

  const resetForm = () => {
    setAmount('');
    setCustomAmount('');
    setMessage('');
    setDonorInfo({
      name: '',
      email: '',
      phone: '',
      username: ''
    });
    setIsAnonymous(false);
    setUseUsername(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', color: 'white', pb: 1 }}>
        <Favorite sx={{ fontSize: 50, mb: 1 }} />
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          Apoya Nuestro Ministerio
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: 'white', mx: 2, borderRadius: 2, mt: 1 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          Tu donación nos ayuda a mantener la radio en el aire y alcanzar más vidas con el mensaje de Cristo
        </Typography>

        {/* Montos Predefinidos */}
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Selecciona un monto:
        </Typography>
        <Grid container spacing={1} sx={{ mb: 3 }}>
          {PRESET_AMOUNTS.map((preset) => (
            <Grid item xs={3} key={preset.value}>
              <Chip
                label={preset.label}
                onClick={() => handlePresetClick(preset.value)}
                color={amount === preset.value ? 'primary' : 'default'}
                sx={{
                  width: '100%',
                  height: 40,
                  fontSize: '1rem',
                  fontWeight: amount === preset.value ? 'bold' : 'normal',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s'
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Monto Personalizado */}
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
          O ingresa un monto personalizado:
        </Typography>
        <TextField
          fullWidth
          type="text"
          value={customAmount}
          onChange={handleCustomAmountChange}
          placeholder="Ingresa el monto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                USD
              </InputAdornment>
            )
          }}
          sx={{ mb: 3 }}
        />

        <Divider sx={{ my: 3 }} />

        {/* Información del Donante */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Tu Información
        </Typography>

        {/* Switch Anónimo */}
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch 
                checked={isAnonymous} 
                onChange={(e) => setIsAnonymous(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VisibilityOff fontSize="small" />
                <Typography variant="body2">Donar como Anónimo/Privado</Typography>
              </Box>
            }
          />
        </Box>

        {!isAnonymous && (
          <>
            {/* Nombre */}
            <TextField
              fullWidth
              required
              label="Nombre Completo"
              value={donorInfo.name}
              onChange={(e) => handleDonorInfoChange('name', e.target.value)}
              placeholder="Juan Pérez"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />

            {/* Email */}
            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              value={donorInfo.email}
              onChange={(e) => handleDonorInfoChange('email', e.target.value)}
              placeholder="tu@email.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />

            {/* Teléfono (Opcional) */}
            <TextField
              fullWidth
              label="Teléfono (Opcional)"
              value={donorInfo.phone}
              onChange={(e) => handleDonorInfoChange('phone', e.target.value)}
              placeholder="+1 234 567 8900"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />

            {/* Username (Opcional) */}
            <TextField
              fullWidth
              label="Username (Opcional)"
              value={donorInfo.username}
              onChange={(e) => handleDonorInfoChange('username', e.target.value)}
              placeholder="@usuario"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
              helperText="Para usar en la red social y tienda"
              sx={{ mb: 2 }}
            />

            {/* Switch para usar username */}
            {donorInfo.username && (
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={useUsername} 
                      onChange={(e) => setUseUsername(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Mostrar como "{donorInfo.username}" en lugar de "{donorInfo.name}"
                    </Typography>
                  }
                />
              </Box>
            )}

            <Alert severity="info" sx={{ mb: 2 }}>
              Tu información será registrada para futuros accesos a la red social y tienda.
            </Alert>
          </>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Mensaje Opcional */}
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Mensaje (opcional):
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Deja un mensaje de bendición..."
          sx={{ mb: 2 }}
        />

        {/* Información de PayPal */}
        <Alert severity="info" sx={{ mb: 2 }}>
          Serás redirigido a PayPal para completar tu donación de forma segura.
        </Alert>

        {/* Monto Seleccionado */}
        {(amount || customAmount) && (
          <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
              ${parseFloat(amount || customAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Monto a donar
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: 'white', mx: 2, mb: 2, borderRadius: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button 
          onClick={handleDonate}
          variant="contained"
          size="large"
          disabled={!amount && !customAmount}
          sx={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            px: 4,
            '&:hover': {
              background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)'
            }
          }}
        >
          Donar con PayPal
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DonationModal;
