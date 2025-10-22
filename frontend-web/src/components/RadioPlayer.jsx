// ========================================
// SELAIAH RADIO - RADIO PLAYER COMPONENT
// Selaiah Radio Online LLC
// ========================================

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Slider,
  LinearProgress,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { radioAPI } from '../services/api';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';
const STREAM_URL = process.env.REACT_APP_STREAM_URL || 'https://c34.radioboss.fm:8888/stream';

function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [greeting, setGreeting] = useState(null);
  const [listeners, setListeners] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const audioRef = useRef(null);
  const socketRef = useRef(null);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    fetchNowPlaying();
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (isPlaying && hasJoinedRef.current) {
        radioAPI.listenerLeave().catch(console.error);
      }
    };
  }, []);

  const connectSocket = () => {
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current.on('connect', () => {
      console.log('Socket conectado');
    });

    socketRef.current.on('nowPlayingUpdate', (data) => {
      console.log('Canción actualizada:', data);
      setNowPlaying(data);
      toast.info(`🎵 Ahora: ${data.title} - ${data.artist}`);
    });

    socketRef.current.on('listenersUpdate', (data) => {
      setListeners(data.listeners);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket desconectado');
    });
  };

  const fetchNowPlaying = async () => {
    try {
      setLoading(true);
      const response = await radioAPI.getNowPlaying();

      if (response.data.success) {
        setNowPlaying(response.data.data.nowPlaying);
        setGreeting(response.data.data.greeting);
        setListeners(response.data.data.listeners);
      }
    } catch (error) {
      console.error('Error al obtener now playing:', error);
      // Si el endpoint no existe, usar datos por defecto
      setNowPlaying({
        title: 'Selaiah Radio',
        artist: 'En Vivo',
        album: 'Radio Cristiana 24/7'
      });
      setGreeting('¡Bienvenido a Selaiah Radio!');
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        if (hasJoinedRef.current) {
          await radioAPI.listenerLeave().catch(() => {});
          hasJoinedRef.current = false;
        }
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        if (!hasJoinedRef.current) {
          await radioAPI.listenerJoin().catch(() => {});
          hasJoinedRef.current = true;
        }
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error al reproducir:', error);
      toast.error('Error al reproducir el stream');
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? '💔 Quitado de favoritos' : '❤️ Añadido a favoritos');
  };

  if (loading) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent>
          <LinearProgress />
          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Cargando reproductor...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        maxWidth: 600, 
        mx: 'auto', 
        mt: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}
    >
      <CardContent>
        {/* Saludo */}
        {greeting && (
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            {greeting}
          </Typography>
        )}

        {/* Now Playing */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={nowPlaying?.albumArt || '/logo.svg'}
            sx={{ 
              width: 80, 
              height: 80, 
              mr: 2,
              bgcolor: 'transparent'
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {nowPlaying?.title || 'Selaiah Radio'}
            </Typography>
            <Typography variant="body2">
              {nowPlaying?.artist || 'En Vivo'}
            </Typography>
            <Typography variant="caption">
              {nowPlaying?.album || 'Radio Cristiana 24/7'}
            </Typography>
          </Box>
          <IconButton onClick={toggleLike} sx={{ color: 'white' }}>
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>

        {/* Controles */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <IconButton 
            onClick={togglePlay}
            sx={{ 
              bgcolor: 'white', 
              color: '#667eea',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              width: 64,
              height: 64
            }}
          >
            {isPlaying ? <Pause sx={{ fontSize: 40 }} /> : <PlayArrow sx={{ fontSize: 40 }} />}
          </IconButton>
        </Box>

        {/* Volumen */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={toggleMute} sx={{ color: 'white' }}>
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            sx={{ 
              mx: 2,
              color: 'white',
              '& .MuiSlider-thumb': {
                bgcolor: 'white'
              }
            }}
          />
          <Typography variant="body2">{volume}%</Typography>
        </Box>

        {/* Oyentes */}
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          👥 {listeners} oyentes conectados
        </Typography>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={STREAM_URL}
          preload="none"
        />
      </CardContent>
    </Card>
  );
}

export default RadioPlayer;
