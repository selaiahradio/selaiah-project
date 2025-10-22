import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Badge,
  Divider,
  InputAdornment,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Send,
  AttachFile,
  Mic,
  Videocam,
  EmojiEmotions,
  MoreVert,
  Search,
  Phone,
} from '@mui/icons-material';
import axios from 'axios';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(