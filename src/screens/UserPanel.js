import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

function groupByMonth(retosGraficos) {
  const grouped = {};
  retosGraficos.forEach(r => {
    if (!r.fecha) return;
    const [year, month] = r.fecha.split('-');
    const key = `${year}-${month}`;
    grouped[key] = (grouped[key] || 0) + 1;
  });
  return grouped;
}

function formatMonthEs(key) {
  const [year, month] = key.split('-');
  const idx = parseInt(month, 10) - 1;
  return `${MONTHS_ES[idx]} ${year}`;
}

function getNivel(puntos) {
  if (puntos >= 0 && puntos <= 10) {
    return 'Principiante';
  } else if (puntos >= 11 && puntos <= 20) {
    return 'Ambientalista';
  } else if (puntos >= 21 && puntos <= 40) {
    return 'Reciclador experto';
  } else {
    return 'EcoAmigo';
  }
}

const UserPanel = ({ route, navigation }) => {
  const { userName = '', puntos = 0, retos = 0 } = route.params || {};
  const [retosGraficos, setRetosGraficos] = useState([]);
  const [userPuntos, setUserPuntos] = useState(puntos);
  const [userRetos, setUserRetos] = useState(retos);

  useEffect(() => {
    const fetchUser = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      for (let [key, value] of result) {
        if (!value) continue;
        try {
          const user = JSON.parse(value);
          if (user.userName === userName) {
            setRetosGraficos(Array.isArray(user.retosGraficos) ? user.retosGraficos : []);
            setUserPuntos(parseInt(user.puntos || 0));
            setUserRetos(parseInt(user.retos || 0));
            break;
          }
        } catch {}
      }
    };
    fetchUser();
  }, [userName]);

  const retosPorMes = groupByMonth(retosGraficos);
  const meses = Object.keys(retosPorMes).sort();
  const nivel = getNivel(userPuntos);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#2e7d32', marginBottom: 20 }}>Panel de usuario</Text>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>¡Hola, {userName}!</Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Nivel alcanzado: <Text style={{ fontWeight: 'bold' }}>{nivel}</Text></Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Retos completados: <Text style={{ fontWeight: 'bold' }}>{userRetos}</Text></Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Puntos acumulados: <Text style={{ fontWeight: 'bold' }}>{userPuntos}</Text></Text>
      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>Estadísticas (Retos completados por mes)</Text>
      <View style={{ minHeight: 60, backgroundColor: '#e0e0e0', borderRadius: 10, justifyContent: 'center', alignItems: 'flex-start', padding: 10, width: '100%' }}>
        {meses.length === 0 ? (
          <Text style={{ color: '#888' }}>Vacío</Text>
        ) : (
          meses.map((mes, idx) => (
            <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ width: 130, color: '#1976d2', fontWeight: 'bold' }}>{formatMonthEs(mes)}:</Text>
              <View style={{ height: 18, backgroundColor: '#1976d2', borderRadius: 4, width: retosPorMes[mes] * 30, marginLeft: 4, marginRight: 8 }} />
              <Text style={{ color: '#1976d2', fontWeight: 'bold' }}>{retosPorMes[mes]}</Text>
            </View>
          ))
        )}
      </View>
      <TouchableOpacity
        style={{ backgroundColor: '#1976d2', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30 }}
        onPress={() => navigation.navigate('ChallengeListScreen', { userName })}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Ver Retos Disponibles</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserPanel; 