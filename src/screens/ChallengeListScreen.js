import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChallengeListScreen = ({ navigation, route }) => {
  const [challenges, setChallenges] = useState([]);
  const { userName } = route.params || {};

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const retosGuardados = await AsyncStorage.getItem('challenges');
        setChallenges(retosGuardados ? JSON.parse(retosGuardados) : []);
      } catch (e) {
        Alert.alert('Error al cargar los retos');
      }
    };
    fetchChallenges();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2e7d32', marginBottom: 20 }}>Retos Disponibles</Text>
      {challenges.length === 0 && (
        <Text style={{ color: '#888', fontSize: 16 }}>No hay retos disponibles.</Text>
      )}
      {challenges.map((reto, idx) => (
        <View key={idx} style={{ backgroundColor: '#e0e0e0', borderRadius: 10, padding: 15, marginBottom: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{reto.nombre}</Text>
          <Text style={{ marginBottom: 3 }}>Descripción: {reto.descripcion}</Text>
          <Text style={{ marginBottom: 3 }}>Categoría: {reto.categoria}</Text>
          <Text style={{ marginBottom: 3 }}>Fecha límite: {reto.fecha}</Text>
          <Text style={{ marginBottom: 8 }}>Puntaje: {reto.puntaje}</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#1976d2', padding: 10, borderRadius: 8, alignItems: 'center' }}
            onPress={() => navigation.navigate('ChallengeParticipationScreen', { reto, userName })}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Participar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default ChallengeListScreen; 