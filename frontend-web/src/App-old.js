import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, MessageCircle, Calendar, Newspaper, Radio, Menu, X } from 'lucide-react';
import apiClient from './config/api';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [activeTab, setActiveTab] = useState('home');
  const [shows, setShows] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef(null);
  const streamUrl = process.env.REACT_APP_STREAM_URL || 'https://c34.radioboss.fm:8888/stream';

  // Cargar datos iniciales
  useEffect(() => {
    loadShows();
    loadEvents();
    loadNews();
  }, []);

  // Control de audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const loadShows = async () => {
    try {
      const response = await apiClient.get('/api/shows');
      if (response.data.success) {
        setShows(response.data.shows);
      }
    } catch (error) {
      console.error('Error cargando shows:', error);
    }
  };

  const loadEvents = async () => {
    try {
      const response = await apiClient.get('/api/events');
      if (response.data.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.error('Error cargando eventos:', error);
    }
  };

  const loadNews = async () => {
    try {
      const response = await apiClient.get('/api/news');
      if (response.data.success) {
        setNews(response.data.news);
      }
    } catch (error) {
      console.error('Error cargando noticias:', error);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('/api/ai/chat', {
        message: chatInput
      });

      if (response.data.success) {
        const aiMessage = { role: 'assistant', content: response.data.response };
        setChatMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error en chat:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Lo siento, hubo un error. Por favor intenta de nuevo.' 
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getDayName = (dayNum) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNum] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-30 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Radio className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold">Selaiah Radio</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 rounded-lg transition ${activeTab === 'home' ? 'bg-blue-600' : 'hover:bg-white hover:bg-opacity-10'}`}
              >
                Inicio
              </button>
              <button 
                onClick={() => setActiveTab('shows')}
                className={`px-4 py-2 rounded-lg transition ${activeTab === 'shows' ? 'bg-blue-600' : 'hover:bg-white hover:bg-opacity-10'}`}
              >
                Shows
              </button>
              <button 
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 rounded-lg transition ${activeTab === 'events' ? 'bg-blue-600' : 'hover:bg-white hover:bg-opacity-10'}`}
              >
                Eventos
              </button>
              <button 
                onClick={() => setActiveTab('news')}
                className={`px-4 py-2 rounded-lg transition ${activeTab === 'news' ? 'bg-blue-600' : 'hover:bg-white hover:bg-opacity-10'}`}
              >
                Noticias
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2">
              <button 
                onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                Inicio
              </button>
              <button 
                onClick={() => { setActiveTab('shows'); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                Shows
              </button>
              <button 
                onClick={() => { setActiveTab('events'); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                Eventos
              </button>
              <button 
                onClick={() => { setActiveTab('news'); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                Noticias
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Bienvenido a Selaiah Radio</h2>
              <p className="text-xl text-blue-200">Tu radio cristiana 24/7</p>
            </div>

            {/* Player Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Radio className="w-16 h-16" />
                </div>

                <h3 className="text-2xl font-bold">En Vivo Ahora</h3>

                <button
                  onClick={togglePlay}
                  className="w-20 h-20 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition transform hover:scale-105 shadow-lg"
                >
                  {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
                </button>

                <div className="w-full flex items-center space-x-4">
                  <Volume2 className="w-6 h-6" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm">{Math.round(volume * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                <h3 className="text-xl font-bold mb-2">Shows</h3>
                <p className="text-blue-200">{shows.length} programas activos</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Eventos</h3>
                <p className="text-blue-200">{events.length} próximos eventos</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-center">
                <Newspaper className="w-12 h-12 mx-auto mb-3 text-pink-400" />
                <h3 className="text-xl font-bold mb-2">Noticias</h3>
                <p className="text-blue-200">{news.length} noticias recientes</p>
              </div>
            </div>
          </div>
        )}

        {/* Shows Tab */}
        {activeTab === 'shows' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Programación</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shows.length > 0 ? shows.map((show) => (
                <div key={show._id} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-2">{show.title}</h3>
                  <p className="text-blue-200 mb-3">{show.description}</p>
                  {show.schedule && (
                    <div className="text-sm">
                      <p><strong>Día:</strong> {getDayName(show.schedule.dayOfWeek)}</p>
                      <p><strong>Horario:</strong> {show.schedule.startTime} - {show.schedule.endTime}</p>
                    </div>
                  )}
                  {show.host && <p className="text-sm mt-2"><strong>Host:</strong> {show.host}</p>}
                </div>
              )) : (
                <p className="text-blue-200 col-span-full text-center py-8">No hay shows disponibles</p>
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Próximos Eventos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {events.length > 0 ? events.map((event) => (
                <div key={event._id} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-blue-200 mb-3">{event.description}</p>
                  <div className="text-sm space-y-1">
                    <p><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString('es-ES')}</p>
                    {event.location && <p><strong>Lugar:</strong> {event.location}</p>}
                  </div>
                </div>
              )) : (
                <p className="text-blue-200 col-span-full text-center py-8">No hay eventos próximos</p>
              )}
            </div>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Últimas Noticias</h2>
            <div className="space-y-6">
              {news.length > 0 ? news.map((item) => (
                <div key={item._id} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold flex-1">{item.title}</h3>
                    <span className="text-xs bg-blue-600 px-3 py-1 rounded-full ml-4">{item.category}</span>
                  </div>
                  <p className="text-blue-100 mb-3">{item.content}</p>
                  <div className="text-sm text-blue-300">
                    {item.author && <span>Por {item.author} • </span>}
                    <span>{new Date(item.createdAt).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              )) : (
                <p className="text-blue-200 text-center py-8">No hay noticias disponibles</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110 z-40"
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col z-40">
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <h3 className="font-bold">Chat con IA</h3>
            <button onClick={() => setIsChatOpen(false)} className="hover:bg-blue-700 rounded p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 && (
              <p className="text-gray-500 text-center mt-8">
                ¡Hola! Pregúntame sobre programas, eventos o pide una canción.
              </p>
            )}
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white ml-8'
                    : 'bg-gray-200 text-gray-800 mr-8'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg mr-8">
                Escribiendo...
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-300">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={sendChatMessage}
                disabled={isLoading || !chatInput.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audio Element */}
      <audio ref={audioRef} src={streamUrl} preload="none" />

      {/* Footer */}
      <footer className="bg-black bg-opacity-30 backdrop-blur-md mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200 font-medium">Selaiah Radio Online LLC</p>
          <p className="text-blue-200">© 2025 Selaiah Radio Online - Todos los derechos reservados</p>
          <p className="text-sm text-blue-300 mt-2">Tu radio cristiana 24/7</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
