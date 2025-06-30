import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const AdminChallengeScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [puntaje, setPuntaje] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [location, setLocation] = useState({ latitude: -34.6037, longitude: -58.3816 });
  const [address, setAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await AsyncStorage.getItem('categories');
        setCategorias(data ? JSON.parse(data) : []);
      } catch (e) {
        setCategorias([]);
      }
    };
    cargarCategorias();
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      setLoadingAddress(true);
      try {
        const res = await Location.reverseGeocodeAsync(location);
        if (res && res.length > 0) {
          const info = res[0];
          let addr = '';
          if (info.street) addr += info.street + ', ';
          if (info.city) addr += info.city + ', ';
          if (info.region) addr += info.region + ', ';
          if (info.country) addr += info.country;
          setAddress(addr);
        } else {
          setAddress('No se encontró dirección');
        }
      } catch {
        setAddress('No se pudo obtener la dirección');
      }
      setLoadingAddress(false);
    };
    if (location) fetchAddress();
  }, [location]);

  const guardarReto = async () => {
    if (!nombre.trim() || !descripcion.trim() || !categoria.trim() || !fecha.trim() || !puntaje.trim()) {
      Alert.alert('Por favor, complete todos los campos');
      return;
    }
    const reto = { nombre, descripcion, categoria, fecha, puntaje, location, address };
    try {
      const retosGuardados = await AsyncStorage.getItem('challenges');
      let retos = retosGuardados ? JSON.parse(retosGuardados) : [];
      retos.push(reto);
      await AsyncStorage.setItem('challenges', JSON.stringify(retos));
      Alert.alert('Reto guardado exitosamente');
      setNombre('');
      setDescripcion('');
      setCategoria('');
      setFecha('');
      setPuntaje('');
      setLocation({ latitude: -34.6037, longitude: -58.3816 });
      setAddress('');
    } catch (e) {
      Alert.alert('Error al guardar el reto');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }} contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>Alta de Retos</Text>
      <TextInput
        placeholder="Nombre del reto"
        placeholderTextColor="gray"
        value={nombre}
        onChangeText={setNombre}
        style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, width: '100%', marginBottom: 15 }}
      />
      <TextInput
        placeholder="Descripción"
        placeholderTextColor="gray"
        value={descripcion}
        onChangeText={setDescripcion}
        style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, width: '100%', marginBottom: 15 }}
        multiline
      />
      <View style={{ backgroundColor: 'white', borderRadius: 10, width: '100%', marginBottom: 15, borderWidth: 1, borderColor: '#ccc' }}>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          <Picker.Item label="Selecciona una categoría" value="" />
          {categorias.map((cat, idx) => (
            <Picker.Item key={idx} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      <TextInput
        placeholder="Fecha límite (Ej. 2025-06-30)"
        placeholderTextColor="gray"
        value={fecha}
        onChangeText={setFecha}
        style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, width: '100%', marginBottom: 15 }}
      />
      <TextInput
        placeholder="Puntaje asignado"
        placeholderTextColor="gray"
        value={puntaje}
        onChangeText={setPuntaje}
        keyboardType="numeric"
        style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, width: '100%', marginBottom: 15 }}
      />
      <Text style={{ color: 'white', fontSize: 16, marginBottom: 8, alignSelf: 'flex-start' }}>Ubicación del evento:</Text>
      <MapView
        style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 8 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={e => setLocation(e.nativeEvent.coordinate)}
      >
        <Marker
          coordinate={location}
          draggable
          onDragEnd={e => setLocation(e.nativeEvent.coordinate)}
          title="Ubicación del evento"
        />
      </MapView>
      {loadingAddress ? (
        <ActivityIndicator color="#fff" style={{ marginBottom: 8 }} />
      ) : (
        <Text style={{ color: 'white', fontSize: 15, marginBottom: 8, alignSelf: 'flex-start' }}>{address}</Text>
      )}
      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 20, borderRadius: 10, alignItems: 'center', width: '100%', marginTop: 10 }}
        onPress={guardarReto}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Guardar Reto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdminChallengeScreen; 