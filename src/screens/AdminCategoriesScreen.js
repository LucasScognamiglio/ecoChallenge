import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminCategoriesScreen = () => {
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await AsyncStorage.getItem('categories');
      setCategorias(data ? JSON.parse(data) : []);
    } catch (e) {
      Alert.alert('Error al cargar categorías');
    }
  };

  const guardarCategoria = async () => {
    if (!categoria.trim()) {
      Alert.alert('Ingrese un nombre de categoría');
      return;
    }
    try {
      const nuevasCategorias = [...categorias, categoria.trim()];
      await AsyncStorage.setItem('categories', JSON.stringify(nuevasCategorias));
      setCategorias(nuevasCategorias);
      setCategoria('');
      Alert.alert('Categoría guardada');
    } catch (e) {
      Alert.alert('Error al guardar la categoría');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#2e7d32', marginBottom: 20 }}>Crear Categorías de Reciclaje</Text>
      <TextInput
        placeholder="Nombre de la categoría (Ej. Papel, Plástico, etc.)"
        placeholderTextColor="gray"
        value={categoria}
        onChangeText={setCategoria}
        style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, width: '100%', marginBottom: 15, borderWidth: 1, borderColor: '#ccc' }}
      />
      <TouchableOpacity
        style={{ backgroundColor: '#388e3c', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 }}
        onPress={guardarCategoria}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Guardar Categoría</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1976d2', marginBottom: 10 }}>Categorías existentes:</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888' }}>[Vacío]</Text>}
      />
    </View>
  );
};

export default AdminCategoriesScreen; 