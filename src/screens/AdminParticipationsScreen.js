import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminParticipationsScreen = () => {
  const [participations, setParticipations] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const stored = await AsyncStorage.getItem('participations');
        setParticipations(stored ? JSON.parse(stored) : []);
      } catch (e) {
        Alert.alert('Error al cargar participaciones');
      }
    };
    fetchParticipations();
  }, [refresh]);

  const updateUserStats = async (userName, reto) => {
    // Buscar usuario por nombre y actualizar puntos, retos completados y retos para la gráfica
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    let userKey = null;
    let userData = null;
    for (let [key, value] of result) {
      if (!value) continue;
      try {
        const user = JSON.parse(value);
        if (user.userName === userName) {
          userKey = key;
          userData = user;
          break;
        }
      } catch {}
    }
    if (userKey && userData) {
      // Sumar puntos y retos completados
      const puntos = parseInt(userData.puntos || 0) + parseInt(reto.puntaje || 0);
      const retos = parseInt(userData.retos || 0) + 1;
      // Agregar reto a la gráfica
      let retosGraficos = Array.isArray(userData.retosGraficos) ? userData.retosGraficos : [];
      retosGraficos.push({ nombre: reto.nombre, fecha: new Date().toISOString().slice(0, 10) });
      const updatedUser = {
        ...userData,
        puntos,
        retos,
        retosGraficos,
      };
      await AsyncStorage.setItem(userKey, JSON.stringify(updatedUser));
    }
  };

  const updateStatus = async (idx, newStatus) => {
    try {
      const updated = [...participations];
      const participation = updated[idx];
      if (newStatus === 'Aprobado') {
        await updateUserStats(participation.userName, participation.reto);
      }
      // Eliminar la participación de la lista
      updated.splice(idx, 1);
      await AsyncStorage.setItem('participations', JSON.stringify(updated));
      setRefresh(r => !r);
    } catch (e) {
      Alert.alert('Error al actualizar el estado');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2e7d32', marginBottom: 20 }}>Participaciones de Retos</Text>
      {participations.length === 0 && (
        <Text style={{ color: '#888', fontSize: 16 }}>No hay participaciones registradas.</Text>
      )}
      {participations.map((p, idx) => (
        <View key={idx} style={{ backgroundColor: '#e0e0e0', borderRadius: 10, padding: 15, marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Usuario: {p.userName}</Text>
          <Text>Reto: {p.reto?.nombre}</Text>
          <Text>Comentario: {p.comment || '-'}</Text>
          <Text>Ubicación: {p.location}</Text>
          <Text>Estado: <Text style={{ fontWeight: 'bold' }}>{p.status}</Text></Text>
          {p.photo && <Image source={{ uri: p.photo }} style={{ width: 180, height: 120, borderRadius: 10, marginVertical: 10 }} />}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, borderRadius: 8, alignItems: 'center', flex: 1, marginRight: 5 }}
              onPress={() => updateStatus(idx, 'Aprobado')}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Aprobar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'red', padding: 10, borderRadius: 8, alignItems: 'center', flex: 1, marginLeft: 5 }}
              onPress={() => updateStatus(idx, 'Rechazado')}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Rechazar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default AdminParticipationsScreen; 