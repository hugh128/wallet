import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, Vibrate, Volume2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800' }}
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
              value={true}
              onValueChange={() => {}}
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
              value={true}
              onValueChange={() => {}}
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
              value={true}
              onValueChange={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distancia de Alerta</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>10 metros</Text>
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