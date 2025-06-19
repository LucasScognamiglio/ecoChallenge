import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Por favor, ingrese su correo electrónico');
      return;
    }
    if (email === 'ADMIN') {
      navigation.navigate('HomeScreen');
      return;
    }
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const user = result.map(req => JSON.parse(req[1])).find(u => u.email === email);
      if (user) {
        Alert.alert('¡Bienvenido!', `Hola, ${user.userName}`);
        navigation.navigate('UserPanel', {
          userName: user.userName,
          nivel: user.nivel || 'Principiante',
          retos: user.retos || 0,
          puntos: user.puntos || 0,
        });
      } else {
        Alert.alert('Correo no registrado', 'Por favor, regístrese primero.');
      }
    } catch (error) {
      Alert.alert('Error al iniciar sesión');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#2e7d32', marginBottom: 40, marginTop: 30, textAlign: 'center', letterSpacing: 1 }}>ecoChallenge</Text>
      <Text style={{ fontSize: 28, marginBottom: 30, fontWeight: 'bold', color: '#2e7d32' }}>Iniciar Sesión</Text>
      <TextInput
        style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 }}
        placeholder="Correo electrónico"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={{ backgroundColor: '#2e7d32', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 15 }} onPress={handleLogin}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterUser')}>
        <Text style={{ color: '#1976d2', fontSize: 16, marginTop: 10 }}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen; 