import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';
import { COLORS, SIZES } from '../utils/constants';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Icon name={icon} size={24} color={COLORS.primary} />
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      {showArrow && <Icon name="chevron-right" size={24} color={COLORS.gray} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editButton}>
              <Icon name="edit" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {user?.gender === 'male' ? '👨 Varón' : user?.gender === 'female' ? '👩 Hermana' : '👤 Usuario'}
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="person"
              title="Editar Perfil"
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            />
            <MenuItem
              icon="lock"
              title="Cambiar Contraseña"
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            />
            <MenuItem
              icon="notifications"
              title="Notificaciones"
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contenido</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="favorite"
              title="Canciones Favoritas"
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            />
            <MenuItem
              icon="history"
              title="Historial"
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            />
            <MenuItem
              icon="playlist-play"
              title="Mis Playlists"
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="language"
              title="Idioma"
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            />
            <MenuItem
              icon="help"
              title="Ayuda y Soporte"
              onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            />
            <MenuItem
              icon="info"
              title="Acerca de"
              onPress={() => Alert.alert('Selaiah Radio', 'Versión 1.0.0\n\nDesarrollado por iHostCast Ltd')}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color={COLORS.error} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 iHostCast Ltd</Text>
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
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SIZES.padding,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  name: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.base / 2,
  },
  email: {
    fontSize: SIZES.body1,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  badge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: SIZES.body2,
    fontWeight: '600',
  },
  section: {
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.body1,
    fontWeight: '600',
    color: COLORS.gray,
    marginLeft: SIZES.padding * 2,
    marginBottom: SIZES.base,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.padding,
  },
  menuTitle: {
    fontSize: SIZES.body1,
    color: COLORS.black,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.padding,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding * 2,
    marginVertical: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 1.5,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: SIZES.h4,
    color: COLORS.error,
    fontWeight: '600',
  },