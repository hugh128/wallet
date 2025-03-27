import { View, Text, StyleSheet, TouchableOpacity, Switch, Image, TextInput } from 'react-native'; // Importa TextInput
import { useRouter } from 'expo-router';
import { Bell, Vibrate, Volume2 } from 'lucide-react-native';
import React, { useState } from 'react';

export default function SettingsScreen() {
  const router = useRouter();

  // Estados para los switches
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [vibration, setVibration] = useState(true);

  // Estado para la distancia de alerta
  const [distance, setDistance] = useState('10'); // valor inicial

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1557683304-673a23048d34?q=80&w=1700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Configuración</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color="#fff" />
              <Text style={styles.settingText}>Notificaciones Push</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#FF6B6B' }}
              thumbColor="#fff"
              ios_backgroundColor="#3e3e3e"
              value={notifications} // Estado de Notificaciones
              onValueChange={(value) => setNotifications(value)} // Actualiza el estado
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Volume2 size={20} color="#fff" />
              <Text style={styles.settingText}>Sonidos</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#FF6B6B' }}
              thumbColor="#fff"
              ios_backgroundColor="#3e3e3e"
              value={sounds} // Estado de Sonidos
              onValueChange={(value) => setSounds(value)} // Actualiza el estado
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Vibrate size={20} color="#fff" />
              <Text style={styles.settingText}>Vibración</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#FF6B6B' }}
              thumbColor="#fff"
              ios_backgroundColor="#3e3e3e"
              value={vibration} // Estado de Vibración
              onValueChange={(value) => setVibration(value)} // Actualiza el estado
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distancia de Alerta</Text>
          <View style={styles.settingItem}>
            {/* Aquí cambiamos el Text por un TextInput */}
            <TextInput
              style={styles.input}
              value={distance}
              onChangeText={setDistance} // Actualiza el estado cuando el texto cambia
              keyboardType="numeric" // Solo permite ingresar números
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  section: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
    opacity: 0.9,
  },
  input: {
    height: 40,
    borderColor: '#FF6B6B',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#fff',
    width: '100%',
    backgroundColor: '#333', // Fondo oscuro para el campo de texto
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
