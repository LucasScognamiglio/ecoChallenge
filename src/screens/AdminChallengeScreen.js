import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminChallengeScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [puntaje, setPuntaje] = useState('');

  const guardarReto = async () => {
    if (!nombre.trim() || !descripcion.trim() || !categoria.trim() || !fecha.trim() || !puntaje.trim()) {
      Alert.alert('Por favor, complete todos los campos');
      return;
    }
    const reto = { nombre, descripcion, categoria, fecha, puntaje };
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
      <TextInput
        placeholder="Categoría (Ej. Plástico, Papel, etc.)"
        placeholderTextColor="gray"
        value={categoria}
        onChangeText={setCategoria}
        style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, width: '100%', marginBottom: 15 }}
      />
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