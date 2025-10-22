// ========================================
// SELAIAH RADIO - SALMOS CAROUSEL
// © 2025 Selaiah Radio
// ========================================

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  NavigateBefore, 
  NavigateNext,
  AutorenewOutlined
} from '@mui/icons-material';

const salmos = [
  {
    numero: 23,
    titulo: "El Señor es mi Pastor",
    versiculo: "El Señor es mi pastor, nada me falta; en verdes pastos me hace descansar. Junto a tranquilas aguas me conduce; me infunde nuevas fuerzas.",
    referencia: "Salmo 23:1-3"
  },
  {
    numero: 91,
    titulo: "Protección del Altísimo",
    versiculo: "El que habita al abrigo del Altísimo se acoge a la sombra del Todopoderoso. Yo le digo al Señor: «Tú eres mi refugio, mi fortaleza, el Dios en quien confío».",
    referencia: "Salmo 91:1-2"
  },
  {
    numero: 46,
    titulo: "Dios es Nuestro Amparo",
    versiculo: "Dios es nuestro amparo y nuestra fortaleza, nuestra ayuda segura en momentos de angustia. Por eso, no temeremos aunque se desmorone la tierra.",
    referencia: "Salmo 46:1-2"
  },
  {
    numero: 27,
    titulo: "El Señor es mi Luz",
    versiculo: "El Señor es mi luz y mi salvación; ¿a quién temeré? El Señor es el baluarte de mi vida; ¿quién podrá amedrentarme?",
    referencia: "Salmo 27:1"
  },
  {
    numero: 121,
    titulo: "El Guardián de Israel",
    versiculo: "A las montañas levanto mis ojos; ¿de dónde ha de venir mi ayuda? Mi ayuda proviene del Señor, creador del cielo y de la tierra.",
    referencia: "Salmo 121:1-2"
  },
  {
    numero: 103,
    titulo: "Alaba, Alma Mía",
    versiculo: "Alaba, alma mía, al Señor; alabe todo mi ser su santo nombre. Alaba, alma mía, al Señor, y no olvides ninguno de sus beneficios.",
    referencia: "Salmo 103:1-2"
  },
  {
    numero: 37,
    titulo: "Confía en el Señor",
    versiculo: "Confía en el Señor y haz el bien; establécete en la tierra y mantente fiel. Deléitate en el Señor, y él te concederá los deseos de tu corazón.",
    referencia: "Salmo 37:3-4"
  },
  {
    numero: 119,
    titulo: "La Palabra de Dios",
    versiculo: "Tu palabra es una lámpara a mis pies; es una luz en mi sendero. Hice un juramento, y lo he confirmado: que acataré tus rectos juicios.",
    referencia: "Salmo 119:105-106"
  },
  {
    numero: 139,
    titulo: "Dios Conoce Todo",
    versiculo: "Señor, tú me examinas, tú me conoces. Sabes cuándo me siento y cuándo me levanto; aun a la distancia me lees el pensamiento.",
    referencia: "Salmo 139:1-2"
  },
  {
    numero: 150,
    titulo: "Alaben al Señor",
    versiculo: "¡Aleluya! ¡Alaben a Dios en su santuario! ¡Alábenlo en su poderoso firmamento! ¡Alábenlo por sus proezas! ¡Alábenlo por su inmensa grandeza!",
    referencia: "Salmo 150:1-2"
  }
];

function SalmosCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [intervalTime] = useState(10000); // 10 segundos por defecto

  useEffect(() => {
    let interval;
    let progressInterval;

    if (isPlaying) {
      // Intervalo para cambiar de salmo
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % salmos.length);
        setProgress(0);
      }, intervalTime);

      // Intervalo para la barra de progreso
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (100 / (intervalTime / 100));
        });
      }, 100);
    }

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isPlaying, intervalTime]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + salmos.length) % salmos.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % salmos.length);
    setProgress(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      setProgress(0);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const currentSalmo = salmos[currentIndex];

  return (
    <Card 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: 'rgba(255,255,255,0.2)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'white'
          }
        }}
      />
      
      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="overline" sx={{ opacity: 0.9 }}>
            Salmo del Día
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {currentIndex + 1} / {salmos.length}
          </Typography>
        </Box>

        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2
          }}
        >
          📖 Salmo {currentSalmo.numero}
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            fontStyle: 'italic',
            opacity: 0.95,
            mb: 3
          }}
        >
          {currentSalmo.titulo}
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            mb: 2,
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          "{currentSalmo.versiculo}"
        </Typography>

        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            textAlign: 'center',
            opacity: 0.8,
            fontStyle: 'italic',
            mb: 3
          }}
        >
          {currentSalmo.referencia}
        </Typography>

        {/* Controles */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 1
          }}
        >
          <Tooltip title="Reiniciar">
            <IconButton 
              onClick={handleReset}
              sx={{ color: 'white' }}
              size="small"
            >
              <AutorenewOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Anterior">
            <IconButton 
              onClick={handlePrevious}
              sx={{ color: 'white' }}
            >
              <NavigateBefore />
            </IconButton>
          </Tooltip>

          <Tooltip title={isPlaying ? "Pausar" : "Reproducir"}>
            <IconButton 
              onClick={handlePlayPause}
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.2)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)'
                }
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Siguiente">
            <IconButton 
              onClick={handleNext}
              sx={{ color: 'white' }}
            >
              <NavigateNext />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SalmosCarousel;
