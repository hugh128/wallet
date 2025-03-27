import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Shield, ShieldAlert } from 'lucide-react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function WalletScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [distance, setDistance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    registerForPushNotificationsAsync();
    
    const interval = setInterval(() => {
      const newDistance = Math.random() * 20;
      setDistance(newDistance);
      
      if (isEnabled && newDistance > 10) {
        sendNotification();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isEnabled]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Alerta de Billetera!",
        body: "Tu billetera se está alejando demasiado.",
        data: { data: 'goes here' },
      },
      trigger: null,
    });
  };

  const getStatusColor = () => {
    if (!isEnabled) return '#999';
    return distance > 10 ? '#FF6B6B' : '#4CAF50';
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1557683304-673a23048d34?q=80&w=1700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Estado de tu Billetera</Text>
          <Text style={styles.headerSubtitle}>Mantén tu billetera segura</Text>
        </View>

        <View style={styles.mainCard}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]}>
            {isEnabled ? (
              distance > 10 ? (
                <ShieldAlert size={40} color="#fff" />
              ) : (
                <Shield size={40} color="#fff" />
              )
            ) : (
              <Shield size={40} color="#fff" />
            )}
          </View>
          
          <Text style={styles.statusText}>
            {isEnabled 
              ? (distance > 10 
                ? '¡Alerta! Billetera alejada'
                : 'Billetera cerca y segura')
              : 'Monitoreo desactivado'}
          </Text>
          
          <Text style={styles.distanceText}>
            {distance.toFixed(1)} metros de distancia
          </Text>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {isEnabled ? 'Monitoreo activo' : 'Activar monitoreo'}
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#FF6B6B' }}
              thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Consejos de Seguridad</Text>
          <Text style={styles.infoText}>
            • Mantén el monitoreo activo cuando estés fuera de casa{'\n'}
            • Configura la distancia de alerta en los ajustes{'\n'}
            • Revisa las notificaciones regularmente
          </Text>
        </View>
      </View>
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('No se pudo obtener el permiso para las notificaciones');
      return;
    }
  } else {
    alert('Las notificaciones requieren un dispositivo físico');
  }
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
  header: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  mainCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statusIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  distanceText: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    lineHeight: 24,
  },
});