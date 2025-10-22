import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import RadioPlayer from '../components/RadioPlayer';
import { useAuth } from '../context/AuthContext';
import { radioAPI } from '../services/api';
import { COLORS, SIZES } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [greeting, setGreeting] = useState(null);

  useEffect(() => {
    fetchGreeting();
  }, []);

  const fetchGreeting = async () => {
    try {
      const response = await radioAPI.getNowPlaying();
      if (response.data.success) {
        setGreeting(response.data.data.greeting);
      }
    } catch (error) {
      console.error('Error fetching greeting:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>🎵 Selaiah Radio</Text>
            <Text style={styles.headerSubtitle}>{user?.name}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="logout" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <RadioPlayer greeting={greeting} />

        {/* Info adicional */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📻 Radio en vivo 24/7</Text>
          <Text style={styles.infoText}>
            Disfruta de la mejor música cristiana las 24 horas del día
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="favorite" size={32} color={COLORS.error} />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>

          <View style={styles.statCard}>
            <Icon name="history" size={32} color={COLORS.primary} />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Historial</Text>
          </View>

          <View style={styles.statCard}>
            <Icon name="playlist-play" size={32} color={COLORS.success} />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingVertical: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding * 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.base / 2,
  },
  headerSubtitle: {
    fontSize: SIZES.body1,
    color: COLORS.white,
    opacity: 0.8,
  },
  logoutButton: {
    padding: SIZES.base,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SIZES.padding,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    marginTop: SIZES.padding * 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.base,
  },
  infoText: {
    fontSize: SIZES.body1,
    color: COLORS.gray,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.padding * 2,
    gap: SIZES.padding,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: SIZES.base,
  },
  statLabel: {
    fontSize: SIZES.body2,
    color: COLORS.gray,
    marginTop: SIZES.base / 2,
  },
});

export default HomeScreen;
